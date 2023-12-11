//import dependencies
import axios from "axios";

//import utils
// import helperUtils from "./helperUtils";

//import files
import constants from "../json/constants.json";

export const invokeApi = async (url, params, cookies) => {
  try {
    let authKey = "";
    if (cookies[constants.ADMINDATA]) {
      const authData = cookies[constants.ADMINDATA];
      authKey = "Bearer " + authData.accessToken;
    }
    let headers = {
      "Content-Type": "application/json",
      authorization: authKey,
    };
    const response = await axios.post(url, params, { headers: headers });
    // const encryptedData = await helperUtils.dataDcryption(response.data);
    return response.data;
  } catch ({ response }) {
    return response.data;
  }
};

export const invokeFormDataApi = async (url, formData, cookies) => {
  try {
    let authKey = "";
    if (cookies[constants.ADMINDATA]) {
      const authData = cookies[constants.ADMINDATA];
      authKey = "Bearer " + authData.accessToken;
    }
    let headers = {
      "Content-Type": "multipart/form-data",
      authorization: authKey,
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
  uploadSingleImage: "/user/singleImageUpload",
  getGeneralSettings: "/admin/getGeneralSettings",
  editGeneralSettings: "/admin/editGeneralSettings",
  changeProfilePassword: "/admin/changeProfilePassword",
  getProfileDetail: "/admin/getProfileDetail",
  updateProfile: "/admin/updateProfile",
  getConfigData: "/admin/getConfigData",
  verifyUser: "/admin/getProfileDetail",
  getUsersList: "/admin/getUsersList",
  deleteUser: "/admin/deleteUser",
  changeStatusUser: "/admin/changeStatusUser",
  getFeedbackList: "/admin/getReportList",
  getRolesList: "/admin/getRolesList",
  changeStatusRole: "/admin/changeStatusRole",
  deleteRole: "/admin/deleteRole",
  changeStatusTemplate: "/admin/changeStatusTemplate",
  getTemplatesList: "/admin/getTemplatesList",
  deleteRoles: "/admin/deleteRoles",
  deleteTemplate: "/admin/deleteTemplate",
  templatesAdd: "/admin/template/add",
  templatesEdit: "/admin/template/edit",
  getTemplateDetail: "/admin/getTemplateDetail",
  getFeedbackDetail: "/admin/getFeedbackDetail",
  changeStatusFeedback: "/admin/changeStatusFeedback",
  userAdd: "/admin/user/add",
  userEdit: "/admin/user/edit",
  getUserDetail: "/admin/getUserDetail",
  changeStatusRoles: "/admin/changeStatusRoles",
  rolesAdd: "/admin/roles/add",
  getRolesDetail: "/admin/getRolesDetail",
  rolesEdit: "/admin/roles/edit",
  getManagersList: "/admin/getAdminsList",
  deleteManagers: "/admin/deleteAdmin",
  changeStatusManagers: "/admin/changeStatusAdmin",
  managersAdd: "/admin/addAdmin/add",
  managersEdit: "/admin/addAdmin/edit",
  getManagersDetail: "/admin/getAdminDetail",
  getActiveRoles: "/admin/getActiveRoles",
  getTemplates: "/admin/getTemplates/",
};
