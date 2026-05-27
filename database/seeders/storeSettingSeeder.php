<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class storeSettingSeeder extends Seeder
{
    public function run(): void
    {
        $defaultSettings = [
            // Tax
            ['key' => 'tva_enabled',     'value' => 'false'],
            ['key' => 'tva_rate',        'value' => '20'],

            ['key' => 'admin_theme_style',        'value' => 'orangeNight'],
            ['key' => 'store_card_config',        'value' => json_encode([
                    'cardId' => 'card-6',
                    'showPrice' => true,
                    'showRating' => true,
                    'showBorder' => true,
                    'isRounded' => true,
                    'borderRadius' => '10px',
                    //all card settings
                ])
            ],
            ['key' => 'store_layout_style',        'value' => 'grid'],
            ['key' => 'store_theme_style',        'value' => 'softPastel'],

            // Payments
            ['key' => 'cod_enabled',     'value' => 'true'],
            ['key' => 'payment_enabled', 'value' => 'true'],

            // Store
            ['key' => 'currency',        'value' => 'MAD'],

            // Theme
            ['key' => 'theme_id',        'value' => '1'],
        ];

        DB::table('store_settings')->insert($defaultSettings);
    }
}