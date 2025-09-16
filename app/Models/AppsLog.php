<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppsLog extends Model
{
    use HasFactory;

    protected $fillable = [
        "admin_id",
        "app_name",
        "action_name",
        "action_type",
    ];

    public function user()
    {
        return $this->belongsTo(Admin::class, "admin_id", "id");
    }
}
