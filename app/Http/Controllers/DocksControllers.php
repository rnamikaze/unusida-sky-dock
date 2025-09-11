<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\TokenDecks;
use App\Models\ExternalUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Str;

class DocksControllers extends Controller
{
    private function sendRequestToAppGate($token, $user, $endpoint)
    {
        // withToken($yourToken)
        //     ->

        $user["user_agent"] = $token->user_agent;
        $user["ip_address"] = $token->ip_address;
        $user["special_id"] = $token->special_id;
        $appGateKey = env("ERABOUR_GATE_KEY");

        try {
            $response = Http::acceptJson()
                ->post($endpoint, [
                    'user' => json_encode($user),
                    'token' => $token->token,
                    'key' => $appGateKey
                ]);

            // return $response->json();

            $contentType = $response->header('Content-Type');

            if (str_contains($contentType, 'application/json')) {
                return [
                    'success' => true,
                    'response' => $response->json()
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
                "sky_dock_key" => "required|string",
                "ext_dat_id" => "required|numeric|min:1",
                "app_name" => "required|string|min:2|max:64",
                "issuer" => "required|string|min:2|max:64"
            ]);

            if ($validator->fails()) {
                return response()->json([
                    "message" => $isDebug ? "Failed to authenticate 1" : "Failed!"
                ], 500);
            }

            if (env("SKY_DOCK_KEY", "wow") !== $request->input("sky_dock_key")) {
                return response()->json([
                    "message" => $isDebug ? "Failed to authenticate 2" : "Failed!"
                ], 500);
            }

            $extId = $request->input('ext_dat_id');
            $appName = $request->input("app_name");
            $issuer = $request->input("issuer");

            // check
            $localUser = User::where('ext_dat_id', $extId)->first();

            if (!$localUser) {
                $externalUser = ExternalUser::where('id', $extId)->first();

                // if valid -> create or sync local user in DB1
                $localUser = User::updateOrCreate(
                    ['ext_dat_id' => $externalUser->id],
                    [
                        'name' => $externalUser->name,
                        'email' => $externalUser->email,
                        'password' => $externalUser->password, // keep hash synced
                    ]
                );
            }

            // =>
            $allowedApps = [
                [
                    "id" => "erabour",
                    "host" => env("ERABOUR_HOST", null)
                ]
            ];

            $appHost = null;

            // Reindex by 'id'
            $configsById = [];
            foreach ($allowedApps as $item) {
                $configsById[$item['id']] = $item;
            }

            if (isset($configsById[$appName])) {
                $appHost = $configsById[$appName]["host"];
            } else {
                return response()->json([
                    "message" => $isDebug ? "Failed to authenticate 3" : "Failed!"
                ], 500);
            }

            // =>
            $recognizedIssuer = [
                [
                    "id" => "unusida_sso",
                    "host" => "http://localhost:8003"
                ]
            ];

            $selectedIssuer = null;

            // Reindex by 'id'
            $issuerById = [];
            foreach ($recognizedIssuer as $item) {
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
                ->first();

            if (!$tokenDeck) {
                $tokenResult = $localUser->createToken('SkyDock1');
                // $token = $tokenResult->plainTextToken;
                $token = $tokenResult->accessToken;

                // The JWT string you return to client
                // $accessToken = $tokenResult->accessToken;

                // The token model (row in oauth_access_tokens)
                $tokenModel = $tokenResult->token;

                // The ID from oauth_access_tokens table
                $tokenId = $tokenModel->id;

                do {
                    $specialId = Str::random(32);
                } while (TokenDecks::where('special_id', $specialId)->exists());

                $newTokenDeck = TokenDecks::create([
                    "special_id" => $specialId,
                    "oauth_access_token_id" => $tokenId,
                    "app_name" => $appName,
                    "token" => $token,
                    "user_id" => $localUser->id,
                    "is_active" => true,
                    "user_agent" => request()->userAgent(),
                    "ip_address" => request()->ip(),
                    "issuer" => $issuer,
                ]);

                $data = $this->sendRequestToAppGate($newTokenDeck, $localUser, "$appHost/api/gate");

                return response()->json([
                    'token' => $token,
                    'user' => $localUser,
                    'data' => $data
                ]);
            }

            $data = $this->sendRequestToAppGate($tokenDeck, $localUser, "$appHost/api/gate");

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
            "sky_dock_key" => "required|string",
            "app_name" => "required|string|min:2|max:64",
            "issuer" => "required|string|min:2|max:64"
        ]);

        if ($validator->fails()) {
            return response()->json([
                "error" => $isDebug ? $validator->errors()->first() : "Failed !",
            ], 409);
        }

        if ($request->input("sky_dock_key") !== env("SKY_DOCK_KEY", "null")) {
            return response()->json([
                "error" => $isDebug ? "Error 1" : "Failed !"
            ], 409);
        }

        try {
            $appName = $request->input("app_name");
            $issuer = $request->input("issuer");
            $appKey = null;
            $appHost = null;

            // =>
            $allowedApps = [
                [
                    "id" => "erabour",
                    "host" => env("ERABOUR_HOST"),
                    "key" => env("ERABOUR_GATE_KEY")
                ]
            ];

            // Reindex by 'id'
            $configsById = [];
            foreach ($allowedApps as $item) {
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
            $recognizedIssuer = [
                [
                    "id" => "unusida_sso",
                    "host" => "http://localhost:8003"
                ]
            ];

            $selectedIssuer = null;

            // Reindex by 'id'
            $issuerById = [];
            foreach ($recognizedIssuer as $item) {
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

                    return response()->json([
                        "success" => true,
                        "special_id" => $data['special_id']
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
}
