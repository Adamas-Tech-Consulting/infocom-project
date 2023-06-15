@extends('layouts.main')
@section('title', __('admin.edit').' '.$page_name)
@section('body')
<!-- Content Header (Page header) -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h4 class="m-0">{{ __('admin.edit') }} {{ $page_name }}</h4>
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
      <ul class="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
        <li class="nav-item">
          <a class="nav-link" id="tab1" href="{{route('users_update',$row->id)}}" role="tab" aria-controls="tab1" aria-selected="true">{{ __('admin.basic_information') }}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" id="tab2" data-toggle="pill" href="javascript:void(0);" role="tab" aria-controls="tab2" aria-selected="false">{{ __('admin.update_password') }}</a>
        </li>
      </ul>
      <div class="card card-warning card-outline direct-chat-warning">
        <form id="validation-form" action="" method="post" enctype="multipart/form-data">
          @csrf
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <label for="password">{{ __('admin.new') }} {{ __('admin.password') }} <span class="text-red">*</span></label>
                  <input type="password" class="form-control @error('password') is-invalid @enderror" id="password" name="password" placeholder="{{ __('admin.enter') }} {{ __('admin.new') }} {{ __('admin.password') }}">
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="confirmed">{{ __('admin.confirm_password') }} <span class="text-red">*</span></label>
                  <input type="password" class="form-control @error('confirmed') is-invalid @enderror" id="confirmed" name="confirmed" placeholder="{{ __('admin.enter') }} {{ __('admin.confirm_password') }}">
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