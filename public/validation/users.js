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
        required: (action=='create' || action=='update') ? true : false,
      },
      email: {
        required: (action=='create' || action=='update') ? true : false,
        email: (action=='create' || action=='update') ? true : false,
      },
      password: {
        required: (action=='create' || action=='update-password') ? true : false,
        minlength:8,
      },
      confirmed: {
        required: (action=='create' || action=='update-password') ? true : false,
        minlength: 5,
        equalTo: "#password"
      }
    },
    messages: {
      name: {
        required: "Please enter name",
      },
      email: {
        required: "Please enter email address",
        email: "Please enter a valid email address"
      },
      password: {
        required: "Please enter password",
        minlength: "Password should contain atleast 8 charecters"
      },
      confirmed: {
        required: "Please enter confirm password",
        minlength: "Password should contain atleast 8 charecters",
        equalTo: "Confirm Password does not match",
      }
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