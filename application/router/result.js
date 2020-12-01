var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var sdk = require("./sdk");
const login = require("./login");

router.use(bodyParser.json());

//투표결과화면
router.post("/", async function (req, res) {
  console.log("vote_result"); //console창 출력

  info = login.info;

  depart_data = await sdk.send(
    false,
    `${info.department}`,
    `${info.department}` + "channel",
    `${info.department}` + "cc",
    "query",
    [`${info.department}` + "vote", "total"],
    res
  );
  depart_results = JSON.parse(depart_data).results;

  depart_info = await sdk.send(
    false,
    `${info.department}`,
    `${info.department}` + "channel",
    `${info.department}` + "cc",
    "query",
    [`${info.department}` + "vote"],
    res
  );
  depart_info_data = JSON.parse(depart_data).candidates;
  
  college_data = await sdk.send(
    false,
    `${info.department}`,
    `${info.college}` + "channel",
    `${info.college}` + "cc",
    "query",
    [`${info.college}` + "vote", "total"],
    res
  );
  college_results = JSON.parse(college_data).results;

  total_data = await sdk.send(
    false,
    `${info.department}`,
    "collegechannel",
    "collegecc",
    "query",
    ["collegevote", "total"],
    res
  );
  total_results = JSON.parse(total_data).results;

  //유권자가 컴공일 경우, 후보자들 학번(from 백앤드), 전체 표 수
  let images = {
    dw: depart_results[0].sid + ".jpg",
    cw: college_results[0].sid + ".jpg",
    tw: total_results[0].sid + ".jpg",
  };

  let datas = {
    de1data: depart_results[0].votes,
    de2data: depart_results[1].votes,
    co1data: college_results[0].votes,
    co2data: college_results[1].votes,
    to1data: total_results[0].votes,
    to2data: total_results[1].votes
  }

  res.render("../front_page/result.jade", {
    images,
    datas,
  });
});

module.exports = router;
