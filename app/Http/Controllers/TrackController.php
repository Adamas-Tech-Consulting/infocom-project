<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use DB;

//Model
use App\Models\Event;
use App\Models\Track;

class TrackController extends Controller
{
    protected $data;

    public function __construct(Request $request)
    {
        $event_id = $request->route()->parameter('event_id');
        $event = Event::find($event_id);
        $this->data = [
            'parent_page_name'          => trans('admin.event'),
            'parent_page_url'           => route('event'),
            'parent_page_single_url'    => route('event_update',$event_id),
            'row_event'                 => $event,
            'event_id'                  => $event_id,
            'page_name'                 => trans('admin.track'),
            'page_slug'                 => Str::slug(trans('admin.track'),'-'),
            'page_url'                  => route('track', $event_id),
            'page_add'                  => 'track_create',
            'page_update'               => 'track_update',
            'page_delete'               => 'track_delete',
        ];
    }  

    public function index(Request $request, $event_id)
    {
        $this->data['rows'] = Track::where('event_id',$event_id)->get();
        return view('track.list',$this->data);
    }

    public function create(Request $request, $event_id)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $request->request->add(['event_id' => $event_id]);
                    $data = Track::create($request->all());
                    $data->save();
                    $id = $data->id;
                    DB::commit();
                    return redirect()->route('track', $event_id)->with('success', trans('flash.AddedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            return view('track.create',$this->data);
        }
    }

    public function update(Request $request,$event_id,$id)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $data = Track::findOrFail($id);
                    $request->request->add(['event_id' => $data->event_id]);
                    $data->update($request->all());
                    DB::commit();
                    return redirect()->route('track',$event_id)->with('success', trans('flash.UpdatedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['row'] = Track::find($id);
            return view('track.update',$this->data);
        }
    }

    public function delete(Request $request,$event_id,$id)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $data = Track::findOrFail($id);
                $data->delete();
                DB::commit();
                return redirect()->route('Track',$event_id)->with('success', trans('flash.DeletedSuccessfully'));
            }   
            catch(Exception $e) {   
                DB::rollback(); 
                return back();
            }
        }
    }
}
