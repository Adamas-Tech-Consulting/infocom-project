@extends('layouts.main')
@section('title', __('admin.edit').' '.$page_name)
@section('body')
<!-- Content Header (Page header) -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-5">
        <h4 class="m-0">{{$row->schedule_title}}</h4>
        <h6 class="mt-1">{{$parent_row->title}} ({{ date('d M, Y',strtotime($parent_row->event_start_date))}} - {{ date('d M, Y',strtotime($parent_row->event_end_date))}})</h6>
      </div><!-- /.col -->
      <div class="col-sm-7">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('admin.home') }}</a></li>
          <li class="breadcrumb-item"><a href="{{$page_url}}">{{ __('admin.manage') }} {{ $page_name }}</a></li>
          <li class="breadcrumb-item active">{{ __('admin.edit') }} {{ $page_name }}</li>
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
        @if(Session::has('success'))
          <div class="alert alert-success alert-dismissible">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
            <i class="icon fas fa-check"></i> {{ $page_name }} {{ Session::get('success') }}
              @php
                  Session::forget('success');
              @endphp
          </div>
        @endif
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
      <div class="col-md-3">
        <!-- Profile Image -->
        @include('layouts.event_sidebar')
      </div>
      <!-- /.col -->
      <div class="col-md-9">
        <div class="card card-warning card-outline direct-chat-warning">
          <div class="card-header p-2">
            @include('layouts.schedule_topbar')
          </div>
          <form id="validation-form" action="" method="post" enctype="multipart/form-data">
            @csrf
            <input type="hidden" name="schedule_type_id" value="1" />
            <div class="card-body">
              <div class="row">
                <div class="col-12 col-sm-12">
                  <div class="tab-content" id="vert-tabs-tabContent">
                    <div class="tab-pane fade active show" id="vert-tabs-home" role="tabpanel" aria-labelledby="vert-tabs-home-tab">
                      <div class="row">
                        <div class="col-6">
                          <div class="form-group">
                            <label for="schedule_title">{{ __('admin.schedule') }} {{ __('admin.title') }} <span class="text-red">*</span></label>
                            <input type="text" class="form-control @error('schedule_title') is-invalid @enderror" id="schedule_title" name="schedule_title" placeholder="{{ __('admin.enter') }} {{ __('admin.schedule') }} {{ __('admin.title') }}" value="{{$row->schedule_title}}">
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="form-group">
                            <label for="schedule_venue">{{ __('admin.schedule') }} {{ __('admin.venue') }}</label>
                            <input type="text" class="form-control @error('schedule_venue') is-invalid @enderror" id="schedule_venue" name="schedule_venue" placeholder="{{ __('admin.enter') }} {{ __('admin.schedule') }} {{ __('admin.venue') }}" value="{{$row->schedule_venue}}">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-4">
                          <div class="form-group">
                            <label for="schedule_day">{{ __('admin.day') }} <span class="text-red">*</span></label>
                            <select class="form-control select2bs4 @error('schedule_day') is-invalid @enderror" name="schedule_day" style="width: 100%;">
                              <option value="">{{ __('admin.select') }} {{ __('admin.schedule') }} {{ __('admin.day') }}</option>
                              @for($i=1; $i<=$parent_row->event_days; $i++)
                              <option value="{{$i}}" {{($row->schedule_day == $i)?'selected':''}}>Day {{$i}}</option>
                              @endfor
                            </select>
                          </div>
                        </div>
                        <div class="col-4">
                          <div class="form-group">
                            <label for="from_time">{{ __('admin.from') }} {{ __('admin.time') }} <span class="text-red">*</span></label>
                            <input type="time" class="form-control @error('from_time') is-invalid @enderror" name="from_time" value="{{$row->from_time}}" placeholder="{{ __('admin.from_time') }}">
                          </div>
                        </div>
                        <div class="col-4">
                          <div class="form-group">
                            <label for="to_time">{{ __('admin.to') }} {{ __('admin.time') }} <span class="text-red">*</span></label>
                            <input type="time" class="form-control @error('to_time') is-invalid @enderror" name="to_time" value="{{$row->to_time}}" placeholder="{{ __('admin.to_time') }}">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12">
                          <div class="form-group">
                            <label for="track_ids">{{ __('admin.track') }}</label>
                            @php $row->track_ids = !empty($row->track_ids) ? explode(',',$row->track_ids) : array(); @endphp
                            <select class="form-control select2bs4 @error('track_ids') is-invalid @enderror" name="track_ids[]" style="width: 100%;" multiple="multiple" data-placeholder="{{ __('admin.select') }} {{ __('admin.track') }}">
                              <option value="">{{ __('admin.select') }} {{ __('admin.track') }}</option>
                              @foreach($rows_track as $track)
                              <option value="{{$track->id}}" {{in_array($track->id, $row->track_ids)?'selected':''}}>{{$track->name}}</option>
                              @endforeach
                            </select>
                          </div>
                        </div>
                      </div><!-- /.row -->
                      <div class="row">
                        <div class="col-12">
                          <div class="form-group">
                            <label for="schedule_details">{{ __('admin.schedule') }} {{ __('admin.details') }} <span class="text-red">*</span></label>
                            <textarea id="schedule_details" name="schedule_details" class="form-control @error('schedule_details') is-invalid @enderror" placeholder="{{ __('admin.enter') }} {{ __('admin.schedule') }} {{ __('admin.details') }}">{{$row->schedule_details}}</textarea>
                          </div>
                        </div>
                      </div><!-- /.row -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button type="submit" class="btn btn-warning btn-sm">{{ __('admin.update') }}</button>
            </div>
          </form>
        </div>
        <!-- /.card -->
      </div>
    </div>
    <!-- /.row -->
  </div><!-- /.container-fluid -->
</section>
<!-- /.content -->
@endsection
@section('script')
<script src="/validation/{{ $page_slug }}.js"></script>
@endsection