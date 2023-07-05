<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use DB;

//Model
use App\Models\RegistrationRequest;
use App\Models\Event;

class FrontendController extends Controller
{
    protected $data;

    public function __construct(Request $request)
    {
        $this->data = [
            'page_name'   => trans('admin.registration_form'),
            'page_slug'   => Str::slug(trans('admin.registration_form'),'-'),
        ];
    }

    public function registration_form(Request $request, $event_slug)
    {
        $this->data['row_event'] = Event::where('slug', $event_slug)->first();
        if($this->data['row_event']) {
            return view('registration_request.form',$this->data);
        }  
    }
}
