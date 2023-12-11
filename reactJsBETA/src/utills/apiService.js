// @import dependencies
import axios from "axios";

// @import Constants
import cookieConstants from "../constants/cookieConstants";

export const invokeApi = async (url, params, cookies) => {
  try {
    let headers = {
      "Content-Type": "application/json",
    };

    if (
      cookies &&
      cookies[cookieConstants.DEVICECOOKIE]?.deviceId &&
      cookies[cookieConstants.DEVICECOOKIE]?.deviceType &&
      cookies[cookieConstants.DEVICECOOKIE]?.ipAddress &&
      cookies[cookieConstants.DEVICECOOKIE]?.platform
    ) {
      headers.deviceId = cookies[cookieConstants.DEVICECOOKIE]?.deviceId;
      headers.ip = cookies[cookieConstants.DEVICECOOKIE]?.ipAddress;
      headers.deviceType = cookies[cookieConstants.DEVICECOOKIE]?.deviceType;
      headers.platform = cookies[cookieConstants.DEVICECOOKIE]?.platform;
    }

    // filtering device id and take access token
    if (!!cookies && !!cookies[cookieConstants.USERCOOKIES]) {
      // let cookieDeviceInfo = cookies[
      //   cookieConstants.USERCOOKIES
      // ].deviceInfo.filter(
      //   (el) =>
      //     el.deviceId === cookies[cookieConstants.DEVICECOOKIE]?.deviceId
      // );
      // if (cookieDeviceInfo.length > 0) {
      headers.Authorization = `Bearer ${cookies[cookieConstants.USERCOOKIES]}`;
      // }
    }

    const response = await axios.post(url, params, { headers: headers });
    return response.data;
  } catch ({ response }) {
    return response.data;
  }
};

export const invokeFormDataApi = async (url, formData) => {
  try {
    let headers = {
      "Content-Type": "multipart/form-data",
    };
    let response = await axios.post(url, formData, { headers: headers });
    return response.data;
  } catch ({ response }) {
    return response.data;
  }
};

export const apiList = {
  login: "/user/login",
  logout: "/user/logout",
  signUp: "/user/signUp",
  sendOtp: "/user/sendOtp",
  verifyEmail: "/user/verifyEmail",
  singleImage: "/upload/singleImage",
  getSearchList: "/user/getSearchList",
  checkUsername: "/user/checkUsername",
  getConfigData: "/admin/getConfigData",
  getSuggestUser: "/user/getSuggestUser",
  changePassword: "/user/changePassword",
  getGamepediaData: "/user/getGamepediaData",
  updateGameComments: "/user/updateGameComments",
  getHistoryGamelist: "/user/getHistoryGamelist",
  getRecentSearchList: "/user/getRecentSearchList",
  getGamepediaHomeData: "/user/getGamepediaHomeData",
  updateRecentSearchList: "/user/updateRecentSearchList",
  getTopSearchGamepediaList: "/user/getTopSearchGamepediaList",
};
