var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var path = require("path");
var sdk = require("./sdk");

router.use(bodyParser.json());

//start_department에서 선택된 과 투표 값
var can1, can2;

//과 투표 화면 출력
router.post("/", function (req, res) {
  console.log("end_department"); //console창 출력
  can1 = req.body.candidate1;
  can2 = req.body.candidate2;
  console.log(can1, can2); //선택된 후보 값은 'on', 선택되지 못하면 값이 없음
  
  if (can1 == "on") {
    console.log("후보자1에게 투표되었습니다.");
    var to = "201811111";
  } else {
    console.log("후보자2에게 투표되었습니다.");
    var to = "201822222";
  }
  
  var title = "itvote";
  var from = "202211111";
  var org = "itcae";
  var channel = "itchannel";
  var chaincode = "itcc";
  
  let args = [title, from, to];
  sdk.send(true, org, channel, chaincode, 'vote', args, res);
  console.log(result);
  if (result == true) {
    res.render("../front_page/end_department.jade");
  }
});

module.exports = router;
