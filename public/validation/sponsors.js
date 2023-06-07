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
      sponsorship_type_id: {
        required: true,
      },
      sponsor_name: {
        required: true,
      },
      sponsor_logo: {
        required:  (action=='create') ? true : false,
      },
    },
    messages: {
      sponsorship_type_id: {
        required: "Please select a sponsorship type",
      },
      sponsor_name: {
        required: "Please enter sponsor name",
      },
      sponsor_logo: {
        required: (action=='create') ? "Please choose sponsor logo" : "",
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