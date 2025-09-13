<?php

namespace App\Http\Controllers;

use App\Models\AttemptLog;
use App\Models\User;
use App\Models\TokenDecks;
use App\Models\ExternalUser;
use App\Models\UserTrafficStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Str;

class DocksControllers extends Controller
{
    public $allowedApps;
    public $recognizedIssuer;

    public function __construct()
    {
        $this->allowedApps = [
            [
                "id" => "erabour",
                "host" => env("ERABOUR_HOST", null),
                "key" => env("ERABOUR_GATE_KEY")
            ],
            [
                "id" => "room-system",
                "host" => env("ROOM_SYSTEM_HOST", null),
                "key" => env("ROOM_SYSTEM_KEY")
            ],
        ];
        $this->recognizedIssuer = [
            [
                "id" => "unusida_sso",
                "host" => "http://localhost:8003"
            ]
        ];
    }

    private function sendRequestToAppGate($token, $user, $endpoint, $key)
    {
        // withToken($yourToken)
        //     ->

        $user["user_agent"] = $token->user_agent;
        $user["ip_address"] = $token->ip_address;
        $user["special_id"] = $token->special_id;

        try {
            $response = Http::acceptJson()
                ->post($endpoint, [
                    'user' => json_encode($user),
                    'token' => $token->token,
                    'key' => $key
                ]);

            // return $response->json();

            $contentType = $response->header('Content-Type');

            if (str_contains($contentType, 'application/json')) {
                return [
                    'success' => true,
                    'response' => $response->json(),
                    // 'error' => $endpoint
                ];
            } elseif (str_contains($contentType, 'text/html')) {
                // Likely Cloudflare page or some error HTML
                // $html = $response->body();
                // Handle accordingly
                return [
                    'success' => false,
                    'status' => 409,
                    'error' => "received html page",
                ];
            }


        } catch (RequestException $e) {
            // Get status code
            $status = $e->response->status();

            // Get error message body
            $error = $e->response->json();

            return [
                'success' => false,
                'status' => $status,
                'error' => $error,
            ];
        }
    }

    public function initiate(Request $request)
    {
        $isDebug = env('APP_DEBUG', false);

        try {
            $validator = \Validator::make($request->all(), [
                // "sky_dock_key" => "required|string",
                "ext_dat_id" => "required|numeric|min:1",
                "app_name" => "required|string|min:2|max:64",
                "issuer" => "required|string|min:2|max:64"
            ]);

            if ($validator->fails()) {
                return response()->json([
                    "message" => $isDebug ? "Failed to authenticate 1" : "Failed!"
                ], 500);
            }

            // if (env("SKY_DOCK_KEY", "wow") !== $request->input("sky_dock_key")) {
            //     return response()->json([
            //         "message" => $isDebug ? "Failed to authenticate 2" : "Failed!"
            //     ], 500);
            // }

            $extId = $request->input('ext_dat_id');
            $appName = $request->input("app_name");
            $issuer = $request->input("issuer");

            // check
            $localUser = User::where('ext_dat_id', $extId)
                ->with(['trafficStatus'])->first();

            if (!$localUser) {
                return response()->json(['message' => 'not found u'], 404);
            }

            // =>
            $appHost = null;
            $appKey = null;

            // Reindex by 'id'
            $configsById = [];
            foreach ($this->allowedApps as $item) {
                $configsById[$item['id']] = $item;
            }

            if (isset($configsById[$appName])) {
                $appHost = $configsById[$appName]["host"];
                $appKey = $configsById[$appName]["key"];
            } else {
                return response()->json([
                    "message" => $isDebug ? "Failed to authenticate 3" : "Failed!"
                ], 500);
            }

            // =>
            $selectedIssuer = null;

            // Reindex by 'id'
            $issuerById = [];
            foreach ($this->recognizedIssuer as $item) {
                $issuerById[$item['id']] = $item;
            }

            if (isset($issuerById[$issuer])) {
                $selectedIssuer = $issuerById[$issuer]["host"];
            } else {
                return response()->json([
                    "message" => $isDebug ? "Failed to authenticate 4" : "Failed!"
                ], 500);
            }

            $userAgent = $request->userAgent();
            $ipAddress = $request->ip();

            $tokenDeck = TokenDecks::where('app_name', $appName)
                ->where('is_active', true)->where('user_id', $localUser->id)
                ->where('user_agent', $userAgent)->where('ip_address', $ipAddress)
                ->where('app_name', $appName)->where('issuer', $issuer)
                ->where('is_active', true)->first();

            if (!$tokenDeck) {
                return response()->json(['message' => 'not found t'], 404);
            }

            $data = $this->sendRequestToAppGate($tokenDeck, $localUser, "$appHost/api/gate", $appKey);

            $attempt = AttemptLog::create([
                "user_id" => $localUser->id,
                "token_id" => $tokenDeck->id,
                "action" => "allowed",
                "event" => "initiate"
            ]);

            return response()->json([
                'token' => $tokenDeck->token,
                'user' => $localUser,
                'data' => $data
            ]);
            //code...
        } catch (\Throwable $th) {
            return response()->json([
                "message" => $isDebug ? $th->getMessage() . "|" . $th->getFile() : "Error Happen !",
            ], 500);
        }
    }

    public function dockPrepare(Request $request)
    {
        $isDebug = env("APP_DEBUG", false);

        $validator = \Validator::make($request->all(), [
            "special_id" => "required|string|min:8|max:64",
            // "sky_dock_key" => "required|string",
            "app_name" => "required|string|min:2|max:64",
            "issuer" => "required|string|min:2|max:64",
        ]);

        if ($validator->fails()) {
            return response()->json([
                "error" => $isDebug ? $validator->errors()->first() : "Failed !",
            ], 409);
        }

        // if ($request->input("sky_dock_key") !== env("SKY_DOCK_KEY", "null")) {
        //     return response()->json([
        //         "error" => $isDebug ? "Error 1" : "Failed !"
        //     ], 409);
        // }

        try {
            $appName = $request->input("app_name");
            $issuer = $request->input("issuer");
            $appKey = null;
            $appHost = null;

            // =>
            // Reindex by 'id'
            $configsById = [];
            foreach ($this->allowedApps as $item) {
                $configsById[$item['id']] = $item;
            }

            if (isset($configsById[$appName])) {
                $appHost = $configsById[$appName]["host"];
                $appKey = $configsById[$appName]["key"];
            } else {
                return response()->json([
                    "message" => $isDebug ? "Failed 2" : "Failed!"
                ], 500);
            }

            // =>
            $selectedIssuer = null;

            // Reindex by 'id'
            $issuerById = [];
            foreach ($this->recognizedIssuer as $item) {
                $issuerById[$item['id']] = $item;
            }

            if (isset($issuerById[$issuer])) {
                $selectedIssuer = $issuerById[$issuer]["host"];
            } else {
                return response()->json([
                    "message" => $isDebug ? "Failed 3" : "Failed!"
                ], 500);
            }

            $searchToken = TokenDecks::where('special_id', $request->input('special_id'))
                // ->where('activated', true)
                ->first();

            if (!$searchToken) {
                return response()->json([
                    "error" => $isDebug ? "Error 4" : "Failed !"
                ], 409);
            }

            try {
                $response = Http::acceptJson()
                    ->post("$appHost/api/check-token-issuer", [
                        'special_id' => $request->input('special_id'),
                        'key' => $appKey
                    ]);

                // return $response->json();

                $contentType = $response->header('Content-Type');

                if (str_contains($contentType, 'application/json')) {
                    // return [
                    //     'success' => true,
                    //     'response' => $response->json()
                    // ];
                    $data = $response->json();

                    $token = TokenDecks::where("special_id", $data['special_id'])
                        ->select('id', 'user_id')->first();

                    $attempt = AttemptLog::create([
                        "user_id" => $token->user_id,
                        "token_id" => $token->id,
                        "action" => "allowed",
                        "event" => "prepare"
                    ]);

                    return response()->json([
                        "success" => true,
                        "special_id" => $data['special_id'],
                        // "debug" => $token
                    ], 200);
                } elseif (str_contains($contentType, 'text/html')) {
                    // Likely Cloudflare page or some error HTML
                    // $html = $response->body();
                    // Handle accordingly
                    return response()->json([
                        "success" => false,
                    ], 409);
                }


            } catch (RequestException $e) {
                // Get status code
                $status = $e->response->status();

                // Get error message body
                $error = $e->response->json();

                // return [
                //     'success' => false,
                //     'status' => $status,
                //     'error' => $error,
                // ];

                return response()->json([
                    "success" => false,
                ], $status);
            }
        } catch (RequestException $e) {
            return response()->json([
                "error" => $isDebug ? "Error 3" : "Failed !"
            ], 500);
        }
    }

    public function revokeUserTokenFromApp(Request $request)
    {
        $isDebug = env("APP_DEBUG", false);

        $validator = \Validator::make($request->all(), [
            "special_id" => "required|string|min:8|max:64",
            "app_name" => "required|string|min:2|max:64",
        ]);

        if ($validator->fails()) {
            return response()->json([
                "error" => $isDebug ? $validator->errors()->first() : "Failed !",
            ], 409);
        }

        $appName = $request->input("app_name");
        $appKey = null;
        $appHost = null;

        // =>
        // Reindex by 'id'
        $configsById = [];
        foreach ($this->allowedApps as $item) {
            $configsById[$item['id']] = $item;
        }

        if (isset($configsById[$appName])) {
            $appHost = $configsById[$appName]["host"];
            $appKey = $configsById[$appName]["key"];
        } else {
            return response()->json([
                "message" => $isDebug ? "Failed 2" : "Failed!"
            ], 500);
        }
        try {
            $response = Http::acceptJson()
                ->post("$appHost/api/revoke-session", [
                    'special_id' => $request->input('special_id'),
                    'key' => $appKey
                ]);

            $contentType = $response->header('Content-Type');

            if (str_contains($contentType, 'application/json')) {
                $data = $response->json();

                $deleteToken = TokenDecks::where('special_id', $request->input('special_id'))->first();
                $deleteToken->is_active = false;
                $deleteToken->save();

                $userId = $deleteToken->user_id;

                $user = User::where('id', $userId)
                    ->with([
                        'tokenDecks' => function ($q) {
                            $q->select('id', 'user_id', 'ip_address', 'user_agent', 'special_id', 'app_name')
                                ->where('is_active', true);
                        }
                    ])
                    ->first();

                return response()->json([
                    "success" => true,
                    "message" => $data['message'],
                    "user" => $user,
                    "special_id" => $data['special_id'],
                ], 200);
            } elseif (str_contains($contentType, 'text/html')) {
                return response()->json([
                    "success" => false,
                ], 409);
            }

        } catch (RequestException $e) {
            $status = $e->response->status();

            // Get error message body
            $error = $e->response->json();
            return response()->json([
                "success" => false,
            ], $status);
        }
    }
}
