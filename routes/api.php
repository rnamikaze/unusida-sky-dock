<?php

use App\Http\Controllers\DocksControllers;
use App\Http\Controllers\GatewayControllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IssueControllers;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix("issue")->group(function () {
    // Route::post("make", [IssueControllers::class, "make"]);
    Route::post("verify", [IssueControllers::class, "verify"])->middleware(["auth:api"]);
    Route::post("revoke", [IssueControllers::class, "revokeToken"])->middleware(["auth:api"]);
});

Route::prefix("dock")->group(function () {
    Route::post("initiate", [DocksControllers::class, "initiate"]);
});

Route::prefix("gateway")->group(function () {
    Route::get("/go", [GatewayControllers::class, "gatewayGo"]);
});
