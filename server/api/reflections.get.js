module.exports = function (req, res)
{
  // var userTokenID = req.params.user_token;
  var courseID = req.params.course;
  var passcode = req.params.passcode;

  var token = req.cookies.get('token', { signed: true });

  if (!passcode || !courseID)
  {
    res.send({ status: 400 });
    return false;
  }
  if (token)
  {
    console.log('Here before user part');
    req.Parse.User.enableUnsafeCurrentUser();
    req.Parse.User.become(token).then(function (user)
    {
      var query = new req.Parse.Query('Reflection');
      // query.equalTo('course', {
      //   __type: "Pointer",
      //   className: "Course",
      //   objectId: courseID
      // });
      query.equalTo("cid", courseID);
      // console.log(lectureID);
      // console.log(lectureID);
      query.equalTo("passcode", passcode);
      // query.equalTo("user", userTokenID);
      console.log(query);
      query.find({
        success: function (reflections)
        {
          var result = [];
          reflections.forEach(function (reflection)
          {
            result.push({
              id: reflection,
            });
          });
          console.log('Refelections retreviel success');
          console.log(reflections);
          res.send({ status: 200, reflections: result });
        },
        error: function (error)
        {
          console.log('Refelections retreviel Failed 500');
          res.send({ status: 500, error: error });
        }
      });
    }, function (error)
    {
      console.log('Refelections retreviel Failed 403');
      res.send({ status: 403 });
    });
  } else
  {
    console.log('Refelections retreviel Failed 403');
    res.send({ status: 403 });
  }
}
