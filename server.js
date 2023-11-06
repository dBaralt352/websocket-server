'use strict'
require('dotenv').config();
const EventHandler = require('./app/EventHandler');
const ConnectionHelper = require('./app/ConnectionHelper');
const WebSocketClients = require('./app/WebSocketClients');
const ws = require('ws');
const server = new ws.Server({
  port: process.env.PORT || 6001
});

server.on('connection', (ws, req) => {
  ConnectionHelper.ValidateClient(ws, req);
  ws.on('message', (data) => {
    EventHandler.Handle(ws, data);
  });
  ws.on('close', () => {
    WebSocketClients.RemoveClient(ws);
  });
});