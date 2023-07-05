@extends('layouts.main')
@section('title', $page_name)
@section('body')
<!-- Content Header (Page header) -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h4 class="m-0">{{ $contact_group->name }} : {{ $page_name }}</h4>
      </div><!-- /.col -->
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('admin.home') }}</a></li>
          <li class="breadcrumb-item"><a href="{{route('contacts_group')}}">{{ __('admin.manage') }} {{ __('admin.contacts_group') }}</a></li>
          <li class="breadcrumb-item active">{{ __('admin.contacts') }}</li>
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
        @if ($errors->any())
        <div class="alert alert-danger">
            <strong>Whoops!</strong> There were some problems with your input.<br><br>
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
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
        @include('layouts.contact_group_sidebar')
      </div>
      <!-- /.col -->
      <div class="col-md-9">
        <div class="card card-warning card-outline direct-chat-warning">
          <div class="card-header">
            <h3 class="card-title">
              <a href="{{route($page_add, $group_id)}}" class="btn btn-warning btn-sm"><i class="fas fa-plus"></i> {{ __('admin.add') }} {{ $page_name }}</a>
              <a href="javascript:void(0);" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#importContactsModal"><i class="fas fa-upload"></i> {{ __('admin.import') }} {{ $page_name }}</a>
            </h3>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <table id="list_table" class="table table-bordered table-striped w-100">
              <thead>
              <tr>
                <th>#</th>
                <th>{{ __('admin.name') }}</th>
                <th>{{ __('admin.email') }}</th>
                <th>{{ __('admin.mobile') }}</th>
                <th>{{ __('admin.company') }}</th>
                <th class="text-center">{{ __('admin.action') }}</th>
              </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
      <!-- /.col -->
    </div>
  </div><!-- /.container-fluid -->
</section>
<div class="modal fade" id="importContactsModal">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">
          <span class="speaker-name"></span>
          <p><small>{{ $contact_group->name }}</small></p>
        </h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="col-12">
          <form id="validation-form" action="{{route('contact_upload', $group_id)}}" method="post" enctype="multipart/form-data">
            @csrf
            <div class="timeline timeline-inverse">
              <!-- timeline item -->
              <div>
                <i class="fas bg-primary">1</i>

                <div class="timeline-item">
                  <h3 class="timeline-header"><a href="javascript:void(0);">Download Sample Excel file</a></h3>
                  <div class="timeline-body">
                    Please download below link to download sample excel file, so you are aware of mandatory fields.
                  </div>
                  <div class="timeline-footer">
                    <a href="{{route('contact_sample_download',$group_id)}}" class="btn btn-secondary btn-sm"><i class="fas fa-download"></i> Download</a>
                  </div>
                </div>
              </div>
              <!-- END timeline item -->
              <!-- timeline item -->
              <div>
                <i class="fas bg-primary">2</i>

                <div class="timeline-item">
                  <h3 class="timeline-header"><a href="#">Copy all contacts data into Excel</a></h3>
                  <div class="timeline-body">
                    Please open excel file and remove one sample record and copy all valid contacts data as given format.
                  </div>
                </div>
              </div>
              <!-- END timeline item -->
              <!-- timeline item -->
              <div>
                <i class="fas bg-primary">3</i>

                <div class="timeline-item">
                  <h3 class="timeline-header"><a href="#">File Attachment</a></h3>

                  <div class="timeline-body">
                    Browse the excel file that you have prepared for upload
                  </div>
                  <div class="timeline-footer">
                    <div class="btn btn-sm btn-secondary upload-image-button"><i class="fas fa-link"></i> {{ __('admin.attach_file') }}
                      <input type="file" class="custom-file-input" id="contacts" name="contacts">
                    </div>
                  </div>
                </div>
              </div>
              <!-- END timeline item -->
              <div>
                <i class="far fa-clock bg-gray"></i>
                <div class="timeline-item border-0 bg-transparent">
                  <div class="row">
                    <div class="col-3"><button type="submit" class="btn btn-warning btn-sm float-left"><i class="fas fa-upload"></i> Import Contacts</button></div>
                    <div class="col-9">
                      <div class="progress progress-sm active mt-2">
                        <div class="progress-bar bg-success progress-bar-striped" role="progressbar" style="width: 1%">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
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
  var table;
  $(function () {
    loadContacts()
  });

  $(function () {
    $(document).on('click','.toggle-published',function() {
      var buttonObject = $(this);
      var id = $(this).data('id');
      var isPublished = $(this).data('is-published') ? 0 : 1;
      $.ajax({
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type:"POST",
        url: "{{route($page_publish_unpublish,$group_id)}}",
        data:{'id':id,'published':isPublished},
        success:function(data){
          if(data.error) {
            toastr.error(data.error)
          } else {
            toastr.success("{{ $page_name }} "+data.success)
            $(buttonObject).data('is-published',isPublished)
            $(buttonObject).toggleClass('bg-gradient-success bg-gradient-warning')
            $(buttonObject).tooltip('hide').attr('data-original-title', isPublished ? 'Inactive' : 'Active').tooltip('show');
            $(buttonObject).find('i').toggleClass('fa-check-circle fa-ban')
          }
        },  
        error: function(XMLHttpRequest, textStatus, errorThrown) {

        }
      })
    })
  });

  $(function () {
    $(document).on('click',".delete-btn", function(e) {
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

  $(function () {
    $('#validation-form').on('submit',function(e) {
      event.preventDefault();
      let formData = new FormData(this);
      $.ajax({
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type:"POST",
        url: "{{route('contact_upload',$group_id)}}",
        data: formData,
        contentType: false,
        processData: false,
        destroy: true,
        beforeSend: function(){
          $('.progress-bar').animate({width: "30%"}, 100);
        },
        success:function(data){
          if(data.error) {
            $('.progress-bar').animate({width: "1%"}, 100);
            toastr.error(data.error)
          } else {
            $('.progress-bar').animate({width: "100%"}, 100);
            toastr.success("{{ $page_name }} "+data.success)
            table.destroy();
            loadContacts();
          }
          setTimeout(function(){ 
            $('#validation-form')[0].reset(); 
            $('.progress-bar').animate({width: "1%"}, 100);
          }, 2000);
        },  
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          setTimeout(function(){ 
            $('#validation-form')[0].reset(); 
            $('.progress-bar').animate({width: "1%"}, 100);
          }, 2000);
        }
      })
    })
  });

  function loadContacts()
  {
    table = $('#list_table').DataTable({
      processing: true,
      serverSide: true,
      ajax: "{{ route('contacts', $group_id) }}",
      columns: [
          {data: 'DT_RowIndex', name: 'index', width: '5%', orderable: false, searchable: false},
          {data: 'name', name: 'name', width: '15%'},
          {data: 'email', name: 'email', width: '20%'},
          {data: 'mobile', name: 'mobile', width: '10%'},
          {data: 'company_name', name: 'company_name', width: '20%'},
          {data: 'action', name: 'action', width: '15%', orderable: false, searchable: false, className: "text-center",},
      ],
    });
  }
</script>
@endsection