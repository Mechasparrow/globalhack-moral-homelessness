var express = require('express')
var app = express()
var gsjson = require('google-spreadsheet-to-json');


app.use(express.static('public'));

app.get('/clientdata', function (req, res) {
    gsjson({
      spreadsheetId: '1D5r0AQhFoyAWFh77Q_VPHpCN51_ETIIn_q3OSbbELIU',
      token: "ya29.Ci-EAySu-jp3M3KOF3ZUW63CVymjoUOI_8bqUJF7Oj-jTV6Rhg4dzqYcgNqp_XXLsQ",
      worksheet: "Funder"
    }).then(function(result) {
      res.json(result);
    });
});

app.listen(3000)
console.log("listening on port 3000");
