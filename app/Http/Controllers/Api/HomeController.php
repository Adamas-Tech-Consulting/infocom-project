<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Support\Facades\Auth;

//Model
use App\Models\ConferenceCategory;
use App\Models\ConferenceMethod;
use App\Models\Conference;
use App\Models\ConferenceEvent;
use App\Models\ConferenceEventDetails;
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
    public function getConference(Request $request)
    {
        if ($request->isMethod('get')) 
        {
            try {
                $conferences = Conference::join('conference_category','conference_category.id','=','conference.conference_category_id')
                                ->join('conference_method','conference_method.id','=','conference.conference_method_id')
                                ->where('conference.published','1')
                                ->get(
                                    [
                                        'conference.id as conference_id',
                                        'title',
                                        'conference_category.name as conference_category',
                                        'conference_method.name as conference_method',
                                        'registration_type',
                                        'last_registration_date',
                                        'conference_start_date',
                                        'conference_end_date',
                                        'conference_venue',
                                        'conference_theme',
                                        'overview_description',
                                        'conference_description',
                                        'conference_banner',
                                        'conference_logo',
                                    ]
                                )->toArray();
                $sponsors = Sponsors::join('sponsorship_type','sponsorship_type.id','=','sponsors.sponsorship_type_id')
                                    ->join('conference_sponsors','conference_sponsors.sponsors_id','=','sponsors.id')
                                    ->join('conference','conference_sponsors.conference_id','=','conference.id')
                                    ->where('conference.published','1')
                                    ->get(
                                        [
                                            'sponsors.id as sponsors_id',
                                            'conference_id',
                                            'sponsor_name',
                                            'sponsor_logo',
                                            'website_link',
                                            'rank',
                                            'sponsorship_type.name as sponsorship_type'
                                        ]
                                    )->toArray();

                $speakers = Speakers::join('conference_speakers','conference_speakers.speakers_id','=','speakers.id')
                                    ->join('conference','conference_speakers.conference_id','=','conference.id')
                                    ->where('conference.published','1')
                                    ->get(
                                        [
                                            'speakers.id as speakers_id',
                                            'conference_id',
                                            'speakers.name as speakers_name',
                                            'designation',
                                            'company_name',
                                            'rank',
                                            'image as speaker_logo',
                                            'is_key_speaker'
                                        ]
                                    )->toArray();

                
                foreach($conferences as $conf_key => $conference)
                {
                    $conferences[$conf_key]['conference_banner'] = config('constants.CDN_URL').'/'.config('constants.CONFERENCE_FOLDER').'/'.$conference['conference_banner'];
                    $conferences[$conf_key]['conference_logo'] = config('constants.CDN_URL').'/'.config('constants.CONFERENCE_FOLDER').'/'.$conference['conference_logo'];
                    $conferences[$conf_key]['sponsors'] = [];
                    foreach($sponsors as $spon_key => $sponsor)
                    {
                        if($sponsor['conference_id'] == $conference['conference_id'])
                        {
                            $sponsors[$spon_key]['sponsor_logo'] = config('constants.CDN_URL').'/'.config('constants.SPONSORS_FOLDER').'/'.$sponsor['sponsor_logo'];
                            $conferences[$conf_key]['sponsors'][] = $sponsors[$spon_key];
                        }
                    }
                    $conferences[$conf_key]['speakers'] = [];
                    foreach($speakers as $spkr_key => $speaker)
                    {
                        if($speaker['conference_id'] == $conference['conference_id'])
                        {
                            $speakers[$spkr_key]['speaker_logo'] = config('constants.CDN_URL').'/'.config('constants.SPEAKERS_FOLDER').'/'.$speaker['speaker_logo'];
                            $conferences[$conf_key]['speakers'][] = $speakers[$spkr_key];
                        }
                    }
                    
                } 
                $this->data = $conferences;
                return $this->sendResponse($this->data,'');
            }   
            catch(Exception $e) {   
                return response()->json('Forbidden', 403);
            }
        }
         
    }

    public function getEvent(Request $request, $id)
    {
        if ($request->isMethod('get')) 
        {
            try {
                $events = ConferenceEvent::join('event_type','event_type.id','=','event.event_type_id')
                                        ->join('conference',function($join) use($id) {
                                            $join->on('event.conference_id','conference.id')
                                            ->where('conference.published','1');
                                        })
                                        ->where('event.conference_id',$id)
                                        ->where('event.published','1')
                                        ->get(
                                            [
                                                'event.id as event_id',
                                                'event_title',
                                                'event_type.name as event_type',
                                                'event_date',
                                                'event_day',
                                                'event_venue',
                                            ]
                                        )->toArray();

                $event_details = ConferenceEventDetails::join('event',function($join) use($id) {
                                                            $join->on('event.id','event_details.event_id')
                                                            ->where('event.published','1');
                                                        })
                                                        ->join('conference',function($join) use($id) {
                                                            $join->on('event_details.conference_id','conference.id')
                                                            ->where('event_details.conference_id',$id)
                                                            ->where('conference.published','1');
                                                        })->get(
                                                            [
                                                                'event_details.event_id',
                                                                'hall_number',
                                                                'from_time',
                                                                'to_time',
                                                                'is_wishlist',
                                                                'subject_line',
                                                            ]
                                                        )->toArray();

                $speakers = Speakers::join('event_speakers','event_speakers.speakers_id','=','speakers.id')
                                    ->join('event','event_speakers.event_id','=','event.id')
                                    ->join('conference',function($join) use($id) {
                                        $join->on('event_speakers.conference_id','conference.id')
                                        ->where('event_speakers.conference_id',$id);
                                     })
                                    ->where('conference.published','1')
                                    ->get(
                                        [
                                            'speakers.id as speakers_id',
                                            'event_speakers.event_id',
                                            'speakers.name as speakers_name',
                                            'speakers.designation',
                                            'speakers.company_name',
                                            'speakers.rank',
                                            'speakers.image as speaker_logo',
                                            'event_speakers.is_key_speaker'
                                        ]
                                    )->toArray();

                
                foreach($events as $evnt_key => $event)
                {
                    $events[$evnt_key]['details'] = [];
                    foreach($event_details as $evdt_key => $event_detail)
                    {
                        if($event_detail['event_id'] == $event['event_id'])
                        {
                            $events[$evnt_key]['details'][] = $event_details[$evdt_key];
                        }
                    }

                    $events[$evnt_key]['speakers'] = [];
                    foreach($speakers as $spkr_key => $speaker)
                    {
                        if($speaker['event_id'] == $event['event_id'])
                        {
                            $speakers[$spkr_key]['speaker_logo'] = config('constants.CDN_URL').'/'.config('constants.SPEAKERS_FOLDER').'/'.$speaker['speaker_logo'];
                            $events[$evnt_key]['speakers'][] = $speakers[$spkr_key];
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
}