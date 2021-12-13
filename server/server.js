require('dotenv').config();
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const morgan = require('morgan');
const cors = require('cors');
const { readdirSync } = require('fs');
const { dbConnection } = require('./config/db');
const { socketConnection } = require('./socket/socket-connection');

// Base de datos
dbConnection();

// app
const app = express();

// Create HTTP server
const server = http.createServer(app);

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// routes middleware
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

//Error
const errorHandler = (err, req, res, next) => {
  console.log(JSON.stringify(err));
  res
    .status(500)
    .send({ error: typeof err.message !== 'undefined' ? err.message : err });
};

app.use(errorHandler);

// Create socket connection
socketConnection(server);

// global.io = socketio.listen(server);
// global.io.on('connection', WebSockets.connection);

/** Listen on provided port, on all network interfaces. */
const port = process.env.PORT || 6789;

server.listen(port, () => {
  console.log('Servidor corriendo en puerto http://localhost:' + port);
});
