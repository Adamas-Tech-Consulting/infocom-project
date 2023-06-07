<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SpeakersModel extends Model
{
    protected $table = 'speakers';
    protected $fillable = ['name','designation','company_name','rank','image'];
}
