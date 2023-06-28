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
      <ul class="nav nav-pills nav-events mb-1 float-center">
        <li class="nav-item"><a class="nav-link {{ Nav::isResource('manage-event') }}" href="#"><i class="fas fa-calendar"></i> {{ __('admin.current') }} {{ __('admin.event') }}</a></li>
        <li class="nav-item"><a class="nav-link {{ Nav::isResource('manage-schedule/speakers') }}" href="#"><i class="fa fa-calendar"></i> {{ __('admin.upcoming') }} {{ __('admin.event') }}</a></li>
        <li class="nav-item"><a class="nav-link {{ Nav::isResource('manage-schedule/contact-information') }}" href="#"><i class="fa fa-calendar"></i> {{ __('admin.past') }} {{ __('admin.event') }}</a></li>
      </ul>
      <div class="card card-warning card-outline direct-chat-warning">
        <div class="card-header">
          <h3 class="card-title"><a href="{{route($page_add)}}" class="btn btn-block btn-warning btn-sm"><i class="fas fa-plus"></i> {{ __('admin.add') }} {{ $page_name }}</a></h3>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <table id="list_table" class="table table-bordered table-striped w-100">
            <thead>
            <tr>
              <th>#</th>
              <th>{{ __('admin.category') }}</th>
              <th>{{ __('admin.event') }} {{ __('admin.name') }}</th>
              <th>{{ __('admin.details') }}</th>
              <th>{{ __('admin.logo') }}</th>
              <th class="text-center">{{ __('admin.featured') }}</th>
              <th class="text-center">{{ __('admin.action') }}</th>
            </tr>
            </thead>
            <tbody>
            @foreach($rows as $key => $row)
            <tr>
              <td>{{$key+1}}</td>
              <td><span style="color:{{$row->event_category_color}}">{{$row->event_category_name}}</span></td>
              <td>
                {{$row->title}} 
                <div>(<b>{{$row->event_method_name}} - {{($row->registration_type=='F') ? __('admin.free') : __('admin.paid')}}</b>)<div>
              </td>
              <td>
                <div><b>{{ __('admin.date') }} : </b>{{ date('d M, Y',strtotime($row->event_start_date))}} - {{ date('d M, Y',strtotime($row->event_end_date))}}</div>
                @if($row->event_venue)
                  <div><b>{{ __('admin.venue') }} : </b>{{ $row->event_venue}}</div>
                @endif
              </td>
              <td><img class="conference-logo img-bordered" src="{{config('constants.CDN_URL')}}/{{config('constants.EVENT_FOLDER')}}/{{ $row->event_logo}}"/></td>
              <td class="text-center"><i class="featured {{($row->featured)?'fas':'far'}} fa-star mt-2 toggle-featured" data-id="{{$row->id}}" data-is-featured="{{($row->featured)}}"></i></td>
              <td class="text-center">
                <a href="{{route($page_update,$row->id)}}" class="btn btn-xs bg-gradient-primary" data-bs-toggle="tooltip" title="{{ __('admin.view') }}"><i class="fas fa-search"></i></a>
                <form class="d-inline-block" id="form_{{$row->id}}" action="{{route($page_delete,$row->id)}}" method="post">
                  @csrf
                  <button type="button" data-form="#form_{{$row->id}}" class="btn btn-xs bg-gradient-danger delete-btn" data-bs-toggle="tooltip" title="{{ __('admin.delete') }}"><i class="fas fa-trash"></i></button>
                </form>
                <button type="button" class="btn btn-xs bg-gradient-{{($row->published)?'success':'warning'}} toggle-published"  data-bs-toggle="tooltip" title="{{ ($row->published) ? __('admin.unpublish') : __('admin.publish') }}" data-id="{{$row->id}}" data-is-published="{{($row->published)}}"><i class="fas fa-{{($row->published)?'check-circle':'ban'}}"></i></button>
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
        { "width": "25%", "targets": 3 },
        { "width": "10%", "targets": 4 },
        { "width": "10%", "targets": 5 },
        { "width": "15%", "targets": 6 },
      ]
    });
  });

  $(function () {
    $('.toggle-featured').on('click',function() {
      var buttonObject = $(this);
      var id = $(this).data('id');
      var isfeatured = $(this).data('is-featured') ? 0 : 1;
      $.ajax({
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type:"POST",
        url: "{{route($page_featured)}}",
        data:{'id':id,'featured':isfeatured},
        success:function(data){
          if(data.error) {
            toastr.error(data.error)
          } else {
            toastr.success("{{ $page_name }} "+data.success)
            $(buttonObject).data('is-featured',isfeatured)
            $(buttonObject).toggleClass('far fas')
          }
        },  
        error: function(XMLHttpRequest, textStatus, errorThrown) {

        }
      })
    })
  });

  $(function () {
    $('.toggle-published').on('click',function() {
      var buttonObject = $(this);
      var id = $(this).data('id');
      var isPublished = $(this).data('is-published') ? 0 : 1;
      $.ajax({
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type:"POST",
        url: "{{route($page_publish_unpublish)}}",
        data:{'id':id,'published':isPublished},
        success:function(data){
          if(data.error) {
            toastr.error(data.error)
          } else {
            toastr.success("{{ $page_name }} "+data.success)
            $(buttonObject).data('is-published',isPublished)
            $(buttonObject).toggleClass('bg-gradient-success bg-gradient-warning')
            $(buttonObject).tooltip('hide').attr('data-original-title', isPublished ? 'Unpublish' : 'Publish').tooltip('show');
            $(buttonObject).find('i').toggleClass('fa-check-circle fa-ban')
          }
        },  
        error: function(XMLHttpRequest, textStatus, errorThrown) {

        }
      })
    })
  });

  $(function () {
    $(".delete-btn").on('click', function(e) {
      var form = $(this).data('form');
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          $(form).submit()
        }
      })
    })
  })
</script>
@endsection