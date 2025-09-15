<?php

namespace App\Http\Controllers;

use App\Helpers\AllowedAppsHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class AppsControllers extends Controller
{
    public function all(Request $request)
    {
        $allApps = AllowedAppsHelper::checkAllowedApps(null, false);

        return response()->json($allApps);
    }

    public function superadminVisitNotify(Request $request)
    {
        // sky_dock_key":"8b125078a2ddf3e76514098cc347dcfd6559233bd97af00da8178cc1eeb0414e",
        // "gate_key":"8b125078a2ddf3e76514098cc347dcfd6559233bd97af00da8178cc1eeb0429e",
        // 	"name": "Ryuzen",
        // 	"email": "email@mail.com",
        // 	"password": "12345678"

        $validator = \Validator::make($request->all(), [
            "app_name" => "required|string",
        ]);

        if ($validator->fails()) {
            return response()->json([
                "error" => $validator->errors()->first(),
            ]);
        }

        $appName = $request->input("app_name");

        $user = Auth::user();

        $email = $user->email;
        $name = $user->name;
        $password = $user->password;

        $getAppProps = AllowedAppsHelper::checkAllowedApps($appName, true);

        // return response()->json($getAppProps);

        $skyDockKey = env("SKY_DOCK_KEY", null);
        $appKey = $getAppProps['key'];
        $appHost = $getAppProps['host'];

        // Example payload
        $payload = [
            'gate_key' => $appKey,
            'sky_dock_key' => $skyDockKey,
            'name' => $name,
            'email' => $email,
            'password' => $password
        ];

        $path = "/api/account/session/superadmin";

        // Send POST request
        $response = Http::post($appHost . $path, $payload);

        if ($response->failed()) {
            return response()->json([
                'error' => 'Request failed',
                'details' => $response->body(),
                // 'status' => $appKey
            ], $response->status());
        }

        // Decode JSON response
        $data = $response->json();

        return response()->json([
            "token" => $data['token']
        ]);
    }
}
