// import {Spinner} from __dirname + '/../frontend/assets/js/spin.js';

var express = require('express'),
  minify = require('express-minify'),
  app = express(),
  bodyParser = require('body-parser'),
  _ = require('underscore'),
  API = require('./api'),
  Keygrip = require("keygrip"),
  Cookies = require('cookies'),
  Parse = require('parse/node').Parse,
  Mailgun = require('mailgun').Mailgun,
  Config = require('./config.json');

// Added by Ahmed Magooda//////////////////////////
// process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.NODE_ENV = process.env.NODE_ENV || 'back4app';
console.log(process.env.NODE_ENV)
Parse.initialize(Config.Parse[process.env.NODE_ENV].App_Id, Config.Parse[process.env.NODE_ENV].Js_Key);
// Parse.initialize('WtfAbIvOLlBvLGguSG56tMBjBlTkkn3rtl3oYpF8', '5LjPS5x1dYoC4ix1pyab0hzUR8r9LAzaIwkBXnti');
Parse.serverURL = 'https://parseapi.back4app.com/';
///////////////////////////////////////////////////
// Parse.initialize(Config.Parse[process.env.NODE_ENV].App_Id, Config.Parse[process.env.NODE_ENV].Key, Config.Parse[process.env.NODE_ENV].Master_Key);
// Parse.serverURL = 'https://coursemirror.azurewebsites.net/parse';

app.disable('x-powered-by');
if (process.env.NODE_ENV == 'production')
{
  app.use(minify({
    cache: true
  }));
}
app.use(express.static(__dirname + '/../frontend'));
app.use(bodyParser.urlencoded({
  extended: true
}));
var keys = new Keygrip(Config.Keys);
app.use(Cookies.express(keys));
app.use(function (req, res, next)
{
  req.Parse = Parse;
  req._ = _;
  req.Config = Config;
  req.Mailgun = new Mailgun('key-4kpehhx5zkr4d6843vm4t7sysk2-2b-5');
  res.setHeader('Access-Control-Allow-Origin', "http://" +
    Config.Server[process.env.NODE_ENV].Host + " https://" +
    Config.Server[process.env.NODE_ENV].Host);
  next();
});
app.get('/api', API.index);
app.post('/api/login', API.login);
app.post('/api/register', API.register);
app.post('/api/passwd', API.passwd);
app.get('/api/invite/:email', API.invite);
app.get('/api/logout', API.logout);
app.get('/api/course', API.course.GET);
app.post('/api/course', API.course.POST);
app.put('/api/course/:course([a-zA-Z0-9_]{10})', API.course.PUT);
app.get('/api/home', API.home);
app.get('/api/lecture/:course([a-zA-Z0-9_]{10})', API.lecture.GET);
app.post('/api/lecture/:course([a-zA-Z0-9_]{10})', API.lecture.POST);
app.put('/api/lecture/:course([a-zA-Z0-9_]{10})', API.lecture.PUT);
app.delete('/api/lecture/:course([a-zA-Z0-9_]{10})', API.lecture.DELETE);
app.get('/api/summarization/:course([a-zA-Z0-9_]{1,100})', API.summarization.GET);
app.get('/api/question/:questionid([a-zA-Z0-9]{1,100})', API.question.GET);
app.get('/api/reflection/:user_token([a-zA-Z0-9]{1,100})/:course([a-zA-Z0-9_]{1,100})/:lecture([a-zA-Z0-9_]{1,100})', API.reflection.GET); //   :user_token([a-zA-Z0-9]{10,100})/:course([a-zA-Z0-9]{10,100})/:lecture([a-zA-Z0-9]{10,100})
app.get('/api/reflections/:course([a-zA-Z0-9_]{1,100})/:passcode([a-zA-Z0-9_]{1,100})', API.reflections.GET); //   :user_token([a-zA-Z0-9]{10,100})/:course([a-zA-Z0-9]{10,100})/:lecture([a-zA-Z0-9]{10,100})
//app.post('/api/school', API.school);

var server = app.listen(process.env.PORT || Config.Server[process.env.NODE_ENV].Port, function ()
{
  console.log(process.env.NODE_ENV);
  console.log(Config.Server[process.env.NODE_ENV].Host);
  console.log('Listening at ' + 'http://' + server.address().address, server.address().port);
});
