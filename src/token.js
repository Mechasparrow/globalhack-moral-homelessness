var fs = require('fs');
var readline = require('readline');

function getAuthToken(){
  fs.readFile('./authtoken.json', function getClientToken(err, content) {
    if (err) {
      console.log('Error loading auth token');
      return;
    }

    return JSON.parse(content).token;
  })
}

var authtoken = getAuthToken();

module.exports = {token: authtoken}
