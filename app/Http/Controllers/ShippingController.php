<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use App\Models\ShippingSetting;
use App\Models\ShippingZone;
use App\Models\ShippingZoneCity;
use App\Repositories\PromotionRepository;
use App\Services\CartService;
use App\Services\Discount\PromotionService;
use App\Services\ShippingService;
use Illuminate\Http\Request;

class ShippingController extends Controller
{
    public function __construct(
        private CartService $cartService, 
        private PromotionService $promotionService,
        private ShippingService $shippingService
    ){ }
    public function calculate(string $name, Request $request, ShippingService $shippingService) {
          $cityRecord = ShippingZoneCity::where('city' , $name)->firstOrFail();
          // Fallback to empty items if not provided
          $items = $request->input('items', []);
          $promotionId = $request->input('promotionId');

          try {
              $cost = $shippingService->calculateShipping($items, $cityRecord, $promotionId);
              $zone = $cityRecord->shipping_zone()->first(['estimated_days', 'price']);
              
              return response()->json([
                  'cost' => $cost,
                  'zone' => $zone,
                  'city' => $cityRecord->city
              ], 200);
          } catch (\Exception $e) {
              return response()->json(['error' => $e->getMessage()], 422);
          }
    }

    public function calculateBestRewardForUser()
    {
        $items = $this->cartService->getCartItems();
        $cartTotal = $this->cartService->calculateCartItemsSubtotal($items->toArray());
        
        if ($cartTotal == 0) {
            return response()->json([
                'bestRewardForUser' => null,
                'milestones' => []
            ], 200);
        }

        $globalShipping = ShippingSetting::first();
        $milestones = $this->promotionService->getPromotionMillestones();
        if ($globalShipping && $globalShipping->free_shipping_threshold_amount > 0) {
            $milestones->push([
                'goal' => (float) $globalShipping->free_shipping_threshold_amount,
                'label' => 'FREE SHIPPING',
                'type' => 'free_shipping',
                'estimated_value' => (float) $this->shippingService->minShippingCost(),
            ]);
        }


        // 2. Process milestones: Group by goal (keep best reward per goal) and sort
        $sortedMilestones = $milestones
                            ->groupBy('goal')
                            ->map(fn($group) => $group->sortByDesc("estimated_value")->first())
                            ->sortBy('goal')
                            ->values();

        // 3. Strictly Upward: Filter out any higher-goal milestone that offers a worse reward
        $finalMilestones = collect();
        $currentMaxValue = -1;

        foreach ($sortedMilestones as $m) {
            if ($m['estimated_value'] > $currentMaxValue) {
                $finalMilestones->push($m);
                $currentMaxValue = $m['estimated_value'];
            }
        }

        // 4. Recalculate next milestone from the filtered set
        $nextMilestone = $finalMilestones->first(fn($m) => $m['goal'] > $cartTotal);

        return response()->json([
            'bestRewardForUser' => $nextMilestone,
            'milestones' => $finalMilestones->values()
        ], 200);
    }



    public function getCities() {
        $cities =  ShippingZoneCity::all(['id' , 'city']);


        return response()->json(['cities'=> $cities],200) ;
    }
}
