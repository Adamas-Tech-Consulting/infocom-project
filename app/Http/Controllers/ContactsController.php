<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use DB;

//Model
use App\Models\Contacts;
use App\Models\ContactsGroup;

class ContactsController extends Controller
{
    protected $data;

    public function __construct(Request $request)
    {
        $group_id = $request->route()->parameter('group_id');
        $this->data = [
            'page_name'             => trans('admin.contacts'),
            'page_slug'             => Str::slug(trans('admin.contacts'),'-'),
            'page_url'              => route('contacts', $group_id),
            'page_add'              => 'contacts_create',
            'page_update'           => 'contacts_update',
            'page_delete'           => 'contacts_delete',
            'page_publish_unpublish'=> 'contacts_publish_unpublish',
            'contact_group'         => ContactsGroup::find($group_id),
            'group_id'              => $group_id
        ];
    }  

    public function index(Request $request, $group_id)
    {
        $this->data['rows'] = Contacts::where('contacts_group_id', $group_id)->get();
        return view('contacts.list',$this->data);
    }

    public function create(Request $request, $group_id)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'contacts_group_id' => 'required',
                'fname' => 'required',
                'lname' => 'required',
                'email' => 'required|email|unique:contacts,email',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $data = Contacts::create($request->all());
                    $data->save();
                    DB::commit();
                    return redirect()->route('contacts',$group_id)->with('success', trans('flash.AddedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['rows_contacts_group'] = ContactsGroup::where('published','1')->get();
            return view('contacts.create',$this->data);
        }
    }

    public function update(Request $request, $group_id, $id)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'contacts_group_id' => 'required',
                'fname' => 'required',
                'lname' => 'required',
                'email' => "required|email|unique:contacts,email,$id",
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $data = Contacts::findOrFail($id);
                    $data->update($request->all());
                    DB::commit();
                    return redirect()->route('contacts',$group_id)->with('success', trans('flash.UpdatedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['row'] = Contacts::find($id);
            $this->data['rows_contacts_group'] = ContactsGroup::where('published','1')->get();
            return view('contacts.update',$this->data);
        }
    }

    public function delete(Request $request, $group_id, $id)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $data = Contacts::findOrFail($id);
                $data->delete();
                DB::commit();
                return redirect()->route('contacts',$group_id)->with('success', trans('flash.DeletedSuccessfully'));
            }   
            catch(Exception $e) {   
                DB::rollback(); 
                return back();
            }
        }
    }

    public function publish_unpublish(Request $request, $group_id)
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
                    $data = Contacts::findOrFail($request->id);
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
