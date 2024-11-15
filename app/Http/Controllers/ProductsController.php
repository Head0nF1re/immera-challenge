<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::where('user_id', Auth::id())
            ->paginate();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $request->user()
            ->products()
            ->create($request->validated());

        return response(status: Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, int $id)
    {
        $product = Product::where('user_id', Auth::id())
            ->where('id', $id)
            ->first();

        if (is_null($product)) {
            return response(status: Response::HTTP_NOT_FOUND);
        }

        return $product;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $isUpdated = $product->update($request->validated());

        if (! $isUpdated) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong while updating the product',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->noContent();
    }

    /**
     * Soft delete
     */
    public function destroy(int $id)
    {
        $isDeleted = Product::where('id', $id)
            ->where('user_id', Auth::id())
            ->delete();

        if (! $isDeleted) {
            return response(status: Response::HTTP_NOT_FOUND);
        }

        return response()->noContent();
    }
}
