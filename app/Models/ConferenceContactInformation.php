<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConferenceContactInformation extends Model
{
    protected $table = 'conference_contact_information';
    protected $fillable = ['conference_id','contact_information_id'];
}