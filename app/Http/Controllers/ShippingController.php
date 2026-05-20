<?php

namespace App\Http\Controllers;

use App\Models\ShippingZoneCity;
use App\Services\ShippingService;
use Illuminate\Http\Request;

class ShippingController extends Controller
{
    public function calculate($id, Request $request, ShippingService $shippingService) {
          $cityRecord = ShippingZoneCity::findOrFail($id);
          
          // Fallback to empty items if not provided
          $items = $request->input('items', []);
          $promotionId = $request->input('promotionId');

          try {
              $cost = $shippingService->calculateShipping($items, $cityRecord->city, $promotionId);
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



    public function getCities() {
        $cities =  ShippingZoneCity::all(['id' , 'city']);


        return response()->json(['cities'=> $cities],200) ;
    }
}
