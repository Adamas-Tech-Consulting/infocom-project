<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use DB;

//Model
use App\Models\Event;
use App\Models\SponsorshipType;
use App\Models\Sponsors;
use App\Models\EventSponsors;

class SponsorsController extends Controller
{
    protected $data;

    public function __construct(Request $request)
    {
        $event_id = $request->route()->parameter('event_id');
        $this->data = [
            'page_name'             => trans('admin.sponsors'),
            'page_slug'             => Str::slug(trans('admin.sponsors'),'-'),
            'page_url'              => route('sponsors',$event_id),
            'page_add'              => 'sponsors_create',
            'page_update'           => 'sponsors_update',
            'page_delete'           => 'sponsors_delete',
            'page_publish_unpublish'=> 'sponsors_publish_unpublish',
            'event_id'              => !empty($event_id) ? $event_id : NULL,
        ];
        if($event_id) {
            $this->data['row_event'] =  Event::find($event_id);
        }
    }  

    public function index(Request $request, $event_id=NULL)
    {
        $rows = Sponsors::join('sponsorship_type','sponsorship_type.id','=','sponsors.sponsorship_type_id');
        if($event_id)
        {
            $rows = $rows->Join('event_sponsors',function($join) use($event_id) {
                $join->on('event_sponsors.sponsors_id','sponsors.id')
                ->where('event_sponsors.event_id',$event_id);
            });
        }
        $rows = $rows->orderBy('sponsorship_type.display_order')->orderBy('sponsors.rank')->get(['sponsors.*','sponsorship_type.name as sponsorship_type_name']);
        $this->data['rows'] = $rows;
        return view('sponsors.list',$this->data);
    }

    public function create(Request $request, $event_id=NULL)
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
                    if($event_id)
                    {
                        $assign_data = [
                            'event_id' => $event_id,
                            'sponsors_id' => $id,
                        ];
                        $data = EventSponsors::create($assign_data);
                    }
                    DB::commit();
                    return redirect()->route('sponsors',$event_id)->with('success', trans('flash.AddedSuccessfully')); 
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

    public function update(Request $request, $id, $event_id=NULL)
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
                    return redirect()->route('sponsors', $event_id)->with('success', trans('flash.UpdatedSuccessfully'));
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

    public function delete(Request $request, $id, $event_id=NULL)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();
            try {
                $rel_data = EventSponsors::where('sponsors_id', $id);
                $rel_data->delete();
                $data = Sponsors::findOrFail($id);
                image_delete(config("constants.SPONSORS_FOLDER"),$data->sponsor_logo);
                $data->delete();
                DB::commit();
                return redirect()->route('sponsors', $event_id)->with('success', trans('flash.DeletedSuccessfully'));
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
