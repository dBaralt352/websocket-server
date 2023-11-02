'use strict'
const WebSocketClients = require('./WebSocketClients');
const Logger = require('./Logger');

const EventRouter = {
  message: Emit
}

function Handle(client, data){
  try {
    let parsedData = JSON.parse(data.toString());
    let event = parsedData.event;
    let object = parsedData.data;

    if(!event) throw new Error(`No event specified in JSON`);
    if(!EventRouter[event]) throw new Error(`Method for '${event}' Event not found`);

    EventRouter[event](client, {data: object});
    Logger.CreateLog('info', `Event [${event}]: data: ${JSON.stringify(object)}`);
  } catch (error) {
    EmitTo(client, { data: { message: 'Invalid JSON format', error: error.message } });
    Logger.CreateLog('error', error);
  }
}

function Emit(client, { data, ...args }){
  let clients = WebSocketClients.GetClients();
  for(let connection in clients){
    if(clients[connection].includes(client)){
      clients[connection].forEach(client => {
        client.send(JSON.stringify(data));
        Logger.CreateLog('info', `Emitted to [${connection}]: ${JSON.stringify(data)}`);
      });
    }
  }
}

function EmitTo(client, { data, ...args }){
  client.send(JSON.stringify(data));
}

module.exports = { Handle };