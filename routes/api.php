<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/auth/otp-request', [App\Http\Controllers\Api\Auth\LoginController::class, 'otp_request']);
Route::post('/auth/login', [App\Http\Controllers\Api\Auth\LoginController::class, 'login']);
   
Route::middleware('auth:api')->group( function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/get-conference',[App\Http\Controllers\Api\HomeController::class, 'getConference']);
});

