@extends('layouts.main')
@section('title', __('admin.manage').' '.$page_name.' '.__('admin.sponsors'))
@section('body')
<!-- Content Header (Page header) -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-5">
        <h4 class="m-0">{{ __('admin.sponsors') }}</h4>
        <h6 class="mt-1">{{$row_event->title}} ({{ date('d M, Y',strtotime($row_event->event_start_date))}} - {{ date('d M, Y',strtotime($row_event->event_end_date))}})</h6>
      </div><!-- /.col -->
      <div class="col-sm-7">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('admin.home') }}</a></li>
          <li class="breadcrumb-item"><a href="{{route($page_update,$row_event->id)}}">{{ $row_event->title }}</a></li>
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
      <div class="col-md-3">
        <!-- Profile Image -->
        @include('layouts.event_sidebar')
      </div>
      <!-- /.col -->
      <div class="col-md-9">
        <div class="card card-warning card-outline direct-chat-warning">
          <!-- /.card-header -->
          <div class="card-body">
            <table id="list_table" class="table table-bordered table-striped w-100">
              <thead>
              <tr>
                <th>#</th>
                <th>{{ __('admin.image') }}</th>
                <th>{{ __('admin.name') }}</th>
                <th>{{ __('admin.type') }}</th>
                <th>{{ __('admin.website') }}</th>
                <th class="text-center">{{ __('admin.action') }}</th>
              </tr>
              </thead>
              <tbody>
              @foreach($rows as $key => $row)
              <tr>
                <td>{{$key+1}}</td>
                <td><img class="conference-logo img-square img-bordered" src="{{config('constants.CDN_URL')}}/{{config('constants.SPONSORS_FOLDER')}}/{{ $row->sponsor_logo}}"/></td>
                <td>{{$row->sponsor_name}}</td>
                <td>{{$row->sponsorship_type_name}}</td>
                <td>{{$row->website_link}}</td>
                <td class="text-center">
                  <button type="button" class="btn btn-xs bg-gradient-{{($row->event_sponsors_id)?'danger':'primary'}} toggle-assigned"  data-bs-toggle="tooltip" title="{{ ($row->event_sponsors_id) ? __('admin.remove') : __('admin.assign') }}" data-id="{{$row->event_sponsors_id}}" data-event-id="{{$row_event->id}}" data-sponsors-id="{{($row->id)}}"><i class="fa fa-{{($row->event_sponsors_id)?'minus-circle':'plus-circle'}}"></i></button>
                </td>
              </tr>
              @endforeach
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
      </div>
    </div>
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
        { "width": "5%", "targets": 0 },
        { "width": "5%", "targets": 1 },
        { "width": "20%", "targets": 2 },
        { "width": "20%", "targets": 3 },
        { "width": "30%", "targets": 4 },
        { "width": "10%", "targets": 5 },
      ],
      fnDrawCallback: function (oSettings) {
        $('#list_table_wrapper .row:first div:first').html('<a href="{{route('sponsors_create',$row_event->id)}}" class="btn btn-warning btn-sm"><i class="fas fa-plus"></i> {{ __("admin.add") }} {{ __("admin.sponsors") }}</a>');
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
        url: "{{route('event_sponsors',$row_event->id)}}", 
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