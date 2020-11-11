var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path= require('path');

router.use(bodyParser.json());

//단과대 투표 화면 출력
router.post('/', function(req, res){
    console.log("vote_college");  //console창 출력
    res.render('../front_page/vote_college.jade');
});

module.exports = router;