<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use DB;

//Model
use App\Models\RegistrationRequest;
use App\Models\Conference;

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
        $this->data['rows_conference'] = Conference::where('published','1')->orderBy('id','DESC')->get();
        $conference_id = isset($this->data['rows_conference'][0]) ? $this->data['rows_conference'][0]->id : 0;
        if ($request->session()->exists('selected_conference')) {
            $conference_id = $request->session()->get('selected_conference');
        } else {
            $request->session()->put('selected_conference', $conference_id);
        }
        $this->data['selected_conference'] = $conference_id;
        $this->data['rows'] = RegistrationRequest::join('conference_registration_request','conference_registration_request.registration_request_id','registration_request.id')
                                                ->where('conference_registration_request.conference_id',$conference_id)
                                                ->get('registration_request.*');
        return view('registration_request.list',$this->data);
    }

    public function switch_conference(Request $request, $conference_id)
    {
        $request->session()->put('selected_conference', $conference_id);
    }

    public function csv_download(Request $request)
    {
        if ($request->session()->exists('selected_conference')) {
            $conference_id = $request->session()->get('selected_conference');
            $conference = Conference::find($conference_id);
            $rows = RegistrationRequest::join('conference_registration_request','conference_registration_request.registration_request_id','registration_request.id')
                                                ->where('conference_registration_request.conference_id',$conference_id)
                                                ->get('registration_request.*');
            $filename = $conference->slug.".csv";
            $handle = fopen($filename, 'w+');
            fputcsv($handle, array(__('admin.name'), __('admin.designation'), __('admin.organization'), __('admin.email'), __('admin.mobile'), __('admin.pickup_address')));
            foreach($rows as $row) {
                fputcsv($handle, array($row->fname.' '.$row->lname, $row->designation, $row->organization, $row->email, $row->mobile, $row->pickup_address));
            }
            fclose($handle);
            $headers = array(
                'Content-Type' => 'text/csv',
            );
            return \Response::download($handle, $filename, $headers);
        } else {
            return redirect()->route('registration_request');
        }
        
    }
}
