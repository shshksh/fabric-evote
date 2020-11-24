var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json());

//컴퓨터공학과 투표 후보자 화면 출력
router.post('/', function(req, res){
    console.log("vote_department_COM");  //console창 출력
    res.render('../front_page/vote_department_COM.jade');
});

module.exports = router;