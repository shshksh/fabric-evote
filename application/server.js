var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();  //각 페이지는 라우터로 분리
var sdk = require("./router/sdk");
var app = express();

app.locals.pretty = true;  //jade파일의 형식화
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('front_page')); 

//jade file
app.set('view engine', 'jade'); //view engine 템플릿 엔진 jade
app.set('views', './front_page'); //디렉토리

//Router
var login = require('./router/login');
//과투표 - 국어국문, 영어영문, 아이티, 컴공
var vote_department_KOR = require('./router/vote_department_KOR');
var vote_department_ENG = require('./router/vote_department_ENG');
var vote_department_IT = require('./router/vote_department_IT');
var vote_department_COM = require('./router/vote_department_COM');
//단과대투표 - 인사대, 공과대
var end_department_CHSS = require('./router/end_department_CHSS');
var end_department_CE = require('./router/end_department_CE');
var vote_college_CHSS = require('./router/vote_college_CHSS');
var vote_college_CE = require('./router/vote_college_CE');
//총학투표
var end_college = require('./router/end_college');
var vote_total = require('./router/vote_total');
var end_total = require('./router/end_total');

var select = require('./router/select');
var result = require('./router/result');

app.use('/login', login);
app.use('/vote_department_KOR', vote_department_KOR);
app.use('/vote_department_ENG', vote_department_ENG);
app.use('/vote_department_IT', vote_department_IT);
app.use('/vote_department_COM', vote_department_COM);
app.use('/end_department_CHSS', end_department_CHSS);
app.use('/end_department_CE', end_department_CE);
app.use('/vote_college_CHSS', vote_college_CHSS);
app.use('/vote_college_CE', vote_college_CE);
app.use('/end_college', end_college);
app.use('/vote_total', vote_total);
app.use('/end_total', end_total);
app.use('/result', result);
app.use('/select', select);

app.get('/api/create', function(req, res) {
  var title = req.query.title;
  var org = req.query.org;
  var channel = req.query.channel;
  var chaincode = req.query.chaincode;
  
  var open = req.query.open;
  var deadline = req.query.deadline;

  let args = [title, open, deadline];
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