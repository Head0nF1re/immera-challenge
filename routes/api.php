<?php

use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
use App\Actions\Fortify\CreateNewUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function() {

    Route::get('/user', function (Request $request) {
        return $request->user();
    })->name('auth.user');
});
