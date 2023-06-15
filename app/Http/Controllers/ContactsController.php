<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use DB;

//Model
use App\Models\Contacts;

class ContactsController extends Controller
{
    protected $data;

    public function __construct()
    {
        $this->data = [
            'page_name'             => trans('admin.contacts'),
            'page_slug'             => Str::slug(trans('admin.contacts'),'-'),
            'page_url'              => route('contacts'),
            'page_add'              => 'contacts_create',
            'page_update'           => 'contacts_update',
            'page_delete'           => 'contacts_delete',
            'page_publish_unpublish'=> 'contacts_publish_unpublish',
        ];
    }  

    public function index()
    {
        $this->data['rows'] = Contacts::all();
        return view('contacts.list',$this->data);
    }

    public function create(Request $request)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'fname' => 'required',
                'lname' => 'required',
                'email' => 'required|email|unique:contacts,email',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $insert_data = [
                        'fname' => $request->fname,
                        'lname' => $request->lname,
                        'email' => $request->email,
                        'mobile'=> $request->mobile,
                        'gender' => $request->gender,
                        'designation' => $request->designation,
                        'company_name' => $request->company_name,
                        'address' => $request->address,
                    ];
                    $data = Contacts::create($insert_data);
                    $data->save();
                    $id = $data->id;
                    DB::commit();
                    return redirect()->route('contacts')->with('success', trans('flash.AddedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            return view('contacts.create',$this->data);
        }
    }

    public function update(Request $request,$id)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'fname' => 'required',
                'lname' => 'required',
                'email' => "required|email|unique:contacts,email,$id",
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $update_data = [
                        'fname' => $request->fname,
                        'lname' => $request->lname,
                        'email' => $request->email,
                        'mobile'=> $request->mobile,
                        'gender' => $request->gender,
                        'designation' => $request->designation,
                        'company_name' => $request->company_name,
                        'address' => $request->address,
                    ];
                    $data = Contacts::findOrFail($id);
                    $data->update($update_data);
                    DB::commit();
                    return redirect()->route('contacts')->with('success', trans('flash.UpdatedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['row'] = Contacts::find($id);
            return view('contacts.update',$this->data);
        }
    }

    public function delete(Request $request,$id)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $data = Contacts::findOrFail($id);
                $data->delete();
                DB::commit();
                return redirect()->route('contacts')->with('success', trans('flash.DeletedSuccessfully'));
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
