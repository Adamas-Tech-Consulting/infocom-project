<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConferenceSponsors extends Model
{
    protected $table = 'conference_sponsors';
    protected $fillable = ['conference_id','event_id','sponsors_id'];
}
