<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User With Verified Phone',
            'email' => '1_test@test.com',
            'password' => 'password',
        ]);

        User::factory()->unverifiedPhoneNumber()->create([
            'name' => 'Test User Without Verified Phone',
            'email' => '2_test@test.com',
            'password' => 'password',
        ]);

        $user = User::factory()->create([
            'name' => 'Test User With Products',
            'email' => '3_test@test.com',
            'password' => 'password',
        ]);

        Product::factory(20)
            ->for($user)
            ->create();

        User::factory(10)
            ->hasProducts(4)
            ->create();
    }
}
