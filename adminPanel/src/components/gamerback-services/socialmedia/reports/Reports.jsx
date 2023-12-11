// @import dependencies
import { useState } from "react";
import { useCookies } from "react-cookie";

// @import files
import BreadCrumbs from "../../../general-components/Breadcrumbs";
import constants from "../../../../json/constants.json";

// @import components
import FullScreenModal from "../../../Modals/FullScreenModal";
import FixedSidebar from "../../../general-components/FixedSidebar";

const Reports = () => {
  const [cookies] = useCookies();
  const [reportsTabList, setReportsTabList] = useState(0);
  const [isFullscreenModalOpen, setISFullscreenModalOpen] = useState(false);

  const closeFullScreenUserModal = () => {
    setISFullscreenModalOpen(false);
  };
  return (
    <>
      <FixedSidebar />
      <div className="section">
        <div className="m-7 flex flex-col space-y-6">
          {/* Breadcrumbs */}
          <BreadCrumbs
            nav1="Reports"
            nav2={`${
              reportsTabList === 0
                ? "All Reports"
                : reportsTabList === 1
                ? "Pending"
                : reportsTabList === 2
                ? "In-progress"
                : reportsTabList === 3
                ? "Resolved"
                : ""
            }`}
          />

          {/* USers Tab List */}
          <div className="flex flex-row items-center space-x-20">
            <h5
              className={`${
                reportsTabList === 0
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => setReportsTabList(0)}
            >
              All Reports
            </h5>
            <h5
              className={`${
                reportsTabList === 1
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => setReportsTabList(1)}
            >
              Pending
            </h5>
            <h5
              className={`${
                reportsTabList === 2
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => setReportsTabList(2)}
            >
              In-progress
            </h5>
            <h5
              className={`${
                reportsTabList === 3
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => setReportsTabList(3)}
            >
              Resolved
            </h5>
          </div>

          {/* User Table cards */}
          <div className="flex flex-col space-y-5 card card-shadow w-full h-[520px]">
            {/* table header */}
            <div className="flex flex-row items-center justify-between px-7 pt-5">
              {/* left */}
              <div className="flex flex-row items-center space-x-5">
                <img src="/assets/png/icons-spam.png" className="h-10 w-10" />
                <h5 className="font-semibold">Reports</h5>
                <p>(Total Reports: 20,000)</p>
              </div>
              {/* Right */}
              <div className="flex flex-row items-center space-x-7">
                <div className="flex flex-row space-x-5 items-center">
                  <img src="/assets/png/filter.png" className="h-5 w-5" />
                  <img src="/assets/png/refresh.png" className="h-5 w-5" />
                  <img
                    src="/assets/png/add.png"
                    className="h-5 w-5 cursor-pointer"
                    // onClick={() => setIsAddUserModalOpen(true)}
                  />
                </div>
                {/* Search input */}
                <div className="flex flex-row space-x-5 h-5 items-center p-5 border-[1px] border-[#707070] w-[250px] rounded-full">
                  <img
                    className="h-5 w-5"
                    src={
                      cookies[constants.MODECOOKIE] === "light"
                        ? "/assets/png/search-light.png"
                        : "/assets/png/search-dark.png"
                    }
                  />
                  <input
                    className="outline-none bg-transparent dark:text-[#FFFFFF]  w-full me-5"
                    placeholder="Search..."
                  />
                </div>
                <img
                  src="/assets/png/fullscreen-enter.png"
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => setISFullscreenModalOpen(true)}
                />
              </div>
            </div>
            {/* tables */}
            <div className="h-full overflow-y-auto">
              <table className="w-full text-sm text-left">
                <thead className="sticky top-0 z-10 border-b dark:text-[#ffffff] bg-[#242424] text-[#ffffff]">
                  <tr>
                    <th scope="col" className="text-center px-6 py-3">
                      <input type="checkbox" />
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="text-center px-6 py-3 w-[35%]">
                      Post
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      User
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      No of reports
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* {gameSingleData?.awards.awards.map((el, index) => {
                return ( */}
                  <tr className="font-semibold text-[#707070]">
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <input type="checkbox" />
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      1.
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white w-[35%]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      ShivaSJ
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      50
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      Pending
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <div className="flex flex-row space-x-4 items-center justify-center">
                        <img src="/assets/png/eye.png" className="h-5 w-5" />
                        <img src="/assets/png/view.png" className="h-5 w-5" />
                        <img src="/assets/png/delete.png" className="h-5 w-5" />
                      </div>
                    </td>
                  </tr>
                  {/* Second row */}
                  <tr className="font-semibold text-[#707070]">
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <input type="checkbox" />
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      1.
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white w-[35%]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      MaheshMW
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      20
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <div className="flex flex-row items-center space-x-2">
                        <img
                          src="/assets/png/status-green.png"
                          className="h-3 w-3"
                        />
                        <p>Pending</p>
                      </div>
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <div className="flex flex-row space-x-4 items-center justify-center">
                        <img src="/assets/png/eye.png" className="h-5 w-5" />
                        <img src="/assets/png/view.png" className="h-5 w-5" />
                        <img src="/assets/png/delete.png" className="h-5 w-5" />
                      </div>
                    </td>
                  </tr>
                  <tr className="font-semibold text-[#707070]">
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <input type="checkbox" />
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      1.
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white w-[35%]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      MaheshMW
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      20
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <div className="flex flex-row items-center space-x-2">
                        <img
                          src="/assets/png/status-green.png"
                          className="h-3 w-3"
                        />
                        <p>Pending</p>
                      </div>
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <div className="flex flex-row space-x-4 items-center justify-center">
                        <img src="/assets/png/eye.png" className="h-5 w-5" />
                        <img src="/assets/png/view.png" className="h-5 w-5" />
                        <img src="/assets/png/delete.png" className="h-5 w-5" />
                      </div>
                    </td>
                  </tr>
                  <tr className="font-semibold text-[#707070]">
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <input type="checkbox" />
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      1.
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white w-[35%]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      MaheshMW
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      20
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <div className="flex flex-row items-center space-x-2">
                        <img
                          src="/assets/png/status-green.png"
                          className="h-3 w-3"
                        />
                        <p>Pending</p>
                      </div>
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <div className="flex flex-row space-x-4 items-center justify-center">
                        <img src="/assets/png/eye.png" className="h-5 w-5" />
                        <img src="/assets/png/view.png" className="h-5 w-5" />
                        <img src="/assets/png/delete.png" className="h-5 w-5" />
                      </div>
                    </td>
                  </tr>
                  <tr className="font-semibold text-[#707070]">
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <input type="checkbox" />
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      1.
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white w-[35%]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      MaheshMW
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      20
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <div className="flex flex-row items-center space-x-2">
                        <img
                          src="/assets/png/status-green.png"
                          className="h-3 w-3"
                        />
                        <p>Pending</p>
                      </div>
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <div className="flex flex-row space-x-4 items-center justify-center">
                        <img src="/assets/png/eye.png" className="h-5 w-5" />
                        <img src="/assets/png/view.png" className="h-5 w-5" />
                        <img src="/assets/png/delete.png" className="h-5 w-5" />
                      </div>
                    </td>
                  </tr>
                  <tr className="font-semibold text-[#707070]">
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <input type="checkbox" />
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      1.
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white w-[35%]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      MaheshMW
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      20
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <div className="flex flex-row items-center space-x-2">
                        <img
                          src="/assets/png/status-green.png"
                          className="h-3 w-3"
                        />
                        <p>Pending</p>
                      </div>
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <div className="flex flex-row space-x-4 items-center justify-center">
                        <img src="/assets/png/eye.png" className="h-5 w-5" />
                        <img src="/assets/png/view.png" className="h-5 w-5" />
                        <img src="/assets/png/delete.png" className="h-5 w-5" />
                      </div>
                    </td>
                  </tr>
                  <tr className="font-semibold text-[#707070]">
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <input type="checkbox" />
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      1.
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white w-[35%]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      MaheshMW
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      20
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <div className="flex flex-row items-center space-x-2">
                        <img
                          src="/assets/png/status-green.png"
                          className="h-3 w-3"
                        />
                        <p>Pending</p>
                      </div>
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <div className="flex flex-row space-x-4 items-center justify-center">
                        <img src="/assets/png/eye.png" className="h-5 w-5" />
                        <img src="/assets/png/view.png" className="h-5 w-5" />
                        <img src="/assets/png/delete.png" className="h-5 w-5" />
                      </div>
                    </td>
                  </tr>
                  <tr className="font-semibold text-[#707070]">
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <input type="checkbox" />
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      1.
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white w-[35%]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      MaheshMW
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      20
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <div className="flex flex-row items-center space-x-2">
                        <img
                          src="/assets/png/status-green.png"
                          className="h-3 w-3"
                        />
                        <p>Pending</p>
                      </div>
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <div className="flex flex-row space-x-4 items-center justify-center">
                        <img src="/assets/png/eye.png" className="h-5 w-5" />
                        <img src="/assets/png/view.png" className="h-5 w-5" />
                        <img src="/assets/png/delete.png" className="h-5 w-5" />
                      </div>
                    </td>
                  </tr>
                  {/* );
              })} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <FullScreenModal
        open={isFullscreenModalOpen}
        close={closeFullScreenUserModal}
      />
    </>
  );
};

export default Reports;
