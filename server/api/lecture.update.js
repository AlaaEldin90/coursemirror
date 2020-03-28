module.exports = function(req, res) {
  var courseID = req.params.course,
    lectureID = req.body.id,
    title = req.body.title,
    date = req.body.date,
    questions = req.body.questions,
    token = req.cookies.get('token', {signed: true});
  if (!courseID || !lectureID || (!title && !date && !questions) || !token) {
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
          if (title) lectures[0].set('Title', title);
          if (date) lectures[0].set('date', date);
          if (questions) lectures[0].set('questions', questions);
          lectures[0].save(null, {
            success: function(lecture) {
              res.send({status: 200, lecture: {
                id: lecture.id,
                title: lecture.get('Title'),
                cid: lecture.get('cid'),
                date: new Date(lecture.get('date')).toISOString(),
                questions: JSON.parse(lecture.get('questions')),
                update: lecture.get('updatedAt')
              }});
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
