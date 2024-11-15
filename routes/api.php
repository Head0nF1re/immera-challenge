<?php

use App\Features\Auth\VerifyPhoneNumber;
use App\Http\Controllers\ProductsController;
use App\Http\Middleware\EnsureVerifiedPhoneNumber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// verified_user middleware is defined in /bootstrap/app.php
Route::middleware('verified_user')->group(function () {

    Route::post('/auth/verify-phone-number', VerifyPhoneNumber::class)
        ->withoutMiddleware(EnsureVerifiedPhoneNumber::class)
        ->name('auth.verify_phone_number');

    Route::get('/user', function (Request $request) {
        return $request->user();
    })->name('auth.user');

    Route::resource('products', ProductsController::class)->only([
        'store', 'index', 'show', 'update', 'destroy',
    ]);

});
