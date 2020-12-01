var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var sdk = require("./sdk");
const login = require("./login");

router.use(bodyParser.json());

//총학 투표 화면 출력
router.post("/", async function (req, res) {
  console.log("vote_total"); //console창 출력

  var info = login.info;

  data = await sdk.send(
    false,
    `${info.department}`,
    "collegechannel",
    "collegecc",
    "query",
    ["collegevote"],
    res
  );
  candidates = JSON.parse(data).candidates;

  res.render("../front_page/vote_total.jade", {
    cand1: candidates[0].name,
    cand2: candidates[1].name,
  });
});

module.exports = router;
