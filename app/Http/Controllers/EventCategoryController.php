<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use App\Helpers\Http;

use DB;

//Model
use App\Models\EventCategory;
use App\Models\Event;

class EventCategoryController extends Controller
{
    protected $data;

    public function __construct()
    {
        $this->data = [
            'page_name'             => trans('admin.event_category'),
            'page_slug'             => Str::slug(trans('admin.event_category'),'-'),
            'page_url'              => route('event_category'),
            'page_add'              => 'event_category_create',
            'page_update'           => 'event_category_update',
            'page_delete'           => 'event_category_delete',
            'page_sync'             => 'event_category_sync'
        ];
    }  

    public function index()
    {
        $this->data['rows'] = EventCategory::all();
        return view('event_category.list',$this->data);
    }

    public function create(Request $request)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'color' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $data = EventCategory::create($request->all());
                    $data->save();
                    DB::commit();
                    return redirect()->route('event_category')->with('success', trans('flash.AddedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            return view('event_category.create',$this->data);
        }
    }

    public function update(Request $request,$id)
    {
        if ($request->isMethod('post')) {

            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'color' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $data = EventCategory::findOrFail($id);
                    $data->update($request->all());
                    DB::commit();
                    return redirect()->route('event_category')->with('success', trans('flash.UpdatedSuccessfully'));
                }   
                catch(Exception $e) {   
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['row'] = EventCategory::find($id);
            return view('event_category.update',$this->data);
        }
    }

    public function delete(Request $request,$id)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $data = EventCategory::findOrFail($id);
                if(Event::where('event_category_id',$id)->exists())
                {
                    return redirect()->route('event_category')->with('error', trans('flash.EventCategoryAlreadyAssigned',['name'=>$data->name]));
                }
                if($data->wp_term_id) {
                    $response = Http::post(config("constants.SITE_URL").config("constants.DELETE_EVENT_CATEGORY").'/'.$data->wp_term_id,[]);
                }
                $data->delete();
                DB::commit();
                return redirect()->route('event_category')->with('success', trans('flash.DeletedSuccessfully'));
            }   
            catch(Exception $e) {   
                DB::rollback(); 
                return back();
            }
        }
    }

    public function wp_sync(Request $request)
    {
        if ($request->isMethod('post')) {
            try {
                $data = EventCategory::find($request->id);
                $post_data = [
                    'name'          => $data->name,
                    'slug'          => Str::slug($data->name,'-'),
                    'description'   => $data->name
                ];
                if($data->wp_term_id) {
                    $request_url = config("constants.UPDATE_EVENT_CATEGORY").'/'.$data->wp_term_id;
                } else {
                    $request_url = config("constants.CREATE_EVENT_CATEGORY");
                }
                $response = Http::post(config("constants.SITE_URL").$request_url,$post_data);
                $response_object = json_decode($response->getBody()->getContents());
                if(isset($response_object->term_id)) {
                    $data->update(array('wp_term_id' => $response_object->term_id));
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
