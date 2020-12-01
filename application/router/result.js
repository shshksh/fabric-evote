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
  depart_info_data = JSON.parse(depart_info).candidates;

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

  college_info = await sdk.send(
    false,
    `${info.department}`,
    `${info.college}` + "channel",
    `${info.college}` + "cc",
    "query",
    [`${info.college}` + "vote"],
    res
  );
  college_info_data = JSON.parse(college_info).candidates;

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

  total_info = await sdk.send(
    false,
    `${info.department}`,
    "collegechannel",
    "collegecc",
    "query",
    ["collegevote"],
    res
  );
  total_info_data = JSON.parse(total_info).candidates;

  //후보자 번호 확인 함수
  function num_ary(winner) {
    if (winner % 2 == 0) return 2;
    else return 1;
  }
  //투표결과를 통한 당선자 선정
  function win(d1, d2) {
    if (d1 > d2) return 0;
    else return 1;
  }
  //당선자 학번
  var dewin =
    depart_info_data[win(depart_results[0].votes, depart_results[1].votes)].sid;
  var cowin =
    college_info_data[win(college_results[0].votes, college_results[1].votes)]
      .sid;
  var towin =
    total_info_data[win(total_results[0].votes, total_results[1].votes)].sid;

  let devote = {
    dw: dewin + ".jpg",
    num: num_ary(dewin),
    de1data: depart_results[0].votes,
    de2data: depart_results[1].votes,
    winner: depart_info_data[(num_ary(dewin) + 1) % 2].name,
    de1name: depart_info_data[0].name,
    de2name: depart_info_data[1].name,
  };
  let colvote = {
    cw: cowin + ".jpg",
    num: num_ary(cowin),
    co1data: college_results[0].votes,
    co2data: college_results[1].votes,
    winner: college_info_data[(num_ary(dewin) + 1) % 2].name,
    de1name: college_info_data[0].name,
    de2name: college_info_data[1].name,
  };
  let tovote = {
    tw: towin + ".jpg",
    num: num_ary(towin),
    to1data: total_results[0].votes,
    to2data: total_results[1].votes,
    winner: total_info_data[(num_ary(dewin) + 1) % 2].name,
    de1name: total_info_data[0].name,
    de2name: total_info_data[1].name,
  };

  res.render("../front_page/result.jade", { devote, colvote, tovote });
});

module.exports = router;
