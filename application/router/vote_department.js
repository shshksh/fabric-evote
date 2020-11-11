var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path= require('path');

router.use(bodyParser.json());

//과 투표 후보자 화면 출력
router.post('/', function(req, res){
    console.log("vote_department");  //console창 출력
    res.render('../front_page/vote_department.jade');
});

module.exports = router;