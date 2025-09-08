<?php

namespace App\Http\Controllers;

use App\Models\TokenDecks;
use App\Models\User;
use Laravel\Passport\Token;
use App\Models\ExternalUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class IssueControllers extends Controller
{
    public function make(Request $request)
    {
        $isDebug = env('APP_DEBUG', false);

        try {
            $validator = \Validator::make($request->all(), [
                // "sky_dock_key" => "required|string|min:64|max:64",
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
                    "is_active" => true
                ]);

                return response()->json([
                    'token' => $token,
                    'user' => $localUser,
                ]);
            }

            // return response()->json([
            //     'debug' => $tokenDeck
            // ]);

            $user = User::find($tokenDeck->user_id);

            return response()->json([
                'token' => $tokenDeck->token,
                'user' => $user,
            ]);
            //code...
        } catch (\Throwable $th) {
            return response()->json([
                "message" => $isDebug ? $th->getMessage() : "Error Happen !",
            ]);
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
}
