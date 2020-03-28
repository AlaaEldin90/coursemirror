module.exports = function (req, res)
{
  var courseID = req.params.course;
  var token = req.cookies.get('token', { signed: true });
  console.log(token);
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
      var query = new req.Parse.Query('Summarization');
      // query.equalTo('course', {
      //   __type: "Pointer",
      //   className: "Course",
      //   objectId: courseID
      // });
      query.equalTo("cid", courseID);
      query.equalTo("method", "BERT_Cluster");

      console.log(query);

      query.find({
        success: function (summarizations)
        {
          console.log("Find summarization query success");
          var result = [];
          summarizations.forEach(function (summarization)
          {
            result.push({
              id: summarization,
            });
          });
          res.send({ status: 200, summarizations: result });
        },
        error: function (error)
        {
          console.log("Find summarization query Error");
          console.log(error);
          res.send({ status: 500, error: error });
        }
      });
    }, function (error)
    {
      console.log(error);
      res.send({ status: 403 });
    });
  } else
  {
    console.log(error);
    res.send({ status: 403 });
  }
}
