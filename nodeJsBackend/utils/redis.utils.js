// Dependencies Import
const Redis = require('ioredis')

// File Import
const config = require('../config')

const utils = {}

const redis = new Redis(config.REDIS)

utils.read = async (key) => {
  const data = await redis.get(key)
  return data ? JSON.parse(data) : null
}

utils.write = async (key, value) => {
  await redis.set(key, JSON.stringify(value))
}

module.exports = utils
