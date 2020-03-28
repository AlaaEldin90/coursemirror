module.exports = function(req, res) {
  var email = req.body.email ? req.body.email.toLowerCase() : '',
      password = req.body.password,
      saveSession = req.body['save-session'],
      errorHandler = function(object, error) {
        console.log('[ERR]', JSON.stringify(error));
        res.send({
          status: 500,
          object: object,
          error: error,
          timestamp: new Date().getTime()
        });
      };
  if (!RegExp(req.Config.Regex.Email).test(email)) {
    res.send({
      status: 400,
      object: 'login-email',
      timestamp: new Date().getTime()
    });
    return false;
  }
  var user = new req.Parse.User();
  user.set('username', email);
  user.set('password', password);
  user.logIn({
    success: function(user) {
      if (user.get('isInstructor')) {
        if (user.get('emailVerified'))
        {
          var token = user.get('sessionToken'),
          date = new Date(),
          cookieOptions = {
            secureProxy: process.env.NODE_ENV == 'production',
            signed: true,
            path: '/api'
          };
      if (saveSession == 'true') {
        date.setTime(date.getTime() + 604800000);
        cookieOptions.expires = date;
      }
      res.cookies.set('token', token, cookieOptions);
      res.send({
        status: 200,
        user: {
          name: user.get('name'),
          email: user.get('email')
        },
        timestamp: date.getTime()
      });
        }
        else
        {
          res.send({
            status: 403,
            object: 'login-email',
            error: 'Please verify your email first',
            timestamp: new Date().getTime()
          });
        }
      } else {
        res.send({
          status: 403,
          object: 'login-email',
          error: 'Please login with your instructor account.',
          timestamp: new Date().getTime()
        });
      }
    },
    error: function(user, error) {
      switch(error.code) {
        case 101:
          res.send({
            status: 403,
            object: 'login-password',
            error: 'Incorrect email address or password.',
            timestamp: new Date().getTime()
          });
          break;
        default:
          errorHandler(user, error);
      }
    }
  });
}
