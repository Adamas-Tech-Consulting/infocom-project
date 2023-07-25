@extends('layouts.main')
@section('title', __('admin.manage').' '.$page_name.' '.__('admin.speakers'))
@section('body')
<!-- Content Header (Page header) -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-3">
        <h4 class="m-0">{{ __('admin.speakers') }}</h4>
        <h6 class="mt-1">{{$parent_row->full_title}} - {{ $row_schedule->schedule_title }}</h6>
      </div><!-- /.col -->
      <div class="col-sm-9">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('admin.home') }}</a></li>
          <li class="breadcrumb-item"><a href="{{route($page_update,[$parent_id,$row_schedule->id])}}">{{ $row_schedule->schedule_title }}</a></li>
          <li class="breadcrumb-item active">{{ __('admin.speakers') }}</li>
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
            <i class="icon fas fa-check"></i> {{ __('admin.speakers') }} {{ Session::get('success') }}
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
          <div class="card-header p-2">
            @include('layouts.schedule_topbar')
          </div>
          <div class="card-body">
            <table id="list_table" class="table table-bordered table-striped w-100">
              <thead>
              <tr>
                <th>#</th>
                <th>{{ __('admin.image') }}</th>
                <th>{{ __('admin.name') }}</th>
                <th>{{ __('admin.category') }}</th>
                <th>{{ __('admin.company_name') }}</th>
                <th class="text-center">{{ __('admin.action') }}</th>
              </tr>
              </thead>
              <tbody>
              @foreach($rows as $key => $row)
              <tr>
                <td>{{$key+1}}</td>
                <td><img class="conference-logo img-circle img-bordered" src="{{config('constants.CDN_URL')}}/{{config('constants.SPEAKERS_FOLDER')}}/{{ $row->image}}"/></td>
                <td>{{$row->name}}({{$row->designation}})</td>
                <td>{{$row->speakers_category_name}}</td>
                <td>{{$row->company_name}}</td>
                <td class="text-center">
                  <button type="button" class="btn btn-xs bg-gradient-{{($row->schedule_speakers_id)?'danger':'primary'}} toggle-assigned"  data-bs-toggle="tooltip" title="{{ ($row->schedule_speakers_id) ? __('admin.remove') : __('admin.assign') }}" data-id="{{$row->schedule_speakers_id}}" data-conference-id="{{$parent_id}}" data-event-id="{{ $row_schedule->schedule_title }}" data-speakers-id="{{($row->id)}}"><i class="fa fa-{{($row->schedule_speakers_id)?'minus-circle':'plus-circle'}}"></i></button>
                </td>
              </tr>
              @endforeach
              </tbody>
            </table>
          </div>
        </div>
        <!-- /.card -->
      </div>
    </div>
    <!-- /.row -->
  </div><!-- /.container-fluid -->
</section>
<!-- /.content -->
@endsection
@section('script')
<script>
  $(function () {
    var groupColumn = 3;
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
        { "width": "20%", "targets": 3, "visible": false },
        { "width": "20%", "targets": 4 },
        { "width": "10%", "targets": 5 },
      ],
      fnDrawCallback: function (oSettings) {
        var api = this.api();
        var rows = api.rows({ page: 'current' }).nodes();
        var last = null;
 
        api
            .column(groupColumn, { page: 'current' })
            .data()
            .each(function (group, i) {
                if (last !== group) {
                    $(rows)
                        .eq(i)
                        .before('<tr class="group"><td colspan="6">' + group + '</td></tr>');
 
                    last = group;
                }
            });
      }
    });
  });

  $(function () {
    $('.toggle-assigned').on('click',function() {
      var buttonObject = $(this);
      var id = $(this).data('id');
      var speakersId = $(this).data('speakers-id');
      $.ajax({
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type:"POST",
        url: "{{route('schedule_speakers',[$parent_id,$row_schedule->id])}}", 
        data:{'id':id,'speakers_id':speakersId},
        success:function(data){
          if(data.error) {
            toastr.error(data.error)
          } else {
            toastr.success("{{ __('admin.speakers') }} "+data.success)
            $(buttonObject).data('id',data.id)
            $(buttonObject).toggleClass('bg-gradient-primary bg-gradient-danger')
            $(buttonObject).tooltip('hide').attr('data-original-title', data.id ? "{{ __('admin.remove') }} " : "{{ __('admin.assign') }} ").tooltip('show');
            $(buttonObject).find('i').toggleClass('fa-plus-circle fa-minus-circle')
            $(buttonObject).prev().data('id',data.id)
          }
        },  
        error: function(XMLHttpRequest, textStatus, errorThrown) {

        }
      })
    })
  });
</script>
@endsection