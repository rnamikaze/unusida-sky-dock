<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\AttemptLog;
use App\Models\TokenDecks;
use Laravel\Passport\Token;
use App\Models\ExternalUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;

class IssueControllers extends Controller
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
                    'status' => "html",
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

    public function make(Request $request)
    {
        $isDebug = env('APP_DEBUG', false);

        try {
            $validator = \Validator::make($request->all(), [
                "sky_dock_key" => "required|string",
                "email" => "required|string|min:6|max:255",
                "password" => "required|string|min:8|max:255",
                "app_name" => "required|string|min:2|max:50"
            ]);

            if ($validator->fails()) {
                return response()->json([
                    "message" => "failed to authenticate 1"
                ], 500);
            }

            if (env("SKY_DOCK_KEY", "wow") !== $request->input("sky_dock_key")) {
                return response()->json([
                    "message" => "failed to authenticate 2"
                ], 500);
            }

            $appName = $request->input("app_name");

            // check
            $tokenDeck = TokenDecks::where('app_name', $appName)
                ->where('is_active', true)->first();

            if (!$tokenDeck) {
                $email = $request->email;
                $password = $request->password;

                $externalUser = ExternalUser::where('email', $email)->first();

                if (!$externalUser || !Hash::check($password, $externalUser->password)) {
                    return response()->json(['error' => 'Invalid credentials'], 401);
                }

                // if valid -> create or sync local user in DB1
                $localUser = User::updateOrCreate(
                    ['ext_dat_id' => $externalUser->id],
                    [
                        'name' => $externalUser->name,
                        'email' => $externalUser->email,
                        'password' => $externalUser->password, // keep hash synced
                    ]
                );

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

                $data = $this->sendRequestToAppGate($newTokenDeck, $localUser, "http://localhost:8000/api/gate");

                return response()->json([
                    'token' => $token,
                    'user' => $localUser,
                    'data' => $data
                ]);
            }

            // return response()->json([
            //     'debug' => $tokenDeck
            // ]);

            $user = User::find($tokenDeck->user_id);

            $data = $this->sendRequestToAppGate($tokenDeck, $user, "http://localhost:8000/api/gate");

            return response()->json([
                'token' => $tokenDeck->token,
                'user' => $user,
                'data' => $data
            ]);
            //code...
        } catch (\Throwable $th) {
            return response()->json([
                "message" => $isDebug ? $th->getMessage() . "|" . $th->getFile() : "Error Happen !",
            ], 500);
        }
    }

    public function revokeToken(Request $request)
    {
        $isDebug = env('APP_DEBUG', false);

        try {
            $token = $request->user()->token(); // current token model
            $token->revoke();

            $tokenId = $token->id;

            TokenDecks::where('oauth_access_token_id', $tokenId)->update([
                "is_active" => false
            ]);

            // revoke all token
            // $request->user()->tokens->each->revoke();

            return response()->json(['message' => 'Token revoked successfully']);
        } catch (\Throwable $th) {
            return response()->json([
                "message" => $isDebug ? $th->getMessage() : "Error Happen !",
            ]);
        }
    }

    public function verify(Request $request)
    {
        $isDebug = env('APP_DEBUG', false);

        try {
            $validator = \Validator::make($request->all(), [
                "sky_dock_key" => "required|string",
            ]);

            if ($validator->fails()) {
                return response()->json([
                    "message" => "failed to authenticate 1"
                ], 500);
            }

            if (env("SKY_DOCK_KEY", "wow") !== $request->input("sky_dock_key")) {
                return response()->json([
                    "message" => "failed to authenticate 2"
                ], 500);
            }

            $token = $request->bearerToken();

            $tokenDeck = TokenDecks::where("token", $token)->first();

            $attempt = AttemptLog::create([
                "user_id" => $tokenDeck->user_id,
                "token_id" => $tokenDeck->id,
                "action" => "allowed",
                "event" => "verify"
            ]);

            $user = $request->user();

            return response()->json([
                "message" => "okay",
                "user" => $user
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                "message" => $isDebug ? $th->getMessage() : "Error Happen !",
            ]);
        }
    }
}
