module.exports = function(req, res) {
  var email = req.body.email ? req.body.email.toLowerCase() : '',
      password = req.body.password,
      name = req.body.name,
      hash = require('crypto').createHash('sha256'),
      invitation = req.body.invitation,
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
      object: 'register-email',
      timestamp: new Date().getTime()
    });
    return false;
  }
  // hash.update(email);
  // hash = require('crypto').createHash('sha256').update(hash.digest('hex') + req.Config.Salt.Invitation);
  // var checksum = hash.digest('hex').slice(-8);
  // if (invitation != checksum) {
  //   res.send({
  //     status: 403,
  //     object: 'register-invitation',
  //     error: 'Invalid invitation code for your email address.',
  //     timestamp: new Date().getTime()
  //   });
  //   return false;
  // }
  if (password.length < 8) {
    res.send({
      status: 400,
      object: 'register-password',
      timestamp: new Date().getTime()
    });
    return false;
  }
  if (!RegExp(req.Config.Regex.Name).test(name)) {
    res.send({
      status: 400,
      object: 'register-name',
      timestamp: new Date().getTime()
    });
    return false;
  }
  var user = new req.Parse.User();
  user.set('username', email);
  user.set("password", password);
  user.set('email', email);
  user.set('name', name);
  user.set('isInstructor', true);

  user.signUp().then(function(user) {
    console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
    res.send({
            status: 200,
            user: {
              name: user.get('name'),
              email: user.get('email')
            },
            refresh: true,
            timestamp: new Date().getTime()
    });
    //////////////////// Send email
    // var nodemailer = require('nodemailer');

    // var transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'coursemirrorwebsite@gmail.com',
    //     pass: 'Coursemirror_password_2018'
    //   }
    // });
    
    // var mailOptions = {
    //   from: 'coursemirrorwebsite@gmail.com',
    //   to: user.get('email'),
    //   subject: 'Verify your email',
    //   text: 'You recently registered on coursemirror website\nfollow this link to complete the registeration process'
    // };
    
    // transporter.sendMail(mailOptions, function(error, info){
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // });

}).catch(function(error){
    console.log("Error: " + error.code + " " + error.message);
    switch(error.code) {
      case 202:
        console.log("Error 202: " + error.code + " " + error.message);
      case 203:
        res.send({
          status: 403,
          object: 'register-email',
          error: 'Email address already registered, please login.',
          refresh: false,
          timestamp: new Date().getTime()
        });
        break;
      default:
        errorHandler(user, error);
    }
});

  // user.signUp(null, {
  //   success: function(user) {
  //     var token = user.get('sessionToken'),
  //         date = new Date(),
  //         cookieOptions = {
  //           secureProxy: process.env.NODE_ENV == 'production',
  //           signed: true,
  //           path: '/api'
  //         };
  //     res.cookies.set('token', token, cookieOptions);
  //     res.send({
  //       status: 200,
  //       user: {
  //         name: user.get('name'),
  //         email: user.get('email')
  //       },
  //       timestamp: new Date().getTime()
  //     });
    
      /// Send verification email//////////////////////////////
      // var nodemailer = require('nodemailer');

      // var transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     user: 'coursemirrorwebsite@gmail.com',
      //     pass: 'Coursemirror_password_2018'
      //   }
      // });
      
      // var mailOptions = {
      //   from: 'coursemirrorwebsite@gmail.com',
      //   to: user.get('email'),
      //   subject: 'Verify your email',
      //   text: 'You recently registered on coursemirror website\nfollow this link to complete the registeration process'
      // };
      
      // transporter.sendMail(mailOptions, function(error, info){
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log('Email sent: ' + info.response);
      //   }
      // });
      /////////////////////////////////////////////////////////
    
    // },
    // error: function(user, error) {
    //   switch(error.code) {
    //     case 202:
    //     case 203:
    //       res.send({
    //         status: 403,
    //         object: 'register-email',
    //         error: 'Email address already registered, please login.',
    //         refresh: true,
    //         timestamp: new Date().getTime()
    //       });
    //       break;
    //     default:
    //       errorHandler(user, error);
    //   }
    // }
  // });
}
