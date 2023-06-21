<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduleDetails extends Model
{
    protected $table = 'schedule_details';
    protected $fillable = ['event_id','schedule_id','hall_number','from_time','to_time','is_wishlist','subject_line'];
}
