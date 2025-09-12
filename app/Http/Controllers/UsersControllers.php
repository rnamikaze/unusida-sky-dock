<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserTrafficStatus;
use Illuminate\Http\Request;

class UsersControllers extends Controller
{
    public function all(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 25);
        $sortMode = $request->input('sort_mode', null);
        $sortDirection = $request->input('sort_direction', 'asc'); // optional, default asc

        // Base query
        $query = User::with([
            'tokenDecksLatest:id,token_decks.user_id,ip_address',
            'trafficStatus',
            'attemptLatest:id,attempt_logs.user_id,created_at'
        ]);

        // Apply search
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Apply sorting
        $allowedSorts = ['user_id', 'name', 'email'];
        if (!empty($sortMode) && in_array($sortMode, $allowedSorts)) {
            $query->orderBy($sortMode, $sortDirection);
        }

        // Apply pagination
        $users = $query->paginate($perPage);

        return response()->json([
            'users' => $users
        ]);
    }

    public function updateSetting(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            "user_id" => "required|numeric",
            "allow" => "required|boolean"
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => "Failed"
            ], 500);
        }

        $trafficStatus = UserTrafficStatus::where("user_id", $request->input("user_id"))->first();

        $trafficStatus->allow = boolval($request->input("allow"));

        $trafficStatus->save();

        return response()->json([
            "success" => true,
            "traffic_status" => $trafficStatus
        ], 200);
    }
}
