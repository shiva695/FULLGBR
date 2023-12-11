// Utils Import
const sendResponse = require('../utils/response.utils')
const logger = require('../utils/logger.utils')

const validateUtil = {}

validateUtil.validateBody = (schema) => async (req, res, next) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  }
  const { error, value } = schema.validate(req.body, options)
  if (error) {
    logger.error(
      JSON.stringify(
        res,
        error.details.map((each) => each.message),
        null,
        2
      )
    )
    await sendResponse.validationError(
      res,
      error.details.map((each) => each.message)
    )
  } else {
    req.body = value
    next()
  }
}

module.exports = validateUtil
