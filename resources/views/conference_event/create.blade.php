@extends('layouts.main')
@section('title', __('admin.add').' '.$page_name)
@section('body')
<!-- Content Header (Page header) -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-3">
        <h1 class="m-0">{{ __('admin.add') }} {{ $page_name }}</h1>
      </div><!-- /.col -->
      <div class="col-sm-9">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('admin.home') }}</a></li>
          <li class="breadcrumb-item"><a href="{{$parent_page_url}}">{{ __('admin.manage') }} {{ $parent_page_name }}</a></li>
          <li class="breadcrumb-item"><a href="{{$parent_page_single_url}}">{{$parent_row->title}}</a></li> 
          <li class="breadcrumb-item"><a href="{{$page_url}}">{{ __('admin.manage') }} {{ $page_name }}</a></li>
          <li class="breadcrumb-item active">{{ __('admin.add') }} {{ $page_name }}</li>
        </ol>
      </div><!-- /.col -->
    </div><!-- /.row -->
  </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->

<!-- Error content -->
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        @if ($errors->any())
          <div class="alert alert-danger">
              <strong>Whoops!</strong> There were some problems with your input.<br><br>
              <ul>
                  @foreach ($errors->all() as $error)
                      <li>{{ $error }}</li>
                  @endforeach
              </ul>
          </div>
        @endif
      </div>
    </div>
  </div>
</section>


<!-- Main content -->
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <form id="validation-form" action="" method="post" enctype="multipart/form-data">
            @csrf
            <input type="hidden" name="conference_id" value="{{$parent_id}}" />
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="event_date">{{ __('admin.event') }} {{ __('admin.date') }} <span class="text-red">*</span></label>
                    <div class="input-group date reservationdate" id="event_date" data-target-input="nearest">
                      <div class="input-group-append" data-target="#event_date" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                      </div>
                      <input type="text" name="event_date" class="form-control datetimepicker-input" data-target="#event_date" placeholder="DD-MM-YYYY"/>   
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="event_day">{{ __('admin.day') }} <span class="text-red">*</span></label>
                    <select class="form-control select2bs4 @error('event_day') is-invalid @enderror" name="event_day" style="width: 100%;">
                      <option value="">{{ __('admin.select') }} {{ __('admin.event') }} {{ __('admin.day') }}</option>
                      @for($i=1; $i<=10; $i++)
                      <option value="{{$i}}">Day {{$i}}</option>
                      @endfor
                    </select>
                  </div>
                </div>
              </div><!-- /.row -->
              <div class="row">
                <div class="col-4">
                  <div class="form-group">
                    <label for="event_title">{{ __('admin.event') }} {{ __('admin.title') }} <span class="text-red">*</span></label>
                    <input type="text" class="form-control @error('event_title') is-invalid @enderror" id="event_title" name="event_title" placeholder="{{ __('admin.enter') }} {{ __('admin.event') }} {{ __('admin.title') }}">
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-group">
                    <label for="event_venue">{{ __('admin.event') }} {{ __('admin.venue') }}</label>
                    <input type="text" class="form-control @error('event_venue') is-invalid @enderror" id="event_venue" name="event_venue" placeholder="{{ __('admin.enter') }} {{ __('admin.event') }} {{ __('admin.venue') }}">
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-group">
                    <label for="rank">{{ __('admin.rank') }} <span class="text-red">*</span></label>
                    <select class="form-control select2bs4 @error('rank') is-invalid @enderror" name="rank" style="width: 100%;">
                        <option value="">{{ __('admin.select') }} {{ __('admin.rank') }}</option>
                        @for($i=1; $i<=20; $i++)
                        <option value="{{$i}}">{{$i}}</option>
                        @endfor
                    </select>
                  </div>
                </div>
              </div><!-- /.row -->
              <div class="row">
	              <div class="col-12" id="event_details">
                  <div class="card">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-2">
                          <div class="form-group">
                            <label for="hall_number">{{ __('admin.hall_number') }}</label>
                            <input type="text" class="form-control" name="hall_number[]" placeholder="{{ __('admin.enter') }} {{ __('admin.hall_number') }}">
                          </div>
                        </div>
                        <div class="col-2">
                          <div class="form-group">
                            <label for="from_time">{{ __('admin.from') }} {{ __('admin.time') }}</label>
                            <input type="time" class="form-control" name="from_time[]" placeholder="{{ __('admin.from_time') }}">
                          </div>
                        </div>
                        <div class="col-2">
                          <div class="form-group">
                            <label for="to_time">{{ __('admin.to') }} {{ __('admin.time') }}</label>
                            <input type="time" class="form-control" name="to_time[]" placeholder="{{ __('admin.to_time') }}">
                          </div>
                        </div>
                        <div class="col-2">
                          <div class="form-group">
                            <label for="is_wishlist">{{ __('admin.wishlist_enabled') }}(Y/N)</label>
                            <select class="form-control" name="is_wishlist[]" style="width: 100%;">
                              <option value="">{{ __('admin.select') }} {{ __('admin.one') }}</option>
                              <option value="1">{{ __('admin.yes') }}</option>
                              <option value="0">{{ __('admin.no') }}</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-3">
                          <div class="form-group">
                            <label for="subject_line">{{ __('admin.session_subject_line') }}</label>
                            <textarea class="form-control" name="subject_line[]" placeholder="{{ __('admin.enter') }} {{ __('admin.session_subject_line') }}" style="height:38px"></textarea>
                          </div>
                        </div>
                        <div class="col-1">
                          <div class="form-group float-right">
                            <label for="add_event_details" style="height:20px"></label>
                            <div><button type="button" id="add_event_details" title="{{ __('admin.add') }} {{ __('admin.event') }} {{ __('admin.details') }}" id="rem_event_details" class="btn btn-sm btn-success bW"><i class="fa fa-plus-circle" aria-hidden="true"></i></button></div>
                          </div>
                        </div>			
                      </div>
                    </div>
                  </div>
			          </div>
              </div>
            </div>
            <!-- /.card-body -->
            <div class="card-footer">
              <button type="submit" class="btn btn-primary">{{ __('admin.submit') }}</button>
            </div>
          </form>
        </div>
        <!-- /.card -->
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->
  </div><!-- /.container-fluid -->
</section>
<!-- /.content -->
@endsection
@section('script')
<script src="/validation/{{ $page_slug }}.js"></script>
<script>
  $(document).on('click','#add_event_details',function(){
    $.ajax({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      type:"GET",
      url: "{{$route_create_event_details}}",
      success:function(data){   
        $('#event_details').append(data);  
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
      }
    });
  });
  $(document).on('click','#remove_event_details',function(){
    var card = $(this).closest('.card').remove();
  }); 
</script>
@endsection