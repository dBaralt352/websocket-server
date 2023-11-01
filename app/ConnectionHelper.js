const WebSocketClients = require('./WebSocketClients');
const jwt = require('jsonwebtoken');
const Logger = require('./Logger');
const allowedClients = [
  "ATC",
  "PIDOBOX"
];
const validateClient = (socket, req) => {
  let clientId = jwt.verify(req.headers['websocket-token'], process.env.APP_SECRET);
  Logger.CreateLog('info', `Client connected: ${clientId.appId}`);
  if (!allowedClients.includes(clientId.appId)) {
    Logger.CreateLog('error', `Client not allowed: ${clientId.appId}`);
    socket.close(1000, 'Client not allowed');
    return false;
  }
  WebSocketClients.addClient(clientId.appId, socket);
}
module.exports = { validateClient };