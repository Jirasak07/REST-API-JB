var express = require("express");
var app = express();
var bcrypt = require("bcrypt");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const secret = "JirasakPRJ2022";
var sql = require("mssql");
var config = {
    user: "merlin",
    password: "Admin5409",
    server: "thaiserve.database.windows.net",
    database: "dbproject",
  };
app.get('/',function(req,res,next){
    res.send("API is Run!!");
})
app.get('/gg',function(req,res,next){
    bcrypt.hash("req.body.password", saltRounds, function (err, hash){
        res.send(hsah)
    }),
    sql.connect(config, function (err) {
        if (err) console.log(err);
    
        // create Request object
        var request = new sql.Request();
    
        // query to the database and get the records
        request.query("SELECT * FROM dbo.main", function (err, results) {
          if (err) console.log(err);
    
          // send records as a response
          res.send(results.recordset);
          console.log(results.recordset)
        });
      });
})
app.listen(2222, function () {
    console.log("CORS PORT 2222");
  });
  module.exports = app;
