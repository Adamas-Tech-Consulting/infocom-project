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

Route::post('infocom/auth/otp-request', [App\Http\Controllers\Api\Auth\LoginController::class, 'otp_request']);
Route::post('infocom/auth/login', [App\Http\Controllers\Api\Auth\LoginController::class, 'login']);
   
Route::middleware('oauth:api')->group( function () {
    Route::get('infocom/get-event',[App\Http\Controllers\Api\HomeController::class, 'getEvent']);
    Route::post('infocom/get-agenda',[App\Http\Controllers\Api\HomeController::class, 'getAgenda']);
});

