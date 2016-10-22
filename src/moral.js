var express = require('express');
var router = express.Router();
var gsjson = require('google-spreadsheet-to-json');
var token = require("./token.js");
var moment = require('moment');
var authtoken = "";



token.getToken (function (token) {
  authtoken = token;
});

router.get('/clientdata', function (req, res) {
  clientdata(res, authtoken);
});

function clientdata(res, authtoken) {
    gsjson({
      spreadsheetId: '1D5r0AQhFoyAWFh77Q_VPHpCN51_ETIIn_q3OSbbELIU',
      token: authtoken,
      worksheet: "Client"
    }).then(function(result) {
      res.json(moralize(result));
    });

}

function moralize(data){
  console.log(data.length);

  var newdata = data;

  for (var i = 0; i < newdata.length; i ++){
    newdata[i].priority = Math.random();

    var dobstring = newdata[i].dob;
    console.log(dobstring);
  }

  return newdata

}


module.exports = router;
