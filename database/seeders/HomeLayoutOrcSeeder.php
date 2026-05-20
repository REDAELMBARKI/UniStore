<?php

namespace Database\Seeders;

use App\Models\Banner;
use App\Models\HomeLayoutOrc;
use App\Models\RuleBasedCollection;
use Illuminate\Database\Seeder;

class HomeLayoutOrcSeeder extends Seeder
{
    public function run(): void
    {
        HomeLayoutOrc::query()->delete();

        $sections = [
            // 1. Spring Luxury Banner
            [
                'sortable_id' => 1,
                'sortable_type' => Banner::class,
                'order' => 1,
            ],
            // 2. New Arrivals Collection
            [
                'sortable_id' => 1,
                'sortable_type' => RuleBasedCollection::class,
                'order' => 2,
            ],
            // 3. Urban Essence Banner
            [
                'sortable_id' => 2,
                'sortable_type' => Banner::class,
                'order' => 3,
            ],
            // 4. Featured Picks Collection
            [
                'sortable_id' => 2,
                'sortable_type' => RuleBasedCollection::class,
                'order' => 4,
            ],
            // 5. Flash Sale Utility Banner
            [
                'sortable_id' => 3,
                'sortable_type' => Banner::class,
                'order' => 5,
            ],
            // 6. Performance Footwear Collection
            [
                'sortable_id' => 3,
                'sortable_type' => RuleBasedCollection::class,
                'order' => 6,
            ],
            // 7. Accessories Showcase Banner
            [
                'sortable_id' => 4,
                'sortable_type' => Banner::class,
                'order' => 7,
            ],
            // 8. Luxury Timepieces Collection
            [
                'sortable_id' => 4,
                'sortable_type' => RuleBasedCollection::class,
                'order' => 8,
            ],
        ];

        foreach ($sections as $section) {
            HomeLayoutOrc::create($section);
        }
    }
}
