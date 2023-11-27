<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="description" content="" />
  <meta name="keywords" content="">
  <meta name="author" content="Adamastech" />
	<!-- Favicon icon -->
  <link rel="icon" href="{{ asset(site_settings('site_favicon')) }}" type="image/x-icon">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">
  
  <title>@yield('title') | {{ site_settings('site_name') }}</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{ asset('plugins/fontawesome-free/css/all.min.css') }}">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Tempusdominus Bootstrap 4 -->
  <link rel="stylesheet" href="{{ asset('plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css') }}">
  <!-- Select2 -->
  <link rel="stylesheet" href="{{ asset('plugins/select2/css/select2.min.css') }}">
  <link rel="stylesheet" href="{{ asset('plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css') }}">
  <!-- iCheck -->
  <link rel="stylesheet" href="{{ asset('plugins/icheck-bootstrap/icheck-bootstrap.min.css') }}">
  <!-- DataTables -->
  <link rel="stylesheet" href="{{ asset('plugins/datatables-bs4/css/dataTables.bootstrap4.min.css') }}">
  <link rel="stylesheet" href="{{ asset('plugins/datatables-responsive/css/responsive.bootstrap4.min.css') }}">
  <link rel="stylesheet" href="{{ asset('plugins/datatables-buttons/css/buttons.bootstrap4.min.css') }}">
  <!-- SweetAlert2 -->
  <link rel="stylesheet" href="{{ asset('plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css') }}">
  <!-- Toastr -->
  <link rel="stylesheet" href="{{ asset('plugins/toastr/toastr.min.css') }}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{ asset('dist/css/adminlte.min.css') }}">
  <!-- summernote -->
  <link rel="stylesheet" href="{{ asset('plugins/summernote/summernote-bs4.min.css') }}">
  <!-- overlayScrollbars -->
  <link rel="stylesheet" href="{{ asset('plugins/overlayScrollbars/css/OverlayScrollbars.min.css') }}">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="{{ asset('plugins/daterangepicker/daterangepicker.css') }}">
  <!-- Custom CSS -->
  <link rel="stylesheet" href="{{ asset('dist/css/custom.css?v=1.0') }}">
</head>
<body class="sidebar-mini layout-fixed">
<div class="wrapper">

  <!-- Preloader -->
  <div class="preloader flex-column justify-content-center align-items-center">
    <img class="animation__shake" src="{{ asset(site_settings('site_favicon')) }}" alt="AdminLTELogo" height="60" width="60">
  </div>

  <!-- Topbar Container -->
  @include('layouts.topbar')

  <!-- Main Sidebar Container -->
  @include('layouts.sidebar')

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    @yield('body')
  </div>
  <!-- /.content-wrapper -->
  <footer class="main-footer text-right">
    <strong>Powered By <a href="{{env('APP_URL')}}"><img src="{{config('constants.powered_by_img')}}" alt="{{config('constants.powered_by')}}" class="powered-image"></a>.</strong>
  </footer>

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

<!-- jQuery -->
<script src="{{ asset('plugins/jquery/jquery.min.js') }}"></script>
<!-- jQuery UI 1.11.4 -->
<script src="{{ asset('plugins/jquery-ui/jquery-ui.min.js') }}"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
  $.widget.bridge('uibutton', $.ui.button)
</script>
<!-- Bootstrap 4 -->
<script src="{{ asset('plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
<!-- jquery-validation -->
<script src="{{ asset('plugins/jquery-validation/jquery.validate.min.js') }}"></script>
<script src="{{ asset('plugins/jquery-validation/additional-methods.min.js') }}"></script>
<!-- Select2 -->
<script src="{{ asset('plugins/select2/js/select2.full.min.js') }}"></script>
<!-- DataTables  & Plugins -->
<script src="{{ asset('plugins/datatables/jquery.dataTables.min.js') }}"></script>
<script src="{{ asset('plugins/datatables-bs4/js/dataTables.bootstrap4.min.js') }}"></script>
<script src="{{ asset('plugins/datatables-responsive/js/dataTables.responsive.min.js') }}"></script>
<script src="{{ asset('plugins/datatables-responsive/js/responsive.bootstrap4.min.js') }}"></script>
<script src="{{ asset('plugins/datatables-buttons/js/dataTables.buttons.min.js') }}"></script>
<script src="{{ asset('plugins/datatables-buttons/js/buttons.bootstrap4.min.js') }}"></script>
<!-- jQuery Knob Chart -->
<script src="{{ asset('plugins/jquery-knob/jquery.knob.min.js') }}"></script>
<!-- daterangepicker -->
<script src="{{ asset('plugins/moment/moment.min.js') }}"></script>
<script src="{{ asset('plugins/daterangepicker/daterangepicker.js') }}"></script>
<!-- Tempusdominus Bootstrap 4 -->
<script src="{{ asset('plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js') }}"></script>
<!-- Summernote -->
<script src="{{ asset('plugins/summernote/summernote-bs4.min.js') }}"></script>
<!-- overlayScrollbars -->
<script src="{{ asset('plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js') }}"></script>
<!-- SweetAlert2 -->
<script src="{{ asset('plugins/sweetalert2/sweetalert2.min.js') }}"></script>
<!-- Toastr -->
<script src="{{ asset('plugins/toastr/toastr.min.js') }}"></script>
<!-- AdminLTE App -->
<script src="{{ asset('dist/js/adminlte.js') }}"></script>
<!-- Summernote -->
<script src="{{ asset('plugins/summernote/summernote-bs4.min.js') }}"></script>
<!-- ckeditor -->
<script src="{{ asset('plugins/ckeditor/ckeditor.js') }}"></script>
<!--Custom Script -->
<script>
$(function () {

  //Initialize Tooltip
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  //Initialize Select2 Elements
  if( $('.select2').length > 0) {
    $('.select2').select2()
  }

  //Initialize Select2 Elements
  if( $('.select2bs4').length > 0) {
    $('.select2bs4').select2({
      theme: 'bootstrap4'
    })
  }

  //Initialize Date picker
  if( $('.reservationdate').length > 0) {
    $('.reservationdate').datetimepicker({
        format: 'DD-MM-YYYY'
    });
  }

  //Initialize Date Time picker
  if( $('.reservationdatetime').length > 0) {
    $('.reservationdatetime').datetimepicker({
        format: 'DD-MM-YYYY h:mm A',
        icons: { time: 'far fa-clock' }
    });
  }

  //Initialize Date picker
  if( $('.summernote').length > 0) {
    $('.summernote').each(function() {
      initCkeditor($(this).attr('id'),200);
    });
    // $('.summernote').summernote({
    //   height: 200
    // });
  }

  if( $('.summernote-large').length > 0) {
    $('.summernote-large').each(function() {
      initCkeditor($(this).attr('id'),400);
    });
    // $('.summernote-large').summernote({
    //   height: 400
    // });
  }

  $(".custom-file-input").on('change', function() {
    var input = this;
    var filename = $(input).val().replace(/.*(\/|\\)/, '');
    var img = '#'+$(input).attr('id')+'_preview';
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $(img).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
    $(input).parent().parent().find('.tmpFile').remove();
    $(input).parent().parent().append('<span class="tmpFile">'+filename+'</span>')
  })
})

/* Init Ckeditor Editor */
function initCkeditor(editor,height)
  {
    CKEDITOR.replace(editor, {
      height: (typeof(height) != "undefined" && height !== null) ? height : 150,
      toolbarGroups: [
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ] },
        { name: 'forms' },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align'] },
        { name: 'links' },
        { name: 'insert' },
        '/',
        { name: 'styles' },
        { name: 'colors' },
        { name: 'tools' },
        { name: 'others' },
      ],
      // removeButtons: 'PasteFromWord',
      removeDialogTabs: 'image:Link;image:advanced',
      image_previewText:CKEDITOR.tools.repeat(' ',1),
      on :
      {
          instanceReady : function( ev )
          {
              this.focus();
          }
      }
    });
    CKEDITOR.config.coreStyles_subscript = {
        element: 'span',
        attributes: { 'class': 'Subscript' },
        overrides: 'sub'
    }
    if (CKEDITOR.env.ie && CKEDITOR.env.version == 8) {
      document.getElementById('ie8-warning').className = 'tip alert';
    }
  }
</script>
@yield('script')
</body>
</html>