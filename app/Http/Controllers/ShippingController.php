<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use App\Models\ShippingSetting;
use App\Models\ShippingZone;
use App\Models\ShippingZoneCity;
use App\Services\ShippingService;
use Illuminate\Http\Request;

class ShippingController extends Controller
{
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

    public function calculateBestShippingDiscount(){
          $globalShippingSet = ShippingSetting::first();
          $bestFreeShippingPromotion = Promotion::where('is_active', true)
                                    ->whereNotNull('minimum_order_amount')
                                    ->orderBy('minimum_order_amount', 'asc')
                                    ->first();

          $bestGoalForUser = $this->getBestGoalForUser($globalShippingSet , $bestFreeShippingPromotion) ?? 0;

          return response()->json(['bestGoalForUser' => $bestGoalForUser], 200);
    }


    private  function getBestGoalForUser(?ShippingSetting $globalShippingSet , ?Promotion $bestFreeShippingPromotion){
          $bestGoalForUser = [
             'threshold' => null , 
             'remaining' => null ,
             'reward_type' => null , 
             'message' => null
          ] ;

          if($globalShippingSet != null && $bestFreeShippingPromotion != null) {
                $bestGoalForUser = min($globalShippingSet->free_shipping_threshold_amount , $bestFreeShippingPromotion->minimum_order_amount);
          }elseif($globalShippingSet != null)
          {
            $bestGoalForUser = $globalShippingSet->free_shipping_threshold_amount ;
          }
          else{
            $bestGoalForUser = $bestFreeShippingPromotion->minimum_order_amount ;
        }

          return $bestGoalForUser ;
    }
    public function getCities() {
        $cities =  ShippingZoneCity::all(['id' , 'city']);


        return response()->json(['cities'=> $cities],200) ;
    }
}
