const utils = {}

utils.adminProfileObject = async (data) => {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    gender: data.gender,
    phone: data.phone,
    avatar: data.avatar,
    privileges: data.privileges,
    accessToken: data.accessToken,
    lastLogin: data.lastLogin,
  }
}

utils.userProfileObject = async (data) => {
  return {
    userName: data.userName,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    gender: data.gender,
    dob: data.dob,
    phone: data.phone,
    avatar: data.avatar,
    profilePic: data.profilePic,
    linkedGames: data.linkedGames,
    deviceInfo: data.deviceInfo,
    lastLogin: data.lastLogin,
  }
}

utils.settingsObject = async (data) => {
  return {
    _id: data._id,
    siteTitle: data.data.siteTitle,
    siteUrl: data.data.siteUrl,
    siteAddress: data.data.siteAddress,
    siteEmail: data.data.siteEmail,
    siteCareerEmail: data.data.siteCareerEmail,
    siteStatus: data.data.siteStatus,
    lightLogo: data.data.lightLogo,
    darkLogo: data.data.darkLogo,
    favicon: data.data.favicon,
    mobileLogo: data.data.mobileLogo,
    emergencyNumber: data.data.emergencyNumber,
    userMinAge: data.data.userMinAge,
    cronTimeZone: data.data.cronTimeZone,
    maxUserLoginCount: data.data.maxUserLoginCount,
    joiningTokenBonus: data.data.joiningTokenBonus,
    referrelTokenBonus: data.data.referrelTokenBonus,
    dailyTokenBonus: data.data.dailyTokenBonus,
    returnClaimTokenBonus: data.data.returnClaimTokenBonus,
    dayToClaim: data.data.dayToClaim,
    companyLocation: data.data.companyLocation,
    companyPhone: data.data.companyPhone,
    tableLimitSize: data.data.tableLimitSize,
    spaces: data.data.spaces,
    fcm: data.data.fcm,
    sms: data.data.sms,
    smtp: data.data.smtp,
    google: data.data.google,
    facebook: data.data.facebook,
    appVersion: data.data.appVersion,
    redirectUrls: data.data.redirectUrls,
    socailUrls: data.data.socailUrls,
  }
}

utils.configObject = async (data) => {
  return {
    _id: data._id,
    siteTitle: data.data.siteTitle,
    siteUrl: data.data.siteUrl,
    siteAddress: data.data.siteAddress,
    siteEmail: data.data.siteEmail,
    siteCareerEmail: data.data.siteCareerEmail,
    siteStatus: data.data.siteStatus,
    lightLogo: data.data.lightLogo,
    darkLogo: data.data.darkLogo,
    favicon: data.data.favicon,
    mobileLogo: data.data.mobileLogo,
    userMinAge: data.data.userMinAge,
    cronTimeZone: data.data.cronTimeZone,
    maxUserLoginCount: data.data.maxUserLoginCount,
    joiningTokenBonus: data.data.joiningTokenBonus,
    referrelTokenBonus: data.data.referrelTokenBonus,
    dailyTokenBonus: data.data.dailyTokenBonus,
    returnClaimTokenBonus: data.data.returnClaimTokenBonus,
    dayToClaim: data.data.dayToClaim,
    companyLocation: data.data.companyLocation,
    companyPhone: data.data.companyPhone,
    tableLimitSize: data.data.tableLimitSize,
    redirectUrls: data.data.redirectUrls,
    socailUrls: data.data.socailUrls,
  }
}

module.exports = utils
