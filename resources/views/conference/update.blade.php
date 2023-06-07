@extends('layouts.main')
@section('title', __('admin.edit').' '.$page_name)
@section('body')
<!-- Content Header (Page header) -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h1 class="m-0">{{ __('admin.edit') }} {{ $page_name }}</h1>
      </div><!-- /.col -->
      <div class="col-sm-6">
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
          <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="conference_category_id">{{ __('admin.conference_category') }} <span class="text-red">*</span></label>
                    <select class="form-control select2bs4 @error('conference_category_id') is-invalid @enderror" name="conference_category_id" style="width: 100%;">
                      <option value="">{{ __('admin.select') }} {{ __('admin.conference_category') }}</option>
                      @foreach($rows_category as $category)
                      <option value="{{$category->id}}" {{($category->id==$row->conference_category_id)?'selected':''}}>{{$category->name}}</option>
                      @endforeach
                    </select>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="title">{{ __('admin.conference') }} {{ __('admin.name') }} <span class="text-red">*</span></label>
                    <input type="text" class="form-control @error('title') is-invalid @enderror" id="title" name="title" placeholder="{{ __('admin.enter') }} {{ __('admin.conference') }} {{ __('admin.name') }}" value="{{$row->title}}">
                  </div>
                </div>
              </div><!-- /.row -->
              <div class="row">
                <div class="col-4">
                  <div class="form-group">
                    <label for="conference_method_id">{{ __('admin.registration_method') }} <span class="text-red">*</span></label>
                    <select class="form-control select2bs4 @error('conference_method_id') is-invalid @enderror" name="conference_method_id" style="width: 100%;">
                      <option value="">{{ __('admin.select') }} {{ __('admin.registration_method') }}</option>
                      @foreach($rows_method as $method)
                      <option value="{{$method->id}}" {{($method->id==$row->conference_method_id)?'selected':''}}>{{$method->name}}</option>
                      @endforeach
                    </select>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-group">
                    <label for="registration_type">{{ __('admin.registration_type') }} <span class="text-red">*</span></label>
                    <select class="form-control select2bs4 @error('registration_type') is-invalid @enderror" name="registration_type" style="width: 100%;">
                      <option value="F" {{($row->registration_type=='F')?'selected':''}}>{{ __('admin.free') }}</option>
                      <option value="P" {{($row->registration_type=='P')?'selected':''}}>{{ __('admin.paid') }}</option>
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
                      <input type="text" name="auto_registration_date_limit" class="form-control datetimepicker-input" data-target="#auto_registration_date_limit" value="{{($row->auto_registration_date_limit)?date('d-m-Y',strtotime($row->auto_registration_date_limit)):''}}" placeholder="DD-MM-YYYY"/>   
                    </div>
                  </div>
                </div>
              </div><!-- /.row -->
              <div class="row">
                <div class="col-4">
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group">
                        <label for="conference_start_date">{{ __('admin.start_date') }} <span class="text-red">*</span></label>
                        <div class="input-group date reservationdate" id="conference_start_date" data-target-input="nearest">
                          <div class="input-group-append" data-target="#conference_start_date" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                          </div>
                          <input type="text" class="form-control datetimepicker-input" name="conference_start_date" data-target="#conference_start_date" value="{{($row->conference_start_date)?date('d-m-Y',strtotime($row->conference_start_date)):''}}" placeholder="DD-MM-YYYY"/>   
                        </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label for="conference_end_date">{{ __('admin.end_date') }} <span class="text-red">*</span></label>
                        <div class="input-group date reservationdate" id="conference_end_date" data-target-input="nearest">
                          <div class="input-group-append" data-target="#conference_end_date" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                          </div>
                          <input type="text" class="form-control datetimepicker-input" name="conference_end_date" data-target="#conference_end_date" value="{{($row->conference_start_date)?date('d-m-Y',strtotime($row->conference_start_date)):''}}" placeholder="DD-MM-YYYY"/>   
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-group">
                    <label for="title">{{ __('admin.conference') }} {{ __('admin.venue') }} <span class="text-red">*</span></label>
                    <input type="text" class="form-control @error('conference_venue') is-invalid @enderror" id="conference_venue" name="conference_venue" placeholder="{{ __('admin.enter') }} {{ __('admin.conference') }} {{ __('admin.venue') }}" value="{{$row->conference_venue}}">
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-group">
                    <label for="title">{{ __('admin.conference') }} {{ __('admin.theme') }} <span class="text-red">*</span></label>
                    <input type="text" class="form-control @error('conference_theme') is-invalid @enderror" id="conference_theme" name="conference_theme" placeholder="{{ __('admin.enter') }} {{ __('admin.conference') }} {{ __('admin.theme') }}" value="{{$row->conference_theme}}">
                  </div>
                </div>
              </div><!-- /.row -->
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label for="title">{{ __('admin.overview_description') }}</label>
                    <textarea id="overview_description" name="overview_description" class="summernote @error('overview_description') is-invalid @enderror">{{$row->overview_description}}</textarea>
                  </div>
                </div>
              </div><!-- /.row -->
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label for="conference_description">{{ __('admin.conference') }} {{ __('admin.description') }}</label>
                    <textarea id="conference_description" name="conference_description" class="summernote @error('conference_description') is-invalid @enderror">{{$row->conference_description}}</textarea>
                  </div>
                </div>
              </div><!-- /.row -->
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="conference_banner">{{ __('admin.conference') }} {{ __('admin.banner') }} <span class="text-red">*</span></label>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="conference_banner" name="conference_banner">
                        <label class="custom-file-label" for="conference_banner">Choose file</label>  
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="card card-widget widget-user mt-2">
                    <div class="card-header">{{ __('admin.conference') }} {{ __('admin.banner') }} {{ __('admin.preview') }}</div>
                    <div class="widget-user-header text-white">
                      <img src="{{($row->conference_banner)?config('constants.CDN_URL').'/'.config('constants.CONFERENCE_FOLDER').'/'.$row->conference_banner:'/dist/img/no-banner.jpg'}}" class="w-100 h-100" id="conference_banner_preview">
                    </div>
                  </div>
                </div>
              </div><!-- /.row -->
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="conference_logo">{{ __('admin.conference') }} {{ __('admin.logo') }} <span class="text-red">*</span></label>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="conference_logo" name="conference_logo">
                        <label class="custom-file-label" for="conference_logo">Choose file</label>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="card card-widget widget-user mt-2">
                    <div class="card-header">{{ __('admin.conference') }} {{ __('admin.logo') }}  {{ __('admin.preview') }}</div>
                    <div class="widget-user-header text-white img-square">
                      <img src="{{($row->conference_logo)?config('constants.CDN_URL').'/'.config('constants.CONFERENCE_FOLDER').'/'.$row->conference_logo:'/dist/img/no-banner.jpg'}}" class="card-img-top w-25 h-100" id="conference_logo_preview">  
                    </div>
                  </div>
                </div>
              </div><!-- /.row -->
            </div>
          <!-- /.card-body -->
          <div class="card-footer">
            <button type="submit" class="btn btn-primary">{{ __('admin.update') }}</button>
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