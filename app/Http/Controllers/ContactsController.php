<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use App\Exports\ContactsSampleExport;
use App\Imports\ContactsImport;
use Maatwebsite\Excel\Facades\Excel;

use DB;
use DataTables;

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
        if ($request->ajax()) {
            $contacts = Contacts::where('contacts_group_id', $group_id)
                                ->selectRaw("id, contacts_group_id, CONCAT(fname, ' ',lname, if(designation is null,'',' ('), IFNULL(designation, ''), if(designation is null,'',')')) as name, email, mobile, designation, company_name, published")
                                ->get();
            return DataTables::of($contacts)
                    ->addIndexColumn()
                    ->addColumn('action', function($row){
                        $btn = '<a href="'.route("contacts_update",[$row->contacts_group_id,$row->id]).'" class="btn btn-xs bg-gradient-primary mr-1" data-bs-toggle="tooltip" title="'.__("admin.edit").'"><i class="fas fa-edit"></i></a>';
                        $btn = $btn.'<form class="d-inline-block mr-1" id="form_'.$row->id.'" action="'.route("contacts_delete",[$row->contacts_group_id,$row->id]).'" method="post">';
                        $btn = $btn.csrf_field();
                        $btn = $btn.'<button type="button" data-form="#form_'.$row->id.'" class="btn btn-xs bg-gradient-danger delete-btn" data-bs-toggle="tooltip" title="'.__("admin.delete").'"><i class="fas fa-trash"></i></button>';
                        $btn = $btn.'</form>';
                        $btn = $btn.'<button type="button" class="btn btn-xs bg-gradient-'.(($row->published)?"success":"warning").' toggle-published"  data-bs-toggle="tooltip" title="'.(($row->published) ? __("admin.inactive") : __("admin.active")).'" data-id="'.$row->id.'" data-is-published="'.$row->published.'"><i class="fas fa-'.(($row->published)?"check-circle":"ban").'"></i></button>';
                        return $btn;
                    })
                    ->rawColumns(['action'])
                    ->make(true);
        } else {
            return view('contacts.list',$this->data);
        }
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

    public function download(Request $request, $group_id)
    {
        $filename = "sample-contacts.xlsx";
        return Excel::download(new ContactsSampleExport, $filename); 
    }

    public function upload(Request $request, $group_id)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'contacts' => 'required|mimes:xlx,xls,xlsx|max:2048'
            ]);
            if($validator->fails()) {
                return response()->json(['error' => trans('flash.UpdateError')]);
            } else {
                try {
                    Excel::import(new ContactsImport($group_id), $request->file('contacts'));
                    return response()->json(['success' => trans('flash.ImportedSuccessfully')]);
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        }
    }
}
