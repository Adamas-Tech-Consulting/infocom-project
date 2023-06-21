$(function () {
  $.validator.setDefaults({
    submitHandler: function () {
      return true
    }
  });
  $('#validation-form').validate({
    rules: {
      schedule_day: {
        required: true,
      },
      schedule_title: {
        required: true,
      },
      schedule_type_id: {
        required: true,
      },
      schedule_details: {
        required: true,
      },
      from_time: {
        required: true,
      },
      to_time: {
        required: true,
      },
    },
    messages: {
      schedule_day: {
        required: "Please select an schedule day",
      },
      schedule_title: {
        required: "Please enter an schedule title",
      },
      schedule_type_id: {
        required: "Please select an schedule type",
      },
      schedule_details: {
        required: "Please enter an schedule details",
      },
      from_time: {
        required: "Please choose from time",
      },
      to_time: {
        required: "Please choose to time",
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