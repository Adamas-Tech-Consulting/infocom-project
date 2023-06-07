$(function () {
  $.validator.setDefaults({
    submitHandler: function () {
      return true
    }
  });
  $('#validation-form').validate({
    rules: {
      event_date: {
        required: true,
      },
      event_day: {
        required: true,
      },
      event_title: {
        required: true,
      },
      rank: {
        required: true,
      },
    },
    messages: {
      event_date: {
        required: "Please choose an event date",
      },
      event_day: {
        required: "Please select an event day",
      },
      event_title: {
        required: "Please enter an event title",
      },
      rank: {
        required: "Please select a rank",
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