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
      schedule_title: {
        required: true,
      },
      schedule_day: {
        required: true,
      },
      from_time: {
        required: true,
      },
      to_time: {
        required: true,
      },
      hall_number: {
        required: true,
      },
      schedule_details: {
        required: true,
      },
    },
    messages: {
      schedule_title: {
        required: "Please enter agenda title",
      },
      schedule_day: {
        required: "Please select a day",
      },
      from_time: {
        required: "Choose start time",
      },
      to_time: {
        required: "Choose end time",
      },
      hall_number: {
        required: "Please enter hall number",
      },
      schedule_details: {
        required: "Please enter agenda details",
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