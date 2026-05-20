<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
            // ProductSeeder.php
        Product::factory(10)->create()->each(function ($product) {

            // thumbnail
            $product->thumbnail()->create([
                'url' => "https://picsum.photos/seed/{$product->id}/400/400",
            ]);

            // covers
            $product->covers()->createMany([
                ['url' =>  "https://picsum.photos/seed/" . ($product->id + 100) . "/800/800"],
                ['url' =>  "https://picsum.photos/seed/" . ($product->id + 200) . "/800/800"],
            ]);


            $product->tags()->sync([2, 3 , 4]);
            $product->subCategories()->sync([2, 3 , 4]);
        
          
        });
    }
}
