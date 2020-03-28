module.exports = function(req, res) {
  var token = req.cookies.get('token', {signed: true});
  if (token) {
    req.Parse.User.enableUnsafeCurrentUser();
    req.Parse.User.become(token).then(function (user) {
      var result = {
        status: 200
      };
      var courseQuery = new req.Parse.Query('Course');
      courseQuery.equalTo('instructor', user);
      courseQuery.find({
        success: function(courses) {
          var lectureQuery = new req.Parse.Query('Lecture');
          lectureQuery.containedIn('course', courses);
          lectureQuery.find({
            success: function(lectures) {
              res.send({
                status: 200,
                courses: {
                  data: courses.reverse().slice(0, 10),
                  total: courses.length
                },
                lectures: {
                  data: lectures.reverse().slice(0, 10),
                  total: lectures.length
                }
              });
            },
            error: function(error) {
              res.send({status: 500, error: error});
            }
          });
        },
        error: function(error) {
          res.send({status: 500, error: error});
        }
      });
    }, function (error) {
      res.send({
        status: 403
      });
    });
  } else {
    res.send({
      status: 403
    });
  }
}
