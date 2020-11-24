var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json());

//인사대 투표 화면 출력
router.post('/', function(req, res){
    console.log("vote_college_CHSS");  //console창 출력
    res.render('../front_page/vote_college_CHSS.jade');
});

module.exports = router;