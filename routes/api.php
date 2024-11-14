<?php

use App\Http\Controllers\ProductsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// verified_user middleware is defined in /bootstrap/app.php
Route::middleware('verified_user')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    })->name('auth.user');

    Route::post('/auth/verify-phone-number', function () {
        return 'WIP';
    })->name('auth.verify_phone_number');

    Route::resource('products', ProductsController::class)->only([
        'store', 'index', 'show', 'update', 'destroy',
    ]);

});
