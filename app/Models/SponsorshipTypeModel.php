<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SponsorshipTypeModel extends Model
{
    protected $table = 'sponsorship_type';
    protected $fillable = ['name'];

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = strtoupper($value);
    }
}
