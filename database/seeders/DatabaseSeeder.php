<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\UserTrafficStatus;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\Admin::factory()->create([
            'name' => 'Dwight Eisenhower',
            'email' => 'rnamikaze@hotmail.com',
            'password' => Hash::make('5b5e560b6167305469d52eaa7058fcbe37fb0b381f4e02f9672fbf46ff430925'),
        ]);

        $allUser = User::all();

        foreach ($allUser as $user) {
            if (UserTrafficStatus::where('user_id', $user->id)->first()) {
                continue;
            }

            UserTrafficStatus::create([
                "user_id" => $user->id,
                "allow" => true
            ]);
        }
    }
}
