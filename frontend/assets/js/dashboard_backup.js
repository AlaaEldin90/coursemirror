var selected_course_data = null;

(function ()
{
  try
  {
    var user = JSON.parse(localStorage.getItem('user'));
  } catch (e)
  {
    location.href = '/';
  }
  String.prototype.capitalize = function ()
  {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
  function setModule(e)
  {
    if (e && e.preventDefault) e.preventDefault();
    var module_name = location.hash.slice(1);
    module_name = typeof module_script[module_name] == 'function' ? module_name : 'home';
    $('nav a').removeClass('active');
    $('nav a[href="dashboard/#' + module_name + '"]').addClass('active');
    $('main > .mdl-grid').empty();
    $('.mdl-layout-title').text(module_name.capitalize())
    module_script[module_name](typeof e == 'function' ? e : undefined);
    if (module_name == 'home')
    {
      history.replaceState('', document.title, window.location.pathname);
    }
  }
  function escapeHTML(text)
  {
    return $('<div/>').text(text).html();
  }
  function handleISE(error)
  {
    swal({
      title: "Oops...",
      text: error,
      type: "error",
      showCancelButton: true,
      cancelButtonText: 'Go back to Home',
      confirmButtonText: 'Try reload'
    }, function (confirmed)
    {
      if (confirmed)
      {
        setModule();
      } else
      {
        location.hash = 'home'; //location.hash;
      }
    });

    // swal(
    //   {title: "Oops...",
    //   text: error,
    //   type: "error",
    //   showCancelButton: False,
    //   buttons: {
    //     referesh: {
    //       text: "Try reload",
    //       value: "referesh",
    //     },
    //     errorgetback: {
    //       text: "Go back to Home",
    //       value: "errorgetback",
    //     },
    //   },
    // })
    // .then((value) => {
    //   switch (value) {

    //     case "referesh":
    //       setModule();
    //       break;

    //     case "errorgetback":
    //       location.hash = 'home';
    //       break;

    //     default:
    //       location.hash = location.hash;
    //   }
    // });
  }

  var module_script = {
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    home: function ()
    {
      swal.close();
      window.__courses = [];
      var homeContent = $('<div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet courses"><div class="mdl-card__title mdl-card--expand mdl-color--blue-grey mdl-color-text--white"><h2 class=mdl-card__title-text>My Courses</h2></div><div class=mdl-card__supporting-text><p>Here lists all the courses you are currently teching.</p><div id=dashbaord-home-courses><div id=p2 class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div></div></div><div class="mdl-card__actions mdl-card--border"><button class="course-btn mdl-button mdl-button--primary mdl-js-button mdl-js-ripple-effect">Add Course</button></div></div><div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet lectures"><div class="mdl-card__title mdl-card--expand mdl-color--black mdl-color-text--white"><h2 class=mdl-card__title-text>Recent Lectures</h2></div><div class=mdl-card__supporting-text><p>Here lists 10 most recent lectures of your courses.</p><div id=dashbaord-home-lectures><div id=p2 class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div></div></div><div class="mdl-card__actions mdl-card--border"><button class="lecture-btn mdl-button mdl-button--primary mdl-js-button mdl-js-ripple-effect">View All</button></div></div>');
      homeContent.find('.course-btn').click(function ()
      {
        location.hash = '#courses';
      });
      homeContent.find('.lecture-btn').click(function ()
      {
        location.hash = '#lectures';
      });
      $('main > .mdl-grid').append(homeContent);
      $.getJSON(config.backend_base + '/home', function (data)
      {
        if (data.status == 200)
        {
          if (data.courses.total == 0)
          {
            $('#dashbaord-home-courses').html('You haven\'t add any courses yet. Click \'Add Course\' to start...');
          } else
          {
            var courseTable = $('<table class="mdl-data-table mdl-js-data-table"></table>');
            courseTable.append($('<thead><tr><th>#</th><th class="mdl-data-table__cell--non-numeric">Course ID</th><th class="mdl-data-table__cell--non-numeric">Title</th><th class="mdl-data-table__cell--non-numeric">Term</th></tr></thead><tbody></tbody>'));
            $.each(data.courses.data, function (index, value)
            {
              courseTable.find('tbody').append($('<tr><td>' + escapeHTML(index + 1) + '</td><td class="mdl-data-table__cell--non-numeric">' + escapeHTML(value.cid) + '</td><td class="mdl-data-table__cell--non-numeric">' + escapeHTML(value.Title) + '</td><td class="mdl-data-table__cell--non-numeric">' + escapeHTML(value.time) + '</td></tr>'));
            });
            $('#dashbaord-home-courses').empty().append(courseTable);
            componentHandler.upgradeElement($('.mdl-card.courses table').get(0));
          }
          if (data.lectures.total == 0)
          {
            $('#dashbaord-home-lectures').html('You haven\'t add any lectures yet. After you add your courses, you can start entering lectures for them.');
          } else
          {
            var lectureTable = $('<table class="mdl-data-table mdl-js-data-table"></table>');
            lectureTable.append($('<thead><tr><th>#</th><th class="mdl-data-table__cell--non-numeric">Course ID</th><th>Lecture No.</th><th class="mdl-data-table__cell--non-numeric">Title</th><th>Date of Lecture</th></tr></thead><tbody></tbody>'));
            $.each(data.lectures.data, function (index, value)
            {
              lectureTable.find('tbody').append($('<tr><td>' + escapeHTML(index + 1) + '</td><td class="mdl-data-table__cell--non-numeric">' + escapeHTML(value.cid) + '</td><td>' + escapeHTML(value.number) + '</td><td class="mdl-data-table__cell--non-numeric">' + escapeHTML(value.Title) + '</td><td>' + escapeHTML(value.date) + '</td></tr>'));
            });
            $('#dashbaord-home-lectures').empty().append(lectureTable);
            componentHandler.upgradeElement($('.mdl-card.lectures table').get(0));
            componentHandler.upgradeElements($('.mdl-grid .mdl-button').toArray());
          }
        } else if (data.status == 403)
        {
          document.location = '/';
        } else if (data.status == 500)
        {
          handleISE(data.error || 'An unknown server error occured!');
        } else
        {
          handleISE('An unknown server error occured!');
        }
      }).error(function (error)
      {
        handleISE('An unknown server error occured! ERR_CODE: ' + error);
      });
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    courses: function ()
    {
      swal.close();
      $('main > .mdl-grid').append('<div class="title mdl-cell--12-col mdl-color-text--grey-800"><h3>Here are all the courses you are currently teaching:</h3><label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="toggle-display-archived"><input type="checkbox" id="toggle-display-archived" class="mdl-switch__input"><span class="mdl-switch__label">Display Archived</span></label></div>');
      $('main > .mdl-grid').append('<div id=p2 class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>');
      componentHandler.upgradeElements($('.mdl-grid .mdl-switch').toArray());
      /////////////// Added by Ahmd Magooda
      console.log("Showing courses spinner");
      // Spinner.show();
      var courseLoader = Rocket.loader({
        // color of the loader
        // aqua black blue green grey-blue grey-blue-dark orange pink purple red white yellow
        colour: 'purple',
        // animation delay
        delay: 0,
        // target container
        // target: $('main > .mdl-grid'),
        target: $('main > .mdl-grid'),
        // appends the loader to the target element as opposed to hiding
        append: false,
        // small, large or medium
        size: 'large',
        // dots pulse spinner
        type: 'spinner'
      });
      ////////////////////////////////////

      $('#toggle-display-archived').change(function ()
      {
        var courseLoader_2 = Rocket.loader({
          // color of the loader
          // aqua black blue green grey-blue grey-blue-dark orange pink purple red white yellow
          colour: 'purple',
          // animation delay
          delay: 0,
          // target container
          // target: $('main > .mdl-grid'),
          target: $('main > .mdl-grid'),
          // appends the loader to the target element as opposed to hiding
          append: false,
          // small, large or medium
          size: 'large',
          // dots pulse spinner
          type: 'spinner'
        });

        $('main > .mdl-grid .mdl-card').not('.mdl-card:last-child').remove();
        if (!$('#toggle-display-archived').prop('checked'))
        {
          $.each(window.__courses, function (index, value)
          {
            if (value.archived !== true)
            {
              createCourseCard(value, index);
            }
          });
        } else
        {
          $.each(window.__courses, function (index, value)
          {
            createCourseCard(value, index);
          });
        }

        courseLoader_2.remove();
      })
      function createCourseCard(course, index)
      {
        $('main > .mdl-grid > .mdl-progress').remove();
        var reflectionCount = 0, activeTokenCount = 0,
          courseCard = $('<div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet"><div class="mdl-card__title mdl-card--expand mdl-color--blue-grey mdl-color-text--white"><h2 class="mdl-card__title-text"></h2></div><div class="mdl-card__supporting-text"><div id="dashboard-course-listing"><ul class="course-info-list mdl-list"></ul></div></div><div class="mdl-card__actions mdl-card--border"><button class="view-lec-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">View Lectures</button><div class="mdl-layout-spacer"></div><button class="course-archive-btn mdl-button mdl-button--colored mdl-color-text--red-700 mdl-js-button mdl-js-ripple-effect"></button></div></div>');
        courseCard.find('.view-lec-button').click(function (e) 
        {
          location.hash = '#lectures';
        });
        courseCard.find('.course-archive-btn').text(course.archived === true ? 'Revert' : 'Archive');
        courseCard.find('.course-archive-btn').click(function (e)
        {
          var item = $(e.target),
            status = window.__courses[item.closest('.mdl-card').data('index')].archived !== true;
          courseCard.find('.course-archive-btn').prop('disable', true);
          $.ajax({
            url: config.backend_base + '/course/' + window.__courses[item.closest('.mdl-card').data('index')].id,
            data: { archived: status },
            dataType: 'json',
            method: 'PUT',
            success: function (data)
            {
              courseCard.find('.course-archive-btn').prop('disable', false);
              switch (data.status)
              {
                case 403:
                  document.location = '/';
                  break;
                case 200:
                  window.__courses[item.closest('.mdl-card').data('index')].archived = status;
                  courseCard.find('.course-archive-btn').text(status === true ? 'Revert' : 'Archive');
                  $('#toggle-display-archived').change();
                  break;
                case 500:
                default:
                  swal({
                    title: 'Failed to save changes',
                    text: 'Unexpected error happended! Please try again and contact us if problem persists.',
                    type: 'error',
                    confirmButtonText: 'OK'
                  });
                  break;
              }
            },
            error: function (error)
            {
              courseCard.find('.course-archive-btn').prop('disable', false);
              swal({
                title: 'Failed to save changes',
                text: 'Unexpected error happended! Please try again and contact us if problem persists.',
                type: 'error',
                confirmButtonText: 'OK'
              });
            }
          });
        });
        $.each(course.tokens, function (index, value)
        {
          reflectionCount += value.reflections;
          activeTokenCount += value.used || value.reflections > 0;
        });

        // var course_reflections = get_course_reflections(course.cid, course.passcode);

        courseCard.data('index', index);
        courseCard.find('.mdl-card__title-text').text(course.title + ' (' + course.cid + ')');
        courseCard.find('#dashboard-course-listing .mdl-list')
          .append('<li data-key="title" class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons  mdl-list__item-icon">personal_video</i><span class="item-name">Title</span><span class="item-value">' + escapeHTML(course.title) + '</span></span><span class="mdl-list__item-secondary-action"><button class="mdl-button mdl-js-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"><i class="material-icons">mode_edit</i></button><button class="mdl-button confirm-btn mdl-js-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"><i class="material-icons">done</i></button></span></li>')

          .append('<li data-key="term" class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons  mdl-list__item-icon">insert_invitation</i><span class="item-name">Term</span><span class="item-value">' + escapeHTML(course.term) + '</span></span><span class="mdl-list__item-secondary-action"><button class="mdl-button mdl-js-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"><i class="material-icons">mode_edit</i></button><button class="mdl-button confirm-btn mdl-js-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"><i class="material-icons">done</i></button></span></li>')

          .append('<li data-key="passcode" class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons  mdl-list__item-icon">verified_user</i><span class="item-name">Passcode</span><span class="item-value">' + escapeHTML(course.passcode) + '</span></li>')

          .append('<li data-key="timezone" class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons  mdl-list__item-icon">language</i><span class="item-name">Timezone (UTC + )</span><span class="item-value">' + escapeHTML(course.timezone) + '</span></span><span class="mdl-list__item-secondary-action"><button class="mdl-button mdl-js-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"><i class="material-icons">mode_edit</i></button><button class="mdl-button confirm-btn mdl-js-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"><i class="material-icons">done</i></button></span></li>')

          .append('<li data-key="url" class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons  mdl-list__item-icon">open_in_new</i><span class="item-name">Website</span><span class="item-value">' + escapeHTML(course.url) + '</span></span><span class="mdl-list__item-secondary-action"><button class="mdl-button mdl-js-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"><i class="material-icons">mode_edit</i></button><button class="mdl-button confirm-btn mdl-js-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"><i class="material-icons">done</i></button></span></li>')

          //.append('<li data-key="tokens" class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons  mdl-list__item-icon">local_offer</i><span class="item-name">Student IDs</span><span class="item-value">' + escapeHTML(activeTokenCount + ' active / ' + course.tokens.length + ' issued') + '</span></span><span class="mdl-list__item-secondary-action"><button class="mdl-button mdl-js-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"><i class="material-icons">search</i></button></span></li>')

          .append('<li data-key="tokens" class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons  mdl-list__item-icon">local_offer</i><span class="item-name">Submitted Reflections</span><span class="item-value">' + escapeHTML('') + '</span></span><span class="mdl-list__item-secondary-action"><button class="mdl-button mdl-js-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"><i class="material-icons">search</i></button></span></li>')

        // .append('<li data-key="reflections" class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons  mdl-list__item-icon">rate_review</i><span class="item-name">Stats</span><span class="item-value">' + escapeHTML(reflectionCount + (reflectionCount > 1 ? ' reflections' : ' reflection')) + '</span></span><span class="mdl-list__item-secondary-action"><button class="mdl-button mdl-js-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"><i class="material-icons">chevron_right</i></button></span></li>');

        var itemActionBtnListener = function (e)
        {
          var item = $(e.target).closest('li');
          if (item.hasClass('editing')) 
          {
            if (item.data('init') == item.find('input').val()) 
            {
              item.find('.item-value').text(item.data('init'));
              item.removeClass('editing');
            }
            else 
            {
              // var selectedTerm = document.querySelector('input[name=term]').value;
              // var TimeZoneText = document.querySelector('input[name=timezone]').value;
              var editedKey = item[0].dataset.key;
              var edited_val = item.find('input').val();
              if (editedKey == "timezone" && !validateTimeZone(edited_val))
              {
                console.log("TimeZone INVALID");
                swal({ title: "Invalid Time zone", text: "Make sure you write correct value for timezone offset, value has to be between [-11, 12] (i.e. 7 or -10)", type: "error", confirmButtonText: "OK" });
                return false;
              }
              else if (editedKey == "term" && !validateTerm(edited_val).first)
              {
                var reason = validateTerm(edited_val).second;
                if (reason == "syntax_error")
                {
                  console.log("TERM INVALID");
                  swal({ title: "Invalid term", text: "Syntax Error, make sure the semester and year are in correct format (e.g. Summer 2020)", type: "error", confirmButtonText: "OK" });
                }
                else if (reason == "previous_year")
                {
                  console.log("TERM INVALID");
                  swal({ title: "Invalid term", text: "Cannot select a previous Year", type: "error", confirmButtonText: "OK" });
                }
                else if (reason == "previous_semester")
                {
                  console.log("TERM INVALID");
                  swal({ title: "Invalid term", text: "Cannot select a previous semester", type: "error", confirmButtonText: "OK" });
                }
                else
                {
                  console.log("TERM INVALID");
                  swal({ title: "Invalid term", text: "Error Make sure the input is in the correct format (e.g. Summer 2020)", type: "error", confirmButtonText: "OK" });
                }
                return false;
              }
              // timeZoneVal = ParseTimeZone(TimeZoneText)
              // if (!validateTerm(selectedTerm) || !validateTimeZone(TimeZoneText)) 
              // {
              //   if (!validateTerm(selectedTerm))
              //   {
              //     console.log("TERM INVALID")
              //     swal({ title: "Invalid term", text: "Cannot select a previous term", type: "error", confirmButtonText: "OK" })
              //   }
              //   else if (!validateTimeZone(TimeZoneText))
              //   {
              //     console.log("TimeZone INVALID")
              //     swal({ title: "Invalid Time zone", text: "Make sure you write correct value for timezone offset, value has to be between [-11, 12] (i.e. 7 or -10)", type: "error", confirmButtonText: "OK" })
              //   }
              //   return false;
              // }
              else
              {
                item.find('.mdl-textfield').prop('disabled', true);
                item.find('.mdl-button').prop('disabled', true);
                var postData = {};
                postData[item.data('key')] = item.find('input').val();
                $.ajax({
                  url: config.backend_base + '/course/' + window.__courses[item.closest('.mdl-card').data('index')].id,
                  data: postData,
                  dataType: 'json',
                  method: 'PUT',
                  success: function (data)
                  {
                    item.find('.mdl-textfield').prop('disabled', false);
                    item.find('.mdl-button').prop('disabled', false);
                    switch (data.status)
                    {
                      case 403:
                        document.location = '/';
                        break;
                      case 200:
                        var key = item.data('key'), value = item.find('input').val();
                        item.find('.item-value').text(item.find('input').val());
                        if (key == 'title')
                        {
                          item.closest('.mdl-card').find('.mdl-card__title-text').text(value + ' (' + window.__courses[item.closest('.mdl-card').data('index')].cid + ')');
                        }
                        window.__courses[item.closest('.mdl-card').data('index')][key] = value;
                        item.removeClass('editing');
                        break;
                      case 500:
                      default:
                        swal({
                          title: 'Failed to save changes',
                          text: 'Unexpected error happended! Please try again and contact us if problem persists.',
                          type: 'error',
                          confirmButtonText: 'OK'
                        });
                        break;
                    }
                  },
                  error: function (error)
                  {
                    item.find('.mdl-textfield').prop('disabled', false);
                    item.find('.mdl-button').prop('disabled', false);
                    swal({
                      title: 'Failed to save changes',
                      text: 'Unexpected error happended! Please try again and contact us if problem persists.',
                      type: 'error',
                      confirmButtonText: 'OK'
                    });
                  }
                });
              }
            }
            return false;
          }
          switch (item.data('key'))
          {
            case 'tokens':
              var courseData = window.__courses[item.closest('.mdl-card').data('index')],
                // contentHTML = $('<div><table class="token-list mdl-shadow--2dp"><thead><tr><th class="id">StudentIds</th><th class="active">Activated</th><th class="count">Reflections</th></tr></thead><tbody></tbody></table><div class="add-token-field"><span>Add </span><div class="mdl-textfield mdl-js-textfield"><input id="add_token_num" name="num" max="100" class="mdl-textfield__input" type="number"><label class="mdl-textfield__label" for="add_token_num">#</label><span class="mdl-textfield__error">Invalid value</span></div><span> new tokens to this course.</span><div class="mdl-layout-spacer"></div><button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent">Add</button></div></div>');
                contentHTML = $('<div><table class="token-list mdl-shadow--2dp"><thead><tr><th class="id">StudentIds</th><th class="count">Reflections</th></tr></thead><tbody></tbody></table></div>');
              $.getJSON(config.backend_base + '/reflections/' + courseData.cid + '/' + courseData.passcode,
                function (data)
                {
                  if (data.status == 200)
                  {
                    reflections = data.reflections, summarizationEvents = [];
                    var reflection_dictionary = {};
                    for (var i = 0; i < reflections.length; i++)
                    {
                      console.log(reflections[i]);
                      // All_reflections.push(reflections[i]);
                      var uid = reflections[i].id.user;
                      if (uid in reflection_dictionary)
                      {
                        old_val = reflection_dictionary[uid];
                        new_val = old_val + 1;
                        reflection_dictionary[uid] = new_val;
                      }
                      else
                      {
                        reflection_dictionary[uid] = 1;
                      }
                      // contentHTML.find('.token-list tbody').append('<tr><td class="id">' + reflections[i].id.user + '</td><td class="active">' + 'Yes' + '</td><td class="count">' + reflections[i].id.passcode + '</td></tr>');
                    }
                    for (uid in reflection_dictionary)
                    {
                      contentHTML.find('.token-list tbody').append('<tr><td class="id">' + uid + '</td><td class="count">' + reflection_dictionary[uid] + '</td></tr>');
                    }
                    swal({
                      title: 'Submitted Reflections',
                      text: contentHTML.html(),
                      html: true,
                      closeOnCancel: true
                    }, function (exit)
                    {
                    });
                    // return reflections;
                  }
                  else if (data.status == 403)
                  {
                    document.location = '/';
                    // All_reflections = [];
                  }
                  else if (data.status == 500)
                  {
                    handleISE(data.error || 'An unknown server error occured!');
                    // return [];
                  }
                  else
                  {
                    handleISE('An unknown server error occured!');
                    // return [];
                  }
                }).error(function (error)
                {
                  handleISE('An unknown server error occured! ERR_CODE: ' + error);
                  // return [];
                });

              // $.each(courseData.tokens, function (index, value)
              // {
              //   contentHTML.find('.token-list tbody').append('<tr><td class="id">' + value.studentid + '</td><td class="active">' + (value.used ? 'Yes' : 'No') + '</td><td class="count">' + value.reflections + '</td></tr>');
              // });
              // swal({
              //   title: 'Course Tokens',
              //   text: contentHTML.html(),
              //   html: true,
              //   closeOnCancel: true
              // }, function (exit)
              // {
              // if (!exit) {
              //   var count = parseInt($('#add_token_num').val());
              //   if (isNaN(count)) {
              //     $('#add_token_num').focus();
              //     return;
              //   }
              //   $('.sweet-alert .mdl-button').prop('disabled', true);
              // $.ajax({
              //   url: config.backend_base + '/course/' + window.__courses[item.closest('.mdl-card').data('index')].id,
              //   data: { tokens: count },
              //   dataType: 'json',
              //   method: 'PUT',
              //   success: function (data) {
              //     $('.sweet-alert .mdl-button').prop('disabled', false);
              //     switch (data.status) {
              //       case 403:
              //         document.location = '/';
              //         break;
              //       case 200:
              //         $.each(data.tokens, function (i, token) {
              //           $('.sweet-alert .token-list tbody').append('<tr><td class="id">' + token + '</td><td class="active">No</td><td class="count">0</td></tr>');
              //           courseData.tokens.push({
              //             id: token,
              //             used: false,
              //             reflections: 0
              //           });
              //         });
              //         window.__courses[item.closest('.mdl-card').data('index')] = courseData;
              //         var newText = item.closest('.mdl-card').find('li[data-key="tokens"] .item-value').text().replace(/\/ \d+ issued/, '/ ' + data.count + ' issued');
              //         item.closest('.mdl-card').find('li[data-key="tokens"] .item-value').text(newText);
              //         $('.token-list').sortify({ defaultSort: '1' });
              //         break;
              //       case 500:
              //       default:
              //         swal({
              //           title: 'Failed to add tokens',
              //           text: 'Unexpected error happended! Please try again and contact us if problem persists.',
              //           type: 'error',
              //           confirmButtonText: 'OK'
              //         });
              //         break;
              //     }
              //   },
              //   error: function (error) {
              //     $('.sweet-alert .mdl-button').prop('disabled', false);
              //     swal({
              //       title: 'Failed to add tokens',
              //       text: 'Unexpected error happended! Please try again and contact us if problem persists.',
              //       type: 'error',
              //       confirmButtonText: 'OK'
              //     });
              //   }
              // });
              // }
              // });
              // setTimeout(function () {
              //   componentHandler.upgradeElements($('.add-token-field .mdl-textfield, .add-token-field .mdl-button').toArray());
              //   $('.token-list').sortify({ defaultSort: '1' });
              // }, 100);
              break;
            case 'reflections':
              swal({
                title: 'Feature not enabled',
                text: 'This feature has not been enabled in this version.',
                type: 'info',
                confirmButtonText: 'OK'
              });
              break;
            default:
              item.data('init', item.find('.item-value').text());
              var editID = item.data('key') + '-edit';
              item.find('.item-value').html('<div class="mdl-textfield mdl-js-textfield"><input class="mdl-textfield__input" type="text" id="' + editID + '"><label class="mdl-textfield__label" for="' + editID + '">' + escapeHTML(item.data('init')) + '</label></div>');
              item.find('#' + editID).val(item.find('.item-value').text());
              item.find('#' + editID).focus();
              item.addClass('editing');
              componentHandler.upgradeElement(item.find('.mdl-textfield').get(0));
              break;
          }
        };
        courseCard.find('.mdl-list__item-secondary-action .mdl-button').click(itemActionBtnListener);
        courseCard.insertBefore($('main > .mdl-grid .mdl-card:last-child'));
        componentHandler.upgradeElements(courseCard.find('.mdl-button, .mdl-textfield').toArray());
      }

      $.getJSON(config.backend_base + '/course', function (data)
      {
        console.log("Adding Course Line 531");
        console.log(data);
        if (data.status == 200)
        {
          // var addCourseCard = $('<div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet"><div class="mdl-card__title mdl-card--expand mdl-color--black mdl-color-text--white"><h2 class="mdl-card__title-text">Add a new course</h2></div><div class="mdl-card__supporting-text"><form id="add-course-form"><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input name="cid" class="mdl-textfield__input" id="add-course-cid"><label class="mdl-textfield__label" for="add-course-cid">Number (e.g. CS0447 or 15-213)</label></div><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input name="title" class="mdl-textfield__input" id="add-course-title"><label class="mdl-textfield__label" for="add-course-title">Title (e.g. Introduction to Computer Systems)</label></div><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input name="term" class="mdl-textfield__input" id="add-course-term"><label class="mdl-textfield__label" for="add-course-term">Term (e.g. Spring 2016)</label></div><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input name="url" type="url" class="mdl-textfield__input" id="add-course-url" pattern="[-a-zA-Z0-9@:%_\\+.~#?&//=]{2,256}\\.[a-z]{2,4}\\b(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?"><label class="mdl-textfield__label" for="add-course-url">Website (e.g. http://people.cs.pitt.edu/~zacyu/cs0447/)</label><span class="mdl-textfield__error">Please enter a valid URL!</span></div><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input name="size" class="mdl-textfield__input" type="number" id="add-course-size"><label class="mdl-textfield__label" for="add-course-size">Course Size (# of tokens to generate)</label><span class="mdl-textfield__error">Please enter a positive integer!</span></div></form></div><div class="mdl-card__actions mdl-card--border"><div class="mdl-layout-spacer"></div><button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Confirm</button></div></div>');

          var addCourseCard = $('<div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet"><div class="mdl-card__title mdl-card--expand mdl-color--black mdl-color-text--white"><h2 class="mdl-card__title-text">Add a new course</h2></div>'
            +
            '<div class="mdl-card__supporting-text"><form id="add-course-form">'
            +
            '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input name="cid" class="mdl-textfield__input" id="add-course-cid"><label class="mdl-textfield__label" for="add-course-cid">Number (e.g. CS0447 or 15-213)</label></div>'
            +
            '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input name="title" class="mdl-textfield__input" id="add-course-title"><label class="mdl-textfield__label" for="add-course-title">Title (e.g. Introduction to Computer Systems)</label></div>'
            +
            '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input name="term" class="mdl-textfield__input" id="add-course-term"><label class="mdl-textfield__label" for="add-course-term">Term (e.g. Spring 2016)</label></div>'
            //  +
            //  '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input name="timezone" class="mdl-textfield__input" id="add-course-timezone" pattern="(UTC|utc)[ ]*[+-][ ]*[0-9]{1,2}"><label class="mdl-textfield__label" for="add-course-timezone">timezone: (i.e. UTC-11, or UTC+12)</label></div>' 
            +
            '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input name="timezone" class="mdl-textfield__input" id="add-course-timezone" pattern="[+-]?[ ]*[0-9]{1,2}"><label class="mdl-textfield__label" for="add-course-timezone">UTC timezone difference: (e.g. -11, 1, or +12, etc..)</label></div>'
            +
            '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input name="url" type="url" class="mdl-textfield__input" id="add-course-url" pattern="[-a-zA-Z0-9@:%_\\+.~#?&//=]{2,256}\\.[a-z]{2,4}\\b(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?"><label class="mdl-textfield__label" for="add-course-url">Website (e.g. http://people.cs.pitt.edu/~zacyu/cs0447/)</label><span class="mdl-textfield__error">Please enter a valid URL!</span></div>'
            +
            '</form></div>'
            +
            '<div class="mdl-card__actions mdl-card--border"><div class="mdl-layout-spacer"></div><button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Confirm</button></div></div>');

          addCourseCard.find('button').click(function ()
          {
            // var selectedTerm = addCourseCard.getElementById('term')
            // var selectedTerm = document.getElementByName('term')
            // console.log(selectedTerm)
            var selectedTerm = document.querySelector('input[name=term]').value;
            var TimeZoneText = document.querySelector('input[name=timezone]').value;
            var timeZoneVal = ParseTimeZone(TimeZoneText);
            document.querySelector('input[name=timezone]').value = timeZoneVal;
            console.log(selectedTerm);
            // check if the selected term is not already past
            var term_validation = validateTerm(selectedTerm);
            if (!term_validation.first || !validateTimeZone(TimeZoneText)) 
            {
              if (!term_validation.first)
              {
                var reason = term_validation.second;
                if (reason == "syntax_error")
                {
                  console.log("TERM INVALID");
                  swal({ title: "Invalid term", text: "Syntax Error, make sure the semester and year are in correct format (e.g. Summer 2020)", type: "error", confirmButtonText: "OK" });
                }
                else if (reason == "previous_year")
                {
                  console.log("TERM INVALID");
                  swal({ title: "Invalid term", text: "Cannot select a previous Year", type: "error", confirmButtonText: "OK" });
                }
                else if (reason == "previous_semester")
                {
                  console.log("TERM INVALID");
                  swal({ title: "Invalid term", text: "Cannot select a previous semester", type: "error", confirmButtonText: "OK" });
                }
                else
                {
                  console.log("TERM INVALID");
                  swal({ title: "Invalid term", text: "Error Make sure the input is in the correct format (e.g. Summer 2020)", type: "error", confirmButtonText: "OK" });
                }
              }
              else if (!validateTimeZone(TimeZoneText))
              {
                console.log("TimeZone INVALID")
                swal({ title: "Invalid Time zone", text: "Make sure you write correct value for timezone offset, value has to be between [-11, 12] (i.e. 7 or -10)", type: "error", confirmButtonText: "OK" })
              }
              return false;
            }
            else
            {
              console.log("Term OK");
              $('#add-course-form input').each(function (i, ele)
              {
                ele.required = true;
                if (ele.name == "url")
                {
                  //ele.required = false;
                  console.log("url not requiered");
                }
                else
                {
                  if (!ele.validity.valid)
                  {
                    swal({
                      title: 'Input Invalid',
                      text: 'Please fill in all input fields to add a new course.',
                      type: 'error',
                      confirmButtonText: 'OK'
                    }, function ()
                    {
                      ele.focus();
                    });
                    return false;
                  }
                }
                ele.required = false;
              });
            }

            var postData = $('#add-course-form').serialize();
            addCourseCard.find('.mdl-textfield, .mdl-button').prop('disabled', true);
            $.ajax({
              url: config.backend_base + '/course',
              data: postData,
              dataType: 'json',
              method: 'POST',
              success: function (data)
              {
                addCourseCard.find('.mdl-textfield, .mdl-button').prop('disabled', false);
                switch (data.status)
                {
                  case 403:
                    document.location = '/';
                    break;
                  case 200:
                    createCourseCard(data.course, window.__courses.length);
                    window.__courses.push(data.course);
                    $('#add-course-form').get(0).reset();
                    addCourseCard.find('.mdl-textfield').each(function (i, ele)
                    {
                      ele.MaterialTextfield.boundUpdateClassesHandler();
                    });
                    break;
                  case 404:
                    swal({
                      title: 'Failed to add course',
                      text: 'Course number already in use, please consider adding a suffix.',
                      type: 'error',
                      confirmButtonText: 'OK'
                    }, function ()
                    {
                      addCourseCard.find('input[name="cid"]').focus();
                    });
                    break;
                  case 500:
                  default:
                    swal({
                      title: 'Failed to add course',
                      text: 'Unexpected error happended! Please try again and contact us if problem persists.',
                      type: 'error',
                      confirmButtonText: 'OK'
                    });
                    break;
                }
              },
              error: function (error)
              {
                addCourseCard.find('.mdl-textfield, .mdl-button').prop('disabled', false);
                swal({
                  title: 'Failed to add course',
                  text: 'Unexpected error happended! Please try again and contact us if problem persists.',
                  type: 'error',
                  confirmButtonText: 'OK'
                });
              }
            });
          });

          $('main > .mdl-grid').append(addCourseCard);
          componentHandler.upgradeElements(addCourseCard.find('.mdl-button, .mdl-textfield').toArray());
          window.__courses = data.courses.sort(function (a, b)
          {
            return b.create - a.create;
          });
          $.each(window.__courses, function (index, value)
          {
            if (value.archived !== true)
            {
              createCourseCard(value, index);
            }
          });
        } else if (data.status == 403)
        {
          document.location = '/';
        } else if (data.status == 500)
        {
          handleISE(data.error || 'An unknown server error occured!');
        } else
        {
          handleISE('An unknown server error occured!');
        }
      }).error(function (error)
      {
        handleISE('An unknown server error occured! ERR_CODE: ' + error);
      });
      /////// added by Ahmed Magooda ///////////////////
      console.log("hiding course spinner")
      courseLoader.remove();
      ////////////////////////////////////////////////
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    lectures: function ()
    {
      swal.close();
      $('main > .mdl-grid').append('<div class="title mdl-cell--12-col mdl-color-text--grey-800"><h3>Edit Lectures for Course:</h3><div class="lecture-course-dropdown"><span id="lecture-course-name">Please Wait...</span><button id="lecture-course-btn" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"><i class="material-icons" role="presentation">arrow_drop_down</i><span class="visuallyhidden">Courses</span></button><ul class="mdl-menu--bottom-right" for="lecture-course-btn"></ul></div></div>' +
        '<div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col"><div class="mdl-card__supporting-text lecture-info"><h4>Total Lectures: <i>#</i></h4><div class="mdl-layout-spacer"></div>'
        +
        //'<button id="batch-upload" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--black">Batch Import</button>'
        //+
        '<button id="edit-default-questions" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--black">Default Questions</button><input id="csv-upload" type="file" accept="text/csv"></div>' +
        '<div class="mdl-card__supporting-text">'
        +
        '<div id="lecture-list-title">'
        +
        '<span class="num">#</span><span class="date">Date</span><span class="lecture">Title</span></span></div><div id="lecture-list" class="mdl-cell mdl-cell--4-col">'
        +
        // '<button id="add-lecture-btn" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-color--blue-500"><i class="material-icons">add</i></button>'
        // +
        '</div>'
        +
        '<div id="lecture-add-part">'
        +
        '<button id="add-lecture-btn" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-color--blue-500"><i class="material-icons">add</i></button>'
        +
        '</div>'
        +
        '<div id="lecture-edit" class="mdl-cell mdl-cell--8-col">'
        +
        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" id="lecture-title"><label class="mdl-textfield__label" for="lecture-title">Lecture Title</label></div>'
        +
        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" id="lecture-date"><label class="mdl-textfield__label" for="lecture-date">Lecture Date</label></div>'
        +
        '<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="lecture-special-question"><input type="checkbox" id="lecture-special-question" class="mdl-switch__input"><span class="mdl-switch__label"></span> Specify questions for this lecture</label>'
        +
        '<div id="lecture-questions">'
        +
        '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="lecture-question-1"><input type="checkbox" id="lecture-question-1" class="mdl-checkbox__input" data-id="1"><span class="mdl-checkbox__label">Rate Confusion</span></label>'
        +
        '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="lecture-question-2"><input type="checkbox" id="lecture-question-2" class="mdl-checkbox__input" data-id="2"><span class="mdl-checkbox__label">Rate Interests</span></label>'
        +
        '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="lecture-question-3"><input type="checkbox" id="lecture-question-3" class="mdl-checkbox__input" data-id="3"><span class="mdl-checkbox__label">Provide Feedback</span></label>'
        +
        '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="lecture-question-4"><input type="checkbox" id="lecture-question-4" class="mdl-checkbox__input" data-id="4"><span class="mdl-checkbox__label">Things You Learned</span></label>'
        +
        '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="lecture-question-5"><input type="checkbox" id="lecture-question-5" class="mdl-checkbox__input" data-id="5"><span class="mdl-checkbox__label">Describe Confusion</span></label>'
        +
        '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="lecture-question-6"><input type="checkbox" id="lecture-question-6" class="mdl-checkbox__input" data-id="6"><span class="mdl-checkbox__label">Describe Interests</span></label></div>'
        +
        '<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="lecture-repeat-question"><input type="checkbox" id="lecture-repeat-question" class="mdl-switch__input"><span class="mdl-switch__label"></span> Repeat lecture weekly</label>'
        +
        '<div id="lecture-repeats">'
        +
        ///Monday
        '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="lecture-repeat-1"><input type="checkbox" id="lecture-repeat-1" class="mdl-checkbox__input" data-id="1"><span class="mdl-checkbox__label">M</span></label>'
        +
        '<input class="mdl-timetext" type="text" id="mon-lecture-time"></br>'
        +
        // '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-timetext" type="text" id="mon-lecture-time"></div></br>' +
        ///Tuesday
        '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="lecture-repeat-2"><input type="checkbox" id="lecture-repeat-2" class="mdl-checkbox__input" data-id="2"><span class="mdl-checkbox__label">Tu</span></label>'
        +
        '<input class="mdl-timetext" type="text" id="tu-lecture-time"></br>'
        +
        // '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" id="tu-lecture-time"></div></br>' +
        ///Wednesday
        '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="lecture-repeat-3"><input type="checkbox" id="lecture-repeat-3" class="mdl-checkbox__input" data-id="3"><span class="mdl-checkbox__label">W</span></label>'
        +
        '<input class="mdl-timetext" type="text" id="wed-lecture-time"></br>'
        +
        // '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" id="wed-lecture-time"></div></br>' +
        ///Thursday
        '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="lecture-repeat-4"><input type="checkbox" id="lecture-repeat-4" class="mdl-checkbox__input" data-id="4"><span class="mdl-checkbox__label">Th</span></label>'
        +
        '<input class="mdl-timetext" type="text" id="th-lecture-time"></br>'
        +
        // '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" id="th-lecture-time"></div></br>' +
        ///Friday
        '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="lecture-repeat-5"><input type="checkbox" id="lecture-repeat-5" class="mdl-checkbox__input" data-id="5"><span class="mdl-checkbox__label">F</span></label>'
        +
        '<input class="mdl-timetext" type="text" id="fri-lecture-time"></br>'
        +
        // '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" id="fri-lecture-time"></div></br>' +
        ////////////////////////////////////
        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
        +
        //'<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" id="lecture-date"><label class="mdl-textfield__label" for="lecture-date">Lecture Date</label></div>'
        '<input class="mdl-textfield__input" type="text" value="1" pattern="-?[0-9]*(\.[0-9]+)?" id="repeatWeeks">'
        +
        '<label class="mdl-textfield__label" for="repeatWeeks">Weeks</label>'
        +
        '<span class="mdl-textfield__error">Input is not a number!</span>'
        +
        '</div>'
        +
        '</div>'
        +
        '<button id="undo-change-btn" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">undo</i></button>'
        +
        '<button id="delete-lecture-btn" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">delete_forever</i></button>'
        +
        '<button id="save-lecture-btn" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">save</i></button></div>'
        +
        // '<button id="add-lecture-btn" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-color--blue-500"><i class="material-icons">add</i></button>'
        // +
        '</div>'
        // Added by Ahmed Magooda///////////////////////////
        // + '<div class="Spinner">'
        ////////////////////////////////////////
      );

      componentHandler.upgradeElements($('.mdl-grid .mdl-switch, .mdl-grid .mdl-button').toArray());
      ///// Added by Ahmed Magooda//////////////////////////////////
      console.log("Showing lecture spinner");
      // Spinner.show();
      var lectureLoader = Rocket.loader({
        // color of the loader
        // aqua black blue green grey-blue grey-blue-dark orange pink purple red white yellow
        colour: 'black',
        // animation delay
        delay: 0,
        // target container
        target: $('main > .mdl-grid'),
        // appends the loader to the target element as opposed to hiding
        append: false,
        // small, large or medium
        size: 'large',
        // dots pulse spinner
        type: 'pulse'
      });
      //////////////////////////////////////////////////////////////
      $.getJSON(config.backend_base + '/course', function (data)
      {
        if (data.status == 200)
        {
          var lectures, questions, courseData;

          //////////// Added by Ahmed Magooda ///////////
          // loading_spinner.stop()
          console.log("hiding lecture spinner");
          // Spinner.hide()
          lectureLoader.remove();
          ///////////////////////////////////////////////
          var hasCourse = false;
          $('#delete-lecture-btn').prop('disabled', true);
          // $('#lecture-edit').prop('disabled', true);
          $('#lecture-edit').hide();
          componentHandler.upgradeElements($('#lecture-edit .mdl-textfield, #lecture-edit .mdl-button').toArray());
          $.each(data.courses, function (index, course)
          {
            if (!course.archived)
            {
              hasCourse = true;
              var courseDropdownItem = $('<li class="mdl-menu__item">' + escapeHTML('[' + course.cid + '] ' + course.title) + '</li>');
              courseDropdownItem.data('info', course);
              courseDropdownItem.click(switchCourse);
              $('.lecture-course-dropdown ul').append(courseDropdownItem);
            }
          });
          var dateToday = new Date()
          $('#lecture-date').bootstrapMaterialDatePicker({
            format: "YYYY-MM-DD HH:mm",
            currentDate: new Date(),
            // todayDate = new Date(),
            shortTime: true,
            time: true,
            nowButton: true,
            minDate: dateToday,
            nowText: 'Today'
          }).change(function ()
          {
            $('#lecture-date').closest('.mdl-textfield').get(0).MaterialTextfield.boundUpdateClassesHandler();
          }).change();

          //////////////// Added by Ahmed Magooda
          /////////////////////// Connect repeat lectures textbox to datetime pickers /////////////////////////////
          ///////////////// Monday picker
          connectPicker($('#mon-lecture-time'))
          ///////////////// Tuesday picker
          connectPicker($('#tu-lecture-time'))
          ///////////////// Wednesday picker
          connectPicker($('#wed-lecture-time'))
          ///////////////// Thursday picker
          connectPicker($('#th-lecture-time'))
          ///////////////// Friday picker
          connectPicker($('#fri-lecture-time'))
          ///////////////////////////////////////

          $('#lecture-questions').hide();
          var courseDropdownAddItem = $('<li class="mdl-menu__item">Add New Courses</li>');
          courseDropdownAddItem.click(function () { location.hash = 'courses'; });
          $('.lecture-course-dropdown ul').append(courseDropdownAddItem);
          if (!hasCourse)
          {
            swal({
              title: "Oops...",
              text: 'Please add courses to your account first!',
              type: "error"
            }, function ()
            {
              location.hash = location.hash;
            });
            return false;
          }
          else
          {
            ///////// Batch Import ///////////////////////////////
            //////////////////////////////////////////////////////
            $('.lecture-course-dropdown ul li:first-child').click();
            componentHandler.upgradeElement($('#lecture-course-btn').get(0));
            componentHandler.upgradeElements($('.lecture-course-dropdown ul')
              .addClass('mdl-menu mdl-js-menu mdl-js-ripple-effect').toArray());
            $('#batch-upload').click(function ()
            {
              $('#csv-upload').click();
            });
            $('#csv-upload').change(function (e)
            {
              if (!e.target.files[0]) return false;
              Papa.parse(e.target.files[0], {
                header: true,
                complete: function (results)
                {
                  var fileName = e.target.files[0].name;
                  $('#csv-upload').replaceWith($('#csv-upload').clone(true));
                  var lectures = [];
                  $.each(results.data, function (index, lecture)
                  {
                    var baseLength = $('#lecture-list button').not('.lecture-btn--dummy').length + 1,
                      courseQuestions = JSON.stringify(courseData.questions);
                    if (lecture.Date && lecture.Title)
                    {
                      lectures.push({
                        index: baseLength + index,
                        questions: courseQuestions,
                        date: lecture.Date,
                        title: lecture.Title,
                        cid: courseData.cid
                      });
                    }
                  });
                  if (lectures.length)
                  {
                    swal({
                      title: 'Batch Import Confirm',
                      text: 'Are you sure you want to import ' + lectures.length +
                        ' lectures from "' + fileName + '"? We are not checking for duplicates.',
                      type: 'warning',
                      showCancelButton: true,
                      closeOnConfirm: false,
                      confirmButtonText: 'Confirm',
                      cancelButtonText: 'Abort'
                    }, function (confirm)
                    {
                      if (confirm)
                      {
                        var errCount = 0, succCount = 0;
                        function addLectures(lectures, index)
                        {
                          $.ajax({
                            url: config.backend_base + '/lecture/' + courseData.id,
                            data: lectures[index],
                            dataType: 'json',
                            method: 'POST',
                            success: function (data)
                            {
                              $('#save-lecture-btn').prop('disabled', false);
                              switch (data.status)
                              {
                                case 403:
                                  document.location = '/';
                                  break;
                                case 200:
                                  succCount++;
                                  var lecture = data.lecture,
                                    lectureBlock = $('<button class="mdl-button mdl-js-button mdl-js-ripple-effect lecture-btn"></button>');
                                  lecture.edited = {};
                                  lectureBlock.data('info', lecture);
                                  lectureBlock.html('<span class="num">' + parseInt($('#lecture-list .lecture-btn').length + 1) + '</span><span class="date">' + lecture.date.substring(0, 10) + '</span><span class="lecture">' + lecture.title + '</span>');
                                  lectureBlock.click(setLectureInfo);
                                  if ($('#lecture-list .lecture-btn').length)
                                  {
                                    var num = 1, found = false;
                                    $('#lecture-list .lecture-btn').each(function (index, ele)
                                    {
                                      $(ele).find('.num').text(num++);
                                      if (found) return true;
                                      if ($(ele).data('info').date > lecture.date)
                                      {
                                        lectureBlock.find('.num').text(num - 1);
                                        $(ele).before(lectureBlock).find('.num').text(num++);
                                        found = true;
                                      } else if ($(ele).is(':last-child'))
                                      {
                                        $(ele).after(lectureBlock);
                                      }
                                    });
                                  } else
                                  {
                                    $('#lecture-list').append(lectureBlock);
                                  }
                                  $('.lecture-info h4 i').text(parseInt($('.lecture-info h4 i').text()) + 1);
                                  componentHandler.upgradeElement(lectureBlock[0]);
                                  break;
                                case 500:
                                default:
                                  errCount++;
                                  break;
                              }
                            },
                            error: function (error)
                            {
                              errCount++;
                            },
                            complete: function ()
                            {
                              if (index < lectures.length - 1)
                              {
                                var progress = Math.floor((index + 1) * 100 / lectures.length + 0.5);
                                $('#curr-lecture').text(index + 1);
                                $('#failed-lecture-count').text(errCount);
                                $('#batch-import-progress').get(0).MaterialProgress.setProgress(progress);
                                setTimeout(function ()
                                {
                                  addLectures(lectures, index + 1)
                                }, 500);
                              } else
                              {
                                swal({
                                  title: 'Batch Import Done',
                                  text: succCount + ' lectures have been imported (' +
                                    errCount + ' failed)',
                                  type: 'success'
                                });
                              }
                            }
                          });
                        }
                        swal({
                          title: 'Batch Import Progress',
                          showConfirmButton: false,
                          showCancelButton: false,
                          allowOutsideClick: false,
                          allowEscapeKey: false,
                          html: true,
                          text: '<div><h5><span id="curr-lecture">1</span> of ' + lectures.length + ' lectures imported (<span id="failed-lecture-count">0</span> failed)...</h5><div id="batch-import-progress" class="mdl-progress mdl-js-progress"></div></div>',
                          type: 'info'
                        });
                        setTimeout(function ()
                        {
                          componentHandler.upgradeElement($('#batch-import-progress').get(0));
                          addLectures(lectures, 0);
                        }, 100);
                      }
                    });
                  } else
                  {
                    swal({
                      title: 'No valid lectures',
                      text: 'Please edit based on our sample file and be sure to save as CSV file.',
                      type: 'error',
                      confirmButtonText: 'OK'
                    });
                  }
                }
              });
            });

            $('#edit-default-questions').click(function ()
            {
              selected_courseData = $('.lecture-course-dropdown ul').closest('li').data('info');
              if (selected_course_data == null)
              {
                return false;
              }
              else
              {
                selected_courseData = selected_course_data;
              }
              var contentHTML = $('<div><div id="course-default-questions"><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="course-question-1"><input type="checkbox" id="course-question-1" class="mdl-checkbox__input" data-id="1"><span class="mdl-checkbox__label">Rate Confusion</span></label>' +
                '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="course-question-2"><input type="checkbox" id="course-question-2" class="mdl-checkbox__input" data-id="2"><span class="mdl-checkbox__label">Rate Interests</span></label><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="course-question-3"><input type="checkbox" id="course-question-3" class="mdl-checkbox__input" data-id="3"><span class="mdl-checkbox__label">Provide Feedback</span></label>' +
                '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="course-question-4"><input type="checkbox" id="course-question-4" class="mdl-checkbox__input" data-id="4"><span class="mdl-checkbox__label">Things You Learned</span></label><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="course-question-5"><input type="checkbox" id="course-question-5" class="mdl-checkbox__input" data-id="5"><span class="mdl-checkbox__label">Describe Confusion</span></label>' +
                '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="course-question-6"><input type="checkbox" id="course-question-6" class="mdl-checkbox__input" data-id="6"><span class="mdl-checkbox__label">Describe Interests</span></label></div></div>');
              swal({
                title: 'Edit Default Questions',
                text: contentHTML.html(),
                html: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                cancelButtonText: 'Cancel',
                closeOnConfirm: false
              }, function (confirm)
              {
                if (confirm)
                {
                  questions = [];
                  $('#course-default-questions input').each(function (index, checkbox)
                  {
                    if ($(checkbox).prop('checked'))
                    {
                      questions.push('q' + $(checkbox).data('id'));
                    }
                  });
                  if ($(selected_courseData.questions).not(questions).length === 0 &&
                    $(questions).not(selected_courseData.questions).length === 0)
                  {
                    swal.close();
                    return false;
                  } else
                  {
                    $('.sweet-alert button.confirm').prop('disabled', true);
                    $.ajax({
                      url: config.backend_base + '/course/' + selected_courseData.id,
                      data: { questions: JSON.stringify(questions) },
                      dataType: 'json',
                      method: 'PUT',
                      success: function (data)
                      {
                        $('.sweet-alert button.confirm').prop('disabled', false);
                        switch (data.status)
                        {
                          case 403:
                            document.location = '/';
                            break;
                          case 200:
                            selected_courseData.questions = questions;
                            // switchCourse();
                            swal.close();
                            break;
                          case 500:
                          default:
                            swal({
                              title: 'Failed to save changes',
                              text: 'Unexpected error happended! Please try again and contact us if problem persists.',
                              type: 'error',
                              confirmButtonText: 'OK'
                            });
                            break;
                        }
                      },
                      error: function (error)
                      {
                        $('.sweet-alert button.confirm').prop('disabled', false);
                        swal({
                          title: 'Failed to save changes',
                          text: 'Unexpected error happended! Please try again and contact us if problem persists.',
                          type: 'error',
                          confirmButtonText: 'OK'
                        });
                      }
                    });
                  }
                }
              });
              setTimeout(function ()
              {
                $('#course-default-questions input').each(function (index, checkbox)
                {
                  if (selected_courseData.questions.indexOf('q' + $(checkbox).data('id')) > -1)
                  {
                    $(checkbox).prop('checked', true).closest('.mdl-checkbox').addClass('is-checked');
                  } else
                  {
                    $(checkbox).prop('checked', false).closest('.mdl-checkbox').removeClass('is-checked');
                  }
                });
                componentHandler.upgradeElements($('#course-default-questions .mdl-checkbox').toArray());
              }, 100);
            });
          }
        } else if (data.status == 403)
        {
          document.location = '/';
        } else if (data.status == 500)
        {
          handleISE(data.error || 'An unknown server error occured!');
        } else
        {
          handleISE('An unknown server error occured!');
        }
      }).error(function (error)
      {
        handleISE('An unknown server error occured! ERR_CODE: ' + error);
      });
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////// Reflections   ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////  Part         ////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
    // <!--
    // // reflections: function() {
    // //   swal({
    // //     title: 'Under Construction',
    // //     type: 'info'
    // //   }, function() {
    // //     location.hash = 'home'
    // //   });
    // // },
    // -->
    reflections: function ()
    {
      swal.close();
      // $('main > .mdl-grid').append('<div class="title mdl-cell--12-col mdl-color-text--grey-800"><h3>Edit Lectures for Course:</h3><div class="lecture-course-dropdown"><span id="lecture-course-name">Please Wait...</span><button id="lecture-course-btn" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"><i class="material-icons" role="presentation">arrow_drop_down</i><span class="visuallyhidden">Courses</span></button><ul class="mdl-menu--bottom-right" for="lecture-course-btn"></ul></div></div><div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col"><div class="mdl-card__supporting-text lecture-info"><h4>Summarization of Reflections: </h4></div><div class="mdl-card__supporting-text"><div id="reflection_test"></div></div><div class="mdl-card__supporting-text reflection-details"><h4>Click on the above reflection that you are interested in to show the actual reflections</h4></div><div class="mdl-card__supporting-text"><div id="reflection_list"></div></div>');
      $('main > .mdl-grid').append('<div class="title mdl-cell--12-col mdl-color-text--grey-800"> <h3>Edit Lectures for Course:</h3> <div class="lecture-course-dropdown"> <span id="lecture-course-name">Please Wait...</span><button id="lecture-course-btn" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"><i class="material-icons" role="presentation">arrow_drop_down</i><span class="visuallyhidden">Courses</span></button> <ul class="mdl-menu--bottom-right" for="lecture-course-btn"></ul> </div> </div>');

      $('main > .mdl-grid').append('<div id=p2 class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>');

      $('main > .mdl-grid').append('<div id="lec_graph" align="center"></div>')
        .append('<div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--14-col-tablet summarizations"> <div class="mdl-card__title mdl-card--expand mdl-color--blue-grey mdl-color-text--white"> <h2 class=mdl-card__title-text>Summarization of Reflections</h2> </div> <div class=mdl-card__supporting-text> <p><b>Click on the above reflection that you are interested in to show the actual reflections.</b></p> <div id=dashbaord-home-courses> <div id="reflection_test"></div> </div> </div> <div class="mdl-card__actions mdl-card--border"><button id="summarization-view-all" class="lecture-btn mdl-button mdl-button--primary mdl-js-button mdl-js-ripple-effect">View All</button></div> </div>')
        .append('<div id="reflection_list_2" class="ref_all" align="center"></div>')
        .append('<div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--14-col-tablet reflections"> <div class="mdl-card__title mdl-card--expand mdl-color--black mdl-color-text--white"> <h2 class=mdl-card__title-text>Detailed Reflections</h2> </div> <div class=mdl-card__supporting-text> <p>Here lists the reflections of the selected summary.</p> <div id=dashbaord-home-lectures> <div id="reflection_list" class="ref_all"></div> </div> </div> <div class="mdl-card__actions mdl-card--border"><button id="reflections-view-all" class="lecture-btn mdl-button mdl-button--primary mdl-js-button mdl-js-ripple-effect">View All</button></div> </div>');

      componentHandler.upgradeElements($('.mdl-grid .mdl-switch, .mdl-grid .mdl-button').toArray());
      /////////////// Added by Ahmd Magooda
      console.log("Showing reflections spinner");
      // Spinner.show();
      var myReflectionLoader = Rocket.loader({
        // color of the loader
        // aqua black blue green grey-blue grey-blue-dark orange pink purple red white yellow
        colour: 'purple',
        // animation delay
        delay: 0,
        // target container
        // target: $('main > .mdl-grid'),
        target: $('main > .mdl-layout__container'),
        // appends the loader to the target element as opposed to hiding
        append: false,
        // small, large or medium
        size: 'large',
        // dots pulse spinner
        type: 'spinner'
      });
      ////////////////////////////////////
      $.getJSON(config.backend_base + '/course', function (data)
      {
        if (data.status == 200)
        {
          var lectures, questions, courseData;
          $('main > .mdl-grid > .mdl-progress').remove();
          function setLectureInfo(e)
          {
          }
          async function switchCourse(e)
          {
            $('#reflection_list').html("");
            $('#reflection_test').html("");
            courseData = e ? $(e.target).closest('li').data('info') : courseData;
            var courseId = courseData.id;
            var courseCid = courseData.cid;
            var summarizationBriefBlock = $('<label class="summarization-btn"></label>');
            var summarizationBlock = $('<label class="summarization-btn"></label>');
            $('#lecture-course-name').text($(this).closest('li').text());

            /////////////// Added by Ahmd Magooda
            console.log("Showing reflections spinner");
            // Spinner.show();
            var myReflectionLoader = Rocket.loader({
              // color of the loader
              // aqua black blue green grey-blue grey-blue-dark orange pink purple red white yellow
              colour: 'purple',
              // animation delay
              delay: 0,
              // target container
              // target: $('main > .mdl-grid'),
              target: $('main > .mdl-grid .mdl-switch'),
              // appends the loader to the target element as opposed to hiding
              append: false,
              // small, large or medium
              size: 'large',
              // dots pulse spinner
              type: 'spinner'
            });
            ////////////////////////////////////
            let questionlist = await getQuestionDictionary('q1');
            $.getJSON(config.backend_base + '/summarization/' + courseCid,
              function (data)
              {
                var courseOnClickHandler = function (e)
                {
                  e.preventDefault();
                  $('#reflection_list').html("");

                  // $('#reflection_list_2').html("");
                  // console.log(this.id);
                  // console.log(this.className);
                  // console.log(this.parentNode.id);
                  // console.log(this.parentNode.className);
                  var current_question_id = this.id;
                  var current_lecture_id = this.parentNode.className;
                  var current_lecture_num = this.parentNode.id;
                  var selectedSummarization = summarizations[current_lecture_id];
                  var user_ids;
                  var qualityDistribution = [0, 0, 0, 0, 0];//0,1,2,3,4
                  var testttt = '';


                  if (this.id == 1)
                  {
                    var question_related_reflections = JSON.parse(selectedSummarization.id.q1_summaries);
                    user_ids = question_related_reflections.Sources;
                  }
                  if (this.id == 2)
                  {
                    var question_related_reflections = JSON.parse(selectedSummarization.id.q2_summaries);
                    user_ids = question_related_reflections.Sources;
                  }
                  if (this.id == 3)
                  {
                    var question_related_reflections = JSON.parse(selectedSummarization.id.q3_summaries);
                    user_ids = question_related_reflections.Sources;
                  }
                  if (this.id == 4)
                  {
                    var question_related_reflections = JSON.parse(selectedSummarization.id.q4_summaries);
                    user_ids = question_related_reflections.Sources;
                  }
                  if (this.id == 5)
                  {
                    var question_related_reflections = JSON.parse(selectedSummarization.id.q5_summaries);
                    user_ids = question_related_reflections.Sources;
                  }
                  if (this.id == 6)
                  {
                    var question_related_reflections = JSON.parse(selectedSummarization.id.q6_summaries);
                    user_ids = question_related_reflections.Sources;
                  }
                  if (this.id == 7)
                  {
                    var question_related_reflections = JSON.parse(selectedSummarization.id.q7_summaries);
                    user_ids = question_related_reflections.Sources;
                  }


                  console.log(user_ids);
                  // console.log(user_ids.length);

                  var uniqueUserIds = [];
                  for (var currentUserSetIndex = 0; currentUserSetIndex < user_ids.length; currentUserSetIndex++)
                  {
                    var currentUserSet = user_ids[currentUserSetIndex];
                    for (var currentUserIndex = 0; currentUserIndex < currentUserSet.length; currentUserIndex++)
                    {
                      if (uniqueUserIds.includes(currentUserSet[currentUserIndex]))
                      {

                      } else
                      {
                        uniqueUserIds.push(currentUserSet[currentUserIndex]);
                      }
                    }
                  }

                  return_list = get_phrase_chart();
                  qualityChartCanvas = return_list[0];
                  qualityChart = return_list[1];
                  window.chart = qualityChart;

                  // show_reflection_information(uniqueUserIds, current_question_id, courseCid, current_lecture_num, qualityDistribution, qualityChart);
                  show_external_information(uniqueUserIds, current_question_id, courseCid, current_lecture_num, qualityDistribution, qualityChart);
                };

                if (data.status == 200)
                {
                  if (document.getElementById("numStudentsPhrase") != null)
                  {
                    $('#numStudentsPhrase').remove();
                  }
                  ////////////////////////////////////////////////////////////////////////////////////////////////
                  ///////////////////////// Part for lecure distribution graph ///////////////////////////////////
                  ////////////////////////////////////////////////////////////////////////////////////////////////
                  ///////////////////////////////////////////////////////////////////////////////////////////////
                  $.getJSON(config.backend_base + '/reflections/' + courseData.cid + '/' + courseData.passcode,
                    function (data)
                    {
                      if (data.status == 200)
                      {
                        reflections = data.reflections, summarizationEvents = [];
                        var reflection_dictionary = {};
                        max_lec_num = 0
                        for (var i = 0; i < reflections.length; i++)
                        {
                          console.log(reflections[i]);
                          var lec_num = reflections[i].id.lecture_number;
                          if (lec_num > max_lec_num)
                          {
                            max_lec_num = lec_num;
                          }
                          if (lec_num in reflection_dictionary)
                          {
                            old_val = reflection_dictionary[lec_num];
                            new_val = old_val + 1;
                            reflection_dictionary[lec_num] = new_val;
                          }
                          else
                          {
                            reflection_dictionary[lec_num] = 1;
                          }
                          // contentHTML.find('.token-list tbody').append('<tr><td class="id">' + reflections[i].id.user + '</td><td class="active">' + 'Yes' + '</td><td class="count">' + reflections[i].id.passcode + '</td></tr>');
                        }
                        return_list = get_lecture_graph(reflection_dictionary, max_lec_num);
                        lectureChart = return_list[1];
                        // lectureChart.data.datasets[0].data = percentage_weights;
                        lectureChart.update();
                        // for (uid in reflection_dictionary)
                        // {
                        //   // contentHTML.find('.token-list tbody').append('<tr><td class="id">' + uid + '</td><td class="count">' + reflection_dictionary[uid] + '</td></tr>');
                        // }
                        // swal({
                        //   title: 'Submitted Reflections',
                        //   text: contentHTML.html(),
                        //   html: true,
                        //   closeOnCancel: true
                        // }, function (exit)
                        // {
                        // });
                        // return reflections;
                      }
                      else if (data.status == 403)
                      {
                        document.location = '/';
                        // All_reflections = [];
                      }
                      else if (data.status == 500)
                      {
                        handleISE(data.error || 'An unknown server error occured!');
                        // return [];
                      }
                      else
                      {
                        handleISE('An unknown server error occured!');
                        // return [];
                      }
                    }).error(function (error)
                    {
                      handleISE('An unknown server error occured! ERR_CODE: ' + error);
                      // return [];
                    });
                  ///////////////////////////////////////////////////////////////////////////////////////////////  
                  ///////////////////////////////////////////////////////////////////////////////////////////////
                  //////////////////////////////////// Added By Ahmed Magoda/////////////////////////////////////
                  summarizations = data.summarizations, summarizationEvents = [];
                  var briefCount = 0;
                  var sumContent = '';
                  var sumBriefContent = '';
                  var briefDoneFlag = 1;
                  for (var i = 0; i < summarizations.length; i++)
                  {
                    var summarization = summarizations[i]; // summarizationBlock = $('<label class="summarization-btn"></label>');
                    var actualLectureNumber = JSON.stringify(summarization.id.lecture_number);
                    sumContent = sumContent + '<div class="' + i + '" id="' + actualLectureNumber + '">';//'<p class="lecture" id="{$i}">';
                    if (summarization.id.q1_summaries || summarization.id.q2_summaries || summarization.id.q3_summaries || summarization.id.q4_summaries ||
                      summarization.id.q5_summaries || summarization.id.q6_summaries || summarization.id.q7_summaries)
                    {
                      sumContent = sumContent + '<b><hr_ />Lecture ' + actualLectureNumber + '<hr_/></b><br><br>';
                    }
                    if (summarization.id.q1_summaries)
                    {
                      var questiontext = ''
                      for (var question_index = 0; question_index < questionlist.length; question_index++)
                      {
                        if (questionlist[question_index].qid == 'q1')
                        {
                          questiontext = questionlist[question_index].questiontext;
                          break;
                        }
                      }
                      var p1Sum = JSON.parse(summarization.id.q1_summaries);
                      // sumContent = sumContent + '<p class="course_paragraph" id="1"><b>Lecture'+JSON.stringify(summarization.id.lecture_number)+ ' Question 1: ' + questiontext + '</b> <br>' + p1Sum.summaryText + '</p><hr/>';
                      if (questiontext == '')
                      {
                        sumContent = sumContent + '<p class="course_paragraph" id="1"><b> Question 1: </b> <br>' + p1Sum.summaryText + '</p><hr/>';
                      }
                      else
                      {
                        sumContent = sumContent + '<p class="course_paragraph" id="1"><b>' + questiontext + '</b> <br>' + p1Sum.summaryText.join('<br />') + '</p><hr/>';
                      }
                      briefCount = briefCount + 1;
                    }
                    if (summarization.id.q2_summaries)
                    {
                      var questiontext = ''
                      for (var question_index = 0; question_index < questionlist.length; question_index++)
                      {
                        if (questionlist[question_index].qid == 'q2')
                        {
                          questiontext = questionlist[question_index].questiontext;
                          break;
                        }
                      }
                      var p2Sum = JSON.parse(summarization.id.q2_summaries);
                      // sumContent = sumContent + '<p class="course_paragraph" id="2"><b>Lecture'+JSON.stringify(summarization.id.lecture_number)+ ' Question 2: ' + questiontext + '</b> <br>' + p2Sum.summaryText + '</p><hr/>';
                      if (questiontext == '')
                      {
                        sumContent = sumContent + '<p class="course_paragraph" id="2"><b> Question 2: </b> <br>' + p2Sum.summaryText + '</p><hr/>';
                      }
                      else
                      {
                        sumContent = sumContent + '<p class="course_paragraph" id="2"><b>' + questiontext + '</b> <br>' + p2Sum.summaryText.join('<br />') + '</p><hr/>';
                      }
                      briefCount = briefCount + 1;
                    }
                    if (summarization.id.q3_summaries)
                    {
                      var questiontext = ''
                      for (var question_index = 0; question_index < questionlist.length; question_index++)
                      {
                        if (questionlist[question_index].qid == 'q3')
                        {
                          questiontext = questionlist[question_index].questiontext;
                          break;
                        }
                      }
                      var p3Sum = JSON.parse(summarization.id.q3_summaries);
                      // sumContent = sumContent + '<p class="course_paragraph" id="3"><b>Lecture'+JSON.stringify(summarization.id.lecture_number)+ ' Question 3: '+ questiontext + '</b> <br>' + p3Sum.summaryText + '</p><hr/>';
                      if (questiontext == '')
                      {
                        sumContent = sumContent + '<p class="course_paragraph" id="3"><b> Question 3: </b> <br>' + p3Sum.summaryText + '</p><hr/>';
                      }
                      else
                      {
                        sumContent = sumContent + '<p class="course_paragraph" id="3"><b>' + questiontext + '</b> <br>' + p3Sum.summaryText.join('<br />') + '</p><hr/>';
                      }
                      briefCount = briefCount + 1;
                    }
                    if (summarization.id.q4_summaries)
                    {
                      var questiontext = ''
                      for (var question_index = 0; question_index < questionlist.length; question_index++)
                      {
                        if (questionlist[question_index].qid == 'q4')
                        {
                          questiontext = questionlist[question_index].questiontext;
                          break;
                        }
                      }
                      var p4Sum = JSON.parse(summarization.id.q4_summaries);
                      // sumContent = sumContent + '<p class="course_paragraph" id="4"><b>Lecture'+JSON.stringify(summarization.id.lecture_number)+ ' Question 4: '+ questiontext + '</b> <br>' + p4Sum.summaryText + '</p><hr/>';
                      if (questiontext == '')
                      {
                        sumContent = sumContent + '<p class="course_paragraph" id="4"><b> Question 4: </b> <br>' + p4Sum.summaryText + '</p><hr/>';
                      }
                      else
                      {
                        sumContent = sumContent + '<p class="course_paragraph" id="4"><b>' + questiontext + '</b> <br>' + p4Sum.summaryText.join('<br />') + '</p><hr/>';
                      }
                      briefCount = briefCount + 1;
                    }
                    if (summarization.id.q5_summaries)
                    {
                      var questiontext = ''
                      for (var question_index = 0; question_index < questionlist.length; question_index++)
                      {
                        if (questionlist[question_index].qid == 'q5')
                        {
                          questiontext = questionlist[question_index].questiontext;
                          break;
                        }
                      }
                      var p5Sum = JSON.parse(summarization.id.q5_summaries);
                      // sumContent = sumContent + '<p class="course_paragraph" id="5"><b>Lecture'+JSON.stringify(summarization.id.lecture_number)+ ' Question 5: '+ questiontext + '</b> <br>' + p5Sum.summaryText + '</p><hr/>';
                      if (questiontext == '')
                      {
                        sumContent = sumContent + '<p class="course_paragraph" id="5"><b> Question 5: </b> <br>' + p5Sum.summaryText + '</p><hr/>';
                      }
                      else
                      {
                        sumContent = sumContent + '<p class="course_paragraph" id="5"><b>' + questiontext + '</b> <br>' + p5Sum.summaryText.join('<br />') + '</p><hr/>';
                      }
                      briefCount = briefCount + 1;
                    }
                    if (summarization.id.q6_summaries)
                    {
                      var questiontext = ''
                      for (var question_index = 0; question_index < questionlist.length; question_index++)
                      {
                        if (questionlist[question_index].qid == 'q6')
                        {
                          questiontext = questionlist[question_index].questiontext;
                          break;
                        }
                      }
                      var p6Sum = JSON.parse(summarization.id.q6_summaries);
                      // sumContent = sumContent + '<p class="course_paragraph" id="6"><b>Lecture'+JSON.stringify(summarization.id.lecture_number)+ ' Question 6: '+ questiontext + '</b> <br>' + p6Sum.summaryText + '</p><hr/>';
                      if (questiontext == '')
                      {
                        sumContent = sumContent + '<p class="course_paragraph" id="6"><b> Question 6: </b> <br>' + p6Sum.summaryText.replace(',', '<br />') + '</p><hr/>';
                      }
                      else
                      {
                        sumContent = sumContent + '<p class="course_paragraph" id="6"><b>' + questiontext + '</b> <br>' + p6Sum.summaryText.join('<br />') + '</p><hr/>';
                      }
                      briefCount = briefCount + 1;
                    }
                    if (summarization.id.q7_summaries)
                    {
                      var questiontext = ''
                      for (var question_index = 0; question_index < questionlist.length; question_index++)
                      {
                        if (questionlist[question_index].qid == 'q7')
                        {
                          questiontext = questionlist[question_index].questiontext;
                          break;
                        }
                      }
                      var p7Sum = JSON.parse(summarization.id.q7_summaries);
                      // sumContent = sumContent + '<p class="course_paragraph" id="7"><b>Lecture'+JSON.stringify(summarization.id.lecture_number)+ ' Question 7: '+ questiontext + '</b> <br>' + p7Sum.summaryText  + '</p><hr/>';
                      if (questiontext == '')
                      {
                        sumContent = sumContent + '<p class="course_paragraph" id="7"><b> Question 7: </b> <br>' + p7Sum.summaryText + '</p><hr/>';
                      }
                      else
                      {
                        sumContent = sumContent + '<p class="course_paragraph" id="7"><b>' + questiontext + '</b> <br>' + p7Sum.summaryText.join('<br />') + '</p><hr/>';
                      }
                      briefCount = briefCount + 1;
                    }
                    sumContent = sumContent + '</div>';
                    if (briefCount < 10)
                    {
                      sumBriefContent = sumContent;
                    }

                  }
                  // console.log(sumContent, sumBriefContent);

                  summarizationBlock.html(sumContent).find('.course_paragraph').click(courseOnClickHandler);
                  summarizationBriefBlock.html(sumBriefContent).find('.course_paragraph').click(courseOnClickHandler);
                  $('#reflection_test').append(summarizationBriefBlock);
                } else if (data.status == 403)
                {
                  document.location = '/';
                } else if (data.status == 500)
                {
                  handleISE(data.error || 'An unknown server error occured!');
                } else
                {
                  handleISE('An unknown server error occured!');
                }
                $('#summarization-view-all').click(function (e)
                {
                  e.preventDefault();
                  $('#reflection_test').html("");
                  $('#reflection_test').append(summarizationBlock);
                });


                //$('.course_paragraph').click();


              }).error(function (error)
              {
                handleISE('An unknown server error occured! ERR_CODE: ' + error);
              });
            //////////// Added by Ahmed Magooda ///////////
            console.log("hiding reflections spinner");
            myReflectionLoader.remove();
            ///////////////////////////////////////////////
          }
          var hasCourse = false;
          componentHandler.upgradeElements($('#lecture-edit .mdl-textfield, #lecture-edit .mdl-button').toArray());
          $.each(data.courses, function (index, course)
          {
            if (!course.archived)
            {
              hasCourse = true;
              var courseDropdownItem = $('<li class="mdl-menu__item">' + escapeHTML('[' + course.cid + '] ' + course.title) + '</li>');
              courseDropdownItem.data('info', course);
              courseDropdownItem.click(switchCourse);
              $('.lecture-course-dropdown ul').append(courseDropdownItem);
            }
          });
          var courseDropdownAddItem = $('<li class="mdl-menu__item">Add New Courses</li>');
          courseDropdownAddItem.click(function ()
          {
            location.hash = 'courses';
          });
          $('.lecture-course-dropdown ul').append(courseDropdownAddItem);
          if (!hasCourse)
          {
            swal({
              title: "Oops...",
              text: 'Please add courses to your account first!',
              type: "error"
            }, function ()
            {
              location.hash = location.hash;
            });
            return false;
          } else
          {
            $('.lecture-course-dropdown ul li:first-child').click();
            componentHandler.upgradeElement($('#lecture-course-btn').get(0));
            componentHandler.upgradeElements($('.lecture-course-dropdown ul')
              .addClass('mdl-menu mdl-js-menu mdl-js-ripple-effect').toArray());
          }
        } else if (data.status == 403)
        {
          document.location = '/';
        } else if (data.status == 500)
        {
          handleISE(data.error || 'An unknown server error occured!');
        } else
        {
          handleISE('An unknown server error occured!');
        }
      }).error(function (error)
      {
        handleISE('An unknown server error occured! ERR_CODE: ' + error);
      });
      //////////// Added by Ahmed Magooda ///////////
      console.log("hiding reflections spinner");
      myReflectionLoader.remove();
      ///////////////////////////////////////////////
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
    support: function ()
    {
      swal({
        title: 'Under Construction',
        type: 'info'
      }, function ()
      {
        location.hash = 'home'
      });
    }
  };

  if (!user) location.href = '/';
  $(document).ready(function ()
  {
    $('#dashboard-name').text(user.name);
    $('#dashboard-email').text(user.email);
    $('#dashboard-avatar').attr('src', 'https://www.gravatar.com/avatar/' +
      CryptoJS.MD5(user.email.trim().toLowerCase()) + '?s=128&d=mm');
    $('#header-menu-dd li').click(function (e)
    {
      switch ($(e.target).data('link'))
      {
        case 'about':
          window.open('http://www.coursemirror.com/');
          break;
        case 'contact':
          window.open('http://www.coursemirror.com/contact-us/');
          break;
        default:
          swal('Under Construction', '', 'info');
          break;
      }
    });
    $('nav a').click(function (e)
    {
      e.preventDefault();
      if ($(e.target).hasClass('active')) return false;
      var module_name = $(e.target).data('link');
      location.hash = module_name;
      $('.mdl-layout__drawer, .mdl-layout__obfuscator').removeClass('is-visible');
    });
    $('#dashboard-settings').click(function ()
    {
      swal({
        title: "",
        showCancelButton: true,
        confirmButtonText: "Save",
        html: true,
        closeOnConfirm: false,
        text: '<div><h2>Profile Photo</h2><p>Please set the profile picture for your account at <a target="_blank" href="https://gravatar.com">Gravatar</a>. Make sure you use the same e-mail for your Gravatar account.</p><h2>Change Password</h2><form><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="password" id="dashboard-password" minlength="8" pattern=".{8,}"><label class="mdl-textfield__label" for="dashboard-password">Old Password</label><span class="mdl-textfield__error">Please enter your old password.</span></div><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="password" id="dashboard-new-password" minlength="8" pattern=".{8,}"><label class="mdl-textfield__label" for="dashboard-new-password">New Password</label><span class="mdl-textfield__error">Please set your new password of length 8 or greater.</span></div></form></div>'
      }, function (confirm)
      {
        if (!confirm) return;
        var oldPassword = $('#dashboard-password').val(),
          newPassword = $('#dashboard-new-password').val();
        if (oldPassword.length < 8 || newPassword.length < 8) return;
        $.ajax({
          url: config.backend_base + '/passwd',
          data: { old: oldPassword, new: newPassword },
          dataType: 'json',
          method: 'POST',
          success: function (data)
          {
            switch (data.status)
            {
              case 403:
                document.location = '/';
                break;
              case 404:
                swal({
                  title: "Oops",
                  closeOnConfirm: false,
                  type: "error",
                  text: data.error
                }, function (confirm)
                {
                  if (confirm) $('#dashboard-settings').click();
                });
                break;
              case 200:
                swal({
                  title: "Great",
                  confirmButtonText: "Log back in",
                  allowEscapeKey: false,
                  allowOutsideClick: false,
                  closeOnConfirm: false,
                  type: "success",
                  text: "You have successfully changed your password and logged out of your account!"
                }, function ()
                {
                  document.location = '/';
                });
                break;
              case 500:
              default:
                swal({
                  title: 'Failed to change password',
                  text: 'Unexpected error happended! Please try again and contact us if problem persists.',
                  type: 'error',
                  confirmButtonText: 'OK'
                });
                break;
            }
          },
          error: function (error)
          {
            swal({
              title: 'Failed to change password',
              text: 'Unexpected error happended! Please try again and contact us if problem persists.',
              type: 'error',
              confirmButtonText: 'OK'
            });
          }
        });
      });
      setTimeout(function ()
      {
        componentHandler.upgradeElements($('.sweet-alert .mdl-textfield').toArray());
      }, 100);
    });
    $('#dashboard-logout').click(function ()
    {
      swal({
        title: 'Logging out...',
        type: 'info',
        showConfirmButton: false
      });
      $.get(config.backend_base + '/logout', function (data)
      {
        if (data.status = 200)
        {
          swal({
            title: 'Logout Success',
            text: 'You have successfully logged out of your account.',
            timer: 2000,
            type: 'success',
            showConfirmButton: false
          }, function ()
          {
            location.href = '/';
          });
        } else
        {
          swal({
            title: 'Logout Failure',
            text: 'Unexpected error happended! Please try again and contact us if problem persists.',
            timer: 2000,
            type: 'error',
            showConfirmButton: false
          }, function ()
          {
            swal.close();
          });
        }
      }, 'json');
    }).error(function ()
    {
      swal({
        title: 'Logout Failure',
        text: 'Failed to connect to backend server! Please try again later.',
        timer: 2000,
        type: 'error',
        showConfirmButton: false
      }, function ()
      {
        swal.close();
      });
    });
    setModule();
  });
  window.onhashchange = setModule;
})();


function computeDates(date, repeatDays, repeatWeeks)
{
  var datesList = [date];
  datesList.forEach(function (a)
  {
    console.log(a.getDay(), a.getMonth(), a.getDate(), a.getFullYear());
  })
  /* compute number of dates */
  var count = repeatDays.length * (repeatWeeks - 1);
  var repeatNumbers = [];

  repeatDays.forEach(function (a)
  {
    if (date.getDay() < a)
    {
      if (((date.getDay() % 2 == 0) & (a % 2 == 0)) | ((date.getDay() % 2 == 1) & (a % 2 == 1)))
      {
        count++;
      }
    }
  });
  // console.log('Count: ', count);
  var newDate = new Date(date);
  newDate.setDate(date.getDate() + 1);
  var ctIncrement = 0;
  while ((datesList.length < (count + 1)) & (ctIncrement < 100))
  {
    ctIncrement++;
    var tmpDate = newDate;
    if (repeatDays.includes(newDate.getDay()))
    {
      datesList.push(newDate);
    }
    newDate = new Date(tmpDate);
    newDate.setDate(tmpDate.getDate() + 1);
  }
  // console.log('\nDone adding\n')
  // datesList.forEach(function(a){
  //         console.log(a.getDay(), a.getMonth(), a.getDate(), a.getFullYear());
  // })
  return datesList;
}

function getQuestionDictionary(questionid)
{
  return new Promise((resolve, reject) =>
  {
    questionlist = []
    $.getJSON(config.backend_base + '/question/' + questionid, function (data)
    {
      if (data.status == 200)
      {
        questions = data.questions, reflectionEvents = [];
      }

      for (var question_index = 0; question_index < questions.length; question_index++)
      {
        var question = questions[question_index];
        questionlist.push(question)
        console.log(question);

      }
      //  return questions
    });

    console.log('Finished getting questions')
    resolve(questionlist)
    // return questionlist
  });
}

function connectPicker(elementtoConncect)
{
  ///////////////// Connect picker
  elementtoConncect.bootstrapMaterialDatePicker({
    format: "HH:mm",
    currentDate: new Date(),
    shortTime: true,
    // currenttime: new time(),
    // todayDate = new Date(),
    time: true,
    date: false,
    // nowButton: true,
    // minDate: dateToday,
    // nowText: 'Today'
  }).change(function ()
  {
    elementtoConncect.closest('.mdl-timetext').get(0).MaterialTextfield;//.boundUpdateClassesHandler();
    // elementtoConncect.closest('.mdl-textfield').get(0).MaterialTextfield;//.boundUpdateClassesHandler();
  }).change();

}

function enable_disable(is_disabled)
{
  $('#mon-lecture-time').prop('disabled', is_disabled);
  $('#tu-lecture-time').prop('disabled', is_disabled);
  $('#wed-lecture-time').prop('disabled', is_disabled);
  $('#th-lecture-time').prop('disabled', is_disabled);
  $('#fri-lecture-time').prop('disabled', is_disabled);
  $('#lecture-repeat-1').prop('disabled', is_disabled);
  $('#lecture-repeat-2').prop('disabled', is_disabled);
  $('#lecture-repeat-3').prop('disabled', is_disabled);
  $('#lecture-repeat-4').prop('disabled', is_disabled);
  $('#lecture-repeat-5').prop('disabled', is_disabled);

  if (is_disabled)
  {
    $('#lecture-repeats').hide();
    $('#mon-lecture-time').hide();
    $('#tu-lecture-time').hide();
    $('#wed-lecture-time').hide();
    $('#th-lecture-time').hide();
    $('#fri-lecture-time').hide();
    $('#lecture-repeat-1').hide();
    $('#lecture-repeat-2').hide();
    $('#lecture-repeat-3').hide();
    $('#lecture-repeat-4').hide();
    $('#lecture-repeat-5').hide();
  }
  else
  {
    $('#lecture-repeats').show();
    $('#mon-lecture-time').show();
    $('#tu-lecture-time').show();
    $('#wed-lecture-time').show();
    $('#th-lecture-time').show();
    $('#fri-lecture-time').show();
    $('#lecture-repeat-1').show();
    $('#lecture-repeat-2').show();
    $('#lecture-repeat-3').show();
    $('#lecture-repeat-4').show();
    $('#lecture-repeat-5').show();
  }
}

function clearLectureEditor()
{
  // var todayString = new Date().toISOString().substring(0, 10);
  var todayString = new Date().toISOString();//.substring(0, 10);
  var todayString = new Date().toISOString().substring(0, 10) + " " + (new Date()).toTimeString().substring(0, 5)
  $('#save-lecture-btn, #undo-change-btn').prop('disabled', false);
  $('#delete-lecture-btn, #undo-change-btn').prop('disabled', true);
  $('#lecture-title').val('').closest('.mdl-textfield').get(0).MaterialTextfield.boundUpdateClassesHandler();
  $('#lecture-date').val(todayString).bootstrapMaterialDatePicker('setDate', todayString).closest('.mdl-textfield').get(0).MaterialTextfield.boundUpdateClassesHandler();
  $('#lecture-special-question').prop('checked', false).closest('.mdl-switch').removeClass('is-checked');
  $('#lecture-questions').hide();
}


function add_single_lecture(courseData, courseId)
{
  console.log('Adding single Lecture');
  var activeLectureBlock = $('#lecture-list button.on'),
    activeLectureData = activeLectureBlock.data('info'),
    postData = activeLectureData.id ?
      $.extend({ id: activeLectureData.id }, activeLectureData.edited) :
      $.extend({
        cid: courseData.cid,
        passcode: courseData.passcode,
        title: 'Untitled Lecture',
        date: activeLectureData.date,
        questions: activeLectureData.questions,
        index: $('#lecture-list button').length
      }, activeLectureData.edited);
  // if (postData.date) postData.date = new moment(new Date(postData.date.substring(0, 10) + ' 00:00')).format('MM/DD/YYYY');
  if (postData.date) postData.date = new moment(new Date(postData.date)).format('MM/DD/YYYY HH:mm');
  if (postData.questions) postData.questions = JSON.stringify(postData.questions);
  // courseId = courseData.cid
  $('#save-lecture-btn').prop('disabled', true);
  $.ajax({
    url: config.backend_base + '/lecture/' + courseId,
    data: postData,
    dataType: 'json',
    method: activeLectureData.id ? 'PUT' : 'POST',
    success: function (data)
    {
      $('#save-lecture-btn').prop('disabled', false);
      switch (data.status)
      {
        case 403:
          document.location = '/';
          break;
        case 200:
          lec_date_string = data.lecture.date.substring(0, 10);// + " " + lecture.date.substring(12, 16)
          lec_time_hours = new Date(data.lecture.date).getHours().toString();
          if (lec_time_hours.length == 1)
          {
            lec_time_hours = "0" + lec_time_hours;
          }
          lec_time_minutes = new Date(data.lecture.date).getMinutes().toString();
          if (lec_time_minutes.length == 1)
          {
            lec_time_minutes = "0" + lec_time_minutes;
          }
          lec_string = lec_date_string + " " + lec_time_hours + ":" + lec_time_minutes;
          data.lecture.date = lec_string

          activeLectureData = activeLectureBlock.data('info', data.lecture).data('info');
          activeLectureData.edited = {};
          activeLectureBlock.removeClass('lecture-btn--dummy');
          $('#lecture-title').change();
          activeLectureBlock.click();
          var hasEdited = false;
          $('#lecture-list .lecture-btn').each(function (index, ele)
          {
            if (Object.keys($(ele).data('info').edited).length || !$(ele).data('info').id)
            {
              hasEdited = true;
              return false;
            }
          });
          if (!hasEdited) $('#add-lecture-btn').prop('disabled', false);
          break;
        case 500:
          $('#save-lecture-btn').prop('disabled', false);
          swal({
            title: 'Case 500',
            text: 'Return case 500.',
            type: 'error',
            confirmButtonText: 'OK'
          });
          break;
        default:
          $('#save-lecture-btn').prop('disabled', false);
          swal({
            title: 'Failed to save changes',
            text: 'Unexpected error happended! Please try again and contact us if problem persists.',
            type: 'error',
            confirmButtonText: 'OK'
          });
          break;
      }
    },
    error: function (error)
    {
      $('#save-lecture-btn').prop('disabled', false);
      swal({
        title: 'Failed to save changes',
        text: 'Unexpected error happended! Please try again and contact us if problem persists.',
        type: 'error',
        confirmButtonText: 'OK'
      });
    }
  });
}

async function add_multiple_lectures(startDate, courseData, courseId)
{
  var repeatDays = [];
  if ($('#lecture-repeat-1').prop('checked'))
  {
    repeatDays.push(1);
  }
  if ($('#lecture-repeat-2').prop('checked'))
  {
    repeatDays.push(2);
  }
  if ($('#lecture-repeat-3').prop('checked'))
  {
    repeatDays.push(3);
  }
  if ($('#lecture-repeat-4').prop('checked'))
  {
    repeatDays.push(4);
  }
  if ($('#lecture-repeat-5').prop('checked'))
  {
    repeatDays.push(5);
  }
  datesToAdd = computeDates(startDate, repeatDays, $('#repeatWeeks').val());
  console.log('ADDING RECURRING LECTURES');
  var countAdded = 0;
  var start_index = $('#lecture-list button').length;
  var index_increment = 0;

  // (async () => {
  //   const res = await fetch(`https://api.github.com/users/jameshibbard`);
  //   const json = await res.json();
  //   console.log(json.public_repos);
  //   console.log("Hello!");
  // })();
  All_lecture_blocks = [];
  All_lecture_data = [];
  All_post_data = [];
  while (countAdded < datesToAdd.length)
  {
    console.log('Adding lecture # ', countAdded + 1, ' - date ', datesToAdd[countAdded]);
    var tmpMonth = (datesToAdd[countAdded].getMonth() + 1).toString();
    if (tmpMonth.length < 2)
    {
      tmpMonth = '0' + tmpMonth;
    }
    var week_day = datesToAdd[countAdded].getDay();
    if ($('#lecture-repeat-1').prop('checked') && week_day == 1)
    {
      lec_time = $('#mon-lecture-time').val();
    }
    if ($('#lecture-repeat-2').prop('checked') && week_day == 2)
    {
      lec_time = $('#tu-lecture-time').val();
    }
    if ($('#lecture-repeat-3').prop('checked') && week_day == 3)
    {
      lec_time = $('#wed-lecture-time').val();
    }
    if ($('#lecture-repeat-4').prop('checked') && week_day == 4)
    {
      lec_time = $('#th-lecture-time').val();
    }
    if ($('#lecture-repeat-5').prop('checked') && week_day == 5)
    {
      lec_time = $('#fri-lecture-time').val();
    }

    if (datesToAdd[countAdded] == startDate)
    {
      hours_string = startDate.getHours().toString();
      if (hours_string.length == 1)
      {
        hours_string = "0" + hours_string;
      }
      minutes_string = startDate.getMinutes().toString();
      if (minutes_string.length == 1)
      {
        minutes_string = "0" + minutes_string;
      }
      var lectureDateString = datesToAdd[countAdded].getFullYear().toString() + '-' + tmpMonth + '-' + datesToAdd[countAdded].getDate().toString() + " " + hours_string + ':' + minutes_string;
    }
    else
    {
      var lectureDateString = datesToAdd[countAdded].getFullYear().toString() + '-' + tmpMonth + '-' + datesToAdd[countAdded].getDate().toString() + " " + lec_time.toString();
    }
    // var lectureTitleString = 'Lecture ' + (countAdded+1).toString();
    var activeLectureBlock = $('#lecture-list button.on'),
      activeLectureData = activeLectureBlock.data('info'),
      postData = activeLectureData.id ?
        $.extend({ id: activeLectureData.id }, activeLectureData.edited) :
        $.extend({
          cid: courseData.cid,
          title: lectureTitleString,
          date: lectureDateString,
          passcode: courseData.passcode,
          questions: activeLectureData.questions,
          index: start_index + index_increment// + 1
        }, activeLectureData.edited);
    // if (postData.date) postData.date = new moment(new Date(postData.date.substring(0, 10) + ' 00:00')).format('MM/DD/YYYY HH:mm');
    if (postData.date) postData.date = new moment(new Date(postData.date)).format('MM/DD/YYYY HH:mm');
    // postData.date = new moment(lectureDateString + '00:00').format('MM/DD/YYYY');
    // Added by Ahmed Magooda/////////////////////////////////////////////////////////
    postData.date = new moment(new Date(lectureDateString)).format('MM/DD/YYYY HH:mm');
    var lectureTitleString = activeLectureData.edited.title + '_' + (countAdded + 1).toString();
    ///////////////////////////////////////////////////////////////////////////////////
    postData.title = lectureTitleString;
    if (postData.questions) postData.questions = JSON.stringify(postData.questions);
    $('#save-lecture-btn').prop('disabled', true);

    All_lecture_blocks.push(activeLectureBlock);
    All_lecture_data.push(activeLectureData);
    All_post_data.push(postData);
    // wait_res = await setLecinDB(courseId, postData, activeLectureData, activeLectureBlock);
    // await $.ajax({
    //   url: config.backend_base + '/lecture/' + courseId,
    //   data: postData,
    //   dataType: 'json',
    //   method: activeLectureData.id ? 'PUT' : 'POST',
    //   success: function (data) {
    //     $('#save-lecture-btn').prop('disabled', false);
    //     switch (data.status) {
    //       case 403:
    //         document.location = '/';
    //         break;
    //       case 200:
    //         activeLectureData = activeLectureBlock.data('info', data.lecture).data('info');
    //         activeLectureData.edited = {};
    //         activeLectureBlock.removeClass('lecture-btn--dummy');
    //         $('#lecture-title').change();
    //         activeLectureBlock.click();
    //         var hasEdited = false;
    //         $('#lecture-list .lecture-btn').each(function (index, ele) {
    //           if (Object.keys($(ele).data('info').edited).length || !$(ele).data('info').id) {
    //             hasEdited = true;
    //             return false;
    //             // resolve(false);
    //           }
    //         });
    //         if (!hasEdited) $('#add-lecture-btn').prop('disabled', false);
    //         break;
    //       case 500:
    //         $('#save-lecture-btn').prop('disabled', false);
    //         swal({
    //           title: 'Case 500',
    //           text: 'Return case 500.',
    //           type: 'error',
    //           confirmButtonText: 'OK'
    //         });
    //         break;
    //       default:
    //         $('#save-lecture-btn').prop('disabled', false);
    //         swal({
    //           title: 'Failed to save changes',
    //           text: 'Unexpected error happended! Please try again and contact us if problem persists.',
    //           type: 'error',
    //           confirmButtonText: 'OK'
    //         });
    //         break;
    //     }
    //     // resolve("Success");
    //   },
    //   error: function (error) {
    //     $('#save-lecture-btn').prop('disabled', false);
    //     swal({
    //       title: 'Failed to save changes',
    //       text: 'Unexpected error happended! Please try again and contact us if problem persists.\noutside ajax call',
    //       type: 'error',
    //       confirmButtonText: 'OK'
    //     });
    //   }
    // });
    // sleep(400)
    countAdded++;
    index_increment++;
  }
  // reload page to see the updated lectures list
  // swal({
  //   title: 'Success',
  //   text: 'Click OK to see the update.',
  //   type: 'success',
  //   confirmButtonText: 'OK'
  // },
  //   function () { location.reload() });

  for (var i = 0; i < All_post_data.length; i++)
  {
    let x = await setLecinDB(courseId, All_post_data[i], All_lecture_data[i], All_lecture_blocks[i], finishAddingLectures);
  }
  let x = await finishAddingLectures()
}


function finishAddingLectures()
{
  return new Promise((resolve, reject) =>
  {
    swal({
      title: 'Success',
      text: 'Click OK to see the update.',
      type: 'success',
      confirmButtonText: 'OK'
    },
      function () { location.reload() });
    resolve("success");
  });
}

// async function setAllLecinDB(courseId, _All_post_data, _All_lecture_data, _All_lecture_blocks, callback)
// {
//     try {
//       for(var i =0; i < All_post_data.length; i++) 
//       {
//         let response = await setLecinDB();  
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

// }

function setLecinDB(courseId, postData, activeLectureData, activeLectureBlock, callback)
{
  return new Promise((resolve, reject) =>
  {
    $.ajax({
      url: config.backend_base + '/lecture/' + courseId,
      data: postData,
      dataType: 'json',
      method: activeLectureData.id ? 'PUT' : 'POST',
      success: function (data)
      {
        $('#save-lecture-btn').prop('disabled', false);
        switch (data.status)
        {
          case 403:
            document.location = '/';
            resolve("Success");
            break;
          case 200:
            activeLectureData = activeLectureBlock.data('info', data.lecture).data('info');
            activeLectureData.edited = {};
            activeLectureBlock.removeClass('lecture-btn--dummy');
            $('#lecture-title').change();
            activeLectureBlock.click();
            var hasEdited = false;
            $('#lecture-list .lecture-btn').each(function (index, ele)
            {
              if (Object.keys($(ele).data('info').edited).length || !$(ele).data('info').id)
              {
                hasEdited = true;
                // return false;
                // resolve(false);
              }
            });
            if (!hasEdited) $('#add-lecture-btn').prop('disabled', false);
            resolve("Success");
            break;
          case 500:
            $('#save-lecture-btn').prop('disabled', false);
            swal({
              title: 'Case 500',
              text: 'Return case 500.',
              type: 'error',
              confirmButtonText: 'OK'
            });
            resolve("Success");
            break;
          default:
            $('#save-lecture-btn').prop('disabled', false);
            swal({
              title: 'Failed to save changes',
              text: 'Unexpected error happended! Please try again and contact us if problem persists.',
              type: 'error',
              confirmButtonText: 'OK'
            });
            resolve("Success");
            break;
        }
        // resolve("Success");
      },
      error: function (error)
      {
        $('#save-lecture-btn').prop('disabled', false);
        swal({
          title: 'Failed to save changes',
          text: 'Unexpected error happended! Please try again and contact us if problem persists.\noutside ajax call',
          type: 'error',
          confirmButtonText: 'OK'
        });
        resolve("Fail");
      }
    });
  });
  //  callback();
}



// function getRandomNumber() {
//   return new Promise(function(resolve, reject) {
//     setTimeout(function() {
//       const randomValue = Math.random();
//       const error = randomValue > .8 ? true : false;
//       if (error) {
//         reject(new Error('Ooops, something broke!'));
//       } else {
//         resolve(randomValue);
//       }
//     }, 2000);
//   }); 
// }


function switchCourse(e)
{
  ///// Added by Ahmed Magooda/////////////////////////////////
  console.log("Showing lecture spinner");
  // Spinner.show();
  var lectureLoader = Rocket.loader({
    // color of the loader
    // aqua black blue green grey-blue grey-blue-dark orange pink purple red white yellow
    colour: 'black',
    // animation delay
    delay: 0,
    // target container
    target: $('main > .mdl-grid'),
    // appends the loader to the target element as opposed to hiding
    append: false,
    // small, large or medium
    size: 'large',
    // dots pulse spinner
    type: 'pulse'
  });
  //////////////////////////////////////////////////////////////
  courseData = e ? $(e.target).closest('li').data('info') : courseData;
  selected_course_data = courseData;
  var courseId = courseData.id;
  var passcode = courseData.passcode;
  $('#lecture-course-name').text($(this).closest('li').text());
  $('#lecture-list').empty();
  clearLectureEditor();
  $('#lecture-edit').hide();
  $.getJSON(config.backend_base + '/lecture/' + courseId, function (data)
  {
    console.log(data);
    if (data.status == 200)
    {
      lectures = data.lectures, lectureEvents = [];
      console.log(lectures);
      // console.log("empty lectures");
      $('.mdl-card__supporting-text.lecture-info h4 i').text(lectures.length);
      lectures.sort(function (a, b)
      {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      for (var i = 0; i < lectures.length; i++)
      {
        var lecture = lectures[i],
          lectureBlock = $('<button class="mdl-button mdl-js-button mdl-js-ripple-effect lecture-btn"></button>');
        lecture.edited = {};

        // lectureBlock.html('<span class="num">' + parseInt(i + 1) + '</span><span class="date">' + lecture.date.substring(0, 10) + '</span><span class="lecture">' + lecture.title + '</span>');
        lec_date_string = lecture.date.substring(0, 10);// + " " + lecture.date.substring(12, 16)
        lec_time_hours = new Date(lecture.date).getHours().toString();
        if (lec_time_hours.length == 1)
        {
          lec_time_hours = "0" + lec_time_hours;
        }
        lec_time_minutes = new Date(lecture.date).getMinutes().toString();
        if (lec_time_minutes.length == 1)
        {
          lec_time_minutes = "0" + lec_time_minutes;
        }
        lec_string = lec_date_string + " " + lec_time_hours + ":" + lec_time_minutes;

        lecture.date = lec_string;
        lectureBlock.data('info', lecture);
        lectureBlock.html('<span class="num">' + parseInt(i + 1) + '</span><span class="date">' + lec_string + '</span><span class="lecture">' + lecture.title + '</span>');
        lectureBlock.click(setLectureInfo);
        $('#lecture-list').append(lectureBlock);
        componentHandler.upgradeElement(lectureBlock[0]);
      }
    } else if (data.status == 403)
    {
      document.location = '/';
      console.log("here line 540");
    } else if (data.status == 500)
    {
      console.log("here line 542");
      handleISE(data.error || 'An unknown server error occured!');
      console.log(data.error);
    } else
    {
      console.log("here line 546");
      handleISE('An unknown server error occured!');
      console.log(data.error);
    }
  }).error(function (error)
  {
    handleISE('An unknown server error occured! ERR_CODE: ' + error);
  });

  $('#save-lecture-btn, #undo-change-btn').prop('disabled', true);
  $('#add-lecture-btn').off('click').click(function ()
  {
    $('#lecture-edit').show();
    var todayString = new Date().toISOString().substring(0, 10) + " " + new Date().toTimeString().substring(0, 5);
    if ($('#lecture-list button.lecture-btn--dummy').length)
    {
      $('#lecture-list button.lecture-btn--dummy').click();
    } else
    {
      $('#lecture-list button').removeClass('on');
      var dummyLectureBlock = $('<button class="mdl-button mdl-js-button mdl-js-ripple-effect lecture-btn lecture-btn--dummy on edited"></button>');
      dummyLectureBlock.html('<span class="num">1</span><span class="date">' + todayString + '</span><span class="lecture">Untitled Lecture</span>');
      dummyLectureBlock.data('info', {
        title: '',
        cid: courseId,
        date: todayString,//new Date(todayString).toISOString(),
        questions: courseData.questions,
        edited: true
      });
      dummyLectureBlock.click(setLectureInfo);
      $('#delete-lecture-btn').prop('disabled', false);
      var num = 1;
      if ($('#lecture-list .lecture-btn').length)
      {
        $('#lecture-list .lecture-btn').each(function (index, ele)
        {
          $(ele).find('.num').text(num++);
          if ($(ele).data('info').date > dummyLectureBlock.data('info').date)
          {
            dummyLectureBlock.find('.num').text(num - 1);
            $(ele).before(dummyLectureBlock).find('.num').text(num++);
          } else if ($(ele).is(':last-child'))
          {
            $(ele).after(dummyLectureBlock);
            dummyLectureBlock.find('.num').text(num++);
          }
        });
      } else
      {
        $('#lecture-list').append(dummyLectureBlock);
      }
      $('#add-lecture-btn').prop('disabled', true);
      $('#delete-lecture-btn').prop('disabled', false);
      $('.lecture-info h4 i').text(parseInt($('.lecture-info h4 i').text()) + 1);
      componentHandler.upgradeElement(dummyLectureBlock.get(0));
    }
    clearLectureEditor();
    $('#delete-lecture-btn').prop('disabled', false);
  });
  $('#lecture-title, #lecture-date, #lecture-questions input, #lecture-special-question').focus(function (e)
  {
    if (!$('#lecture-list button.on').length)
    {
      $('#add-lecture-btn').click();
      e.preventDefault();
    }
  }).change(function ()
  {
    var activeLectureBlock = $('#lecture-list button.on'),
      activeLectureData = activeLectureBlock.data('info'),
      titleValue = $('#lecture-title').val(),
      dateValue = $('#lecture-date').val(),
      questionsValue = [];
    if (!activeLectureBlock.length) return false;
    activeLectureData.edited = {};
    if (titleValue != activeLectureData.title)
    {
      activeLectureData.edited.title = titleValue;
    }

    if (dateValue != activeLectureData.date.substring(0, 21))
    {
      activeLectureData.edited.date = dateValue;
    }
    if ($('#lecture-list .lecture-btn').not('.on').length)
    {
      var num = 1, found = false;
      $('#lecture-list .lecture-btn').not('.on').each(function (index, ele)
      {
        $(ele).find('.num').text(num++);
        if (found) return true;
        if ($(ele).data('info').date.substring(0, 10) > dateValue)
        {
          activeLectureBlock.find('.num').text(num - 1);
          $(ele).before(activeLectureBlock).find('.num').text(num++);
          setTimeout(function ()
          {
            componentHandler.downgradeElements(activeLectureBlock.toArray());
            componentHandler.downgradeElements(activeLectureBlock.toArray());
            componentHandler.upgradeElement(activeLectureBlock.get(0));
          }, 100);
          found = true;
        } else if ($(ele).is(':last-child'))
        {
          $(ele).after(activeLectureBlock);
          activeLectureBlock.find('.num').text(num++);
          setTimeout(function ()
          {
            componentHandler.downgradeElements(activeLectureBlock.toArray());
            componentHandler.downgradeElements(activeLectureBlock.toArray());
            componentHandler.upgradeElement(activeLectureBlock.get(0));
          }, 100);
        }
      });
    }
    if ($(this).is('#lecture-special-question') &&
      $('#lecture-special-question').prop('checked'))
    {
      $('#lecture-questions input').each(function (index, checkbox)
      {
        if (activeLectureData.questions.indexOf('q' + $(checkbox).data('id')) > -1)
        {
          $(checkbox).prop('checked', true).closest('.mdl-checkbox').addClass('is-checked');
        } else
        {
          $(checkbox).prop('checked', false).closest('.mdl-checkbox').removeClass('is-checked');
        }
      });
      questionsValue = activeLectureData.questions;
    } else if ($('#lecture-special-question').prop('checked'))
    {
      $('#lecture-questions input').each(function (index, checkbox)
      {
        if ($(checkbox).prop('checked'))
        {
          questionsValue.push('q' + $(checkbox).data('id'));
        }
      });
    } else
    {
      questionsValue = courseData.questions;
    }
    if ($(activeLectureData.questions).not(questionsValue).length !== 0 ||
      $(questionsValue).not(activeLectureData.questions).length !== 0)
    {
      activeLectureData.edited.questions = questionsValue;
    }
    activeLectureBlock.html('<span class="num">' + activeLectureBlock.find('.num').text() + '</span><span class="date">' + dateValue + '</span><span class="lecture">' + (titleValue || 'Untitled Lecture') + '</span>');
    if (Object.keys(activeLectureData.edited).length || !activeLectureData.id)
    {
      activeLectureBlock.addClass('edited');
    } else
    {
      activeLectureBlock.removeClass('edited');
    }
    $('#save-lecture-btn, #undo-change-btn').prop('disabled', !Object.keys(activeLectureData.edited).length && activeLectureData.id);
    if (!activeLectureData.id) $('#undo-change-btn').prop('disabled', true);
    if (!$('#save-lecture-btn').prop('disabled'))
    {
      $('#add-lecture-btn').prop('disabled', true);
    } else
    {
      var hasEdited = false;
      $('#lecture-list .lecture-btn').each(function (index, ele)
      {
        if (Object.keys($(ele).data('info').edited).length || !$(ele).data('info').id)
        {
          hasEdited = true;
          return false;
        }
      });
      if (!hasEdited) $('#add-lecture-btn').prop('disabled', false);
    }
  }).off('keyup').keyup(function ()
  {
    $(this).change();
  });
  $('#lecture-special-question').change(function (e)
  {
    if (e.target.checked)
    {
      $('#lecture-questions').show();
      componentHandler.upgradeElements($('#lecture-questions .mdl-checkbox').toArray());
    } else
    {
      $('#lecture-questions').hide();
    }
  });
  $('#delete-lecture-btn').off('click').click(function ()
  {
    var activeLectureBlock = $('#lecture-list button.on'),
      activeLectureData = activeLectureBlock.data('info');
    if (activeLectureData.id)
    {
      $('#delete-lecture-btn').prop('disabled', true);
      $.ajax({
        url: config.backend_base + '/lecture/' + courseId,
        data: { id: activeLectureData.id },
        dataType: 'json',
        method: 'DELETE',
        success: function (data)
        {
          $('#delete-lecture-btn').prop('disabled', false);
          switch (data.status)
          {
            case 403:
              document.location = '/';
              break;
            case 200:
              activeLectureBlock.remove();
              clearLectureEditor();
              var hasEdited = false, num = 1;
              $('#lecture-list .lecture-btn').each(function (index, ele)
              {
                $(ele).find('.num').text(num++);
              });
              $('#lecture-list .lecture-btn').each(function (index, ele)
              {
                if (Object.keys($(ele).data('info').edited).length || !$(ele).data('info').id)
                {
                  hasEdited = true;
                  return false;
                }
              });
              if (!hasEdited) $('#add-lecture-btn').prop('disabled', false);
              $('.lecture-info h4 i').text(parseInt($('.lecture-info h4 i').text()) - 1);
              break;
            case 500:
            default:
              $('#delete-lecture-btn').prop('disabled', false);
              swal({
                title: 'Failed to delete lecture',
                text: 'Unexpected error happended! Please try again and contact us if problem persists.',
                type: 'error',
                confirmButtonText: 'OK'
              });
              break;
          }
        },
        error: function (error)
        {
          $('#delete-lecture-btn').prop('disabled', false);
          swal({
            title: 'Failed to delete lecture',
            text: 'Unexpected error happended! Please try again and contact us if problem persists.',
            type: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    } else
    {
      activeLectureBlock.remove();
      clearLectureEditor();

      var hasEdited = false;
      $('#lecture-list .lecture-btn').each(function (index, ele)
      {
        if (Object.keys($(ele).data('info').edited).length || !$(ele).data('info').id)
        {
          hasEdited = true;
          return false;
        }
      });
      if (!hasEdited) $('#add-lecture-btn').prop('disabled', false);
      $('.lecture-info h4 i').text(parseInt($('.lecture-info h4 i').text()) - 1);
    }
    $('#lecture-edit').hide();
  });
  $('#undo-change-btn').off('click').click(function ()
  {
    var activeLectureBlock = $('#lecture-list button.on'),
      activeLectureData = activeLectureBlock.data('info');
    activeLectureData.edited = {};
    activeLectureBlock.click();
  });
  //Added by Ahmed Magooda//////////////////////////
  // Disable the days checkboxes
  enable_disable(true);
  $('#lecture-repeat-question').off('click').click(function ()
  {
    if ($('#lecture-repeat-question').prop('checked'))
    {
      // Enable the days checkboxes
      enable_disable(false);
    }
    else
    {
      enable_disable(true);
    }
    //////////////////////////////////////////////////
  });
  // Saving the lectures to database
  $('#save-lecture-btn').off('click').click(function ()
  {
    formDate = new Date($('#lecture-date').val())
    startDate = new Date(formDate);
    startDate.setDate(formDate.getDate() + 1); //for some reason the datepicker object returns date as 1 day before the one selected
    if ($('#lecture-repeat-question').prop('checked'))
    {
      // REPEATING LECTURES
      add_multiple_lectures(startDate, courseData, courseId);
    }
    else
    {
      // add single lecture
      add_single_lecture(courseData, courseId);
    }
    $('#lecture-edit').hide();
  });
  //////////// Added by Ahmed Magooda ///////////
  // loading_spinner.stop()
  console.log("hiding lecture spinner");
  // Spinner.hide()
  lectureLoader.remove();
  ///////////////////////////////////////////////
}

function setLectureInfo(e)
{
  $('#lecture-edit').show();
  var lectureDiv = $(e.target).closest('.mdl-button'),
    lectureData = lectureDiv.data('info'),
    lectureTitle = lectureData.edited.title || lectureData.title,
    lectureDate = lectureData.edited.date || lectureData.date,
    lectureQuestions = lectureData.edited.questions || lectureData.questions;
  // lectureRepeat = lectureData.edited.repeat
  $('#lecture-list .mdl-button').removeClass('on');
  lectureDiv.addClass('on');
  $('#lecture-title').val(lectureTitle).closest('.mdl-textfield').get(0).MaterialTextfield.boundUpdateClassesHandler();
  // $('#lecture-date').val(lectureDate.substring(0, 10)).bootstrapMaterialDatePicker('setDate', lectureDate.substring(0, 10));
  var lec_string = new Date(lectureDate).toISOString().substring(0, 10) + " " + (new Date(lectureDate)).toTimeString().substring(0, 5);
  $('#lecture-date').val(lec_string).bootstrapMaterialDatePicker('setDate', lec_string);
  $('#delete-lecture-btn').prop('disabled', false);
  $('#save-lecture-btn, #undo-change-btn').prop('disabled', !Object.keys(lectureData.edited).length);
  if (!lectureDate.id) $('#undo-change-btn').prop('disabled', true);
  if ($(lectureQuestions).not(courseData.questions).length === 0 &&
    $(courseData.questions).not(lectureQuestions).length === 0)
  {
    $('#lecture-special-question').prop('checked', false).closest('.mdl-switch').removeClass('is-checked');
    $('#lecture-questions').hide();
  } else
  {
    $('#lecture-questions').show();
    $('#lecture-special-question').prop('checked', true).closest('.mdl-switch').addClass('is-checked');
    $('#lecture-questions input').each(function (index, checkbox)
    {
      if (lectureQuestions.indexOf('q' + $(checkbox).data('id')) > -1)
      {
        $(checkbox).prop('checked', true).closest('.mdl-checkbox').addClass('is-checked');
      } else
      {
        $(checkbox).prop('checked', false).closest('.mdl-checkbox').removeClass('is-checked');
      }
    });
  }
  $('#lecture-title').change();
  //////////////////////////////////////////////////
}

function show_reflection_information(uniqueUserIds, current_question_id, courseCid, current_lecture_num, qualityDistribution, qualityChart) 
{
  for (var uniqueUserIdIndex = 0; uniqueUserIdIndex < uniqueUserIds.length; uniqueUserIdIndex++)
  {
    // get each individual reflection with userID, courseNumber, lectureNumber and QuestionNumber
    $.getJSON(config.backend_base + '/reflection/' + uniqueUserIds[uniqueUserIdIndex] + '/' + courseCid + '/' + current_lecture_num, function (data)
    {
      // $.getJSON(config.backend_base + '/reflection/' + courseCid, function(data) {
      // console.log("HERE 1");
      if (data.status == 200)
      {
        reflections = data.reflections, reflectionEvents = [];
      }

      for (var reflection_index = 0; reflection_index < reflections.length; reflection_index++)
      {
        var reflection = reflections[reflection_index],
          reflectionBlock = $('<label class="reflection-btn"></label>');
        var tempRefContent = '';
        if (current_question_id == 1)
        {
          tempRefContent = reflection.id.q1;
        }
        if (current_question_id == 2)
        {
          tempRefContent = reflection.id.q2;
        }
        if (current_question_id == 3)
        {
          tempRefContent = reflection.id.q3;
        }
        if (current_question_id == 4)
        {
          tempRefContent = reflection.id.q4;
        }
        if (current_question_id == 5)
        {
          tempRefContent = reflection.id.q5;
        }
        if (current_question_id == 6)
        {
          tempRefContent = reflection.id.q6;
        }
        if (current_question_id == 7)
        {
          tempRefContent = reflection.id.q7;
        }
        var qualityRef = getRefQuality(tempRefContent);

        function getRefQuality(str)
        {
          var wc = WordCount(str);
          if (wc <= 2)
          {
            return 1;
          } else if (wc <= 5)
          {
            return 2;
          } else if (wc <= 10)
          {
            return 3;
          } else if (wc <= 15)
          {
            return 4;
          } else
          {
            return 5;
          }
        }
        function WordCount(str)
        {
          return str.split(' ').length;
        }
        var temp = qualityDistribution[qualityRef - 1];
        qualityDistribution[qualityRef - 1] = temp + 1;
        qualityChart.data.datasets[0].data = qualityDistribution;
        qualityChart.update();

        var refContent = '<div><p class="quality_ref quality_ref_' + qualityRef + '">' + tempRefContent + ' (Quality: ' + qualityRef + ')</p></div>';
        reflectionBlock.html(refContent);
        $('#reflection_list').append(reflectionBlock);


        console.log(reflectionBlock);

      }

    });
  }

}

function get_course_reflections(courseCid, passcode)
{
  All_reflections = []
  $.getJSON(config.backend_base + '/reflections/' + courseCid + '/' + passcode,
    function (data)
    {
      if (data.status == 200)
      {
        reflections = data.reflections, summarizationEvents = [];
        for (var i = 0; i < reflections.length; i++)
        {
          console.log(reflections[i]);
          All_reflections.push(reflections[i]);
        }
        // return reflections;
      }
      else if (data.status == 403)
      {
        document.location = '/';
        // All_reflections = [];
      }
      else if (data.status == 500)
      {
        handleISE(data.error || 'An unknown server error occured!');
        // return [];
      }
      else
      {
        handleISE('An unknown server error occured!');
        // return [];
      }
    }).error(function (error)
    {
      handleISE('An unknown server error occured! ERR_CODE: ' + error);
      // return [];
    });

  return All_reflections;
}

function show_external_information(uniqueUserIds, current_question_id, courseCid, current_lecture_num, qualityDistribution, qualityChart)
{
  $.getJSON(config.backend_base + '/summarization/' + courseCid,
    function (data)
    {
      if (data.status == 200)
      {
        summarizations = data.summarizations, summarizationEvents = [];
        var briefCount = 0;
        var sumContent = '';
        var sumBriefContent = '';
        var briefDoneFlag = 1;
        for (var i = 0; i < summarizations.length; i++)
        {
          var summarization = summarizations[i]; // summarizationBlock = $('<label class="summarization-btn"></label>');
          if (summarization.id.lecture_number != current_lecture_num)
          {
            continue;
          }
          // var actualLectureNumber = JSON.stringify(summarization.id.lecture_number);
          // sumContent = sumContent + '<div class="' + i + '" id="' + actualLectureNumber + '">';//'<p class="lecture" id="{$i}">';
          if (summarization.id.q1_summaries || summarization.id.q2_summaries || summarization.id.q3_summaries || summarization.id.q4_summaries ||
            summarization.id.q5_summaries || summarization.id.q6_summaries || summarization.id.q7_summaries)
          {
            // sumContent = sumContent + '<b><hr_ />Lecture ' + actualLectureNumber + '<hr_/></b><br><br>';
          }
          var extra_info_text = '';
          var p1Sum = null;

          if (summarization.id.q1_summaries && current_question_id == 1)
          {
            p1Sum = JSON.parse(summarization.id.q1_summaries);
          }
          else if (summarization.id.q2_summaries && current_question_id == 2)
          {
            p1Sum = JSON.parse(summarization.id.q2_summaries);
          }
          else if (summarization.id.q3_summaries && current_question_id == 3)
          {
            p1Sum = JSON.parse(summarization.id.q3_summaries);
          }
          else if (summarization.id.q4_summaries && current_question_id == 4)
          {
            p1Sum = JSON.parse(summarization.id.q4_summaries);
          }
          else if (summarization.id.q5_summaries && current_question_id == 5)
          {
            p1Sum = JSON.parse(summarization.id.q5_summaries);
          }
          else if (summarization.id.q6_summaries && current_question_id == 6)
          {
            p1Sum = JSON.parse(summarization.id.q6_summaries);
          }
          else if (summarization.id.q7_summaries && current_question_id == 7)
          {
            p1Sum = JSON.parse(summarization.id.q7_summaries);
          }
          if (p1Sum != null)
          {
            // var sum_weight = sum(p1Sum.weight);
            var sum_weight = 0;
            for (var i = 0; i < p1Sum.weight.length; i++)
            {
              if (isNaN(p1Sum.weight[i]))
              {
                continue;
              }
              sum_weight += Number(p1Sum.weight[i]);
            }

            for (var phrase_index = 0; phrase_index < p1Sum.summaryText.length; phrase_index++) 
            {
              var current_percentage = Math.round((p1Sum.weight[phrase_index] / sum_weight) * 100);
              extra_info_text = '<horizontalLine><p><ins><strong><font size="4">Summary Phrase: </font></ins><mark><br />' + p1Sum.summaryText[phrase_index] + '  (' + current_percentage + '%)</mark></strong></p>';
              extra_info_text = extra_info_text + '<p><ins><strong><font size="4">Similar Phrases: </font></ins></strong><br /><horizontalLine>';
              for (var cluster_phrases_index = 0; cluster_phrases_index < p1Sum.phrases[phrase_index].length; cluster_phrases_index++)
              {
                extra_info_text = extra_info_text + '* ' + p1Sum.phrases[phrase_index][cluster_phrases_index] + '<br />';
              }
              extra_info_text = extra_info_text + '<p><ins><strong><font size="4">Source Reflections: </font></ins></strong><br /><horizontalLine>';
              for (var cluster_phrases_index = 0; cluster_phrases_index < p1Sum.reflections[phrase_index].length; cluster_phrases_index++)
              {
                extra_info_text = extra_info_text + '- ' + p1Sum.reflections[phrase_index][cluster_phrases_index] + '<br />';
              }
              reflectionBlock = $('<label class="reflection-btn"></label>');
              var refContent = '<div><p class="extra_info_"' + p1Sum.summaryText[phrase_index] + '>' + extra_info_text + '</p></div><br /><br />';
              reflectionBlock.html(refContent);
              $('#reflection_list').append(reflectionBlock);
            }
            percentage_weights = []
            for (var phrase_index = 0; phrase_index < p1Sum.summaryText.length; phrase_index++) 
            {
              var current_percentage = Math.round((p1Sum.weight[phrase_index] / sum_weight) * 100);
              percentage_weights.push(current_percentage);
            }
            qualityChart.data.datasets[0].data = percentage_weights;
            qualityChart.update();
            break;
          }

        }
      }

    });
}

function get_ref_chart()
{
  var qualityChartCanvas = $("<canvas class=phrase-canv id=\"qualityChart\"></canvas>");//'<div>'+ qualityDistribution[0] +'</div><div>'+ qualityDistribution[1] +'</div><div>'+ qualityDistribution[2] +'</div><div>'+ qualityDistribution[3] +'</div><div>'+ qualityDistribution[4] +'</div>';
  // qualityChartCanvas[0].width = 5;
  // qualityChartCanvas[0].height = 4;
  // qualityChartCanvas[0].style.width = '8px';
  // qualityChartCanvas[0].style.height = '6px';

  $('#reflection_list').append(qualityChartCanvas);

  var ctx = $("canvas#qualityChart")[0].getContext('2d');
  console.log(ctx);
  var qualityChart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: ['1', '2', '3', '4', '5'],
      datasets: [{
        label: 'Quality Scores',
        data: [0, 0, 0, 0, 0],
      }]
    },

    // Configuration options go here
    options: {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Percentage',
            fontSize: 15,
            padding: 10
          },
          ticks: {
            suggestedMin: 0
          }
        }]
      }
    }
  });

  qualityChartCanvas.click(function (evt)
  {
    var activeBars = qualityChart.getElementsAtEvent(evt);
    var refList = $('#reflection_list');
    if (!activeBars.length)
    {
      refList.attr('class', 'ref_all');
    } else
    {
      console.log(activeBars);
      window.activeBar = activeBars[0];

      // refList.attr('class', 'ref_' + (activeBars[0]. + 1))
      refList.attr('class', 'ref_' + (activeBars[0]._index + 1));
    }
  });
  return [qualityChartCanvas, qualityChart]
}

function get_lecture_graph(reflection_dictionary, max_lec_num)
{
  var qualityChartCanvas = $('<canvas class=phrase-canv id="numReflectionLectures" width="900" height="400"></canvas>');

  if (document.getElementById("numReflectionLectures") == null)
  {
    $('#lec_graph').append(qualityChartCanvas);
  }
  else
  {
    $('#numReflectionLectures').remove();
    $('#lec_graph').append(qualityChartCanvas);
  }
  all_labels = []
  all_vals = []
  all_border_colors = []
  if (max_lec_num < 15)
  {
    max_lec_num = 15;
  }
  for (var i = 1; i <= max_lec_num; i++)
  {
    all_labels.push('Lec_' + i);
    all_border_colors.push('rgba(0, 0, 0, 1)')
    if (i in reflection_dictionary)
    {
      all_vals.push(i);
    }
    else
    {
      all_vals.push(0);
    }
  }
  var ctx = $("canvas#numReflectionLectures")[0].getContext('2d');
  console.log(ctx);
  var qualityChart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',
    // The data for our dataset
    data: {
      labels: all_labels,
      datasets: [{
        label: 'Number of Reflections submitted per lecture',
        data: all_vals,
        borderColor: all_border_colors,
        borderWidth: 2
      }]
    },

    // Configuration options go here
    options: {
      // title: {
      //   display: true,
      //   text: 'Custom Chart Title'
      // },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Num of Reflections',
            fontSize: 15,
            fontColor: 'black',
            padding: 10
          },
          ticks: {
            suggestedMin: 0,
            stepSize: 1,
            beginAtZero: true,
            fontColor: 'black',
            fontSize: 15
          }
        }]

        // xAxes: [{
        //   scaleLabel: {
        //     // display: true,
        //     // labelString: 'Num of Reflections',
        //     fontSize: 15,
        //     fontColor: 'black',
        //     // padding: 10
        //   }
        // }]

      },
      legend: {
        labels: {
          fontColor: 'black',
          fontSize: 18
        }
      }
    }
  });

  qualityChartCanvas.click(function (evt)
  {
    var activeBars = qualityChart.getElementsAtEvent(evt);
    var refList = $('#reflection_list_2');
    if (!activeBars.length)
    {
      refList.attr('class', 'ref_all');
    } else
    {
      console.log(activeBars);
      window.activeBar = activeBars[0];

      // refList.attr('class', 'ref_' + (activeBars[0]. + 1))
      refList.attr('class', 'ref_' + (activeBars[0]._index + 1));
    }
  });

  return [qualityChartCanvas, qualityChart]
}

function get_phrase_chart()
{
  var qualityChartCanvas = $('<canvas class=phrase-canv id="numStudentsPhrase" width="700" height="400"></canvas>');

  if (document.getElementById("numStudentsPhrase") == null)
  {
    $('#reflection_list_2').append(qualityChartCanvas);
  }
  else
  {
    $('#numStudentsPhrase').remove();
    $('#reflection_list_2').append(qualityChartCanvas);
  }
  var ctx = $("canvas#numStudentsPhrase")[0].getContext('2d');

  // $("canvas#numStudentsPhrase")[0].width = 5;
  // $("canvas#numStudentsPhrase")[0].height = 4;
  // $("canvas#numStudentsPhrase")[0].style.width = '8px';
  // $("canvas#numStudentsPhrase")[0]..size = 0.1;//.style.height = '6px';

  console.log(ctx);
  var qualityChart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',
    // The data for our dataset
    data: {
      labels: ['Phrase_1', 'Phrase_2', 'Phrase_3', 'Phrase_4', 'Phrase_5'],
      datasets: [{
        label: 'Percentage of Number of Students per each phrase',
        data: [0, 0, 0, 0, 0],
        borderColor: [
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          // 'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2
      }]
    },

    // Configuration options go here
    options: {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Percentage',
            fontSize: 15,
            padding: 10
          },
          ticks: {
            suggestedMin: 0,
            fontColor: 'black',
            fontSize: 15,
          }
        }]
      },
      legend: {
        labels: {
          fontColor: 'black',
          fontSize: 18
        }
      }
    }
  });

  qualityChartCanvas.click(function (evt)
  {
    var activeBars = qualityChart.getElementsAtEvent(evt);
    var refList = $('#reflection_list_2');
    if (!activeBars.length)
    {
      refList.attr('class', 'ref_all');
    } else
    {
      console.log(activeBars);
      window.activeBar = activeBars[0];

      // refList.attr('class', 'ref_' + (activeBars[0]. + 1))
      refList.attr('class', 'ref_' + (activeBars[0]._index + 1));
    }
  });

  return [qualityChartCanvas, qualityChart]
}


function sleep(milliseconds)
{
  const date = Date.now();
  let currentDate = null;
  do
  {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


function validateTerm(tmpTerm)
{
  var tmpDate = new Date();
  var tmpMonth = tmpDate.getMonth() + 1;
  var tmpYear = tmpDate.getFullYear();
  var termMatch = {}
  termMatch["spring"] = [1];
  termMatch["summer"] = [2, 3, 4, 5];
  termMatch["fall"] = [6, 7, 8, 9];
  try
  {
    semester = tmpTerm.split(" ")[0];
    year_str = tmpTerm.split(" ")[1];
    year = parseInt(tmpTerm.split(" ")[1]);

    if (!termMatch[semester.toLowerCase()] || year_str.length > 4 || year_str.length < 4)
    {
      // return false;
      return { first: false, second: "syntax_error", };
    }
  }
  catch (err)
  {
    return { first: false, second: "syntax_error", };
  }
  if (parseInt(tmpTerm.split(" ")[1]) > tmpYear)
  {
    return { first: true, second: "OK", };
  }
  if (parseInt(tmpTerm.split(" ")[1]) < tmpYear)
  {
    return { first: false, second: "previous_year", };
  }
  if (termMatch[tmpTerm.split(" ")[0].toLowerCase()].includes(tmpMonth))
  {
    return { first: true, second: "OK", };
  }
  else
  {
    return { first: false, second: "previous_semester", };
  }
}

function validateTimeZone(tmpTimeZone) 
{
  var tmpTimeZoneStr = tmpTimeZone.toLowerCase();
  // if (tmpTimeZoneStr.includes("utc"))
  // {
  //   tmpTimeZoneStr = tmpTimeZoneStr.replace("utc", "");
  // }
  if (tmpTimeZoneStr.includes("+"))
  {
    tmpTimeZoneStr = tmpTimeZoneStr.replace("+", "");
  }
  try
  {
    tmpTimeZoneStr = tmpTimeZoneStr.replace(" ", "").replace(" ", "").replace(" ", "");
    if (parseInt(tmpTimeZoneStr) >= -11 && parseInt(tmpTimeZoneStr) <= 12) 
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  catch (err)
  {
    return false
  }

}


function ParseTimeZone(tmpTimeZone) 
{
  var tmpTimeZoneStr = tmpTimeZone.toLowerCase();
  if (tmpTimeZoneStr.includes("utc"))
  {
    tmpTimeZoneStr = tmpTimeZoneStr.replace("utc", "");
  }
  if (tmpTimeZoneStr.includes("utc"))
  {
    tmpTimeZoneStr = tmpTimeZoneStr.replace("+", "");
  }
  try
  {
    tmpTimeZoneStr = tmpTimeZoneStr.replace(" ", "").replace(" ", "").replace(" ", "");
    if (parseInt(tmpTimeZoneStr) >= -11 && parseInt(tmpTimeZoneStr) <= 12) 
    {
      return parseInt(tmpTimeZoneStr);
    }
    else
    {
      var d = new Date();
      var n = d.getTimezoneOffset();
      return n / 60;
    }
  }
  catch (err)
  {
    var d = new Date();
    var n = d.getTimezoneOffset();
    return n / 60;
  }

}