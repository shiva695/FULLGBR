const mongoose = require('mongoose')

const helperSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Helper = mongoose.model('helper', helperSchema)

module.exports = Helper
