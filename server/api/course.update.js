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
module.exports = function (req, res)
{
  var courseID = req.params.course,
    data = req.body,
    token = req.cookies.get('token', { signed: true });
  if (!courseID)
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
      query.equalTo('instructor', user);
      query.equalTo('objectId', courseID);
      query.find({
        success: function (course)
        {
          if (!course.length)
          {
            res.send({ status: 404 });
            return false;
          }
          req._.each(data, function (value, key)
          {
            switch (key)
            {
              case 'questions':
                course[0].set('questions', value);
                break;
              case 'term':
                course[0].set('time', value);
                break;
              case 'url':
                course[0].set('URL', value);
                break;
              case 'title':
                course[0].set('Title', value);
                break;
              case 'timezone':
                course[0].set('timezone', value);
                break;
              case 'tokens':
                var tokens = JSON.parse(course[0].get(key)),
                  tokenSet = new Set(), newTokens = [];
                req._.each(tokens, function (value)
                {
                  tokenSet.add(value);
                });
                for (var i = 0; i < value; i++)
                {
                  var newToken = generateToken();
                  while (tokenSet.has(newToken))
                  {
                    newToken = generateToken();
                  }
                  tokenSet.add(newToken);
                  tokens.push(newToken);
                  newTokens.push(newToken);
                }
                course[0].set(key, JSON.stringify(tokens));
                course[0].save(null, {
                  success: function (course)
                  {
                    res.send({ status: 200, tokens: newTokens, count: tokens.length });
                  },
                  error: function (obj, error)
                  {
                    res.send({ status: 500, error: error });
                  }
                });
                return;
              case 'archived':
                course[0].set('archived', value == 'true');
                break;
            }
          });
          course[0].save(null, {
            success: function (course)
            {
              res.send({ status: 200 });
            },
            error: function (obj, error)
            {
              res.send({ status: 500, error: error });
            }
          });
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
