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

    //for a new user joining the room
    socket.on('joinRoom', ({ username, roomname }) => {
      //* create user
      users.push({
        socketId: socket.id,
        userId: username,
        roomname,
      });
      console.log(users);
      socket.join(roomname);

      //display a welcome message to the user who have joined a room
      socket.emit('message', {
        userId: username,
        username,
        text: `Welcome ${username}`,
      });

      //displays a joined room message to all other room users except that particular user
      socket.broadcast.to(roomname).emit('message', {
        userId: username,
        username,
        text: `${username} has joined the chat`,
      });
    });

    socket.on('sendMessage', (text) => {
      console.log(text);
      socket.emit('outputMessage', text);
    });

    //user sending message
    socket.on('chat', (text) => {
      //gets the room user and the message sent
      const userConnection = users.find((u) => u.socketId === socket.id);
      console.log('connection data --- > ', userConnection);
      io.to(userConnection.roomname).emit('message', {
        userId: userConnection.socketId,
        username: userConnection.username,
        text: text,
      });
    });

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
