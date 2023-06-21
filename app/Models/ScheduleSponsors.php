<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduleSponsors extends Model
{
    protected $table = 'schedule_sponsors';
    protected $fillable = ['event_id','schedule_id','sponsors_id'];
}
