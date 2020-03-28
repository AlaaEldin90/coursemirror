function generateToken()
{
  var token = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 5; i++)
  {
    token += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return token;
}
// module.exports = function(req, res) {
//   var cid = req.body.cid,
//     title = req.body.title,
//     term = req.body.term,
//     url = req.body.url,
//     size = parseInt(req.body.size),
//     token = req.cookies.get('token', {signed: true});
//   if (!cid || !title || !term || !url || !size || !token) {
//     res.send({status: 400});
//     return false;
//   }
//   if (token) {
//     req.Parse.User.enableUnsafeCurrentUser();
//     req.Parse.User.become(token).then(function (user) {
//       var query = new req.Parse.Query('Course');
//       query.equalTo('cid', cid);
//       query.find({
//         success: function(course) {
//           if (course.length) {
//             res.send({status: 404});
//             return false;
//           }
//           var Course = req.Parse.Object.extend("Course"),
//             tokens = [], tokenSet = new Set(),
//             newCourse = new Course();
//           for (var i = 0; i < size; i++) {
//             var newToken = generateToken();
//             while (tokenSet.has(newToken)) {
//               newToken = generateToken();
//             }
//             tokenSet.add(newToken);
//             tokens.push(newToken);
//           }
//           var tokenArr = [];
//           tokens.forEach(function(token) {
//             tokenArr.push({
//               id: token,
//               used: false,
//               reflections: 0
//             });
//           });
//           newCourse.set('questions', '["q1","q2","q3","q4"]');
//           newCourse.set('time', term);
//           newCourse.set('cid', cid);
//           newCourse.set('URL', url);
//           newCourse.set('archived', false);
//           newCourse.set('Title', title);
//           newCourse.set('instructor', user);
//           newCourse.set('tokens', JSON.stringify(tokens));
//           newCourse.save(null, {
//             success: function(course) {
//               res.send({status: 200, course: {
//                 id: course.id,
//                 title: course.get('Title'),
//                 cid: course.get('cid'),
//                 url: course.get('URL'),
//                 archived: course.get('archived'),
//                 create: new Date(course.get('createdAt')).getTime(),
//                 update: new Date(course.get('updatedAt')).getTime(),
//                 term: course.get('time'),
//                 tokens: tokenArr,
//                 questions: JSON.parse(course.get('questions'))
//               }});
//             },
//             error: function(course, error) {
//               res.send({status: 500, error: error});
//             }
//           })
//         },
//         error: function(error) {
//           res.send({status: 500, error: error});
//         }
//       });
//     }, function (error) {
//       res.send({status: 403});
//     });
//   } else {
//     res.send({status: 403});
//   }
// }

module.exports = function (req, res)
{
  var cid = req.body.cid;
  var title = req.body.title;
  var term = req.body.term;
  var url = req.body.url;
  var timezone = 0;
  if (req.body.timezone)
  {
    timezone = req.body.timezone;
    console.log(timezone);
  }

  token = req.cookies.get('token', { signed: true });
  if (!cid || !title || !term || !token)
  {
    res.send({ status: 400 });
    return false;
  }
  if (token)
  {
    req.Parse.User.enableUnsafeCurrentUser();
    req.Parse.User.become(token).then(function (user)
    {
      var query = new req.Parse.Query('Course');
      query.equalTo('cid', cid);
      query.find({
        success: function (course)
        {
          if (course.length)
          {
            res.send({ status: 404 });
            return false;
          }
          var Course = req.Parse.Object.extend("Course"),
            tokens = [], tokenSet = new Set(),
            newCourse = new Course();

          passcode = generateToken();
          tokenSet.add(passcode);
          tokens.push(passcode);

          var tokenArr = [];
          tokens.forEach(function (token)
          {
            tokenArr.push({
              // passcode: token,
              studentid: '',
              used: false,
              reflections: 0
            });
          });
          if (!url || url == "")
          {
            url = "";
          }
          newCourse.set('questions', '["q1","q2","q3","q4"]');
          newCourse.set('time', term);
          newCourse.set('cid', cid);
          newCourse.set('URL', url);
          newCourse.set('archived', false);
          newCourse.set('Title', title);
          newCourse.set('instructor', user);
          newCourse.set('passcode', passcode);
          newCourse.set('timezone', timezone);
          newCourse.set('tokens', JSON.stringify(tokens));
          newCourse.save(null, {
            success: function (course)
            {
              res.send({
                status: 200, course: {
                  id: course.id,
                  title: course.get('Title'),
                  cid: course.get('cid'),
                  passcode: course.get('passcode'),
                  timezone: course.get('timezone'),
                  url: course.get('URL'),
                  archived: course.get('archived'),
                  create: new Date(course.get('createdAt')).getTime(),
                  update: new Date(course.get('updatedAt')).getTime(),
                  term: course.get('time'),
                  tokens: tokenArr,
                  questions: JSON.parse(course.get('questions'))
                }
              });
            },
            error: function (course, error)
            {
              res.send({ status: 500, error: error });
            }
          })
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