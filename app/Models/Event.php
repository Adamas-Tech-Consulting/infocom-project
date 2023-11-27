<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'event';
    protected $fillable = ['event_category_id','event_method_id','registration_type','last_registration_date','title','slug','sub_title','event_start_date','event_end_date','event_days','event_venue','event_theme','overview_description','event_description','registration_closed_message','featured_banner','event_banner','event_images','latitude','longitude','featured','form_fields','wp_post_id'];

    protected $casts = [
        'form_fields' => 'array',
    ];

    public function getFullTitleAttribute() // notice that the attribute name is in CamelCase.
    {
        return $this->title . ' ' . $this->sub_title;
    }
}
