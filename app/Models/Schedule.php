<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $table = 'schedule';
    protected $fillable = ['event_id','schedule_date','schedule_day','schedule_title','schedule_details','schedule_venue','schedule_type_id','from_time','to_time','hall_number','track_id','session_type'];
}
