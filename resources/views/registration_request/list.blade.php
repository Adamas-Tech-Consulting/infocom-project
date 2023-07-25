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
              <div class="row">
                <div class="col-6">
                  <a href="{{$export_excel}}" class="btn btn-warning btn-sm" disabled><i class="fas fa-download"></i> {{ __('admin.download_csv') }}</a>
                </div>
              </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <table id="list_table" class="table table-bordered table-striped w-100">
              <thead>
              <tr>
                <th>#</th>
                <th>{{ __('admin.name') }}</th>
                <th>{{ __('admin.designation') }}</th>
                <th>{{ __('admin.organization') }}</th>
                <th>{{ __('admin.email') }}</th>
                <th>{{ __('admin.mobile') }}</th>
                <th>{{ __('admin.pickup_address') }}</th>
              </tr>
              </thead>
              <tbody>
              @foreach($rows as $key => $row)
              <tr>
                <td>{{$key+1}}</td>
                <td>{{$row->first_name}} {{$row->last_name}}</td>
                <td>{{$row->designation}}</td>
                <td>{{$row->organization}}</td>
                <td>{{$row->email}}</td>
                <td>{{$row->mobile}}</td>
                <td>{{$row->pickup_address}}</td>
              </tr>
              @endforeach
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
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