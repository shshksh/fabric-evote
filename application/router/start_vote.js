var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path= require('path');
var crypto = require('crypto');

router.use(bodyParser.json());

//login에서 입력된 유권자의 id,password
var userid, userpw;

//투표 시작 화면 출력
router.post('/', function(req, res){
    console.log("start_vote");  //console창 출력
    userid = req.body.id;
    userpw = req.body.pw;
    sha256 = crypto.createHash('sha256');
    sha256.update(userpw);
    userpw = sha256.digest('hex');
    console.log('id='+ userid + 'pw' + userpw);
    res.render('../front_page/start_vote.jade');
});

module.exports = router;