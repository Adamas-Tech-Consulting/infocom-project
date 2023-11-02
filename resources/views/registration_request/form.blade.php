@extends('layouts.frontend')
@section('title', $page_name)
@section('content')
<style>
  .form-group {margin-bottom:0.4rem}
</style>
<section>
  <div class="container @if($row_event->form_fields && $row_event->form_fields[6]['is_visible']) py_2 @else py_4 @endif h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        @if(Session::has('success'))
          <div class="alert alert-success alert-dismissible">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
            <i class="icon fas fa-check"></i>{{ Session::get('success') }}
              @php
                  Session::forget('success');
              @endphp
          </div>
        @endif
        @if(Session::has('error'))
          <div class="alert alert-danger alert-dismissible">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
            <i class="icon fas fa-exclamation"></i>{{ Session::get('error') }}
              @php
                  Session::forget('error');
              @endphp
          </div>
        @endif
        <div class="card" style="border-radius: 1rem; margin-bottom:0">
          <div class="row g-0">
            <div class="col-md-6 col-lg-4 d-none d-md-block" style="padding: 1rem;">
              <img src="{{($row_event->event_logo)?config('constants.CDN_URL').'/'.config('constants.EVENT_FOLDER').'/'.$row_event->event_logo:'/dist/img/no-banner.jpg'}}"
                alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
              <h4 class="text-center mt-2">{{$row_event->title}}</h4>
            </div>
            <div class="col-md-6 col-lg-8 d-flex align-items-center">
              <div class="card-body p-1 p-lg-4 text-black">
                @if($row_event->form_fields)
                <form id="validation-form" action="" method="post" enctype="multipart/form-data">
                  @csrf
                  <h5 class="fw-normal" style="letter-spacing: 1px;">
                    Please fill up all information 
                  </h5>
                  <div class="row">
                    @foreach($row_event->form_fields as $key => $form_fields)
                    @php $field_name = $form_fields['name']; @endphp
                    @if($form_fields['is_visible'])
                    <div class="{{$form_fields['class']}}" id="field_{{$form_fields['name']}}">
                      <div class="form-group">
                        <label class="form-label" for="{{$form_fields['name']}}">{{$form_fields['label']}} @if($form_fields['is_mandatory']) <span class="text-red">*</span> @endif</label>
                        @if($form_fields['type'] == 'textarea')
                          <textarea class="form-control form-control-md @error($form_fields['name']) is-invalid @enderror" name="{{$form_fields['name']}}" placeholder="{{ __('admin.enter') }} {{$form_fields['label']}}">{{ old($form_fields['name'], isset($row_form->$field_name) ? $row_form->$field_name : '') }}</textarea>
                          @error($form_fields['name'])<strong class="error invalid-feedback">{{ $message }}</strong>@enderror
                        @elseif($form_fields['type'] == 'radio')
                          <div class="icheck-primary d-inline">
                            <input class="form-check-input" type="radio" name="{{$form_fields['name']}}" id="{{ __('admin.yes') }}" value="1" @if(old($form_fields['name'], isset($row_form->$field_name) ? $row_form->$field_name : '')!=0) checked @endif>
                            <label for="{{ __('admin.yes') }}">{{ __('admin.yes') }}</label>
                          </div>
                          <div class="icheck-primary d-inline ml-2">
                            <input class="form-check-input" type="radio" name="{{$form_fields['name']}}" id="{{ __('admin.no') }}" value="0" @if(old($form_fields['name'], isset($row_form->$field_name) ? $row_form->$field_name : '')==0) checked @endif>
                            <label for="{{ __('admin.no') }}">{{ __('admin.no') }}</label>
                          </div>
                        @else
                          <input type="{{$form_fields['type']}}" id="{{$form_fields['name']}}" class="form-control form-control-md @error($form_fields['name']) is-invalid @enderror" name="{{$form_fields['name']}}" @if($form_fields['name']=='mobile') value="{{ $mobile }}" readonly @else value="{{ old($form_fields['name'], isset($row_form->$field_name) ? $row_form->$field_name : '') }}" @endif @if($form_fields['name']=='mobile') min="10" max="10" @endif placeholder="{{ __('admin.enter') }} {{$form_fields['label']}}" @if($form_fields['is_mandatory']) required @endif @if(isset($row_form->$field_name) && $row_form->$field_name) readonly @endif />
                          @error($form_fields['name'])<strong class="error invalid-feedback">{{ $message }}</strong>@enderror
                        @endif
                      </div>
                    </div>
                    @endif
                    @endforeach
                    <div class="col-12" id="field_attendance_type">
                      <div class="form-group">
                        <label class="form-label" for="attendance_type">Attend on</label>
                        <div class="icheck-primary d-inline">
                          <input class="form-check-input" type="radio" name="attendance_type" id="one" value="one" checked="" data-value="{{$payment_with_gst['one']}}">
                          <label for="one">One day @if($row_event->registration_type=='P')(₹ {{$payment['one']}} + 18% GST)@endif</label>
                        </div>
                        <div class="icheck-primary d-inline ml-2">
                          <input class="form-check-input" type="radio" name="attendance_type" id="all" value="all" data-value="{{$payment_with_gst['all']}}">
                          <label for="all">All days @if($row_event->registration_type=='P')(₹ {{$payment['all']}} + 18% GST)@endif</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group"> 
                        <div class="icheck-primary">
                          <input class="form-check-input" type="checkbox" name="agree" id="agree" required>
                          <label for="agree">By registering, you agree to Indiainfocom <a href="{{config('constants.WP_SITE')}}" target="_blank">Terms &amp; Conditions</a></label>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <div class="captcha">
                            <span>{!! captcha_img() !!}</span>
                            <button type="button" class="btn btn-danger" class="reload" id="reload">
                                &#x21bb;
                            </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-8">
                      <div class="form-group mb-4">
                          <input id="captcha" type="text" class="form-control @error('captcha') is-invalid @enderror" placeholder="Enter Captcha" name="captcha" required>
                          @error('captcha')<strong class="error invalid-feedback">Invalid Captcha</strong>@enderror
                      </div>
                    </div>
                    <div class="col-md-4">
                      <button type="submit" class="btn btn-primary btn-block btn-sm">@if($row_event->registration_type=='P') PAY ₹ <span id="payable_amt">{{$payment_with_gst['one']}}</span> @else SUBMIT @endif</button>
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
@section('script')
<script type="text/javascript">
  $('#reload').click(function () {
      $.ajax({
          type: 'GET',
          url: '/reload-captcha',
          success: function (data) {
            $(".captcha span").html(data.captcha);
          }
      });
  });
 if($('input[name="is_pickup"]').length>0)
 {
  var isPickUp = $('input[name="is_pickup"]:checked').val();
  if(isPickUp == 0) {
    $('#field_pickup_address').hide();
  }
  $('input[name="is_pickup"]').on('change', function() {
    if($(this).val() == '1') {
      $('#field_pickup_address').show();
    } else {
      $('#field_pickup_address').hide();
    }
  })
 }

 if($('input[name="attendance_type"]').length>0)
 {
  $('input[name="attendance_type"]').on('change', function() {
    if($(this).val() == 'one') {
      $('#payable_amt').html($(this).data('value'));
    } else {
      $('#payable_amt').html($(this).data('value'));
    }
  })
 }

</script>
@endsection