module.exports = function(req, res) {
  var token = req.cookies.get('token', {signed: true}),
    email = req.params.email.toLowerCase(),
    hash = require('crypto').createHash('sha256');
  if (!token) {
    res.send({status: 403});
  } else if (!RegExp(req.Config.Regex.Email).test(email)) {
    res.send({status: 400, error: 'Invalid email address.'});
  } else {
    req.Parse.User.enableUnsafeCurrentUser();
    req.Parse.User.become(token).then(function (user) {
      if (req.Config.Superuser.indexOf(user.get('email')) < 0) {
        res.send({status: 403, error: 'Not superuser.'});
      } else {
        hash.update(email);
        hash = require('crypto').createHash('sha256').update(hash.digest('hex') + req.Config.Salt.Invitation);
      }
      var checksum = hash.digest('hex').slice(-8);
      res.send({status: 200, hash: checksum});
    }, function (error) {
      res.send({status: 403});
    });
  }
}
