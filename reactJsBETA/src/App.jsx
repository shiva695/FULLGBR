// @import dependencies
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// @import utils
import helperUtils from "./utills/helperUtils";
import { invokeApi } from "./utills/apiService";
import { config } from "./utills/configUtils";

// @import Constants
import routeConstants from "./constants/routeConstants";
import cookieConstants from "./constants/cookieConstants";
import apiConstants from "./constants/apiConstants";

// @import components
import Login from "./components/signin/Login";
import Logout from "./components/signin/Logout";
import ResetPassword from "./components/signin/ResetPassword";
import SendOtp from "./components/signin/SendOtp";
import NewPassword from "./components/signin/NewPassword";
import SignUp from "./components/signUp/SignUp";
import ChoosePassword from "./components/signUp/ChoosePassword";
import VerifyEmail from "./components/signUp/VerifyEmail";
import Onboarding from "./components/signUp/Onboarding";
import Header from "./components/layoutComponents/Header";
import Footer from "./components/layoutComponents/Footer";
import GameStore from "./components/gamePedia/GameStore";
import GameFolio from "./components/gamePedia/GameFolio";
import Profile from "./components/profile/Profile";
import BannedContent from "./components/profile/modals/BannedContent";
import Followers from "./components/profile/modals/Followers";
import Confirmation from "./components/profile/modals/Confirmation";
import UploadProfilePhoto from "./components/profile/modals/UploadProfilePhoto";
import Discover from "./components/homePage/Discover";
import HomePage from "./components/homePage/HomePage";
import AddPost from "./components/post/AddPost";
import Theme from "./components/themes/Theme";
import Wallet from "./components/wallets/Wallet";
import Draft from "./components/drafts/Draft";
import Settings from "./components/settings/Settings";
import { getConfigRequestAction } from "./components/global/redux/slices/configSlice";

export default function App() {
  const pathArr = [
    routeConstants.NAVIGATELOGIN,
    routeConstants.NAVIGATESIGNUP,
    routeConstants.NAVIGATELANDING,
    routeConstants.NAVIGATECHOOSEPASSWORD,
    routeConstants.NAVIGATEVERIFYEMAIL,
    routeConstants.NAVIGATEONBOARDING,
    routeConstants.NAVIGATESENDOTP,
    routeConstants.NAVIGATENEWPASSWORD,
    routeConstants.NAVIGATERESETPASSWORD,
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { data: configData } = useSelector((state) => state.configs);
  const [cookies, setCookie] = useCookies();
  const [initialCookie, setInitialCookie] = useState(true);
  const [deviceUniqueId, setDeviceUniqueId] = useState("");
  const [invokeUserlogin, setInvokeUserLogin] = useState(true);
  const [invokeConfigData, setInvokeConfigData] = useState(true);

  // Check user login
  // useEffect(() => {
  //   const checkUserLogin = () => {
  //     if (cookies[cookieConstants.USERCOOKIES] === undefined) {
  //       navigate("/signin");
  //     }
  //   };
  //   if (invokeUserlogin) {
  //     setInvokeUserLogin(false);
  //     checkUserLogin();
  //   }
  // }, [cookies, invokeUserlogin, navigate]);

  // Setting unique device Id
  useEffect(() => {
    let storedDeviceId = localStorage.getItem("deviceId");
    if (!storedDeviceId) {
      storedDeviceId = uuidv4();
      localStorage.setItem("deviceId", storedDeviceId);
    }
    setDeviceUniqueId(storedDeviceId);
  }, []);

  // find ip address
  useEffect(() => {
    const findIP = async () => {
      let host = window.location.host.slice(0, -5);
      let getOs = helperUtils.getOS();
      let deviceType = helperUtils.detectDeviceType();
      setCookie(
        [cookieConstants.DEVICECOOKIE],
        JSON.stringify({
          deviceId: deviceUniqueId,
          ipAddress: host,
          platform: getOs,
          deviceType: deviceType,
        }),
        { path: "/", maxAge: 3000000, sameSite: "strict" }
      );
      setCookie(
        cookieConstants.THEMECOOKIES,
        JSON.stringify("/assets/svg/home-bg.svg"),
        {
          path: "/",
          maxAge: 3000000,
          sameSite: "strict",
        }
      );
    };
    if (initialCookie && deviceUniqueId !== "") {
      setInitialCookie(false);
      findIP();
    }
  }, [initialCookie, deviceUniqueId, setCookie]);

  // Scroll page to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  //get cofig data
  // useEffect(() => {
  //   const verifyEmail = async () => {
  //     let params = {};
  //     const controller = new AbortController();
  //     const { signal } = controller;
  //     const response = await invokeApi(
  //       config.baseUrl + apiConstants.getConfigData,
  //       params,
  //       { signal }
  //     );
  //     if (response.customcode === 200) {
  //       setCookie(cookieConstants.CONFIGDATA, JSON.stringify(response.data), {
  //         path: "/",
  //         maxAge: 3000000,
  //         sameSite: "strict",
  //       });
  //
  //     } else {
  //       alert("Something went wrong");
  //     }
  //     // UseEffect abort on unmount for cleanup
  //     return () => {
  //       controller.abort();
  //     };
  //   };
  //   if (invokeConfigData && !cookies[cookieConstants.CONFIGDATA]) {
  //     setInvokeConfigData(false);
  //     verifyEmail();
  //   }
  // }, [cookies, invokeConfigData, setCookie]);
  useEffect(() => {
    if (!configData) {
      dispatch(getConfigRequestAction());
    }
  }, [configData, dispatch]);

  return (
    <div>
      {pathArr.includes(location.pathname) ? null : <Header />}
      {/* {cookies[cookieConstants.USERCOOKIES] === undefined ? ( */}
      <Routes>
        <Route path={routeConstants.NAVIGATELOGIN} element={<Login />} />
        <Route path={routeConstants.NAVIGATESENDOTP} element={<SendOtp />} />
        <Route
          path={routeConstants.NAVIGATERESETPASSWORD}
          element={<ResetPassword />}
        />
        <Route
          path={routeConstants.NAVIGATENEWPASSWORD}
          element={<NewPassword />}
        />
        <Route path={routeConstants.NAVIGATESIGNUP} element={<SignUp />} />
        <Route
          path={routeConstants.NAVIGATEVERIFYEMAIL}
          element={<VerifyEmail />}
        />
        <Route
          path={routeConstants.NAVIGATECHOOSEPASSWORD}
          element={<ChoosePassword />}
        />
        <Route
          path={routeConstants.NAVIGATEONBOARDING}
          element={<Onboarding />}
        />
        {/* </Routes> */}
        {/* ) : ( */}
        {/* <Routes> */}
        <Route path={routeConstants.NAVIGATELOGOUT} element={<Logout />} />
        <Route path={routeConstants.NAVIGATEDISCOVER} element={<Discover />} />
        <Route path={routeConstants.NAVIGATEHOME} element={<HomePage />} />
        <Route
          path={routeConstants.NAVIGATEGAMEDETAIL}
          element={<GameFolio />}
        />
        <Route
          path={routeConstants.NAVIGATEGAMEFOLIO}
          element={<GameStore />}
        />
        <Route path={routeConstants.NAVIGATEPROFILE} element={<Profile />} />
        <Route path={routeConstants.NAVIGATETHEME} element={<Theme />} />
        <Route
          path={routeConstants.NAVIGATEBANNED}
          element={<BannedContent />}
        />
        <Route
          path={routeConstants.NAVIGATEBANNED}
          element={<BannedContent />}
        />
        <Route
          path={routeConstants.NAVIGATEFOLLOWERS}
          element={<Followers />}
        />
        <Route
          path={routeConstants.NAVIGATECONFIRMATION}
          element={<Confirmation />}
        />
        <Route path={routeConstants.NAVIGATEADDPOST} element={<AddPost />} />
        <Route
          path={routeConstants.NAVIGATEREUPLOADPROFILE}
          element={<UploadProfilePhoto />}
        />
        <Route path={routeConstants.NAVIGATETHEME} element={<Theme />} />
        <Route path={routeConstants.NAVIGATEWALLET} element={<Wallet />} />
        <Route path={routeConstants.NAVIGATEDRAFT} element={<Draft />} />
        <Route path={routeConstants.NAVIGATESETTINGS} element={<Settings />} />
      </Routes>
      {/* )} */}
      {pathArr.includes(location.pathname) ? null : <Footer />}
    </div>
  );
}
