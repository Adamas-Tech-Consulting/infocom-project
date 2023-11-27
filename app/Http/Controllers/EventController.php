<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use App\Helpers\Http;

use DB;

//Model
use App\Models\EventCategory;
use App\Models\EventMethod;
use App\Models\Event;
use App\Models\Schedule;
use App\Models\Sponsors;
use App\Models\EventSponsors;
use App\Models\Speakers;
use App\Models\EventSpeakers;
use App\Models\Cio;
use App\Models\EventCio;
use App\Models\ContactInformation;
use App\Models\EventContactInformation;

class EventController extends Controller
{
    protected $data;

    public function __construct()
    {
        $this->data = [
            'page_name'             => trans('admin.event'),
            'page_slug'             => Str::slug(trans('admin.event'),'-'),
            'page_url'              => route('event'),
            'page_add'              => 'event_create',
            'page_update'           => 'event_update',
            'page_delete'           => 'event_delete',
            'page_publish_unpublish'=> 'event_publish_unpublish',
            'page_featured'         => 'event_featured',
            'page_sync'             => 'event_sync'
        ];
    }  

    public function index(Request $request, $mode=NULL)
    {
        $rows = Event::join('event_category','event_category.id','=','event.event_category_id')
                    ->join('event_method','event_method.id','=','event.event_method_id');
        if($mode=='upcoming') {
            $rows->whereDate('event_start_date', '>', NOW());
        } else if($mode == 'past') {
            $rows->whereDate('event_end_date', '<', NOW());
        } else {
            $rows->whereDate('event_start_date', '<=', NOW())->whereDate('event_end_date', '>=', NOW());
        }
        $rows = $rows->get(['event.*','event_category.name as event_category_name','event_category.color as event_category_color','event_method.name as event_method_name']);
        $this->data['rows'] = $rows;                                    
        return view('event.list',$this->data);
    }

    public function create(Request $request)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'event_category_id' => 'required',
                'title' => 'required',
                'event_method_id' => 'required',
                'event_start_date' => 'required',
                'event_end_date' => 'required',
                'event_venue' => 'required',
                'event_theme' => 'required',
                'event_banner' => 'required',
                'event_logo' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $form_fields = array(
                        array('label' => 'First Name', 'name' => 'first_name', 'type' => 'text', 'class' => 'col-6', 'is_visible' => true, 'is_mandatory' => true, 'is_disabled' => true),
                        array('label' => 'Last Name', 'name' => 'last_name',  'type' => 'text', 'class' => 'col-6', 'is_visible' => true, 'is_mandatory' => true, 'is_disabled' => true),
                        array('label' => 'Email Id', 'name' => 'email',  'type' => 'email', 'class' => 'col-6', 'is_visible' => true, 'is_mandatory' => true, 'is_disabled' => true),
                        array('label' => 'Mobile Number', 'name' => 'mobile',  'type' => 'text', 'class' => 'col-6', 'is_visible' => true, 'is_mandatory' => true, 'is_disabled' => true),
                        array('label' => 'Designation', 'name' => 'designation',  'type' => 'text', 'class' => 'col-6', 'is_visible' => true, 'is_mandatory' => true, 'is_disabled' => false),
                        array('label' => 'Organization', 'name' => 'organization',  'type' => 'text', 'class' => 'col-6', 'is_visible' => true, 'is_mandatory' => true, 'is_disabled' => false),
                        array('label' => 'Car Pickup and Drop Required ?', 'name' => 'is_pickup',  'type' => 'radio', 'class' => 'col-12', 'is_visible' => true, 'is_mandatory' => false, 'is_disabled' => false),
                        array('label' => 'Car Pick Up Address', 'name' => 'pickup_address', 'type' => 'textarea', 'class' => 'col-12', 'is_visible' => true, 'is_mandatory' => true, 'is_disabled' => false),
                    );
                    $diff = strtotime($request->event_end_date) - strtotime($request->event_start_date);
                    $event_days = abs(round($diff / 86400));
                    $insert_data = [
                        'event_category_id' => $request->event_category_id,
                        'title' => $request->title,
                        'slug' => Str::slug($request->title,'-'),
                        'sub_title' => $request->sub_title,
                        'event_method_id' => $request->event_method_id,
                        'registration_type' => $request->registration_type,
                        'last_registration_date' => $request->last_registration_date ? date('Y-m-d',strtotime($request->last_registration_date)) : NULL,
                        'event_start_date' => date('Y-m-d',strtotime($request->event_start_date)),
                        'event_end_date' => date('Y-m-d',strtotime($request->event_end_date)),
                        'event_days' => ($event_days+1),
                        'event_venue' => $request->event_venue,
                        'event_theme' => $request->event_theme,
                        'latitude' => $request->latitude,
                        'longitude' => $request->longitude,
                        'overview_description' => $request->overview_description,
                        'event_description' => $request->event_description,
                        'featured' => (isset($request->featured) ? 1 : 0),
                        'form_fields' => json_encode($form_fields),
                    ];
                    $data = Event::create($insert_data);
                    $data->save();
                    $id = $data->id;
                    if($request->file('featured_banner')) {
                        $file = $request->file('featured_banner');
                        //Upload image
                        $featured_banner = image_upload($file,config("constants.EVENT_FOLDER"),'featured',NULL);
                        //Update DB Data
                        $update_data = array('featured_banner' => $featured_banner);
                        //Update Query
                        Event::where('id', '=', $id)->update($update_data);
                    }
                    if($request->file('event_banner')) {
                        $file = $request->file('event_banner');
                        //Upload image
                        $event_banner = image_upload($file,config("constants.EVENT_FOLDER"),'banner',NULL);
                        //Update DB Data
                        $update_data = array('event_banner' => $event_banner);
                        //Update Query
                        Event::where('id', '=', $id)->update($update_data);
                    }
                    if($request->file('event_logo')) {
                        $file = $request->file('event_logo');
                        $event_logo = image_upload($file,config("constants.EVENT_FOLDER"),'logo',NULL);
                        //Update DB Data
                        $update_data = array('event_logo' => $event_logo);
                        //Update Query
                        Event::where('id', '=', $id)->update($update_data);
                    }
                    DB::commit();
                    return redirect()->route('schedule',$id)->with('success', trans('flash.AddedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['rows_method'] = EventMethod::where('published','1')->get();
            $this->data['rows_category'] = EventCategory::where('published','1')->get();
            return view('event.create',$this->data);
        }
    }

    public function update(Request $request,$id)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'event_category_id' => 'required',
                'title' => 'required',
                'event_method_id' => 'required',
                'event_start_date' => 'required',
                'event_end_date' => 'required',
                'event_venue' => 'required',
                'event_theme' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $diff = strtotime($request->event_end_date) - strtotime($request->event_start_date);
                    $event_days = abs(round($diff / 86400));
                    $update_data = [
                        'event_category_id' => $request->event_category_id,
                        'title' => $request->title,
                        'slug' => Str::slug($request->title,'-'),
                        'sub_title' => $request->sub_title,
                        'event_method_id' => $request->event_method_id,
                        'registration_type' => $request->registration_type,
                        'last_registration_date' => $request->last_registration_date ? date('Y-m-d',strtotime($request->last_registration_date)) : NULL,
                        'event_start_date' => date('Y-m-d',strtotime($request->event_start_date)),
                        'event_end_date' => date('Y-m-d',strtotime($request->event_end_date)),
                        'event_days' => ($event_days+1),
                        'event_venue' => $request->event_venue,
                        'event_theme' => $request->event_theme,
                        'latitude' => $request->latitude,
                        'longitude' => $request->longitude,
                        'overview_description' => $request->overview_description,
                        'event_description' => $request->event_description,
                        'featured' => (isset($request->featured) ? 1 : 0),
                    ];
                    $data = Event::findOrFail($id);
                    $data->update($update_data);
                    if($request->file('featured_banner')) {
                        $file = $request->file('featured_banner');
                        //Upload image
                        $featured_banner = image_upload($file,config("constants.EVENT_FOLDER"),'featured',$data->featured_banner);
                        //Update DB Data
                        $update_data = array('featured_banner' => $featured_banner);
                        //Update Query
                        Event::where('id', '=', $id)->update($update_data);
                    }
                    if($request->file('event_banner')) {
                        $file = $request->file('event_banner');
                        //Upload image
                        $event_banner = image_upload($file,config("constants.EVENT_FOLDER"),'banner',$data->event_banner);
                        //Update DB Data
                        $update_data = array('event_banner' => $event_banner);
                        //Update Query
                        Event::where('id', '=', $id)->update($update_data);
                    }
                    if($request->file('event_logo')) {
                        $file = $request->file('event_logo');
                        $event_logo = image_upload($file,config("constants.EVENT_FOLDER"),'logo',$data->event_logo);
                        //Update DB Data
                        $update_data = array('event_logo' => $event_logo);
                        //Update Query
                        Event::where('id', '=', $id)->update($update_data);
                    }
                    DB::commit();
                    return redirect()->route('event')->with('success', trans('flash.UpdatedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['row'] = Event::find($id);
            $this->data['rows_method'] = EventMethod::where('published','1')->get();
            $this->data['rows_category'] = EventCategory::where('published','1')->get();
            $this->data['event_id'] = $id;
            return view('event.update',$this->data);
        }
    }

    public function delete(Request $request,$id)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $data = Event::findOrFail($id);
                $data->delete();
                DB::commit();
                return redirect()->route('event')->with('success', trans('flash.DeletedSuccessfully'));
            }   
            catch(Exception $e) {   
                DB::rollback(); 
                return back();
            }
        }
    }

    public function publish_unpublish(Request $request)
    {
        if ($request->isMethod('post')) {

            $validator = Validator::make($request->all(), [
                'id' => 'required',
                'published' => 'required',
            ]);
            if($validator->fails()) {
                return response()->json(['error' => trans('flash.UpdateError')]);
            } else {
                DB::beginTransaction();
                try {
                    $data = Event::findOrFail($request->id);
                    $data->published = $request->published;
                    $data->save();
                    DB::commit();
                    return response()->json(['success' => trans('flash.UpdatedSuccessfully')]);
                }   
                catch(Exception $e) {   
                    DB::rollback(); 
                    return back();
                }
            }
        }
    }

    public function featured(Request $request)
    {
        if ($request->isMethod('post')) {

            $validator = Validator::make($request->all(), [
                'id' => 'required',
                'featured' => 'required',
            ]);
            if($validator->fails()) {
                return response()->json(['error' => trans('flash.UpdateError')]);
            } else {
                DB::beginTransaction();
                try {
                    $data = Event::findOrFail($request->id);
                    $data->featured = $request->featured;
                    $data->save();
                    DB::commit();
                    return response()->json(['success' => trans('flash.UpdatedSuccessfully')]);
                }   
                catch(Exception $e) {   
                    DB::rollback(); 
                    return back();
                }
            }
        }
    }

    public function schedule_speakers(Request $request, $id)
    {
        if ($request->isMethod('post')) {
            $speakers_id = $request->speakers_id;
            $this->data['speakers_id'] = $speakers_id;
            $this->data['rows'] = Schedule::join('schedule_type','schedule_type.id','=','schedule.schedule_type_id')
                                            ->leftJoin('schedule_speakers',function($join) use($speakers_id) {
                                                $join->on('schedule_speakers.schedule_id','schedule.id')
                                                ->where('schedule_speakers.speakers_id',$speakers_id);
                                            })
                                            ->where('schedule.event_id','=',$id)
                                            ->get(['schedule.*','schedule_type.name as schedule_type_name','schedule_speakers.id as schedule_speakers_id']);
            echo view('event.list_schedules',$this->data);
        }
        
    }

    public function contact_information(Request $request, $id)
    {
        if ($request->isMethod('post')) {

            $validator = Validator::make($request->all(), [
                'contact_information_id' => 'required',
            ]);
            if($validator->fails()) {
                return response()->json(['error' => trans('flash.UpdateError')]);
            } else {
                DB::beginTransaction();
                try {
                    if($request->id) {
                        EventContactInformation::where('id',$request->id)->delete();
                        $contact_information_id=NULL;
                        $success_message = trans('flash.RemovedSuccessfully');
                    } else {
                        $insert_data = [
                            'event_id' => $id,
                            'contact_information_id' => $request->contact_information_id,
                        ];
                        $data = EventContactInformation::create($insert_data);
                        $data->save();
                        $contact_information_id=$data->id;
                        $success_message = trans('flash.AssignedSuccessfully');
                    }
                    DB::commit();
                    return response()->json(['success' => $success_message,'id' => $contact_information_id]);
                }   
                catch(Exception $e) {   
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['event_id'] = $id;
            $this->data['row_event'] = Event::find($id);
            $this->data['rows'] = ContactInformation::leftJoin('event_contact_information',function($join) use($id) {
                                                    $join->on('event_contact_information.contact_information_id','contact_information.id')
                                                    ->where('event_contact_information.event_id',$id);
                                                })
                                                ->orderByRaw('CASE WHEN event_contact_information.id IS NULL THEN 1 ELSE 0 END ASC')
                                                ->get(['contact_information.*','event_contact_information.id as event_contact_information_id']);
            return view('event.list_contact_information',$this->data);
        }
    }

    public function wp_sync(Request $request)
    {
        if ($request->isMethod('post')) {
            try {
                $event_id = $request->id;
                $data = Event::join('event_category','event_category.id','=','event.event_category_id')
                             ->where('event.id', $event_id)
                             ->get(['event.*','event_category.wp_term_id as category'])->first();

                $data_speakers = Speakers::join('speakers_category','speakers_category.id','=','speakers.speakers_category_id')
                                         ->Join('event_speakers',function($join) use($event_id) {
                                            $join->on('event_speakers.speakers_id','speakers.id')
                                            ->where('event_speakers.event_id',$event_id);
                                         })->orderBy('speakers.id','asc')->get(['speakers.*','speakers_category.key_name as speakers_category']);

                $data_sponsors = Sponsors::join('sponsorship_type','sponsorship_type.id','=','sponsors.sponsorship_type_id')
                                         ->Join('event_sponsors',function($join) use($event_id) {
                                            $join->on('event_sponsors.sponsors_id','sponsors.id')
                                            ->where('event_sponsors.event_id',$event_id);
                                         })->orderBy('sponsors.rank')->get(['sponsors.*','sponsorship_type.wp_term_id as sponsorship_type_id']);

                $data_cio = Cio::join('registration_request','registration_request.id','=','cio.registration_request_id')
                                         ->Join('event_cio',function($join) use($event_id) {
                                            $join->on('event_cio.cio_id','cio.id')
                                            ->where('event_cio.event_id',$event_id);
                                         })->get(['cio.*','registration_request.first_name','registration_request.last_name']);

                $agenda = Schedule::where('event_id','=',$event_id)->orderBy('schedule_day')->groupBy('schedule_day','schedule_date')->get(['schedule_day','schedule_date']);
                $agenda_details = Schedule::leftJoin('track','track.id','=','schedule.track_id')
                                          ->where('schedule.event_id','=',$event_id)->orderBy('schedule_day','asc')->orderBy('from_time','asc')->get(['schedule.*','track.name as track_name']);

                $data_agenda = [];
                foreach($agenda as $agkey => $agnda) {
                   $data_agenda[$agkey]['agenda_date'] = $agnda->schedule_date;
                   $data_agenda[$agkey]['agenda_details'] = [];
                   $index = 1;
                   foreach($agenda_details as $agdkey => $agenda_detail)
                   {
                        if($agnda->schedule_day == $agenda_detail->schedule_day)
                        {
                            $agenda_id = $agenda_detail->id;
                            $agenda_speaker = Speakers::Join('schedule_speakers',function($join) use($event_id,$agenda_id) {
                                $join->on('schedule_speakers.speakers_id','speakers.id')
                                    ->where('schedule_speakers.schedule_id',$agenda_id)
                                    ->where('schedule_speakers.event_id',$event_id);
                                })->first(['speakers.*']);
                            $data_agenda[$agkey]['agenda_details'][] = array(
                                'add_start_time' => date('h:i A',strtotime($agenda_detail->from_time)),
                                'add_end_time' => date('h:i A',strtotime($agenda_detail->to_time)),
                                'add_subtitle' => $agenda_detail->schedule_group,
                                'add_subject_details' => $agenda_detail->schedule_title,
                                'add_short_description' => $agenda_detail->schedule_details,
                                'add_session_type' => $agenda_detail->session_type,
                                'add_hall_number' => $agenda_detail->hall_number,
                                'add_track' => $agenda_detail->track_name,
                                'add_speaker_name'  => !empty($agenda_speaker) ? $agenda_speaker->name : NULL,
                                'add_speaker_designation'  => !empty($agenda_speaker) ? $agenda_speaker->designation : NULL,
                                'add_speaker_image'  => !empty($agenda_speaker) ? config('constants.CDN_URL').'/'.config('constants.SPEAKERS_FOLDER').'/'.$agenda_speaker->image : NULL,
                                'add_speaker_image_url' => !empty($agenda_speaker) ? config('constants.CDN_URL').'/'.config('constants.SPEAKERS_FOLDER').'/'.$agenda_speaker->image : NULL,
                                'row_id' => $index,
                            );
                            $index++;
                        }
                        
                   }
                }                                             

                $post_data = [
                    'category'              => $data->category,
                    'title'                 => $data->title,
                    'sub_title'             => $data->sub_title,
                    'event_start_date'      => date('d M, Y',strtotime($data->event_start_date)).' - '.date('d M, Y',strtotime($data->event_end_date)),
                    'event_venue'           => $data->event_venue,
                    'event_theme'           => $data->event_theme,
                    'overview_description'  => $data->overview_description,
                    'event_description'     => $data->event_description,
                    'event_banner'          => config('constants.CDN_URL').'/'.config('constants.EVENT_FOLDER').'/'.$data->event_banner,
                    'event_logo'            => config('constants.CDN_URL').'/'.config('constants.EVENT_FOLDER').'/'.$data->event_logo,
                    'featured_banner'       => config('constants.CDN_URL').'/'.config('constants.EVENT_FOLDER').'/'.$data->featured_banner,
                    'featured'              => $data->featured,
                    'published'             => $data->published,
                    'registration_link'     => env('APP_URL').'/registration/'.$data->slug,
                ];

                $post_data['event_speakers'] = [];
                foreach($data_speakers as $speaker)
                {
                    $post_data['event_speakers'][] = array(
                        'name'              =>  $speaker->name,
                        'company_name'      =>  $speaker->company_name,
                        'designation'       =>  $speaker->designation,
                        'speakers_category' =>  $speaker->speakers_category,
                        'image'             =>  config('constants.CDN_URL').'/'.config('constants.SPEAKERS_FOLDER').'/'.$speaker->image,
                    );
                }
                $post_data['event_sponsors'] = [];
                foreach($data_sponsors as $sponsor)
                {
                    $post_data['event_sponsors'][] = array(
                        'sponsorship_type_id'   =>  $sponsor->sponsorship_type_id,
                        'sponsor_name'          =>  $sponsor->sponsor_name,
                        'website_link'          =>  $sponsor->website_link,
                        'sponsor_logo'          =>  config('constants.CDN_URL').'/'.config('constants.SPONSORS_FOLDER').'/'.$sponsor->sponsor_logo,
                    );
                }
                $post_data['event_cios'] = [];
                foreach($data_cio as $cio)
                {
                    $post_data['event_cios'][] = array(
                        'name'              =>  $cio->first_name.' '.$cio->last_name,
                        'company_name'      =>  $cio->company_name,
                        'designation'       =>  $cio->designation,
                        'type'              =>  $cio->type,
                        'linkedin_url'      =>  $cio->linkedin_url,
                        'image'             =>  config('constants.CDN_URL').'/'.config('constants.CIO_FOLDER').'/'.$cio->image,
                    );
                }
                $post_data['event_agenda'] = $data_agenda;
                //dd($post_data['event_agenda']);
                if($data->wp_post_id) {
                    $request_url = config("constants.UPDATE_EVENT").'/'.$data->wp_post_id;
                } else {
                    $request_url = config("constants.CREATE_EVENT");
                }
                $response = Http::post(site_settings('site_api_url').$request_url,$post_data);
                $response_object = json_decode($response->getBody()->getContents());
                //dd($response_object->post_id);   
                if(isset($response_object->post_id)) {
                    $update_data = array(
                        'wp_post_id' => $response_object->post_id
                    );
                    Event::where('id', $event_id)->update($update_data);
                }
                return response()->json(['success' => trans('flash.SyncSuccessfully')]);
            }   
            catch(Exception $e) {   
                DB::rollback(); 
                return back();
            }
        }
    }
}
