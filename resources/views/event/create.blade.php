@extends('layouts.main')
@section('title', __('admin.add').' '.$page_name)
@section('body')
<!-- Content Header (Page header) -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h4 class="m-0">{{ __('admin.add') }} {{ $page_name }}</h4>
      </div><!-- /.col -->
      <div class="col-sm-6">
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
      <div class="col-12">
        <div class="card card-warning card-outline direct-chat-warning">
          <form id="validation-form" action="" method="post" enctype="multipart/form-data">
            @csrf
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="event_category_id">{{ __('admin.event_category') }} <span class="text-red">*</span></label>
                    <select class="form-control select2bs4 @error('event_category_id') is-invalid @enderror" name="event_category_id" style="width: 100%;">
                      <option value="">{{ __('admin.select') }} {{ __('admin.event_category') }}</option>
                      @foreach($rows_category as $category)
                      <option value="{{$category->id}}">{{$category->name}}</option>
                      @endforeach
                    </select>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="title">{{ __('admin.event') }} {{ __('admin.name') }} <span class="text-red">*</span></label>
                    <input type="text" class="form-control @error('title') is-invalid @enderror" id="title" name="title" placeholder="{{ __('admin.enter') }} {{ __('admin.event') }} {{ __('admin.name') }}">
                  </div>
                </div>
              </div><!-- /.row -->
              <div class="row">
                <div class="col-4">
                  <div class="form-group">
                    <label for="event_method_id">{{ __('admin.registration_method') }} <span class="text-red">*</span></label>
                    <select class="form-control select2bs4 @error('event_method_id') is-invalid @enderror" name="event_method_id" style="width: 100%;">
                      <option value="">{{ __('admin.select') }} {{ __('admin.registration_method') }}</option>
                      @foreach($rows_method as $method)
                      <option value="{{$method->id}}">{{$method->name}}</option>
                      @endforeach
                    </select>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-group">
                    <label for="registration_type">{{ __('admin.registration_type') }} <span class="text-red">*</span></label>
                    <select class="form-control select2bs4 @error('registration_type') is-invalid @enderror" name="registration_type" style="width: 100%;">
                      <option value="F">{{ __('admin.free') }}</option>
                      <option value="P">{{ __('admin.paid') }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-group">
                    <label for="auto_registration_date_limit">{{ __('admin.auto_registration_date_limit') }}</label>
                    <div class="input-group date reservationdate" id="auto_registration_date_limit" data-target-input="nearest">
                      <div class="input-group-append" data-target="#auto_registration_date_limit" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                      </div>
                      <input type="text" name="auto_registration_date_limit" class="form-control datetimepicker-input" data-target="#auto_registration_date_limit" data-toggle="datetimepicker" placeholder="DD-MM-YYYY"/>   
                    </div>
                  </div>
                </div>
              </div><!-- /.row -->
              <div class="row">
                <div class="col-4">
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group">
                        <label for="event_start_date">{{ __('admin.start_date') }} <span class="text-red">*</span></label>
                        <div class="input-group date reservationdate" id="event_start_date" data-target-input="nearest">
                          <div class="input-group-append" data-target="#event_start_date" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                          </div>
                          <input type="text" class="form-control datetimepicker-input" name="event_start_date" data-target="#event_start_date" data-toggle="datetimepicker" placeholder="DD-MM-YYYY"/>   
                        </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label for="event_end_date">{{ __('admin.end_date') }} <span class="text-red">*</span></label>
                        <div class="input-group date reservationdate" id="event_end_date" data-target-input="nearest">
                          <div class="input-group-append" data-target="#event_end_date" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                          </div>
                          <input type="text" class="form-control datetimepicker-input" name="event_end_date" data-target="#event_end_date" data-toggle="datetimepicker" placeholder="DD-MM-YYYY"/>   
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-group">
                    <label for="title">{{ __('admin.event') }} {{ __('admin.venue') }} <span class="text-red">*</span></label>
                    <input type="text" class="form-control @error('event_venue') is-invalid @enderror" id="event_venue" name="event_venue" placeholder="{{ __('admin.enter') }} {{ __('admin.event') }} {{ __('admin.venue') }}">
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-group">
                    <label for="title">{{ __('admin.event') }} {{ __('admin.theme') }} <span class="text-red">*</span></label>
                    <input type="text" class="form-control @error('event_theme') is-invalid @enderror" id="event_theme" name="event_theme" placeholder="{{ __('admin.enter') }} {{ __('admin.event') }} {{ __('admin.theme') }}">
                  </div>
                </div>
              </div><!-- /.row -->
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label for="title">{{ __('admin.overview_description') }}</label>
                    <textarea id="overview_description" name="overview_description" class="summernote @error('overview_description') is-invalid @enderror"></textarea>
                  </div>
                </div>
              </div><!-- /.row -->
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label for="event_description">{{ __('admin.event') }} {{ __('admin.description') }}</label>
                    <textarea id="event_description" name="event_description" class="summernote @error('event_description') is-invalid @enderror"></textarea>
                  </div>
                </div>
              </div><!-- /.row -->
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="event_banner">{{ __('admin.event') }} {{ __('admin.banner') }} <span class="text-red">*</span></label>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="event_banner" name="event_banner">
                        <label class="custom-file-label" for="event_banner">Choose file</label>  
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="card card-widget widget-user mt-2">
                    <div class="card-header">{{ __('admin.event') }} {{ __('admin.banner') }} {{ __('admin.preview') }}</div>
                    <div class="widget-user-header text-white">
                      <img src="/dist/img/no-banner.jpg" class="w-100 h-100" id="event_banner_preview">
                    </div>
                  </div>
                </div>
              </div><!-- /.row -->
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="event_logo">{{ __('admin.event') }} {{ __('admin.logo') }} <span class="text-red">*</span></label>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="event_logo" name="event_logo">
                        <label class="custom-file-label" for="event_logo">Choose file</label>
                    </div>
                  </div>
                </div>
                <div class="col-3">
                  <div class="card card-widget widget-user mt-2">
                    <div class="card-header">{{ __('admin.event') }} {{ __('admin.logo') }}  {{ __('admin.preview') }}</div>
                    <div class="widget-user-header text-white img-square">
                      <img src="/dist/img/no-banner.jpg" class="card-img-top w-100 h-100 img-bordered" id="event_logo_preview">  
                    </div>
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
      <!-- /.col -->
    </div>
    <!-- /.row -->
  </div><!-- /.container-fluid -->
</section>
<!-- /.content -->
@endsection
@section('script')
<script src="/validation/{{ $page_slug }}.js"></script>
@endsection