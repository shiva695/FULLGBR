// Dependencies Import
const CryptoJS = require('crypto-js')
const handler = require('express-async-handler')
const bcrypt = require('bcrypt-nodejs')

// Models import
const Admin = require('../models/admin.models')
const Users = require('../models/user.models')

//Json import
const langJson = require(`../json/en.json`)

//Utils import
const sendResponse = require('../utils/response.utils')

const authUtil = {}

authUtil.generatePassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)

authUtil.comparePassword = (password, passwordb) => bcrypt.compareSync(password, passwordb)

authUtil.hashSecret = (password) => CryptoJS.enc.Hex.stringify(CryptoJS.SHA256(password))

const secret = authUtil.hashSecret('my-32-character-ultra-secure-and-ultra-long-secret')

authUtil.base64Encode = (rawString) => {
  const wordArray = CryptoJS.enc.Utf8.parse(rawString)
  return CryptoJS.enc.Base64.stringify(wordArray).replace('=', '').replace('=', '')
}

authUtil.jwtSign = (payload = {}) => {
  payload.createdAt = new Date().toISOString()
  const base64Payload = authUtil.base64Encode(JSON.stringify(payload))
  const base64Signature = authUtil.base64Encode(CryptoJS.HmacSHA256(base64Payload, secret))
  return authUtil.base64Encode(`${base64Signature}:${base64Payload}`)
}

authUtil.base64Decode = (base64String) => {
  try {
    const wordArray = CryptoJS.enc.Base64.parse(base64String)
    return CryptoJS.enc.Utf8.stringify(wordArray)
  } catch (error) {
    return false
  }
}

authUtil.decode = (_token) => {
  const token = authUtil.base64Decode(_token)
  if (!token) return false
  const [signature, payload] = token.split(':').filter((d) => d.length > 0)
  const base64Signature = authUtil.base64Encode(CryptoJS.HmacSHA256(payload, secret))

  if (signature === base64Signature) {
    const decoded = authUtil.base64Decode(payload)
    if (!decoded) return false
    const _payload = JSON.parse(decoded)
    return _payload
  } else return false
}

authUtil.decodeToken = (token) => {
  if (!token) return '401|Token Required'
  if (!token.includes('Bearer ') || token.split(' ').length === 1) return '401|Invalid Token'
  if (token.split(' ').length === 1) return '401|Invalid Token'
  token = token.split(' ')[1]
  const payload = authUtil.decode(token)
  if (payload) return payload
  return '401|Invalid Token'
}

authUtil.adminTokenVerify = handler(async (req, res, next) => {
  const _payload = authUtil.decodeToken(req.headers.authorization)
  if (!_payload._id) return sendResponse.unauthorizedResponse(res, langJson.UNAUTHORIZEDERROR)
  const adminData = await Admin.findOne({
    _id: _payload._id,
    'accessToken': req.headers.authorization.split(' ')[1],
  }).lean()
  if (!adminData) return sendResponse.unauthorizedResponse(res, langJson.UNAUTHORIZEDERROR)
  req.user = adminData
  next()
})

authUtil.userTokenVerify = handler(async (req, res, next) => {
  const _payload = authUtil.decodeToken(req.headers.authorization)
  if (!_payload._id) return sendResponse.unauthorizedResponse(res, langJson.UNAUTHORIZEDERROR)
  const userData = await Users.findOne({
    _id: _payload._id,
    'deviceInfo.accessToken': req.headers.authorization.split(' ')[1],
  }).lean()
  if (!userData) return sendResponse.unauthorizedResponse(res, langJson.UNAUTHORIZEDERROR)
  req.user = userData
  next()
})

module.exports = authUtil
