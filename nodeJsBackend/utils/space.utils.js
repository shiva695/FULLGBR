/* eslint-disable no-async-promise-executor */
// Dependencies Import
const aws = require('aws-sdk')

// utils Import
const constantUtils = require('./constant.utils')
const redis = require('./redis.utils')
const helperUtil = require('./helper.utils')
const logger = require('./logger.utils')

// Json Import
const langJson = require('../json/en.json')

const utils = {}

utils.delete = (fileName) => {
  return new Promise(async (resolve) => {
    const config = await redis.read(constantUtils.GENERALSETTING)
    const spaces = config?.data?.spaces || null
    if (
      spaces &&
      spaces.spacesKey &&
      spaces.spacesSecret &&
      spaces.spacesEndpoint &&
      spaces.spacesBucketName &&
      spaces.spacesBaseUrl &&
      spaces.spacesObjectName
    ) {
      if (fileName.includes(spaces.spacesBaseUrl + '/' + spaces.spacesObjectName)) {
        fileName = fileName.replace(spaces.spacesBaseUrl + '/' + spaces.spacesObjectName + '/', '')
        const spacesKey = spaces.spacesKey
        const spacesSecret = spaces.spacesSecret
        const spacesEndpoint = new aws.Endpoint(spaces.spacesEndpoint)

        const s3 = new aws.S3({
          endpoint: spacesEndpoint,
          accessKeyId: spacesKey,
          secretAccessKey: spacesSecret,
        })

        const params = {
          Bucket: spaces.spacesBucketName,
          Key: spaces.spacesObjectName + '/' + fileName,
        }
        s3.deleteObject(params, function (err) {
          if (err) {
            logger.error(err, err.stack)
            resolve(err)
          } else {
            resolve(spaces.spacesBaseUrl + '/' + spaces.spacesObjectName + '/' + fileName)
          }
        })
      } else {
        resolve('')
      }
    } else {
      logger.error(langJson.SPACEKEYMISSING)
      resolve('')
    }
  })
}

utils.deleteMulti = (filenames) => {
  return new Promise(async (resolve) => {
    const config = await redis.read(constantUtils.GENERALSETTING)
    const spaces = config?.data?.spaces || null
    if (
      spaces &&
      spaces.spacesKey &&
      spaces.spacesSecret &&
      spaces.spacesEndpoint &&
      spaces.spacesBucketName &&
      spaces.spacesBaseUrl &&
      spaces.spacesObjectName
    ) {
      await filenames.map((fileName) => {
        if (fileName.includes(spaces.spacesBaseUrl + '/' + spaces.spacesObjectName)) {
          fileName = fileName.replace(spaces.spacesBaseUrl + '/' + spaces.spacesObjectName + '/', '')
          const spacesKey = spaces.spacesKey
          const spacesSecret = spaces.spacesSecret
          const spacesEndpoint = new aws.Endpoint(spaces.spacesEndpoint)

          const s3 = new aws.S3({
            endpoint: spacesEndpoint,
            accessKeyId: spacesKey,
            secretAccessKey: spacesSecret,
          })

          const params = {
            Bucket: spaces.spacesBucketName,
            Key: spaces.spacesObjectName + '/' + fileName,
          }
          s3.deleteObject(params, function (err) {
            if (err) {
              logger.error(err, err.stack)
              resolve(err)
            } else {
              return
            }
          })
        } else {
          resolve('')
        }
      })
      resolve('done')
    } else {
      logger.error(langJson.SPACEKEYMISSING)
      resolve('')
    }
  })
}

utils.uploadSingle = (file) => {
  return new Promise(async (resolve) => {
    if (file) {
      const config = await redis.read(constantUtils.GENERALSETTING)
      const spaces = config?.data?.spaces || null
      if (
        spaces &&
        spaces.spacesKey &&
        spaces.spacesSecret &&
        spaces.spacesEndpoint &&
        spaces.spacesBucketName &&
        spaces.spacesBaseUrl &&
        spaces.spacesObjectName
      ) {
        const spacesKey = spaces.spacesKey
        const spacesSecret = spaces.spacesSecret
        const spacesEndpoint = new aws.Endpoint(spaces.spacesEndpoint)

        const s3 = new aws.S3({
          endpoint: spacesEndpoint,
          accessKeyId: spacesKey,
          secretAccessKey: spacesSecret,
        })

        const fileName = `${constantUtils.GAMERSBACK}.${await helperUtil.randomString({
          length: 12,
          type: '# A a',
        })}.jpg`

        const objectParams = {
          ACL: 'public-read',
          Bucket: spaces.spacesBucketName,
          Key: spaces.spacesObjectName + '/' + fileName,
          Body: file.buffer,
        }

        s3.putObject(objectParams, function (err) {
          if (err) {
            logger.error(err, err.stack)
            resolve('')
          } else {
            resolve(spaces.spacesBaseUrl + '/' + spaces.spacesObjectName + '/' + fileName)
          }
        })
      } else {
        logger.error(langJson.SPACEKEYMISSING)
        resolve('')
      }
    } else {
      logger.error(langJson.FILEMISSING)
      resolve('')
    }
  })
}

utils.uploadMulti = (files) => {
  return new Promise(async (resolve) => {
    if (files && files.length > 0) {
      const config = await redis.read(constantUtils.GENERALSETTING)
      const spaces = config?.data?.spaces || null
      if (
        spaces &&
        spaces.spacesKey &&
        spaces.spacesSecret &&
        spaces.spacesEndpoint &&
        spaces.spacesBucketName &&
        spaces.spacesBaseUrl &&
        spaces.spacesObjectName
      ) {
        const spacesKey = spaces.spacesKey
        const spacesSecret = spaces.spacesSecret
        const spacesEndpoint = new aws.Endpoint(spaces.spacesEndpoint)

        const s3 = new aws.S3({
          endpoint: spacesEndpoint,
          accessKeyId: spacesKey,
          secretAccessKey: spacesSecret,
        })

        const imageArray = []
        await files.map(async (file) => {
          const fileName = `${constantUtils.GAMERSBACK}.${await helperUtil.randomString({
            length: 12,
            type: '# A a',
          })}.jpg`

          const objectParams = {
            ACL: 'public-read',
            Bucket: spaces.spacesBucketName,
            Key: spaces.spacesObjectName + '/' + fileName,
            Body: file.buffer,
          }
          imageArray.push({ imageUrl: spaces.spacesBaseUrl + '/' + spaces.spacesObjectName + '/' + fileName })
          s3.putObject(objectParams)
        })
        resolve(imageArray)
      } else {
        logger.error(langJson.SPACEKEYMISSING)
        resolve('')
      }
    } else {
      logger.error(langJson.FILEMISSING)
      resolve('')
    }
  })
}

module.exports = utils
