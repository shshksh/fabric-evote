var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var sdk = require("./sdk");
const login = require("./login")

router.use(bodyParser.json());

router.post("/", async function (req, res) {
  console.log("start_vote"); //console창 출력

  userid = req.body.id;
  userpw = req.body.pw;
  console.log("id=" + userid + "\n" + "pw=" + userpw);
  
  connection = login.conn
  info = login.info

  overlap = info.overlap;
  department = info.department;

  if (overlap == 0) {
    //중복검사(check값 확인)
    repeat = false; //중복이 아닌 경우 다음 페이지 연결
  } else {
    //중복인 경우 로그인페이지로 돌아가는 링크와 문구 제시
    repeat = true;
  }

  data = await sdk.send(
    false,
    `${info.department}`,
    `${info.department}`+"channel",
    `${info.department}`+"cc",
    "query",
    [`${info.department}`+"vote"],
    res
  );
  periods = JSON.parse(data).periods;
  _deadline = periods[1];

  year = _deadline.substr(0, 4);
  month = _deadline.substr(4, 2);
  day = _deadline.substr(6, 2);
  hour = _deadline.substr(8, 2);

  //유권자의 단과대에 따라 단과대투표페이지 연결
  //depart(단과대), timecheck(투표기간 확인 값), overlap(중복투표 확인 값)
  if (department == "itcae") {
    res.render("../front_page/start_vote.jade", {
      depart: "./vote_department_IT",
      overlap: repeat,
      time: `${year}년 ${month}월 ${day}일 ${hour}시`
    });
  } else if (department == "ce") {
    res.render("../front_page/start_vote.jade", {
      depart: "./vote_department_CE",
      overlap: repeat,
      time: `${year}년 ${month}월 ${day}일 ${hour}시`
    });
  } else if (department == "kor") {
    res.render("../front_page/start_vote.jade", {
      depart: "./vote_department_KOR",
      overlap: repeat,
      time: `${year}년 ${month}월 ${day}일 ${hour}시`
    });
  } else if (department == "eng") {
    res.render("../front_page/start_vote.jade", {
      depart: "./vote_department_ENG",
      overlap: repeat,
      time: `${year}년 ${month}월 ${day}일 ${hour}시`
    });
  }
});

module.exports = router;
