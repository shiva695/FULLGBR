// Dependencies Import
const mongoose = require('mongoose')

//Utils Import
const constantUtils = require('../utils/constant.utils')

const adminSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      trim: true,
      optional: true,
    },
    lastName: {
      type: String,
      trim: true,
      optional: true,
    },
    gender: {
      type: String,
      enum: [constantUtils.MALE, constantUtils.FEMALE, constantUtils.OTHERS],
      trim: true,
      optional: true,
    },
    phone: {
      code: {
        type: String,
        optional: true,
        trim: true,
      },
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
    status: {
      type: String,
      optional: true,
      trim: true,
      enum: [constantUtils.ENABLE, constantUtils.DISABLE, constantUtils.ARCHIEVE],
      default: constantUtils.ENABLE,
    },
    avatar: { type: String, optional: true },
    accessToken: {
      type: String,
      optional: true,
    },
    languageCode: {
      type: String,
      optional: true,
      default: 'en',
    },
    password: {
      type: String,
      optional: true,
    },
    code: {
      type: String,
      optional: true,
    },
    codeUpdateTime: {
      type: Date,
      optional: true,
      default: new Date(),
    },
    lastEditedTime: {
      type: Date,
      optional: true,
      default: new Date(),
    },
    lastLogin: {
      type: Date,
      optional: true,
      default: new Date(),
    },
    loginCount: {
      type: Number,
      optional: true,
      default: 0,
    },
    email: {
      type: String,
      unique: true,
      optional: true,
      trim: true,
      index: {
        unique: true,
        partialFilterExpression: {
          email: { $type: 'string' },
        },
      },
    },
    forgotPasswordOtp: { type: String, optional: true },
    privileges: {
      type: Array,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Admin = mongoose.model('admins', adminSchema)

module.exports = Admin
