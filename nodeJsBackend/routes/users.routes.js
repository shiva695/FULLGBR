// Dependencies Import
const express = require('express')
const upload = require('multer')()
const router = express.Router()

//Utils Import
const { validateBody } = require('../utils/validate.utils')
const { userTokenVerify } = require('../utils/auth.utils')

//controllers Import
const commonController = require('../controllers/common.controller')
const userController = require('../controllers/user.controller')

// Validation Import
const userValidation = require('../validation/user.validation')

// common
router.post('/singleImageUpload', upload.single('image'), commonController.singleImageUpload)
router.post('/multipleImagesUpload', upload.array('images', 20), commonController.multipleImagesUpload)

// Login and Signup
router.post('/login', validateBody(userValidation.login), userController.login)
router.post('/confirmUser', validateBody(userValidation.confirmUser), userController.confirmUser)
router.post('/verifyUser', validateBody(userValidation.verifyUser), userController.verifyUser)
router.post('/sendOtp', validateBody(userValidation.sendOtp), userController.sendOtp)
router.post('/changePassword', validateBody(userValidation.changePassword), userController.changePassword)
router.post('/signUp', validateBody(userValidation.signUp), userController.signUp)
router.post('/logout', userTokenVerify, userController.logout)

// Settings
router.post('/settings/editGeneralInfo', userTokenVerify, validateBody(userValidation.editGeneralInfo), userController.editGeneralInfo)
router.post('/settings/editUserPassword', userTokenVerify, validateBody(userValidation.editUserPassword), userController.editUserPassword)
router.post('/settings/editProfileAndAvatar', userTokenVerify, validateBody(userValidation.editProfileAndAvatar), userController.editProfileAndAvatar)

// Games
router.post('/getGamesList', validateBody(userValidation.getGamesList), userController.getGamesList)
router.post('/getGameDetail', userTokenVerify, validateBody(userValidation.getSingleDetail), userController.getGameDetail)

// Feedback
router.post('/sendFeedback', userTokenVerify, validateBody(userValidation.sendFeedback), userController.sendFeedback)

// Notification
router.post('/getNotifications', userTokenVerify, validateBody(userValidation.getNotifications), userController.getNotifications)

// Token
router.post('/getTokenPageData', userTokenVerify, userController.getTokenPageData)
router.post('/getTokenTansactionList', userTokenVerify, validateBody(userValidation.getTokenTansactionList), userController.getTokenTansactionList)
router.post('/claimDailyData', userTokenVerify, validateBody(userValidation.claimDailyData), userController.claimDailyData)

module.exports = router
