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
                  <label for="name">{{ __('admin.name') }} <span class="text-red">*</span></label>
                  <input type="text" class="form-control @error('name') is-invalid @enderror" id="name" name="name" placeholder="{{ __('admin.enter') }} {{ __('admin.speaker') }} {{ __('admin.name') }}" value="{{$row->name}}">
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="designation">{{ __('admin.designation') }} <span class="text-red">*</span></label>
                  <input type="text" class="form-control @error('designation') is-invalid @enderror" id="designation" name="designation" placeholder="{{ __('admin.enter') }} {{ __('admin.designation') }}" value="{{$row->designation}}">
                </div>
              </div>
            </div><!-- /.row -->
            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <label for="company_name">{{ __('admin.company_name') }}</label>
                  <input type="text" class="form-control @error('company_name') is-invalid @enderror" id="company_name" name="company_name" placeholder="{{ __('admin.enter') }} {{ __('admin.company_name') }}" value="{{$row->company_name}}">
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="rank">{{ __('admin.speaker') }} {{ __('admin.rank') }}</label>
                  <select class="form-control select2bs4 @error('rank') is-invalid @enderror" name="rank" style="width: 100%;">
                    <option value="">{{ __('admin.select') }} {{ __('admin.rank') }}</option>
                    @for($i=1; $i<=100; $i++)
                    <option value="{{$i}}" {{($row->rank == $i)?'selected':''}}>{{$i}}</option>
                    @endfor
                  </select>
                </div>
              </div>
            </div><!-- /.row -->
            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <label for="image">{{ __('admin.image') }} <span class="text-red">*</span></label>
                  <div class="custom-file">
                      <input type="file" class="custom-file-input" id="image" name="image">
                      <label class="custom-file-label" for="image">Choose file</label>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="card card-widget widget-user mt-2">
                  <div class="card-header">{{ __('admin.preview') }} {{ __('admin.image') }}</div>
                  <div class="widget-user-header text-white">
                  <img src="{{($row->image)?config('constants.CDN_URL').'/'.config('constants.SPEAKERS_FOLDER').'/'.$row->image:'/dist/img/no-banner.jpg'}}" class="w-100 h-100 img-circle img-bordered" id="image_preview">
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
@section('script')
<script src="/validation/{{ $page_slug }}.js"></script>
@endsection