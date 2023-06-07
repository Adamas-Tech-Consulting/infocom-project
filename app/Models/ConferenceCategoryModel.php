<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConferenceCategoryModel extends Model
{
    protected $table = 'conference_category';
    protected $fillable = ['name','color'];

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = strtoupper($value);
    }
}
