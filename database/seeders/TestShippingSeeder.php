<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ShippingSetting;
use App\Models\Promotion;
use App\Models\ShippingZone;
use App\Models\ShippingZoneCity;

class TestShippingSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Update Global Shipping Setting
        ShippingSetting::updateOrCreate(
            ['id' => 1], // Assuming single setting
            [
                'free_shipping_type' => 'amount',
                'free_shipping_threshold_amount' => 500.00,
                'base_weight_kg' => 2.00,
                'extra_kg_price' => 5.00,
                'shipping_class' => ['standard' => 15.00, 'express' => 30.00]
            ]
        );

        // 2. Clear old test promotions (safely)
        // We only delete promotions that aren't linked to orders if possible, 
        // but for a test seeder, we can just delete and recreate.
        // To avoid FK issues, we won't delete all, just the ones we manage.
        $testPromoNames = ['Starter Discount', 'Fixed Savings', 'Big Spender %', 'VIP Reward'];
        Promotion::whereIn('name', $testPromoNames)->delete();

        // 3. Ensure a default Shipping Zone
        $zone = ShippingZone::updateOrCreate(
            ['name' => 'Default Zone'],
            [
                'price' => 25.00,
                'is_active' => true,
                'type' => 'fixed'
            ]
        );

        ShippingZoneCity::updateOrCreate(
            ['city' => 'Casablanca'],
            ['shipping_zone_id' => $zone->id]
        );

        // 4. Create Diverse Promotions with UNIQUE goals
        
        // Goal 100: 10% off (Value: 10)
        Promotion::create([
            'name' => 'Starter Discount',
            'type' => 'percentage',
            'value' => 10,
            'minimum_order_amount' => 100.00,
            'is_active' => true,
            'priority' => 1,
        ]);

        // Goal 200: 25 MAD off (Value: 25)
        Promotion::create([
            'name' => 'Fixed Savings',
            'type' => 'fixed',
            'value' => 25,
            'minimum_order_amount' => 200.00,
            'is_active' => true,
            'priority' => 2,
        ]);

        // Goal 350: 15% off (Value: 52.5)
        Promotion::create([
            'name' => 'Big Spender %',
            'type' => 'percentage',
            'value' => 15,
            'minimum_order_amount' => 350.00,
            'is_active' => true,
            'priority' => 3,
        ]);

        // Goal 600: 100 MAD off (Value: 100)
        Promotion::create([
            'name' => 'VIP Reward',
            'type' => 'fixed',
            'value' => 100,
            'minimum_order_amount' => 600.00,
            'is_active' => true,
            'priority' => 4,
        ]);

        echo "Test data updated successfully!\n";
    }
}
