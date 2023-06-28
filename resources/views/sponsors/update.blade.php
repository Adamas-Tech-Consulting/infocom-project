@extends('layouts.main')
@section('title', __('admin.edit').' '.$page_name)
@section('body')
<!-- Content Header (Page header) -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h4 class="m-0">{{ __('admin.edit') }} {{ $page_name }}</h4>
        @if(!empty($row_event))
        <h6 class="mt-1">{{$row_event->title}} ({{ date('d M, Y',strtotime($row_event->event_start_date))}} - {{ date('d M, Y',strtotime($row_event->event_end_date))}})</h6>
        @endif
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
                      <label for="sponsorship_type_id">{{ __('admin.sponsorship_type') }} <span class="text-red">*</span></label>
                      <select class="form-control select2bs4 @error('sponsorship_type_id') is-invalid @enderror" name="sponsorship_type_id" style="width: 100%;">
                        <option value="">{{ __('admin.select') }} {{ __('admin.sponsorship_type') }}</option>
                        @foreach($rows_sponsorship_type as $sponsorship_type)
                        <option value="{{$sponsorship_type->id}}" {{($sponsorship_type->id==$row->sponsorship_type_id)?'selected':''}}>{{$sponsorship_type->name}}</option>
                        @endforeach
                      </select>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label for="rank">{{ __('admin.rank') }}</label>
                      <select class="form-control select2bs4 @error('rank') is-invalid @enderror" name="rank" style="width: 100%;">
                        <option value="">{{ __('admin.select') }} {{ __('admin.rank') }}</option>
                        @for($i=1; $i<=30; $i++)
                        <option value="{{$i}}" {{($row->rank == $i)?'selected':''}}>{{$i}}</option>
                        @endfor
                      </select>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label for="sponsor_name">{{ __('admin.sponsors') }} {{ __('admin.name') }} <span class="text-red">*</span></label>
                      <input type="text" class="form-control @error('sponsor_name') is-invalid @enderror" id="sponsor_name" name="sponsor_name" placeholder="{{ __('admin.enter') }} {{ __('admin.sponsors') }} {{ __('admin.name') }}" value="{{$row->sponsor_name}}">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <div class="form-group">
                      <label for="website_link">{{ __('admin.company_website') }}</label>
                      <input type="text" class="form-control @error('website_link') is-invalid @enderror" id="website_link" name="website_link" placeholder="{{ __('admin.enter') }} {{ __('admin.company_website') }}" value="{{$row->website_link}}">
                    </div>
                  </div>
                  
                </div>
              </div>
              <div class="col-5">
                <div class="card card-widget widget-user mt-2">
                  <div class="card-header"><label class="mb-0" for="sponsor_logo">{{ __('admin.sponsors') }} {{ __('admin.logo') }} <span class="text-red">*</span></label><span class="float-right"><b>(Dimension : 150 X 150)</b></span></div>
                  <div class="card-body widget-user-header logo-image">
                    <img src="{{($row->sponsor_logo)?config('constants.CDN_URL').'/'.config('constants.SPONSORS_FOLDER').'/'.$row->sponsor_logo:'/dist/img/no-banner.jpg'}}" class="w-100 h-100 img-bordered" id="sponsor_logo_preview">
                  </div>
                  <div class="card-footer pt-3 form-group">
                    <div class="btn btn-sm btn-secondary upload-image-button"> {{ __('admin.browse_and_upload') }}
                        <input type="file" class="custom-file-input" id="sponsor_logo" name="sponsor_logo">
                    </div>
                  </div>
                </div>
              </div>
            </div><!-- /.row -->
          </div>
          <!-- /.card-body -->
          <div class="card-footer">
            <button type="submit" class="btn btn-warning btn-sm">{{ __('admin.update') }}</button>
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