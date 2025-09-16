<?php

namespace App\Helpers;

use App\Models\AppsConf;
use App\Models\AppsLog;

class AllowedAppsHelper
{
    public static function checkAllowedApps(?string $id = null, bool $includeKey = true): ?array
    {
        $apps = [
            [
                "id" => "erabour",
                "name" => "Pengajuan Lembur",
                "host" => env("ERABOUR_HOST", null),
                "key" => env("ERABOUR_GATE_KEY"),
                "logo" => null,
                "s_available" => false,
                "app_state" => false
            ],
            [
                "id" => "room-system",
                "name" => "PINTAR",
                "host" => env("ROOM_SYSTEM_HOST", null),
                "key" => env("ROOM_SYSTEM_KEY"),
                "logo" => null,
                "s_available" => false,
                "app_state" => false
            ],
            [
                "id" => "security-schedule",
                "name" => "Security Schedule",
                "host" => env("SSC_HOST", null),
                "key" => env("SSC_KEY"),
                "logo" => null,
                "s_available" => true,
                "app_state" => true
            ],
        ];

        $apps = collect($apps)->map(function ($app) use ($includeKey) {
            if (!$includeKey) {
                unset($app['key']);
            }

            // Attach AppsConf record (match app_name with id)
            $app['conf'] = AppsConf::where('app_name', $app['id'])->first();

            $lastLogin = AppsLog::where('app_name', $app['id'])
                ->where('action_name', 's_in')
                ->orderBy('created_at', 'desc')->first();
            $lastManmodeEnable = AppsLog::where('app_name', $app['id'])
                ->where('action_name', 'manmode_toggle')
                ->where('action_type', 'enable')
                ->orderBy('created_at', 'desc')->first();
            $lastManmodeDisable = AppsLog::where('app_name', $app['id'])
                ->where('action_name', 'manmode_toggle')
                ->where('action_type', 'disable')
                ->orderBy('created_at', 'desc')->first();
            $lastActiveEnable = AppsLog::where('app_name', $app['id'])
                ->where('action_name', 'active_toggle')
                ->where('action_type', 'enable')
                ->orderBy('created_at', 'desc')->first();
            $lastActiveDisable = AppsLog::where('app_name', $app['id'])
                ->where('action_name', 'active_toggle')
                ->where('action_type', 'disable')
                ->orderBy('created_at', 'desc')->first();

            $app['hist'] = [
                "last_login" => $lastLogin?->created_at,
                "last_manmode_enable" => $lastManmodeEnable?->created_at,
                "last_manmode_disable" => $lastManmodeDisable?->created_at,
                "last_active_enable" => $lastActiveEnable?->created_at,
                "last_active_disable" => $lastActiveDisable?->created_at
            ];

            return $app;
        })->values()->toArray();
        if ($id === null) {
            return $apps; // return all if no id provided
        }

        return collect($apps)->firstWhere('id', $id);
    }
}
