<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\V1\User;
use App\Http\Controllers\Api\V1\UserController;

// use App\Http\Controllers\Api\V1\ClientController;
// use App\Http\Controllers\Api\V1\OrderController;


 

Route::prefix('v1')->group(function () {



    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);
    Route::get('/hello', action: [UserController::class, 'hello']);

    Route::middleware('auth:sanctum')->group(function () {


        Route::get('/users', [User::class, 'all']);



        // Route::apiResource('cliens', ClientController::class);

        // Route::apiResource('orders', OrderController::class);


        //php artisan make:controller PhotoController --api


        // Route::get('/clients', [ClientController::class, 'index']);
        // Route::get('/clients/{id}', [ClientController::class, 'show']);
        // Route::post('/clients', [ClientController::class, 'store']);
        // Route::put('/clients/{id}', [ClientController::class, 'update']); // Full update
        // Route::patch('/clients/{id}', [ClientController::class, 'partialUpdate']); // Partial update
        // Route::delete('/clients/{id}', [ClientController::class, 'destroy']);

        // Route::get('/orders', [OrderController::class, 'index']);
        // Route::get('/orders/{id}', [OrderController::class, 'show']);
        // Route::post('/orders', [OrderController::class, 'store']);
        // Route::put('/orders/{id}', [OrderController::class, 'update']); // Full update
        // Route::patch('/orders/{id}', [OrderController::class, 'partialUpdate']); // Partial update
        // Route::delete('/orders/{id}', [OrderController::class, 'destroy']);

        // Route::middleware('auth:sanctum')->get('/orders/history', [OrderController::class, 'history']);

    });
});
