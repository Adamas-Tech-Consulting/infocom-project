<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventCio extends Model
{
    protected $table = 'event_cio';
    protected $fillable = ['event_id','cio_id'];
}
