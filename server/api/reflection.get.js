module.exports = function(req, res) {
  var userTokenID = req.params.user_token;
  var courseID = req.params.course;
  var lectureID = req.params.lecture;

  var token = req.cookies.get('token', {signed: true});

  if (!courseID) {
    res.send({status: 400});
    return false;
  }

  if (!lectureID || !userTokenID) {
    res.send({status: 400});
    return false;
  }
  if (token) {
    req.Parse.User.enableUnsafeCurrentUser();
    req.Parse.User.become(token).then(function (user) {
      var query = new req.Parse.Query('Reflection');
      // query.equalTo('course', {
      //   __type: "Pointer",
      //   className: "Course",
      //   objectId: courseID
      // });
      query.equalTo("cid", courseID);
      // console.log(lectureID);
      // console.log(lectureID);
      query.equalTo("lecture_number", Number(lectureID));
      query.equalTo("user", userTokenID);
      query.find({
        success: function(reflections) {
          var result = [];
          reflections.forEach(function(reflection) {
            result.push({
              id: reflection,
            });
          });
          res.send({status: 200, reflections: result});
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
