<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use DB;

//Model
use App\Models\Event;
use App\Models\Speakers;
use App\Models\EventSpeakers;

class SpeakersController extends Controller
{
    protected $data;

    public function __construct(Request $request)
    {
        $event_id = $request->route()->parameter('event_id');
        $this->data = [
            'page_name'             => trans('admin.speakers'),
            'page_slug'             => Str::slug(trans('admin.speakers'),'-'),
            'page_url'              => route('speakers',$event_id),
            'page_add'              => 'speakers_create',
            'page_update'           => 'speakers_update',
            'page_delete'           => 'speakers_delete',
            'page_publish_unpublish'=> 'speakers_publish_unpublish',
            'event_id'              => !empty($event_id) ? $event_id : NULL,
        ];
        if($event_id) {
            $this->data['row_event'] =  Event::find($event_id);
        }
    }  

    public function index(Request $request, $event_id=NULL)
    {
        $rows = Speakers::join('speakers_category','speakers_category.id','=','speakers.speakers_category_id');
        if($event_id)
        {
            $rows = $rows->Join('event_speakers',function($join) use($event_id) {
                $join->on('event_speakers.speakers_id','speakers.id')
                ->where('event_speakers.event_id',$event_id);
            });
        }
        $rows = $rows->get(['speakers.*','speakers_category.name as speakers_category_name']);
        $this->data['rows'] = $rows;
        return view('speakers.list',$this->data);
    }

    public function create(Request $request, $event_id=NULL)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'designation' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $insert_data = [
                        'name' => $request->name,
                        'designation' => $request->designation,
                        'company_name' => $request->company_name,
                    ];
                    $data = Speakers::create($insert_data);
                    $data->save();
                    $id = $data->id;
                    if($request->file('image')) {
                        $file = $request->file('image');
                        //Upload image
                        $image = image_upload($file,config("constants.SPEAKERS_FOLDER"),'logo',NULL);
                        //Update DB Data
                        $update_data = array('image' => $image);
                        //Update Query
                        Speakers::where('id', '=', $id)->update($update_data);
                    }
                    if($event_id)
                    {
                        $assign_data = [
                            'event_id' => $event_id,
                            'speakers_id' => $id,
                        ];
                        EventSpeakers::create($assign_data);
                    }
                    DB::commit();
                    return redirect()->route('speakers', $event_id)->with('success', trans('flash.AddedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            return view('speakers.create',$this->data);
        }
    }

    public function update(Request $request,$id, $event_id=NULL)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'designation' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $update_data = [
                        'name' => $request->name,
                        'designation' => $request->designation,
                        'company_name' => $request->company_name,
                    ];
                    $data = Speakers::findOrFail($id);
                    $data->update($update_data);
                    if($request->file('image')) {
                        $file = $request->file('image');
                        //Upload image
                        $image = image_upload($file,config("constants.SPEAKERS_FOLDER"),'logo',$data->image);
                        //Update DB Data
                        $update_data = array('image' => $image);
                        //Update Query
                        Speakers::where('id', '=', $id)->update($update_data);
                    }
                    DB::commit();
                    return redirect()->route('speakers', $event_id)->with('success', trans('flash.UpdatedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['row'] = Speakers::find($id);
            return view('speakers.update',$this->data);
        }
    }

    public function delete(Request $request,$id, $event_id=NULL)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $rel_data = EventSpeakers::where('speakers_id', $id);
                $rel_data->delete();
                $data = Speakers::findOrFail($id);
                image_delete(config("constants.SPEAKERS_FOLDER"),$data->image);
                $data->delete();
                DB::commit();
                return redirect()->route('speakers', $event_id)->with('success', trans('flash.DeletedSuccessfully'));
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
                    $data = Speakers::findOrFail($request->id);
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
}
