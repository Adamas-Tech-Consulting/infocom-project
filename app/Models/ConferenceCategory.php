<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConferenceCategory extends Model
{
    protected $table = 'conference_category';
    protected $fillable = ['name','color','is_sponsors'];

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = strtoupper($value);
    }
}
