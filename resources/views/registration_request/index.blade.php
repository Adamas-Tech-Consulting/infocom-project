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
                @if($current_date>$row_event->last_registration_date)
                <h3 class="fw-normal text-red text-center" style="letter-spacing: 1px;">
                  Registration Closed
                </h3>
                <h5 class="mt-3" style="line-height:30px">
                  @if($row_event->registration_closed_message)
                    {{$row_event->registration_closed_message}}
                  @else
                  Please contact
                  @foreach($event_contact_information as $key => $contact_information)
                  @if($key>0) OR @endif
                  {{$contact_information->name}} at {{$contact_information->mobile}}
                  @endforeach
                  for any queries</h5>
                  @endif 
                @else
                <form id="validation-form" action="" method="post" enctype="multipart/form-data">
                  @csrf
                  <h5 class="fw-normal" style="letter-spacing: 1px;">
                    Enter your mobile number and proceed
                  </h5>
                  <div class="row">
                    <div class="col-md-8" id="field_mobile">
                      <div class="form-group">
                        <input type="text" id="mobile" class="form-control form-control-md " name="mobile" value="" maxlength="10" placeholder="Enter Mobile Number" required="" autocomplete="off">
                      </div>
                    </div>
                    <div class="col-md-4">
                      <button type="submit" class="btn btn-primary btn-block btn-sm"><i class="fa fa-paper-plane"></i> PROCEED</button>
                    </div>
                  </div>
                </form>
                @endif
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
@endsection