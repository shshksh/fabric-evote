var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path= require('path');
var session = require('express-session');
var sdk = require('./router/sdk');
var router = express.Router();
var app = express();

app.locals.pretty = true;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('front_page')); 

//jade file
app.set('view engine', 'jade'); //view engine 템플릿 엔진 jade
app.set('views', './front_page'); //디렉토리

//Router
var loginRouter = require('./router/login');
var start_vote = require('./router/start_vote');
var vote_department = require('./router/vote_department');
var end_department = require('./router/end_department');
var vote_college = require('./router/vote_college');
var end_college = require('./router/end_college');
var vote_total = require('./router/vote_total');
var end_total = require('./router/end_total');

app.use('/login', loginRouter);
app.use('/start_vote', start_vote);
app.use('/vote_department', vote_department);
app.use('/end_department', end_department);
app.use('/vote_college', vote_college);
app.use('/end_college', end_college);
app.use('/vote_total', vote_total);
app.use('/end_total', end_total);

app.get('/api/create', function(req, res) {
  var title = req.query.title;
  var org = req.query.org;
  var channel = req.query.channel;
  var chaincode = req.query.chaincode;

  let args = [title];
  sdk.send(true, org, channel, chaincode, 'create', args, res);
});

app.get('/api/enroll', function(req, res) {
  var title = req.query.title;
  var name = req.query.name;
  var major = req.query.major;
  var sid = req.query.sid;
  var college = req.query.college;
  var org = req.query.org;
  var channel = req.query.channel;
  var chaincode = req.query.chaincode;

  let args = [title, name, major, sid, college]
  sdk.send(true, org, channel, chaincode, 'enroll', args, res)
});

app.get('/api/vote', function(req, res) {
  var title = req.query.title;
  var from = req.query.from;
  var to = req.query.to;
  var org = req.query.org;
  var channel = req.query.channel;
  var chaincode = req.query.chaincode;

  let args = [title, from, to];
  sdk.send(true, org, channel, chaincode, 'vote', args, res);
});

app.get('/api/query', function(req, res) {
  var title = req.query.title;
  var org = req.query.org;
  var channel = req.query.channel;
  var chaincode = req.query.chaincode;

  let args = [title];
  sdk.send(false, org, channel, chaincode, 'query', args, res);
})

//server start
app.listen(4000, function(){
  console.log('Connected 4000 port!');
});