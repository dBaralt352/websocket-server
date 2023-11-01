'use strict'
require('dotenv').config();
const EventHandler = require('./app/EventHandler');
const ConnectionHelper = require('./app/ConnectionHelper');
const WebSocketClients = require('./app/WebSocketClients');
const ws = require('ws');
const server = new ws.Server({
  port: process.env.PORT
});

server.on('connection', (ws, req) => {
  ConnectionHelper.validateClient(ws, req);
  console.log('Client connected');
  // Events.clients.add(ws);
  ws.on('message', (message) => {
    console.log(message.toString());
    EventHandler.EmitTo(message);
  });
  ws.on('close', () => {
    console.log('Client disconnected');
    WebSocketClients.removeClient(ws);
  });
});