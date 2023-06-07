<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConferenceModel extends Model
{
    protected $table = 'conference';
    protected $fillable = ['conference_category_id','conference_method_id','registration_type','auto_registration_date_limit','title','slug','conference_start_date','conference_end_date','conference_venue','conference_theme','overview_description','conference_description','conference_banner','conference_images'];
}
