<?php

use App\Http\Controllers\UsersControllers;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::prefix("users")->name("users.")->middleware(["auth:admin"])->group(function () {
    Route::post("all", [UsersControllers::class, "all"]);
});
