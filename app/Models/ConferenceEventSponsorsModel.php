<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConferenceEventSponsorsModel extends Model
{
    protected $table = 'event_sponsors';
    protected $fillable = ['conference_id','event_id','sponsors_id'];
}
