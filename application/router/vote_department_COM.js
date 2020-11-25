var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var mysql = require("mysql");
const num = require("./select");

router.use(bodyParser.json());

var connection = mysql.createConnection({
  host: "localhost", //localhost와suid mysql이 같은 컴퓨터에 있다.
  user: "root",
  password: "12653",
  database: "workbench",
  port: 3306,
});

//컴퓨터공학과 투표 후보자 화면 출력
router.post("/", function (req, res) {
  console.log("vote_department_COM"); //console창 출력

  connection.query(
    "SELECT * FROM workbench.voter WHERE studentnumber=?;",
    [num.uid],
    function (error, check, fields) {
      if (error) {
        console.log(error);
      }
      var overlap = check[0].overlap;

      if (overlap == 0) {
        //중복검사(check값 확인)
        //로그인에 성공한 경우 중복검사 변수 overlap값 1
        console.log(num.uid);
        connection.query(
          "UPDATE workbench.voter SET overlap = 1 WHERE studentnumber=?;",
          [num.uid],
          function (error, results, fields) {
            if (error) {
              console.log(error);
            } else {
              //유권자의 단과대에 따라 단과대투표페이지 연결
              res.render("../front_page/vote_department_COM.jade");
            }
          }
        );
      } else {
        //중복인 경우 로그인페이지로 돌아가는 링크와 문구 제시
        console.log("이미 투표한 유권자 입니다.");
        res.send(`  
                    <h1>You already voted!!!!!!</h1>
                    <a href="/login">Login</a>
                    `);
      }
    }
  );
});

module.exports = router;
