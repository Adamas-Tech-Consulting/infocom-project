<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventRegistrationRequest extends Model
{
    protected $table = 'event_registration_request';

    protected $fillable = [
        'event_id',
        'registration_request_id',
        'first_name',
        'last_name',
        'email',
        'designation',
        'organization',
        'is_pickup',
        'pickup_address',
        'attendance_type',
        'order_id',
        'payable_amount',
        'transaction_id',
        'transaction_date',
        'transaction_status',
        'transaction_status_msg'
    ];
}
