'use strict'
const WebSocketClients = require('./WebSocketClients');
const jwt = require('jsonwebtoken');
const Logger = require('./Logger');

const AllowedClients = [
  "app1"
];

const ValidateClient = (socket, req) => {
  try {
    if(!req.headers['websocket-token'])
      socket.close(1000, 'websocket-token not found in header');
    let clientId = jwt.verify(req.headers['websocket-token'], process.env.APP_SECRET);

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