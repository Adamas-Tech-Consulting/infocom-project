<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class RegistrationRequest extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'registration_request';

    protected $fillable = [
        'event_id',
        'first_name',
        'last_name',
        'email',
        'mobile',
        'designation',
        'organization',
        'is_pickup',
        'pickup_address',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];
}
