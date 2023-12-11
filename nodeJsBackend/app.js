const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors') // for cross-orgin
const { networkInterfaces } = require('os')
require('dotenv').config({ path: path.join(__dirname, '.env') })
global._ = require('lodash')

// Files Import
const config = require('./config')

// Utils Import.
const logger = require('./utils/logger.utils')
const indexUtils = require('./utils/index.utils')
const helperUtil = require('./utils/helper.utils')
const dbUtils = require('./utils/db.utils')
const constant = require('./utils/constant.utils')

const debug = require('debug')('gb-nodejs-backend:server')

//Create HTTP server.
const app = express()
const http = require('http')
const server = http.createServer(app)

// Get port from environment and store in Express.
const port = helperUtil.normalizePort(config.PORT)
let hostname = ''
async function getIp() {
  hostname =
    process.env.SERVER_STATUS === constant.PRODUCTION ? 'localhost' : await helperUtil.getHostIp(networkInterfaces())
}
getIp()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors('*'))
app.use(bodyParser.json({ limit: '150mb' }))
app.use(
  bodyParser.urlencoded({
    limit: '150mb',
    extended: true,
    parameterLimit: 50000,
  })
)

require('./routes/index.routes')(app) // routes
require('./utils/cron.utils')() // cron

// catch 404 and forward to error handler
app.use(async (req, res, next) => {
  logger.error(createError(404))
  next(createError(404))
})

// error handler
app.use(async (err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = process.env.SERVER_STATUS === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// Event listener for HTTP server "error" event.

const onError = async (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}

async function initiatingDb() {
  await dbUtils.connectDB()
  await indexUtils.loadRedisData()
  app.set('port', port)
  // Listen on provided port, on all network interfaces.
  server.listen(port, hostname, () => {
    logger.info(`Server is running on ${hostname}:${port}`)
  })
  server.on('error', onError)
  server.on('listening', onListening)
}

initiatingDb()
