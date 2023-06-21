<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventSpeakers extends Model
{
    protected $table = 'event_speakers';
    protected $fillable = ['event_id','speakers_id'];
}
