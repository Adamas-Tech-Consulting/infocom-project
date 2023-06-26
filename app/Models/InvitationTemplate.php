<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InvitationTemplate extends Model
{
    protected $table = 'invitation_template';
    protected $fillable = ['template_body','template_footer'];
}
