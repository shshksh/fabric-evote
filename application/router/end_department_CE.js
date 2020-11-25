var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var sdk = require('./sdk');
var mysql = require("mysql"); //mysql 모듈 설치
const num = require("./select");

router.use(bodyParser.json());

//mysql 연동
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12653",
  database: "workbench",
  port: 3306,
});

// //db테이블 전체 확인
// db.query('SELECT * FROM voter_info', function (error, results, fields) {
//     if (error) {
//         console.log(error);
//     }
//     console.log(results);
// });

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
  //db에서 유권자 정보 확인 후 백앤드로 넘기기
  db.query(
    "SELECT * FROM workbench.voter_info WHERE studentnumber = ?;",
    num.uid,
    function (error, info, fields) {
      if (error) {
        console.log(error);
      }
      title = info[0].title;
      from = "" + num.uid;
      org = info[0].org;
      channel = info[0].channel;
      chaincode = info[0].chaincode;

      console.log(
        title + "\n" + from + "\n" + org + "\n" + channel + "\n" + chaincode
      );

      let args = [title, from, to];
      sdk.send(true, org, channel, chaincode, "vote", args, res);
      res.render("../front_page/end_department_CE.jade");
    }
  );

  // db.end();
});

module.exports = router;
