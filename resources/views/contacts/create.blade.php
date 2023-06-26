@extends('layouts.main')
@section('title', __('admin.add').' '.$page_name)
@section('body')
<!-- Content Header (Page header) -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h4 class="m-0">{{ $contact_group->name }} : {{ __('admin.add') }} {{ $page_name }}</h4>
      </div><!-- /.col -->
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('admin.home') }}</a></li>
          <li class="breadcrumb-item"><a href="{{route('contacts_group_update',$group_id)}}">{{ $contact_group->name }}</a></li>
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
        @include('layouts.contact_group_sidebar')
      </div>
      <!-- /.col -->
      <div class="col-md-9">
        <div class="card card-warning card-outline direct-chat-warning">
          <form id="validation-form" action="" method="post" enctype="multipart/form-data">
            <input type="hidden" name="contacts_group_id" value="{{$group_id}}" />
            @csrf
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="fname">{{ __('admin.fname') }} <span class="text-red">*</span></label>
                    <input type="text" class="form-control @error('fname') is-invalid @enderror" id="fname" name="fname" placeholder="{{ __('admin.enter') }} {{ __('admin.fname') }}">
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="lname">{{ __('admin.lname') }} <span class="text-red">*</span></label>
                    <input type="text" class="form-control @error('lname') is-invalid @enderror" id="lname" name="lname" placeholder="{{ __('admin.enter') }} {{ __('admin.lname') }}">
                  </div>
                </div>
              </div><!-- /.row -->
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="email">{{ __('admin.email') }} <span class="text-red">*</span></label>
                    <input type="text" class="form-control @error('email') is-invalid @enderror" id="email" name="email" placeholder="{{ __('admin.enter') }} {{ __('admin.email') }}">
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="mobile">{{ __('admin.mobile') }}</label>
                    <input type="text" class="form-control @error('mobile') is-invalid @enderror" id="mobile" name="mobile" placeholder="{{ __('admin.enter') }} {{ __('admin.mobile') }}">
                  </div>
                </div>
              </div><!-- /.row -->
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="designation">{{ __('admin.designation') }}</label>
                    <input type="text" class="form-control @error('designation') is-invalid @enderror" id="designation" name="designation" placeholder="{{ __('admin.enter') }} {{ __('admin.designation') }}">
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="company_name">{{ __('admin.company_name') }}</label>
                    <input type="text" class="form-control @error('company_name') is-invalid @enderror" id="company_name" name="company_name" placeholder="{{ __('admin.enter') }} {{ __('admin.company_name') }}">
                  </div>
                </div>
              </div><!-- /.row -->
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label for="address">{{ __('admin.address') }}</label>
                    <textarea class="form-control @error('address') is-invalid @enderror" id="address" name="address" placeholder="{{ __('admin.enter') }} {{ __('admin.address') }}"></textarea>
                  </div>
                </div>
              </div><!-- /.row -->
            </div>
            <!-- /.card-body -->
            <div class="card-footer">
              <button type="submit" class="btn btn-warning">{{ __('admin.submit') }}</button>
            </div>
          </form>
        </div>
        <!-- /.card -->
      </div>
      <!-- /.col -->
    </div>
  </div><!-- /.container-fluid -->
</section>
<!-- /.content -->
@endsection
@section('script')
<script src="/validation/{{ $page_slug }}.js"></script>
@endsection