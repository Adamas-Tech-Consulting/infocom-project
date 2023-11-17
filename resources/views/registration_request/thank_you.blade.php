@extends('layouts.frontend')
@section('title', $page_name)
@section('content')
<style>
  .form-group {margin-bottom:0.7rem}
</style>
<section>
  <div class="container py_4 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style="border-radius: 1rem; margin-bottom:0">
          <div class="row g-0">
            <div class="col-md-5 col-lg-4 d-none d-md-block" style="padding: 1rem;">
              <img src="{{($row_event->event_logo)?config('constants.CDN_URL').'/'.config('constants.EVENT_FOLDER').'/'.$row_event->event_logo:'/dist/img/no-banner.jpg'}}"
                alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
              <h4 class="text-center mt-2">{{$row_event->title}}</h4>
            </div>
            <div class="col-md-7 col-lg-8 d-flex align-items-center">
              <div class="card-body p-1 p-lg-4 text-black">
                <h3 class="fw-normal text-green" style="letter-spacing: 1px;">
                  You have registered successfully
                </h3>
                <h5 class="fw-normal mt-5" style="letter-spacing: 1px;">
                  <p>Registrant Name : {{$row_event_registration->first_name}} {{$row_event_registration->last_name}}
                  <p>Conference Name :  {{$row_event->title}} </p>
                  <p>Conference Venue : {{$row_event->event_venue}} </p>
                  <p>Conference Date : {{date('F d, Y',strtotime($row_event->event_start_date))}} @if($row_event->event_end_date>$row_event->event_start_date) - {{date('F d, Y',strtotime($row_event->event_end_date))}} @endif</p>
                  @if($row_event->registration_type=='P' && !$row_event_registration->rt_request)
                  <p>Order ID  : {{$row_event_registration->order_id}}
                  <p>Amount  : ₹ {{$row_event_registration->payable_amount}} (For {{$row_event_registration->attendance_type}} {{($row_event_registration->attendance_type=='one') ? 'day' : 'days'}})</p>
                  <p>Payment Status : @if($row_event_registration->transaction_status=='SUCCESS') Paid @else Pending @endif</p>
                  @endif
                </h5>
                <hr>
                <h5 class="mt-2" style="line-height:30px">Please contact 
                  @foreach($event_contact_information as $key => $contact_information)
                  @if($key>0) OR @endif
                  {{$contact_information->name}} at {{$contact_information->mobile}}
                  @endforeach
                  for any queries</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
@endsection