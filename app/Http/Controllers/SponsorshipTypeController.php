<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use DB;

//Model
use App\Models\SponsorshipTypeModel;

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
            'page_publish_unpublish'=> 'sponsorship_type_publish_unpublish',
        ];
    }  

    public function index()
    {
        $this->data['rows'] = SponsorshipTypeModel::all();
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
                    $data = SponsorshipTypeModel::create($request->all());
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
                    $data = SponsorshipTypeModel::findOrFail($id);
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
            $this->data['row'] = SponsorshipTypeModel::find($id);
            return view('sponsorship_type.update',$this->data);
        }
    }

    public function delete(Request $request,$id)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $data = SponsorshipTypeModel::findOrFail($id);
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
                    $data = SponsorshipTypeModel::findOrFail($request->id);
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
