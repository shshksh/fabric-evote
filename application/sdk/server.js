const express = require('express');
const app = express();
var path = require('path');
var sdk = require('../router/sdk');
const PORT = 8081;
const HOST = 'localhost';

app.get('/api/create', function(req, res) {
    var title = req.query.title;
    var org = req.query.org;
    var channel = req.query.channel;
    var chaincode = req.query.chaincode;

    let args = [title];
    sdk.send(true, org, channel, chaincode, 'create', args, res);
});

app.get('/api/enroll', function(req, res) {
    var title = req.query.title;
    var name = req.query.name;
    var major = req.query.major;
    var sid = req.query.sid;
    var college = req.query.college;
    var org = req.query.org;
    var channel = req.query.channel;
    var chaincode = req.query.chaincode;

    let args = [title, name, major, sid, college]
    sdk.send(true, org, channel, chaincode, 'enroll', args, res)
});

app.get('/api/vote', function(req, res) {
    var title = req.query.title;
    var from = req.query.from;
    var to = req.query.to;
    var org = req.query.org;
    var channel = req.query.channel;
    var chaincode = req.query.chaincode;

    let args = [title, from, to];
    sdk.send(true, org, channel, chaincode, 'vote', args, res);
});

app.get('/api/query', function(req, res) {
    var title = req.query.title;
    var org = req.query.org;
    var channel = req.query.channel;
    var chaincode = req.query.chaincode;

    let args = [title];
    sdk.send(false, org, channel, chaincode, 'query', args, res);
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)
