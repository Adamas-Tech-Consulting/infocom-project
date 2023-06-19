<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactsGroup extends Model
{
    protected $table = 'contacts_group';
    protected $fillable = ['name'];
}
