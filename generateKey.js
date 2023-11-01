require('dotenv').config();
const jwt = require('jsonwebtoken');
let appName = process.argv[2];
console.log(jwt.sign({appId: appName}, process.env.APP_SECRET, {noTimestamp: true}));