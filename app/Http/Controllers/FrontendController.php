<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeUser;
use App\Helpers\Http;

use DB;

use App\Models\RegistrationRequest;
use App\Models\Event;
use App\Models\EventRegistrationRequest;
use App\Models\EventPricing;
use App\Models\ContactInformation;

class FrontendController extends Controller
{
    protected $data;
    protected $rt = 184093;

    public function __construct(Request $request)
    {
        $this->data = [
            'page_name'   => trans('admin.registration_form'),
            'page_slug'   => Str::slug(trans('admin.registration_form'),'-'),
            'page_rt'     => base64_encode($this->rt)
        ];
    }

    public function registration(Request $request, $event_slug)
    {
        $row_event = Event::where('slug', $event_slug)->first(['id', 'title', 'last_registration_date','event_logo','registration_type','form_fields']);
        if ($request->isMethod('post')) {
            $validation['mobile'] ='required|digits:10|numeric';
            $validator = Validator::make($request->all(), $validation);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                $event_id = $row_event->id;
                $request->session()->put('reg_mobile', $request->mobile);
                $registration_request_query = RegistrationRequest::leftJoin('event_registration_request',function($join) use($event_id) {
                                                                $join->on('event_registration_request.registration_request_id','registration_request.id')
                                                                ->where('event_registration_request.event_id', $event_id);
                                                            })->where('registration_request.mobile', $request->mobile);
                if($registration_request_query->exists())
                {
                    $registration_request = $registration_request_query->first('event_registration_request.*');
                    if($registration_request->order_id && ($row_event->registration_type=='F' || $registration_request->rt_request || $registration_request->transaction_id)) {
                        $request->session()->forget('reg_mobile');
                        $request->session()->put('reg_order', $registration_request->order_id);
                        //$this->send_welcome_mail($registration_request->order_id);
                        return redirect()->route('thank_you');
                    }
                }
                if($request->rt && $request->rt == base64_encode($this->rt)) {
                    $request->session()->put('rt_request', $request->rt);
                } else {
                    $request->session()->forget('rt_request');
                }
                return redirect()->route('registration_form',$event_slug);
            }
        }
        else
        {
            $this->data['row_event'] = $row_event;
            if($this->data['row_event']) {
                $this->data['current_date'] = date('Y-m-d H:i:s');
                $this->data['event_contact_information'] = ContactInformation::join('event_contact_information',function($join) {
                    $join->on('event_contact_information.contact_information_id','contact_information.id')
                    ->where('event_contact_information.event_id',$this->data['row_event']->id);
                })
                ->orderByRaw('CASE WHEN event_contact_information.id IS NULL THEN 1 ELSE 0 END ASC')
                ->get(['contact_information.*','event_contact_information.id as event_contact_information_id']);
                //dd($this->data);
                return view('registration_request.index',$this->data);
            }
        } 
    }

    public function registration_form(Request $request, $event_slug)
    {
        $row_event = Event::where('slug', $event_slug)->first(['id','title', 'last_registration_date','registration_type','event_logo','form_fields']);
        $event_pricing = EventPricing::where('event_id', $row_event->id)->get();
        $form_fields = is_array($row_event->form_fields) ? $row_event->form_fields : json_decode($row_event->form_fields,true);
        if ($request->isMethod('post')) {
            $validation = [];
            foreach($form_fields as $form_field)
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
            $validation['attendance_type'] = 'required';
            $validation['captcha'] = 'required|captcha';
            $validator = Validator::make($request->all(), $validation);
            if($validator->fails()) {
                $request->session()->put('reg_mobile', $request->mobile);
                return back()->withErrors($validator)->withInput();
            } else {
                $event_id = $row_event->id;
                $registration_request_id = NULL;
                $registration_request_query = RegistrationRequest::leftJoin('event_registration_request',function($join) use($event_id) {
                                                                        $join->on('event_registration_request.registration_request_id','registration_request.id')
                                                                        ->where('event_registration_request.event_id', $event_id);
                                                                    })->where('registration_request.mobile', $request->mobile);
                if($registration_request_query->exists()) {
                    $registration_request = $registration_request_query->first('registration_request.*');
                    $registration_request_id = $registration_request->id;
                }

                DB::beginTransaction();
                if(!$registration_request_id)
                {
                    $insert_data = [
                        'first_name' => $request->first_name,
                        'last_name' => $request->last_name,
                        'mobile' => $request->mobile,
                    ];
                    $data = RegistrationRequest::create($insert_data);
                    $data->save();
                    $registration_request_id = $data->id; 
                }
                $rt_request = 0;
                if(isset($request->rt_request) && $request->rt_request == base64_encode($this->rt)) {
                    $rt_request = 1;
                    $row_event->registration_type='F';
                }
                $order_id = 'INFOCOM'.rand(0,15).rand(6,45).$registration_request_id.rand(300,400).time();
                $event_price = EventPricing::where('id', $request->attendance_type)->first();
                $event_price_with_gst = ($event_price->amount + ($event_price->amount*$event_price->gst_percentage)/100);
                $rel_input_data = [
                    'event_id' => $row_event->id,
                    'registration_request_id' => $registration_request_id,
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'email' => $request->email,
                    'designation' => isset($request->designation) ? $request->designation : NULL,
                    'organization' => isset($request->organization) ? $request->organization : NULL,
                    'is_pickup' => (isset($request->is_pickup) && $request->is_pickup == 1) ? 1 : 0,
                    'pickup_address' => isset($request->pickup_address) ? $request->pickup_address : NULL,
                    'rt_request' => $rt_request,
                    'order_id' => $order_id,
                    'attendance_type' => $request->attendance_type,
                    'payable_amount' => ($row_event->registration_type=='P') ? $event_price_with_gst : '0.00'
                ];
                $rel_data = EventRegistrationRequest::where('event_id', $event_id)->where('registration_request_id', $registration_request_id);
                if($rel_data->exists()) {
                    $eventregistration_request_id = $rel_data->first()->id;
                    $rel_data->update($rel_input_data);
                } else {
                    $rel_data = EventRegistrationRequest::create($rel_input_data);
                    $rel_data->save();
                    $eventregistration_request_id = $rel_data->id;
                }
                $order_id = 'INFOCOM'.rand(0,15).rand(6,45).$eventregistration_request_id.rand(300,400).time();
                $update_rel_data = [
                    'order_id' => $order_id
                ];
                $rel_data->update($update_rel_data);
                DB::commit();
                $request->session()->put('reg_order', $order_id);
                if($row_event->registration_type=='P') {
                    return redirect()->route('payment');
                }
                $this->send_welcome_mail($order_id);
                return redirect()->route('thank_you');
            }
        }
        else {
            if(!$request->session()->get('reg_mobile')) {
                return redirect()->route('registration',$event_slug);
            }
            $this->data['rt_request'] = NULL;
            if($request->session()->get('rt_request')) {
                $this->data['rt_request'] = $request->session()->get('rt_request');
            }
            $this->data['row_event'] = $row_event;
            $this->data['mobile'] = $request->session()->get('reg_mobile');
            $this->data['row_form'] = [];
            if(RegistrationRequest::where('mobile', $this->data['mobile'])->exists())
            {
                $registration_request = RegistrationRequest::where('mobile', $this->data['mobile'])->first();
                if(EventRegistrationRequest::where('event_id', $row_event->id)->where('registration_request_id', $registration_request->id)->exists()) {
                    $this->data['row_form'] = EventRegistrationRequest::where('event_id', $row_event->id)->where('registration_request_id', $registration_request->id)->first();
                }
            }
            $request->session()->forget('reg_mobile');
            if($this->data['row_event']) {
                $this->data['row_event']->form_fields = is_array($this->data['row_event']->form_fields) ? $this->data['row_event']->form_fields : json_decode($this->data['row_event']->form_fields,true);
                $this->data['event_pricing'] = $event_pricing;
                return view('registration_request.form',$this->data);
            }
        } 
    }

    public function reload_captcha()
    {
        return response()->json(['captcha'=> captcha_img()]);
    }

    public function payment(Request $request)
    {
        if(!$request->session()->get('reg_order')) {
            return redirect()->route('registration',$event_slug);
        }
        $order_id = $request->session()->get('reg_order');
        $request->session()->forget('reg_order');
        $request_url = 'https://subscriptions.abp.in/abpPaymentGateway/ProcessPaymentRequest';
        $order_details = EventRegistrationRequest::where('order_id', $order_id)->first();
        $app_id = 'infocom2023';
        $payable_amt = $order_details->payable_amount;
        $payment_date = date('Y/m/d');
        $string = $order_details->first_name.$order_details->last_name."|".$order_details->email."|".$order_id."|".$payable_amt."|".$app_id."|".$payment_date."|".route('payment_confirmation');  
        $hash = md5($string);
        $abpMsg = $string.'|'.$hash;
        $post_data = array();
        $request_url = $request_url.'?abpMsg='.$abpMsg;
        $response = Http::post($request_url,$post_data);
        $html = $response->getBody()->getContents();
        if(config('app.env')=='development') {
            $html = str_replace('href="/abpPaymentGateway/','href="/abp_admin/abpPaymentGateway/', $html);
            $html = str_replace('src="/abpPaymentGateway/','src="/abp_admin/abpPaymentGateway/', $html);
        }
        echo $html; die;
    }

    public function payment_confirmation(Request $request)
    {
        if(!$request->abpMsg) {

        } else {
            $response =  $request->abpMsg;
            $response_array = explode('|', $response);
            $order_id = $response_array[2];
            $transaction_data = [
                'transaction_id' => $response_array[7],
                'transaction_date' => date('Y-m-d',strtotime($response_array[5])),
                'transaction_status' => $response_array[8],
                'transaction_status_msg' => $response_array[9]
            ];
            DB::beginTransaction();
            $rel_data = EventRegistrationRequest::where('order_id',$order_id)->first();
            $rel_data->update($transaction_data);
            $request->session()->put('reg_order', $order_id);
            DB::commit();
            $this->send_welcome_mail($order_id);
            return redirect()->route('thank_you');  
        }
    }

    public function thank_you(Request $request)
    {
        if(!$request->session()->get('reg_order')) {
            return redirect()->away(site_settings('site_url'));
        }
        $order_id = $request->session()->get('reg_order');
        $rel_data = EventRegistrationRequest::where('order_id',$order_id)->first();
        $row_event = Event::where('id', $rel_data->event_id)->first(['id','title', 'event_venue', 'event_start_date', 'event_end_date', 'last_registration_date','registration_type','event_logo']);
        $this->data['row_event'] = $row_event;
        $this->data['row_event_registration'] = $rel_data;
        $this->data['event_price'] = EventPricing::where('id', $rel_data->attendance_type)->first();
        $this->data['event_contact_information'] = ContactInformation::join('event_contact_information',function($join) {
            $join->on('event_contact_information.contact_information_id','contact_information.id')
            ->where('event_contact_information.event_id',$this->data['row_event']->id);
        })
        ->orderByRaw('CASE WHEN event_contact_information.id IS NULL THEN 1 ELSE 0 END ASC')
        ->get(['contact_information.*','event_contact_information.id as event_contact_information_id']);
        $request->session()->forget('reg_order');
        return view('registration_request.thank_you',$this->data);
    }

    protected function send_welcome_mail($order_id)
    {
        $rel_data = EventRegistrationRequest::where('order_id',$order_id)->first();
        $reg_data = RegistrationRequest::where('id', $rel_data->registration_request_id)->first();
        $event_price = EventPricing::where('id', $rel_data->attendance_type)->first();
        $row_event = Event::where('id', $rel_data->event_id)->first(['id','title', 'event_venue', 'event_start_date', 'event_end_date', 'last_registration_date','registration_type','event_logo']);
        $mail_data = [
            'first_name' => $reg_data->first_name,
            'last_name' => $reg_data->last_name,
            'title' => $row_event->title,
            'event_venue' => $row_event->event_venue,
            'event_start_date' => $row_event->event_start_date,
            'event_end_date' => $row_event->event_end_date,
            'registration_type' => $row_event->registration_type,
            'rt_request' => $rel_data->rt_request,
            'attendance_type' => ($row_event->registration_type=='P' && !$rel_data->rt_request) ? $event_price->name_with_price : $event_price->name_without_price,
            'order_id' => $order_id,
            'payable_amount' => $rel_data->payable_amount,
            'transaction_status' => $rel_data->transaction_status
        ];
        try{
            Mail::to($rel_data->email)->send(new WelcomeUser($mail_data));
        }
        catch(\Exception $e){
            print $e->getMessage();
            exit;
        }
    }
}
