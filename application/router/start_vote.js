var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var mysql = require("mysql");
const num = require("./select");

router.use(bodyParser.json());

//mysql 연동
var connection = mysql.createConnection({
  host: "localhost", //localhost와suid mysql이 같은 컴퓨터에 있다.
  user: "root",
  password: "12653",
  database: "workbench",
  port: 3306,
});

// //db테이블 전체 확인
// connection.query('SELECT * FROM voter', function (error, results, fields) {
//   if (error) {
//     console.log(error);
//   }
//   console.log(results);
// });

//투표 시작 화면 출력
router.post("/", function (req, res) {
  console.log("start_vote"); //console창 출력

  connection.query(
    "SELECT * FROM workbench.voter WHERE studentnumber=?;",
    [num.uid],
    function (error, check, fields) {
      if (error) {
        console.log(error);
      }
      var overlap = check[0].overlap;
      var department = check[0].department;

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
              if (department == "IT") {
                res.render("../front_page/start_vote.jade", {
                  depart: "./vote_department_IT",
                });
              } else if (department == "COM") {
                res.render("../front_page/start_vote.jade", {
                  depart: "./vote_department_COM",
                });
              } else if (department == "KOR") {
                res.render("../front_page/start_vote.jade", {
                  depart: "./vote_department_KOR",
                });
              } else if (department == "ENG") {
                res.render("../front_page/start_vote.jade", {
                  depart: "./vote_department_ENG",
                });
              } else {
                console.log(error);
              }
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
