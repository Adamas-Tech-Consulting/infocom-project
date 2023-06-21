@extends('layouts.main')
@section('title', __('admin.add').' '.$page_name)
@section('body')
<!-- Content Header (Page header) -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-4">
        <h4 class="m-0">{{$parent_row->title}} : {{ __('admin.add') }} {{ $page_name }}</h4>
      </div><!-- /.col -->
      <div class="col-sm-8">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('admin.home') }}</a></li> 
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
      <div class="col-md-3">
        <!-- Profile Image -->
        @include('layouts.event_sidebar')
      </div>
      <!-- /.col -->
      <div class="col-md-9">
        <div class="card card-warning card-outline direct-chat-warning">
          <form id="validation-form" action="" method="post" enctype="multipart/form-data">
            @csrf
            <input type="hidden" name="schedule_type_id" value="1" />
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="schedule_title">{{ __('admin.schedule') }} {{ __('admin.title') }} <span class="text-red">*</span></label>
                    <input type="text" class="form-control @error('schedule_title') is-invalid @enderror" id="schedule_title" name="schedule_title" placeholder="{{ __('admin.enter') }} {{ __('admin.schedule') }} {{ __('admin.title') }}">
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="schedule_venue">{{ __('admin.schedule') }} {{ __('admin.venue') }}</label>
                    <input type="text" class="form-control @error('schedule_venue') is-invalid @enderror" id="schedule_venue" name="schedule_venue" placeholder="{{ __('admin.enter') }} {{ __('admin.schedule') }} {{ __('admin.venue') }}" value="{{$parent_row->event_venue}}">
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
                      <option value="{{$i}}">Day {{$i}}</option>
                      @endfor
                    </select>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-group">
                    <label for="from_time">{{ __('admin.from') }} {{ __('admin.time') }} <span class="text-red">*</span></label>
                    <input type="time" class="form-control @error('from_time') is-invalid @enderror" name="from_time" value="" placeholder="{{ __('admin.from_time') }}">
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-group">
                    <label for="to_time">{{ __('admin.to') }} {{ __('admin.time') }} <span class="text-red">*</span></label>
                    <input type="time" class="form-control @error('to_time') is-invalid @enderror" name="to_time" value="" placeholder="{{ __('admin.to_time') }}">
                  </div>
                </div>
              </div><!-- /.row -->
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label for="schedule_details">{{ __('admin.schedule') }} {{ __('admin.details') }} <span class="text-red">*</span></label>
                    <textarea id="schedule_details" name="schedule_details" class="form-control @error('schedule_details') is-invalid @enderror" placeholder="{{ __('admin.enter') }} {{ __('admin.schedule') }} {{ __('admin.details') }}"></textarea>
                  </div>
                </div>
              </div><!-- /.row -->
            </div>
            <!-- /.card-body -->
            <div class="card-footer">
              <button type="submit" class="btn btn-warning btn-sm">{{ __('admin.submit') }}</button>
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