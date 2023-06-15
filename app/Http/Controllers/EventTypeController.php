<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use DB;

//Model
use App\Models\EventType;

class EventTypeController extends Controller
{
    protected $data;

    public function __construct()
    {
        $this->data = [
            'page_name'             => trans('admin.event_type'),
            'page_slug'             => Str::slug(trans('admin.event_type'),'-'),
            'page_url'              => route('event_type'),
            'page_add'              => 'event_type_create',
            'page_update'           => 'event_type_update',
            'page_delete'           => 'event_type_delete',
            'page_publish_unpublish'=> 'event_type_publish_unpublish',
        ];
    }  

    public function index()
    {
        $this->data['rows'] = EventType::all();
        return view('event_type.list',$this->data);
    }

    public function create(Request $request)
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
                    $data = EventType::create($request->all());
                    $data->save();
                    DB::commit();
                    return redirect()->route('event_type')->with('success', trans('flash.AddedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            return view('event_type.create',$this->data);
        }
    }

    public function update(Request $request,$id)
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
                    $data = EventType::findOrFail($id);
                    $data->update($request->all());
                    DB::commit();
                    return redirect()->route('event_type')->with('success', trans('flash.UpdatedSuccessfully'));
                }   
                catch(Exception $e) {   
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['row'] = EventType::find($id);
            return view('event_type.update',$this->data);
        }
    }

    public function delete(Request $request,$id)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $data = EventType::findOrFail($id);
                $data->delete();
                DB::commit();
                return redirect()->route('event_type')->with('success', trans('flash.DeletedSuccessfully'));
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
                    $data = EventType::findOrFail($request->id);
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
