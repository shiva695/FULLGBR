//Deppendencies Import
const { format } = require('date-fns')

//Files Imports
const config = require('../config')

//Utils Import
const logger = require('../utils/logger.utils')
const auth = require('../utils/auth.utils')
const redis = require('../utils/redis.utils')
const constantUtils = require('../utils/constant.utils')

const adminSocket = require('../sockets/admin.socket')

const utils = {}

utils.notificationSocket = {}
utils.adminSocket = {}
utils.userSocket = {}
utils.defaultSocket = {}

utils.io = {}

utils.socketConsole = (socket, msg = '') => {
  logger.info('SOCKET : ' + msg + format(new Date(socket.handshake.time), 'p') + ' ' + socket.id)
}

utils.socketConnection = async (socket, namespace = 'ADMIN', type = 'CONNECT') => {
  let redisKey = ''
  if (namespace === 'ADMIN') redisKey = constantUtils.ADMIN_CONNECTIONS
  if (namespace === 'USER') redisKey = constantUtils.USER_CONNECTIONS
  if (type === 'CONNECT') {
    const connections = await redis.get(redisKey)
    if (!connections) {
      redis.set(redisKey, [])
    }

    redis.set(redisKey, [...connections, socket.id])
    logger.info(`SOCKET : ${namespace} CONNECTED ${format(new Date(socket.handshake.time), 'p')} ${socket.id}`)
  } else {
    const connections = await redis.get(redisKey)
    if (connections)
      redis.set(
        redisKey,
        connections.filter((each) => each !== socket.id)
      )
    logger.info(`SOCKET : ${namespace} DISCONNECTED ${format(new Date(socket.handshake.time), 'p')} ${socket.id}`)
  }
}

// const notificationSocketConnect = (ioConnect) => {
//     const io = ioConnect.of('/notifications');

//     utils.notificationSocket = io;

//     io.on('connection', function (socket) {
//         // Connect
//         if (socket.handshake.query.type === 'SERVER')
//             utils.socketConsole(
//                 socket,
//                 ++adminConnections + ' SERVER CONNECTED '
//             );
//         else
//             utils.socketConsole(
//                 socket,
//                 ++notificationConnections + ' NOTIFICATION CONNECTED '
//             );
//         socket.onAny((event, ...args) => {
//             utils.socketConsole(socket, `Client Emitted : ${event} `);
//         });

//         // Sockets
//         notificationSocket(socket);

//         // Disconnect
//         socket.on('disconnect', function () {
//             if (socket.handshake.query.type === 'SERVER')
//                 utils.socketConsole(
//                     socket,
//                     --adminConnections + ' SERVER DISCONNECTED '
//                 );
//             else
//                 utils.socketConsole(
//                     socket,
//                     --notificationConnections + ' NOTIFICATION DISCONNECTED '
//                 );
//         });
//     });
// };

const adminSocketConnect = (ioConnect) => {
  const io = ioConnect.of(constantUtils.NS.ADMINS)
  utils.adminSocket = io

  io.on('connection', async function (socket) {
    const ifAdmin = await auth.adminSocket(socket?.id, socket?.handshake?.query?.accessToken)
    if (ifAdmin) {
      io.to(socket?.id).emit('connection', true)
      ioConnect.of(constantUtils.NS.ADMINS).emit('CONNECTION_CHANGE', true)
      utils.socketConnection(socket, 'ADMIN', 'CONNECT')
      socket.onAny((event, ...args) => {
        utils.socketConsole(socket, `Client Emitted : ${event} `)
      })
      // Sockets
      adminSocket(socket)
      // Disconnect
      socket.on('disconnect', function () {
        ioConnect.of(constantUtils.NS.ADMINS).emit('CONNECTION_CHANGE', true)
        auth.adminSocketDisconnect(socket?.id)
        utils.socketConnection(socket, 'ADMIN', 'DISCONNECTED')
      })
    } else {
      socket.disconnect()
      io.emit('DISCONNECT', true)
    }
  })
}

const userSocketConnect = (ioConnect) => {
  const io = ioConnect.of(constantUtils.NS.USERS)
  utils.userSocket = io

  io.on('connection', async function (socket) {
    const ifUser = await auth.userSocket(
      socket?.id,
      socket?.handshake?.query?.accessToken,
      socket?.handshake?.query?.deviceId
    )
    if (ifUser) {
      io.to(socket?.id).emit('connection', true)
      ioConnect.of(constantUtils.NS.ADMINS).emit('CONNECTION_CHANGE', true)
      utils.socketConnection(socket, 'USER', 'CONNECT')
      socket.onAny((event, ...args) => {
        utils.socketConsole(socket, `Client Emitted : ${event} `)
      })
      // Sockets
      adminSocket(socket)
      // Disconnect
      socket.on('disconnect', function () {
        ioConnect.of(constantUtils.NS.ADMINS).emit('CONNECTION_CHANGE', true)
        utils.socketConnection(socket, 'USER', 'DISCONNECTED')
      })
    } else {
      socket.disconnect()
      io.emit('DISCONNECT', true)
    }
  })
}

utils.connectSocket = async (app, port) => {
  try {
    const io = require('socket.io')(port, {
      transports: ['websocket'],
    })
    logger.info('Socket running in ' + port)
    const redisAdapter = require('socket.io-redis')

    utils.defaultSocket = io
    app.io = io

    // Socket with Redis
    io.adapter(redisAdapter(config.REDIS))
    await redis.set(constantUtils.ADMIN_CONNECTIONS, [])
    await redis.set(constantUtils.USER_CONNECTIONS, [])

    // IO Connection
    adminSocketConnect(io)
    userSocketConnect(io)

    utils.connectivityCheck()
  } catch (err) {
    logger.info(err)
  }
}

utils.connectivityCheck = () => {
  const io = require('socket.io-client')

  // const adminSocket = io(`ws://localhost:${config.SOCKET_PORT}/admins`, {
  //     transports: ['websocket'],
  //     query: {
  //         accessToken: '',
  //         deviceId: '',
  //     },
  // });
}

module.exports = utils
