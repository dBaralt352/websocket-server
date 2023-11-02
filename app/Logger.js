'use strict'
const fs = require('fs');

const Routes = {
  error: 'logs/error.log',
  info: 'logs/info.log',
}

function CreateLog(logName, logMessage){
  fs.appendFile(Routes[logName], `${logMessage}\n`, function (err) {
    if (err) throw err;
  });
}

module.exports = { CreateLog };