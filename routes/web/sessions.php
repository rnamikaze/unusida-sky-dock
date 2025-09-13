<?php

use App\Http\Controllers\DocksControllers;
use App\Http\Controllers\SessionControllers;
use App\Http\Controllers\TrafficControllers;
use App\Http\Controllers\UsersControllers;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::prefix("sessions")->name("sessions.")->middleware(["auth:admin"])->group(function () {
    Route::post("all", [SessionControllers::class, "all"]);
    Route::post("revoke", [DocksControllers::class, "revokeUserTokenFromApp"]);
});
