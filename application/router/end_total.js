var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json());

//vote_total에서 선택된 과 투표 값
var can1, can2;

//총학 투표 화면 출력
router.post('/', function(req, res){
    console.log("end_total");  //console창 출력
    res.render('../front_page/end_total.jade');
    can1 = req.body.candidate1;
    can2 = req.body.candidate2;
    //console.log(can1, can2);    //선택된 후보 값은 'on', 선택되지 못하면 값이 없음
    if (can1=='on'){
        console.log('후보자1에게 투표되었습니다.');
        can1 = true;
    }
    else{
        console.log('후보자2에게 투표되었습니다.');
        can2 = false;
    }
});

module.exports = router;