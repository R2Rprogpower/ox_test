<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\V1\User;

// use App\Http\Controllers\Api\V1\ClientController;
// use App\Http\Controllers\Api\V1\OrderController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/users', function (Request $request) {

    return User::all();
});

Route::post('/tokens/create', function (Request $request) {
    $user = User::where('email', $request->email)->first();
    $token = $user->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
});

Route::middleware('auth:sanctum')->group(function () {
    
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