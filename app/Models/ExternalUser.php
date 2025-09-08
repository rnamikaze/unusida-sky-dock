<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ExternalUser extends Model
{
    use HasFactory;

    protected $connection = 'ext_data'; // use DB2
    protected $table = 'users';         // table in second db
    protected $primaryKey = 'id';
    // public $timestamps = false;

    public function localUser()
    {
        return $this->hasOne(User::class, 'ext_dat_id', 'id');
    }
}
