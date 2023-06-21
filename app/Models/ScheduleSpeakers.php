<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduleSpeakers extends Model
{
    protected $table = 'schedule_speakers';
    protected $fillable = ['event_id','schedule_id','speakers_id'];
}
