<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use DB;

//Model
use App\Models\Event;
use App\Models\Cio;
use App\Models\EventCio;
use App\Models\RegistrationRequest;

class CioController extends Controller
{
    protected $data;

    public function __construct(Request $request)
    {
        $event_id = $request->route()->parameter('event_id');
        $this->data = [
            'page_name'             => trans('admin.cio_ciso'),
            'page_slug'             => Str::slug(trans('admin.cio_ciso'),'-'),
            'page_url'              => route('cio',$event_id),
            'page_add'              => 'cio_create',
            'page_update'           => 'cio_update',
            'page_delete'           => 'cio_delete',
            'page_publish_unpublish'=> 'cio_publish_unpublish',
            'event_id'              => !empty($event_id) ? $event_id : NULL,
            'user_dropdown_url'     => !empty($event_id) ? route('registration_request_fetch_users',$event_id) : NULL
        ];
        if($event_id) {
            $this->data['row_event'] =  Event::find($event_id);
        }
    }  

    public function index(Request $request, $event_id=NULL)
    {
        $rows = Cio::join('registration_request','registration_request.id','=','cio.registration_request_id');
        if($event_id)
        {
            $rows = $rows->Join('event_cio',function($join) use($event_id) {
                $join->on('event_cio.cio_id','cio.id')
                ->where('event_cio.event_id',$event_id);
            });
        }
        $rows = $rows->get(['cio.*','registration_request.first_name','registration_request.last_name']);
        $this->data['rows'] = $rows;
        return view('cio.list',$this->data);
    }

    public function create(Request $request, $event_id=NULL)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'registration_request_id' => 'required',
                'designation' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $insert_data = [
                        'registration_request_id' => $request->registration_request_id,
                        'type' => $request->type,
                        'designation' => $request->designation,
                        'company_name' => $request->company_name,
                        'linkedin_url'  => $request->linkedin_url
                    ];
                    $data = Cio::create($insert_data);
                    $data->save();
                    $id = $data->id;
                    if($request->file('image')) {
                        $file = $request->file('image');
                        //Upload image
                        $image = image_upload($file,config("constants.CIO_FOLDER"),'logo',NULL);
                        //Update DB Data
                        $update_data = array('image' => $image);
                        //Update Query
                        Cio::where('id', '=', $id)->update($update_data);
                    }
                    if($event_id)
                    {
                        $assign_data = [
                            'event_id' => $event_id,
                            'cio_id' => $id,
                        ];
                        EventCio::create($assign_data);
                    }
                    DB::commit();
                    return redirect()->route('cio', $event_id)->with('success', trans('flash.AddedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            return view('cio.create',$this->data);
        }
    }

    public function update(Request $request,$id, $event_id=NULL)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'registration_request_id' => 'required',
                'designation' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $update_data = [
                        'registration_request_id' => $request->registration_request_id,
                        'type' => $request->type,
                        'designation' => $request->designation,
                        'company_name' => $request->company_name,
                        'linkedin_url'  => $request->linkedin_url
                    ];
                    $data = Cio::findOrFail($id);
                    $data->update($update_data);
                    if($request->file('image')) {
                        $file = $request->file('image');
                        //Upload image
                        $image = image_upload($file,config("constants.CIO_FOLDER"),'logo',$data->image);
                        //Update DB Data
                        $update_data = array('image' => $image);
                        //Update Query
                        Cio::where('id', '=', $id)->update($update_data);
                    }
                    DB::commit();
                    return redirect()->route('cio', $event_id)->with('success', trans('flash.UpdatedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['row'] = Cio::find($id);
            $this->data['user_name'] = RegistrationRequest::find($this->data['row']->registration_request_id);
            //dd($this->data['user_name']->toArray());
            return view('cio.update',$this->data);
        }
    }

    public function delete(Request $request,$id, $event_id=NULL)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $rel_data = EventCio::where('cio_id', $id);
                $rel_data->delete();
                $data = Cio::findOrFail($id);
                image_delete(config("constants.CIO_FOLDER"),$data->image);
                $data->delete();
                DB::commit();
                return redirect()->route('cio', $event_id)->with('success', trans('flash.DeletedSuccessfully'));
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
                    $data = Cio::findOrFail($request->id);
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
