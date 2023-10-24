const cors = require('cors');
const Events = require('./Events');
const allowedOrigins = [
  'https://fenixcargo.helgasys.com',
  'https://atc.helgasys.com',
  'https://janaklogistics.helgasys.com',
  'https://camlogistics.helgasys.com',
  'https://shipper.helgasys.com',
  'https://360cargoexpress.helgasys.com',
  'https://casillerointernacional.helgasys.com',
  'https://pidobox.helgasys.com',
  'https://dzcargo.helgasys.com',
  'https://latinoamericapack.helgasys.com',
  'https://newexpress.helgasys.com',
  'https://supershipping.helgasys.com',
  'https://rialan.helgasys.com',
  'https://msl.helgasys.com',
  'https://anchorcargo.helgasys.com',
  'https://shopandshippingusa.helgasys.com',
  'https://pickabox.helgasys.com',
  'https://tlscarga.helgasys.com',
  'https://msmcargoexpress.helgasys.com',
  'https://directionalcorp.helgasys.com',
  'https://procargacolombia.helgasys.com',
  'https://servicargoexpress.helgasys.com',
  'https://logybox.helgasys.com',
  'https://thecourierexpert.helgasys.com',
  'https://jdlogistics.helgasys.com',
  'https://eurodirectoexpress.helgasys.com',
  'https://angels.helgasys.com',
  'https://twinsservices.helgasys.com',
  'https://wisecargo.helgasys.com',
  'https://ala.helgasys.com',
  'https://rapimex.helgasys.com',
  'https://aimpaq.helgasys.com',
  'https://gpgfreight.helgasys.com',
  'https://landstand.helgasys.com',
  'https://atcny.helgasys.com',
  'https://multicargoexpress.helgasys.com',
  'https://gms.helgasys.com',
  'https://colocar.helgasys.com',
  'https://test.helgasys.com',
  'https://multicourier.helgasys.com',
  'https://iec.helgasys.com',
  'http://127.0.0.1:8001',
  'http://localhost:8001',
]
const validateClient = (socket, req) => {
  const origin = req.headers.origin;
  console.log('origin', origin);
  if (!allowedOrigins.includes(origin)) {
    socket.send(JSON.stringify({
      type: 'error',
      message: 'Origin not allowed'
    }));
    socket.close();
    return false;
  }
  if(Events.clients[origin] === undefined)
    Events.clients[origin] = new Set();
  Events.clients[origin].add(socket);
}
module.exports = { allowedOrigins, validateClient};