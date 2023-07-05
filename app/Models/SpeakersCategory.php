<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SpeakersCategory extends Model
{
    protected $table = 'speakers_category';
    protected $fillable = ['name','ordering'];
}