const clients = new Set();

function emit(data){
  clients.forEach((client) => {
    client.send(data);
    console.log('Message sent to client');
  });
}

module.exports = { emit, clients };