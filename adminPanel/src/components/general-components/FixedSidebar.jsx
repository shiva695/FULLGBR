// @import dependencies
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiSolidChevronRight } from "react-icons/bi";
import { useCookies } from "react-cookie";

// @import files
import constants from "../../json/constants.json";
import SidebarDrawer from "./SidebarDrawer";

const FixedSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies();
  const [openSidebarDrawer, setOpenSidebarDrawer] = useState(false);

  const onCloseDrawer = () => {
    setOpenSidebarDrawer(false);
  };
  return (
    <>
      <div className="fixed-sidebar-card">
        {cookies["services"] === "Social Media" && (
          <>
            {/* Dashbaord */}
            <div
              className={`fixed-sidebar-button  ${
                location?.pathname === constants.PATH.NAVIGATESOCIALDASHBOARD
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => navigate(constants.PATH.NAVIGATESOCIALDASHBOARD)}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <img className="h-5 w-5" src="/assets/png/briefcase.png" />
              <h5 className="text-[18px]">{constants.DASHBOARD}</h5>
            </div>

            {/* Workplace */}
            <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATEWORKPLACES
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => navigate(constants.PATH.NAVIGATEWORKPLACES)}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <img className="h-5 w-5" src="/assets/png/briefcase.png" />
              <h5 className="text-[18px]">{constants.WORKPLACE}</h5>
            </div>

            {/* Analytics */}
            <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATEANALYTICS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => navigate(constants.PATH.NAVIGATEANALYTICS)}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <img className="h-5 w-5" src="/assets/png/data-analytics.png" />
              <h5 className="text-[18px]">{constants.ANALYTICS}</h5>
            </div>

            {/* Users */}
            <div
              className={`fixed-sidebar-button flex justify-between items-center ${
                location?.pathname === constants.PATH.NAVIGATEUSERS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => navigate(constants.PATH.NAVIGATEUSERS)}
              onMouseEnter={() => {
                setOpenSidebarDrawer(true);
              }}
            >
              <div className="flex flex-row items-center space-x-5">
                <img className="h-5 w-5" src="/assets/png/man.png" />
                <h5 className="text-[18px]">{constants.USERS}</h5>
              </div>
              <div
                className={`flex justify-end w-fit cursor-pointer ${
                  openSidebarDrawer ? "rotate-180" : ""
                }`}
              >
                <BiSolidChevronRight className="h-5 w-5" />
              </div>
            </div>

            {/* Posts */}
            <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATEPOSTS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATEPOSTS);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <img className="h-5 w-5" src="/assets/png/icons-posts.png" />
              <h5 className="text-[18px]">{constants.POSTS}</h5>
            </div>

            {/* Reports */}
            <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATEREPORTS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATEREPORTS);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <img className="h-5 w-5" src="/assets/png/icons-spam.png" />
              <h5 className="text-[18px]">{constants.REPORTS}</h5>
            </div>

            {/* Moderation */}
            <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATEMODERATIONS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATEMODERATIONS);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <img className="h-5 w-5" src="/assets/png/icon-defender.png" />
              <h5 className="text-[18px]">{constants.MODERATION}</h5>
            </div>

            {/* Training */}
            <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATETRAINING
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATETRAINING);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <img className="h-5 w-5" src="/assets/png/icons-tutorial.png" />
              <h5 className="text-[18px]">{constants.TRAINING}</h5>
            </div>

            {/* Rewards */}
            <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATEREWARDS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATEREWARDS);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <img className="h-5 w-5" src="/assets/png/icons-rewards.png" />
              <h5 className="text-[18px]">{constants.REWARDS}</h5>
            </div>

            {/* Themes */}
            <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATETHEMES
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATETHEMES);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <img className="h-5 w-5" src="/assets/png/icons-theme.png" />
              <h5 className="text-[18px]">{constants.THEMES}</h5>
            </div>

            {/* Wallet */}
            <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATEWALLETS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATEWALLETS);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <img className="h-5 w-5" src="/assets/png/icons-wallet.png" />
              <h5 className="text-[18px]">{constants.WALLET}</h5>
            </div>

            {/* Referral */}
            <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATEREFERRALS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATEREFERRALS);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <img className="h-5 w-5" src="/assets/png/icons-referral.png" />
              <h5 className="text-[18px]">{constants.REFERRAL}</h5>
            </div>

            {/* Challenges */}
            <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATECHALLENGES
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATECHALLENGES);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <img className="h-5 w-5" src="/assets/png/icons-challenge.png" />
              <h5 className="text-[18px]">{constants.CHALENGES}</h5>
            </div>

            {/* Token */}
            <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATETOKENS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATETOKENS);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <img className="h-5 w-5" src="/assets/png/icons-token.png" />
              <h5 className="text-[18px]">{constants.TOKEN}</h5>
            </div>

            {/* Guidelines */}
            <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATEGUIDELINES
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATEGUIDELINES);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <img className="h-5 w-5" src="/assets/png/icons-guidelines.png" />
              <h5 className="text-[18px]">{constants.GUIDELINES}</h5>
            </div>

            {/* Gamepedia */}
            <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATEGAMEPEDIAS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATEGAMEPEDIAS);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <img className="h-5 w-5" src="/assets/png/icons-game.png" />
              <h5 className="text-[18px]">{constants.GAMEPEDIA}</h5>
            </div>

            {/* Notification */}
            <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATENOTIFICATIONS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATENOTIFICATIONS);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <img className="h-5 w-5" src="/assets/png/notification.png" />
              <h5 className="text-[18px]">{constants.NOTIFICATION}</h5>
            </div>

            {/* settings */}
            <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATESETTINGS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATESETTINGS);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <img className="h-5 w-5" src="/assets/png/icons-setting.png" />
              <h5 className="text-[18px]">{constants.SETTINGS}</h5>
            </div>
          </>
        )}

        {cookies["services"] === "Employees" && (
          <>
            {/* Dashbaord */}
            <div
              className={`fixed-sidebar-button  ${
                location?.pathname === constants.PATH.NAVIGATEEMPLOYEEDASHBOARD
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => navigate(constants.PATH.NAVIGATEEMPLOYEEDASHBOARD)}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <img className="h-5 w-5" src="/assets/png/briefcase.png" />
              <h5 className="text-[18px]">{constants.DASHBOARD}</h5>
            </div>
            {/* Employee list */}
            <div
              className={`fixed-sidebar-button  ${
                location?.pathname === constants.PATH.NAVIGATEEMPLOYEELIST
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => navigate(constants.PATH.NAVIGATEEMPLOYEELIST)}
              // onMouseEnter={() => {
              //   setOpenSidebarDrawer(false);
              // }}
            >
              <img className="h-5 w-5" src="/assets/png/briefcase.png" />
              <h5 className="text-[18px]">{constants.EMPLOYEELIST}</h5>
            </div>
          </>
        )}
      </div>
      <SidebarDrawer open={openSidebarDrawer} close={onCloseDrawer} />
    </>
  );
};

export default FixedSidebar;
