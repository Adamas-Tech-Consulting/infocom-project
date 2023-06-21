<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduleContactInformation extends Model
{
    protected $table = 'schedule_contact_information';
    protected $fillable = ['event_id','schedule_id','contact_information_id'];
}