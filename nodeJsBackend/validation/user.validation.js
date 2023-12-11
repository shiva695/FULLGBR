// Dependencies Import
const joi = require('joi')

//Utils Import
const validationConstantUtils = require('../utils/validationConstant.utils')
const constantUtils = require('../utils/constant.utils')

const validation = {}

validation.getSingleDetail = joi.object().keys({
  _id: validationConstantUtils.idValidation,
})

validation.statusChange = joi.object().keys({
  id: joi.array(),
  status: validationConstantUtils.statusValidation,
})

validation.delete = joi.object().keys({
  id: joi.array(),
})

validation.login = joi.object().keys({
  userName: validationConstantUtils.usernameValidation,
  password: validationConstantUtils.passwordValidation,
})

validation.confirmUser = joi.object().keys({
  platform: validationConstantUtils.socialPlatformValidation,
  id: validationConstantUtils.nameValidation,
})

validation.verifyUser = joi.object().keys({
  userName: validationConstantUtils.usernameValidation,
})

validation.sendOtp = joi.object().keys({
  email: validationConstantUtils.emailValidation,
  phoneCode: validationConstantUtils.phoneCodeValidation,
  phoneNumber: validationConstantUtils.phoneNumberValidation,
  otpPlatform: joi.string().valid(constantUtils.MAIL, constantUtils.SMS).required(),
})

validation.changePassword = joi.object().keys({
  email: validationConstantUtils.emailValidation,
  password: validationConstantUtils.passwordRegexValidation,
  confirmPassword: validationConstantUtils.passwordRegexValidation,
})

validation.signUp = joi.object().keys({
  userName: validationConstantUtils.nameValidation,
  firstName: validationConstantUtils.nameValidation,
  lastName: validationConstantUtils.nameValidation,
  email: validationConstantUtils.emailValidation,
  gender: validationConstantUtils.genderValidation,
  dob: validationConstantUtils.nameValidation,
  phoneCode: validationConstantUtils.phoneCodeValidation,
  phoneNumber: validationConstantUtils.phoneNumberValidation,
  googleId: validationConstantUtils.stringAllowNullValidation,
  facebookId: validationConstantUtils.stringAllowNullValidation,
  referredBy: validationConstantUtils.stringAllowNullValidation,
  profilePic: validationConstantUtils.stringAllowNullValidation,
  avatar: validationConstantUtils.stringAllowNullValidation,
  linkedGames: joi
    .array()
    .items(
      joi.object({
        gameId: validationConstantUtils.idValidation,
        gameImage: validationConstantUtils.titleValidation,
        title: validationConstantUtils.titleValidation,
        developer: validationConstantUtils.titleValidation,
        year: validationConstantUtils.titleValidation,
        genre: validationConstantUtils.titleValidation,
      })
    )
    .allow(null, '')
    .optional(),
})

validation.editGeneralInfo = joi.object().keys({
  userName: validationConstantUtils.nameValidation,
  firstName: validationConstantUtils.nameValidation,
  lastName: validationConstantUtils.nameValidation,
  gender: validationConstantUtils.genderValidation,
  dob: validationConstantUtils.nameValidation,
})

validation.editUserPassword = joi.object().keys({
  password: validationConstantUtils.passwordRegexValidation,
  confirmPassword: validationConstantUtils.passwordRegexValidation,
})

validation.editProfileAndAvatar = joi.object().keys({
  profilePic: validationConstantUtils.stringAllowNullValidation,
  avatar: validationConstantUtils.stringAllowNullValidation,
})

validation.getGamesList = joi.object().keys({
  skip: joi.number(),
  limit: joi.number(),
  search: validationConstantUtils.stringAllowNullValidation,
})

validation.sendFeedback = joi.object().keys({
  description: validationConstantUtils.descriptionValidation,
  type: validationConstantUtils.feedbackTypeValidation,
})

validation.getTokenTansactionList = joi.object().keys({
  skip: joi.number(),
  limit: joi.number(),
  filter: joi.string().valid(constantUtils.CREDIT, constantUtils.DEBIT).required(),
})

validation.claimDailyData = joi.object().keys({
  currentDay: joi.number(),
  isReturn: joi.boolean(),
})

validation.getNotifications = joi.object().keys({
  skip: joi.number(),
  limit: joi.number(),
})

module.exports = validation
