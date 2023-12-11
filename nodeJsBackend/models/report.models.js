// Dependencies Import
const mongoose = require('mongoose')

//Utils Import
const constantUtils = require('../utils/constant.utils.js')

const reportSchema = new mongoose.Schema(
  {
    user: {
      user: { type: mongoose.ObjectId, ref: 'users' },
      userName: { type: String, trim: true },
      profilePic: { type: String, trim: true },
      avatar: { type: String, trim: true },
      email: { type: String, trim: true },
      phone: {
        code: { type: String, optional: true, trim: true },
        number: { type: String, trim: true },
      },
    },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: [constantUtils.NEW, constantUtils.PROGRESS, constantUtils.RESOLVED],
      default: constantUtils.NEW,
      trim: true,
    },
    type: {
      type: String,
      enum: [constantUtils.MINOR, constantUtils.MAJOR, constantUtils.CRITICAL],
      default: constantUtils.MINOR,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Report = mongoose.model('report', reportSchema)

module.exports = Report
