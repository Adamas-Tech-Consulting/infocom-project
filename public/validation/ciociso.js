$(function () {

  $(".userSearch").select2({
    theme: 'bootstrap4',
    tags: false,
    tokenSeparators: [',', ' '],
    minimumInputLength: 2,
    minimumResultsForSearch: 10,
    ajax: {
      url: user_dropdown_url,
      dataType: "json",
      type: "GET",
      data: function (params) {
        var queryParameters = {
          term: params.term
        }
        return queryParameters;
      },
      processResults: function (data) {
        return {
            results: $.map(data, function (item) {
                return {
                    text: item.value,
                    id: item.id
                }
            })
        };
      }
    }
  });

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
      type: {
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
        required: "Please enter name",
      },
      type: {
        required: "Please select type",
      },
      designation: {
        required: "Please enter designation",
      },
      image: {
        required: (action=='create') ? "Please choose profile image" : "",
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