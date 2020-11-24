var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mysql = require('mysql');

router.use(bodyParser.json());

//login에서 입력된 유권자의 id,password
var userid, userpw;

//mysql 연동
var connection = mysql.createConnection({

  host: 'localhost',//localhost와suid mysql이 같은 컴퓨터에 있다.
  user: 'root',
  password: '12653',
  database: 'workbench',
  port: 3306

});

// //db테이블 전체 확인
// connection.query('SELECT * FROM voter', function (error, results, fields) {
//   if (error) {
//     console.log(error);
//   }
//   console.log(results);
// });

//투표 시작 화면 출력
router.post('/', function (req, res) {

  console.log("start_vote");  //console창 출력

  userid=req.body.id; userpw = req.body.pw;
  console.log('id=' + userid + '\n' + 'pw=' + userpw);
  module.exports.uid=userid;

  let result = idpw(userid, userpw);

  if (result === false) {  //유권자가 아님을 나타내는 문구와 로그인페이지로 돌아가는 링크 제시
    res.send(`
            <h1>You have no VOTING RIGHTS </h1>
            <a href="/login">Login</a>
            `);
  }
  else {
    //중복확인 쿼리
    connection.query('SELECT * FROM workbench.voter WHERE studentnumber=?;', [userid], function (error, check, fields) {
      if (error) {
        console.log(error);
      }
      var a = check[0].overlap;
      var num = check[0].department;

      if (a == 0) {  //중복검사(check값 확인)
        //로그인에 성공한 경우 중복검사 변수 overlap값 1
        connection.query('UPDATE workbench.voter SET overlap = 1 WHERE studentnumber=?;', [userid], function (error, results, fields) {
          if (error) {
            console.log(error);
          }
        })
        //유권자의 단과대에 따라 단과대투표페이지 연결
        if(num == 'IT'){
            res.render('../front_page/start_vote.jade',{depart:'./vote_department_IT'});
        }
        else if(num == 'COM'){
            res.render('../front_page/start_vote.jade',{depart:'./vote_department_COM'});
        }
        else if(num == 'KOR'){
            res.render('../front_page/start_vote.jade',{depart:'./vote_department_KOR'});
        }
        else if(num == 'ENG'){
            res.render('../front_page/start_vote.jade',{depart:'./vote_department_ENG'});
        }
        else{
            console.log(error);
        }
      }
      else {           //중복인 경우 로그인페이지로 돌아가는 링크와 문구 제시
        console.log("이미 투표한 유권자 입니다.");
        res.send(`  
                <h1>You already voted!!!!!!</h1>
                <a href="/login">Login</a>
                `);
      }
    });

  }
});

//id,pw 존재 및 일치 여부 확인 함수
function idpw(id, pw) {
  //db에 유권자 id가 존재하는지 확인
  connection.query('SELECT studentnumber,password FROM voter;', function (error, results, fields) {
    if (error) {
        //console.log('result='+results);
        console.log(error);
        return false;
    }
    
    for (let n=0; n<results.length; n++) {
      if (id == results[n].studentnumber) {    //db에 유권자 id가 존재하는 경우
        //해당 id에 일치하는 pw확인
        console.log('Success ID');
        if (pw === results[n].password){
          return true;
        }
        console.log('pw가 일치하지 않습니다.' + ' ' + '다시 입력해주십시오');
        return false;
      }

    }
    console.log('id가 존재하지 않습니다' + '\n' + '투표 대상이 아닙니다.');
    return false;  
  });
}

module.exports = router;