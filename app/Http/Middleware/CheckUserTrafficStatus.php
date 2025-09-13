<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use App\Models\AttemptLog;
use App\Models\TokenDecks;
use Illuminate\Support\Str;
use App\Models\ExternalUser;
use Illuminate\Http\Request;
use App\Models\UserTrafficStatus;

class CheckUserTrafficStatus
{
    public function handle(Request $request, Closure $next)
    {
        $extDatId = $request->input('ext_dat_id'); // from payload
        $appName = $request->input("app_name");
        $issuer = $request->input("issuer");

        if (!$extDatId || !$appName || !$issuer) {
            return response()->json(['message' => 'exdid is required'], 400);
        }

        $localUser = User::where('ext_dat_id', $extDatId)->first();

        if (!$localUser) {
            $externalUser = ExternalUser::where('id', $extDatId)->first();

            if (!$externalUser) {
                return response()->json(['message' => 'User not found'], 404);
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
        }

        if (!$localUser) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $userAgent = $request->userAgent();
        $ipAddress = $request->ip();

        $tokenDeck = TokenDecks::where('app_name', $appName)
            ->where('is_active', true)->where('user_id', $localUser->id)
            ->where('user_agent', $userAgent)->where('ip_address', $ipAddress)
            ->where('app_name', $appName)->where('issuer', $issuer)
            ->where('is_active', true)->first();

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

            $tokenDeck = TokenDecks::create([
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
        }

        // Get traffic status (or create default if needed)
        $trafficStatus = UserTrafficStatus::firstOrCreate(
            ['user_id' => $localUser->id],
            ['allow' => true] // default allow = true if missing
        );

        // Block if not allowed
        if (!$trafficStatus->allow) {
            $attempt = AttemptLog::create([
                "user_id" => $localUser->id,
                "token_id" => $tokenDeck->id,
                "action" => "blocked",
                "event" => "gate check"
            ]);

            return response()->json(['message' => 'Access blocked'], 403);

        }
        $attempt = AttemptLog::create([
            "user_id" => $localUser->id,
            "token_id" => $tokenDeck->id,
            "action" => "allowed",
            "event" => "gate check"
        ]);

        // Otherwise continue
        return $next($request);
    }
}
