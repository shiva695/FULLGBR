// Dependencies Import
const express = require('express')
const router = express.Router()

// Utils Import
const { validateBody } = require('../utils/validate.utils')
const { adminTokenVerify } = require('../utils/auth.utils')

// Controllers Import
const adminController = require('../controllers/admin.controller')
const adminValidation = require('../validation/admin.validation')

// Base Admin
router.post('/insertData', adminController.insertData) // to creating the main admin at inatial commit
router.post('/addGameData', adminController.addGameData) // to push all game list to the game data

// common
router.post('/login', validateBody(adminValidation.login), adminController.login)
router.post('/changePassword', validateBody(adminValidation.changePassword), adminController.changePassword)
router.post('/forgotPassword', validateBody(adminValidation.forgotPassword), adminController.forgotPassword)
router.post('/getProfileDetail', adminTokenVerify, adminController.getProfileDetail)
router.post('/updateProfile', adminTokenVerify, validateBody(adminValidation.updateProfile), adminController.updateProfile)
router.post('/changeProfilePassword', adminTokenVerify, validateBody(adminValidation.changeProfilePassword), adminController.changeProfilePassword)

// Settings
router.post('/getConfigData', adminController.getConfigData)
router.post('/getGeneralSettings', adminTokenVerify, adminController.getGeneralSettings)
router.post('/editGeneralSettings', adminTokenVerify, validateBody(adminValidation.editGeneralSettings), adminController.editGeneralSettings)

// Admin
router.post('/getAdminsList', adminTokenVerify, validateBody(adminValidation.getAdminsList), adminController.getAdminsList)
router.post('/addAdmin/:type', adminTokenVerify, validateBody(adminValidation.addAdmin), adminController.addAdmin)
router.post('/getAdminDetail', adminTokenVerify, validateBody(adminValidation.getSingleDetail), adminController.getAdminDetail)
router.post('/changeStatusAdmin', adminTokenVerify, validateBody(adminValidation.statusChange), adminController.changeStatusAdmin)
router.post('/deleteAdmin', adminTokenVerify, validateBody(adminValidation.delete), adminController.deleteAdmin)

// Roles
router.post('/getRolesList', adminTokenVerify, validateBody(adminValidation.getRolesList), adminController.getRolesList)
router.post('/roles/:type', adminTokenVerify, validateBody(adminValidation.addAndEditRoles), adminController.addAndEditRoles)
router.post('/getRolesDetail', adminTokenVerify, validateBody(adminValidation.getSingleDetail), adminController.getRolesDetail)
router.post('/changeStatusRoles', adminTokenVerify, validateBody(adminValidation.statusChange), adminController.changeStatusRoles)
router.post('/deleteRoles', adminTokenVerify, validateBody(adminValidation.delete), adminController.deleteRoles)
router.post('/getActiveRoles', adminTokenVerify, adminController.getActiveRoles)

// User
router.post('/getUsersList', adminTokenVerify, validateBody(adminValidation.getUsersList), adminController.getUsersList)
router.post('/user/:type', adminTokenVerify, validateBody(adminValidation.addAndEditUsers), adminController.addAndEditUsers)
router.post('/getUserDetail', adminTokenVerify, validateBody(adminValidation.getSingleDetail), adminController.getUserDetail)
router.post('/changeStatusUser', adminTokenVerify, validateBody(adminValidation.statusChange), adminController.changeStatusUser)
router.post('/deleteUser', adminTokenVerify, validateBody(adminValidation.delete), adminController.deleteUser)

// Report
router.post('/getReportDetail', adminTokenVerify, validateBody(adminValidation.getSingleDetail), adminController.getReportDetail)
router.post('/changeStatusReport', adminTokenVerify, validateBody(adminValidation.statusReportChange), adminController.changeStatusReport)
router.post('/resolveReport', adminTokenVerify, validateBody(adminValidation.delete), adminController.resolveReport)
router.post('/getReportList', adminTokenVerify, validateBody(adminValidation.getReportList), adminController.getReportList)

// Notification Templates
router.post('/getTemplatesList', adminTokenVerify, validateBody(adminValidation.getTemplatesList), adminController.getTemplatesList)
router.post('/template/:type', adminTokenVerify, validateBody(adminValidation.addAndEditTemplate), adminController.addAndEditTemplate)
router.post('/getTemplateDetail', adminTokenVerify, validateBody(adminValidation.getSingleDetail), adminController.getTemplateDetail)
router.post('/changeStatusTemplate', adminTokenVerify, validateBody(adminValidation.statusChange), adminController.changeStatusTemplate)
router.post('/deleteTemplate', adminTokenVerify, validateBody(adminValidation.delete), adminController.deleteTemplate)
router.post('/getTemplates/:type', adminTokenVerify, validateBody(adminValidation.getList), adminController.getTemplatesBasedOnType)

// Notification
router.post('/sendNotifictaion/:notificationType', adminTokenVerify, validateBody(adminValidation.sendNotifictaion), adminController.sendNotifictaion)
router.post('/getNotificationList', adminTokenVerify, validateBody(adminValidation.getNotificationList), adminController.getNotificationList)

// Gamepedia
// router.post('/sendNotifictaion/:notificationType', adminTokenVerify, validateBody(adminValidation.sendNotifictaion), adminController.sendNotifictaion)
router.post('/getGamepediaList', adminTokenVerify, validateBody(adminValidation.getGamepediaList), adminController.getGamepediaList)

module.exports = router
