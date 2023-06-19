<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use DB;

//Model
use App\Models\ConferenceCategory;
use App\Models\ConferenceMethod;
use App\Models\Conference;
use App\Models\Sponsors;
use App\Models\ConferenceSponsors;
use App\Models\Speakers;
use App\Models\ConferenceSpeakers;

class ConferenceController extends Controller
{
    protected $data;

    public function __construct()
    {
        $this->data = [
            'page_name'             => trans('admin.conference'),
            'page_slug'             => Str::slug(trans('admin.conference'),'-'),
            'page_url'              => route('conference'),
            'page_add'              => 'conference_create',
            'page_update'           => 'conference_update',
            'page_delete'           => 'conference_delete',
            'page_publish_unpublish'=> 'conference_publish_unpublish',
        ];
    }  

    public function index()
    {
        $this->data['rows'] = Conference::join('conference_category','conference_category.id','=','conference.conference_category_id')
                                             ->join('conference_method','conference_method.id','=','conference.conference_method_id')
                                             ->get(['conference.*','conference_category.name as conference_category_name','conference_category.color as conference_category_color','conference_method.name as conference_method_name']);
        return view('conference.list',$this->data);
    }

    public function create(Request $request)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'conference_category_id' => 'required',
                'title' => 'required',
                'conference_method_id' => 'required',
                'conference_start_date' => 'required',
                'conference_end_date' => 'required',
                'conference_venue' => 'required',
                'conference_theme' => 'required',
                'conference_banner' => 'required',
                'conference_logo' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $insert_data = [
                        'conference_category_id' => $request->conference_category_id,
                        'title' => $request->title,
                        'slug' => Str::slug($request->title,'-'),
                        'conference_method_id' => $request->conference_method_id,
                        'registration_type' => $request->registration_type,
                        'last_registration_date' => $request->last_registration_date ? date('Y-m-d',strtotime($request->last_registration_date)) : NULL,
                        'conference_start_date' => date('Y-m-d',strtotime($request->conference_start_date)),
                        'conference_end_date' => date('Y-m-d',strtotime($request->conference_end_date)),
                        'conference_venue' => $request->conference_venue,
                        'conference_theme' => $request->conference_theme,
                        'overview_description' => $request->overview_description,
                        'conference_description' => $request->conference_description,
                    ];
                    $data = Conference::create($insert_data);
                    $data->save();
                    $id = $data->id;
                    if($request->file('conference_banner')) {
                        $file = $request->file('conference_banner');
                        //Upload image
                        $conference_banner = image_upload($file,config("constants.CONFERENCE_FOLDER"),'banner',NULL);
                        //Update DB Data
                        $update_data = array('conference_banner' => $conference_banner);
                        //Update Query
                        Conference::where('id', '=', $id)->update($update_data);
                    }
                    if($request->file('conference_logo')) {
                        $file = $request->file('conference_logo');
                        $conference_logo = image_upload($file,config("constants.CONFERENCE_FOLDER"),'logo',NULL);
                        //Update DB Data
                        $update_data = array('conference_logo' => $conference_logo);
                        //Update Query
                        Conference::where('id', '=', $id)->update($update_data);
                    }
                    DB::commit();
                    return redirect()->route('conference')->with('success', trans('flash.AddedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['rows_method'] = ConferenceMethod::where('published','1')->get();
            $this->data['rows_category'] = ConferenceCategory::where('published','1')->get();
            return view('conference.create',$this->data);
        }
    }

    public function update(Request $request,$id)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'conference_category_id' => 'required',
                'title' => 'required',
                'conference_method_id' => 'required',
                'conference_start_date' => 'required',
                'conference_end_date' => 'required',
                'conference_venue' => 'required',
                'conference_theme' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $update_data = [
                        'conference_category_id' => $request->conference_category_id,
                        'title' => $request->title,
                        'slug' => Str::slug($request->title,'-'),
                        'conference_method_id' => $request->conference_method_id,
                        'registration_type' => $request->registration_type,
                        'last_registration_date' => $request->last_registration_date ? date('Y-m-d',strtotime($request->last_registration_date)) : NULL,
                        'conference_start_date' => date('Y-m-d',strtotime($request->conference_start_date)),
                        'conference_end_date' => date('Y-m-d',strtotime($request->conference_end_date)),
                        'conference_venue' => $request->conference_venue,
                        'conference_theme' => $request->conference_theme,
                        'overview_description' => $request->overview_description,
                        'conference_description' => $request->conference_description,
                    ];
                    $data = Conference::findOrFail($id);
                    $data->update($update_data);
                    if($request->file('conference_banner')) {
                        $file = $request->file('conference_banner');
                        //Upload image
                        $conference_banner = image_upload($file,config("constants.CONFERENCE_FOLDER"),'banner',$data->conference_banner);
                        //Update DB Data
                        $update_data = array('conference_banner' => $conference_banner);
                        //Update Query
                        Conference::where('id', '=', $id)->update($update_data);
                    }
                    if($request->file('conference_logo')) {
                        $file = $request->file('conference_logo');
                        $conference_logo = image_upload($file,config("constants.CONFERENCE_FOLDER"),'logo',$data->conference_logo);
                        //Update DB Data
                        $update_data = array('conference_logo' => $conference_logo);
                        //Update Query
                        Conference::where('id', '=', $id)->update($update_data);
                    }
                    DB::commit();
                    return redirect()->route('conference')->with('success', trans('flash.UpdatedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['row'] = Conference::find($id);
            $this->data['rows_method'] = ConferenceMethod::where('published','1')->get();
            $this->data['rows_category'] = ConferenceCategory::where('published','1')->get();
            return view('conference.update',$this->data);
        }
    }

    public function delete(Request $request,$id)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $data = Conference::findOrFail($id);
                $data->delete();
                DB::commit();
                return redirect()->route('conference')->with('success', trans('flash.DeletedSuccessfully'));
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
                    $data = Conference::findOrFail($request->id);
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

    public function sponsors(Request $request, $id)
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
                        ConferenceSponsors::where('id',$request->id)->delete();
                        $event_sponsord_id=NULL;
                        $success_message = trans('flash.RemovedSuccessfully');
                    } else {
                        $insert_data = [
                            'conference_id' => $id,
                            'sponsors_id' => $request->sponsors_id,
                        ];
                        $data = ConferenceSponsors::create($insert_data);
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
            $this->data['row_conference'] = Conference::find($id);
            $this->data['rows'] = Sponsors::leftJoin('conference_sponsors',function($join) use($id) {
                                                    $join->on('conference_sponsors.sponsors_id','sponsors.id')
                                                    ->where('conference_sponsors.conference_id',$id);
                                                })
                                                ->leftJoin('sponsorship_type','sponsorship_type.id','=','sponsors.sponsorship_type_id')
                                                ->orderByRaw('CASE WHEN conference_sponsors.id IS NULL THEN 1 ELSE 0 END ASC')
                                                ->get(['sponsors.*','conference_sponsors.id as conference_sponsors_id','sponsorship_type.name as sponsorship_type_name']);
            return view('conference.list_sponsors',$this->data);
        }
    }

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
                        ConferenceSpeakers::where('id',$request->id)->delete();
                        $event_speaker_id=NULL;
                        $success_message = trans('flash.RemovedSuccessfully');
                    } else {
                        $insert_data = [
                            'conference_id' => $id,
                            'speakers_id' => $request->speakers_id,
                        ];
                        $data = ConferenceSpeakers::create($insert_data);
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
            $this->data['row_conference'] = Conference::find($id);
            $this->data['rows'] = Speakers::leftJoin('conference_speakers',function($join) use($id) {
                                                    $join->on('conference_speakers.speakers_id','speakers.id')
                                                    ->where('conference_speakers.conference_id',$id);
                                                })
                                                ->orderByRaw('CASE WHEN conference_speakers.id IS NULL THEN 1 ELSE 0 END ASC')
                                                ->get(['speakers.*','conference_speakers.id as conference_speakers_id','conference_speakers.is_key_speaker']);
            return view('conference.list_speakers',$this->data);
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
                    $data = ConferenceSpeakers::findOrFail($request->id);
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
