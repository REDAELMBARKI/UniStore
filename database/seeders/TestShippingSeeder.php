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
        // 1. Clear existing data to avoid confusion
        ShippingSetting::truncate();
        Promotion::where('type', 'free_shipping')->delete();

        // 2. Create Global Shipping Setting
        // Global policy: Free shipping at 500 MAD
        ShippingSetting::create([
            'free_shipping_type' => 'amount',
            'free_shipping_threshold_amount' => 500.00,
            'base_weight_kg' => 2.00,
            'extra_kg_price' => 5.00,
            'shipping_class' => ['standard' => 15.00, 'express' => 30.00]
        ]);

        // 3. Create a Targeted Promotion
        // Special Campaign: Free shipping at 300 MAD (Limited time)
        Promotion::create([
            'name' => 'Flash Sale Free Shipping',
            'type' => 'free_shipping',
            'minimum_order_amount' => 300.00,
            'is_active' => true,
            'priority' => 10,
            'valid_from' => now(),
            'valid_until' => now()->addDays(7),
        ]);

        // 4. Ensure at least one Shipping Zone exists
        if (ShippingZone::count() === 0) {
            $zone = ShippingZone::create([
                'name' => 'Default Zone',
                'price' => 25.00,
                'is_active' => true,
                'type' => 'fixed'
            ]);

            ShippingZoneCity::create([
                'shipping_zone_id' => $zone->id,
                'city' => 'Test City'
            ]);
        }

        echo "Test data seeded successfully!\n";
        echo "Global Threshold: 500 MAD\n";
        echo "Promotion Threshold: 300 MAD\n";
        echo "Best Goal should be: 300 MAD\n";
    }
}
