// Dependencies Import
const mongoose = require('mongoose')

//Utils Import
const constantUtils = require('../utils/constant.utils')

const rolesSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    status: {
      type: String,
      trim: true,
      enum: [constantUtils.ENABLE, constantUtils.DISABLE, constantUtils.ARCHIEVE],
      default: constantUtils.ENABLE,
    },
    privileges: {
      type: Array,
      required: true,
    },
    isSelectedAll: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Roles = mongoose.model('roles', rolesSchema)

module.exports = Roles
