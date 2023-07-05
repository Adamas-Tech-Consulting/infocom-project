<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduleTrack extends Model
{
    protected $table = 'schedule_track';
    protected $fillable = ['event_id','schedule_id','track_id'];
}
