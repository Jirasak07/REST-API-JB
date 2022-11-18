var express = require("express");
var app = express();
var bcrypt = require("bcrypt");
var sql = require("mssql");
var config = {
    user: "merlin",
    password: "Admin1629",
    server: "thaiserve.database.windows.net",
    database: "dbproject",
  };
app.get('/',function(req,res,next){
    res.send("API is Run!!");
})
app.get('/gg',function(req,res,next){
    res.send("API is Run!! 222");
})
app.listen(2222, function () {
    console.log("CORS PORT 2222");
  });
  module.exports = app;
