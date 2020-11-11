var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path= require('path');

router.use(bodyParser.json());

router.get('/', function(req, res){
    console.log("login");  //console창 출력
    res.render('../front_page/login.jade');
});


module.exports = router;