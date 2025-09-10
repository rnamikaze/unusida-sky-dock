<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PageControllers extends Controller
{
    public function dashboard(Request $request)
    {
        if (filter_var(env("APP_DEBUG", false), FILTER_VALIDATE_BOOLEAN)) {
            return Inertia::render("Dashboard");
        } else {
            return redirect("/");
        }
    }
}
