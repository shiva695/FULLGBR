// Dependencies Import
const mongoose = require('mongoose')

//Utils Import
const constantUtils = require('../utils/constant.utils.js')

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    notificationDate: { type: Date, default: new Date() },
    notificationType: {
      type: String,
      enum: [constantUtils.SMS, constantUtils.EMAIL, constantUtils.PUSH, constantUtils.ALL],
      trim: true,
    },
    image: { type: String },
    users: { type: Array },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const notification = mongoose.model('notification', notificationSchema)

module.exports = notification
