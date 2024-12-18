<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Arr;
use PHPUnit\Framework\Attributes\Test;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class ProductsTest extends TestCase
{
    use RefreshDatabase;

    public static $baseEndpoint = '/api/products/';

    #[Test]
    public function should_create_product_when_verified_user_sends_valid_request(): void
    {
        // Arrange
        $user = User::factory()->create();
        $product = Product::factory()->make()->toArray();
        $productRequest = Arr::only($product, ['name', 'description']);

        // Act
        $response = $this
            ->actingAs($user)
            ->post(static::$baseEndpoint, $productRequest);
            
        // Assert
        $response->assertStatus(Response::HTTP_CREATED);

        $this->assertDatabaseHas(Product::class, [
            ...$product,
            'user_id' => $user->id,
        ]);
    }
}
