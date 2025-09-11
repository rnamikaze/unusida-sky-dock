<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\ExternalUser;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'ext_dat_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function externalUser()
    {
        return $this->belongsTo(ExternalUser::class, 'ext_dat_id', 'id');
    }

    public function tokenDecks()
    {
        return $this->hasMany(TokenDecks::class, 'user_id', 'id');
    }

    public function tokenDecksLatest()
    {
        return $this->hasOne(TokenDecks::class, 'user_id', 'id')->latestOfMany();
    }

    public function attempts()
    {
        return $this->hasMany(AttemptLog::class, 'user_id', 'id');
    }

    public function attemptLatest()
    {
        return $this->hasOne(AttemptLog::class, 'user_id', 'id')->latestOfMany();
    }
}
