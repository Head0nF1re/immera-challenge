<?php

use App\Features\Auth\SendSmsVerificationCode;
use App\Features\Auth\VerifySmsCode;
use App\Http\Controllers\ProductsController;
use App\Http\Middleware\EnsureVerifiedPhoneNumber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// verified_user (auth + verified phone) middleware is defined in /bootstrap/app.php
Route::middleware('verified_user')->group(function () {

    Route::withoutMiddleware(EnsureVerifiedPhoneNumber::class)->group(function () {
        Route::post('/auth/send-verification-code', SendSmsVerificationCode::class)
            ->name('auth.send_verification_code');

        Route::post('/auth/verify-code', VerifySmsCode::class)
            ->name('auth.verify_code');
    });

    Route::get('/user', function (Request $request) {
        return $request->user();
    })->name('auth.user');

    Route::resource('products', ProductsController::class)->only([
        'store', 'index', 'show', 'update', 'destroy',
    ]);

});
