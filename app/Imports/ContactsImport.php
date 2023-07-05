<?php

namespace App\Imports;

use App\Models\Contacts;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Concerns\ToModel;

class ContactsImport implements ToModel, WithStartRow
{
    protected $group_id;

    public function __construct($group_id)
    {
        $this->group_id = $group_id;
    }
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Contacts([
            'contacts_group_id' =>  $this->group_id,
            'fname'             =>  $row[0],
            'lname'             =>  $row[1],
            'email'             =>  $row[2],
            'mobile'            =>  $row[3],
            'designation'       =>  $row[4],
            'company_name'      =>  $row[5],
            'address'           =>  $row[6],
        ]);
    }

    public function startRow(): int
    {
        return 2;
    }
}
