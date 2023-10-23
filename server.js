'use strict'
require('dotenv').config();
const Events = require('./app/Events');
const CORS = require('./app/CORS');
const ws = require('ws');
const server = new ws.Server({
  port: process.env.PORT
});

// CORS.corsOptions=['123.']

server.on('connection', (ws, req) => {
  //CORS.validateClient(ws, req);
  console.log('Client connected');
  Events.clients.add(ws);
  ws.on('message', (message) => {
    console.log(message.toString());
    Events.emit(message);
  });
  ws.on('close', () => {
    console.log('Client disconnected');
    Events.clients.delete(ws);
  });
});