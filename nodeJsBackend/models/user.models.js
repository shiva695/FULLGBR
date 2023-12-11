// Dependencies Import
const mongoose = require('mongoose')

// Utils Import
const constantUtils = require('../utils/constant.utils')

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, trim: true, unique: true },
    email: { type: String, trim: true, unique: true },
    uniqueCode: { type: String, trim: true, unique: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    dob: { type: Date, optional: true, default: new Date() },
    profilePic: { type: String, trim: true },
    avatar: { type: String, trim: true },
    password: { type: String, trim: true },
    linkedGames: { type: Array, default: [] },
    googleId: { type: String, trim: true },
    facebookId: { type: String, trim: true },
    deviceInfo: [
      {
        accessToken: { type: String, trim: true },
        userAgent: { type: String, trim: true },
        deviceId: { type: String, trim: true },
        ip: { type: String, trim: true },
        deviceType: { type: String, trim: true },
        platform: { type: String, trim: true },
      },
    ],
    referredCount: { type: Number, default: 0 },
    tokenDetails: {
      totalEarnCount: { type: Number, default: 0 },
      availableTokenCount: { type: Number, default: 0 },
      joiningBonusTokenCount: { type: Number, default: 0 },
      spentTokenCount: { type: Number, default: 0 },
      referelTokenCount: { type: Number, default: 0 },
      otherMediumToken: { type: Number, default: 0 },
    },
    dailyRewards: [
      {
        currentDay: { type: Number, default: 1 },
        isClaimed: { type: Boolean, default: false },
      },
    ],
    lastTokenUpdateTime: { type: Date, optional: true, default: new Date() },
    code: { type: String, optional: true },
    codeUpdateTime: { type: Date, optional: true, default: new Date() },
    lastEditedTime: { type: Date, optional: true, default: new Date() },
    lastLogoutTime: { type: Date, optional: true, default: new Date() },
    phone: {
      code: { type: String, optional: true, trim: true },
      number: {
        unique: true,
        type: String,
        trim: true,
        optional: true,
        index: {
          unique: true,
          partialFilterExpression: {
            number: { $type: 'string' },
          },
        },
      },
    },
    gender: {
      type: String,
      trim: true,
      enum: [constantUtils.MALE, constantUtils.FEMALE, constantUtils.OTHERS],
      default: constantUtils.MALE,
    },
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

const user = mongoose.model('user', userSchema)

module.exports = user
