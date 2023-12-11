// Dependencies Import
const joi = require('joi')
const joiOid = require('joi-oid')
const PasswordComplexity = require('joi-password-complexity')

//Utils Import
const constantUtils = require('./constant.utils')

const validation = {}

validation.stringAllowNullValidation = joi.string().allow(null, '')
validation.stringValidation = joi.string().required()
validation.booleanValidation = joi.boolean().required()
validation.phoneCodeValidation = joi.string().required().max(5).min(2)
validation.idValidation = joiOid.objectId()
validation.otpValidation = joi.string().min(1).required()
validation.phoneNumberValidation = joi
  .number()
  .required()
  .min(999)
  .max(99999999999999)
  .custom((value) => value.toString())
validation.emailValidation = joi.string().email().required()
validation.passwordValidation = joi.string().required().max(25).min(8)
validation.genderValidation = joi
  .string()
  .valid(constantUtils.MALE, constantUtils.FEMALE, constantUtils.OTHERS)
  .required()
validation.nameValidation = joi.string().required().min(1).max(60).trim()
validation.titleValidation = joi.string().required().min(1).max(100).trim()
validation.descriptionValidation = joi.string().required().min(1).max(256).trim()
validation.pageValidation = joi.number().min(0).default(0)
validation.docsPerPage = joi.number().min(1).default(10)
validation.urlValidation = joi.string().min(1).uri()
validation.statusValidation = joi
  .string()
  .valid(constantUtils.ENABLE, constantUtils.DISABLE, constantUtils.ARCHIEVE)
  .default(constantUtils.ENABLE)
validation.socialPlatformValidation = joi
  .string()
  .valid(constantUtils.GOOGLE, constantUtils.FACEBOOK)
  .default(constantUtils.GOOGLE)
validation.statusFilterValidation = joi
  .string()
  .valid(constantUtils.ENABLE, constantUtils.DISABLE, constantUtils.ARCHIEVE)
validation.passwordRegexValidation = PasswordComplexity({
  min: 8,
  max: 25,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
})
validation.usernameValidation = joi
  .alternatives()
  .try(joi.string().email().required(), joi.string().required().min(1).max(60).trim())
validation.feedbackTypeValidation = joi
  .string()
  .valid(constantUtils.MAJOR, constantUtils.MINOR, constantUtils.CRITICAL)
  .required()
validation.reportTypeValidation = joi
  .string()
  .valid(constantUtils.MAJOR, constantUtils.MINOR, constantUtils.CRITICAL)
  .required()
validation.reportStatusValidation = joi
  .string()
  .valid(constantUtils.NEW, constantUtils.RESOLVED, constantUtils.PROGRESS)
validation.tableLimitValidation = joi.object().keys({
  num: joi.number().min(1).default(10),
  status: joi.boolean().default(false),
})

module.exports = validation
