<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

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
                    $diff = strtotime($request->event_end_date) - strtotime($request->event_start_date);
                    $event_days = abs(round($diff / 86400));
                    $insert_data = [
                        'event_category_id' => $request->event_category_id,
                        'title' => $request->title,
                        'slug' => Str::slug($request->title,'-'),
                        'event_method_id' => $request->event_method_id,
                        'registration_type' => $request->registration_type,
                        'last_registration_date' => $request->last_registration_date ? date('Y-m-d',strtotime($request->last_registration_date)) : NULL,
                        'event_start_date' => date('Y-m-d',strtotime($request->event_start_date)),
                        'event_end_date' => date('Y-m-d',strtotime($request->event_end_date)),
                        'event_days' => ($event_days+1),
                        'event_venue' => $request->event_venue,
                        'event_theme' => $request->event_theme,
                        'overview_description' => $request->overview_description,
                        'event_description' => $request->event_description,
                        'featured' => (isset($request->featured) ? 1 : 0),
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
                        'event_method_id' => $request->event_method_id,
                        'registration_type' => $request->registration_type,
                        'last_registration_date' => $request->last_registration_date ? date('Y-m-d',strtotime($request->last_registration_date)) : NULL,
                        'event_start_date' => date('Y-m-d',strtotime($request->event_start_date)),
                        'event_end_date' => date('Y-m-d',strtotime($request->event_end_date)),
                        'event_days' => ($event_days+1),
                        'event_venue' => $request->event_venue,
                        'event_theme' => $request->event_theme,
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

    // public function sponsors(Request $request, $id)
    // {
    //     if ($request->isMethod('post')) {

    //         $validator = Validator::make($request->all(), [
    //             'sponsors_id' => 'required',
    //         ]);
    //         if($validator->fails()) {
    //             return response()->json(['error' => trans('flash.UpdateError')]);
    //         } else {
    //             DB::beginTransaction();
    //             try {
    //                 if($request->id) {
    //                     EventSponsors::where('id',$request->id)->delete();
    //                     $event_sponsord_id=NULL;
    //                     $success_message = trans('flash.RemovedSuccessfully');
    //                 } else {
    //                     $insert_data = [
    //                         'event_id' => $id,
    //                         'sponsors_id' => $request->sponsors_id,
    //                     ];
    //                     $data = EventSponsors::create($insert_data);
    //                     $data->save();
    //                     $event_sponsord_id=$data->id;
    //                     $success_message = trans('flash.AssignedSuccessfully');
    //                 }
    //                 DB::commit();
    //                 return response()->json(['success' => $success_message,'id' => $event_sponsord_id]);
    //             }   
    //             catch(Exception $e) {   
    //                 DB::rollback(); 
    //                 return back();
    //             }
    //         }
    //     } else {
    //         $this->data['event_id'] = $id;
    //         $this->data['row_event'] = Event::find($id);
    //         $this->data['rows'] = Sponsors::Join('event_sponsors',function($join) use($id) {
    //                                                 $join->on('event_sponsors.sponsors_id','sponsors.id')
    //                                                 ->where('event_sponsors.event_id',$id);
    //                                             })
    //                                             ->leftJoin('sponsorship_type','sponsorship_type.id','=','sponsors.sponsorship_type_id')
    //                                             ->orderByRaw('CASE WHEN event_sponsors.id IS NULL THEN 1 ELSE 0 END ASC')
    //                                             ->get(['sponsors.*','event_sponsors.id as event_sponsors_id','sponsorship_type.name as sponsorship_type_name']);
    //         return view('event.list_sponsors',$this->data);
    //     }
    // }

    public function speakers(Request $request, $id)
    {
        if ($request->isMethod('post')) {

            $validator = Validator::make($request->all(), [
                'speakers_id' => 'required',
            ]);
            if($validator->fails()) {
                return response()->json(['error' => trans('flash.UpdateError')]);
            } else {
                DB::beginTransaction();
                try {
                    if($request->id) {
                        EventSpeakers::where('id',$request->id)->delete();
                        $event_speaker_id=NULL;
                        $success_message = trans('flash.RemovedSuccessfully');
                    } else {
                        $insert_data = [
                            'event_id' => $id,
                            'speakers_id' => $request->speakers_id,
                        ];
                        $data = EventSpeakers::create($insert_data);
                        $data->save();
                        $event_speaker_id=$data->id;
                        $success_message = trans('flash.AssignedSuccessfully');
                    }
                    DB::commit();
                    return response()->json(['success' => $success_message,'id' => $event_speaker_id]);
                }   
                catch(Exception $e) {   
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['event_id'] = $id;
            $this->data['row_event'] = Event::find($id);
            $this->data['rows'] = Speakers::Join('event_speakers',function($join) use($id) {
                                                    $join->on('event_speakers.speakers_id','speakers.id')
                                                    ->where('event_speakers.event_id',$id);
                                                })
                                                ->orderByRaw('CASE WHEN event_speakers.id IS NULL THEN 1 ELSE 0 END ASC')
                                                ->get(['speakers.*','event_speakers.id as event_speakers_id','event_speakers.is_key_speaker']);
            return view('event.list_speakers',$this->data);
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
                                            ->get(['schedule.*','schedule_type.name as schedule_type_name','schedule_speakers.id as schedule_speakers_id', 'schedule_speakers.is_key_speaker']);
            echo view('event.list_schedules',$this->data);
        }
        
    }

    public function key_speakers(Request $request)
    {
        if ($request->isMethod('post')) {

            $validator = Validator::make($request->all(), [
                'id' => 'required',
                'is_key_speaker' => 'required',
            ]);
            if($validator->fails()) {
                return response()->json(['error' => trans('flash.UpdateError')]);
            } else {
                DB::beginTransaction();
                try {
                    $data = EventSpeakers::findOrFail($request->id);
                    $data->is_key_speaker = $request->is_key_speaker;
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
}
