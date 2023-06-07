$(function () {
  $.validator.setDefaults({
    submitHandler: function () {
      return true
    }
  });
  $('#validation-form').validate({
    rules: {
      conference_category_id: {
        required: true,
      },
      title: {
        required: true,
      },
      conference_method_id: {
        required: true,
      },
      conference_start_date: {
        required: true,
      },
      conference_end_date: {
        required: true,
      },
      conference_venue: {
        required: true,
      },
      conference_theme: {
        required: true,
      },
      conference_banner: {
        required: true,
      },
      conference_logo: {
        required: true,
      },
    },
    messages: {
      conference_category_id: {
        required: "Please select a conference category",
      },
      title: {
        required: "Please enter conference name",
      },
      conference_method_id: {
        required: "Please select a registration method",
      },
      conference_start_date: {
        required: "Choose start date",
      },
      conference_end_date: {
        required: "Choose end date",
      },
      conference_venue: {
        required: "Please enter conference venue",
      },
      conference_theme: {
        required: "Please enter conference theme",
      },
      conference_banner: {
        required: "Please choose conference banner",
      },
      conference_logo: {
        required: "Please choose conference logo",
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