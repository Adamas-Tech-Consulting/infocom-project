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
      name: {
        required: true,
      },
      speakers_category_id: {
        required: true,
      },
      designation: {
        required: true,
      },
      image: {
        required: (action=='create') ? true : false,
      },
    },
    messages: {
      name: {
        required: "Please enter speaker name",
      },
      speakers_category_id: {
        required: "Please select speaker category",
      },
      designation: {
        required: "Please enter speaker designation",
      },
      image: {
        required: (action=='create') ? "Please choose speaker image" : "",
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