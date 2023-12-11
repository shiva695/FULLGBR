// Dependencies Import
const mongoose = require('mongoose')

// File Import
const config = require('../config')

//Utils Import
const logger = require('./logger.utils')

const utils = {}

// Database Connection
utils.connectDB = async () => {
  try {
    await mongoose.connect(`${config.MONGO}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    logger.info(`Database connection succeeded`)
  } catch (err) {
    logger.error(err)
  }
}

module.exports = utils
