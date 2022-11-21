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
  destination: (req, file, callback) => {
    callback(null, "./upload/image");
  },
  filename: (req, file, callback) => {
    file.originalname = new Buffer(file.originalname, "ascii").toString(
      "utf-8"
    );
    callback(null, file.originalname);
  },
});
// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(null, Error("only image is allowd"));
  }
};

var upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.get("/", function (req, res, next) {
  res.send("API is Run!!");
});

app.get("/product", function (req, res, next) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    // query to the database and get the records
    request.query("SELECT * FROM dbo.product", function (err, results) {
      if (err) console.log(err);

      // send records as a response
      res.send(results.recordset);
      console.log(results.recordset);
    });
  });
});
app.post("/login", jsonParser, function (req, res, next) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    var username = req.body.username;
    request.query(
      `select * from dbo.user where username = '${username}'`,
      function (err, results) {
        if (err) {
          res.send({ status: "error", message: err });
          return;
        }
        if (results.length == 0) {
          res.send({ status: "error", message: "ไม่พบผู้ใช้ ?" });
          return;
        } else {
          if (req.body.password == results[0].password) {
            var token = "is token";
            res.send({
              status: "ok",
              message: "เข้าสู่ระบบสำเร็จ",
              token,
              uid: results[0].uid,
            });
          } else {
            res.send({
              status: "error",
              message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
            });
          }
        }
        // send records as a response
        // res.send(results.recordset);
        // console.log(results.recordset);
      }
    );
  });
});
app.get("/gg", function (req, res, next) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    // query to the database and get the records
    request.query("SELECT * FROM dbo.main", function (err, results) {
      if (err) console.log(err);

      // send records as a response
      res.send(results.recordset);
      console.log(results.recordset);
    });
  });
});
// app.use("/img",express.static("./asset/img"))
app.post("/upload", upload.single("photo"), (req, res) => {
  res.json(req.file);
});
app.listen(2222, function () {
  console.log("CORS PORT 2222");
});
module.exports = app;
