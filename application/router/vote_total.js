var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json());

//총학 투표 화면 출력
router.post('/', function(req, res){
    console.log("vote_total");  //console창 출력
    res.render('../front_page/vote_total.jade');
});

module.exports = router;