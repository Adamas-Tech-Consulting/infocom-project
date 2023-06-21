$(function () {
  var url = $(location).attr('href');
  var segments = url.split( '/' );
  var action = segments[4];
  $.validator.setDefaults({
    submitHandler: function () {
      return true
    }
  });
  $('#validation-form').validate({
    rules: {
      event_category_id: {
        required: true,
      },
      title: {
        required: true,
      },
      event_method_id: {
        required: true,
      },
      event_start_date: {
        required: true,
      },
      event_end_date: {
        required: true,
      },
      event_venue: {
        required: true,
      },
      event_theme: {
        required: true,
      },
      event_banner: {
        required: (action=='create') ? true : false,
      },
      event_logo: {
        required: (action=='create') ? true : false,
      },
    },
    messages: {
      event_category_id: {
        required: "Please select a event category",
      },
      title: {
        required: "Please enter event name",
      },
      event_method_id: {
        required: "Please select a registration method",
      },
      event_start_date: {
        required: "Choose start date",
      },
      event_end_date: {
        required: "Choose end date",
      },
      event_venue: {
        required: "Please enter event venue",
      },
      event_theme: {
        required: "Please enter event theme",
      },
      event_banner: {
        required: (action=='create') ? "Please choose event banner" : "",
      },
      event_logo: {
        required: (action=='create') ? "Please choose event logo" : "",
      },
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
    }
  });
});