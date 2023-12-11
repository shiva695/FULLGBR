// @import dependencies
import { useState } from "react";
import { useCookies } from "react-cookie";

// @import files
import constants from "../../../../json/constants.json";

// @import components
import BreadCrumbs from "../../../general-components/Breadcrumbs";
import AddUserModal from "../../../Modals/AddUserModal";
import DeleteUserModal from "../../../Modals/DeleteUserModal";
import { useNavigate } from "react-router-dom";
import FixedSidebar from "../../../general-components/FixedSidebar";
const Users = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [usersTabList, setUsersTabList] = useState(0);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };
  const closeDeleteUserModal = () => {
    setIsDeleteUserModalOpen(false);
  };
  return (
    <>
      <FixedSidebar />
      <div className="section">
        <div className="m-10 flex flex-col space-y-8">
          {/* Breadcrumbs */}
          <BreadCrumbs
            nav1="Users"
            nav2={`${
              usersTabList === 0
                ? "All Users"
                : usersTabList === 1
                ? "Verified Users"
                : usersTabList === 2
                ? "Banned Users"
                : usersTabList === 3
                ? "Suspended Users"
                : usersTabList === 4
                ? "Terminated Users"
                : ""
            }`}
          />

          {/* USers Tab List */}
          <div className="flex flex-row items-center space-x-20">
            <h5
              className={`${
                usersTabList === 0
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => setUsersTabList(0)}
            >
              All Users
            </h5>
            <h5
              className={`${
                usersTabList === 1
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => setUsersTabList(1)}
            >
              Verified Users
            </h5>
            <h5
              className={`${
                usersTabList === 2
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => setUsersTabList(2)}
            >
              Banned Users
            </h5>
            <h5
              className={`${
                usersTabList === 3
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => setUsersTabList(3)}
            >
              Suspended Users
            </h5>
            <h5
              className={`${
                usersTabList === 4
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => setUsersTabList(4)}
            >
              Terminated Users
            </h5>
          </div>

          {/* User Table cards */}
          <div className="flex flex-col space-y-5 card card-shadow w-full h-[500px]">
            {/* table header */}
            <div className="flex flex-row items-center justify-between px-7 pt-5">
              {/* left */}
              <div className="flex flex-row items-center space-x-5">
                <img src="/assets/png/man.png" className="h-10 w-10" />
                <h5 className="font-semibold">Users</h5>
                <p>(Total Users: 20,000)</p>
              </div>
              {/* Right */}
              <div className="flex flex-row items-center space-x-7">
                <div className="flex flex-row space-x-5 items-center">
                  <img src="/assets/png/filter.png" className="h-5 w-5" />
                  <img src="/assets/png/refresh.png" className="h-5 w-5" />
                  <img
                    src="/assets/png/add.png"
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => setIsAddUserModalOpen(true)}
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
                  className="h-5 w-5"
                />
              </div>
            </div>
            {/* tables */}
            <table className="w-full text-sm text-left">
              <thead className="sticky top-0 z-10 border-b dark:text-[#ffffff] bg-[#242424] text-[#ffffff]">
                <tr>
                  <th scope="col" className="text-center px-6 py-3">
                    <input type="checkbox" />
                  </th>
                  <th scope="col" className="text-center px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="text-center px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="text-center px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="text-center px-6 py-3">
                    Verification
                  </th>
                  <th scope="col" className="text-center px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="text-center px-6 py-3">
                    Last Active
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
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    Shiva
                  </td>
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    ShivaSJ
                  </td>
                  <td className="flex items-center justify-center py-4 text-[#707070] dark:text-white">
                    <img
                      src="/assets/png/verified-badge.png"
                      className="h-5 w-5"
                    />
                  </td>
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    20 Aug 2020
                  </td>
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    2 hours ago
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
                    2.
                  </td>
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    Mahesh
                  </td>
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    MAheshMW
                  </td>
                  <td className="flex items-center justify-center py-4 text-[#707070] dark:text-white">
                    <img
                      src="/assets/png/verified-badge.png"
                      className="h-5 w-5"
                    />
                  </td>
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    20 Aug 2020
                  </td>
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    2 hours ago
                  </td>
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    <div className="flex flex-row space-x-4 items-center justify-center">
                      <img
                        src="/assets/png/eye.png"
                        className="h-5 w-5 cursor-pointer"
                        onClick={() =>
                          navigate(constants.PATH.NAVIGATEUSERSVIEW)
                        }
                      />
                      <img src="/assets/png/view.png" className="h-5 w-5 " />
                      <img
                        src="/assets/png/delete.png"
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => setIsDeleteUserModalOpen(true)}
                      />
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

      <AddUserModal open={isAddUserModalOpen} close={closeAddUserModal} />
      <DeleteUserModal
        open={isDeleteUserModalOpen}
        close={closeDeleteUserModal}
      />
    </>
  );
};

export default Users;
