
var http = require('http');
var path = require('path');
var URL = require('url');
var config = require('./config/config');
var express = require('express');
var request = require('request');

var app = express();
app.use(express.static(__dirname));


var port = process.env.PORT || 3000;
var signIn = require("./sign");
signIn(app);

app.get('/', function(req, res){
    var indexhttp = path.join(__dirname, 'index.html');
    res.send(indexhttp);
});
app.listen(port, function () {
  console.log('Node app listening on port ' + port + '!');
});