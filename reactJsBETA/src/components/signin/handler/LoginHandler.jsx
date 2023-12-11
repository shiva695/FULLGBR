// @import Dependencies
import { toast } from "react-toastify";

// @import Utils
import { config } from "../../../utills/configUtils";
import { invokeApi } from "../../../utills/apiService";

//@import Constants
import apiConstants from "../../../constants/apiConstants";
import cookieConstants from "../../../constants/cookieConstants";
import routeConstants from "../../../constants/routeConstants";
import generalConstants from "../../../constants/generalConstants";

const passwordPattern = generalConstants.PASSWORDPATTERN;
const emailPattern = generalConstants.EMAILPATTERN;

// userLoginandler
export const userLoginHandler = async (
  ev,
  email,
  password,
  cookies,
  navigate,
  setCookie
) => {
  ev.preventDefault();
  let params = {
    accountType: "NORMAL",
    userName: email,
    password: password,
  };
  const response = await invokeApi(
    config.baseUrl + apiConstants.login,
    params,
    cookies
  );
  if (response.customcode === 200) {
    toast.success(response.message);
    if (cookies && cookies[cookieConstants.DEVICECOOKIE]?.deviceId) {
      let cookieDeviceInfo = response.data.deviceInfo.filter(
        (el) => el.deviceId === cookies[cookieConstants.DEVICECOOKIE]?.deviceId
      );
      if (cookieDeviceInfo.length > 0) {
        setCookie(
          cookieConstants.USERCOOKIES,
          JSON.stringify(cookieDeviceInfo[0].accessToken),
          {
            path: "/",
            maxAge: 3000000,
            sameSite: "strict",
          }
        );
      }
    }
    navigate("/");
  } else {
    toast.error(response.message);
  }
};

// User forgot password
export const forgotPasswordHandler = async (
  ev,
  email,
  resetFormChangeHandler,
  navigate
) => {
  ev.preventDefault();
  if (!emailPattern.test(email)) {
    resetFormChangeHandler(
      "emailError",
      "Couldn’t find your Gamersback account."
    );
    return;
  } else resetFormChangeHandler("emailError", "");

  if (emailPattern.test(email)) {
    let params = {
      accountType: "NORMAL",
      email: email,
    };
    const response = await invokeApi(
      config.baseUrl + apiConstants.sendOtp,
      params
    );
    if (response.customcode === 200) {
      localStorage.setItem("OTP", window.btoa(response.data.code));
      localStorage.setItem("EMAIL", window.btoa(email));
      toast.success(response.message);
      navigate("/sendotp", { state: { email } });
    } else {
      toast.error(response.message);
    }
  } else
    toast.error(
      "Your credentials are incorrect, try again with vaild credentials"
    );
};

// User reset handler
export const resetPasswordHandler = async (
  ev,
  newPassword,
  navigate,
  newPasswordChangeHandler
) => {
  ev.preventDefault();
  if (!passwordPattern.test(newPassword)) {
    newPasswordChangeHandler(
      "newPasswordError",
      "Please enter the valid Password"
    );
    return;
  }
  if (passwordPattern.test(newPassword)) {
    let params = {
      accountType: "NORMAL",
      email: window.atob(localStorage.getItem("EMAIL")),
      password: newPassword,
    };
    const response = await invokeApi(
      config.baseUrl + apiConstants.changePassword,
      params
    );
    if (response.customcode === 200) {
      localStorage.setItem("PASSWORD", window.btoa(newPassword));
      toast.success(response.message);
      navigate(routeConstants.NAVIGATELOGIN);
    } else {
      alert(response.message);
    }
  }
};

// Resend otp handler
export const resendOtpdHandler = async (email) => {
  let params = {
    accountType: "NORMAL",
    email: email,
  };
  const response = await invokeApi(
    config.baseUrl + apiConstants.sendOtp,
    params
  );
  if (response.customcode === 200) {
    localStorage.setItem("OTP", window.btoa(response.data.code));
    toast.success(response.message);
  } else {
    toast.error(response.message);
  }
};

// validation handler for email and password
export const validateHandeler = async (
  email,
  password,
  loginFormChangeHandler
) => {
  if (email !== "") {
    if (email.includes("@") || email.includes(".")) {
      if (!emailPattern.test(email)) {
        loginFormChangeHandler("emailError", "Please enter a valid email.");
      } else {
        loginFormChangeHandler("emailError", "");
      }
    } else {
      loginFormChangeHandler("emailError", "");
    }
  } else {
    loginFormChangeHandler("isButtonDisabled", true);
  }
  if (password !== "") {
    if (!passwordPattern.test(password)) {
      loginFormChangeHandler("passwordError", "Please enter a valid password.");
    } else {
      loginFormChangeHandler("passwordError", "");
    }
  } else {
    loginFormChangeHandler("isButtonDisabled", true);
  }
  if (email.includes("@") || email.includes(".")) {
    if (emailPattern.test(email) && passwordPattern.test(password)) {
      loginFormChangeHandler("isButtonDisabled", false);
    }
  } else {
    if (passwordPattern.test(password) && email.length >= 3) {
      loginFormChangeHandler("isButtonDisabled", false);
    }
  }
};

// validate only email
export const validateEmail = async (email, resetFormChangeHandler) => {
  if (email !== "" && email.length >= 3) {
    if (!emailPattern.test(email)) {
      resetFormChangeHandler("emailError", "Please enter a valid email.");
      resetFormChangeHandler("isButtonDisabled", true);
    } else {
      resetFormChangeHandler("emailError", "");
      resetFormChangeHandler("isButtonDisabled", false);
    }
  }
};

// validate only password
export const validatePassword = async (
  newPassword,
  newPasswordChangeHandler
) => {
  if (newPassword !== "" && newPassword.length > 3) {
    if (!passwordPattern.test(newPassword)) {
      newPasswordChangeHandler(
        "newPasswordError",
        "Please enter a valid password."
      );
      newPasswordChangeHandler("isButtonDisabled", true);
    } else {
      newPasswordChangeHandler("newPasswordError", "");
      newPasswordChangeHandler("isButtonDisabled", false);
    }
  } else {
    newPasswordChangeHandler("isButtonDisabled", true);
  }
};

// showPassword Toggle
export const togglePasswordVisibility = (
  showPassword,
  loginFormChangeHandler
) => {
  loginFormChangeHandler("showPassword", !showPassword);
  if (!showPassword) loginFormChangeHandler("passwordType", "text");
  else loginFormChangeHandler("passwordType", "password");
};
