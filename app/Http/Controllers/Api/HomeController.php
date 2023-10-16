<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Client;
use Laravel\Passport\HasApiTokens;
use Laravel\Passport\Token;
use Laravel\Passport\RefreshToken;

//Model
use App\Models\Event;
use App\Models\RegistrationRequest;
use App\Models\EventRegistrationRequest;
use App\Models\Schedule;
use App\Models\Sponsors;
use App\Models\Speakers;
use App\Models\Cio;

class HomeController extends BaseController
{

	protected $data;
	private 	$client;

	public function __construct()
	{
		$this->data = [];
		$this->client = Client::find(2);
	}

	public function getEvent(Request $request)
	{
		if ($request->isMethod('post')) 
		{
			try {
					if(empty($request->user()->id) && $this->client->id != $request->client_id && $this->client->secret != $request->client_secret)
					{
						return $this->sendError('Invalid Client ID or Secret', 401);
					}

					$registration_request_id = !empty($request->user()->id) ? $request->user()->id : NULL;

					$events = Event::join('event_category','event_category.id','=','event.event_category_id')
													->join('event_method','event_method.id','=','event.event_method_id')
													->leftJoin('event_registration_request',function($join) use($registration_request_id) {
														$join->on('event_registration_request.event_id','event.id')
														->where('registration_request_id', $registration_request_id);
													})
													->where('event.published','1')
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
														latitude,
														longitude,
														event_theme,
														overview_description,
														event_description,
														concat('".config('constants.CDN_URL')."', '/', '".config('constants.EVENT_FOLDER')."', '/', event_banner) AS event_banner,
														concat('".config('constants.CDN_URL')."', '/', '".config('constants.EVENT_FOLDER')."', '/', event_logo) AS event_logo,
														CASE WHEN event_registration_request.registration_request_id IS NULL THEN false ELSE true END as registered,
														pickup_address
													")->get();

					$events = $this->getEventSponsors($events);

					$events = $this->getEventSpeakers($events);

					//$events = $this->getEventCIO($events);

					$this->data = $events->toArray();
					return $this->sendResponse($this->data,'', 'array');
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

				if(empty($request->user()->id) && $this->client->id != $request->client_id && $this->client->secret != $request->client_secret)
				{
					return $this->sendError('Invalid Client ID or Secret', 401);
				}

				$id = $request->event_id;
				$agenda = Schedule::join('event',function($join) use($id) {
															$join->on('schedule.event_id','event.id')
																->where('schedule.event_id',$id)
																->where('event.published','1');
														})
													->where('schedule.published','1')
													->orderBy('schedule_day')->groupBy('schedule_day','schedule_date')
													->get(
														[
															'schedule_day',
															'schedule_date'
														]
													);

				$agenda_details = Schedule::join('event',function($join) use($id) {
																		$join->on('schedule.event_id','event.id')
																			->where('schedule.event_id',$id)
																			->where('event.published','1');
																	})
																	->leftJoin('track','track.id','=','schedule.track_id')
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
																	);

				foreach($agenda_details as $agdkey => $agd)
				{
					$agenda_details[$agdkey]->from_time = date('h:i A',strtotime($agd->from_time));
					$agenda_details[$agdkey]->to_time = date('h:i A',strtotime($agd->to_time));
				}

				$agenda_details = $this->getEventAgendaSpeakers($agenda_details);

				foreach($agenda as $agkey => $ag)
				{
					$agenda[$agkey]->agenda = [];
					$agenda_array = [];
					foreach($agenda_details as $agd)
					{
						if($ag->schedule_day == $agd->schedule_day)
						{
							$agenda_array[] = $agd;
						}
					}
					$agenda[$agkey]->agenda = $agenda_array;
				}
		
				$this->data = $agenda->toArray();
				return $this->sendResponse($this->data,'', 'array');
			}   
			catch(Exception $e) {   
					return response()->json('Forbidden', 403);
			}
		}		
	}

	protected function getEventSponsors($events)
	{
		if(!empty($events->toArray()))
		{
			$event_ids = $events->pluck('event_id')->toArray();
			$sponsors = Sponsors::join('sponsorship_type','sponsorship_type.id','=','sponsors.sponsorship_type_id')
													->join('event_sponsors','event_sponsors.sponsors_id','=','sponsors.id')
													->join('event',function($join) use($event_ids) {
														$join->on('event_sponsors.event_id','event.id')->whereIn('event.id', $event_ids);
													})
													->selectRaw("
														event_sponsors.event_id,
														sponsor_name,
														sponsor_logo,
														website_link,
														sponsorship_type.name as sponsorship_type,
														concat('".config('constants.CDN_URL')."', '/', '".config('constants.SPONSORS_FOLDER')."', '/', sponsor_logo) AS sponsor_logo
													")
													->get();
			
			foreach($events as $evnt_key => $event)
			{
				$events[$evnt_key]->sponsors = [];
				$sponsor_array = [];
				foreach($sponsors as $sponsor)
				{
					if($sponsor->event_id == $event->event_id)
					{
						$sponsor_array[] = $sponsor;
					}
				}
				$events[$evnt_key]->sponsors = $sponsor_array;
			}
		}

		return $events;
	}

	protected function getEventSpeakers($events)
	{
		if(!empty($events->toArray()))
		{
			$event_ids = $events->pluck('event_id')->toArray();
			$speakers = Speakers::join('event_speakers','event_speakers.speakers_id','=','speakers.id')
													->join('event',function($join) use($event_ids) {
														$join->on('event_speakers.event_id','event.id')->whereIn('event.id', $event_ids);
													})
													->selectRaw("
														event_speakers.event_id,
														speakers.name as speakers_name,
														speakers.designation,
														speakers.company_name,
														speakers.linkedin_url,
														concat('".config('constants.CDN_URL')."', '/', '".config('constants.SPEAKERS_FOLDER')."', '/', speakers.image) AS speaker_logo
													")->get();

			foreach($events as $evnt_key => $event)
			{
				$events[$evnt_key]->speakers = [];
				$speaker_array = [];
				foreach($speakers as $speaker)
				{
					if($speaker->event_id == $event->event_id)
					{
						$speaker_array[] = $speaker;
					}
				}
				$events[$evnt_key]->speakers = $speaker_array;
			}
		}

		return $events;
	}

	protected function getEventCIO($events)
	{
		if(!empty($events->toArray()))
		{
			$event_ids = $events->pluck('event_id')->toArray();
			$cio_list = Cio::join('event_cio','event_cio.cio_id','=','cio.id')
													->join('registration_request','registration_request.id','=','cio.registration_request_id')
													->join('event',function($join) use($event_ids) {
														$join->on('event_cio.event_id','event.id')->whereIn('event.id', $event_ids);
													})
													->selectRaw("
														event_cio.event_id,
														concat(registration_request.first_name,' ',registration_request.last_name) as cio_name,
														cio.type,
														cio.designation,
														cio.company_name,
														cio.linkedin_url,
														concat('".config('constants.CDN_URL')."', '/', '".config('constants.CIO_FOLDER')."', '/', cio.image) AS cio_logo_url
													")->get();

			foreach($events as $evnt_key => $event)
			{
				$events[$evnt_key]->cio = [];
				$cio_array = [];
				foreach($cio_list as $cio)
				{
					if($cio->event_id == $event->event_id)
					{
						$cio_array[] = $cio;
					}
				}
				$events[$evnt_key]->cio = $cio_array;
			}
		}

		return $events;
	}

	protected function getEventAgendaSpeakers($schedules)
	{
		if(!empty($schedules->toArray()))
		{
			$schedule_ids = $schedules->pluck('schedule_id')->toArray();
			$speakers = Speakers::join('schedule_speakers','schedule_speakers.speakers_id','=','speakers.id')
													->join('schedule',function($join) use($schedule_ids) {
														$join->on('schedule_speakers.schedule_id','schedule.id')->whereIn('schedule.id', $schedule_ids);
													})
													->selectRaw("
														schedule_speakers.schedule_id,
														speakers.name as speakers_name,
														designation,
														company_name,
														linkedin_url,
														concat('".config('constants.CDN_URL')."', '/', '".config('constants.SPEAKERS_FOLDER')."', '/', image) AS speaker_logo
													")
													->get();

			foreach($schedules as $schd_key => $schedule)
			{
				$schedules[$schd_key]->speakers = [];
				$speaker_array = [];
				foreach($speakers as $speaker)
				{
					if($speaker->schedule_id == $schedule->schedule_id)
					{
						$speaker_array[] = $speaker;
					}
				}
				$schedules[$schd_key]->speakers = $speaker_array;
			}
		}

		return $schedules;
	}
}