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
use App\Models\EventRegistrationRequest;

class RegistrationRequestController extends Controller
{
    protected $data;

    public function __construct(Request $request)
    {
        $event_id = $request->route()->parameter('event_id');
        $this->data = [
            'page_name'             => trans('admin.registration_request'),
            'page_slug'             => Str::slug(trans('admin.registration_request'),'-'),
            'page_url'              => route('registration_request',$event_id),
            'export_excel'          => route('registration_request_download',$event_id),
        ];
    }  

    public function index(Request $request, $event_id)
    {
        $this->data['event_id'] = $event_id;
        $this->data['row'] = Event::find($event_id);
        $this->data['rows'] = RegistrationRequest::join('event_registration_request','registration_request.id','=','event_registration_request.registration_request_id')
                                                 ->where('event_registration_request.event_id',$event_id)->get(['registration_request.id','event_registration_request.first_name','event_registration_request.last_name','event_registration_request.designation','event_registration_request.organization','mobile','event_registration_request.email','event_registration_request.pickup_address','event_registration_request.order_id','event_registration_request.payable_amount','event_registration_request.transaction_status']);
        return view('registration_request.list',$this->data);
    }

    public function download(Request $request, $event_id)
    {
        if ($event_id) {
            $event = Event::find($event_id);
            $filename = $event->slug.".xlsx";
            return Excel::download(new RegistrationRequestExport($event_id), $filename);
        } else {
            return redirect()->route('registration_request', $event_id);
        }
    }

    public function fetch_registered_users(Request $request, $event_id)
    {
        $term = $request->term;
        $reg_users = RegistrationRequest::where('first_name', 'like', '%' . $term . '%')
                                        ->selectRaw("id, CONCAT(first_name,' ',last_name) as value")
                                        ->get();
        $rows = $reg_users->toArray();
        return response()->json($rows);
    }
}
