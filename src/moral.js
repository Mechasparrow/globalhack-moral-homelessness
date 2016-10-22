var express = require('express');
var router = express.Router();
var gsjson = require('google-spreadsheet-to-json');

router.get('/clientdata', function (req, res) {
  clientdata(res);
});

function clientdata(res) {
  gsjson({
    spreadsheetId: '1D5r0AQhFoyAWFh77Q_VPHpCN51_ETIIn_q3OSbbELIU',
    token: authtoken,
    worksheet: "Client"
  }).then(function(result) {
    res.json(result);
  });
}

module.exports = router;
