'use strict'
const WebSocketClients = require('./WebSocketClients');
const jwt = require('jsonwebtoken');
const Logger = require('./Logger');
const url = require('url');

const AllowedClients = [
  "app1"
];

const ValidateClient = (socket, req) => {
  try {
    let token = url.parse(req.url, true).query.token;
    if(!token)
      socket.close(3000, 'No token provided on url parameters');
    let clientId = jwt.verify(token, process.env.APP_SECRET);

    Logger.CreateLog('info', `Client connected: ${clientId.appId}`);
    if (!AllowedClients.includes(clientId.appId)) {
      Logger.CreateLog('error', `Client not allowed: ${clientId.appId}`);

      socket.close(1000, 'Client not allowed');
    }
    WebSocketClients.AddClient(clientId.appId, socket);
  } catch (error) {
    socket.close(1011, `Server Error ${error.message}`);
    Logger.CreateLog('error', `Server Error ${error.message}`);
  }
}

module.exports = { ValidateClient };