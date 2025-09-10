<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PageControllers extends Controller
{
    public function dashboard(Request $request)
    {
        return Inertia::render("Dashboard");
    }
}
