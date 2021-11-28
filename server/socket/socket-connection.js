const { Server } = require('socket.io');
let users = [];

const subscribeOtherUser = (socket, room, otherUserId) => {
  const userSockets = users.filter((user) => user.userId === otherUserId);
  userSockets.map((userInfo) => {
    if (socket.connected) {
      socket.join(room);
      console.log('joined');
    }
  });
};

const socketConnection = (server) => {
  const io = new Server(server, {
    cors: {
      origins: ['*'],
    },
  });
  global.io = io;

  io.on('connection', (socket) => {
    console.log('a user connected ');

    // event fired when the chat room is disconnected
    socket.on('disconnect', () => {
      console.log('user disconnected');
      users = users.filter((user) => user.socketId !== socket.id);
    });

    // add identity of user mapped to the socket id
    socket.on('identity', (userId) => {
      users.push({
        socketId: socket.id,
        userId: userId,
      });
      console.log(users);
    });

    // subscribe person to chat & other user as well
    socket.on('subscribe', (room, otherUserId = '') => {
      subscribeOtherUser(socket, room, otherUserId);
      socket.join(room);
    });

    // mute a chat room
    socket.on('unsubscribe', (room) => {
      socket.leave(room);
    });
  });
};

module.exports = {
  socketConnection,
};
