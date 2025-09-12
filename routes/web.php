<?php

use App\Http\Controllers\AuthControllers;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PageControllers;
use App\Http\Controllers\IssueControllers;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get("/", function () {
    return Inertia::render("Home");
})->middleware("guest:admin")->name("home");

Route::get("/dashboard", [PageControllers::class, "dashboard"])->middleware(["auth:admin"]);

Route::post("/admin/login", [AuthControllers::class, "adminLogin"]);
Route::post("/admin/logout", [AuthControllers::class, "adminLogout"]);

require __DIR__ . '/web/users.php';
