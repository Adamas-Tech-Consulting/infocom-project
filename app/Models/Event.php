<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'event';
    protected $fillable = ['event_category_id','event_method_id','registration_type','last_registration_date','title','slug','event_start_date','event_end_date','event_days','event_venue','event_theme','overview_description','event_description','featured_banner','event_banner','event_images','featured'];
}
