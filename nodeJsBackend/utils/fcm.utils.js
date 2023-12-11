// Dependencies Import
const FCM = require('fcm-node')

//Utils Import
const logger = require('./logger.utils')

const fcmKey =
  'AAAAUfGhzgo:APA91bEVe0bit1-vpmcx73QgjuxfhvlqYyzpZxCxsrxMqtZPBVBIFgSWgtGcTYNTFo3EGI5bqk3_KPSIyif1sC7At4smFHvD7hmj0amec5mEajihSFTAipaqq5_CWL3UX1FNzZo5y8Uj'

const sendNotification = async (dataSet) => {
  const fcm = new FCM(process.env.FIREBASE_SERVER_KEY || fcmKey)
  const message = {
    //this may consty according to the message type (single recipient, multicast, topic, et cetera)
    to: dataSet.token,
    collapseKey: 'gb',
    priority: 'high',
    contentAvailable: true,
    delayWhileIdle: true,
    timeToLive: 4 * 24 * 60, //4 days => Max 4 weeks can be set
    notification: {
      title: dataSet.title,
      body: dataSet.body,
    },
    data: {
      title: dataSet.title,
      body: dataSet.body,
    }, //you can send only notification or only data(or include both)
  }
  fcm.send(message, function (err, response) {
    if (err) {
      logger.error('Something has gone wrong!', err)
    } else {
      logger.info('Successfully sent with response: ', response)
    }
  })
}

module.exports = { sendNotification }
