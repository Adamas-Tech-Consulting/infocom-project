<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use DB;

//Model
use App\Models\Event;
use App\Models\Track;
use App\Models\Schedule;
use App\Models\ScheduleTrack;
use App\Models\Speakers;
use App\Models\ScheduleSpeakers;
use App\Models\ScheduleType;
use App\Models\ContactInformation;
use App\Models\ScheduleContactInformation;



class ScheduleController extends Controller
{
    protected $data;

    public function __construct(Request $request)
    {
        $event_id = $request->route()->parameter('event_id');
        $event = Event::find($event_id);
        $this->data = [
            'parent_id'                 => $event_id,
            'parent_page_name'          => trans('admin.event'),
            'parent_page_url'           => route('event'),
            'parent_page_single_url'    => route('event_update',$event_id),
            'parent_row'                => $event,
            'event_id'                  => $event_id,
            'page_name'                 => trans('admin.schedule'),
            'page_slug'                 => Str::slug(trans('admin.schedule'),'-'),
            'page_url'                  => route('schedule',$event_id),
            'page_add'                  => 'schedule_create',
            'page_update'               => 'schedule_update',
            'page_delete'               => 'schedule_delete',
            'page_publish_unpublish'    => 'schedule_publish_unpublish',
        ];
    }  

    public function index($event_id)
    {
        $this->data['rows'] = Schedule::join('schedule_type','schedule_type.id','=','schedule.schedule_type_id')
                                            ->where('event_id','=',$event_id)
                                            ->get(['schedule.*','schedule_type.name as schedule_type_name']);
        return view('schedule.list',$this->data);
    }

    public function create(Request $request, $event_id)
    {
        if ($request->isMethod('post')) {
            //dd($request->toArray());
            $validator = Validator::make($request->all(), [
                'schedule_day' => 'required',
                'schedule_title' => 'required',
                'schedule_type_id' => 'required',
                'schedule_details' => 'required',
                'hall_number' => 'required',
                'from_time' => 'required',
                'to_time' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $event = Event::find($event_id);
                    $day = ($request->schedule_day) - 1;
                    $insert_data = [
                        'event_id' => $event_id,
                        'schedule_date' => date('Y-m-d', strtotime($event->event_start_date . " +$day day")),
                        'schedule_day' => $request->schedule_day,
                        'schedule_title' => $request->schedule_title,
                        'schedule_venue' => $request->schedule_venue,
                        'schedule_type_id' => 1, //$request->schedule_type_id,
                        'schedule_details' => $request->schedule_details,
                        'from_time' => $request->from_time,
                        'to_time' => $request->to_time,
                        'hall_number' => $request->hall_number,
                        'track_id' => $request->track_id,
                        'session_type' => $request->session_type,
                    ];
                    $data = Schedule::create($insert_data);
                    $data->save();
                    $id = $data->id;
                    DB::commit();
                    return redirect()->route('schedule_update', [$event_id, $id])->with('success', trans('flash.AddedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['rows_track'] = Track::where('event_id', $event_id)->get();
            $this->data['rows_type'] = ScheduleType::where('published','1')->get();
            return view('schedule.create',$this->data);
        }
    }

    public function update(Request $request, $event_id, $id)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'schedule_day' => 'required',
                'schedule_title' => 'required',
                'schedule_type_id' => 'required',
                'schedule_details' => 'required',
                'hall_number' => 'required',
                'from_time' => 'required',
                'to_time' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $event = Event::find($event_id);
                    $day = ($request->schedule_day) - 1;
                    $update_data = [
                        'event_id' => $event_id,
                        'schedule_date' => date('Y-m-d', strtotime($event->event_start_date . " +$day day")),
                        'schedule_day' => $request->schedule_day,
                        'schedule_title' => $request->schedule_title,
                        'schedule_venue' => $request->schedule_venue,
                        'schedule_type_id' => 1, //$request->schedule_type_id,
                        'schedule_details' => $request->schedule_details,
                        'from_time' => $request->from_time,
                        'to_time' => $request->to_time,
                        'hall_number' => $request->hall_number,
                        'track_id' => $request->track_id,
                        'session_type' => $request->session_type,
                    ];
                    $data = Schedule::findOrFail($id);
                    $data->update($update_data);
                    DB::commit();
                    return redirect()->route('schedule', $event_id)->with('success', trans('flash.UpdatedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['schedule_id'] = $id;
            $this->data['rows_type'] = ScheduleType::where('published','1')->get();
            $this->data['rows_track'] = Track::where('event_id', $event_id)->get();
            $this->data['row'] = Schedule::find($id);
            $this->data['track_ids'] = array();
            $schedule_track = ScheduleTrack::where('event_id',$event_id)->where('schedule_id',$id)->get('track_id');
            foreach($schedule_track as $track)
            {
                $this->data['track_ids'][] = $track->track_id;
            }
            return view('schedule.update',$this->data);
        }
    }

    public function delete(Request $request, $event_id, $id)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $data = Schedule::findOrFail($id);
                $data->delete();
                DB::commit();
                return redirect()->route('schedule', $event_id)->with('success', trans('flash.DeletedSuccessfully'));
            }   
            catch(Exception $e) {   
                DB::rollback(); 
                return back();
            }
        }
    }

    public function publish_unpublish(Request $request, $event_id)
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
                    $data = Schedule::findOrFail($request->id);
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

    public function speakers(Request $request, $event_id, $id=NULL)
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
                        ScheduleSpeakers::where('id',$request->id)->delete();
                        $schedule_speaker_id=NULL;
                        $success_message = trans('flash.RemovedSuccessfully');
                    } else {
                        $insert_data = [
                            'event_id' => $event_id,
                            'schedule_id' => !empty($id) ? $id : $request->schedule_id,
                            'speakers_id' => $request->speakers_id,
                        ];
                        $data = ScheduleSpeakers::create($insert_data);
                        $data->save();
                        $schedule_speaker_id=$data->id;
                        $success_message = trans('flash.AssignedSuccessfully');
                    }
                    DB::commit();
                    return response()->json(['success' => $success_message,'id' => $schedule_speaker_id]);
                }   
                catch(Exception $e) {   
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['schedule_id'] = $id;
            $this->data['row_schedule'] = Schedule::find($id);
            $this->data['rows'] = Speakers::join('speakers_category','speakers_category.id','=','speakers.speakers_category_id')
                                                ->Join('event_speakers',function($join) use($event_id) {
                                                    $join->on('event_speakers.speakers_id','speakers.id')
                                                    ->where('event_speakers.event_id',$event_id);
                                                })
                                                ->leftJoin('schedule_speakers',function($join) use($event_id,$id) {
                                                    $join->on('schedule_speakers.speakers_id','speakers.id')
                                                    ->where('schedule_speakers.event_id',$event_id)
                                                    ->where('schedule_speakers.schedule_id',$id);
                                                })
                                                ->orderByRaw('speakers_category.ordering asc, CASE WHEN schedule_speakers.id IS NULL THEN 1 ELSE 0 END ASC')
                                                ->get(['speakers.*','schedule_speakers.id as schedule_speakers_id','speakers_category.name as speakers_category_name']);
            return view('schedule.list_speakers',$this->data);
        }
    }

    public function contact_information(Request $request, $event_id, $id)
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
                        ScheduleContactInformation::where('id',$request->id)->delete();
                        $contact_information_id=NULL;
                        $success_message = trans('flash.RemovedSuccessfully');
                    } else {
                        $insert_data = [
                            'event_id' => $event_id,
                            'schedule_id' => $id,
                            'contact_information_id' => $request->contact_information_id,
                        ];
                        $data = ScheduleContactInformation::create($insert_data);
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
            $this->data['schedule_id'] = $id;
            $this->data['row_schedule'] = Schedule::find($id);
            $this->data['rows'] = ContactInformation::leftJoin('schedule_contact_information',function($join) use($event_id,$id) {
                                                    $join->on('schedule_contact_information.contact_information_id','contact_information.id')
                                                    ->where('schedule_contact_information.event_id',$event_id)
                                                    ->where('schedule_contact_information.schedule_id',$id);
                                                })
                                                ->orderByRaw('CASE WHEN schedule_contact_information.id IS NULL THEN 1 ELSE 0 END ASC')
                                                ->get(['contact_information.*','schedule_contact_information.id as schedule_contact_information_id']);
            return view('schedule.list_contact_information',$this->data);
        }
    }
}
