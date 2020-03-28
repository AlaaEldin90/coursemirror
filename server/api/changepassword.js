module.exports = function(req, res) {
  var oldPassword = req.body.old,
    newPassword = req.body.new,
    token = req.cookies.get('token', {signed: true}),
    cookieOptions = {
      secureProxy: process.env.NODE_ENV == 'production',
      signed: true,
      path: '/api'
    },
    errorHandler = function(object, error) {
      console.log('[ERR]', JSON.stringify(error));
      res.send({
        status: 500,
        object: object,
        error: error,
        timestamp: new Date().getTime()
      });
    };
  if (!oldPassword || !newPassword || !token ||
    oldPassword.length < 8 || newPassword.length < 8) {
    res.send({status: 400});
    return false;
  }
  if (token) {
    req.Parse.User.enableUnsafeCurrentUser();
    req.Parse.User.become(token).then(function (user) {
      var newUser = new req.Parse.User();
      user.set('username', user.get('email'));
      user.set('password', oldPassword);
      user.logIn({
        success: function(user) {
          user.setPassword(newPassword);
          user.save(null, {
            success: function(user) {
              res.cookies.set('token', null, cookieOptions);
              res.send({
                status: 200
              });
            }, error: function(login, error){
              errorHandler(user, error);
            }
          });
        }, error: function(user, error) {
          switch(error.code) {
            case 101:
              res.send({
                status: 404,
                error: 'Incorrect old password.'
              });
              break;
            default:
              errorHandler(user, error);
          }
        }
      });
    }, function (error) {
      res.send({status: 403});
    });
  } else {
    res.send({status: 403});
  }
}
