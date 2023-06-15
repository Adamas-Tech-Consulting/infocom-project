<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contacts extends Model
{
    protected $table = 'contacts';
    protected $fillable = ['fname','lname','email','mobile','gender','designation','company_name','address'];
}
