var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var moment = require("moment");
var sdk = require("./sdk");

router.use(bodyParser.json());

//공과대 투표 화면 출력
router.post("/", async function (req, res) {
  console.log("result"); //console창 출력
  // res.render('../front_page/result.jade');
  let time = moment().format("YYYYMMDDhhmmss");
  console.log(`current time: ${time}`);

  args = ["itvote"];
  data = await sdk.send(
    false,
    "itcae",
    "itchannel",
    "itcc",
    "query",
    args,
    res
  );
  periods = JSON.parse(data).periods;
  _open = periods[0];
  _deadline = periods[1];
  console.log(_open, _deadline);

  if (time <= _deadline) {
    console.log("not now");
  } else {
    res.render("../front_page/result.jade");
  }
});

module.exports = router;
