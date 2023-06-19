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
   
Route::middleware('auth:api')->group( function () {
    Route::get('infocom/get-user',[App\Http\Controllers\Api\Auth\LoginController::class, 'getUser']);
    Route::get('infocom/get-conference',[App\Http\Controllers\Api\HomeController::class, 'getConference']);
    Route::get('infocom/get-event/{id}',[App\Http\Controllers\Api\HomeController::class, 'getEvent']);
});

