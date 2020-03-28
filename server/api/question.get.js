module.exports = function(req, res) {
  var questionID = req.params.questionid;
  var token = req.cookies.get('token', {signed: true});

  if (!questionID) {
    res.send({status: 400});
    return false;
  }
  if (token) {
    req.Parse.User.enableUnsafeCurrentUser();
    req.Parse.User.become(token).then(function (user) {
      var query = new req.Parse.Query('Question');
      // query.equalTo("QuestionID", questionID);
      query.find({
        success: function(questions) {
          var result = [];
          questions.forEach(function(question) {
            result.push({
              questiontext: question.get('QuestionDescription'),
              qid: question.get("QuestionID"),
            });
          });
          res.send({status: 200, questions: result});
        },
        error: function(error) {
          res.send({status: 500, error: error});
        }
      });
    }, function (error) {
      res.send({status: 403});
    });
  } else {
    res.send({status: 403});
  }
}
