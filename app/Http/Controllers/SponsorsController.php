<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use DB;

//Model

use App\Models\Conference;
use App\Models\SponsorshipType;
use App\Models\Sponsors;
use App\Models\ConferenceEventSponsors;

class SponsorsController extends Controller
{
    protected $data;

    public function __construct()
    {
        $this->data = [
            'page_name'             => trans('admin.sponsors'),
            'page_slug'             => Str::slug(trans('admin.sponsors'),'-'),
            'page_url'              => route('sponsors'),
            'page_add'              => 'sponsors_create',
            'page_update'           => 'sponsors_update',
            'page_delete'           => 'sponsors_delete',
            'page_publish_unpublish'=> 'sponsors_publish_unpublish',
        ];
    }  

    public function index()
    {
        $this->data['rows'] = Sponsors::join('sponsorship_type','sponsorship_type.id','=','sponsors.sponsorship_type_id')
                                           ->get(['sponsors.*','sponsorship_type.name as sponsorship_type_name']);
        return view('sponsors.list',$this->data);
    }

    public function create(Request $request, $conference_id=NULL, $event_id=NULL)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'sponsorship_type_id' => 'required',
                'sponsor_name' => 'required',
                'sponsor_logo' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $insert_data = [
                        'sponsorship_type_id' => $request->sponsorship_type_id,
                        'sponsor_name' => $request->sponsor_name,
                        'website_link' => $request->website_link,
                        'rank' => $request->rank,
                    ];
                    $data = Sponsors::create($insert_data);
                    $data->save();
                    $id = $data->id;
                    if($request->file('sponsor_logo')) {
                        $file = $request->file('sponsor_logo');
                        //Upload image
                        $sponsor_logo = image_upload($file,config("constants.SPONSORS_FOLDER"),'logo',NULL);
                        //Update DB Data
                        $update_data = array('sponsor_logo' => $sponsor_logo);
                        //Update Query
                        Sponsors::where('id', '=', $id)->update($update_data);
                    }
                    if($conference_id)
                    {
                        $assign_data = [
                            'conference_id' => $conference_id,
                            'event_id' => $event_id,
                            'sponsors_id' => $id,
                        ];
                        $data = ConferenceEventSponsors::create($assign_data);
                    }
                    DB::commit();
                    if($conference_id) {
                        return redirect()->route('conference_sponsors',$conference_id)->with('success', trans('flash.AddedAndAssignedSuccessfully'));
                    }
                    else {
                        return redirect()->route('sponsors')->with('success', trans('flash.AddedSuccessfully')); 
                    }
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['rows_sponsorship_type'] = SponsorshipType::where('published','1')->get();
            return view('sponsors.create',$this->data);
        }
    }

    public function update(Request $request,$id)
    {
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'sponsorship_type_id' => 'required',
                'sponsor_name' => 'required',
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            } else {
                DB::beginTransaction();
                try {
                    $update_data = [
                        'sponsorship_type_id' => $request->sponsorship_type_id,
                        'sponsor_name' => $request->sponsor_name,
                        'website_link' => $request->website_link,
                        'rank' => $request->rank,
                    ];
                    $data = Sponsors::findOrFail($id);
                    $data->update($update_data);
                    if($request->file('sponsor_logo')) {
                        $file = $request->file('sponsor_logo');
                        //Upload image
                        $sponsor_logo = image_upload($file,config("constants.SPONSORS_FOLDER"),'logo',$data->sponsor_logo);
                        //Update DB Data
                        $update_data = array('sponsor_logo' => $sponsor_logo);
                        //Update Query
                        Sponsors::where('id', '=', $id)->update($update_data);
                    }
                    DB::commit();
                    return redirect()->route('sponsors')->with('success', trans('flash.UpdatedSuccessfully'));
                }   
                catch(Exception $e) {
                    DB::rollback(); 
                    return back();
                }
            }
        } else {
            $this->data['row'] = Sponsors::find($id);
            $this->data['rows_sponsorship_type'] = SponsorshipType::where('published','1')->get();
            return view('sponsors.update',$this->data);
        }
    }

    public function delete(Request $request,$id)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $data = Sponsors::findOrFail($id);
                $data->delete();
                DB::commit();
                return redirect()->route('sponsors')->with('success', trans('flash.DeletedSuccessfully'));
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
                    $data = Sponsors::findOrFail($request->id);
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
