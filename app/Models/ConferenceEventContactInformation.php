<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConferenceEventContactInformation extends Model
{
    protected $table = 'event_contact_information';
    protected $fillable = ['conference_id','event_id','contact_information_id'];
}