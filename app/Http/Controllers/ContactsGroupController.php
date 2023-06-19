<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use DB;

//Model
use App\Models\ContactsGroup;

class ContactsGroupController extends Controller
{
    protected $data;

    public function __construct()
    {
        $this->data = [
            'page_name'             => trans('admin.contacts_group'),
            'page_slug'             => Str::slug(trans('admin.contacts_group'),'-'),
            'page_url'              => route('contacts_group'),
            'page_add'              => 'contacts_group_create',
            'page_update'           => 'contacts_group_update',
            'page_delete'           => 'contacts_group_delete',
            'page_publish_unpublish'=> 'contacts_group_publish_unpublish',
        ];
    }  

    public function index()
    {
        $this->data['rows'] = ContactsGroup::all();
        return view('contacts_group.list',$this->data);
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
                    $data = ContactsGroup::create($request->all());
                    $data->save();
                    DB::commit();
                    return redirect()->route('contacts_group')->with('success', trans('flash.AddedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            return view('contacts_group.create',$this->data);
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
                    $data = ContactsGroup::findOrFail($id);
                    $data->update($request->all());
                    DB::commit();
                    return redirect()->route('contacts_group')->with('success', trans('flash.UpdatedSuccessfully'));
                }   
                catch(Exception $e) {   
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['row'] = ContactsGroup::find($id);
            return view('contacts_group.update',$this->data);
        }
    }

    public function delete(Request $request,$id)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $data = ContactsGroup::findOrFail($id);
                $data->delete();
                DB::commit();
                return redirect()->route('contacts_group')->with('success', trans('flash.DeletedSuccessfully'));
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
                    $data = ContactsGroup::findOrFail($request->id);
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
