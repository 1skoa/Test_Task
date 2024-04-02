<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $availableProducts = Product::available()->get();
        return response()->json($availableProducts);
    }

    public function show($id)
    {
		$product = Product::available()->findOrFail($id);
        return response()->json($product);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:10',
            'article' => 'required|unique:products|regex:/^[a-zA-Z0-9]+$/',
            // Добавьте другие правила валидации по вашему усмотрению
        ]);

        $product = Product::create($request->all());

        return response()->json($product, 201);
    }

     public function update(Request $request, $id)
    {

        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'required|min:10',
            'article' => 'required|unique:products,article,' . $id . '|regex:/^[a-zA-Z0-9]+$/',
            // Добавьте другие правила валидации по вашему усмотрению
        ]);

        $product->update($request->all());

        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        $product->delete();

        return response()->json(null, 204);
    }
}