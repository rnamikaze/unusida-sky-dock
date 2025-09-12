<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthControllers extends Controller
{
    public function adminLogin(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            "email" => "required|string|min:6|email",
            "password" => "required|string|min:8",
            "remember" => "required|boolean"
        ]);

        if ($validator->fails()) {
            return response()->json([
                "error" => $validator->errors()->first(),
            ], 500);
        }

        $remember = $request->input("remember", false);

        if (
            Auth::guard('admin')->attempt(
                ["email" => $request->email, "password" => $request->password],
                $remember
            )
        ) {
            return response()->json([
                "success" => true
            ], 200);
            // return redirect("/dashboard");
        }

        // return Inertia::render('Home', [
        //     'status' => 404,
        //     'message' => "Login Failed",
        //     // HTTP method on this route.
        //     // $exception->getMessage() ?:
        // ])->toResponse($request);

        return response()->json([
            "success" => false,
            // "message" => "Login Failed !"
        ], 404);
    }

    public function adminLogout(Request $request)
    {
        if (Auth::guard('admin')->check()) {
            Auth::guard('admin')->logout();
        }

        return response()->json([
            "success" => true
        ], 200);
        // return redirect('/');
    }
}
