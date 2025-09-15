<?php

use App\Http\Controllers\AppsControllers;
use Illuminate\Support\Facades\Route;

Route::prefix("apps")->name("apps.")->middleware(["auth:admin"])->group(function () {
    Route::post("all", [AppsControllers::class, "all"]);
    Route::post("superadmin-visit-notify", [AppsControllers::class, "superadminVisitNotify"]);
});
