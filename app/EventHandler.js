const WebSocketClients = require('./WebSocketClients');

function Emit(data){
  let clients = WebSocketClients.getClients();
  for(let origin in clients){
    clients[origin].forEach((client) => {
      client.send(data);
    });
  }
}
function EmitTo(connection, data){
  
  clients[origin].forEach((client) => {
    client.send(data);
  });
}

module.exports = { Emit, EmitTo };