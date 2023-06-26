@extends('layouts.main')
@section('title', __('admin.add').' '.$page_name)
@section('body')
<!-- Content Header (Page header) -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h4 class="m-0">{{ __('admin.new') }} {{ $page_name }}</h4>
      </div><!-- /.col -->
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('admin.home') }}</a></li>
          <li class="breadcrumb-item"><a href="{{$page_url}}">{{ __('admin.manage') }} {{ $page_name }}</a></li>
          <li class="breadcrumb-item active">{{ __('admin.new') }} {{ $page_name }}</li>
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
        <form id="validation-form" action="" method="post">
          @csrf
          <div class="card-body">
            <div class="row">
              <div class="col-4">
                <div class="form-group">
                  <label for="name">{{ __('admin.invitation') }} {{ __('admin.for') }} <span class="text-red">*</span></label>
                  <select class="form-control select2bs4 @error('event_id') is-invalid @enderror" name="event_id" style="width: 100%;">
                    @foreach($rows_event as $event)
                    <option value="{{$event->id}}">{{$event->title}}</option>
                    @endforeach
                  </select>
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label for="source_group">{{ __('admin.contacts_group') }} <span class="text-red">*</span></label>
                  <select class="form-control select2bs4 @error('source_group') is-invalid @enderror" name="source_group" style="width: 100%;">
                    <option value="">{{ __('admin.select') }} {{ __('admin.contacts_group') }}</option>
                    @foreach($rows_contacts_group as $contacts_group)
                    <option value="{{$contacts_group->id}}">{{$contacts_group->name}}</option>
                    @endforeach
                  </select>
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label for="mail_subject">{{ __('admin.mail_subject') }} <span class="text-red">*</span></label>
                  <input type="text" class="form-control @error('mail_subject') is-invalid @enderror" id="mail_subject" name="mail_subject" placeholder="{{ __('admin.enter') }} {{ __('admin.mail_subject') }}">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="mail_body">{{ __('admin.mail_body') }} <span class="text-red">*</span></label>
                  <textarea id="mail_body" name="mail_body" class="summernote-large @error('mail_body') is-invalid @enderror">{{$row_template->template_body}}</textarea>
                </div>
              </div>
            </div><!-- /.row -->
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="mail_signature">{{ __('admin.mail_signature') }} <span class="text-red">*</span></label>
                  <textarea id="mail_signature" name="mail_signature" class="summernote-large @error('mail_signature') is-invalid @enderror">{{$row_template->template_footer}}</textarea>
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