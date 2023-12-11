const fs = require('fs')
const path = require('path')
const base64ToImage = require('base64-to-image')

const uploadUtil = {}

uploadUtil.uploadBase64 = (base64, fileName) => {
  const imagePath = path.join(__dirname, '../', 'static', 'images/')
  const imageInfo = base64ToImage(base64, imagePath, {
    'fileName': fileName,
    'type': 'jpg',
  })
  return `/images/${imageInfo.fileName}`
}

uploadUtil.uploadMultipleImages = (files, fileName) => {
  return files.map((file, index) => {
    const buffer = fs.readFileSync(file.path)
    const _fileName = `${file.fieldName.toLowerCase().split(' ').join('')}.[${index}].${fileName
      .toLowerCase()
      .split(' ')
      .join('')}.jpg`
    const imagePath = path.join(__dirname, '../', 'static', 'images', _fileName)
    fs.writeFileSync(imagePath, buffer)
    return `/images/${_fileName}`
  })
}

uploadUtil.uploadSingleImage = (files, fileName) => {
  const buffer = fs.readFileSync(files[0].path)
  const _fileName = `${files[0].fieldName.toLowerCase().split(' ').join('')}.${fileName
    .toLowerCase()
    .split(' ')
    .join('')}.jpg`
  const imagePath = path.join(__dirname, '../', 'static', 'images', _fileName)
  fs.writeFileSync(imagePath, buffer)
  return `/images/${_fileName}`
}

uploadUtil.uploadSecurityFile = (files, fileName) => {
  const buffer = fs.readFileSync(files[0].path)
  const uploadName = files[0].originalFilename.split('.')
  const extension = `.${uploadName[uploadName.length - 1]}`
  const _fileName = `${fileName.toLowerCase().split(' ').join('')}${extension}`
  const imagePath = path.join(__dirname, '../', 'static', 'images', _fileName)
  fs.writeFileSync(imagePath, buffer)
  return `/images/${_fileName}`
}

module.exports = uploadUtil
