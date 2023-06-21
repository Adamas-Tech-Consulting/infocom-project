<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventSponsors extends Model
{
    protected $table = 'event_sponsors';
    protected $fillable = ['event_id','schedule_id','sponsors_id'];
}
