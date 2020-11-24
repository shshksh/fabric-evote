var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json());

//공과대 투표 화면 출력
router.post('/', function(req, res){
    console.log("vote_college_CE");  //console창 출력
    res.render('../front_page/vote_college_CE.jade');
});

module.exports = router;