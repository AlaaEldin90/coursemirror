module.exports = function (req, res)
{
  var token = req.cookies.get('token', { signed: true });
  if (token)
  {
    req.Parse.User.enableUnsafeCurrentUser();
    req.Parse.User.become(token).then(function (user)
    {
      var query = new req.Parse.Query('Course');
      query.equalTo('instructor', user);
      query.find({
        success: function (courses)
        {
          var results = [];
          courses.forEach(function (course)
          {
            if (!course.get('questions') || !course.get('questions').length)
            {
              course.set('questions', '[]');
            }
            if (!course.get('tokens') || !course.get('tokens').length)
            {
              course.set('tokens', '[]');
            }
            if (!course.get('passcode'))
            {
              course.set('passcode', '');
            }
            var result = {
              id: course.id,
              title: course.get('Title'),
              cid: course.get('cid'),
              url: course.get('URL'),
              archived: course.get('archived'),
              create: new Date(course.get('createdAt')).getTime(),
              update: new Date(course.get('updatedAt')).getTime(),
              term: course.get('time'),
              passcode: course.get('passcode'),
              timezone: course.get('timezone'),
              tokens: [],
              questions: JSON.parse(course.get('questions'))
            }, tokens = JSON.parse(course.get('tokens'));
            console.log(result);


            // var ref = new req.Parse.Query('Summarization');
            // ref.find({
            //   success: function(reflectionTest) {
            //     console.log("Testing success1");
            //   },error: function(error) {
            //     console.log("Testing error1");
            //   }
            // });


            var ref2 = new req.Parse.Query('Test');
            ref2.find({
              success: function (reflectionTest)
              {
                console.log("Testing success2");
              }, error: function (error)
              {
                console.log("Testing error2");
                console.log(error);
              }
            });


            var usedTokens = [], userQuery = new req.Parse.Query('_User');
            userQuery.find({
              success: function (users)
              {
                users.forEach(function (user)
                {
                  if (user.get('token') && user.get('token').length > 2)
                  {
                    var userTokens = JSON.parse(user.get('token'));
                    usedTokens = usedTokens.concat(userTokens);
                  }
                });
                usedTokens.sort();
                var activeTokens = [], reflectionQuery = new req.Parse.Query('Reflection');
                reflectionQuery.equalTo('cid', result.cid);
                reflectionQuery.find({
                  success: function (reflections)
                  {
                    reflections.forEach(function (reflection)
                    {
                      activeTokens.push(reflection.get('user'));
                    });
                    activeTokens = req._.countBy(activeTokens, function (token)
                    {
                      return token;
                    });
                    tokens.forEach(function (token)
                    {
                      result.tokens.push({
                        id: token,
                        used: req._.indexOf(usedTokens, token, true) != -1,
                        reflections: activeTokens[token] ? activeTokens[token] : 0
                      });
                    });
                    results.push(result);
                    if (results.length == courses.length)
                    {
                      res.send({ status: 200, courses: results });
                    }
                  },
                  error: function (error)
                  {
                    res.send({ status: 500, error: error });
                  }
                });
              }, error: function (error)
              {
                console.log("HERE");
                res.send({ status: 500, error: error });
              }
            })
          });
          if (courses.length == 0)
          {
            res.send({ status: 200, courses: [] });
          }
        },
        error: function (error)
        {
          res.send({ status: 500, error: error });
        }
      });
    }, function (error)
    {
      res.send({ status: 403 });
    });
  } else
  {
    res.send({ status: 403 });
  }
}
