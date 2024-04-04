<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Jobs\SendProductCreatedNotification;
use App\Notifications\ProductCreatedNotification;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

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

    public function store(ProductRequest  $request)
    {
        $request->validated();
        $product = Product::create($request->all());
        Log::info("PRODUCTS : $product ");
        SendProductCreatedNotification::dispatch($product);
        return response()->json($product, 201);
    }

    public function update(UpdateProductRequest $request, $id)
    {
        $product = Product::findOrFail($id);

        $this->authorize('update', $product);
        $validatedData = $request->validated();
        $product->update($validatedData);

        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        $product->delete();

        return response()->json(null, 204);
    }
}
