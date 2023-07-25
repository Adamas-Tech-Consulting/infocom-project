<?php

namespace App\Exports;

use App\Models\RegistrationRequest;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class RegistrationRequestExport implements FromCollection, WithHeadings
{
    protected $event_id;

    public function __construct($event_id)
    {
        $this->event_id = $event_id;
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return RegistrationRequest::where('event_id', $this->event_id)
                            ->get(['first_name','last_name','designation','organization','mobile','email','pickup_address']);

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
