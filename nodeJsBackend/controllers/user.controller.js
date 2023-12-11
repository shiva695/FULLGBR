// Dependencies Import
const handler = require('express-async-handler')
const mongoose = require('mongoose')

// Models import
const User = require('../models/user.models')
const Games = require('../models/gamepedia.models')
const Feedback = require('../models/feedback.models')
const Tokens = require('../models/token.models')
const Notification = require('../models/notification.models')

// Json import
const langJson = require(`../json/en.json`)

// Utils import
const constantUtils = require('../utils/constant.utils')
const sendResponse = require('../utils/response.utils')
const responseJson = require('../utils/responseJson.utils')
const authUtil = require('../utils/auth.utils')
const helperUtil = require('../utils/helper.utils')
const smtpUtil = require('../utils/smtp.utils')
const smsUtil = require('../utils/sms.utils')
const redis = require('../utils/redis.utils')

const controller = {}

// User Verification for social Login
controller.confirmUser = handler(async function (req, res) {
  const query = req.body.platform === constantUtils.GOOGLE ? { 'googleId': req.body.id } : { 'facebookId': req.body.id }
  let user = await User.findOne(query).lean()
  if (!user) return sendResponse.userExistResponse(res)
  const settingsObject = await redis.read(constantUtils.GENERALSETTING)
  const token = authUtil.jwtSign({
    _id: user._id,
    userType: constantUtils.USERS,
  })
  const deviceInfo = await helperUtil.checkDeviceInfo(req, token, user.deviceInfo)

  if (deviceInfo.length <= settingsObject.data.maxUserLoginCount) {
    const updateData = await User.updateOne(
      { _id: user._id },
      {
        $set: {
          deviceInfo: deviceInfo,
          lastLogin: new Date(),
          lastTokenUpdateTime: new Date(),
        },
        $inc: {
          loginCount: 1,
        },
      }
    )
    if (updateData && updateData.nModified !== 0) {
      user = await User.findById(user._id).lean()
      return sendResponse.successResponse(res, langJson.LOGINSUCCESSFULLY, await responseJson.userProfileObject(user))
    } else {
      return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
    }
  } else {
    return sendResponse.requestError(res, 400, langJson.USERALREADYREACHMAXCOUNT)
  }
})

// User Login
controller.login = handler(async function (req, res) {
  let user = await User.findOne(
    {
      $or: [{ email: req.body.userName }, { userName: req.body.userName }],
    },
    { password: 1, deviceInfo: 1 }
  )
  if (!user) return sendResponse.requestError(res, 400, langJson.INVALIDUSERNAMEANDPASSWORD)
  if (authUtil.comparePassword(req.body.password, user.password)) {
    const settingsObject = await redis.read(constantUtils.GENERALSETTING)
    const token = authUtil.jwtSign({
      _id: user._id,
      userType: constantUtils.USERS,
    })
    const deviceInfo = await helperUtil.checkDeviceInfo(req, token, user.deviceInfo)

    if (deviceInfo.length <= settingsObject.data.maxUserLoginCount) {
      const updateData = await User.updateOne(
        { _id: user._id },
        {
          $set: {
            deviceInfo: deviceInfo,
            lastLogin: new Date(),
            lastTokenUpdateTime: new Date(),
          },
          $inc: {
            loginCount: 1,
          },
        }
      )
      if (updateData && updateData.nModified !== 0) {
        user = await User.findById(user._id).lean()
        return sendResponse.successResponse(res, langJson.LOGINSUCCESSFULLY, await responseJson.userProfileObject(user))
      } else {
        return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
      }
    } else {
      return sendResponse.requestError(res, 400, langJson.USERALREADYREACHMAXCOUNT)
    }
  } else {
    return sendResponse.requestError(res, 400, langJson.INVALIDUSERNAMEANDPASSWORD)
  }
})

// User Forgot Password
controller.verifyUser = handler(async function (req, res) {
  const user = await User.findOne(
    {
      $or: [{ email: req.body.userName }, { userName: req.body.userName }],
    },
    { phone: 1, email: 1 }
  )
  if (!user) return sendResponse.requestError(res, 400, langJson.EMAILDOESNOTEXIST)
  return sendResponse.successResponse(res, langJson.LOGINSUCCESSFULLY, await responseJson.userProfileObject(user))
})

// User Send OTP
controller.sendOtp = handler(async function (req, res) {
  const settingsObject = await redis.read(constantUtils.GENERALSETTING)
  let massage = ''
  const code = await helperUtil.randomString({ length: 6, type: '#' })

  if (req.body.otpPlatform === constantUtils.SMS) {
    const smsContent = {}
    smsContent.to = req.body.phoneCode + req.body.phoneNumber
    smsContent.body = `Your Verification Code is ${code}` // body content
    smsUtil.send(smsContent)
    massage = langJson.CODETOSMS
  } else {
    // For send mail
    const mailContent = {}
    mailContent.from = settingsObject.data.smtp.user // sender mail address
    mailContent.to = req.body.email // receiver mail address
    mailContent.subject = 'Forgot Password' // subject
    mailContent.text = `Your Verification Code is ${code}` // text content
    mailContent.html = `<p>Your Verification Code is <strong>${code}</strong></p>` // html content
    smtpUtil.sendMail(mailContent)
    massage = langJson.CODETOEMAIL
  }

  const updateData = await User.updateOne(
    { email: req.body.email },
    {
      $set: {
        code: code,
        codeUpdateTime: new Date(),
      },
    }
  )
  if (updateData && updateData.nModified !== 0) {
    return sendResponse.successResponse(res, massage, { 'code': parseInt(code), 'email': req.body.email })
  } else {
    return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
  }
})

// User Password Reset
controller.changePassword = handler(async function (req, res) {
  if (req.body.password !== req.body.confirmPassword)
    return sendResponse.requestError(res, 400, langJson.PASSWORDANDCONFIRMPASSWORD)

  const newPassword = authUtil.generatePassword(req.body.password)

  const updateData = await User.updateOne(
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

// User Logout
controller.logout = handler(async function (req, res) {
  const updateData = await User.updateOne(
    { _id: new mongoose.Types.ObjectId(req.user._id) },
    {
      $pull: {
        deviceInfo: { accessToken: req.headers.authorization.split('Bearer ')[1] },
      },
      $set: {
        lastEditedTime: new Date(),
        lastLogoutTime: new Date(),
      },
    }
  )
  if (updateData && updateData.nModified !== 0) {
    return sendResponse.successResponse(res, langJson.LOGOUTSUCCESS, {})
  } else {
    return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
  }
})

// Sign up
controller.signUp = handler(async function (req, res) {
  const settingsObject = await redis.read(constantUtils.GENERALSETTING)
  const uniqueCode = await helperUtil.randomString({ length: 8, type: '#, A' })
  let query = {}
  let refferedUser = {}
  // verify referred user
  if (req.body.referredBy && typeof req.body.referredBy != 'undefined') {
    query = { 'uniqueCode': req.body.referredBy }
    refferedUser = await User.findOne(query).lean()
    if (!refferedUser) return sendResponse.requestError(res, 400, langJson.REFERREDUSERNOTEXISTS)
  }
  let user = await User.create({
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profilePic: req.body.profilePic,
    avatar: req.body.avatar,
    gender: req.body.gender,
    dob: req.body.dob,
    password: req.body.password,
    email: req.body.email,
    referredBy: req.body.referredBy,
    googleId: req.body.googleId,
    facebookId: req.body.facebookId,
    uniqueCode: uniqueCode,
    phone: {
      code: req.body.phoneCode,
      number: req.body.phoneNumber,
    },
    linkedGames: req.body.linkedGames,
    status: constantUtils.ENABLE,
    tokenDetails: {
      totalEarnCount: parseInt(settingsObject.data.joiningTokenBonus),
      joiningBonusTokenCount: parseInt(settingsObject.data.joiningTokenBonus),
      availableTokenCount: parseInt(settingsObject.data.joiningTokenBonus),
    },
  })
  if (!user) return sendResponse.requestError(res, 400, langJson.ERRORINADD)
  // update referrel bonus to referred user
  if (req.body.referredBy && typeof req.body.referredBy != 'undefined') {
    const updateValue = {
      referredCount: refferedUser.referredCount + 1,
      tokenDetails: {
        totalEarnCount:
          parseInt(refferedUser.tokenDetails.totalEarnCount) + parseInt(settingsObject.data.referrelTokenBonus),
        availableTokenCount:
          parseInt(refferedUser.tokenDetails.availableTokenCount) + parseInt(settingsObject.data.referrelTokenBonus),
        referelTokenCount:
          parseInt(refferedUser.tokenDetails.referelTokenCount) + parseInt(settingsObject.data.referrelTokenBonus),
        joiningBonusTokenCount: parseInt(refferedUser.tokenDetails.joiningBonusTokenCount),
        spentTokenCount: parseInt(refferedUser.tokenDetails.spentTokenCount),
        otherMediumToken: parseInt(refferedUser.tokenDetails.otherMediumToken),
      },
    }
    const updateData = await User.updateOne(query, {
      $set: {
        referredCount: updateValue.referredCount,
        tokenDetails: updateValue.tokenDetails,
        lastEditedTime: new Date(),
      },
    })
    if (updateData && updateData.nModified === 0) {
      return sendResponse.requestError(res, 400, langJson.REFERREDUSERNOTEXISTS)
    } else {
      const tokenData = await Tokens.create({
        amount: settingsObject.data.referrelTokenBonus,
        fromUser: { userName: constantUtils.GAMERSBACK, userId: '' },
        toUser: { userName: refferedUser.userName, userId: refferedUser._id },
        transType: constantUtils.CREDIT,
        actionType: constantUtils.REFERRELBONUS,
      })
      if (!tokenData) return sendResponse.requestError(res, 400, langJson.ERRINTOKENTRANS)
    }
  }

  const token = authUtil.jwtSign({
    _id: user._id,
    userType: constantUtils.USERS,
  })
  const deviceInfo = await helperUtil.checkDeviceInfo(req, token, user.deviceInfo)

  const updateData = await User.updateOne(
    { _id: user._id },
    {
      $set: {
        deviceInfo: deviceInfo,
        lastLogin: new Date(),
        lastTokenUpdateTime: new Date(),
      },
      $inc: {
        loginCount: 1,
      },
    }
  )
  if (updateData && updateData.nModified !== 0) {
    user = await User.findById(user._id).lean()
    return sendResponse.successResponse(res, langJson.LOGINSUCCESSFULLY, await responseJson.userProfileObject(user))
  } else {
    return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
  }
})

// Edit Generel Info form Setting
controller.editGeneralInfo = handler(async function (req, res) {
  if (req.user) {
    const updateData = await User.updateOne(
      { _id: req.user._id },
      {
        $set: {
          userName: req.body.userName,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          gender: req.body.gender,
          dob: req.body.dob,
          lastEditedTime: new Date(),
        },
      }
    )
    if (updateData && updateData.nModified !== 0) {
      const user = await User.findById(req.user._id).lean()
      return sendResponse.successResponse(res, langJson.INFOEDITDSUCCESS, await responseJson.userProfileObject(user))
    } else {
      return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
    }
  }
})

// Edit Password from Setting
controller.editUserPassword = handler(async function (req, res) {
  if (req.body.password !== req.body.confirmPassword)
    return sendResponse.requestError(res, 400, langJson.PASSWORDANDCONFIRMPASSWORD)

  const newPassword = authUtil.generatePassword(req.body.password)
  if (req.user) {
    const updateData = await User.updateOne(
      { _id: req.user._id },
      {
        $set: {
          password: newPassword,
          lastEditedTime: new Date(),
        },
      }
    )
    if (updateData && updateData.nModified !== 0) {
      const user = await User.findById(req.user._id).lean()
      return sendResponse.successResponse(res, langJson.INFOEDITDSUCCESS, await responseJson.userProfileObject(user))
    } else {
      return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
    }
  }
})

// Edit Profile picture and Avatar
controller.editProfileAndAvatar = handler(async function (req, res) {
  if (req.user) {
    const updateData = await User.updateOne(
      { _id: req.user._id },
      {
        $set: {
          profilePic: req.body.profilePic,
          avatar: req.body.avatar,
          lastEditedTime: new Date(),
        },
      }
    )
    if (updateData && updateData.nModified !== 0) {
      const user = await User.findById(req.user._id).lean()
      return sendResponse.successResponse(res, langJson.INFOEDITDSUCCESS, await responseJson.userProfileObject(user))
    } else {
      return sendResponse.requestError(res, 400, langJson.ERRORINUPDATE)
    }
  }
})

// Get Games List
controller.getGamesList = handler(async function (req, res) {
  const skip = req.body.skip ? parseInt(req.body.skip) : 0
  const limit = req.body.limit ? parseInt(req.body.limit) : 20

  const query = []

  if (req.body.filter && req.body.filter != '') query.push({ $match: { status: req.body.filter } })

  if (req.body.search && req.body.search != '')
    query.push({
      $match: {
        $or: [{ gameName: { $regex: req.body.search + '.*', $options: 'si' } }],
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
            _id: 1,
            gameName: 1,
            gameImage: 1,
            developer: '$overview.developers',
            genre: '$overview.genre',
            status: 1,
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

// Get Single Game Data
controller.getGameDetail = handler(async function (req, res) {
  const responseData = await Games.findOne({ _id: new mongoose.Types.ObjectId(req.body._id) })
  if (!responseData) return sendResponse.requestError(res, langJson.RECORDFOUND)
  return sendResponse.successResponse(res, langJson.RECORDFOUND, responseData)
})

// Send Feedback to Admin
controller.sendFeedback = handler(async function (req, res) {
  const responseData = await Feedback.create({
    user: {
      userId: new mongoose.Types.ObjectId(req.user._id),
      userName: req.user.userName,
      profilePic: req.user.profilePic,
      avatar: req.user.avatar,
      email: req.user.email,
      phone: req.user.phone,
    },
    description: req.body.description,
    type: req.body.type,
    status: constantUtils.NEW,
  })
  if (!responseData) return sendResponse.requestError(res, 400, langJson.ERRORINADD)

  return sendResponse.successResponse(res, langJson.FEEDBACKADDEDSUCCESS, {})
})

// Get Token Page Data
controller.getTokenPageData = handler(async function (req, res) {
  if (req.user) {
    const settingsObject = await redis.read(constantUtils.GENERALSETTING)
    const responseData = {
      summary: {
        ...req.user.tokenDetails,
      },
      referrel: {
        inviteCode: req.user.uniqueCode,
        userReferred: req.user.referredCount,
        totalReferrelEarnings: req.user.tokenDetails.referelTokenCount,
      },
      dailystreak: {
        dayToClaim: settingsObject.data.dayToClaim,
        dailyRewards: req.user.dailyRewards,
      },
    }

    return sendResponse.successResponse(res, '', responseData)
  }
})

// Get Token Transaction List
controller.getTokenTansactionList = handler(async function (req, res) {
  const skip = req.body.skip ? parseInt(req.body.skip) : 0
  const limit = req.body.limit ? parseInt(req.body.limit) : 20

  const query = []
  if (req.body.filter && req.body.filter != '')
    query.push(
      req.body.filter === constantUtils.CREDIT
        ? { $match: { transType: req.body.filter, 'toUser.userId': req.user._id.toString() } }
        : { $match: { transType: req.body.filter, 'fromUser.userId': req.user._id.toString() } }
    )

  query.push({
    $facet: {
      all: [{ $count: 'all' }],
      response: [
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            _id: 1,
            amount: 1,
            fromUser: 1,
            toUser: 1,
            transType: 1,
            actionType: 1,
            createdAt: 1,
          },
        },
      ],
    },
  })
  const responseData = await Tokens.aggregate(query)
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

// Get Token Page Data
controller.claimDailyData = handler(async function (req, res) {
  if (req.user) {
    const settingsObject = await redis.read(constantUtils.GENERALSETTING)
    let updateValue = {}
    const dailyRewards = req.user.dailyRewards.map((e) => {
      if (e.currentDay === req.body.currentDay) {
        return {
          currentDay: e.currentDay,
          isClaimed: true,
        }
      } else
        return {
          currentDay: e.currentDay,
          isClaimed: e.isClaimed,
        }
    })
    if (!req.body.isReturn) {
      updateValue = {
        totalEarnCount: parseInt(req.user.tokenDetails.totalEarnCount) + parseInt(settingsObject.data.dailyTokenBonus),
        availableTokenCount:
          parseInt(req.user.tokenDetails.availableTokenCount) + parseInt(settingsObject.data.dailyTokenBonus),
        referelTokenCount: parseInt(req.user.tokenDetails.referelTokenCount),
        joiningBonusTokenCount: parseInt(req.user.tokenDetails.joiningBonusTokenCount),
        spentTokenCount: parseInt(req.user.tokenDetails.spentTokenCount),
        otherMediumToken: parseInt(req.user.tokenDetails.otherMediumToken),
      }
    } else {
      updateValue = {
        totalEarnCount: parseInt(req.user.tokenDetails.totalEarnCount) + parseInt(settingsObject.data.dailyTokenBonus),
        availableTokenCount:
          parseInt(req.user.tokenDetails.availableTokenCount) -
          parseInt(settingsObject.data.returnClaimTokenBonus) +
          parseInt(settingsObject.data.dailyTokenBonus),
        referelTokenCount: parseInt(req.user.tokenDetails.referelTokenCount),
        joiningBonusTokenCount: parseInt(req.user.tokenDetails.joiningBonusTokenCount),
        spentTokenCount:
          parseInt(req.user.tokenDetails.spentTokenCount) + parseInt(settingsObject.data.returnClaimTokenBonus),
        otherMediumToken: parseInt(req.user.tokenDetails.otherMediumToken),
      }
    }
    const updateData = await User.updateOne(
      { _id: new mongoose.Types.ObjectId(req.user._id) },
      {
        $set: {
          dailyRewards: dailyRewards,
          tokenDetails: updateValue,
          lastEditedTime: new Date(),
        },
      }
    )
    if (updateData && updateData.nModified === 0) {
      return sendResponse.requestError(res, 400, langJson.REFERREDUSERNOTEXISTS)
    } else {
      const tokenData = await Tokens.create({
        amount: settingsObject.data.dailyTokenBonus,
        fromUser: { userName: constantUtils.GAMERSBACK, userId: '' },
        toUser: { userName: req.user.userName, userId: req.user._id },
        transType: constantUtils.CREDIT,
        actionType: constantUtils.CLAIM,
      })
      if (!tokenData) return sendResponse.requestError(res, 400, langJson.ERRINTOKENTRANS)
      if (req.body.isReturn) {
        const tokenReturnData = await Tokens.create({
          amount: settingsObject.data.returnClaimTokenBonus,
          fromUser: { userName: req.user.userName, userId: req.user._id },
          toUser: { userName: constantUtils.GAMERSBACK, userId: '' },
          transType: constantUtils.DEBIT,
          actionType: constantUtils.CLAIM,
        })
        if (!tokenReturnData) return sendResponse.requestError(res, 400, langJson.ERRINTOKENRETURNTRANS)
      }
      return sendResponse.successResponse(res, langJson.TOKENCLAIMEDSUCCESS, {})
    }
  }
})

// Notification list
controller.getNotifications = handler(async function (req, res) {
  const skip = req.body.skip ? parseInt(req.body.skip) : 0
  const limit = req.body.limit ? parseInt(req.body.limit) : 20

  const query = [{ $match: { notificationType: constantUtils.ALL } }]
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

module.exports = controller
