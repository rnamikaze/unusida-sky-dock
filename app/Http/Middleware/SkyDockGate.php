<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserTrafficStatus;

class SkyDockGate
{
    public function handle(Request $request, Closure $next)
    {
        $skyDockKey = $request->input('sky_dock_key'); // from payload

        if (!$skyDockKey) {
            return response()->json(['message' => 'sdkit is required'], 400);
        }

        if (env("SKY_DOCK_KEY", null) == null) {
            return response()->json(['message' => 'gate not configured'], 400);
        }

        if ($skyDockKey != env("SKY_DOCK_KEY", null)) {
            return response()->json(['message' => 'permission denied'], 400);
        }

        // Otherwise continue
        return $next($request);
    }
}
