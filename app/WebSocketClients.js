const Clients = {}

function addClient (connection, client) {
  if(!Clients[connection]) Clients[connection] = []
  if(Clients[connection].includes(client)) return
  Clients[connection].push(client)
}

function removeClient (client) {
  try{
    for(let connection in Clients){
      if(Clients[connection].includes(client)){
        Clients[connection].splice(Clients[connection].indexOf(client), 1)
      }
    }
  }catch(e){
    console.log(e)
  }
}

function getClients(){
  return Clients
}

module.exports = { addClient, removeClient, getClients }