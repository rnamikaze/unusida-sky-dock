<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\TokenDecks;
use App\Models\ExternalUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;

class DocksControllers extends Controller
{
    private function sendRequestToAppGate($token, $user, $endpoint)
    {
        // withToken($yourToken)
        //     ->

        $user["user_agent"] = $token->user_agent;
        $user["ip_address"] = $token->ip_address;

        try {
            $response = Http::acceptJson()
                ->post($endpoint, [
                    'user' => json_encode($user),
                    'token' => $token->token,
                    'key' => "8b125078a2ddf3e76514098cc347dcfd6559233bd97af00da8178cc1eeb0414e"
                ]);

            // return $response->json();

            return [
                'success' => true,
                'response' => $response->json()
            ];
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
                "app_name" => "required|string|min:2|max:50"
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

            $userAgent = $request->userAgent();
            $ipAddress = $request->ip();

            $tokenDeck = TokenDecks::where('app_name', $appName)
                ->where('is_active', true)->where('user_id', $localUser->id)
                ->where('user_agent', $userAgent)->where('ip_address', $ipAddress)
                ->where('app_name', $appName)
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

                $newTokenDeck = TokenDecks::create([
                    "oauth_access_token_id" => $tokenId,
                    "app_name" => $appName,
                    "token" => $token,
                    "user_id" => $localUser->id,
                    "is_active" => true,
                    "user_agent" => request()->userAgent(),
                    "ip_address" => request()->ip(),
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
}
