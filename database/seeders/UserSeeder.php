<?php

namespace Database\Seeders;

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
            'email' => 'test@test.com',
            'password' => 'password',
        ]);

        // User::factory()->count(10)->create();
        $user = User::factory(10)
            ->hasProducts(4)
            ->create();
    }
}
