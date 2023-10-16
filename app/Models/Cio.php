<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cio extends Model
{
    protected $table = 'cio';
    protected $fillable = ['registration_request_id','type','designation','company_name','linkedin_url','image'];
}
