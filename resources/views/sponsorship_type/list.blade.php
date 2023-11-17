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
        @if(Session::has('error'))
          <div class="alert alert-danger alert-dismissible">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
            <i class="icon fas fa-check"></i>{{ Session::get('error') }}
              @php
                  Session::forget('error');
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
          <h3 class="card-title"><a href="{{route($page_add)}}" class="btn btn-warning btn-sm"><i class="fas fa-plus"></i> {{ __('admin.add') }} {{ $page_name }}</a></h3>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <table id="list_table" class="table table-bordered table-striped w-100">
            <thead>
            <tr>
              <th>#</th>
              <th>{{ __('admin.name') }}</th>
              <th class="text-center">{{ __('admin.action') }}</th>
            </tr>
            </thead>
            <tbody>
            @foreach($rows as $key => $row)
            <tr>
              <td>{{$key+1}}</td>
              <td><span>{{$row->name}}</span></td>
              <td class="text-center">
                <a href="{{route($page_update,$row->id)}}" class="btn btn-xs bg-gradient-primary" data-bs-toggle="tooltip" title="{{ __('admin.edit') }}"><i class="fas fa-edit"></i></a>
                <form class="d-inline-block" id="form_{{$row->id}}" action="{{route($page_delete,$row->id)}}" method="post">
                  @csrf
                  <button type="button" data-form="#form_{{$row->id}}" class="btn btn-xs bg-gradient-danger delete-btn" data-bs-toggle="tooltip" title="{{ __('admin.delete') }}"><i class="fas fa-trash"></i></button>
                </form>
                <button type="button" class="btn btn-xs bg-gradient-secondary wp-sync"  data-bs-toggle="tooltip" title="{{ __('admin.sync') }}" data-id="{{$row->id}}"><i class="fas fa-sync"></i></button>
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
    });
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
  });

  $(function () {
    $('.wp-sync').on('click',function() {
      var buttonObject = $(this);
      var id = $(this).data('id');
      $.ajax({
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type:"POST",
        url: "{{route($page_sync)}}",
        data:{'id':id},
        beforeSend: function() {
          $(buttonObject).find('i').addClass('fa-spin');
        },
        success:function(data){
          if(data.error) {
            toastr.error(data.error)
          } else {
            toastr.success("{{ $page_name }} "+data.success)
          }
        },  
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          toastr.error("{{ __('admin.ajax_error') }}")
        },
        complete: function() {
          $(buttonObject).find('i').removeClass('fa-spin');
          $(buttonObject).tooltip('hide');
        },
      })
    })
  });
  
</script>
@endsection