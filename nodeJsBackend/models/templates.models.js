// Dependencies Import
const mongoose = require('mongoose')

//Utils Import
const constantUtils = require('../utils/constant.utils.js')

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, unique: true },
    title: { type: String, trim: true },
    userType: { type: String, enum: [constantUtils.USERS, ''], trim: true },
    templateFor: { type: String, enum: [constantUtils.NOTIFICATION, constantUtils.EMAIL], trim: true },
    notificationType: {
      type: String,
      enum: [constantUtils.SMS, constantUtils.EMAIL, constantUtils.PUSH, constantUtils.ALL],
      trim: true,
    },
    image: { type: String },
    comments: { type: String },
    status: { type: String, enum: [constantUtils.ENABLE, constantUtils.DISABLE, constantUtils.ARCHIEVE], trim: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Templates = mongoose.model('template', templateSchema)

module.exports = Templates
