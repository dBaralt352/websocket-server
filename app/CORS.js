const cors = require('cors');
const corsOptions = {
  origin: ['*']
};
const validateClient = (socket, req) => {
  const origin = req.headers.origin;
  isOriginAllowed(origin)
  .then((allowed) => {
    if (!allowed) {
      socket.send(JSON.stringify({
        type: 'error',
        data: 'Origin not allowed'
      }));
      socket.close();
    }
  });
}
function isOriginAllowed(origin) {
  return new Promise((resolve, reject) => {
    cors(corsOptions)(origin, { get: () => origin }, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
module.exports = { corsOptions, validateClient};