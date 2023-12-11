// Dependencies Import
const nodemailer = require('nodemailer')

// Utils Import
const redis = require('./redis.utils')
const constant = require('./constant.utils')

const utils = {}

utils.sendMail = async (data) => {
  const settingsObject = await redis.read(constant.GENERALSETTING)
  const smtp = settingsObject?.data?.smtp
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.isSecure, // true for 465, false for other ports 587
    auth: {
      user: smtp.user, // support@gamersback.com generated ethereal user
      pass: smtp.password, // 'ZvSRQJTMcqga', // generated ethereal password
    },
    tls: {
      rejectUnauthorized: smtp.isRejectUnauthorized,
    },
  })

  await transporter.sendMail({
    from: smtp.user, // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.html, // html body
  })
}

module.exports = utils
