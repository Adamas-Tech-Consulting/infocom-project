<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    protected $table = 'invitation';
    protected $fillable = ['invitation_group_id','fname','lname','email','mobile'];
}
