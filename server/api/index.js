module.exports = {
  index: function (req, res)
  {
    var token = req.cookies.get('token', { signed: true });
    if (token)
    {
      req.Parse.User.enableUnsafeCurrentUser();
      req.Parse.User.become(token).then(function (user)
      {
        res.send({
          status: 200,
          user: {
            name: user.get('name'),
            email: user.get('email')
          }
        });
      }, function (error)
      {
        res.send({
          status: 403
        });
      });
    } else
    {
      res.send({
        status: 403
      });
    }
  },
  login: require('./login.js'),
  logout: require('./logout.js'),
  passwd: require('./changepassword.js'),
  register: require('./register.js'),
  school: require('./school.js'),
  home: require('./home.js'),
  course: {
    GET: require('./course.get.js'),
    POST: require('./course.create.js'),
    PUT: require('./course.update.js'),
    //DELETE: require('./course.delete.js')
  },
  lecture: {
    GET: require('./lecture.get.js'),
    POST: require('./lecture.create.js'),
    PUT: require('./lecture.update.js'),
    DELETE: require('./lecture.delete.js')
  },
  summarization: {
    GET: require('./summarization.get.js')
  },
  question: {
    GET: require('./question.get.js')
  },
  reflection: {
    GET: require('./reflection.get.js')
  },
  reflections: {
    GET: require('./reflections.get.js')
  },
  invite: require('./invite.js'),
}
