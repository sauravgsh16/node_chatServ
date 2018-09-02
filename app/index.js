'use strict';

// Bring in the authentication module in the main app file.
require('./auth')();

let ioServer = (app) => {
  // app.locals -> can store app level data
  app.locals.chatRooms = []
  const server = require('http').Server(app);
  const io = require('socket.io')(server);
  // io needs to hook into the session/request stream to access the data present
  // middleware function can be attached, which accepts a function, with socket as a parameter
  io.use((socket, next) => {
    require('./session')(socket.request, socket.request.res, next);
  });
  require('./socket')(io, app);
  return server;
}

module.exports = {
  router: require('./routes')(),
  session: require('./session'),
  ioServer
};