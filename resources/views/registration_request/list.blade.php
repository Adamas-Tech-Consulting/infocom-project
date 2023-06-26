@extends('layouts.main')
@section('title', $page_name)
@section('body')
<!-- Content Header (Page header) -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h4 class="m-0">{{ __('admin.manage') }} {{ $page_name }}</h4>
      </div><!-- /.col -->
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('admin.home') }}</a></li>
          <li class="breadcrumb-item active">{{ __('admin.manage') }} {{ $page_name }}</li>
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
    <div class="col-12">
      <div class="card card-warning card-outline direct-chat-warning">
        <div class="card-header">
            <div class="row">
              <div class="col-3">
                <div class="form-group">
                  <select class="form-control select2bs4 @error('event_id') is-invalid @enderror" name="event_id" style="width: 100%;">
                    @foreach($rows_event as $event)
                    <option value="{{$event->id}}" {{($event->id == $selected_event)?'selected':''}}>{{$event->title}}</option>
                    @endforeach
                  </select>
                </div>
              </div>
              <div class="col-6">
                <a href="{{route('registration_request_csv_download')}}" class="btn btn-warning btn-sm" disabled><i class="fas fa-download"></i> {{ __('admin.download_csv') }}</a>
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
              <td>{{$row->fname}} {{$row->lname}}</td>
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
  $(function () {
    $('select[name="event_id"]').on('change', function() {
      var event_id = $(this).val();
      $.get("{{url('manage-registration-request/switch-event')}}/"+event_id, function(data, status){
        location.reload();
      });
    });
  });
</script>
@endsection