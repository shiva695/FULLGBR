// Modules import
const handler = require('express-async-handler')

// Json import
const langJson = require(`../json/en.json`)

// Utils import
const sendResponse = require('../utils/response.utils')
const spaceUtils = require('../utils/space.utils')

const controller = {}

controller.singleImageUpload = handler(async function (req, res) {
  if (req.body.oldImage) await spaceUtils.delete(req.body.oldImage)
  const imageUrl = await spaceUtils.uploadSingle(req.file)
  if (imageUrl) {
    return sendResponse.successResponse(res, langJson.IMAGEUPLOADEDSUCCESSFULLY, { imageUrl: imageUrl })
  } else {
    return sendResponse.requestError(res, 500, langJson.SOMETHINGWENTWRONG)
  }
})

controller.multipleImagesUpload = handler(async function (req, res) {
  const images = await spaceUtils.uploadMulti(req.files)
  if (images && images.length > 0) {
    return sendResponse.successResponse(res, langJson.IMAGESUPLOADEDSUCCESSFULLY, { images: images })
  } else {
    return sendResponse.requestError(res, 500, langJson.SOMETHINGWENTWRONG)
  }
})

module.exports = controller
