<?php

use App\Http\Controllers\TrafficControllers;
use App\Http\Controllers\UsersControllers;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::prefix("traffics")->name("users.")->middleware(["auth:admin"])->group(function () {
    Route::post("all", [TrafficControllers::class, "all"]);
});
