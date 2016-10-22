var fs = require('fs');
var readline = require('readline');

module.exports = {getToken: function (callback) {
  fs.readFile('./authtoken.json', function getClientToken(err, content) {
    if (err) {
      console.log('Error loading auth token');
      return;
    }

    callback(JSON.parse(content).token);
  })
}}
