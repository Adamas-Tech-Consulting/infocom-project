<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Support\Facades\Auth;

//Model
use App\Models\EventCategory;
use App\Models\EventMethod;
use App\Models\Event;
use App\Models\Schedule;
use App\Models\ScheduleDetails;
use App\Models\Sponsors;
use App\Models\SponsorshipType;
use App\Models\Speakers;

class HomeController extends BaseController
{
    protected $data;

    public function __construct()
    {
        $this->data = [];
    }  
    public function getEvent(Request $request)
    {
        if ($request->isMethod('get')) 
        {
            try {
                $events = Event::join('event_category','event_category.id','=','event.event_category_id')
                                ->join('event_method','event_method.id','=','event.event_method_id')
                                ->where('event.published','1')
                                ->get(
                                    [
                                        'event.id as event_id',
                                        'title',
                                        'event_category.name as event_category',
                                        'event_method.name as event_method',
                                        'registration_type',
                                        'last_registration_date',
                                        'event_start_date',
                                        'event_end_date',
                                        'event_venue',
                                        'event_theme',
                                        'overview_description',
                                        'event_description',
                                        'event_banner',
                                        'event_logo',
                                    ]
                                )->toArray();
                $sponsors = Sponsors::join('sponsorship_type','sponsorship_type.id','=','sponsors.sponsorship_type_id')
                                    ->join('event_sponsors','event_sponsors.sponsors_id','=','sponsors.id')
                                    ->join('event','event_sponsors.event_id','=','event.id')
                                    ->where('event.published','1')
                                    ->get(
                                        [
                                            'sponsors.id as sponsors_id',
                                            'event_id',
                                            'sponsor_name',
                                            'sponsor_logo',
                                            'website_link',
                                            'sponsorship_type.name as sponsorship_type'
                                        ]
                                    )->toArray();

                $speakers = Speakers::join('event_speakers','event_speakers.speakers_id','=','speakers.id')
                                    ->join('event','event_speakers.event_id','=','event.id')
                                    ->where('event.published','1')
                                    ->get(
                                        [
                                            'speakers.id as speakers_id',
                                            'event_id',
                                            'speakers.name as speakers_name',
                                            'designation',
                                            'company_name',
                                            'image as speaker_logo',
                                            'is_key_speaker'
                                        ]
                                    )->toArray();

                
                foreach($events as $conf_key => $event)
                {
                    $events[$conf_key]['event_banner'] = config('constants.CDN_URL').'/'.config('constants.CONFERENCE_FOLDER').$event['event_banner'];
                    $events[$conf_key]['event_logo'] = config('constants.CDN_URL').'/'.config('constants.CONFERENCE_FOLDER').$event['event_logo'];
                    $events[$conf_key]['sponsors'] = [];
                    foreach($sponsors as $spon_key => $sponsor)
                    {
                        if($sponsor['event_id'] == $event['event_id'])
                        {
                            $sponsors[$spon_key]['sponsor_logo'] = config('constants.CDN_URL').'/'.config('constants.SPONSORS_FOLDER').'/'.$sponsor['sponsor_logo'];
                            $events[$conf_key]['sponsors'][] = $sponsors[$spon_key];
                        }
                    }
                    $events[$conf_key]['speakers'] = [];
                    foreach($speakers as $spkr_key => $speaker)
                    {
                        if($speaker['event_id'] == $event['event_id'])
                        {
                            $speakers[$spkr_key]['speaker_logo'] = config('constants.CDN_URL').'/'.config('constants.SPEAKERS_FOLDER').'/'.$speaker['speaker_logo'];
                            $events[$conf_key]['speakers'][] = $speakers[$spkr_key];
                        }
                    }
                    
                } 
                $this->data = $events;
                return $this->sendResponse($this->data,'');
            }   
            catch(Exception $e) {   
                return response()->json('Forbidden', 403);
            }
        }
         
    }

    public function getSchedule(Request $request, $id)
    {
        if ($request->isMethod('get')) 
        {
            try {
                $schedules = Schedule::join('schedule_type','schedule_type.id','=','schedule.schedule_type_id')
                                        ->join('event',function($join) use($id) {
                                            $join->on('schedule.event_id','event.id')
                                            ->where('event.published','1');
                                        })
                                        ->where('schedule.event_id',$id)
                                        ->where('schedule.published','1')
                                        ->get(
                                            [
                                                'schedule.id as schedule_id',
                                                'schedule_title',
                                                'schedule_date',
                                                'schedule_day',
                                                'from_time',
                                                'to_time',
                                                'schedule_venue',
                                            ]
                                        )->toArray();

                $speakers = Speakers::join('schedule_speakers','schedule_speakers.speakers_id','=','speakers.id')
                                    ->join('schedule','schedule_speakers.schedule_id','=','schedule.id')
                                    ->join('event',function($join) use($id) {
                                        $join->on('schedule_speakers.event_id','event.id')
                                        ->where('schedule_speakers.event_id',$id);
                                     })
                                    ->where('event.published','1')
                                    ->get(
                                        [
                                            'speakers.id as speakers_id',
                                            'schedule_speakers.schedule_id',
                                            'speakers.name as speakers_name',
                                            'speakers.designation',
                                            'speakers.company_name',
                                            'speakers.image as speaker_logo',
                                            'schedule_speakers.is_key_speaker'
                                        ]
                                    )->toArray();

                
                foreach($schedules as $evnt_key => $schedule)
                {
                    $schedules[$evnt_key]['speakers'] = [];
                    foreach($speakers as $spkr_key => $speaker)
                    {
                        if($speaker['schedule_id'] == $schedule['schedule_id'])
                        {
                            $speakers[$spkr_key]['speaker_logo'] = config('constants.CDN_URL').'/'.config('constants.SPEAKERS_FOLDER').'/'.$speaker['speaker_logo'];
                            $schedules[$evnt_key]['speakers'][] = $speakers[$spkr_key];
                        }
                    }
                }
                
                
                $this->data = $schedules;
                return $this->sendResponse($this->data,'');
            }   
            catch(Exception $e) {   
                return response()->json('Forbidden', 403);
            }
        }
         
    }
}