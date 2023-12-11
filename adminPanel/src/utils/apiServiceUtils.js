//import dependencies
import axios from "axios";

//import files
import constants from "../json/constants.json";

export const invokeApi = async (url, params, cookies) => {
  try {
    let headers = {
      "Content-Type": "application/json",
    };
    if (cookies[constants.ADMINDATA]) {
      headers.authorization =
        "Bearer " + cookies[constants.ADMINDATA].accessToken;
    }
    const response = await axios.post(url, params, { headers: headers });
    console.log("response: ", response);
    // const encryptedData = await helperUtils.dataDcryption(response.data);
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
  adminLogin: "/admin/login",
  forgotPassword: "/admin/forgotPassword",
  changePassword: "/admin/changePassword",
  addAdmin: "/admin/addAdmin",
  editAdmin: "/admin/editAdmin",
  singleImage: "/upload/singleImage",
  getAdminsList: "/admin/getAdminsList",
  changeStatusAdmin: "/admin/changeStatusAdmin",
  archiveAdmin: "/admin/archiveAdmin",
  getAdminDetail: "/admin/getAdminDetail",
};
