<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            ['name' => 'Наушники Xiaomi', 'article' => 'X65404930', 'status' => 'available', 'data' => ['color' => 'black', 'size' => 'small']],
            ['name' => 'Наушники Apple AirPods', 'article' => 'AA30681206', 'status' => 'available', 'data' => ['color' => 'white', 'size' => 'small']],
            ['name' => 'Часы Apple Watch', 'article' => 'AW4003590', 'status' => 'unavailable', 'data' => ['color' => 'white', 'size' => 'small']],
            ['name' => 'Часы Xiaomi', 'article' => 'XW350F59', 'status' => 'available', 'data' => ['color' => 'orange', 'size' => 'small']],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
