import axios from "axios";
import { decryptData } from "../components/common/decrypt";
import { config } from "../config/config";

export const invokeApi = async (url, params, cookies) => {
  try {
    let headers = {
      "Content-Type": "application/json",
    };

    if (
      cookies &&
      cookies[config.deviceCookie]?.deviceId &&
      cookies[config.deviceCookie]?.deviceType &&
      cookies[config.deviceCookie]?.ipAddress &&
      cookies[config.deviceCookie]?.platform
    ) {
      headers.deviceId = cookies[config.deviceCookie]?.deviceId;
      headers.ip = cookies[config.deviceCookie]?.ipAddress;
      headers.deviceType = cookies[config.deviceCookie]?.deviceType;
      headers.platform = cookies[config.deviceCookie]?.platform;
    }

    // filtering device id and take access token
    if (
      !!cookies &&
      !!cookies[config.cookieName] &&
      !!cookies[config.cookieName]?.userData
    ) {
      let deviceId = localStorage.getItem("deviceId");
      let cookieDeviceInfo = cookies[
        config.cookieName
      ].userData?.deviceInfo.filter((el) => el.deviceId === deviceId);
      headers.Authorization = `Bearer ${cookieDeviceInfo[0].accessToken}`;
    }

    const response = await axios.post(url, params, { headers: headers });
    // const resp = decryptData(response.data);
    // console.log("API RESPONSE:: ", JSON.parse(resp));
    return response.data;
  } catch ({ response }) {
    return response;
  }
};

export const invokeFormDataApi = async (url, formData, cookies) => {
  try {
    let headers = {
      "Content-Type": "multipart/form-data",
    };
    let response = await axios.post(url, formData, { headers: headers });
    // const resp = decryptData(response.data);
    // console.log("API RESPONSE:: ", JSON.parse(resp));
    return response.data;
  } catch ({ response }) {
    return response;
  }
};

export const apiList = {
  userLogin: "/user/login",
  userLogout: "/user/logout",
  verifyUser: "/user/verifyUser",
  sendOtp: "/user/sendOtp",
  changePassword: "/user/changePassword",
  confirmUser: "/user/confirmUser",
  signUp: "/user/signUp",
  singleImageUpload: "/user/singleImageUpload",
  getGamesList: "/user/getGamesList",
  getGameDetail: "/user/getGameDetail",
  sendFeedback: "/user/sendFeedback",
  editUserPassword: "/user/settings/editUserPassword",
  editGeneralInfo: "/user/settings/editGeneralInfo",
  editProfileAndAvatar: "/user/settings/editProfileAndAvatar",
  getTokenPageData: "/user/getTokenPageData",
  getTokenTansactionList: "/user/getTokenTansactionList",
  claimDailyData: "/user/claimDailyData",
  getNotifications: "/user/getNotifications",
};
