var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var sdk = require("./sdk");
const login = require("./login");

router.use(bodyParser.json());

//영어영문과 투표 후보자 화면 출력
router.post("/", async function (req, res) {
  console.log("vote_department_ENG"); //console창 출력
  var connection = login.conn;
  var info = login.info;
  //투표를 시작하는 경우 중복검사 변수 overlap값 1
  connection.query(
    "UPDATE workbench.voter SET overlap = 1 WHERE studentnumber=?;",
    [info.studentnumber],
    function (error, results, fields) {
      if (error) {
        console.log(error);
      }
    }
  );

  data = await sdk.send(
    false,
    `${info.department}`,
    `${info.department}` + "channel",
    `${info.department}` + "cc",
    "query",
    [`${info.department}` + "vote"],
    res
  );
  candidates = JSON.parse(data).candidates;

  res.render("../front_page/vote_department_ENG.jade", {
    cand1: candidates[0].name,
    cand2: candidates[1].name,
  });
});

module.exports = router;
