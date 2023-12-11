// Dependencies Import
const mongoose = require('mongoose')
const CryptoJS = require('crypto-js')

//File import
const config = require('../config')

const utils = {}

// Normalize a port into a number, string, or false.
utils.normalizePort = (data) => {
  const port = parseInt(data, 10)
  if (isNaN(port)) {
    // named pipe
    return data
  }
  if (port >= 0) {
    // port number
    return port
  }
  return false
}

// change normal stringId into MongoId
utils.getMongoIds = async (data) => {
  return data.map((e) => new mongoose.Types.ObjectId(e))
}

// To generate Random string
utils.randomString = async (data) => {
  let mask = ''
  if (data.type.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz'
  if (data.type.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (data.type.indexOf('#') > -1) mask += '0123456789'
  let result = ''
  for (let i = data.length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)]
  return result
}

// create logfile name in dataformat
utils.getFileDateGenerator = async (data) => {
  const pad = (num) => (num > 9 ? '' : '0') + num
  const time = new Date()
  const month = time.getFullYear() + '' + pad(time.getMonth() + 1)
  const day = pad(time.getDate())
  const year = pad(time.getFullYear())

  return `${year}${month}${day}${data}-file.log`
}

// Get hostIp based on network
utils.getHostIp = (data) => {
  let ip = config.HOSTNAME
  const arr = data['Wi-Fi']
  arr.map((e) => {
    if (e.family === 'IPv4') ip = e.address
  })
  return ip
}

// Encrypting the response data
utils.dataEncryption = (data) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), config.SECRECTENCRYPECODE).toString()
  return ciphertext
}

// Encrypting the response data
utils.getRandomDate = () => {
  const maxDate = Date.now()
  const timestamp = Math.floor(Math.random() * maxDate)
  return new Date(timestamp)
}

// Add Device Info
utils.checkDeviceInfo = (req, token, deviceInfos) => {
  let infoType = false
  if (deviceInfos.length > 0) {
    deviceInfos.map((e) => {
      if (e.deviceId === req.header.deviceId) {
        infoType = true
        e = {
          accessToken: token,
          userAgent: req.headers['user-agent'],
          deviceId: req.headers.deviceid,
          ip: req.headers.ip,
          deviceType: req.headers.devicetype,
          platform: req.headers.platform,
        }
        return e
      } else {
        return e
      }
    })
  }
  if (!infoType) {
    deviceInfos.push({
      accessToken: token,
      userAgent: req.headers['user-agent'],
      deviceId: req.headers.deviceid,
      ip: req.headers.ip,
      deviceType: req.headers.devicetype,
      platform: req.headers.platform,
    })
  }
  return deviceInfos
}

module.exports = utils
