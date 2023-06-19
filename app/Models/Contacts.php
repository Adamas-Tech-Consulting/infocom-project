<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contacts extends Model
{
    protected $table = 'contacts';
    protected $fillable = ['contacts_group_id','fname','lname','email','mobile','designation','company_name','address'];
}
