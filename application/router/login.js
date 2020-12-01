var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var router = express.Router();

router.use(bodyParser.json());

var connection = mysql.createConnection({
  host: "localhost", //localhost와suid mysql이 같은 컴퓨터에 있다.
  user: "root",
  password: "12653",
  database: "workbench",
  port: 3306,
});

router.get("/", function (req, res) {
  console.log("login"); //console창 출력
  module.exports.conn = connection;
  res.render("../front_page/login.jade");
});

router.post("/", function (req, res) {
  console.log("login"); //console창 출력

  userid = req.body.id;
  userpw = req.body.pw;

  console.log(userid, userpw);

  connection.query(
    "SELECT * FROM workbench.voter WHERE studentnumber=?;",
    [userid],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.send({ result: false });
        return;
      }

      if (userid == results[0].studentnumber) {
        console.log("Success ID");
        if (userpw == results[0].password) {
          module.exports.info = results[0];
          res.send({ result: true });
          return;
        }
        console.log("pw가 일치하지 않습니다." + " " + "다시 입력해주십시오");
        res.send({ result: false });
        return;
      }
      console.log("id가 존재하지 않습니다" + "\n" + "투표 대상이 아닙니다.");
      res.send({ result: false });
      return;
    }
  );
});

module.exports = router;
