// Import dependencies
import { useNavigate, useLocation } from "react-router-dom";

// Import files
import constants from "../../json/constants.json";

const FixedSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
// console.log(window.headings[0].includes(`${constants.ADMIN}`))
// console.log(constants.ADMIN)

  return (
    <>
    {!!window.headings && (
      <div className="sidebar-card">
        {/* Sidebar start */}
        {/* Headings flex start*/}
        <div className="w-full flex flex-col p-5 dark:text-white">
          {/* {window.headings[0].includes(`${constants.DASHBOARD}`) && ( */}
            <div
              className={
                location?.pathname === constants.DASHBOARDNAVIGATE
                  ? "sidebar-mainheading-selected"
                  : "sidebar-mainheading-unselected"
              }
              onClick={() => {
                navigate(constants.DASHBOARDNAVIGATE);
              }}
            >
              {constants.DASHBOARD}
            </div>
          {/* )} */}

          {window.headings.includes(`${constants.USERS}`) && (
            <div
              className={
                location?.pathname === constants.USERSNAVIGATE
                  ? "sidebar-mainheading-selected"
                  : "sidebar-mainheading-unselected"
              }
              onClick={() => {
                navigate(constants.USERSNAVIGATE);
              }}
            >
              {constants.USERS}
            </div>
          )}

          {window.headings.includes(`${constants.ADMIN}`) && (
            <div
              className={
                location?.pathname === constants.ROLESNAVIGATE
                  ? "sidebar-mainheading-selected"
                  : "sidebar-mainheading-unselected"
              }
              onClick={() => {
                navigate(constants.ROLESNAVIGATE);
              }}
            >
              {constants.ADMIN}
            </div>
          )}
          {window.headings.includes(`${constants.NOTIFICATION}`) && (
            <div
              className={
                location?.pathname.includes(constants.NOTINAV)
                  ? "sidebar-mainheading-selected"
                  : "sidebar-mainheading-unselected"
              }
              onClick={() => {
                navigate(constants.NOTIFICATIONTEMPLATENAVIGATE);
              }}
            >
              {constants.NOTIFICATION}
            </div>
          )}
          {window.headings.includes(`${constants.FEEDBACK}`) && (
            <div
              className={
                location?.pathname.includes(constants.FEEDBACKNAVIGATE)
                  ? "sidebar-mainheading-selected"
                  : "sidebar-mainheading-unselected"
              }
              onClick={() => {
                navigate(constants.FEEDBACKNAVIGATE);
              }}
            >
              {constants.FEEDBACK}
            </div>
          )}
        </div>
      </div>
    )}
    </>
  );
};

export default FixedSidebar;
