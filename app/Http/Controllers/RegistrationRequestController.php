<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use DB;

//Model
use App\Models\RegistrationRequest;

class RegistrationRequestController extends Controller
{
    protected $data;

    public function __construct()
    {
        $this->data = [
            'page_name'             => trans('admin.registration_request'),
            'page_slug'             => Str::slug(trans('admin.registration_request'),'-'),
            'page_url'              => route('registration_request'),
            'page_add'              => 'registration_request_create',
            'page_update'           => 'registration_request_update',
            'page_delete'           => 'registration_request_delete',
            'page_publish_unpublish'=> 'registration_request_publish_unpublish',
        ];
    }  

    public function index()
    {
        $this->data['rows'] = RegistrationRequest::all();
        return view('registration_request.list',$this->data);
    }

    public function delete(Request $request,$id)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $data = RegistrationRequest::findOrFail($id);
                $data->delete();
                DB::commit();
                return redirect()->route('registration_request')->with('success', trans('flash.DeletedSuccessfully'));
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
                    $data = RegistrationRequest::findOrFail($request->id);
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
