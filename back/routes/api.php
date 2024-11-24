<?php

use App\Http\Controllers\Api\V1\ClientController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\StatusController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\V1\User;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\KeepinCrmController;


// use App\Http\Controllers\Api\V1\ClientController;
// use App\Http\Controllers\Api\V1\OrderController;


 

Route::prefix('v1')->group(function () {

 

    Route::get('/kicrm/agreements', [KeepinCrmController::class, 'fetchAgreements']);
    Route::get('/kicrm/tasks', [KeepinCrmController::class, 'fetchTasks']);
    Route::get('/kicrm/tags', [KeepinCrmController::class, 'fetchTags']);
    Route::get('/kicrm/clients', action: [KeepinCrmController::class, 'fetchClients']);


    Route::get('/statuses', [KeepinCrmController::class, 'fetchStatuses']);

    



    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);
    Route::get('/hello', action: [UserController::class, 'hello']);

    Route::middleware('auth:sanctum')->group(function () {


        Route::get('/users', [UserController::class, 'index']);

        Route::apiResource('clients', ClientController::class);
        // Route::apiResource('statuses', StatusController::class);
        Route::apiResource('orders', controller: OrderController::class);

    });
});
