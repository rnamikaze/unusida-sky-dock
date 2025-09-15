<?php

namespace App\Helpers;

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
            ],
            [
                "id" => "room-system",
                "name" => "PINTAR",
                "host" => env("ROOM_SYSTEM_HOST", null),
                "key" => env("ROOM_SYSTEM_KEY"),
                "logo" => null,
            ],
            [
                "id" => "security-schedule",
                "name" => "Jadwal Security",
                "host" => env("SSC_HOST", null),
                "key" => env("SSC_KEY"),
                "logo" => null,
            ],
        ];

        $apps = collect($apps)->map(function ($app) use ($includeKey) {
            if (!$includeKey) {
                unset($app['key']);
            }
            return $app;
        })->values()->toArray();

        if ($id === null) {
            return $apps; // return all if no id provided
        }

        return collect($apps)->firstWhere('id', $id);
    }
}
