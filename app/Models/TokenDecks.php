<?php

namespace App\Models;

use App\Helpers\BrowserLogoHelper;
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

    // Make sure custom attributes appear in JSON
    protected $appends = ['browser_name', 'browser_version', 'browser_icon'];

    public function getBrowserNameAttribute()
    {
        $info = BrowserLogoHelper::parseBrowser($this->user_agent ?? '');
        return $info['name'];
    }

    public function getBrowserVersionAttribute()
    {
        $info = BrowserLogoHelper::parseBrowser($this->user_agent ?? '');
        return $info['version'];
    }

    public function getBrowserIconAttribute()
    {
        return BrowserLogoHelper::getBrowserIcon($this->user_agent ?? '');
    }

    public function accessToken()
    {
        return $this->belongsTo(TokenDecks::class, 'oauth_access_token_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(TokenDecks::class, 'user_id', 'id');
    }

    public function attempts()
    {
        return $this->hasMany(AttemptLog::class, 'token_id', 'id');
    }
}
