var express = require('express');
var router = express.Router();
var gsjson = require('google-spreadsheet-to-json');
var token = require("./token.js");
var moment = require('moment');
var Converter = require('csvtojson').Converter;
var converter = new Converter({});
var fs = require("fs");

var clientData = "";
var disabledData = "";
var healthData = ";"
converter.fromFile("./data/disablities.csv", function (err, result) {
  disabledData = result;
})

converter = new Converter({});

converter.fromFile("./data/client.csv", function (err, result) {
  clientData = result;
});

converter = new Converter({});
converter.fromFile("./data/healthanddv.csv", function (err,result) {
  healthData = result;
});

router.get('/clientdata', function (req, res) {
  clientdata(res);
});

router.get('/disableddata', function (req, res) {
  res.json(disabledData);
})

router.get('/healthdata', function (req, res){
  res.json(healthData);
})

function clientdata(res) {
  res.json(moralize(clientData));
}

function moralize(data){
  console.log(data.length);

  var newdata = data;

  for (var i = 0; i < newdata.length; i ++){
    newdata[i].priority = 0;
    for (var c = 0; c < disabledData.length; c ++){

      if (disabledData[c].UserID == newdata[i].UserID){
        newdata[i].disability = true;
      }
    }

    for (var h = 0; h < healthData.length; h++){
      if (healthData[h].UserID == newdata[i].UserID){
        newdata[i].GeneralHealthStatus = healthData[h].GeneralHealthStatus;
        if (healthData[h].PregnancyStatus == 8){
          newdata[i].PregnancyStatus = true;
        }
      }
    }

    if (newdata[i].disability == true) {
      newdata[i].priority += 3;
    }

    if (newdata[i].PregnancyStatus == true){
      newdata[i].priority += 4;
    }

    if (typeof(newdata[i].YearEnteredService) == "number"){
      newdata[i].military = true;
    }else {
      newdata[i].military = false;
    }

    var dobstring = newdata[i].DOB;
    var age = moment().diff(moment(dobstring, 'MM/DD/YYYY'), 'years');
    newdata[i].age = age;
    if (age >= 50 || age <= 10){
      newdata[i].priority += 2;
    }
  }

  return newdata

}


module.exports = router;
