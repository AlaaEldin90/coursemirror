$(document).ready(function ()
{
  /*function validateEmail() {
    if (!$(this).get(0).validity.patternMismatch) {
      if ($(this).val().length && ($(this).val().indexOf('.edu') > 0 && $(this).val().split('@')[1].split('.edu')[0].split('.').length > 1) ||
        ($(this).val().indexOf('.ac.') > 0 && $(this).val().split('@')[1].split('.ac.')[0].split('.').length > 1)) {
        $(this).get(0).setCustomValidity('departmental');
        $(this).closest('.mdl-textfield').find('.mdl-textfield__error').text('Please avoid using departmental email (e.g. @cs.pitt.edu).');
      } else {
        $(this).get(0).setCustomValidity('');
      }
      $(this).closest('.mdl-textfield').get(0).MaterialTextfield.checkValidity();
    } else {
      $(this).closest('.mdl-textfield').find('.mdl-textfield__error').text('Please enter your school .edu or .ac email address!');
    }
  }*/
  function validatePassword()
  {
    if ($('#register-confirm-password').val().length && $('#register-password').val() != $('#register-confirm-password').val())
    {
      $('#register-confirm-password').get(0).setCustomValidity('confirm');
    } else
    {
      $('#register-confirm-password').get(0).setCustomValidity('');
    }
    $('#register-confirm-password').closest('.mdl-textfield').get(0).MaterialTextfield.checkValidity();
  };
  /*$('#register-email').keyup(validateEmail).change(validateEmail);
  $('#register-email').change(function() {
    if (this.validity.valid) {
      $.post(config.backend_base + '/school', {
        domain: this.value.split('@')[1]
      }, function(data) {
        switch (data.status) {
          case 400:
            $('#register-email').closest('.mdl-textfield').get(0).MaterialTextfield.checkValidity();
            break;
          case 200:
            $('#register-school').val(data.school);
            $('#register-school').get(0).disabled = true;
            $('#register-school').get(0).required = false;
            $('#register-school').closest('.mdl-textfield').get(0).MaterialTextfield.boundUpdateClassesHandler();
            $('#register-school').closest('.mdl-textfield').get(0).MaterialTextfield.checkValidity();
            break;
          case 404:
          case 500:
          default:
            $('#register-school').val('');
            $('#register-school').get(0).required = true;
            $('#register-school').get(0).disabled = false;
            $('#register-school').closest('.mdl-textfield').get(0).MaterialTextfield.boundUpdateClassesHandler();
            $('#register-school').closest('.mdl-textfield').get(0).MaterialTextfield.checkValidity();
            break;
        }
      }, 'json');
    } else {
      $('#register-school').val('');
      $('#register-school').get(0).disabled = true;
      $('#register-school').get(0).required = false;
      $('#register-school').closest('.mdl-textfield').get(0).MaterialTextfield.boundUpdateClassesHandler();
      $('#register-school').closest('.mdl-textfield').get(0).MaterialTextfield.checkValidity();
    }
  });*/
  $('#register-password, #register-confirm-password').keyup(validatePassword).change(validatePassword);
  $('#go-register-button').click(function ()
  {
    var reMtf = $('#register-email').closest('.mdl-textfield').get(0).MaterialTextfield,
      rpMtf = $('#register-password').closest('.mdl-textfield').get(0).MaterialTextfield;
    if ($('#login-email').val().length)
    {
      $('#register-email').val($('#login-email').val());
      reMtf.boundUpdateClassesHandler();
      reMtf.checkValidity();
    }
    if ($('#login-password').val().length)
    {
      $('#register-password').val($('#login-password').val());
      rpMtf.boundUpdateClassesHandler();
      rpMtf.checkValidity();
    }
    $('#index-layout').addClass('login-out');
    setTimeout(function ()
    {
      $('#index-layout').addClass('register-shown');
      setTimeout(function ()
      {
        $('#index-layout').addClass('register-in');
      }, 100);
    }, 500);
  });

  //Added by Ahmed Magooda /////////////////////////////
  $('#go-back-button').click(function () { location.reload(); });
  ////////////////////////////////////////////////////


  $('#login-card form input.mdl-textfield__input, #register-card form input.mdl-textfield__input').focus(function ()
  {
    $(this).prop('required', true);
  }).blur(function (e)
  {
    $(this).closest('.mdl-textfield').get(0).MaterialTextfield.checkValidity();
    if (!this.validity.valid)
    {
      e.preventDefault();
      $(this).focus();
      var ele = this;
      setTimeout(function ()
      {
        $(ele).closest('.mdl-textfield').addClass('is-focused');
      }, 0)
    }
  }).keypress(function (e)
  {
    if (e.which == 13)
    {
      e.preventDefault();
      $(this).closest('form').submit();
    }
  }).keyup(function (e)
  {
    if ($(this).hasClass('update') && this.validity.customError)
    {
      this.setCustomValidity('');
      $(this).closest('.mdl-textfield').find('.mdl-textfield__error').text($(this).data('error'));
      $(this).closest('.mdl-textfield').get(0).MaterialTextfield.checkValidity();
    }
  });
  $('#login-fab-button, #login-button, #register-fab-button, #register-button').click(function ()
  {
    $(this).closest('.mdl-card').find('form').submit();
  });
  $('#login-card form').submit(function (e)
  {
    // Add spinner///////////////////////////////////
    // var myLoader = Rocket.loader({
    //   // aqua black blue green grey-blue grey-blue-dark orange pink purple red white yellow
    //   colour: 'purple',
    //   delay: 0,
    //   // target: $('main > .mdl-grid'),
    //   target: $('.mdl-card'),
    //   append: false,
    //   size: 'large',
    //   // dots pulse spinner
    //   type: 'spinner'
    // });
    ////////////////////////////////////////////////

    e.preventDefault();
    if ($(this).hasClass('busy')) return false;
    $('#login-card form input.mdl-textfield__input').focus().blur();
    if (!this.checkValidity()) return false;
    var formData = $(this).serializeArray();
    formData.push({
      name: 'save-session',
      value: $('#login-save-session').is(':checked')
    });
    $(this).addClass('busy');
    $.post(config.backend_base + '/login', formData, function (data)
    {
      switch (data.status)
      {
        case 400:
          $('#' + data.object).closest('.mdl-textfield').get(0).MaterialTextfield.checkValidity();
          break;
        case 403:
          $('#' + data.object).addClass('update').get(0).setCustomValidity('update');
          $('#' + data.object).closest('.mdl-textfield').get(0).MaterialTextfield.checkValidity();
          if (data.error)
          {
            $('#' + data.object).data('error', $('#' + data.object).closest('.mdl-textfield').find('.mdl-textfield__error').text());
            $('#' + data.object).closest('.mdl-textfield').find('.mdl-textfield__error').text(data.error);
            swal({
              title: 'Oops...',
              text: data.error,
              type: 'error',
              confirmButtonText: 'OK'
            });
          }
          break;
        case 200:
          localStorage.setItem('user', JSON.stringify(data.user));
          swal({
            title: 'Login Success',
            text: 'Login succeeded. Redirecting you to your dashboard...',
            timer: 2000,
            type: 'success',
            showConfirmButton: false
          }, function ()
          {
            location.href = '/dashboard';
          });
          break;
        case 500:
        default:
          swal({
            title: 'Login Failure',
            text: 'Unexpected error happended! Please try again and contact us if problem persists.',
            type: 'error',
            confirmButtonText: 'OK'
          });
          break;
      }
    }, 'json').error(function ()
    {
      swal({
        title: 'Login Failure',
        text: 'Failed to connect to backend server! Please try again later.',
        type: 'error',
        confirmButtonText: 'OK'
      });
    }).always(function ()
    {
      $('#login-card form').removeClass('busy');
    });

    // Remover spinner///////////////////////////////////
    // myLoader.remove();
    /////////////////////////////////////////////////////
  });
  $('#register-card form').submit(function (e)
  {
    e.preventDefault();
    if ($(this).hasClass('busy')) return false;
    $('#register-card form input.mdl-textfield__input').focus().blur();
    if (!this.checkValidity()) return false;
    $('#register-confirm-password').prop('disabled', true);
    var formData = $(this).serializeArray();
    $('#register-confirm-password').prop('disabled', false);
    $(this).addClass('busy');
    $.post(config.backend_base + '/register', formData, function (data)
    {
      switch (data.status)
      {
        case 400:
          $('#' + data.object).closest('.mdl-textfield').get(0).MaterialTextfield.checkValidity();
          break;
        case 403:
          $('#' + data.object).addClass('update').get(0).setCustomValidity('update');
          $('#' + data.object).closest('.mdl-textfield').get(0).MaterialTextfield.checkValidity();
          if (data.error)
          {
            $('#' + data.object).data('error', $('#' + data.object).closest('.mdl-textfield').find('.mdl-textfield__error').text());
            $('#' + data.object).closest('.mdl-textfield').find('.mdl-textfield__error').text(data.error);
            swal({
              title: 'Oops...',
              text: data.error,
              type: 'error',
              confirmButtonText: 'OK'
            }, function ()
            {
              if (data.refresh) location.reload();
            });
          }
          break;
        case 200:
          localStorage.setItem('user', JSON.stringify(data.user));
          swal({
            title: 'Register Success',
            text: 'Registration succeeded. Redirecting you to your dashboard...',
            timer: 2000,
            type: 'success',
            showConfirmButton: false
          }, function ()
          {
            // location.href= '/dashboard';
            if (data.refresh) location.reload();
          });
          break;
        case 500:
        default:
          swal({
            title: 'Register Failure',
            text: 'Unexpected error happended! Please try again and contact us if problem persists.',
            type: 'error',
            confirmButtonText: 'OK'
          });
          break;
      }
    }, 'json').error(function ()
    {
      swal({
        title: 'Register Failure',
        text: 'Failed to connect to backend server! Please try again later.',
        type: 'error',
        confirmButtonText: 'OK'
      });
    }).always(function ()
    {
      $('#register-card form').removeClass('busy');
    });
  });
  $.get(config.backend_base, function (data)
  {
    if (data.status = 200 && data.user)
    {
      localStorage.setItem('user', JSON.stringify(data.user));
      swal({
        title: 'Hi, ' + data.user.name + '!',
        text: 'Welcome back, we are redirecting you to your dashboard...',
        timer: 2000,
        type: 'info',
        showConfirmButton: false
      }, function ()
      {
        location.href = '/dashboard';
      });
    } else
    {
      localStorage.removeItem('user');
    }
  }, 'json');
});
