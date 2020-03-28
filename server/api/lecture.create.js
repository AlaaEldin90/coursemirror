module.exports = function(req, res) {
  var courseID = req.params.course,
    cid = req.body.cid,
    title = req.body.title,
    date = req.body.date,
    questions = req.body.questions,
    passcode = req.body.passcode

    number = parseInt(req.body.index),
    token = req.cookies.get('token', {signed: true});
  if (!cid || !courseID || !title || !date || !questions || !number || !token) {
    res.send({status: 400});
    return false;
  }
  if (token) {
    req.Parse.User.enableUnsafeCurrentUser();
    req.Parse.User.become(token).then(function (user) {
      var Lecture = req.Parse.Object.extend("Lecture"),
        Course = req.Parse.Object.extend("Course"),
        newLecture = new Lecture(),
        parentCourse = new Course();
      parentCourse.id = courseID;
      newLecture.set('instructor', user);
      newLecture.set('number', number);
      newLecture.set('questions', questions);
      newLecture.set('date', date);
      newLecture.set('Title', title);
      newLecture.set('passcode', passcode);
      newLecture.set('cid', cid);
      newLecture.set('course', parentCourse);
      console.log(newLecture);
      newLecture.save(null, {
        success: function(lecture) {
          res.send({status: 200, lecture: {
            id: lecture.id,
            title: lecture.get('Title'),
            cid: lecture.get('cid'),
            date: new Date(lecture.get('date')).toISOString(),
            questions: JSON.parse(lecture.get('questions')),
            update: lecture.get('updatedAt'),
            passcode: lecture.get('passcode')
          }});
          console.log('New lecture creation succes: line 38');
        },
        error: function(course, error) {
          console.log('error in lecture creation: line 41');
          res.send({status: 500, error: error});
        }
      })
    }, function (error) {
      res.send({status: 403});
      console.log('error in lecture creation: line 47');
    });
  } else {
    res.send({status: 403});
    console.log('error in lecture creation: line 51');
  }
}
