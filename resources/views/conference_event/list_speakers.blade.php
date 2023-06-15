@extends('layouts.main')
@section('title', __('admin.manage').' '.$page_name.' '.__('admin.speakers'))
@section('body')
<!-- Content Header (Page header) -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-3">
        <h1 class="m-0">{{ $page_name }} {{ __('admin.speakers') }}</h1>
      </div><!-- /.col -->
      <div class="col-sm-9">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('admin.home') }}</a></li>
          <li class="breadcrumb-item"><a href="{{$parent_page_url}}">{{ __('admin.manage') }} {{ $parent_page_name }}</a></li>
          <li class="breadcrumb-item"><a href="{{$parent_page_single_url}}">{{$parent_row->title}}</a></li>
          <li class="breadcrumb-item"><a href="{{route($page_update,[$parent_id,$row_event->id])}}">{{ $row_event->event_title }}</a></li>
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
    <div class="col-12">
      <ul class="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
        <li class="nav-item">
          <a class="nav-link" id="tab1" href="{{ route('conference_update',$parent_id) }}" role="tab" aria-controls="tab1" aria-selected="true"><i class="fa fa-users"></i> {{ __('admin.conference') }} {{ __('admin.details') }}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" id="tab2" data-toggle="pill" href="javascript:void(0);" role="tab" aria-controls="tab2" aria-selected="false"><i class="fa fa-calendar"></i> {{ __('admin.conference') }} {{ __('admin.events') }}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="tab3" href="{{ route('conference_sponsors',$parent_id) }}" role="tab" aria-controls="tab3" aria-selected="false"><i class="fa fa-user"></i> {{ __('admin.conference') }} {{ __('admin.sponsors') }}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="tab4" href="{{ route('conference_speakers',$parent_id) }}" role="tab" aria-controls="tab4" aria-selected="false"><i class="fa fa-volume-up"></i> {{ __('admin.conference') }} {{ __('admin.speakers') }}</a>
        </li>
      </ul>
      <div class="card">
        <!-- /.card-header -->
        <div class="card-body">
          <div class="row">
            <div class="col-2 col-sm-2">
              <div class="nav flex-column nav-tabs h-100" id="vert-tabs-tab" role="tablist" aria-orientation="vertical" style="border-right: 0">
                <a class="nav-link" id="vert-tabs-home-tab" href="{{route($page_update,[$parent_id,$row_event->id])}}" role="tab" aria-controls="vert-tabs-home" aria-selected="false"><i class="fa fa-calendar"></i> {{ __('admin.event') }} {{ __('admin.details') }}</a>
                <a class="nav-link active" id="vert-tabs-profile-tab" href="#vert-tabs-speaker" role="tab" aria-controls="vert-tabs-profile" aria-selected="false"><i class="fa fa-volume-up"></i> {{ __('admin.event') }} {{ __('admin.speakers') }}</a>
              </div>
            </div>
            <div class="col-10 col-sm-10">
              <div class="tab-content" id="vert-tabs-tabContent">
                <div class="tab-pane fade active show" id="vert-tabs-home" role="tabpanel" aria-labelledby="vert-tabs-home-tab">
                  <div class="card">
                    <div class="card-body">
                      <table id="list_table" class="table table-bordered table-striped w-100">
                        <thead>
                        <tr>
                          <th>#</th>
                          <th>{{ __('admin.image') }}</th>
                          <th>{{ __('admin.name') }}</th>
                          <th>{{ __('admin.designation') }}</th>
                          <th>{{ __('admin.company_name') }}</th>
                          <th class="text-center">{{ __('admin.action') }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($rows as $key => $row)
                        <tr>
                          <td>{{$key+1}}</td>
                          <td><img class="conference-logo img-circle img-bordered" src="{{config('constants.CDN_URL')}}/{{config('constants.SPEAKERS_FOLDER')}}/{{ $row->image}}"/></td>
                          <td>{{$row->name}}</td>
                          <td>{{$row->designation}}</td>
                          <td>{{$row->company_name}}</td>
                          <td class="text-center">
                            <button type="button" class="btn btn-xs bg-gradient-{{$row->is_key_speaker==1 ? 'success' : 'secondary'}} {{($row->event_speakers_id)?'':'d-none'}} toggle-key-speaker"  data-bs-toggle="tooltip" title="{{$row->is_key_speaker==1 ? __('admin.key_speaker') : __('admin.non_key_speaker')}}" data-id="{{$row->event_speakers_id}}" data-conference-id="{{$parent_id}}" data-is-key-speaker="{{($row->is_key_speaker)}}"><i class="fa fa-key"></i></button>
                            <button type="button" class="btn btn-xs bg-gradient-{{($row->event_speakers_id)?'danger':'primary'}} toggle-assigned"  data-bs-toggle="tooltip" title="{{ ($row->event_speakers_id) ? __('admin.remove') : __('admin.assign') }}" data-id="{{$row->event_speakers_id}}" data-conference-id="{{$parent_id}}" data-event-id="{{ $row_event->event_title }}" data-speakers-id="{{($row->id)}}"><i class="fa fa-{{($row->event_speakers_id)?'minus-circle':'plus-circle'}}"></i></button>
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
            </div>
          </div>
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
        { "width": "5%", "targets": 0 },
        { "width": "5%", "targets": 1 },
        { "width": "20%", "targets": 2 },
        { "width": "20%", "targets": 3 },
        { "width": "20%", "targets": 4 },
        { "width": "10%", "targets": 5 },
      ],
      fnDrawCallback: function (oSettings) {
        $('#list_table_wrapper .row:first div:first').html('<a href="{{route('speakers_create',[$parent_id,$row_event->id])}}" class="btn btn-warning btn-sm"><i class="fas fa-plus"></i> {{ __("admin.add") }} & {{ __("admin.assign") }} {{ __("admin.speakers") }}</a>');
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
        url: "{{route('event_speakers',[$parent_id,$row_event->id])}}", 
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
          }
        },  
        error: function(XMLHttpRequest, textStatus, errorThrown) {

        }
      })
    })
  });

  $(function () {
    $('.toggle-key-speaker').on('click',function() {
      var buttonObject = $(this);
      var id = $(this).data('id');
      var isKeySpeaker = $(this).data('is-key-speaker') ? 0 : 1;
      $.ajax({
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type:"POST",
        url: "{{route('event_key_speakers',$parent_id)}}",
        data:{'id':id,'is_key_speaker':isKeySpeaker},
        success:function(data){
          if(data.error) {
            toastr.error(data.error)
          } else {
            toastr.success("{{ __('admin.speakers') }} "+data.success)
            $(buttonObject).data('is-key-speaker',isKeySpeaker)
            $(buttonObject).toggleClass('bg-gradient-success bg-gradient-secondary')
            $(buttonObject).tooltip('hide').attr('data-original-title', isKeySpeaker ? 'Key Speaker' : 'Non Key Speaker').tooltip('show');
          }
        },  
        error: function(XMLHttpRequest, textStatus, errorThrown) {

        }
      })
    })
  });
</script>
@endsection