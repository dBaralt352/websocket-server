'use strict'
const Clients = {}

function AddClient (connection, client) {
  if(!Clients[connection]) Clients[connection] = []
  if(Clients[connection].includes(client)) return
  Clients[connection].push(client)
}

function RemoveClient (client) {
  try{
    for(let connection in Clients){
      if(Clients[connection].includes(client)){
        Clients[connection].splice(Clients[connection].indexOf(client), 1)
      }
    }
  }catch(e){
    console.error(e)
  }
}

function GetClients(){
  return Clients
}

module.exports = { AddClient, RemoveClient, GetClients }