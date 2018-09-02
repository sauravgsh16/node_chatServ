'use strict';

module.exports = (io, app) => {
  let allrooms = app.locals.chatRooms;

  io.of('roomslist').on('connection', (socket) => {
    socket.on('getChatRooms', () => {
      socket.emit('chatRoomsList', JSON.stringify(allrooms));
    });

    socket.on('createNewRoom', (newRoomInput) => {
      console.log('Room:', newRoomInput);
    })
  })
}