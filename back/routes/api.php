<?php

use App\Http\Controllers\Api\V1\ClientController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\StatusController;
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


        Route::get('/users', [UserController::class, 'index']);

        Route::apiResource('cliens', ClientController::class);
        Route::apiResource('statuses', StatusController::class);
        Route::apiResource('orders', OrderController::class);

    });
});
