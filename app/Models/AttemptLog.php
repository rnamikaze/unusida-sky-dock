<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttemptLog extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "token_id",
        "action",
        "event"
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function token_deck()
    {
        return $this->belongsTo(TokenDecks::class, 'token_id', 'id');
    }
}
