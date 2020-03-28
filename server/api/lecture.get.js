module.exports = function(req, res) {
  var courseID = req.params.course;
  var token = req.cookies.get('token', {signed: true});
  if (!courseID) {
    res.send({status: 400});
    return false;
  }


  if (token) {
    // console.log('We are here!!!!!!!!!!!!!!!!!');
    // console.log(token);
    // console.log(courseID);
    req.Parse.User.enableUnsafeCurrentUser();
    req.Parse.User.become(token).then(function (user) {
      var query = new req.Parse.Query('Lecture');
      query.equalTo('course', {
        __type: "Pointer",
        className: "Course",
        objectId: courseID
      });
      query.find({
        success: function(lectures) {
          var result = [];
          lectures.forEach(function(lecture) {
            if ('time' in lecture)
              {
                time_val = lecture.get('time');
              }
              else
              {
                time_val = '12:00';
              }
            // date_val = lecture.get('date').substring(0, 10) + "  " + lecture.get('date').substring(12, 16)
            result.push({
              id: lecture.id,
              title: lecture.get('Title'),
              cid: lecture.get('cid'),
              date: new Date(lecture.get('date')).toISOString(),
              // date: new Date(lecture.get('date')),
              time: time_val,
              questions: JSON.parse(lecture.get('questions')),
              update: lecture.get('updatedAt')
            });
          });
          res.send({status: 200, lectures: result});
        },
        error: function(error) {
          res.send({status: 500, error: error});
        }
      });
    }, function (error) {
      res.send({status: 403});
    });
  } else {
    res.send({status: 403});
  }
}
