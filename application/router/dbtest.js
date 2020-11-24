var mysql = require("mysql"); //mysql 모듈 설치
var bodyParser = require("body-parser");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12653",
  database: "workbench",
  port: 3306,
});

console.log("start");
let uid = 201611998;

db.query(
  "SELECT * FROM workbench.voter_info WHERE studentnumber = ?;",
  uid,
  function (error, info, fields) {
    if (error) {
      console.log(error);
    }
    title = info[0].title;
    from = "" + uid;
    org = info[0].org;
    channel = info[0].channel;
    chaincode = info[0].chaincode;

    console.log(
      title + "\n" + from + "\n" + org + "\n" + channel + "\n" + chaincode
    );
    console.log("end");
  }
);

db.end();
