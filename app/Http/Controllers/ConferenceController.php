<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use DB;

//Model
use App\Models\ConferenceCategoryModel;
use App\Models\ConferenceMethodModel;
use App\Models\ConferenceModel;

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
        $this->data['rows'] = ConferenceModel::join('conference_category','conference_category.id','=','conference.conference_category_id')
                                             ->join('conference_method','conference_method.id','=','conference.conference_method_id')
                                             ->get(['conference.*','conference_category.name as conference_category_name','conference_method.name as conference_method_name']);
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
                        'auto_registration_date_limit' => $request->auto_registration_date_limit ? date('Y-m-d',strtotime($request->auto_registration_date_limit)) : NULL,
                        'conference_start_date' => date('Y-m-d',strtotime($request->conference_start_date)),
                        'conference_end_date' => date('Y-m-d',strtotime($request->conference_end_date)),
                        'conference_venue' => $request->conference_venue,
                        'conference_theme' => $request->conference_theme,
                        'overview_description' => $request->overview_description,
                        'conference_description' => $request->conference_description,
                    ];
                    $data = ConferenceModel::create($insert_data);
                    $data->save();
                    $id = $data->id;
                    if($request->file('conference_banner')) {
                        $file = $request->file('conference_banner');
                        //Upload image
                        $conference_banner = image_upload($file,config("constants.CONFERENCE_FOLDER"),'banner',NULL);
                        //Update DB Data
                        $update_data = array('conference_banner' => $conference_banner);
                        //Update Query
                        ConferenceModel::where('id', '=', $id)->update($update_data);
                    }
                    if($request->file('conference_logo')) {
                        $file = $request->file('conference_logo');
                        $conference_logo = image_upload($file,config("constants.CONFERENCE_FOLDER"),'logo',NULL);
                        //Update DB Data
                        $update_data = array('conference_logo' => $conference_logo);
                        //Update Query
                        ConferenceModel::where('id', '=', $id)->update($update_data);
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
            $this->data['rows_method'] = ConferenceMethodModel::where('published','1')->get();
            $this->data['rows_category'] = ConferenceCategoryModel::where('published','1')->get();
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
                        'auto_registration_date_limit' => $request->auto_registration_date_limit ? date('Y-m-d',strtotime($request->auto_registration_date_limit)) : NULL,
                        'conference_start_date' => date('Y-m-d',strtotime($request->conference_start_date)),
                        'conference_end_date' => date('Y-m-d',strtotime($request->conference_end_date)),
                        'conference_venue' => $request->conference_venue,
                        'conference_theme' => $request->conference_theme,
                        'overview_description' => $request->overview_description,
                        'conference_description' => $request->conference_description,
                    ];
                    $data = ConferenceModel::findOrFail($id);
                    $data->update($update_data);
                    if($request->file('conference_banner')) {
                        $file = $request->file('conference_banner');
                        //Upload image
                        $conference_banner = image_upload($file,config("constants.CONFERENCE_FOLDER"),'banner',$data->conference_banner);
                        //Update DB Data
                        $update_data = array('conference_banner' => $conference_banner);
                        //Update Query
                        ConferenceModel::where('id', '=', $id)->update($update_data);
                    }
                    if($request->file('conference_logo')) {
                        $file = $request->file('conference_logo');
                        $conference_logo = image_upload($file,config("constants.CONFERENCE_FOLDER"),'logo',$data->conference_logo);
                        //Update DB Data
                        $update_data = array('conference_logo' => $conference_logo);
                        //Update Query
                        ConferenceModel::where('id', '=', $id)->update($update_data);
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
            $this->data['row'] = ConferenceModel::find($id);
            $this->data['rows_method'] = ConferenceMethodModel::where('published','1')->get();
            $this->data['rows_category'] = ConferenceCategoryModel::where('published','1')->get();
            return view('conference.update',$this->data);
        }
    }

    public function delete(Request $request,$id)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $data = ConferenceModel::findOrFail($id);
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
                    $data = ConferenceModel::findOrFail($request->id);
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
