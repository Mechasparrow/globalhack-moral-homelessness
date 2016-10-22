var express = require('express');
var router = express.Router();
var gsjson = require('google-spreadsheet-to-json');
var token = require("./token.js");
var moment = require('moment');
var Converter = require('csvtojson').Converter;
var converter = new Converter({});
var fs = require("fs");

var clientData = "";



converter.on("end_parsed", function (jsonArray){
  clientData = jsonArray;
})

fs.createReadStream("./data/client.csv").pipe(converter);

token.getToken (function (token) {
  authtoken = token;
});

router.get('/clientdata', function (req, res) {
  clientdata(res, authtoken);
});

function clientdata(res, authtoken) {
  res.json(moralize(clientData));
}

function moralize(data){
  console.log(data.length);

  var newdata = data;

  for (var i = 0; i < newdata.length; i ++){
    newdata[i].priority = 0;

    var dobstring = newdata[i].DOB;
    var age = moment().diff(moment(dobstring, 'MM/DD/YYYY'), 'years');
    if (age >= 50 || age <= 10){
      newdata[i].priority += 2;
    }
  }

  return newdata

}


module.exports = router;
