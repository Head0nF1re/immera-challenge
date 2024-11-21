<?php

use App\Features\Auth\SendSmsVerificationCode;
use App\Features\Auth\VerifySmsCode;
use App\Http\Controllers\ProductsController;
use App\Http\Middleware\EnsureVerifiedPhoneNumber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// verified_user (auth + verified phone) middleware is defined in /bootstrap/app.php
Route::middleware('verified_user')->group(function () {

    Route::prefix('/auth')->group(fn () => Route::name('auth.')->group(function () {
        Route::withoutMiddleware(EnsureVerifiedPhoneNumber::class)->group(function () {
            Route::post('send-verification-code', SendSmsVerificationCode::class)
                ->name('send_verification_code');

            Route::post('verify-code', VerifySmsCode::class)
                ->name('verify_code');

            Route::get('me', fn (Request $request) => $request->user())
                ->name('me');
        });
    }));

    Route::resource('products', ProductsController::class)->only([
        'store', 'index', 'show', 'update', 'destroy',
    ]);

});
