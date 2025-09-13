<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class SessionControllers extends Controller
{
    public function all(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 25);
        $sortMode = $request->input('sort_mode', null);
        $sortDirection = $request->input('sort_direction', 'asc'); // optional, default asc

        // Base query
        $query = User::with([
            'tokenDecks:id,token_decks.user_id,ip_address,user_agent,special_id,app_name',
        ]);

        // Apply search
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Apply sorting Later
        // $allowedSorts = ['user_id', 'name', 'email'];
        // if (!empty($sortMode) && in_array($sortMode, $allowedSorts)) {
        //     $query->orderBy($sortMode, $sortDirection);
        // }

        // Apply pagination
        $users = $query->paginate($perPage);

        return response()->json([
            'users' => $users
        ]);
    }
}
