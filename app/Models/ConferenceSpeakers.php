<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConferenceSpeakers extends Model
{
    protected $table = 'conference_speakers';
    protected $fillable = ['conference_id','speakers_id'];
}
