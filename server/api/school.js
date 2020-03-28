module.exports = function(req, res) {
  var domain = req.body.domain ? req.body.domain.toLowerCase() : '';
  if (!RegExp(req.Config.Regex.Domain).test(domain)) {
    res.send({
      status: 400,
      timestamp: new Date().getTime()
    });
    return false;
  }
  var university = new req.Parse.Query('University').equalTo('domain', domain).equalTo('verified', true);
  university.find({
    success: function(result) {
      if (result.length) {
        var school = result[0];
        res.send({
          status: 200,
          school: school.get('name'),
          timestamp: new Date().getTime()
        });
      } else {
        res.send({
          status: 404,
          timestamp: new Date().getTime()
        });
      }
    },
    error: function(err) {
      console.log('[ERR]', err);
      res.send({
        status: 500,
        timestamp: new Date().getTime()
      });
    }
  });
}
