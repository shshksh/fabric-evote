var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var sdk = require("./sdk");
const login = require("./login");

router.use(bodyParser.json());

//단과대 투표 화면 출력
router.post("/", async function (req, res) {
  console.log("end_college"); //console창 출력
  can1 = req.body.candidate1;
  can2 = req.body.candidate2;
  //console.log(can1, can2);    //선택된 후보 값은 'on', 선택되지 못하면 값이 없음

  var info = login.info

  data = await sdk.send(
    false,
    `${info.department}`,
    `${info.college}` + "channel",
    `${info.college}` + "cc",
    "query",
    [`${info.college}` + "vote"],
    res
  );
  candidates = JSON.parse(data).candidates;

  if (can1 == "on") {
    console.log("후보자1에게 투표되었습니다.");
    var to = candidates[0].sid;
  } else {
    console.log("후보자2에게 투표되었습니다.");
    var to = candidates[1].sid;
  }
  from = "" + info.studentnumber;
  org = info.department;
  college = info.college
  title = college + "vote";
  channel = college + "channel";
  chaincode = college + "cc";
  console.log(
    title + "\n" + from + "\n" + org + "\n" + channel + "\n" + chaincode
  );

  let args = [title, from, to];
  sdk.send(true, org, channel, chaincode, "vote", args, res);
  res.render("../front_page/end_college.jade");
});

module.exports = router;
