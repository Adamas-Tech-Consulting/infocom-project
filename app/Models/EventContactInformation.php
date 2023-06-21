<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventContactInformation extends Model
{
    protected $table = 'event_contact_information';
    protected $fillable = ['event_id','contact_information_id'];
}