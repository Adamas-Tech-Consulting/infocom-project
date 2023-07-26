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
    <div class="col-8">
      <div class="card card-warning card-outline direct-chat-warning">
        <form id="validation-form" action="" method="post">
          @csrf
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="name">{{ __('admin.category') }} {{ __('admin.name') }}</label>
                  <input type="text" class="form-control @error('name') is-invalid @enderror" id="name" name="name" value="{{$row->name}}"  placeholder="{{ __('admin.enter') }} {{ __('admin.category') }} {{ __('admin.name') }}">
                </div>
              </div>
            </div>
            <!-- /.row -->
            <div class="row">
              <div class="col-12">
                <label for="name">{{ __('admin.allow') }} {{ __('admin.sponsors') }}</label>
                <div class="form-group clearfix">
                  <div class="icheck-primary d-inline mr-3">
                    <input type="radio" id="radioPrimary1" name="is_sponsors" value="1" {{($row->is_sponsors)?'checked':''}}>
                    <label for="radioPrimary1">{{ __('admin.yes') }}</label>
                  </div>
                  <div class="icheck-primary d-inline">
                    <input type="radio" id="radioPrimary2" name="is_sponsors" value="0" {{(!$row->is_sponsors)?'checked':''}}>
                    <label for="radioPrimary2">{{ __('admin.no') }}</label>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.row -->
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
<script src='{{ asset("validation/$page_slug.js") }}'></script>
@endsection