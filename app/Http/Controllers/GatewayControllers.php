<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GatewayControllers extends Controller
{
    public function gatewayGo(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            "token" => "required|string",
        ]);

        return $request->input("token");
    }
}
