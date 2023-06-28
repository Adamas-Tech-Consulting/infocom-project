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
                <div class="col-4">
                  <div class="form-group">
                    <label for="name">{{ __('admin.name') }} <span class="text-red">*</span></label>
                    <input type="text" class="form-control @error('name') is-invalid @enderror" id="name" name="name" placeholder="{{ __('admin.enter') }} {{ __('admin.speaker') }} {{ __('admin.name') }}">
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-group">
                    <label for="designation">{{ __('admin.designation') }} <span class="text-red">*</span></label>
                    <input type="text" class="form-control @error('designation') is-invalid @enderror" id="designation" name="designation" placeholder="{{ __('admin.enter') }} {{ __('admin.designation') }}">
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-group">
                    <label for="company_name">{{ __('admin.company_name') }}</label>
                    <input type="text" class="form-control @error('company_name') is-invalid @enderror" id="company_name" name="company_name" placeholder="{{ __('admin.enter') }} {{ __('admin.company_name') }}">
                  </div>
                </div>
              </div><!-- /.row -->
              <div class="row">
                <div class="col-4">
                  <div class="card card-widget card-secondary card-outline widget-user mt-2">
                    <div class="card-header"><label class="mb-0" for="image">{{ __('admin.image') }} <span class="text-red">*</span></label><span class="float-right"><b>(Dimension : 150 X 150)</b></span></div>
                    <div class="card-body widget-user-header logo-image">
                      <img src="/dist/img/no-banner.jpg" class="w-100 h-100 img-bordered" id="image_preview">
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
<script src="/validation/{{ $page_slug }}.js"></script>
@endsection