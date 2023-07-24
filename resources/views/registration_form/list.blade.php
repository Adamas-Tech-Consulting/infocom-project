@extends('layouts.main')
@section('title', $page_name)
@section('body')
<!-- Content Header (Page header) -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-5">
        <h4 class="m-0">{{ $page_name }}</h4>
        <h6 class="mt-1">{{$row->title}} ({{ date('d M, Y',strtotime($row->event_start_date))}} - {{ date('d M, Y',strtotime($row->event_end_date))}})</h6>
      </div><!-- /.col -->
      <div class="col-sm-7">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('admin.home') }}</a></li>
          <li class="breadcrumb-item"><a href="{{ route('event_update', $event_id) }}">{{$row->title}}</a></li>
          <li class="breadcrumb-item active">{{ $page_name }}</li>
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
        @if(Session::has('success'))
          <div class="alert alert-success alert-dismissible">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
            <i class="icon fas fa-check"></i> {{ $page_name }} {{ Session::get('success') }}
              @php
                  Session::forget('success');
              @endphp
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
        @include('layouts.event_sidebar')
      </div>
      <!-- /.col -->
      <div class="col-md-9">
        <div class="card card-warning card-outline direct-chat-warning">
          <div class="card-header">
              <b>Form Builder</b>
          </div>
          <!-- /.card-header -->
          <form id="validation-form" action="" method="post" enctype="multipart/form-data">
            @csrf
            <div class="card-body">
              <table id="list_table" class="table table-bordered table-striped w-100">
                <thead>
                <tr>
                  <th>{{ __('admin.lebel') }}</th>
                  <th>{{ __('admin.is_visible') }}</th>
                  <th>{{ __('admin.is_mandatory') }}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>First Name</td>
                  <td>
                    <input type="checkbox" id="first_name_visible" checked disabled="">
                  </td>
                  <td>
                    <input type="checkbox" id="first_name_mandatory" checked disabled="">
                  </td>
                </tr>
                <tr>
                  <td>Last Name</td>
                  <td>
                    <input type="checkbox" id="last_name_visible" checked disabled="">
                  </td>
                  <td>
                    <input type="checkbox" id="last_name_mandatory" checked disabled="">
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
            <div class="card-footer">
              <button type="submit" class="btn btn-warning btn-sm">{{ __('admin.submit') }}</button>
            </div>
          </form>
        </div>
      </div>
    </div><!-- /.row -->
  </div><!-- /.container-fluid -->
</section>
<!-- /.content -->
@endsection
@section('script')
<script>
  $(function () {
    $('#list_table').DataTable({
      "paging": true,
      "lengthChange": true,
      "searching": true,
      "ordering": true,
      "info": true,
      "autoWidth": true,
      "responsive": true,
      "columnDefs": [
        { "width": "5%", "targets": 0 },
        { "width": "15%", "targets": 1 },
        { "width": "20%", "targets": 2 },
        { "width": "15%", "targets": 3 },
        { "width": "10%", "targets": 4 },
        { "width": "15%", "targets": 5 },
        { "width": "20%", "targets": 6 },
      ]
    });
  });
</script>
@endsection