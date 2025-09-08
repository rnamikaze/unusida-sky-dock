<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OAuthAccessTokens extends Model
{
    use HasFactory;

    protected $table = 'oauth_access_tokens';         // table in second db
    protected $primaryKey = 'id';
    // public $timestamps = false;

    public function tokenDeck()
    {
        return $this->hasOne(TokenDecks::class, 'oauth_access_token_id', 'id');
    }
}
