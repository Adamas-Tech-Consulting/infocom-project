<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use DB;

//Model
use App\Models\Conference;
use App\Models\ConferenceEvent;
use App\Models\ConferenceEventDetails;
use App\Models\Sponsors;
use App\Models\ConferenceEventSponsors;
use App\Models\Speakers;
use App\Models\ConferenceEventSpeakers;
use App\Models\EventType;

class ConferenceEventController extends Controller
{
    protected $data;

    public function __construct(Request $request)
    {
        $conference_id = $request->route()->parameter('conference_id');
        $conference = Conference::find($conference_id);
        $this->data = [
            'parent_id'                 => $conference_id,
            'parent_page_name'          => trans('admin.conference'),
            'parent_page_url'           => route('conference'),
            'parent_page_single_url'    => route('conference_update',$conference_id),
            'parent_row'                => $conference,
            'page_name'                 => trans('admin.event'),
            'page_slug'                 => Str::slug(trans('admin.event'),'-'),
            'page_url'                  => route('event',$conference_id),
            'page_add'                  => 'event_create',
            'page_update'               => 'event_update',
            'page_delete'               => 'event_delete',
            'page_publish_unpublish'    => 'event_publish_unpublish',
            'route_create_event_details'=> route('event_details_create',$conference_id),
        ];
    }  

    public function index($conference_id)
    {
        $this->data['rows'] = ConferenceEvent::join('event_type','event_type.id','=','event.event_type_id')
                                            ->where('conference_id','=',$conference_id)
                                            ->get(['event.*','event_type.name as event_type_name']);
        return view('conference_event.list',$this->data);
    }

    public function create(Request $request, $conference_id)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'conference_id' => 'required',
                'event_date' => 'required',
                'event_day' => 'required',
                'event_title' => 'required',
                'event_type_id' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $insert_data = [
                        'conference_id' => $conference_id,
                        'event_date' => date('Y-m-d',strtotime($request->event_date)),
                        'event_day' => $request->event_day,
                        'event_title' => $request->event_title,
                        'event_venue' => $request->event_venue,
                        'event_type_id' => $request->event_type_id,
                    ];
                    $data = ConferenceEvent::create($insert_data);
                    $data->save();
                    $id = $data->id;
                    if(!empty($request->hall_number) && !empty($request->from_time) && !empty($request->to_time) && !empty($request->is_wishlist) && !empty($request->subject_line))
                    {
                        for($i=0; $i<count($request->from_time); $i++)
                        {
                            if(isset($request->from_time[$i]) && $request->from_time[$i] && isset($request->subject_line[$i]) && $request->subject_line[$i])
                            {
                                $insert_details_data = [
                                    'conference_id' => $conference_id,
                                    'event_id' => $id,
                                    'hall_number' => $request->hall_number[$i],
                                    'from_time' => $request->from_time[$i],
                                    'to_time' => $request->to_time[$i],
                                    'is_wishlist' => $request->is_wishlist[$i],
                                    'subject_line' => $request->subject_line[$i],
                                ];
                                $details_data = ConferenceEventDetails::create($insert_details_data);
                                $details_data->save();
                            }
                        }
                    }
                    DB::commit();
                    return redirect()->route('event', $conference_id)->with('success', trans('flash.AddedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['rows_type'] = EventType::where('published','1')->get();
            return view('conference_event.create',$this->data);
        }
    }

    public function update(Request $request, $conference_id, $id)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'conference_id' => 'required',
                'event_date' => 'required',
                'event_day' => 'required',
                'event_title' => 'required',
                'event_type_id' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $update_data = [
                        'conference_id' => $conference_id,
                        'event_date' => date('Y-m-d',strtotime($request->event_date)),
                        'event_day' => $request->event_day,
                        'event_title' => $request->event_title,
                        'event_venue' => $request->event_venue,
                        'event_type_id' => $request->event_type_id,
                    ];
                    $data = ConferenceEvent::findOrFail($id);
                    $data->update($update_data);
                    if(!empty($request->from_time) && !empty($request->is_wishlist) && !empty($request->subject_line))
                    {
                        $row_event_details = ConferenceEventDetails::where('conference_id','=', $conference_id)->where('event_id','=', $id)->get(['id']);
                        $event_details_ids = (!empty($request->event_details_id) && count($request->event_details_id)>0) ? $request->event_details_id : [];
                        foreach($row_event_details as $event_details)
                        {
                            if(!in_array($event_details->id, $event_details_ids))
                            {
                                ConferenceEventDetails::where('id','=', $event_details->id)->delete();
                            }
                        }                       
                        for($i=0; $i<count($request->from_time); $i++)
                        {
                            if((isset($request->from_time[$i]) && $request->from_time[$i] && isset($request->subject_line[$i]) && $request->subject_line[$i]))
                            {
                                if(isset($request->event_details_id[$i]) && $request->event_details_id[$i])
                                {
                                    $update_details_data = [
                                        'hall_number' => $request->hall_number[$i],
                                        'from_time' => $request->from_time[$i],
                                        'to_time' => $request->to_time[$i],
                                        'is_wishlist' => $request->is_wishlist[$i],
                                        'subject_line' => $request->subject_line[$i],
                                    ];
                                    $details_data = ConferenceEventDetails::findOrFail($request->event_details_id[$i]);
                                    $details_data->update($update_details_data);
                                }
                                else
                                {
                                    $insert_details_data = [
                                        'conference_id' => $conference_id,
                                        'event_id' => $id,
                                        'hall_number' => $request->hall_number[$i],
                                        'from_time' => $request->from_time[$i],
                                        'to_time' => $request->to_time[$i],
                                        'is_wishlist' => $request->is_wishlist[$i],
                                        'subject_line' => $request->subject_line[$i],
                                    ];
                                    $details_data = ConferenceEventDetails::create($insert_details_data);
                                    $details_data->save();
                                }   
                            }
                        }
                    }
                    DB::commit();
                    return redirect()->route('event', $conference_id)->with('success', trans('flash.UpdatedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['row_details'] = ConferenceEventDetails::where('conference_id','=', $conference_id)->where('event_id','=', $id)->get();
            $this->data['rows_type'] = EventType::where('published','1')->get();
            $this->data['row'] = ConferenceEvent::find($id);
            return view('conference_event.update',$this->data);
        }
    }

    public function delete(Request $request, $conference_id, $id)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $data = ConferenceEvent::findOrFail($id);
                $data->delete();
                DB::commit();
                return redirect()->route('event', $conference_id)->with('success', trans('flash.DeletedSuccessfully'));
            }   
            catch(Exception $e) {   
                DB::rollback(); 
                return back();
            }
        }
    }

    public function publish_unpublish(Request $request, $conference_id)
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
                    $data = ConferenceEvent::findOrFail($request->id);
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

    public function create_event_details(Request $request, $conference_id)
    {
        return view('conference_event.create_event_details');
    }

    public function sponsors(Request $request, $conference_id, $id)
    {
        if ($request->isMethod('post')) {

            $validator = Validator::make($request->all(), [
                'sponsors_id' => 'required',
            ]);
            if($validator->fails()) {
                return response()->json(['error' => trans('flash.UpdateError')]);
            } else {
                DB::beginTransaction();
                try {
                    if($request->id) {
                        ConferenceEventSponsors::where('id',$request->id)->delete();
                        $event_sponsord_id=NULL;
                        $success_message = trans('flash.RemovedSuccessfully');
                    } else {
                        $insert_data = [
                            'conference_id' => $conference_id,
                            'event_id' => $id,
                            'sponsors_id' => $request->sponsors_id,
                        ];
                        $data = ConferenceEventSponsors::create($insert_data);
                        $data->save();
                        $event_sponsord_id=$data->id;
                        $success_message = trans('flash.AssignedSuccessfully');
                    }
                    DB::commit();
                    return response()->json(['success' => $success_message,'id' => $event_sponsord_id]);
                }   
                catch(Exception $e) {   
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['row_event'] = ConferenceEvent::find($id);
            $this->data['rows'] = Sponsors::leftJoin('event_sponsors',function($join) use($conference_id,$id) {
                                                    $join->on('event_sponsors.sponsors_id','sponsors.id')
                                                    ->where('event_sponsors.conference_id',$conference_id)
                                                    ->where('event_sponsors.event_id',$id);
                                                })
                                                ->leftJoin('sponsorship_type','sponsorship_type.id','=','sponsors.sponsorship_type_id')
                                                ->orderByRaw('CASE WHEN event_sponsors.id IS NULL THEN 1 ELSE 0 END ASC')
                                                ->get(['sponsors.*','event_sponsors.id as event_sponsors_id','sponsorship_type.name as sponsorship_type_name']);
            return view('conference_event.list_sponsors',$this->data);
        }
    }

    public function speakers(Request $request, $conference_id, $id)
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
                        ConferenceEventSpeakers::where('id',$request->id)->delete();
                        $event_speaker_id=NULL;
                        $success_message = trans('flash.RemovedSuccessfully');
                    } else {
                        $insert_data = [
                            'conference_id' => $conference_id,
                            'event_id' => $id,
                            'speakers_id' => $request->speakers_id,
                        ];
                        $data = ConferenceEventSpeakers::create($insert_data);
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
            $this->data['row_event'] = ConferenceEvent::find($id);
            $this->data['rows'] = Speakers::leftJoin('event_speakers',function($join) use($conference_id,$id) {
                                                    $join->on('event_speakers.speakers_id','speakers.id')
                                                    ->where('event_speakers.conference_id',$conference_id)
                                                    ->where('event_speakers.event_id',$id);
                                                })
                                                ->orderByRaw('CASE WHEN event_speakers.id IS NULL THEN 1 ELSE 0 END ASC')
                                                ->get(['speakers.*','event_speakers.id as event_speakers_id','event_speakers.is_key_speaker']);
            return view('conference_event.list_speakers',$this->data);
        }
    }

    public function key_speakers(Request $request, $conference_id)
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
                    $data = ConferenceEventSpeakers::findOrFail($request->id);
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
}
