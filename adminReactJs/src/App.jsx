// import dependencies
import { Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

//import files
import "./App.css";
import constants from "./json/constants.json";
import helperUtils from "./utils/helperUtils";
import { config } from "./utils/configUtils";
import { apiList, invokeApi } from "./utils/apiServiceUtils";

// import components
// import Main from "./components/common/Main";
import Login from "./components/common/Login.jsx";
import ForgotPassword from "./components/common/ForgotPassword";
import OtpPage from "./components/common/OtpPage";
import ResetPassword from "./components/common/ResetPassword";
import SearchBar from "./components/general/SearchBar";
import SingleSelect from "./components/general/SingleSelect";
import Dashboard from "./components/dashboard/Dashboard";
import Users from "./components/users/UserList";
import Add from "./components/admins/roles/Add";
import Header from "./components/general/Header";
import FixedSidebar from "./components/general/FixedSidebar";
import Profile from "./components/profile/PersonalInfo";
import Settings from "./components/settings/Settings";
import SendNotifications from "./components/notifications/SendNotifications";
import NotificationTemplateList from "./components/notifications/NotificationTemplateList";
import NotificationEdit from "./components/notifications/NotificationEdit";
import UserEdit from "./components/users/UserEdit";
import NotificationView from "./components/notifications/NotificationView";
import ChangePassword from "./components/profile/ChangePassword";
import FeedbackList from "./components/feedbacks/FeedbackList";
import UserView from "./components/users/UserView";
import Managers from "./components/admins/managers/Managers";
import Roles from "./components/admins/roles/Roles";
import AddManagers from "./components/admins/managers/AddManagers";

function App() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [invokeVerifyUser, setInvokeVerifyUser] = useState(true);

  if (cookies[constants.ADMINDATA]) {
    const dataSet = helperUtils.extractHeadingsandSubheadings(
      cookies[constants.ADMINDATA].privileges
    );
    window.headings = [...new Set(dataSet[0])];
    window.subheadings = [...new Set(dataSet[1])];
  }

  console.log("headings", window.headings);
  console.log("sub-heading", window.subheadings);

  // Settings Dark Mode
  useEffect(() => {
    if (cookies[constants.MODE] === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [cookies]);

  useEffect(() => {
    const setConfig = async () => {
      const response = await invokeApi(
        config.baseUrl + apiList.getConfigData,
        {},
        cookies
      );
      if (response.customcode === 200) {
        setCookie(constants.SETTINGSDATA, JSON.stringify(response.data), {
          path: "/",
          maxAge: 3000000,
          sameSite: "strict",
        });
        setCookie(constants.MODE, JSON.stringify("light"), {
          path: "/",
          maxAge: 3000000,
          sameSite: "strict",
        });
      }
    };

    if (cookies[constants.SETTINGSDATA] === undefined) {
      setConfig();
    }

    const verifyUser = async () => {
      const response = await invokeApi(
        config.baseUrl + apiList.verifyUser,
        {},
        cookies
      );
      if (response.customcode === 200) {
        <Link to="/"></Link>;
      } else {
        removeCookie(constants.ADMINDATA);
        <Link to="/login"></Link>;
      }
    };

    if (invokeVerifyUser) {
      setInvokeVerifyUser(false);
      if (cookies[constants.ADMINDATA] === undefined) {
        navigate("/login");
      } else {
        verifyUser();
      }
    }

    if (invokeVerifyUser) {
      setInvokeVerifyUser(false);
      if (cookies[constants.ADMINDATA] === undefined) {
        console.log("came here");
        navigate("/login");
      } else {
        verifyUser();
      }
    }
  }, [cookies, invokeVerifyUser, navigate, removeCookie, setCookie]);

  return (
    <div className="bg-zinc-200">
      <ToastContainer autoClose={1000} />
      {/* {cookies[constants.ADMINDATA] === undefined ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      ) : ( */}
      <>
        <Header />
        <FixedSidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />

          <Route path="/roles/:status" element={<Add />} />
          <Route path="/managers/:status" element={<AddManagers />} />
          <Route path="/managers" element={<Managers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="notifications/send" element={<SendNotifications />} />
          <Route path="users/:status" element={<UserEdit />} />
          <Route path="users/view" element={<UserView />} />
          <Route
            path="notifications/template"
            element={<NotificationTemplateList />}
          />
          <Route
            path="notifications/template/:status"
            element={<NotificationEdit />}
          />
          <Route
            path="notifications/template/view"
            element={<NotificationView />}
          />
          <Route path="/feedbacks" element={<FeedbackList />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/cron" element={<SingleSelect />} />
        </Routes>
      </>
      {/* )} */}
    </div>
  );
}

export default App;
