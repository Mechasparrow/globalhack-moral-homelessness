var express = require('express')
var app = express()

var fs = require('fs');
var readline = require('readline');

var authtoken = "";



fs.readFile('authtoken.json', function getClientToken(err, content) {
  if (err) {
    console.log('Error loading auth token');
    return;
  }
  console.log(JSON.parse(content));
  authtoken = JSON.parse(content);

});

console.log(authtoken);

app.use(express.static('public'));

app.use('/', require('./src/moral.js'));

app.listen(3000, function () {
  console.log('Listening on port 3000')
});
