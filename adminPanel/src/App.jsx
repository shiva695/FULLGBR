// @import dependencies
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes, useNavigate } from "react-router-dom";

// @import files
import constants from "./json/constants.json";

// @import components
import Header from "./components/general-components/Header";
import Analytics from "./components/gamerback-services/socialmedia/analytics/Analytics";
import Challenges from "./components/gamerback-services/socialmedia/challenges/Challenges";
import Guidelines from "./components/gamerback-services/socialmedia/guidelines/Guidelines";
import Reports from "./components/gamerback-services/socialmedia/reports/Reports";
import Rewards from "./components/gamerback-services/socialmedia/rewards/Rewards";
import Settings from "./components/gamerback-services/socialmedia/settings/Settings";
import Themes from "./components/gamerback-services/socialmedia/themes/Themes";
import Tokens from "./components/gamerback-services/socialmedia/tokens/Tokens";
import Trainings from "./components/gamerback-services/socialmedia/trainings/Trainings";
import Users from "./components/gamerback-services/socialmedia/users/Users";
import Wallets from "./components/gamerback-services/socialmedia/wallets/Wallets";
import Workplaces from "./components/gamerback-services/socialmedia/workplaces/Workplaces";
import Gamepedias from "./components/gamerback-services/socialmedia/gamepedias/Gamepedias";
import Moderations from "./components/gamerback-services/socialmedia/moderations/Moderations";
import Notification from "./components/gamerback-services/socialmedia/notifications/Notification";
import Posts from "./components/gamerback-services/socialmedia/posts/Posts";
import Referrals from "./components/gamerback-services/socialmedia/referrals/Referrals";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import OtpPage from "./components/auth/OtpPage";
import ResetPassword from "./components/auth/ResetPassword";
import Viewusers from "./components/gamerback-services/socialmedia/users/Viewusers";
import Home from "./components/home/Home";
import SocialMediaDashboard from "./components/gamerback-services/socialmedia/dashboard/SocialMediaDashboard";
import EmployeesDashboard from "./components/gamerback-services/employees/EmployeesDashboard";
import EmployeeList from "./components/gamerback-services/employees/EmployeeList";

import NotificationTemplate from "./components/gamerback-services/socialmedia/notifications/NotificationTemplate";
import Profile from "./components/profile/Profile";
import ProfileSettings from "./components/profile/ProfileSettings";
import ChangePassword from "./components/profile/ChangePassword";
import SendNotificationNext from "./components/gamerback-services/socialmedia/notifications/SendNotificationNext";
import Logout from "./components/auth/Logout";
import EmployeeView from "./components/gamerback-services/employees/EmployeeView";
import DashboardAdmin from "./components/dashboard/admin/DashboardAdmin";

function App() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const [checkAdminData, setCheckAdminData] = useState(true);

  // Check user is login or not
  // useEffect(() => {
  //   if (checkAdminData) {
  //     setCheckAdminData(false);
  //     if (cookies[constants.ADMINDATA] === undefined) {
  //       navigate(constants.PATH.NAVIGATELOGIN);
  //     }
  //   }
  // }, [cookies, checkAdminData, navigate]);

  // set body class for light and dark
  useEffect(() => {
    if (cookies[constants.MODECOOKIE] === constants.DARK) {
      document.documentElement.classList.add(constants.DARK);
    } else {
      document.documentElement.classList.remove(constants.DARK);
    }
  }, [cookies]);

  console.log(cookies[constants.MODECOOKIE]);

  // settting initial cookies
  useEffect(() => {
    setCookie(constants.MODECOOKIE, JSON.stringify(constants.LIGHT), {
      path: "/",
      maxAge: 3000000,
      sameSite: "strict",
    });
  }, [setCookie]);

  return (
    <div>
      {/* {cookies[constants.ADMINDATA] === undefined ? (
        <Routes>
          <Route path={constants.PATH.NAVIGATELOGIN} element={<Login />} />
          <Route
            path={constants.PATH.NAVIGATEFORGOTPASSWORD}
            element={<ForgotPassword />}
          />
          <Route path={constants.PATH.NAVIGATEOTP} element={<OtpPage />} />
          <Route
            path={constants.PATH.NAVIGATERESETPASSWORD}
            element={<ResetPassword />}
          />
        </Routes>
      ) : ( */}
      <>
        <Header />
        <Routes>
          <Route path={constants.PATH.NAVIGATELOGOUT} element={<Logout />} />
          <Route
            path={constants.PATH.NAVIGATESOCIALDASHBOARD}
            element={<SocialMediaDashboard />}
          />
          <Route path={"/admin-dashboard"} element={<DashboardAdmin />} />
          <Route
            path={constants.PATH.NAVIGATEEMPLOYEEDASHBOARD}
            element={<EmployeesDashboard />}
          />
          <Route
            path={constants.PATH.NAVIGATEEMPLOYEELIST}
            element={<EmployeeList />}
          />
          <Route
            path={constants.PATH.NAVIGATEEMPLOYEEVIEW}
            element={<EmployeeView />}
          />
          <Route path={constants.PATH.NAVIGATEHOME} element={<Home />} />
          <Route
            path={constants.PATH.NAVIGATEANALYTICS}
            element={<Analytics />}
          />
          <Route
            path={constants.PATH.NAVIGATECHALLENGES}
            element={<Challenges />}
          />
          <Route
            path={constants.PATH.NAVIGATEGAMEPEDIAS}
            element={<Gamepedias />}
          />
          <Route
            path={constants.PATH.NAVIGATEGUIDELINES}
            element={<Guidelines />}
          />
          <Route
            path={constants.PATH.NAVIGATEMODERATIONS}
            element={<Moderations />}
          />
          <Route
            path={constants.PATH.NAVIGATENOTIFICATIONS}
            element={<Notification />}
          />
          <Route path={constants.PATH.NAVIGATEPOSTS} element={<Posts />} />
          <Route
            path={constants.PATH.NAVIGATEREFERRALS}
            element={<Referrals />}
          />
          <Route path={constants.PATH.NAVIGATEREPORTS} element={<Reports />} />
          <Route path={constants.PATH.NAVIGATEREWARDS} element={<Rewards />} />
          <Route
            path={constants.PATH.NAVIGATESETTINGS}
            element={<Settings />}
          />
          <Route path={constants.PATH.NAVIGATETHEMES} element={<Themes />} />
          <Route path={constants.PATH.NAVIGATETOKENS} element={<Tokens />} />
          <Route
            path={constants.PATH.NAVIGATETRAINING}
            element={<Trainings />}
          />
          <Route path={constants.PATH.NAVIGATEUSERS} element={<Users />} />
          <Route
            path={constants.PATH.NAVIGATEUSERSVIEW}
            element={<Viewusers />}
          />
          <Route path={constants.PATH.NAVIGATEWALLETS} element={<Wallets />} />
          <Route
            path={constants.PATH.NAVIGATEWORKPLACES}
            element={<Workplaces />}
          />
          <Route
            path={constants.PATH.NAVIGATENOTIFICATIONSTEMPLATE}
            element={<NotificationTemplate />}
          />
          <Route
            path={constants.PATH.NAVIGATENOTIFICATIONSNEXT}
            element={<SendNotificationNext />}
          />

          <Route path={constants.PATH.NAVIGATEPROFILE} element={<Profile />} />
          <Route
            path={constants.PATH.NAVIGATEPROFILESETTINGS}
            element={<ProfileSettings />}
          />
        </Routes>
      </>
      {/* )} */}
    </div>
  );
}

export default App;
