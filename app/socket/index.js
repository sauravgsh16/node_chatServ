'use strict';

const helpers = require('../helpers');

module.exports = (io, app) => {
  let allrooms = app.locals.chatRooms;

  io.of('roomslist').on('connection', (socket) => {

    socket.on('getChatRooms', () => {
      socket.emit('chatRoomsList', JSON.stringify(allrooms));
    });

    socket.on('createNewRoom', (newRoomInput) => {
      // Check to see if the room with the same title exists, if not
      // create one and broadcast to every user
      if (!helpers.findRoomByName(allrooms, newRoomInput)) {
        // create a new room
        allrooms.push({
          room: newRoomInput,
          roomID: helpers.randomHex(),
          users: []
        })
        // Emit an updated list to the creator, the below only updates the socket connection for the current user
        socket.emit('chatRoomsList', JSON.stringify(allrooms));
        // Emit an updated list to everyone connected to the rooms page
        // This broadcasts the updated list to everyone
        socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms));
      }
    })
  })
}