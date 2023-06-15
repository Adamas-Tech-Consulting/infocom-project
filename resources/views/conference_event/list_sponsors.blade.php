@extends('layouts.main')
@section('title', __('admin.manage').' '.$page_name.' '.__('admin.sponsors'))
@section('body')
<!-- Content Header (Page header) -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-3">
        <h1 class="m-0">{{ $page_name }} {{ __('admin.sponsors') }}</h1>
      </div><!-- /.col -->
      <div class="col-sm-9">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('admin.home') }}</a></li>
          <li class="breadcrumb-item"><a href="{{$page_url}}">{{ __('admin.manage') }} {{ $page_name }}</a></li>
          <li class="breadcrumb-item"><a href="{{route($page_update,[$parent_id,$row_event->id])}}">{{ $row_event->event_title }}</a></li>
          <li class="breadcrumb-item active">{{ __('admin.sponsors') }}</li>
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
            <i class="icon fas fa-check"></i> {{ __('admin.sponsors') }} {{ Session::get('success') }}
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
      <ul class="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
        <li class="nav-item">
          <a class="nav-link" id="tab1" href="{{route($page_update,[$parent_id,$row_event->id])}}" role="tab" aria-controls="tab1" aria-selected="true">{{ __('admin.basic_information') }}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" id="tab2" data-toggle="pill" href="javascript:void(0);" role="tab" aria-controls="tab2" aria-selected="false">{{ __('admin.sponsors') }}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="tab3" href="{{route('event_speakers',[$parent_id,$row_event->id])}}" role="tab" aria-controls="tab3" aria-selected="false">{{ __('admin.speakers') }}</a>
        </li>
      </ul>
      <div class="card">
        <!-- /.card-header -->
        <div class="card-body">
          <table id="list_table" class="table table-bordered table-striped w-100">
            <thead>
            <tr>
              <th>#</th>
              <th>{{ __('admin.image') }}</th>
              <th>{{ __('admin.details') }}</th>
              <th class="text-center">{{ __('admin.action') }}</th>
            </tr>
            </thead>
            <tbody>
            @foreach($rows as $key => $row)
            <tr>
              <td>{{$key+1}}</td>
              <td><img class="conference-logo img-square img-bordered" src="{{config('constants.CDN_URL')}}/{{config('constants.SPONSORS_FOLDER')}}/{{ $row->sponsor_logo}}"/></td>
              <td>
                <div><b>{{ __('admin.name') }} : </b>{{$row->sponsor_name}}</div>
                <div><b>{{ __('admin.type') }} : </b>{{$row->sponsorship_type_name}}</div>
                <div><b>{{ __('admin.company_website') }} : </b>{{$row->website_link}}</div>
              </td>
              <td class="text-center">
                <button type="button" class="btn btn-sm bg-gradient-{{($row->event_sponsors_id)?'danger':'primary'}} toggle-assigned"  data-bs-toggle="tooltip" title="{{ ($row->event_sponsors_id) ? __('admin.remove') : __('admin.assign') }}" data-id="{{$row->event_sponsors_id}}" data-conference-id="{{$parent_id}}" data-event-id="{{ $row_event->event_title }}" data-sponsors-id="{{($row->id)}}"><i class="fa fa-{{($row->event_sponsors_id)?'minus-circle':'plus-circle'}}"></i></button>
              </td>
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
      "paging": false,
      "lengthChange": false,
      "searching": true,
      "ordering": false,
      "info": false,
      "autoWidth": true,
      "responsive": true,
      "columnDefs": [
        { "width": "10%", "targets": 0 },
        { "width": "10%", "targets": 1 },
        { "width": "70%", "targets": 2 },
        { "width": "10%", "targets": 3},
      ],
      fnDrawCallback: function (oSettings) {
        $('#list_table_wrapper .row:first div:first').html('<a href="{{route('sponsors_create',[$parent_id,$row_event->id])}}" class="btn btn-warning btn-md"><i class="fas fa-plus"></i> {{ __("admin.add") }} & {{ __("admin.assign") }} {{ __("admin.sponsors") }}</a>');
      }
    });
  });

  $(function () {
    $('.toggle-assigned').on('click',function() {
      var buttonObject = $(this);
      var id = $(this).data('id');
      var sponsorsId = $(this).data('sponsors-id');
      $.ajax({
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type:"POST",
        url: "{{route('event_sponsors',[$parent_id,$row_event->id])}}", 
        data:{'id':id,'sponsors_id':sponsorsId},
        success:function(data){
          if(data.error) {
            toastr.error(data.error)
          } else {
            toastr.success("{{ __('admin.sponsors') }} "+data.success)
            $(buttonObject).data('id',data.id)
            $(buttonObject).toggleClass('bg-gradient-primary bg-gradient-danger')
            $(buttonObject).tooltip('hide').attr('data-original-title', data.id ? "{{ __('admin.remove') }} " : "{{ __('admin.assign') }} ").tooltip('show');
            $(buttonObject).find('i').toggleClass('fa-plus-circle fa-minus-circle')
          }
        },  
        error: function(XMLHttpRequest, textStatus, errorThrown) {

        }
      })
    })
  });
</script>
@endsection