<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConferenceEventDetailsModel extends Model
{
    protected $table = 'event_details';
    protected $fillable = ['conference_id','event_id','hall_number','from_time','to_time','is_wishlist','subject_line'];
}
