// Dependencies Import
const { format, createLogger, transports } = require('winston')
require('winston-daily-rotate-file')

// Files Import
const config = require('../config')
const constantUtils = require('./constant.utils')

const CATEGORY = config.LOGTYPE === constantUtils.FILE ? 'winston custom format' : 'Log Rotation'

const fileRotateTransport = new transports.DailyRotateFile({
  filename: 'logs/rotate-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
})

const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.colorize(),
    format.label({
      label: `Label🏷️`,
    }),
    format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    format.printf((info) => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: 'logs/example.log',
    }),
    new transports.File({
      level: 'error',
      filename: 'logs/error.log',
    }),
    new transports.Console(),
    fileRotateTransport,
  ],
})

module.exports = logger
