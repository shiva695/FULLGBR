//Models Import
const helperModel = require('../models/helper.models')

//utils Import
const redis = require('./redis.utils')
const constantUtils = require('./constant.utils')

const utils = {}

utils.loadRedisData = async () => {
  // const ifConfig = await redis.read(constantUtils.GENERALSETTING)
  // if (ifConfig) return ifConfig
  const helperData = await helperModel
    .findOne({
      name: constantUtils.GENERALSETTING,
    })
    .lean()
  await redis.write(constantUtils.GENERALSETTING, helperData)
}

module.exports = utils
