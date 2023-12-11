const utils = {}

//Utils import
const smtpUtil = require('./smtp.utils')
const logger = require('./logger.utils')

utils.send = ({ to = '', body = '' }) => {
  new Promise((resolve, reject) => {
    const SSID = 'AC296120ddcebbcf95d0321fe9d4a7395f'
    const authToken = '1422c6f962b5f5542a59b80dace09065'
    const client = require('twilio')(SSID, authToken)

    client.messages
      .create({ body, from: '+12183775925', to })
      .then((data) => {
        logger.info(data)
        resolve(true)
      })
      .catch((err) => {
        logger.error(err)
        reject(true)
        smtpUtil.sendMail('tamilselvan@gamersback.com', 'Twilio Eror', JSON.stringify(err.message))
      })
  })
}

utils.sendSmsApi = () => {
  new Promise((resolve, reject) => {
    const Sendchamp = require('sendchamp-sdk')

    const sendchamp = new Sendchamp({
      mode: 'live', // this is set to live by default
      publicKey: 'sendchamp_live_$2a$10$VCdIhOD/zh/Xy1.PbxDmIOaN1rL5aMiRfi1rCTMU10bBqt6AuF9G2',
    })

    // Initialize a service
    const sms = sendchamp.SMS

    // Use the service
    const options = {
      to: ['919894742814'],
      message: 'Hello from postman',
      sender_name: 'sendchamp',
      // optional option to set route
      route: 'dnd', // can be set to non_dnd, dnd or international, default it non_dnd
    }

    sms
      .send(options)
      .then((response) => {
        logger.info(response)
        resolve(true)
      })
      .catch((error) => {
        logger.error(error)
        reject(error)
        smtpUtil.sendMail('tamilselvan@gamersback.com', 'Twilio Eror', JSON.stringify(error))
      })
  })
}

module.exports = utils
