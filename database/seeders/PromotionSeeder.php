<?php

namespace Database\Seeders;

use App\Models\Promotion;
use App\Models\Store;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PromotionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $storeId = Store::first()->id;

        Promotion::factory(10)->active()->create(['store_id' => $storeId]);
        Promotion::factory(5)->expired()->create(['store_id' => $storeId]);
        Promotion::factory(3)->freeShipping()->active()->create(['store_id' => $storeId]);
        Promotion::factory(5)->active()->create(['store_id' => $storeId]);

        // Chain states together
        Promotion::factory(3)->percentage()->active()->create(['store_id' => $storeId]);
    }
}
