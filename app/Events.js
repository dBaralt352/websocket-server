const clients = {};

function emit(data){
  for(let origin in clients){
    clients[origin].forEach((client) => {
      client.send(data);
    });
  }
}
function emitToOrigin(origin, data){
  console.log('emitToOrigin', origin, data);
  clients[origin].forEach((client) => {
    client.send(data);
  });
}

module.exports = { emit, emitToOrigin, clients };