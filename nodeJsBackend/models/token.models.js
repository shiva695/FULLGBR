// Dependencies Import
const mongoose = require('mongoose')

//Utils Import
const constantUtils = require('../utils/constant.utils.js')

const tokenSchema = new mongoose.Schema(
  {
    fromUser: {
      userName: { type: String, trim: true, required: true },
      userId: { type: String, trim: true },
    },
    toUser: {
      userName: { type: String, trim: true, required: true },
      userId: { type: String, trim: true },
    },
    amount: {
      type: Number,
      required: true,
    },
    transType: {
      type: String,
      enum: [constantUtils.CREDIT, constantUtils.DEBIT],
      trim: true,
    },
    actionType: {
      type: String,
      enum: [
        constantUtils.JOININGBONUS,
        constantUtils.TRANSFER,
        constantUtils.CLAIM,
        constantUtils.FROMOTHERMEDIUM,
        constantUtils.LINKSOCIAL,
        constantUtils.REFERRELBONUS,
      ],
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Token = mongoose.model('token', tokenSchema)

module.exports = Token
