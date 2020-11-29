var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var moment = require("moment");
const num = require("./select");

router.use(bodyParser.json());

//공과대 투표 화면 출력
router.post("/", async function (req, res) {
  console.log("result"); //console창 출력
  // res.render('../front_page/result.jade');
  let time = moment().format("YYYYMMDDhhmmss");
  console.log(`current time: ${time}`);

  deadline = num.deadline

  if (time <= num.deadline) {
    res.render("../front_page/result.jade");
  } else {
    console.log('not now')
  }
});

module.exports = router;
