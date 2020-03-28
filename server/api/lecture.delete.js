module.exports = function(req, res) {
  var courseID = req.params.course,
    lectureID = req.body.id,
    token = req.cookies.get('token', {signed: true});
  if (!courseID || !lectureID || !token) {
    res.send({status: 400});
    return false;
  }
  if (token) {
    req.Parse.User.enableUnsafeCurrentUser();
    req.Parse.User.become(token).then(function (user) {
      var query = new req.Parse.Query('Lecture');
      query.equalTo('objectId', lectureID);
      query.find({
        success: function(lectures) {
          if (!lectures.length) {
            res.send({status: 404});
            return false;
          }
          lectures[0].destroy({
            success: function(lecture) {
              res.send({status: 200});
            },
            error: function(obj, error) {
              res.send({status: 500, error: error});
            }
          });
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
