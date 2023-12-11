/* eslint-disable no-unused-vars */
//@ import dependencies
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

// @import Utils
import apiConstants from "../../constants/apiConstants";
import cookieConstants from "../../constants/cookieConstants";

// @import Utils
import { invokeApi } from "../../utills/apiService";
import { config } from "../../utills/configUtils";

const Logout = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();

  //  @when user logout clearing cookies
  const invokeCookies = () => {
    if (cookies[cookieConstants.USERCOOKIES]) {
      removeCookie(cookieConstants.USERCOOKIES, { path: "/" });
    }
    if (cookies[cookieConstants.CONFIGDATA]) {
      removeCookie(cookieConstants.CONFIGDATA, { path: "/" });
    }
    if (cookies[cookieConstants.ACCTYPECOOKIES]) {
      removeCookie(cookieConstants.ACCTYPECOOKIES, { path: "/" });
    }
    if (cookies[cookieConstants.ONBORADINGCOOKIE]) {
      removeCookie(cookieConstants.ONBORADINGCOOKIE, { path: "/" });
    }
    if (cookies[cookieConstants.DEVICECOOKIE]) {
      removeCookie(cookieConstants.DEVICECOOKIE, { path: "/" });
    }
    if (cookies[cookieConstants.THEMECOOKIES]) {
      removeCookie(cookieConstants.THEMECOOKIES, { path: "/" });
    }
    navigate("/login");
  };

  // @User logout api
  const userLogout = async () => {
    let params = {};
    const response = await invokeApi(
      config.baseUrl + apiConstants.logout,
      params,
      cookies
    );
    if (response.customcode === 200) {
      invokeCookies();
    } else {
      alert("Something went wrong");
    }
  };

  userLogout();
};

export default Logout;
