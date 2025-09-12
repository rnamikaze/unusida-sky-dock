<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PageControllers extends Controller
{
    public function dashboard(Request $request)
    {
        $user = Auth::guard("admin")->user();

        return Inertia::render("Dashboard", [
            "user" => $user
        ]);
    }
}
