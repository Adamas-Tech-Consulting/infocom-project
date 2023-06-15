$(function () {
  $.validator.setDefaults({
    submitHandler: function () {
      return true
    }
  });
  $('#validation-form').validate({
    rules: {
      fname: {
        required: true,
      },
      lname: {
        required: true,
      },
      email: {
        required: true,
        email:true,
      },
    },
    messages: {
      fname: {
        required: "Please enter first name",
      },
      lname: {
        required: "Please enter last name",
      },
      email: {
        required: "Please enter email address",
        email: "Please enter a valid email address"
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