<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use App\Models\AttemptLog;
use App\Models\TokenDecks;
use Illuminate\Http\Request;
use App\Models\UserTrafficStatus;

class CheckUserTrafficStatusBySpecialId
{
    public function handle(Request $request, Closure $next)
    {
        $specialId = $request->input('special_id'); // from payload

        if (!$specialId) {
            return response()->json(['message' => 'sid is required'], 400);
        }

        // Find user by ext_dat_id
        $deck = TokenDecks::where('special_id', $specialId)->first();

        if (!$deck) {
            return response()->json(['message' => 'not found d'], 400);
        }

        $user = User::where('id', $deck->user_id)->first();

        if (!$user) {
            return response()->json(['message' => 'not found u'], 404);
        }

        // Get traffic status (or create default if needed)
        $trafficStatus = UserTrafficStatus::firstOrCreate(
            ['user_id' => $user->id],
            ['allow' => true] // default allow = true if missing
        );

        // Block if not allowed
        if (!$trafficStatus->allow) {
            $attempt = AttemptLog::create([
                "user_id" => $user->id,
                "token_id" => $deck->id,
                "action" => "blocked",
                "event" => "gate check"
            ]);

            return response()->json(['message' => 'Access blocked'], 403);
        }

        $attempt = AttemptLog::create([
            "user_id" => $user->id,
            "token_id" => $deck->id,
            "action" => "allowed",
            "event" => "gate check"
        ]);

        // Otherwise continue
        return $next($request);
    }
}
