<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sponsors extends Model
{
    protected $table = 'sponsors';
    protected $fillable = ['sponsorship_type_id','sponsor_name','sponsor_logo','website_link','rank'];
}
