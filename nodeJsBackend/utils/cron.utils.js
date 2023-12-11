// Dependencies Import
const CronJob = require('cron').CronJob

// Utils Import
const redis = require('./redis.utils')
const constantUtils = require('./constant.utils')

// Models Import
const Helper = require('../models/helper.models')

// Functions to Call

const setDailyRewardsDayInSetting = async () => {
  const dayToClaim = new Date().getDay()
  const updateData = await Helper.updateOne(
    {
      'name': constantUtils.GENERALSETTING,
    },
    {
      $set: {
        'data.dayToClaim': parseInt(dayToClaim),
      },
    }
  )
  if (updateData && updateData.nModified !== 0) {
    const helperData = await Helper.findOne({
      name: constantUtils.GENERALSETTING,
    }).lean()
    await redis.write(constantUtils.GENERALSETTING, helperData)
    return
  }
}

const cronJob = async () => {
  const everyMinJob = new CronJob({
    cronTime: '* * * * *', //Every Min Cron
    onTick: async function () {
      // console.log('Cron is working')
    },
    start: false,
    // timeZone: 'America/Los_Angeles'
  })
  const everyDayJob = new CronJob({
    cronTime: '0 0 * * *', //Every Min Cron
    onTick: async function () {
      // console.log('Cron is working')
      await setDailyRewardsDayInSetting()
    },
    start: false,
    // timeZone: 'America/Los_Angeles'
  })
  everyMinJob.start()
  everyDayJob.start()
}

module.exports = cronJob
