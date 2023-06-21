<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduleType extends Model
{
    protected $table = 'schedule_type';
    protected $fillable = ['name'];
}
