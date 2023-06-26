<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InvitationGroup extends Model
{
    protected $table = 'invitation_group';
    protected $fillable = ['event_id','source_group','total_invitee','mail_subject','mail_body','mail_signature'];
}
