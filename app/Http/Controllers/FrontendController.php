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
use App\Models\EventRegistrationRequest;

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
        if ($request->isMethod('post')) {
            $row_event = Event::where('slug', $event_slug)->first(['id','form_fields']);
            $validation = [];
            foreach($row_event->form_fields as $form_field)
            {
                if($form_field['is_visible'] && $form_field['is_mandatory'])
                {
                    if($form_field['name']=='email') {
                        $validation[$form_field['name']] ='required|email';
                    }
                    else if($form_field['name']=='mobile') {
                        $validation[$form_field['name']] ='required|digits:10|numeric';
                    }
                    else {
                        $validation[$form_field['name']] ='required';
                    } 
                }
            }
            $validation['captcha'] = 'required|captcha';
            $validator = Validator::make($request->all(), $validation);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                if(RegistrationRequest::where('mobile', $request->mobile)->exists())
                {
                    $registration_request = RegistrationRequest::where('mobile', $request->mobile)->first();
                    if(EventRegistrationRequest::where('event_id', $row_event->id)->where('registration_request_id', $registration_request->id)->exists())
                    {
                        return redirect()->route('registration_form',$event_slug)->with('error', trans('flash.AlreadyRegistered')); 
                    }
                    else
                    {
                        $insert_rel_data = [
                            'event_id' => $row_event->id,
                            'registration_request_id' => $registration_request->id,
                            'first_name' => $request->first_name,
                            'last_name' => $request->last_name,
                            'email' => $request->email,
                            'designation' => isset($request->designation) ? $request->designation : NULL,
                            'organization' => isset($request->organization) ? $request->organization : NULL,
                            'is_pickup' => (isset($request->is_pickup) && $request->is_pickup == 1) ? 1 : 0,
                            'pickup_address' => isset($request->pickup_address) ? $request->pickup_address : NULL,
                        ];
                        $rel_data = EventRegistrationRequest::create($insert_rel_data);
                        $rel_data->save();
                    }
                }
                else
                {
                    $insert_data = [
                        'first_name' => $request->first_name,
                        'last_name' => $request->last_name,
                        'mobile' => $request->mobile,
                    ];
                    $data = RegistrationRequest::create($insert_data);
                    $data->save();
                    $registration_request_id = $data->id;

                    $insert_rel_data = [
                        'event_id' => $row_event->id,
                        'registration_request_id' => $registration_request_id,
                        'first_name' => $request->first_name,
                        'last_name' => $request->last_name,
                        'email' => $request->email,
                        'designation' => isset($request->designation) ? $request->designation : NULL,
                        'organization' => isset($request->organization) ? $request->organization : NULL,
                        'is_pickup' => (isset($request->is_pickup) && $request->is_pickup == 1) ? 1 : 0,
                        'pickup_address' => isset($request->pickup_address) ? $request->pickup_address : NULL,
                    ];
                    $rel_data = EventRegistrationRequest::create($insert_rel_data);
                    $rel_data->save();
                }
                DB::commit();
                return redirect()->route('registration_form',$event_slug)->with('success', trans('flash.RegistrationSuccessfully'));
            }
        }
        else
        {
            $this->data['row_event'] = Event::where('slug', $event_slug)->first(['title', 'last_registration_date','event_logo','form_fields']);
            if($this->data['row_event']) {
                return view('registration_request.form',$this->data);
            }
        } 
    }

    public function reload_captcha()
    {
        return response()->json(['captcha'=> captcha_img()]);
    }

    public function thank_you()
    {
        
    }
}
