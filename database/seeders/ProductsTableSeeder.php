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
            ['name' => 'Яблоко', 'article' => 'P123456', 'status' => 'available', 'data' => ['color' => 'red', 'size' => 'small']],
            ['name' => 'Телефон', 'article' => 'P654321', 'status' => 'available', 'data' => ['color' => 'blue', 'size' => 'medium']],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}