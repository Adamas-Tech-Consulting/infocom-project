<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use App\Exports\RegistrationRequestExport;
use Maatwebsite\Excel\Facades\Excel;

use DB;

//Model
use App\Models\RegistrationRequest;
use App\Models\Event;

class RegistrationFormController extends Controller
{
    protected $data;

    public function __construct(Request $request)
    {
        $event_id = $request->route()->parameter('event_id');
        $this->data = [
            'page_name'             => trans('admin.registration_form'),
            'page_slug'             => Str::slug(trans('admin.registration_form'),'-'),
            'page_url'              => route('registration_form',$event_id),
        ];
    }  

    public function index(Request $request, $event_id)
    {
        if ($request->isMethod('post')) {
            $inputs = $request->form_fields;
            $form_fields = Event::find($event_id)->form_fields;
            $form_fields = is_array($form_fields) ? $form_fields : json_decode($form_fields,true);
            foreach($form_fields as $key => $form_field)
            {
                if(isset($inputs[$key]) && $key>3)
                {
                    $form_fields[$key]['is_visible'] = isset($inputs[$key]['is_visible']) ? true : false;
                    $form_fields[$key]['is_mandatory'] = isset($inputs[$key]['is_mandatory']) ? true : false;
                }
            }
            $update_data = ['form_fields' => json_encode($form_fields)];
            Event::where('id', '=', $event_id)->update($update_data);
            return redirect()->route('registration_form_builder', $event_id)->with('success', trans('flash.UpdatedSuccessfully'));
        }
        $this->data['event_id'] = $event_id;
        $this->data['row'] = Event::find($event_id);
        $this->data['row']->form_fields = is_array($this->data['row']->form_fields) ? $this->data['row']->form_fields : json_decode($this->data['row']->form_fields,true);
        return view('registration_request.form_fields',$this->data);
    }
}
