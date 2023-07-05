<?php

namespace App\Exports;

use App\Models\ContactSample;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ContactsSampleExport implements FromCollection, WithHeadings
{

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return ContactSample::get(['fname','lname','email','mobile','designation','company_name','address']);
    }

    public function headings(): array
    {
        return [
            'First Name *',
            'Last Name *',
            'Email *',
            'Mobile *',
            'Designation',
            'Company Name',
            'Address'
        ];
    }
}
