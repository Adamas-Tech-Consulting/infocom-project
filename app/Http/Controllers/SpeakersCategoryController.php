<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use DB;

//Model
use App\Models\Speakers;
use App\Models\SpeakersCategory;

class SpeakersCategoryController extends Controller
{
    protected $data;

    public function __construct()
    {
        $this->data = [
            'page_name'             => trans('admin.speakers_category'),
            'page_slug'             => Str::slug(trans('admin.speakers_category'),'-'),
            'page_url'              => route('speakers_category'),
            'page_add'              => 'speakers_category_create',
            'page_update'           => 'speakers_category_update',
            'page_delete'           => 'speakers_category_delete',
            'page_publish_unpublish'=> 'speakers_category_publish_unpublish',
        ];
    }  

    public function index()
    {
        $this->data['rows'] = SpeakersCategory::all();
        return view('speakers_category.list',$this->data);
    }

    public function create(Request $request)
    {
        if ($request->isMethod('post')) {

            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'ordering' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $data = SpeakersCategory::create($request->all());
                    $data->save();
                    DB::commit();
                    return redirect()->route('speakers_category')->with('success', trans('flash.AddedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            return view('speakers_category.create',$this->data);
        }
    }

    public function update(Request $request,$id)
    {
        if ($request->isMethod('post')) {

            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'ordering' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $data = SpeakersCategory::findOrFail($id);
                    $data->update($request->all());
                    DB::commit();
                    return redirect()->route('speakers_category')->with('success', trans('flash.UpdatedSuccessfully'));
                }   
                catch(Exception $e) {   
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['row'] = SpeakersCategory::find($id);
            return view('speakers_category.update',$this->data);
        }
    }

    public function delete(Request $request,$id)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $data = SpeakersCategory::findOrFail($id);
                if(Speakers::where('speakers_category_id', $id)->exists())
                {
                    return redirect()->route('speakers_category')->with('error', trans('flash.SpeakerCategoryAlreadyAssigned',['name'=>$data->name])); 
                }
                else
                {
                    $data = SpeakersCategory::findOrFail($id);
                    $data->delete();
                }
                DB::commit();
                return redirect()->route('speakers_category')->with('success', trans('flash.DeletedSuccessfully'));
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
                    $data = SpeakersCategory::findOrFail($request->id);
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
