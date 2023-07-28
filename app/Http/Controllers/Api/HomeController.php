<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Support\Facades\Auth;

//Model
use App\Models\Event;
use App\Models\RegistrationRequest;
use App\Models\EventRegistrationRequest;
use App\Models\Schedule;
use App\Models\Sponsors;
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
					
					$registration_request_id = $request->user()->id;

					$events = Event::join('event_category','event_category.id','=','event.event_category_id')
													->join('event_method','event_method.id','=','event.event_method_id')
													->join('event_registration_request','event_registration_request.event_id','=','event.id')
													->where('event.published','1')
													->where('registration_request_id', $registration_request_id)
													->selectRaw("
														event.id as event_id,
														title,
														event_category.name as event_category,
														event_method.name as event_method,
														case registration_type when 'P' then 'Paid' ELSE 'Free' END as registration_type,
														last_registration_date,
														event_start_date,
														event_end_date,
														event_venue,
														event_theme,
														overview_description,
														event_description,
														concat('".config('constants.CDN_URL')."', '/', '".config('constants.EVENT_FOLDER')."', '/', event_banner) AS event_banner,
														concat('".config('constants.CDN_URL')."', '/', '".config('constants.EVENT_FOLDER')."', '/', event_logo) AS event_logo,
														pickup_address
													")->get()->toArray();

					$events = $this->getEventSponsors($registration_request_id, $events);

					$events = $this->getEventSpeakers($registration_request_id, $events);

					$this->data = $events;
					return $this->sendResponse($this->data,'');
			}   
			catch(Exception $e) {   
					return response()->json('Forbidden', 403);
			}
		}  
	}

	public function getAgenda(Request $request)
	{
		if ($request->isMethod('post')) 
		{
			try {
				$id = $request->event_id;
				$registration_request_id = $request->user()->id;
				$agenda = Schedule::join('event',function($join) use($registration_request_id) {
																	$join->on('schedule.event_id','event.id')
																	->where('event.published','1')
																	->whereIn('event.id', EventRegistrationRequest::select(['event_id'])
																		->where('registration_request_id', $registration_request_id)
																	);
															})
															->orderBy('schedule_day')->groupBy('schedule_day','schedule_date')
															->get(
																[
																	'schedule_day',
																	'schedule_date'
																]
															)->toArray();
				$agenda_details = Schedule::leftJoin('track','track.id','=','schedule.track_id')
																	->join('event',function($join) use($registration_request_id) {
																			$join->on('schedule.event_id','event.id')
																			->where('event.published','1')
																			->whereIn('event.id', EventRegistrationRequest::select(['event_id'])
																				->where('registration_request_id', $registration_request_id)
																			);
																	})
																	->where('schedule.event_id',$id)
																	->where('schedule.published','1')
																	->get(
																			[
																					'schedule.id as schedule_id',
																					'schedule_title',
																					'schedule_day',
																					'from_time',
																					'to_time',
																					'hall_number',
																					'session_type',
																					'schedule_venue',
																					'track.name as track_name'
																			]
																	)->toArray();

				foreach($agenda_details as $agdkey => $agd)
				{
					$agenda_details[$agdkey]['from_time'] = date('h:i A',strtotime($agd['from_time']));
					$agenda_details[$agdkey]['to_time'] = date('h:i A',strtotime($agd['to_time']));
				}

				$agenda_details = $this->getEventAgendaSpeakers($registration_request_id, $id, $agenda_details);

				foreach($agenda as $agkey => $ag)
				{
					$agenda[$agkey]['agenda'] = array();
					foreach($agenda_details as $agdkey => $agd)
					{
						if($ag['schedule_day'] == $agd['schedule_day'])
						{
							$agenda[$agkey]['agenda'][] = $agd;
						}
					}
				}
		
				$this->data = $agenda;
				return $this->sendResponse($this->data,'');
			}   
			catch(Exception $e) {   
					return response()->json('Forbidden', 403);
			}
		}		
	}

	protected function getEventSponsors($registration_request_id, $events)
	{
		if(!empty($events))
		{
			$sponsors = Sponsors::join('sponsorship_type','sponsorship_type.id','=','sponsors.sponsorship_type_id')
								->join('event_sponsors','event_sponsors.sponsors_id','=','sponsors.id')
								->join('event','event_sponsors.event_id','=','event.id')
								->join('event_registration_request','event_registration_request.event_id','=','event.id')
								->where('event.published','1')
								->where('registration_request_id', $registration_request_id)
								->selectRaw("
									event_registration_request.event_id,
									sponsor_name,
									sponsor_logo,
									website_link,
									sponsorship_type.name as sponsorship_type,
									concat('".config('constants.CDN_URL')."', '/', '".config('constants.SPONSORS_FOLDER')."', '/', sponsor_logo) AS sponsor_logo
								")
								->get()->toArray();
			foreach($events as $evnt_key => $event)
			{
				$events[$evnt_key]['sponsors'] = [];
				foreach($sponsors as $spon_key => $sponsor)
				{
					if($sponsor['event_id'] == $event['event_id'])
					{
						$events[$evnt_key]['sponsors'][] = $sponsors[$spon_key];
					}
				}
			}
		}

		return $events;
	}

	protected function getEventSpeakers($registration_request_id, $events)
	{
		if(!empty($events))
		{
			$speakers = Speakers::join('event_speakers','event_speakers.speakers_id','=','speakers.id')
                                    ->join('event','event_speakers.event_id','=','event.id')
																		->join('event_registration_request','event_registration_request.event_id','=','event.id')
																		->where('event.published','1')
																		->where('registration_request_id', $registration_request_id)
                                    ->selectRaw("
																			event_registration_request.event_id,
																			speakers.name as speakers_name,
																			speakers.designation,
																			speakers.company_name,
																			concat('".config('constants.CDN_URL')."', '/', '".config('constants.SPEAKERS_FOLDER')."', '/', speakers.image) AS speaker_logo
																		")->get()->toArray();
			foreach($events as $evnt_key => $event)
			{
				$events[$evnt_key]['speakers'] = [];
				foreach($speakers as $spkr_key => $speaker)
				{
					if($speaker['event_id'] == $event['event_id'])
					{
						$events[$evnt_key]['speakers'][] = $speakers[$spkr_key];
					}
				} 
			}
		}

		return $events;
	}

	protected function getEventAgendaSpeakers($registration_request_id, $event_id, $schedules)
	{
		if(!empty($schedules))
		{
			$speakers = Speakers::join('schedule_speakers','schedule_speakers.speakers_id','=','speakers.id')
                                    ->join('schedule','schedule_speakers.schedule_id','=','schedule.id')
                                    ->join('event',function($join) use($registration_request_id) {
                                      $join->on('schedule_speakers.event_id','event.id')
																				->where('event.published','1')
																				->whereIn('event.id', EventRegistrationRequest::select(['event_id'])
																					->where('registration_request_id', $registration_request_id)
																				);
                                     })
									 									->where('schedule_speakers.event_id',$event_id)
									->selectRaw("
										schedule_speakers.schedule_id,
										speakers.name as speakers_name,
										designation,
										company_name,
										concat('".config('constants.CDN_URL')."', '/', '".config('constants.SPEAKERS_FOLDER')."', '/', image) AS speaker_logo
									")
                                    ->get()->toArray();
			foreach($schedules as $evnt_key => $schedule)
			{
				$schedules[$evnt_key]['speakers'] = [];
				foreach($speakers as $spkr_key => $speaker)
				{
					if($speaker['schedule_id'] == $schedule['schedule_id'])
					{
						$schedules[$evnt_key]['speakers'][] = $speakers[$spkr_key];
					}
				}
			}
		}

		return $schedules;
	}
}