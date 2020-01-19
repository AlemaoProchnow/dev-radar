const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocket = server => {
  io = socketio(server);

  // "on" é um event listener do Node, ou seja, quando acontecer algo ele executa.
  io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coords: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs),
    });
  });
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter( connection => {
    return calculateDistance( coordinates, connection.coordinates ) < 10
      && connection.techs.some( item => techs.includes(item) );
  } );
};

// Enviando a mensagem de que o usuário atende às condições do socket.
exports.sendMessage = ( to, message, data ) => {
  to.forEach( connection => {
    io.to(connection.id).emit(message, data);

    // emit('message', 'Hello OmniStack');
  } );
};