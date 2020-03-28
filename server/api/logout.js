module.exports = function(req, res) {
  var date = new Date(),
      cookieOptions = {
        secureProxy: process.env.NODE_ENV == 'production',
        signed: true,
        path: '/api'
      };
  res.cookies.set('token', null, cookieOptions);
  res.send({
    status: 200,
    timestamp: date.getTime()
  });
}
