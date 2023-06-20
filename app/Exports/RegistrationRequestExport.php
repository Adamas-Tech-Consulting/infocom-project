<?php

namespace App\Exports;

use App\Models\RegistrationRequest;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class RegistrationRequestExport implements FromCollection, WithHeadings
{
    protected $conference_id;

    public function __construct($conference_id)
    {
        $this->conference_id = $conference_id;
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return RegistrationRequest::join('conference_registration_request','conference_registration_request.registration_request_id','registration_request.id')
                            ->where('conference_registration_request.conference_id', $this->conference_id)
                            ->get(['fname','lname','designation','organization','mobile','email','pickup_address']);

        //return RegistrationRequest::all();
    }

    public function headings(): array
    {
        return [
            'First Name',
            'Last Name',
            'Designation',
            'Organization',
            'Mobile',
            'Email',
            'Pickup Address'
        ];
    }
}
