'use strict'
require('dotenv').config();
const Events = require('./app/Events');
const CORS = require('./app/CORS');
const ws = require('ws');
const server = new ws.Server({
  port: process.env.PORT || 8000
});

server.on('connection', (ws, req) => {
  let origin=req.headers.origin;
  console.log('connection', origin);
  CORS.validateClient(ws, req);
  ws.on('message', (message) => {
    Events.emitToOrigin(origin, message);
  });
  ws.on('close', () => {
    console.log('close', origin);
    if(origin in Events.clients)
      Events.clients[origin].delete(ws);
  });
});