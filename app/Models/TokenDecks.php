<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TokenDecks extends Model
{
    use HasFactory;

    protected $fillable = [
        "oauth_access_token_id",
        "app_name",
        "token",
        "user_id",
        "is_active",
        "user_agent",
        "ip_address",
        "special_id",
        "issuer"
    ];

    public function accessToken()
    {
        return $this->belongsTo(TokenDecks::class, 'oauth_access_token_id', 'id');
    }
}
