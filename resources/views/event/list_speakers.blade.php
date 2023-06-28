@extends('layouts.main')
@section('title', __('admin.manage').' '.$page_name.' '.__('admin.speakers'))
@section('body')
<!-- Content Header (Page header) -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-5">
        <h4 class="m-0">{{ __('admin.speakers') }}</h4>
        <h6 class="mt-1">{{$row_event->title}} ({{ date('d M, Y',strtotime($row_event->event_start_date))}} - {{ date('d M, Y',strtotime($row_event->event_end_date))}})</h6>
      </div><!-- /.col -->
      <div class="col-sm-7">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('admin.home') }}</a></li>
          <li class="breadcrumb-item"><a href="{{route($page_update,$row_event->id)}}">{{ $row_event->title }}</a></li>
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
          <!-- /.card-header -->
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
                  <button type="button" class="btn btn-xs bg-gradient-info event-speaker-info {{($row->event_speakers_id)?'':'d-none'}}"  data-bs-toggle="tooltip" title="{{ __('admin.info') }}" data-id="{{$row->event_speakers_id}}" data-conference-id="{{$row_event->id}}" data-speakers-id="{{($row->id)}}" data-speaker-name="{{$row->name}}"><i class="fa fa-info-circle"></i></button>
                  <button type="button" class="btn btn-xs bg-gradient-{{$row->is_key_speaker==1 ? 'success' : 'secondary'}} {{($row->event_speakers_id)?'':'d-none'}} toggle-key-speaker"  data-bs-toggle="tooltip" title="{{$row->is_key_speaker==1 ? __('admin.key_speaker') : __('admin.non_key_speaker')}}" data-id="{{$row->event_speakers_id}}" data-conference-id="{{$row_event->id}}" data-is-key-speaker="{{($row->is_key_speaker)}}"><i class="fa fa-key"></i></button>
                  <button type="button" class="btn btn-xs bg-gradient-{{($row->event_speakers_id)?'danger':'primary'}} toggle-assigned"  data-bs-toggle="tooltip" title="{{ ($row->event_speakers_id) ? __('admin.remove') : __('admin.assign') }}" data-id="{{$row->event_speakers_id}}" data-conference-id="{{$row_event->id}}" data-speakers-id="{{($row->id)}}"><i class="fa fa-{{($row->event_speakers_id)?'minus-circle':'plus-circle'}}"></i></button>
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
    </div>
    <!-- /.row -->
  </div><!-- /.container-fluid -->
</section>
<div class="modal fade" id="eventSpeakerModal">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">
          <span class="speaker-name">Atanu Pramanik</span>
          <p><small>{{ __('admin.conference') }} {{ __('admin.name') }} : {{ $row_event->title }}</small></p>
        </h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h6 class="mb-3">{{ __('admin.event') }} {{ __('admin.of') }} {{ $row_event->title }}</h6>
        <div id="event_speakers"></div>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
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
        { "width": "15%", "targets": 2 },
        { "width": "20%", "targets": 3 },
        { "width": "20%", "targets": 4 },
        { "width": "15%", "targets": 5 },
      ],
      fnDrawCallback: function (oSettings) {
        $('#list_table_wrapper .row:first div:first').html('<a href="{{route('speakers_create',$row_event->id)}}" class="btn btn-warning btn-sm"><i class="fas fa-plus"></i> {{ __("admin.add") }} {{ __("admin.speakers") }}</a>');
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
        url: "{{route('event_speakers',$row_event->id)}}", 
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
            $(buttonObject).prev().prev().data('id',data.id)
            data.id?$(buttonObject).prev().removeClass("d-none"):$(buttonObject).prev().addClass("d-none").removeClass('bg-gradient-success').addClass('bg-gradient-secondary');
            data.id?$(buttonObject).prev().prev().removeClass("d-none"):$(buttonObject).prev().prev().addClass("d-none");
          }
        },  
        error: function(XMLHttpRequest, textStatus, errorThrown) {

        }
      })
    })
  });

  $(function () {
    $(document).on('click','.event-speaker-info', function() {
      var buttonObject = $(this);
      var id = $(this).data('id');
      var speakersId = $(this).data('speakers-id');
      $(".speaker-name").html($(this).data('speaker-name'));
      $("#eventSpeakerModal").modal();
      $.ajax({
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type:"POST",
        url: "{{route('event_schedule_speakers',$row_event->id)}}", 
        data:{'id':id,'speakers_id':speakersId},
        success:function(data){
          if(data.error) {
            toastr.error(data.error)
          } else {
            $("#event_speakers").html(data);
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
              return new bootstrap.Tooltip(tooltipTriggerEl)
            })
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
        url: "{{route('event_key_speakers')}}",
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

  $(function () {
    $(document).on('click','.toggle-schedule-assigned',function() {
      var buttonObject = $(this);
      var id = $(this).data('id');
      var scheduleId = $(this).data('schedule-id');
      var speakersId = $(this).data('speakers-id');
      $.ajax({
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type:"POST",
        url: "{{route('schedule_speakers',[$row_event->id])}}", 
        data:{'id':id,'schedule_id':scheduleId,'speakers_id':speakersId},
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
            data.id?$(buttonObject).prev().removeClass("d-none"):$(buttonObject).prev().addClass("d-none").removeClass('bg-gradient-success').addClass('bg-gradient-secondary');
          }
        },  
        error: function(XMLHttpRequest, textStatus, errorThrown) {

        }
      })
    })
  });

  $(function () {
    $(document).on('click','.toggle-schedule-key-speaker',function() {
      var buttonObject = $(this);
      var id = $(this).data('id');
      var isKeySpeaker = $(this).data('is-key-speaker') ? 0 : 1;
      $.ajax({
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type:"POST",
        url: "{{route('schedule_key_speakers',$row_event->id)}}",
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