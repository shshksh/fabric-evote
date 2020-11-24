var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json());

//국어국문과 투표 후보자 화면 출력
router.post('/', function(req, res){
    console.log("vote_department_KOR");  //console창 출력
    res.render('../front_page/vote_department_KOR.jade');
});

module.exports = router;