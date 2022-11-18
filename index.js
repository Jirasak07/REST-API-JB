var express = require("express");
var app = express();

app.get('/',function(req,res,next){
    res.send("API is Run!!");
})
app.listen(2222, function () {
    console.log("CORS PORT 2222");
  });
  module.exports = app;