<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Speakers extends Model
{
    protected $table = 'speakers';
    protected $fillable = ['name','speakers_category_id','designation','company_name','linkedin_url','image'];
}
