<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

use DB;

//Model
use App\Models\User;

class UserController extends Controller
{
    protected $data;

    public function __construct()
    {
        $this->data = [
            'page_name'             => trans('admin.users'),
            'page_slug'             => Str::slug(trans('admin.users'),'-'),
            'page_url'              => route('users'),
            'page_add'              => 'users_create',
            'page_update'           => 'users_update',
            'page_delete'           => 'users_delete',
            'page_publish_unpublish'=> 'users_publish_unpublish',
        ];
    }  

    public function index()
    {
        $this->data['rows'] = User::join('roles','roles.id','=','users.role')->get(['users.*','roles.name as role_name']);
        return view('users.list',$this->data);
    }

    public function create(Request $request)
    {
        if ($request->isMethod('post')) {
            //dd($request->all());
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'confirmed' => 'required_with:password|same:password|min:6'
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $insert_data = [
                        'name' => $request->name,
                        'email' => $request->email,
                        'password' => Hash::make($request->password),
                    ];
                    $data = User::create($insert_data);
                    $data->save();
                    DB::commit();
                    return redirect()->route('users')->with('success', trans('flash.AddedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            return view('users.create',$this->data);
        }
    }

    public function update(Request $request,$id)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => "required|email|unique:users,email,$id",
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $update_data = [
                        'name' => $request->name,
                        'email' => $request->email,
                    ];
                    $data = User::findOrFail($id);
                    $data->update($update_data);
                    DB::commit();
                    return redirect()->route('users')->with('success', trans('flash.UpdatedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['row'] = User::find($id);
            return view('users.update',$this->data);
        }
    }

    public function update_password(Request $request,$id)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'password' => 'required|string|min:8',
                'confirmed' => 'required_with:password|same:password|min:6'
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $update_data = [
                        'password' => Hash::make($request->password),
                    ];
                    $data = User::findOrFail($id);
                    $data->update($update_data);
                    DB::commit();
                    return redirect()->route('users')->with('success', trans('flash.UpdatedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['row'] = User::find($id);
            return view('users.update_password',$this->data);
        }
    }

    public function delete(Request $request,$id)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $data = User::findOrFail($id);
                $data->delete();
                DB::commit();
                return redirect()->route('users')->with('success', trans('flash.DeletedSuccessfully'));
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
                    $data = User::findOrFail($request->id);
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
