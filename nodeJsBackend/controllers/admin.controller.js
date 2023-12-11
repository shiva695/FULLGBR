// Modules import
const handler = require('express-async-handler')
const mongoose = require('mongoose')

// Models import
const Admin = require('../models/admin.models')
const User = require('../models/user.models')
const Helper = require('../models/helper.models')
const Roles = require('../models/roles.models')
const Notification = require('../models/notification.models')
const Templates = require('../models/templates.models')
const Report = require('../models/report.models')
const Games = require('../models/gamepedia.models')

// Json import
const langJson = require(`../json/en.json`)
const gameJson = require(`../json/games.json`)

// Files import
const logger = require('../utils/logger.utils')
const authUtil = require('../utils/auth.utils')
const sendResponse = require('../utils/response.utils')
const constantUtils = require('../utils/constant.utils')
const responseJson = require('../utils/responseJson.utils')
const smtpUtil = require('../utils/smtp.utils')
const helperUtil = require('../utils/helper.utils')
const sendFcm = require('../utils/fcm.utils')
const redis = require('../utils/redis.utils')

const controller = {}

controller.addGameData = handler(async function (req, res) {
  for (let index = 0; index < gameJson.length; index++) {
    const currentGame = gameJson[index]

    const finalData = {
      'gameName': currentGame.gameName,
      'gameDescription': currentGame.Summary !== '' ? currentGame.Summary : 'comming Soon',
      'gameLogo': 'https://cdn.worldvectorlogo.com/logos/playstation-1.svg',
      'overview': {
        'title': 'Overview',
        'description': 'An iconic, immersive, and action-packed gaming experience',
        'publishers': currentGame.publishers > 0 ? currentGame.publishers[0] : 'Comming Soon',
        'developers':
          currentGame.publishers > 0
            ? currentGame.publishers[1]
              ? currentGame.publishers[1]
              : currentGame.publishers[0]
            : 'Comming Soon',
        'releseDate': new Date(currentGame.releseDate),
        'genre': currentGame.genres,
        'totalDownloads': currentGame.Plays,
        'platform': [
          'https://cdn.worldvectorlogo.com/logos/playstation-1.svg',
          'https://static.vecteezy.com/system/resources/previews/018/930/236/original/xbox-logo-transparent-free-png.png',
        ],
        'rating': currentGame.Rating.toString(),
      },
      'summary': {
        'title': 'Summary',
        'description': 'Lorem ipsum dolor, sit amet consectetur adipisicing.',
        'detail': currentGame.Summary !== '' ? currentGame.Summary : 'comming Soon',
      },
      'plot': {
        'title': 'Plot',
        'description': 'Lorem ipsum dolor, sit amet consectetur adipisicing.',
        'detail': currentGame.Summary !== '' ? currentGame.Summary : 'comming Soon',
      },
      'awards': {
        'title': 'Award',
        'description': 'An iconic, immersive, and action-packed gaming experience',
        'awards': [
          {
            'name': 'data',
            'category': 'bgmi',
            'date': '2023-06-08T17:52:34.389+05:30',
            'status': 'WINNER',
          },
          {
            'name': 'data',
            'category': 'bgmi',
            'date': '2023-06-08T17:52:34.389+05:30',
            'status': 'WINNER',
          },
          {
            'name': 'data',
            'category': 'bgmi',
            'date': '2023-06-08T17:52:34.389+05:30',
            'status': 'WINNER',
          },
          {
            'name': 'data',
            'category': 'bgmi',
            'date': '2023-06-08T17:52:34.389+05:30',
            'status': 'WINNER',
          },
        ],
      },
      'rating': {
        'title': 'Rating & Reviews',
        'description': 'Lorem ipsum dolor, sit amet consectetur adipisicing.',
        'rating': currentGame.Rating,
        'ratingData': [
          {
            'title': 'Violence and scariness',
            'value': currentGame.Rating,
          },
          {
            'title': 'Violence and scariness',
            'value': currentGame.Rating,
          },
          {
            'title': 'Sex, Romance and Nudity',
            'value': currentGame.Rating,
          },
          {
            'title': 'Drinking, Drugs and smoking',
            'value': currentGame.Rating,
          },
        ],
        'comments': [],
      },
      'gallery': {
        'title': 'Gallery',
        'description': 'An iconic, immersive, and action-packed gaming experience',
        'images': [
          'https://cdn.worldvectorlogo.com/logos/playstation-1.svg',
          'https://static.vecteezy.com/system/resources/previews/018/930/236/original/xbox-logo-transparent-free-png.png',
        ],
      },
      'founders': {
        'title': 'Founders',
        'description': 'An iconic, immersive, and action-packed gaming experience',
        'data': [
          {
            'name': 'Tamil',
            'designation': 'CEO && Co-founder',
            'image':
              'https://media.licdn.com/dms/image/D5603AQFv0pC_tgvhaQ/profile-displayphoto-shrink_800_800/0/1671050525072?e=2147483647&v=beta&t=8GFN0PXoLyQTAucWQHQdtlmnmrJzZhltD2rB5xGglCU',
          },
          {
            'name': 'Carter',
            'designation': 'CEO && Co-founder',
            'image':
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS11GAILXKOtRYefzXxvZb47rG_4B28lNWNr7nPh2NNVtGTKTXMMTW-7i73jqJfLJq884s&usqp=CAU',
          },
        ],
      },
      'gameImage': 'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png',
      'status': 'ENABLE',
    }
    const reviewData = []
    if (currentGame.Reviews.length > 0) {
      for (let index = 0; index < currentGame.Reviews.length; index++) {
        const review = {
          'userName': await helperUtil.randomString({ length: 5, type: 'a' }),
          'comments': currentGame.Reviews[index],
          'createdAt': helperUtil.getRandomDate(),
        }
        reviewData.push(review)
      }
    }
    finalData.rating.comments = reviewData
    await Games.create(finalData)
  }
  return res.send()
})

controller.insertData = handler(async function (req, res) {
  const data = {
    'userType': 'ADMINS',
    'firstName': 'super',
    'lastName': 'admin',
    'email': 'superadmin@yopmail.com',
    'gender': 'MALE',
    'phone': {
      'code': '+91',
      'number': '9898989888',
    },
    'status': 'ENABLE',
    'avatar': '',
    'accessToken': '',
    'password': '$2a$08$47XYkmo1wlD0.BNEHlahbO0bs3funUuP/MK4SgzwtB0XAPDM8l8zm',
    'languageCode': 'en',
    'loginCount': 0,
    'lastLogin': new Date(),
    'lastEditedTime': new Date(),
    'createdAt': new Date(),
    'updatedAt': new Date(),
  }
  await Admin.create(data)
  return res.send()
})

// Admin Panel Login
controller.login = handler(async function (req, res) {
  let admin = await Admin.findOne(
    {
      email: req.body.email,
    },
    { password: 1 }
  )
  if (!admin) return sendResponse.requestError(res, 400, langJson.INVALIDEMAILANDPASSWORD)

  if (authUtil.comparePassword(req.body.password, admin.password)) {
    const token = authUtil.jwtSign({
      _id: admin._id,
      userType: constantUtils.ADMINS,
    })
    const updateData = await Admin.updateOne(
      { _id: admin._id },
      {
        $set: {
          accessToken: token,
          lastLogin: new Date(),
        },
        $inc: {
          loginCount: 1,
        },
      }
    )
    if (updateData && updateData.nModified !== 0) {
      admin = await Admin.findById(admin._id).lean()
      return sendResponse.successResponse(res, langJson.LOGINSUCCESSFULLY, await responseJson.adminProfileObject(admin))
    } else {
      return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
    }
  } else {
    return sendResponse.requestError(res, 400, langJson.INVALIDEMAILANDPASSWORD)
  }
})

// Admin Password Change Manual
controller.changePassword = handler(async function (req, res) {
  if (req.body.password !== req.body.confirmPassword)
    return sendResponse.requestError(res, 400, langJson.PASSWORDANDCONFIRMPASSWORD)

  const newPassword = authUtil.generatePassword(req.body.password)

  const updateData = await Admin.updateOne(
    { email: req.body.email },
    {
      $set: {
        password: newPassword,
        lastEditedTime: new Date(),
      },
    }
  )
  if (updateData && updateData.nModified !== 0) {
    return sendResponse.successResponse(res, langJson.PASSWORDUPDATESUCCESS, {})
  } else {
    return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
  }
})

// Forgot Password send to email
controller.forgotPassword = handler(async function (req, res) {
  const admin = await Admin.findOne(
    {
      email: req.body.email,
    },
    { password: 1 }
  )
  if (!admin) return sendResponse.requestError(res, 400, langJson.EMAILDOESNOTEXIST)
  const code = await helperUtil.randomString({ length: 6, type: '#' })

  // For send mail
  const mailContent = {}
  mailContent.to = req.body.email // receiver mail address
  mailContent.subject = 'Forgot Password' // subject
  mailContent.text = `your Verification Code is ${code}` // text content
  mailContent.html = `<b>your Verification Code is ${code}</b>` // html content

  smtpUtil.sendMail(mailContent)

  const updateData = await Admin.updateOne(
    { _id: admin._id },
    {
      $set: {
        code: code,
        codeUpdateTime: new Date(),
      },
    }
  )
  if (updateData && updateData.nModified !== 0) {
    return sendResponse.successResponse(res, langJson.CODETOEMAIL, { 'code': parseInt(code) })
  } else {
    return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
  }
})

// View or Get Profile Info
controller.getProfileDetail = handler(async function (req, res) {
  if (req.user) {
    return sendResponse.successResponse(
      res,
      langJson.PROFILEUPDATESUCCESS,
      await responseJson.adminProfileObject(req.user)
    )
  }
})

// update Admin Profile
controller.updateProfile = handler(async function (req, res) {
  if (req.user) {
    const phone = {
      'code': req.body.phoneCode,
      'number': req.body.phoneNumber,
    }
    const updateData = await Admin.updateOne(
      { _id: new mongoose.Types.ObjectId(req.user._id) },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          gender: req.body.gender,
          phone: phone,
          avatar: req.body.avatar,
        },
      }
    )
    if (updateData && updateData.nModified !== 0) {
      const admin = await Admin.findById(req.user._id).lean()
      return sendResponse.successResponse(
        res,
        langJson.PROFILEUPDATESUCCESS,
        await responseJson.adminProfileObject(admin)
      )
    } else {
      return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
    }
  } else {
    return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
  }
})

// Admin Password Change Manual
controller.changeProfilePassword = handler(async function (req, res) {
  if (req.user) {
    if (req.body.password !== req.body.confirmPassword)
      return sendResponse.requestError(res, 400, langJson.PASSWORDANDCONFIRMPASSWORD)

    const newPassword = authUtil.generatePassword(req.body.password)

    const updateData = await Admin.updateOne(
      { email: req.user.email },
      {
        $set: {
          password: newPassword,
          lastEditedTime: new Date(),
        },
      }
    )
    if (updateData && updateData.nModified !== 0) {
      return sendResponse.successResponse(res, langJson.PASSWORDUPDATESUCCESS, {})
    } else {
      return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
    }
  } else {
    return sendResponse.requestError(res, 400, langJson.UNAUTHORIZEDERROR)
  }
})

// Get Config Data
controller.getConfigData = handler(async function (req, res) {
  const ifConfig = await redis.read(constantUtils.GENERALSETTING)
  if (ifConfig) {
    sendResponse.successResponse(res, '', await responseJson.configObject(ifConfig))
  } else {
    const helperData = await Helper.findOne({
      name: constantUtils.GENERALSETTING,
    }).lean()
    await redis.write(constantUtils.GENERALSETTING, helperData)
    if (helperData) {
      return sendResponse.successResponse(res, '', await responseJson.configObject(helperData))
    } else {
      return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
    }
  }
})

// Get General Setting
controller.getGeneralSettings = handler(async function (req, res) {
  const ifConfig = await redis.read(constantUtils.GENERALSETTING)
  if (ifConfig) {
    sendResponse.successResponse(res, '', await responseJson.settingsObject(ifConfig))
  } else {
    const helperData = await Helper.findOne({
      name: constantUtils.GENERALSETTING,
    }).lean()
    await redis.write(constantUtils.GENERALSETTING, helperData)
    if (helperData) {
      return sendResponse.successResponse(res, '', await responseJson.settingsObject(helperData))
    } else {
      return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
    }
  }
})

// Update General Settings
controller.editGeneralSettings = handler(async function (req, res) {
  if (req.body._id) {
    const settings = await Helper.findOne({ _id: req.body._id }).lean()
    if (!settings) return sendResponse.requestError(res, 400, langJson.RECORDNOTFOUND)
  } else {
    return sendResponse.requestError(res, 400, langJson.REQBODYMISSING)
  }
  if (req.user) {
    const updateData = await Helper.updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          data: {
            siteTitle: req.body.data.siteTitle,
            siteUrl: req.body.data.siteUrl,
            siteAddress: req.body.data.siteAddress,
            siteEmail: req.body.data.siteEmail,
            siteCareerEmail: req.body.data.siteCareerEmail,
            siteStatus: req.body.data.siteStatus,
            lightLogo: req.body.data.lightLogo,
            darkLogo: req.body.data.darkLogo,
            favicon: req.body.data.favicon,
            mobileLogo: req.body.data.mobileLogo,
            emergencyNumber: req.body.data.emergencyNumber,
            tableLimitSize: req.body.data.tableLimitSize,
            maxUserLoginCount: req.body.data.maxUserLoginCount,
            userMinAge: req.body.data.userMinAge,
            joiningTokenBonus: req.body.data.joiningTokenBonus,
            referrelTokenBonus: req.body.data.referrelTokenBonus,
            dailyTokenBonus: req.body.data.dailyTokenBonus,
            returnClaimTokenBonus: req.body.data.returnClaimTokenBonus,
            dayToClaim: req.body.data.dayToClaim,
            cronTimeZone: req.body.data.cronTimeZone,
            redirectUrls: req.body.data.redirectUrls,
            socailUrls: req.body.data.socailUrls,
            spaces: req.body.data.spaces,
            appVersion: req.body.data.appVersion,
            fcm: req.body.data.fcm,
            sms: req.body.data.sms,
            smtp: req.body.data.smtp,
            google: req.body.data.google,
            facebook: req.body.data.facebook,
            companyLocation: {
              lat: req.body.data.lat,
              lng: req.body.data.lng,
            },
            companyPhone: {
              code: req.body.data.phoneCode,
              number: req.body.data.phoneNumber,
            },
          },
        },
      }
    )
    if (updateData && updateData.nModified !== 0) {
      return sendResponse.successResponse(res, langJson.SETTINGUPDATESUCCESS, {})
    } else {
      return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
    }
  } else {
    return sendResponse.requestError(res, 400, langJson.UNAUTHORIZEDERROR)
  }
})

// Admin list
controller.getAdminsList = handler(async function (req, res) {
  const skip = req.body.skip ? parseInt(req.body.skip) : 0
  const limit = req.body.limit ? parseInt(req.body.limit) : 20

  const query = [
    { $match: { userType: { $nin: [constantUtils.SUPERADMINS] }, status: { $nin: [constantUtils.ARCHIEVE] } } },
  ]

  if (req.body.rolesTypefilter && req.body.rolesTypefilter != '')
    query.push({ $match: { userType: req.body.rolesTypefilter } })

  if (req.body.search && req.body.search != '')
    query.push({
      $match: {
        $or: [
          { firstName: { $regex: req.body.search + '.*', $options: 'si' } },
          { lastName: { $regex: req.body.search + '.*', $options: 'si' } },
          { email: { $regex: req.body.search + '.*', $options: 'si' } },
          { 'phone.number': { $regex: req.body.search + '.*', $options: 'si' } },
        ],
      },
    })

  query.push({
    $facet: {
      all: [{ $count: 'all' }],
      response: [
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            firstName: 1,
            lastName: 1,
            phone: 1,
            email: 1,
            gender: 1,
            profilePic: 1,
            registerDate: '$createdAt',
            status: 1,
          },
        },
      ],
    },
  })
  const responseData = await Admin.aggregate(query)
  return sendResponse.successListResponse(
    res,
    skip,
    limit,
    responseData[0].all
      ? responseData[0].all[0]
        ? langJson.RECORDFOUND
        : langJson.RECORDNOTFOUND
      : langJson.RECORDNOTFOUND,
    responseData[0].all ? (responseData[0].all[0] ? responseData[0].all[0].all : 0) : 0,
    responseData[0].response ? (responseData[0].response.length > 0 ? responseData[0].response : []) : []
  )
})

// Add and Edit Admin
controller.addAdmin = handler(async function (req, res) {
  if (req.body._id) {
    const responseData = await Admin.findOne({ _id: new mongoose.Types.ObjectId(req.body._id) }).lean()
    if (!responseData) return sendResponse.dataNotAvailResponse(res)
  }
  const setData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    userType: req.body.userType,
    gender: req.body.gender,
    avatar: req.body.avatar,
    privileges: req.body.privileges,
    phone: { code: req.body.phoneCode, number: req.body.phoneNumber },
    status: req.body.status,
  }
  if (req.body.password) setData.password = authUtil.generatePassword(req.body.password)
  if (req.params.type.toUpperCase() === constantUtils.ADD) {
    const checkData = await Admin.countDocuments({
      email: req.body.email,
      'phone.number': req.body.phoneNumber,
    })
    if (checkData) return sendResponse.duplicationDataResponse(res)
    const responseData = await Admin.create(setData)
    if (responseData) {
      return sendResponse.successResponse(res, langJson.ADDADMINSUCCESS, {})
    } else {
      return sendResponse.requestError(res, 400, langJson.ERRORINADD)
    }
  } else if (req.params.type.toUpperCase() === constantUtils.EDIT && req.body._id) {
    const checkData = await Admin.countDocuments({
      _id: { $ne: new mongoose.Types.ObjectId(req.body._id) },
      email: req.body.email,
      'phone.number': req.body.phoneNumber,
    })
    if (checkData) return sendResponse.duplicationDataResponse(res)
    const updateData = await Admin.updateOne(
      { _id: new mongoose.Types.ObjectId(req.body._id) },
      {
        $set: {
          ...setData,
          lastEditedTime: new Date(),
        },
      }
    )
    if (updateData && updateData.nModified !== 0) {
      return sendResponse.successResponse(res, langJson.EDITADMINSUCCESS, {})
    } else {
      return sendResponse.requestError(res, 400, langJson.ERRORINEDIT)
    }
  } else {
    return sendResponse.requestError(res, 400, langJson.IDMISSING)
  }
})

// View or Get Single Admin with respective _id
controller.getAdminDetail = handler(async function (req, res) {
  const responseData = await Admin.findOne(
    { _id: new mongoose.Types.ObjectId(req.body._id) },
    { firstName: 1, lastName: 1, email: 1, avatar: 1, userType: 1, phone: 1, gender: 1, privileges: 1, status: 1 }
  )
  if (!responseData) return sendResponse.dataNotAvailResponse(res)
  return sendResponse.successResponse(res, langJson.RECORDFOUND, {
    firstName: responseData.firstName,
    lastName: responseData.lastName,
    email: responseData.email,
    userType: responseData.userType,
    gender: responseData.gender,
    avatar: responseData.avatar,
    phoneCode: responseData.phone.code,
    phoneNumber: responseData.phone.number,
    privileges: responseData.privileges,
    status: responseData.status,
  })
})

// Status Change Admin
controller.changeStatusAdmin = handler(async function (req, res) {
  const ids = await helperUtil.getMongoIds(req.body.id)
  const updateData = await Admin.updateMany(
    { _id: { $in: ids } },
    {
      $set: {
        status: req.body.status,
      },
    }
  )
  if (updateData && updateData.nModified !== 0) {
    return sendResponse.successResponse(res, langJson.STATUSCHANGEDSUCCESS, {})
  } else {
    return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
  }
})

// Delete Admin
controller.deleteAdmin = handler(async function (req, res) {
  const ids = await helperUtil.getMongoIds(req.body.id)
  const updateData = await Admin.updateMany(
    { _id: { $in: ids } },
    {
      $set: {
        status: constantUtils.ARCHIEVE,
      },
    }
  )
  if (updateData && updateData.nModified !== 0) {
    return sendResponse.successResponse(res, langJson.STATUSCHANGEDSUCCESS, {})
  } else {
    return sendResponse.requestError(res, 400, langJson.ERRORINDELETE)
  }
})

// Roles list
controller.getRolesList = handler(async function (req, res) {
  const skip = req.body.skip ? parseInt(req.body.skip) : 0
  const limit = req.body.limit ? parseInt(req.body.limit) : 20

  const query = [{ $match: { status: { $nin: [constantUtils.ARCHIEVE] } } }]

  if (req.body.search && req.body.search != '')
    query.push({
      $match: {
        $or: [{ role: { $regex: req.body.search + '.*', $options: 'si' } }],
      },
    })

  query.push({
    $facet: {
      all: [{ $count: 'all' }],
      response: [
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            role: 1,
            createdAt: 1,
            status: 1,
          },
        },
      ],
    },
  })
  const responseData = await Roles.aggregate(query)
  return sendResponse.successListResponse(
    res,
    skip,
    limit,
    responseData[0].all
      ? responseData[0].all[0]
        ? langJson.RECORDFOUND
        : langJson.RECORDNOTFOUND
      : langJson.RECORDNOTFOUND,
    responseData[0].all ? (responseData[0].all[0] ? responseData[0].all[0].all : 0) : 0,
    responseData[0].response ? (responseData[0].response.length > 0 ? responseData[0].response : []) : []
  )
})

// Add and Edit Roles
controller.addAndEditRoles = handler(async function (req, res) {
  if (req.body._id) {
    const responseData = await Roles.findOne({ _id: new mongoose.Types.ObjectId(req.body._id) }).lean()
    if (!responseData) return sendResponse.dataNotAvailResponse(res)
  }
  const setData = {
    role: req.body.role.toUpperCase(),
    privileges: req.body.privileges,
    isSelectedAll: req.body.isSelectedAll,
    status: req.body.status,
  }
  if (req.body.password) setData.password = authUtil.generatePassword(req.body.password)
  if (req.params.type.toUpperCase() === constantUtils.ADD) {
    const checkData = await Roles.countDocuments({
      role: req.body.role.toUpperCase(),
    })
    if (checkData) return sendResponse.duplicationDataResponse(res)
    const responseData = await Roles.create(setData)
    if (responseData) {
      return sendResponse.successResponse(res, langJson.ADDROLESSUCCESS, {})
    } else {
      return sendResponse.requestError(res, 400, langJson.ERRORINADD)
    }
  } else if (req.params.type.toUpperCase() === constantUtils.EDIT && req.body._id) {
    const checkData = await Roles.countDocuments({
      _id: { $ne: new mongoose.Types.ObjectId(req.body._id) },
      role: req.body.role.toUpperCase(),
    })
    if (checkData) return sendResponse.duplicationDataResponse(res)
    const updateData = await Roles.updateOne(
      { _id: new mongoose.Types.ObjectId(req.body._id) },
      {
        $set: setData,
      }
    )
    if (updateData && updateData.nModified !== 0) {
      return sendResponse.successResponse(res, langJson.EDITROLESSUCCESS, {})
    } else {
      return sendResponse.requestError(res, 400, langJson.ERRORINEDIT)
    }
  } else {
    return sendResponse.requestError(res, 400, langJson.IDMISSING)
  }
})

// View or Get Single Roles with respective _id
controller.getRolesDetail = handler(async function (req, res) {
  const responseData = await Roles.findOne(
    { _id: new mongoose.Types.ObjectId(req.body._id) },
    { role: 1, privileges: 1, status: 1 }
  )
  if (!responseData) return sendResponse.dataNotAvailResponse(res)
  return sendResponse.successResponse(res, langJson.RECORDFOUND, responseData)
})

// Status Change Roles
controller.changeStatusRoles = handler(async function (req, res) {
  const ids = await helperUtil.getMongoIds(req.body.id)
  const updateData = await Roles.updateMany(
    { _id: { $in: ids } },
    {
      $set: {
        status: req.body.status,
      },
    }
  )
  if (updateData && updateData.nModified !== 0) {
    return sendResponse.successResponse(res, langJson.STATUSCHANGEDSUCCESS, {})
  } else {
    return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
  }
})

// Delete Roles
controller.deleteRoles = handler(async function (req, res) {
  const ids = await helperUtil.getMongoIds(req.body.id)
  const updateData = await Roles.updateMany(
    { _id: { $in: ids } },
    {
      $set: {
        status: constantUtils.ARCHIEVE,
      },
    }
  )
  if (updateData && updateData.nModified !== 0) {
    return sendResponse.successResponse(res, langJson.DELETEROLESSUCCESS, {})
  } else {
    return sendResponse.requestError(res, 400, langJson.ERRORINDELETE)
  }
})

// GET roles for ADD and EDIT
controller.getActiveRoles = handler(async function (req, res) {
  const query = [{ $match: { status: constantUtils.ENABLE } }]

  if (req.params.type && req.params.type != '')
    query.push({ $match: { notificationType: req.params.type.toUpperCase() } })

  query.push({
    $facet: {
      all: [{ $count: 'all' }],
      response: [
        { $sort: { createdAt: -1 } },
        {
          $project: {
            role: 1,
            privileges: 1,
          },
        },
      ],
    },
  })
  const responseData = await Roles.aggregate(query)
  return sendResponse.successListResponse(
    res,
    0,
    0,
    responseData[0].all
      ? responseData[0].all[0]
        ? langJson.RECORDFOUND
        : langJson.RECORDNOTFOUND
      : langJson.RECORDNOTFOUND,
    responseData[0].all ? (responseData[0].all[0] ? responseData[0].all[0].all : 0) : 0,
    responseData[0].response ? (responseData[0].response.length > 0 ? responseData[0].response : []) : []
  )
})

// Users list
controller.getUsersList = handler(async function (req, res) {
  const skip = req.body.skip ? parseInt(req.body.skip) : 0
  const limit = req.body.limit ? parseInt(req.body.limit) : 20

  const query = []

  if (req.body.filter && req.body.filter != '') {
    query.push({ $match: { status: req.body.statusFilter } })
  } else {
    query.push({ $match: { status: { $in: [constantUtils.ENABLE, constantUtils.DISABLE] } } })
  }

  if (req.body.search && req.body.search != '')
    query.push({
      $match: {
        $or: [
          { userName: { $regex: req.body.search + '.*', $options: 'si' } },
          { firstName: { $regex: req.body.search + '.*', $options: 'si' } },
          { lastName: { $regex: req.body.search + '.*', $options: 'si' } },
          { email: { $regex: req.body.search + '.*', $options: 'si' } },
          { 'phone.number': { $regex: req.body.search + '.*', $options: 'si' } },
        ],
      },
    })

  query.push({
    $facet: {
      all: [{ $count: 'all' }],
      response: [
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            firstName: 1,
            lastName: 1,
            phone: 1,
            email: 1,
            dob: 1,
            gender: 1,
            registerDate: '$createdAt',
            status: 1,
          },
        },
      ],
    },
  })
  const responseData = await User.aggregate(query)
  return sendResponse.successListResponse(
    res,
    skip,
    limit,
    responseData[0].all
      ? responseData[0].all[0]
        ? langJson.RECORDFOUND
        : langJson.RECORDNOTFOUND
      : langJson.RECORDNOTFOUND,
    responseData[0].all ? (responseData[0].all[0] ? responseData[0].all[0].all : 0) : 0,
    responseData[0].response ? (responseData[0].response.length > 0 ? responseData[0].response : []) : []
  )
})

// Add and Edit Users
controller.addAndEditUsers = handler(async function (req, res) {
  if (req.body._id) {
    const responseData = await User.findOne({ _id: new mongoose.Types.ObjectId(req.body._id) }).lean()
    if (!responseData) return sendResponse.dataNotAvailResponse(res)
  }
  const setData = {
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    profilePic: req.body.profilePic,
    gender: req.body.gender,
    dob: req.body.dob,
    password: req.body.password,
    phone: {
      code: req.body.phoneCode,
      number: req.body.phoneNumber,
    },
    status: req.body.status,
  }
  if (req.body.password) setData.password = authUtil.generatePassword(req.body.password)
  if (req.params.type.toUpperCase() === constantUtils.ADD) {
    const checkData = await User.countDocuments({
      userName: req.body.userName,
      email: req.body.email,
      'phone.number': req.body.phoneNumber,
    })
    if (checkData) return sendResponse.duplicationDataResponse(res)
    const settingsObject = await redis.read(constantUtils.GENERALSETTING)
    const uniqueCode = await helperUtil.randomString({ length: 8, type: '#, A' })
    const responseData = await User.create({
      ...setData,
      uniqueCode: uniqueCode,
      referredBy: '',
      googleId: '',
      facebookId: '',
      avatar: '',
      linkedGames: [],
      tokenDetails: {
        totalEarnCount: parseInt(settingsObject.data.joiningTokenBonus),
        joiningBonusTokenCount: parseInt(settingsObject.data.joiningTokenBonus),
        availableTokenCount: parseInt(settingsObject.data.joiningTokenBonus),
      },
    })
    if (responseData) {
      return sendResponse.successResponse(res, langJson.ADDUSERSUCCESS, {})
    } else {
      return sendResponse.requestError(res, 400, langJson.ERRORINADD)
    }
  } else if (req.params.type.toUpperCase() === constantUtils.EDIT && req.body._id) {
    const checkData = await User.countDocuments({
      _id: { $ne: new mongoose.Types.ObjectId(req.body._id) },
      userName: req.body.userName,
      email: req.body.email,
      'phone.number': req.body.phoneNumber,
    })
    if (checkData) return sendResponse.duplicationDataResponse(res)
    const updateData = await User.updateOne(
      { _id: new mongoose.Types.ObjectId(req.body._id) },
      {
        $set: {
          ...setData,
          lastEditedTime: new Date(),
        },
      }
    )
    if (updateData && updateData.nModified !== 0) {
      return sendResponse.successResponse(res, langJson.EDITUSERSUCCESS, {})
    } else {
      return sendResponse.requestError(res, 400, langJson.ERRORINEDIT)
    }
  } else {
    return sendResponse.requestError(res, 400, langJson.IDMISSING)
  }
})

// View or Get Single User with respective _id
controller.getUserDetail = handler(async function (req, res) {
  const responseData = await User.findOne({ _id: new mongoose.Types.ObjectId(req.body._id) })
  if (!responseData) return sendResponse.dataNotAvailResponse(res)
  return sendResponse.successResponse(res, langJson.RECORDFOUND, responseData)
})

// Status Change User
controller.changeStatusUser = handler(async function (req, res) {
  const ids = await helperUtil.getMongoIds(req.body.id)
  const updateData = await User.updateMany(
    { _id: { $in: ids } },
    {
      $set: {
        status: req.body.status,
      },
    }
  )
  if (updateData && updateData.nModified !== 0) {
    return sendResponse.successResponse(res, langJson.STATUSCHANGEDSUCCESS, {})
  } else {
    return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
  }
})

// Delete User
controller.deleteUser = handler(async function (req, res) {
  const ids = await helperUtil.getMongoIds(req.body.id)
  const updateData = await User.updateMany(
    { _id: { $in: ids } },
    {
      $set: {
        status: constantUtils.ARCHIEVE,
      },
    }
  )
  if (updateData && updateData.nModified !== 0) {
    return sendResponse.successResponse(res, langJson.DELETEUSERSUCCESS, {})
  } else {
    return sendResponse.requestError(res, 400, langJson.ERRORINDELETE)
  }
})

// Get User Token Transaction
controller.getUsersList = handler(async function (req, res) {
  const skip = req.body.skip ? parseInt(req.body.skip) : 0
  const limit = req.body.limit ? parseInt(req.body.limit) : 20

  const query = []

  if (req.body.filter && req.body.filter != '') {
    query.push({ $match: { status: req.body.statusFilter } })
  } else {
    query.push({ $match: { status: { $in: [constantUtils.ENABLE, constantUtils.DISABLE] } } })
  }

  if (req.body.search && req.body.search != '')
    query.push({
      $match: {
        $or: [
          { userName: { $regex: req.body.search + '.*', $options: 'si' } },
          { firstName: { $regex: req.body.search + '.*', $options: 'si' } },
          { lastName: { $regex: req.body.search + '.*', $options: 'si' } },
          { email: { $regex: req.body.search + '.*', $options: 'si' } },
          { 'phone.number': { $regex: req.body.search + '.*', $options: 'si' } },
        ],
      },
    })

  query.push({
    $facet: {
      all: [{ $count: 'all' }],
      response: [
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            firstName: 1,
            lastName: 1,
            phone: 1,
            email: 1,
            dob: 1,
            gender: 1,
            registerDate: '$createdAt',
            status: 1,
          },
        },
      ],
    },
  })
  const responseData = await User.aggregate(query)
  return sendResponse.successListResponse(
    res,
    skip,
    limit,
    responseData[0].all
      ? responseData[0].all[0]
        ? langJson.RECORDFOUND
        : langJson.RECORDNOTFOUND
      : langJson.RECORDNOTFOUND,
    responseData[0].all ? (responseData[0].all[0] ? responseData[0].all[0].all : 0) : 0,
    responseData[0].response ? (responseData[0].response.length > 0 ? responseData[0].response : []) : []
  )
})

// Report list
controller.getReportList = handler(async function (req, res) {
  const skip = req.body.skip ? parseInt(req.body.skip) : 0
  const limit = req.body.limit ? parseInt(req.body.limit) : 20

  const query = []

  if (req.body.filter && req.body.filter != '') {
    query.push({ $match: { status: req.body.filter } })
  } else {
    query.push({ $match: { status: { $in: [constantUtils.NEW, constantUtils.PROGRESS] } } })
  }

  if (req.body.search && req.body.search != '')
    query.push({
      $match: {
        $or: [
          { 'user.userName': { $regex: req.body.search + '.*', $options: 'si' } },
          { 'user.firstName': { $regex: req.body.search + '.*', $options: 'si' } },
          { 'user.lastName': { $regex: req.body.search + '.*', $options: 'si' } },
          { 'user.email': { $regex: req.body.search + '.*', $options: 'si' } },
          { 'user.phone.number': { $regex: req.body.search + '.*', $options: 'si' } },
        ],
      },
    })

  query.push({
    $facet: {
      all: [{ $count: 'all' }],
      response: [
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            user: 1,
            description: 1,
            type: 1,
            status: 1,
            ReportDate: '$createdAt',
          },
        },
      ],
    },
  })
  const responseData = await Report.aggregate(query)
  return sendResponse.successListResponse(
    res,
    skip,
    limit,
    responseData[0].all
      ? responseData[0].all[0]
        ? langJson.RECORDFOUND
        : langJson.RECORDNOTFOUND
      : langJson.RECORDNOTFOUND,
    responseData[0].all ? (responseData[0].all[0] ? responseData[0].all[0].all : 0) : 0,
    responseData[0].response ? (responseData[0].response.length > 0 ? responseData[0].response : []) : []
  )
})

// View or Get Single Report with respective _id
controller.getReportDetail = handler(async function (req, res) {
  const responseData = await Report.findOne({ _id: new mongoose.Types.ObjectId(req.body._id) })
  if (!responseData) return sendResponse.dataNotAvailResponse(res)
  return sendResponse.successResponse(res, langJson.RECORDFOUND, responseData)
})

// Status Change Report
controller.changeStatusReport = handler(async function (req, res) {
  const ids = await helperUtil.getMongoIds(req.body.id)
  const updateData = await Report.updateMany(
    { _id: { $in: ids } },
    {
      $set: {
        status: req.body.status,
      },
    }
  )
  if (updateData && updateData.nModified !== 0) {
    return sendResponse.successResponse(res, langJson.STATUSCHANGEDSUCCESS, {})
  } else {
    return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
  }
})

// Resolve Report
controller.resolveReport = handler(async function (req, res) {
  const ids = await helperUtil.getMongoIds(req.body.id)
  const updateData = await Report.updateMany(
    { _id: { $in: ids } },
    {
      $set: {
        status: constantUtils.RESOLVED,
      },
    }
  )
  if (updateData && updateData.nModified !== 0) {
    return sendResponse.successResponse(res, langJson.STATUSCHANGEDSUCCESS, {})
  } else {
    return sendResponse.requestError(res, 400, langJson.ERRORINDELETE)
  }
})

// Template list
controller.getTemplatesList = handler(async function (req, res) {
  const skip = req.body.skip ? parseInt(req.body.skip) : 0
  const limit = req.body.limit ? parseInt(req.body.limit) : 20

  const query = []

  if (req.body.statusFilter && req.body.statusFilter != '') {
    query.push({ $match: { status: req.body.statusFilter } })
  } else {
    query.push({ $match: { status: { $in: [constantUtils.ENABLE, constantUtils.DISABLE] } } })
  }

  if (req.body.filter && req.body.filter != '') query.push({ $match: { type: req.body.filter } })

  if (req.body.search && req.body.search != '')
    query.push({
      $match: { $or: [{ title: { $regex: req.body.search + '.*', $options: 'si' } }] },
    })

  query.push({
    $facet: {
      all: [{ $count: 'all' }],
      response: [
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            title: 1,
            userType: 1,
            type: 1,
            status: 1,
            createdAt: 1,
          },
        },
      ],
    },
  })
  const responseData = await Templates.aggregate(query)
  return sendResponse.successListResponse(
    res,
    skip,
    limit,
    responseData[0].all
      ? responseData[0].all[0]
        ? langJson.RECORDFOUND
        : langJson.RECORDNOTFOUND
      : langJson.RECORDNOTFOUND,
    responseData[0].all ? (responseData[0].all[0] ? responseData[0].all[0].all : 0) : 0,
    responseData[0].response ? (responseData[0].response.length > 0 ? responseData[0].response : []) : []
  )
})

// Add and Edit Template
controller.addAndEditTemplate = handler(async function (req, res) {
  if (req.body._id) {
    const responseData = await Templates.findOne({ _id: new mongoose.Types.ObjectId(req.body._id) }).lean()
    if (!responseData) return sendResponse.dataNotAvailResponse(res)
  }
  const setData = {
    name: req.body.name,
    title: req.body.title,
    userType: req.body.userType,
    templateFor: constantUtils.NOTIFICATION,
    notificationType: req.body.notificationType,
    image: req.body.image,
    comments: req.body.comments,
    status: req.body.status,
  }
  if (req.body.password) setData.password = authUtil.generatePassword(req.body.password)
  if (req.params.type.toUpperCase() === constantUtils.ADD) {
    const checkData = await Templates.countDocuments({
      name: req.body.name,
    })
    if (checkData) return sendResponse.duplicationDataResponse(res)
    const responseData = await Templates.create({
      ...setData,
    })
    if (responseData) {
      return sendResponse.successResponse(res, langJson.ADDTEMPLATESUCCESS, {})
    } else {
      return sendResponse.requestError(res, 400, langJson.ERRORINADD)
    }
  } else if (req.params.type.toUpperCase() === constantUtils.EDIT && req.body._id) {
    const checkData = await Templates.countDocuments({
      _id: { $ne: new mongoose.Types.ObjectId(req.body._id) },
      name: req.body.name,
    })
    if (checkData) return sendResponse.duplicationDataResponse(res)
    const updateData = await Templates.updateOne(
      { _id: new mongoose.Types.ObjectId(req.body._id) },
      {
        $set: {
          ...setData,
        },
      }
    )
    if (updateData && updateData.nModified !== 0) {
      return sendResponse.successResponse(res, langJson.EDITTEMPLATESSUCCESS, {})
    } else {
      return sendResponse.requestError(res, 400, langJson.ERRORINEDIT)
    }
  } else {
    return sendResponse.requestError(res, 400, langJson.IDMISSING)
  }
})

// View or Get Single Templates with respective _id
controller.getTemplateDetail = handler(async function (req, res) {
  const responseData = await Templates.findOne({ _id: new mongoose.Types.ObjectId(req.body._id) })
  if (!responseData) return sendResponse.dataNotAvailResponse(res)
  return sendResponse.successResponse(res, langJson.RECORDFOUND, responseData)
})

// Status Change Template
controller.changeStatusTemplate = handler(async function (req, res) {
  const ids = await helperUtil.getMongoIds(req.body.id)
  const updateData = await Templates.updateMany(
    { _id: { $in: ids } },
    {
      $set: {
        status: req.body.status,
      },
    }
  )
  if (updateData && updateData.nModified !== 0) {
    return sendResponse.successResponse(res, langJson.STATUSCHANGEDSUCCESS, {})
  } else {
    return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
  }
})

// Delete Template
controller.deleteTemplate = handler(async function (req, res) {
  const ids = await helperUtil.getMongoIds(req.body.id)
  const updateData = await Templates.updateMany(
    { _id: { $in: ids } },
    {
      $set: {
        status: constantUtils.ARCHIEVE,
      },
    }
  )
  if (updateData && updateData.nModified !== 0) {
    return sendResponse.successResponse(res, langJson.DELETETEMPLATESUCCESS, {})
  } else {
    return sendResponse.requestError(res, 400, langJson.ERRORINDELETE)
  }
})

// GET Template for send Push Notification
controller.getTemplatesBasedOnType = handler(async function (req, res) {
  const skip = req.body.skip ? parseInt(req.body.skip) : 0
  const limit = req.body.limit ? parseInt(req.body.limit) : 20
  const query = [{ $match: { status: constantUtils.ENABLE } }]

  if (req.params.type && req.params.type != '')
    query.push({ $match: { notificationType: req.params.type.toUpperCase() } })

  query.push({
    $facet: {
      all: [{ $count: 'all' }],
      response: [
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            title: 1,
          },
        },
      ],
    },
  })
  const responseData = await Templates.aggregate(query)
  return sendResponse.successListResponse(
    res,
    skip,
    limit,
    responseData[0].all
      ? responseData[0].all[0]
        ? langJson.RECORDFOUND
        : langJson.RECORDNOTFOUND
      : langJson.RECORDNOTFOUND,
    responseData[0].all ? (responseData[0].all[0] ? responseData[0].all[0].all : 0) : 0,
    responseData[0].response ? (responseData[0].response.length > 0 ? responseData[0].response : []) : []
  )
})

// Add and Send Notification
controller.sendNotifictaion = handler(async function (req, res) {
  const notificationType = req.params.notificationType.toUpperCase()
  const sendUserList = req.body.users
  const responseData = await Notification.create({
    title: req.body.title,
    description: req.body.description,
    notificationType: notificationType,
    image: req.body.image,
    notificationDate: new Date(),
    users: sendUserList,
  })

  switch (notificationType) {
    case constantUtils.PUSH:
      {
        // For send Push Notification
        sendUserList.forEach(async (e) => {
          const pushContent = {}
          pushContent.title = req.body.title
          pushContent.body = req.body.description
          pushContent.image = req.body.image
          pushContent.token = e.deviceToken
          await sendFcm.sendNotification(pushContent)
        })
      }
      break
    case constantUtils.EMAIL:
      {
        // For send mail
        sendUserList.forEach(async (e) => {
          const mailContent = {}
          mailContent.to = e.email // receiver mail address
          mailContent.subject = req.body.title // subject
          mailContent.text = req.body.description // text content
          mailContent.html = req.body.description // html content

          await smtpUtil.sendMail(mailContent)
        })
      }
      break
    case constantUtils.ALL:
      break

    default:
      break
  }

  if (responseData) {
    return sendResponse.successResponse(res, langJson.SENDTOUSER, {})
  } else {
    return sendResponse.requestError(res, 400, langJson.ERRORINSENDPUSH)
  }
})

// Notification list
controller.getNotificationList = handler(async function (req, res) {
  const skip = req.body.skip ? parseInt(req.body.skip) : 0
  const limit = req.body.limit ? parseInt(req.body.limit) : 20

  const query = []
  query.push({
    $facet: {
      all: [{ $count: 'all' }],
      response: [
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            title: 1,
            description: 1,
            image: 1,
            notificationType: 1,
            notificationDate: 1,
          },
        },
      ],
    },
  })
  const responseData = await Notification.aggregate(query)
  return sendResponse.successListResponse(
    res,
    skip,
    limit,
    responseData[0].all
      ? responseData[0].all[0]
        ? langJson.RECORDFOUND
        : langJson.RECORDNOTFOUND
      : langJson.RECORDNOTFOUND,
    responseData[0].all ? (responseData[0].all[0] ? responseData[0].all[0].all : 0) : 0,
    responseData[0].response ? (responseData[0].response.length > 0 ? responseData[0].response : []) : []
  )
})

// Gamepedia list
controller.getGamepediaList = handler(async function (req, res) {
  const skip = req.body.skip ? parseInt(req.body.skip) : 0
  const limit = req.body.limit ? parseInt(req.body.limit) : 20

  const query = []
  query.push({
    $facet: {
      all: [{ $count: 'all' }],
      response: [
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            gameName: 1,
            gameImage: 1,
            rating: '$overview.rating',
            releseDate: '$overview.releseDate',
          },
        },
      ],
    },
  })
  const responseData = await Games.aggregate(query)
  return sendResponse.successListResponse(
    res,
    skip,
    limit,
    responseData[0].all
      ? responseData[0].all[0]
        ? langJson.RECORDFOUND
        : langJson.RECORDNOTFOUND
      : langJson.RECORDNOTFOUND,
    responseData[0].all ? (responseData[0].all[0] ? responseData[0].all[0].all : 0) : 0,
    responseData[0].response ? (responseData[0].response.length > 0 ? responseData[0].response : []) : []
  )
})

module.exports = controller
