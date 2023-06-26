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

class RegistrationRequestController extends Controller
{
    protected $data;

    public function __construct()
    {
        $this->data = [
            'page_name'             => trans('admin.registration_request'),
            'page_slug'             => Str::slug(trans('admin.registration_request'),'-'),
            'page_url'              => route('registration_request'),
            'page_add'              => 'registration_request_create',
            'page_update'           => 'registration_request_update',
            'page_delete'           => 'registration_request_delete',
            'page_publish_unpublish'=> 'registration_request_publish_unpublish',
        ];
    }  

    public function index(Request $request)
    {
        $this->data['rows_event'] = Event::where('published','1')->orderBy('id','DESC')->get();
        $event_id = isset($this->data['rows_event'][0]) ? $this->data['rows_event'][0]->id : 0;
        if ($request->session()->exists('selected_event')) {
            $event_id = $request->session()->get('selected_event');
        } else {
            $request->session()->put('selected_event', $event_id);
        }
        $this->data['selected_event'] = $event_id;
        $this->data['rows'] = RegistrationRequest::join('event_registration_request','event_registration_request.registration_request_id','registration_request.id')
                                                ->where('event_registration_request.event_id',$event_id)
                                                ->get('registration_request.*');
        return view('registration_request.list',$this->data);
    }

    public function switch_event(Request $request, $event_id)
    {
        $request->session()->put('selected_event', $event_id);
    }

    public function csv_download(Request $request)
    {
        if ($request->session()->exists('selected_event')) {
            $event_id = $request->session()->get('selected_event');
            $event = Event::find($event_id);
            $filename = $event->slug.".csv";
            return Excel::download(new RegistrationRequestExport($event_id), $filename);
        } else {
            return redirect()->route('registration_request');
        }
        
    }
}
