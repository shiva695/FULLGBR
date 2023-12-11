// Dependencies Import
const joi = require('joi')

// Utils Import
const constantUtils = require('../utils/constant.utils')
const validationConstantUtils = require('../utils/validationConstant.utils')

const validation = {}

// Routes Validations

// common
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
validation.getList = joi.object().keys({
  skip: joi.number(),
  limit: joi.number(),
})

// login
validation.login = joi.object().keys({
  email: validationConstantUtils.emailValidation,
  password: validationConstantUtils.passwordRegexValidation,
})

// change password
validation.changePassword = joi.object().keys({
  email: validationConstantUtils.emailValidation,
  password: validationConstantUtils.passwordRegexValidation,
  confirmPassword: validationConstantUtils.passwordRegexValidation,
})

// forgot password
validation.forgotPassword = joi.object().keys({
  email: validationConstantUtils.emailValidation,
})

// update Profile
validation.updateProfile = joi.object().keys({
  firstName: validationConstantUtils.nameValidation,
  lastName: validationConstantUtils.nameValidation,
  email: validationConstantUtils.emailValidation,
  gender: validationConstantUtils.genderValidation,
  avatar: validationConstantUtils.urlValidation,
  phoneCode: validationConstantUtils.phoneCodeValidation,
  phoneNumber: validationConstantUtils.phoneNumberValidation,
  status: validationConstantUtils.statusValidation,
})

//update Password
validation.changeProfilePassword = joi.object().keys({
  password: validationConstantUtils.passwordRegexValidation,
  confirmPassword: validationConstantUtils.passwordRegexValidation,
})

// edit settings
validation.editGeneralSettings = joi.object().keys({
  _id: validationConstantUtils.idValidation,
  data: joi.object().keys({
    siteTitle: validationConstantUtils.titleValidation,
    siteUrl: validationConstantUtils.titleValidation,
    siteAddress: validationConstantUtils.descriptionValidation,
    siteEmail: validationConstantUtils.emailValidation,
    siteCareerEmail: validationConstantUtils.emailValidation,
    siteStatus: joi.string().valid(constantUtils.DEVELOPMENT, constantUtils.PRODUCTION),
    lat: validationConstantUtils.titleValidation,
    lng: validationConstantUtils.titleValidation,
    phoneCode: validationConstantUtils.phoneCodeValidation,
    phoneNumber: validationConstantUtils.phoneNumberValidation,
    lightLogo: validationConstantUtils.titleValidation,
    darkLogo: validationConstantUtils.titleValidation,
    favicon: validationConstantUtils.titleValidation,
    mobileLogo: validationConstantUtils.titleValidation,
    emergencyNumber: validationConstantUtils.titleValidation,
    tableLimitSize: joi.array().items(validationConstantUtils.tableLimitValidation),
    maxUserLoginCount: validationConstantUtils.pageValidation,
    userMinAge: validationConstantUtils.pageValidation,
    joiningTokenBonus: validationConstantUtils.pageValidation,
    referrelTokenBonus: validationConstantUtils.pageValidation,
    dailyTokenBonus: validationConstantUtils.pageValidation,
    returnClaimTokenBonus: validationConstantUtils.pageValidation,
    dayToClaim: validationConstantUtils.pageValidation,
    cronTimeZone: validationConstantUtils.titleValidation,
    redirectUrls: joi.object().keys({
      userPlayStore: validationConstantUtils.titleValidation,
      userAppStore: validationConstantUtils.titleValidation,
      userWebStore: validationConstantUtils.titleValidation,
      userAppleId: validationConstantUtils.titleValidation,
      faqUrl: validationConstantUtils.titleValidation,
      termsAndConditionUrl: validationConstantUtils.titleValidation,
      privacyUrl: validationConstantUtils.titleValidation,
      aboutUrl: validationConstantUtils.titleValidation,
    }),
    socailUrls: joi.object().keys({
      googleUrl: validationConstantUtils.titleValidation,
      instagramUrl: validationConstantUtils.titleValidation,
      discordUrl: validationConstantUtils.titleValidation,
      youtubeUrl: validationConstantUtils.titleValidation,
      linkedinUrl: validationConstantUtils.titleValidation,
      twitterUrl: validationConstantUtils.titleValidation,
    }),
    spaces: joi.object().keys({
      spacesKey: validationConstantUtils.titleValidation,
      spacesSecret: validationConstantUtils.titleValidation,
      spacesEndpoint: validationConstantUtils.titleValidation,
      spacesBucketName: validationConstantUtils.titleValidation,
      spacesBaseUrl: validationConstantUtils.titleValidation,
      spacesObjectName: validationConstantUtils.titleValidation,
    }),
    appVersion: joi.object().keys({
      androidVersion: validationConstantUtils.titleValidation,
      iosVersion: validationConstantUtils.titleValidation,
      iosStatus: validationConstantUtils.titleValidation,
      androidStatus: validationConstantUtils.titleValidation,
    }),
    fcm: joi.object().keys({
      androidUser: validationConstantUtils.descriptionValidation,
      iosUser: validationConstantUtils.descriptionValidation,
      desktopUser: validationConstantUtils.descriptionValidation,
    }),
    google: joi.object().keys({
      appId: validationConstantUtils.titleValidation,
      appSecret: validationConstantUtils.titleValidation,
    }),
    facebook: joi.object().keys({
      appId: validationConstantUtils.titleValidation,
    }),
    sms: joi.object().keys({
      SSID: validationConstantUtils.titleValidation,
      authToken: validationConstantUtils.titleValidation,
    }),
    smtp: joi.object().keys({
      user: validationConstantUtils.titleValidation,
      password: validationConstantUtils.titleValidation,
      host: validationConstantUtils.titleValidation,
      port: validationConstantUtils.titleValidation,
      isSecure: validationConstantUtils.booleanValidation,
      isRejectUnauthorized: validationConstantUtils.booleanValidation,
    }),
  }),
})

// Admins Management
validation.getAdminsList = joi.object().keys({
  skip: joi.number(),
  limit: joi.number(),
  search: joi.string().allow(null, ''),
  rolesTypefilter: joi.string().allow(null, ''),
})

validation.addAdmin = joi.object().keys({
  _id: validationConstantUtils.stringAllowNullValidation,
  firstName: validationConstantUtils.nameValidation,
  lastName: validationConstantUtils.nameValidation,
  email: validationConstantUtils.emailValidation,
  userType: validationConstantUtils.stringValidation,
  gender: validationConstantUtils.genderValidation,
  avatar: validationConstantUtils.stringAllowNullValidation,
  privileges: joi.array().items().required(),
  phoneCode: validationConstantUtils.phoneCodeValidation,
  phoneNumber: validationConstantUtils.phoneNumberValidation,
  password: joi.alternatives().try(joi.string().allow(null, ''), joi.string().required().max(25).min(8).trim()),
  status: validationConstantUtils.statusValidation,
})

// Roles Management
validation.getRolesList = joi.object().keys({
  skip: joi.number(),
  limit: joi.number(),
  search: joi.string().allow(null, ''),
})

validation.addAndEditRoles = joi.object().keys({
  _id: validationConstantUtils.stringAllowNullValidation,
  role: validationConstantUtils.nameValidation,
  isSelectedAll: validationConstantUtils.booleanValidation,
  privileges: joi.array().items().required(),
  status: validationConstantUtils.statusValidation,
})

// Users Management
validation.getUsersList = joi.object().keys({
  skip: joi.number(),
  limit: joi.number(),
  search: joi.string().allow(null, ''),
  profileTypefilter: joi.string().allow(null, ''),
})

validation.addAndEditUsers = joi.object().keys({
  _id: validationConstantUtils.stringAllowNullValidation,
  userName: validationConstantUtils.nameValidation,
  firstName: validationConstantUtils.nameValidation,
  lastName: validationConstantUtils.nameValidation,
  profilePic: validationConstantUtils.stringValidation,
  email: validationConstantUtils.emailValidation,
  gender: validationConstantUtils.genderValidation,
  dob: validationConstantUtils.stringValidation,
  password: validationConstantUtils.passwordRegexValidation.allow(null, ''),
  phoneCode: validationConstantUtils.phoneCodeValidation,
  phoneNumber: validationConstantUtils.phoneNumberValidation,
  status: validationConstantUtils.statusValidation,
})

// Report Management
validation.getReportList = joi.object().keys({
  skip: joi.number(),
  limit: joi.number(),
  search: joi.string().allow(null, ''),
  filter: joi.string().allow(null, ''),
})

validation.statusReportChange = joi.object().keys({
  id: joi.array(),
  status: validationConstantUtils.reportStatusValidation,
})

// Template Management
validation.getTemplatesList = joi.object().keys({
  skip: joi.number(),
  limit: joi.number(),
  search: joi.string().allow(null, ''),
  filter: joi.string().allow(null, ''),
})

validation.addAndEditTemplate = joi.object().keys({
  _id: validationConstantUtils.stringAllowNullValidation,
  name: validationConstantUtils.nameValidation,
  title: validationConstantUtils.titleValidation,
  userType: joi.string().valid(constantUtils.USERS).required().allow(null, ''),
  notificationType: joi
    .string()
    .valid(constantUtils.SMS, constantUtils.EMAIL, constantUtils.PUSH, constantUtils.ALL)
    .required(),
  image: validationConstantUtils.stringAllowNullValidation,
  comments: validationConstantUtils.stringValidation,
  status: validationConstantUtils.statusValidation,
})

// Notifications
validation.sendNotifictaion = joi.object().keys({
  title: validationConstantUtils.titleValidation,
  description: validationConstantUtils.descriptionValidation,
  image: validationConstantUtils.urlValidation.allow(null, ''),
  users: joi.array(),
})

validation.getNotificationList = joi.object().keys({
  skip: joi.number(),
  limit: joi.number(),
})

// Gamepedia
validation.getGamepediaList = joi.object().keys({
  skip: joi.number(),
  limit: joi.number(),
  search: joi.string().allow(null, ''),
})

module.exports = validation
