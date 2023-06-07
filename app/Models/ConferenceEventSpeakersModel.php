<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConferenceEventSpeakersModel extends Model
{
    protected $table = 'event_speakers';
    protected $fillable = ['conference_id','event_id','speakers_id'];
}
