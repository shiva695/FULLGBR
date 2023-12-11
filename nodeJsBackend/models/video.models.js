// Dependencies Import
const mongoose = require('mongoose')

//Utils Import
const constantUtils = require('../utils/constant.utils')

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    category: {
      type: String,
      enum: [
        constantUtils.ANNOUNCEMENTS,
        constantUtils.INTERVIEWS,
        constantUtils.TRAININGVIDEOS,
        constantUtils.FEATURES,
      ],
      trim: true,
    },
    url: { type: String },
    status: {
      type: String,
      trim: true,
      enum: [constantUtils.ENABLE, constantUtils.DISABLE, constantUtils.ARCHIEVE],
      default: constantUtils.ENABLE,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Video = mongoose.model('video', videoSchema)

module.exports = Video
