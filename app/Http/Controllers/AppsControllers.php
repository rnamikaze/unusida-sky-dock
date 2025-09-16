<?php

namespace App\Http\Controllers;

use App\Helpers\AllowedAppsHelper;
use App\Models\AppsConf;
use App\Models\AppsLog;
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
        $isDebug = env("APP_DEBUG", false);

        // sky_dock_key":"8b125078a2ddf3e76514098cc347dcfd6559233bd97af00da8178cc1eeb0414e",
        // "gate_key":"8b125078a2ddf3e76514098cc347dcfd6559233bd97af00da8178cc1eeb0429e",
        // 	"name": "Ryuzen",
        // 	"email": "email@mail.com",
        // 	"password": "12345678"

        try {

            $validator = \Validator::make($request->all(), [
                "app_name" => "required|string",
            ]);

            if ($validator->fails()) {
                return response()->json([
                    "error" => $validator->errors()->first(),
                ]);
            }

            $appName = $request->input("app_name");

            $user = Auth::guard('admin')->user();

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

            AppsLog::create([
                "admin_id" => $user->id,
                "app_name" => $appName,
                "action_name" => "s_in",
                "action_type" => "notify",
            ]);

            $app = AllowedAppsHelper::checkAllowedApps($request->input('app_name'), false);

            return response()->json([
                "token" => $data['token'],
                "debug" => $user,
                "app" => $app
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "error" => $isDebug ? $th->getMessage() : "Error Happen",
            ], 409);
        }
    }

    public function toggleManmode(Request $request)
    {
        $isDebug = env("APP_DEBUG", false);

        try {
            $validator = \Validator::make($request->all(), [
                "app_name" => "required|string",
            ]);

            if ($validator->fails()) {
                return response()->json([
                    "error" => $validator->errors()->first(),
                ]);
            }
            $appName = $request->input("app_name");


            // create or fetch existing
            $model = AppsConf::firstOrNew([
                'app_name' => $request->input('app_name'),
            ]);

            // toggle: if existing record -> flip, if new -> default to true
            $model->manmode = $model->exists ? !$model->manmode : true;

            $getAppProps = AllowedAppsHelper::checkAllowedApps($appName, true);

            // return response()->json($getAppProps);

            $skyDockKey = env("SKY_DOCK_KEY", null);
            $appKey = $getAppProps['key'];
            $appHost = $getAppProps['host'];

            // Example payload
            $payload = [
                'gate_key' => $appKey,
                'sky_dock_key' => $skyDockKey,
                'manmode' => $model->manmode
            ];

            $path = "/api/app-state/toggle-manmode";

            // Send POST request
            $response = Http::post($appHost . $path, $payload);

            if ($response->failed()) {
                return response()->json([
                    'error' => 'Request failed',
                    'details' => $response->body(),
                    // 'status' => $appKey
                ], $response->status());
            }

            // set defaults for other fields if new
            if (!$model->exists) {
                $model->active = true;
            }

            $model->save();

            AppsLog::create([
                "admin_id" => Auth::guard('admin')->id(),
                "app_name" => $request->input('app_name'),
                "action_name" => "manmode_toggle",
                "action_type" => $model->manmode ? "enable" : "disable",
            ]);

            $app = AllowedAppsHelper::checkAllowedApps($request->input('app_name'), false);

            return response()->json([
                'success' => true,
                'app_name' => $model->app_name,
                'manmode' => $model->manmode,
                'app' => $app,
                'debug' => $response->json()
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "error" => $isDebug ? $th->getMessage() : "Error Happen",
            ], 409);
        }
    }
}
