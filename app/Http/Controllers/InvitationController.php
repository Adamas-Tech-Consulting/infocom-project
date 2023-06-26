<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use DB;

//Model
use App\Models\ContactsGroup;
use App\Models\Contacts;
use App\Models\Event;
use App\Models\Invitation;
use App\Models\InvitationGroup;
use App\Models\InvitationTemplate;

class InvitationController extends Controller
{
    protected $data;

    public function __construct()
    {
        $this->data = [
            'page_name'             => trans('admin.invitation'),
            'page_slug'             => Str::slug(trans('admin.invitation'),'-'),
            'page_url'              => route('invitation'),
            'page_add'              => 'invitation_create',
            'page_update'           => 'invitation_update',
            'page_delete'           => 'invitation_delete',
            'page_publish_unpublish'=> 'invitation_publish_unpublish',
        ];
    }

    public function index()
    {
        $this->data['rows'] = InvitationGroup::join('event','event.id','invitation_group.event_id')
                                            ->get(['invitation_group.*','event.title as event_title']);
        return view('invitation.list',$this->data);
    }

    public function create(Request $request)
    {
        if ($request->isMethod('post')) {

            $validator = Validator::make($request->all(), [
                'event_id' => 'required',
                'source_group' => 'required',
                'mail_subject' => 'required',
                'mail_body' => 'required',
                'mail_signature' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $data = InvitationGroup::create($request->all());
                    $data->save();
                    $id = $data->id;
                    $contacts = Contacts::where('contacts_group_id', 1)->where('published', 1)->selectRaw("$id as invitation_group_id, fname, lname, email, mobile")->get();
                    Invitation::insert($contacts->toArray());
                    $update_data = array('total_invitee' => count($contacts->toArray()));
                    InvitationGroup::where('id', '=', $id)->update($update_data);
                    DB::commit();
                    return redirect()->route('invitation')->with('success', trans('flash.AddedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {    
            $this->data['row_template'] = InvitationTemplate::find(1);
            $this->data['rows_contacts_group'] = ContactsGroup::where('published','1')->get();
            $this->data['rows_event'] = Event::whereNotIn('id',function($query) {
                $query->select('event_id')->from('invitation_group');
            })->get(['event.id','event.title']);
            return view('invitation.create',$this->data);
        }
    }

    public function update(Request $request,$id)
    {
        if ($request->isMethod('post')) {

            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'color' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $data = InvitationGroup::findOrFail($id);
                    $data->update($request->all());
                    DB::commit();
                    return redirect()->route('invitation')->with('success', trans('flash.UpdatedSuccessfully'));
                }   
                catch(Exception $e) {   
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['row'] = InvitationGroup::find($id);
            $this->data['rows_contacts_group'] = ContactsGroup::where('published','1')->get();
            $this->data['rows_event'] = Event::where('id',$this->data['row']->event_id)->get(['event.id','event.title']);
            return view('invitation.update',$this->data);
        }
    }

    public function delete(Request $request,$id)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $data = InvitationGroup::findOrFail($id);
                $data->delete();
                DB::commit();
                return redirect()->route('invitation')->with('success', trans('flash.DeletedSuccessfully'));
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
                    $data = InvitationGroup::findOrFail($request->id);
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

    public function invitee(Request $request, $id)
    {
        $this->data['row_invitation'] = InvitationGroup::join('event','event.id','invitation_group.event_id')->where('invitation_group.id', $id)
                                            ->first(['invitation_group.id','invitation_group.total_invitee','event.title as event_title']);                                   
        $this->data['rows'] = Invitation::where('invitation_group_id', $id)->get();
        return view('invitation.list_invitee',$this->data);
    }

    public function delete_invitee(Request $request, $id)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $data = InvitationGroup::findOrFail($id);
                $data->delete();
                DB::commit();
                return redirect()->route('invitation_invitee', $id)->with('success', trans('flash.DeletedSuccessfully'));
            }   
            catch(Exception $e) {   
                DB::rollback(); 
                return back();
            }
        }
    }
}
