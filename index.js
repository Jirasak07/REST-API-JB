var express = require("express");
var app = express();
// var bcrypt = require("bcrypt");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
// const saltRounds = 10;
// var jwt = require("jsonwebtoken");
// const secret = "JirasakPRJ2022";
const multer = require("multer");
var sql = require("mssql");
var config = {
    user: "merlin",
    password: "Admin5409",
    server: "thaiserve.database.windows.net",
    database: "dbproject",
  };
  // img storage confing
var imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./asset/img");
    },
    filename:(req,file,callback)=>{
      file.originalname = new Buffer(file.originalname, 'ascii').toString('utf-8');
        callback(null,file.originalname)
    }
  });
  // img filter
  const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(null,Error("only image is allowd"))
    }
  }
  
  var upload = multer({
    storage:imgconfig,
    fileFilter:isImage
  })
 
app.get('/',function(req,res,next){
    res.send("API is Run!!");
})
app.get('/gg',function(req,res,next){
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
app.post('/upload',function(req,res,next){

})
app.listen(2222, function () {
    console.log("CORS PORT 2222");
  });
  module.exports = app;
