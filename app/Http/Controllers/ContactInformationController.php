<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use DB;

//Model
use App\Models\ContactInformation;
use App\Models\ConferenceContactInformation;
use App\Models\ConferenceEventContactInformation;

class ContactInformationController extends Controller
{
    protected $data;

    public function __construct()
    {
        $this->data = [
            'page_name'             => trans('admin.contact_information'),
            'page_slug'             => Str::slug(trans('admin.contact_information'),'-'),
            'page_url'              => route('contact_information'),
            'page_add'              => 'contact_information_create',
            'page_update'           => 'contact_information_update',
            'page_delete'           => 'contact_information_delete',
            'page_publish_unpublish'=> 'contact_information_publish_unpublish',
        ];
    }  

    public function index()
    {
        $this->data['rows'] = ContactInformation::all();
        return view('contact_information.list',$this->data);
    }

    public function create(Request $request, $conference_id=NULL, $event_id=NULL)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'mobile' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $data = ContactInformation::create($request->all());
                    $data->save();
                    $id = $data->id;
                    if($conference_id)
                    {
                        $assign_data = [
                            'conference_id' => $conference_id,
                            'contact_information_id' => $id,
                        ];

                        if($event_id) {
                            $assign_data['event_id'] = $event_id;
                            ConferenceEventContactInformation::create($assign_data);
                        } else {
                            ConferenceContactInformation::create($assign_data);
                        }
                    }
                    DB::commit();
                    if($conference_id) {
                        if($event_id) {
                            return redirect()->route('event_contact_information',[$conference_id, $event_id])->with('success', trans('flash.AddedAndAssignedSuccessfully'));
                        } else {
                            return redirect()->route('conference_contact_information',$conference_id)->with('success', trans('flash.AddedAndAssignedSuccessfully'));
                        }
                    }
                    else {
                        return redirect()->route('contact_information')->with('success', trans('flash.AddedSuccessfully'));
                    } 
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            return view('contact_information.create',$this->data);
        }
    }

    public function update(Request $request,$id)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'mobile' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $data = ContactInformation::findOrFail($id);
                    $data->update($request->all());
                    DB::commit();
                    return redirect()->route('contact_information')->with('success', trans('flash.UpdatedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['row'] = ContactInformation::find($id);
            return view('contact_information.update',$this->data);
        }
    }

    public function delete(Request $request,$id)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $data = ContactInformation::findOrFail($id);
                $data->delete();
                DB::commit();
                return redirect()->route('contact_information')->with('success', trans('flash.DeletedSuccessfully'));
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
                    $data = ContactInformation::findOrFail($request->id);
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
