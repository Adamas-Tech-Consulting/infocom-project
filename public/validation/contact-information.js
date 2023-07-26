$(function () {
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
      mobile: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Please enter name",
      },
      mobile: {
        required: "Please enter 10 digit mobile number",
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