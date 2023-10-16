@extends('layouts.main')
@section('title', __('admin.add').' '.$page_name)
@section('body')
<!-- Content Header (Page header) -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h4 class="m-0">{{ __('admin.add') }} {{ $page_name }}</h4>
        @if(!empty($row_event))
        <h6 class="mt-1">{{$row_event->full_title}} ({{ date('d M, Y',strtotime($row_event->event_start_date))}} - {{ date('d M, Y',strtotime($row_event->event_end_date))}})</h6>
        @endif
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
      @if(!empty($row_event))
      <div class="col-md-3">
        <!-- Profile Image -->
        @include('layouts.event_sidebar')
      </div>
      @endif
      <div class="col-{{(!empty($row_event)) ? 9 : 12}}">
        <div class="card card-warning card-outline direct-chat-warning">
          <form id="validation-form" action="" method="post" enctype="multipart/form-data">
            @csrf
            <div class="card-body">
              <div class="row">
                <div class="col-7">
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group">
                        <label for="registered_user">{{ __('admin.registered_user') }} <span class="text-red">*</span></label>
                        <select class="form-control userSearch @error('registration_request_id') is-invalid @enderror" name="registration_request_id" style="width: 100%;">
                          <option value="">{{ __('admin.select') }} {{ __('admin.registered_user') }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label for="type">{{ __('admin.type') }} <span class="text-red">*</span></label>
                        <select class="form-control select2bs4 @error('type') is-invalid @enderror" name="type" style="width: 100%;">
                          <option value="">{{ __('admin.select') }} {{ __('admin.type') }}</option>
                          <option value="cio">CIO</option>
                          <option value="ciso">CISO</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group">
                        <label for="designation">{{ __('admin.designation') }} <span class="text-red">*</span></label>
                        <input type="text" class="form-control @error('designation') is-invalid @enderror" id="designation" name="designation" placeholder="{{ __('admin.enter') }} {{ __('admin.designation') }}">
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label for="company_name">{{ __('admin.company_name') }}</label>
                        <input type="text" class="form-control @error('company_name') is-invalid @enderror" id="company_name" name="company_name" placeholder="{{ __('admin.enter') }} {{ __('admin.company_name') }}">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="form-group">
                        <label for="linkedin_url">{{ __('admin.linkedin_url') }}</label>
                        <input type="text" class="form-control @error('linkedin_url') is-invalid @enderror" id="linkedin_url" name="linkedin_url" placeholder="{{ __('admin.enter') }} {{ __('admin.linkedin_url') }}">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-5">
                  <div class="card card-widget widget-user mt-2">
                    <div class="card-header"><label class="mb-0" for="image">{{ __('admin.profile') }} {{ __('admin.image') }} <span class="text-red">*</span></label><span class="float-right"><b>(Dimension : 150 X 150)</b></span></div>
                    <div class="card-body widget-user-header logo-image">
                      <img src="{{ asset('dist/img/no-banner.jpg') }}" class="w-100 h-100 img-bordered" id="image_preview">
                    </div>
                    <div class="card-footer pt-3 form-group">
                      <div class="btn btn-sm btn-secondary upload-image-button"> {{ __('admin.browse_and_upload') }}
                          <input type="file" class="custom-file-input" id="image" name="image">
                      </div>
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
<script>
var user_dropdown_url = '{{$user_dropdown_url}}';
</script>
<script src="{{url('/')}}/validation/{{ $page_slug }}.js"></script>
@endsection