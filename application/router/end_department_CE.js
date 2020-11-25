var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var sdk = require("./sdk");
const num = require("./select");

router.use(bodyParser.json());

//start_department에서 선택된 과 투표 값
var can1, can2;
var title, from, org, channel, chaincode;

//과 투표 화면 출력
router.post("/", async function (req, res) {
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
  from = "" + num.uid;
  department = num.department;
  if (num.department == "IT") {
    title = "itvote";
    org = "itcae";
    channel = "itchannel";
    chaincode = "itcc";
  } else if (num.department == "COM") {
    title = "cevote";
    org = "ce";
    channel = "cechannel";
    chaincode = "cecc";
  }
  console.log(
    title + "\n" + from + "\n" + org + "\n" + channel + "\n" + chaincode
  );

  let args = [title, from, to];
  sdk.send(true, org, channel, chaincode, "vote", args, res);
  res.render("../front_page/end_department_CE.jade");
});

module.exports = router;
