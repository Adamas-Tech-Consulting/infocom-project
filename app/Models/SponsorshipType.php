<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SponsorshipType extends Model
{
    protected $table = 'sponsorship_type';
    protected $fillable = ['name','display_order','wp_term_id'];

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = strtoupper($value);
    }
}
