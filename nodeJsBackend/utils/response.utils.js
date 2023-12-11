const responseUtils = {}

//Utils Import
const helperUtil = require('./helper.utils')

//JSON import
const langJson = require(`../json/en.json`)

responseUtils.successResponse = async function (res, msg, data) {
  const responseJson = {
    customcode: 200,
    message: msg,
    status: langJson.SUCCESS,
    data: data,
  }
  const encrypeData = await helperUtil.dataEncryption(responseJson)
  return res.status(200).json(responseJson)
}

responseUtils.successListResponse = async function (res, skip, limit, msg, total, data) {
  const responseJson = {
    customcode: 200,
    message: msg,
    status: langJson.SUCCESS,
    skip: skip,
    limit: limit,
    total: total,
    data: data,
  }
  const encrypeData = await helperUtil.dataEncryption(responseJson)
  return res.status(200).json(responseJson)
}

responseUtils.unauthorizedResponse = async function (res) {
  const responseJson = {
    customcode: 201,
    message: langJson.UNAUTHORIZEDERROR,
    status: langJson.FAIL,
  }
  const encrypeData = await helperUtil.dataEncryption(responseJson)
  return res.status(401).json(responseJson)
}

responseUtils.serverErrorResponse = async function (res) {
  const responseJson = {
    customcode: 500,
    message: langJson.SOMETHINGWENTWRONG,
    status: langJson.FAIL,
  }
  const encrypeData = await helperUtil.dataEncryption(responseJson)
  return res.status(500).json(responseJson)
}

responseUtils.requestError = async function (res, code, msg) {
  const responseJson = {
    customcode: code,
    message: msg,
    status: langJson.FAIL,
  }
  const encrypeData = await helperUtil.dataEncryption(responseJson)
  return res.status(400).json(responseJson)
}

responseUtils.validationError = async function (res, msg) {
  const responseJson = {
    customcode: 205,
    message: msg,
    status: langJson.FAIL,
  }
  const encrypeData = await helperUtil.dataEncryption(responseJson)
  return res.status(422).json(responseJson)
}

responseUtils.userExistResponse = async function (res) {
  const responseJson = {
    customcode: 201,
    message: langJson.USERDOESNOTEXIST,
    status: langJson.FAIL,
  }
  const encrypeData = await helperUtil.dataEncryption(responseJson)
  return res.status(201).json(responseJson)
}

responseUtils.dataNotAvailResponse = async function (res) {
  const responseJson = {
    customcode: 210,
    message: langJson.NODATAAVAILABLE,
    status: langJson.FAIL,
  }
  const encrypeData = await helperUtil.dataEncryption(responseJson)
  return res.status(210).json(responseJson)
}

responseUtils.duplicationDataResponse = async function (res) {
  const responseJson = {
    customcode: 211,
    message: langJson.DATAALREADYEXISTS,
    status: langJson.FAIL,
  }
  const encrypeData = await helperUtil.dataEncryption(responseJson)
  return res.status(210).json(responseJson)
}

// responseUtils.InvalidUsernameResponse = function (res) {
//   const responseJson = {
//     customcode: 202,
//     message: langJson.INVALIDUSERNAMEANDPASSWORD,
//   }
//   return res.status(202).json(responseJson)
// }

// responseUtils.inactiveAccountResponse = function (res) {
//   const responseJson = {
//     customcode: 203,
//     message: langJson.YOURACCOUNTISNOTACTIVE,
//   }
//   return res.status(203).json(responseJson)
// }

// responseUtils.profileResponse = function (res) {
//   const responseJson = {
//     customcode: 203,
//     message: langJson.YOURACCOUNTISNOTACTIVE,
//   }
//   return res.status(203).json(responseJson)
// }

module.exports = responseUtils
