<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use App\Helpers\Http;

use DB;

//Model
use App\Models\SponsorshipType;
use App\Models\Sponsors;

class SponsorshipTypeController extends Controller
{
    protected $data;

    public function __construct()
    {
        $this->data = [
            'page_name'             => trans('admin.sponsorship_type'),
            'page_slug'             => Str::slug(trans('admin.sponsorship_type'),'-'),
            'page_url'              => route('sponsorship_type'),
            'page_add'              => 'sponsorship_type_create',
            'page_update'           => 'sponsorship_type_update',
            'page_delete'           => 'sponsorship_type_delete',
            'page_sync'             => route('sponsorship_type_sync'),
        ];
    }  

    public function index()
    {
        $this->data['rows'] = SponsorshipType::all();
        return view('sponsorship_type.list',$this->data);
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
                    $data = SponsorshipType::create($request->all());
                    $data->save();
                    DB::commit();
                    return redirect()->route('sponsorship_type')->with('success', trans('flash.AddedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            return view('sponsorship_type.create',$this->data);
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
                    $data = SponsorshipType::findOrFail($id);
                    $data->update($request->all());
                    DB::commit();
                    return redirect()->route('sponsorship_type')->with('success', trans('flash.UpdatedSuccessfully'));
                }   
                catch(Exception $e) {   
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['row'] = SponsorshipType::find($id);
            return view('sponsorship_type.update',$this->data);
        }
    }

    public function delete(Request $request,$id)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $data = SponsorshipType::findOrFail($id);
                if(Sponsors::where('sponsorship_type_id',$id)->exists())
                {
                    return redirect()->route('sponsorship_type')->with('error', trans('flash.SponsorshipCategoryAlreadyAssigned',['name'=>$data->name]));
                }
                if($data->wp_term_id) {
                    $response = Http::post(site_settings('site_api_url').config("constants.DELETE_SPONSORSHIP_TYPE").'/'.$data->wp_term_id,[]);
                }
                $data->delete();
                DB::commit();
                return redirect()->route('sponsorship_type')->with('success', trans('flash.DeletedSuccessfully'));
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
                $data = SponsorshipType::find($request->id);
                $post_data = [
                    'name'          => $data->name,
                    'slug'          => Str::slug($data->name,'-'),
                    'description'   => $data->name
                ];
                if($data->wp_term_id) {
                    $request_url = config("constants.UPDATE_SPONSORSHIP_TYPE").'/'.$data->wp_term_id;
                } else {
                    $request_url = config("constants.CREATE_SPONSORSHIP_TYPE");
                }
                $response = Http::post(site_settings('site_api_url').$request_url,$post_data);
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
