/* eslint-disable react-hooks/exhaustive-deps */
// import dependencies
import { TbFilterCog, TbEye } from "react-icons/tb";
import {
  MdEdit,
  MdOutlineDelete,
  MdOutlineAdd,
  MdRefresh,
} from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { useCookies } from "react-cookie";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

//import components
import ToggleButton from "../general/ToggleButton";
import ActionButton from "../general/ActionButton";
import ConformationPopup from "../modals/ConformationPopup";
import Sidebar from "../general/NewSidebar";
import ListSkeleton from "../general/ListSkeleton";

// import files
import { apiList, invokeApi } from "../../utils/apiServiceUtils";
import { config } from "../../utils/configUtils";
import constants from "../../json/constants.json";
import BreadCrumbs from "../general/BreadCrumbs";
import helperUtils from "../../utils/helperUtils";
import responseUtils from "../../utils/responseUtils";
import { SkeletonTheme } from "react-loading-skeleton";

function UserList() {
  const listInnerRef = useRef(null);
  const navigate = useNavigate(); // for Navigate
  const location = useLocation(); // for Location
  const [cookies] = useCookies(); //Cookies

  // State variables
  const [status, setStatus] = useState(true);
  const [invokeGetUsersList, setInvokeGetUsersList] = useState(true);
  const [usersList, setUsersList] = useState(null);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [toggleStatus, setToggleStatus] = useState(constants.ENABLE);
  const [toggleId, setToggleId] = useState("");
  const [singleDeleteId, setSingleDeleteId] = useState([]);
  const [toggleStatusResponse, setToggleStatusResponse] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [confirmActivePopup, setConfirmActivePopup] = useState(false);
  const [confirmInactivePopup, setConfirmInactivePopup] = useState(false);
  const [confirmTrashPopup, setConfirmTrashPopup] = useState(false);
  const [confirmSingleTrashPopup, setConfirmSingleTrashPopup] = useState(false);
  const [confirmStatusPopup, setConfirmStatusPopup] = useState(false);

  const [activeConfirm, setActiveConfirm] = useState(false);
  const [inactiveConfirm, setInactiveConfirm] = useState(false);
  const [trashConfirm, setTrashConfirm] = useState(false);
  const [singleTrashConfirm, setSingleTrashConfirm] = useState(false);
  const [statusConfirm, setStatusConfirm] = useState(false);
  const [innerRef, setInnerRef] = useState(null);
  const [isDataFetching, setIsDataFetching] = useState(true);
  const [maxDistReached, setMaxDistReached] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [baseColor, setBaseColor] = useState();
  const [highlightColor, setHighlightColor] = useState();

  // Setting skeleton loader colors
  useEffect(() => {
    if (cookies[constants.MODE] === "dark") {
      setBaseColor("#000000");
      setHighlightColor("#242424");
    } else {
      setBaseColor("#c6c6c6");
      setHighlightColor("white");
    }
  }, [cookies]);
  // Check bottom Scroll reached
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onScroll = () => {
    if (innerRef) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight;
      if (isNearBottom && !isDataFetching && !maxDistReached) {
        setSkip((prev) => prev + 10);
        setInvokeGetUsersList(true);
      }
    } else {
      console.error("on bottom scroll error");
    }
  };
  const onActiveClose = () => setConfirmActivePopup(false);
  const onInactiveClose = () => setConfirmInactivePopup(false);
  const onTrashClose = () => {
    setConfirmTrashPopup(false);
  };
  const onSingleTrashClose = () => setConfirmSingleTrashPopup(false);
  const onStatusClose = () => setConfirmStatusPopup(false);
  const onFilterClose = () => setShowFilter(false);

  const confirmActiveHandler = (confirmActiveStatus) => {
    setActiveConfirm(confirmActiveStatus);
  };
  const confirmInactiveHandler = (confirmInactiveStatus) => {
    setInactiveConfirm(confirmInactiveStatus);
  };
  const confirmTrashHandler = (confirmTrashStatus) => {
    setTrashConfirm(confirmTrashStatus);
  };
  const confirmSingleTrashHandler = (confirmSingleTrashStatus) => {
    setSingleTrashConfirm(confirmSingleTrashStatus);
  };
  const confirmStatusHandler = (confirmStatus) => {
    setStatusConfirm(confirmStatus);
    if (!confirmStatus) setStatus(!status);
  };

  // CheckBox
  const checkBoxHandler = (e) => {
    const { name, checked } = e.target;

    if (name === "allSelect") {
      let tempUser = usersList.map((user) => {
        return { ...user, isChecked: checked };
      });
      let filteredUsers = tempUser.reduce(function (acc, curr) {
        if (curr.isChecked === true) {
          acc.push(curr._id);
        }
        return acc;
      }, []);
      setUsersList(tempUser);
      setCheckedUsers(filteredUsers);
    } else {
      let tempUser = usersList.map((user) =>
        user._id === name ? { ...user, isChecked: checked } : user
      );
      let filteredUsers = tempUser.reduce(function (acc, curr) {
        if (curr.isChecked === true) {
          acc.push(curr._id);
        }
        return acc;
      }, []);
      setUsersList(tempUser);
      setCheckedUsers(filteredUsers);
    }
  };

  // refresh
  const refreshHandler = () => {
    setIsLoading(true);
    setSearch("");
    setSkip(0);
    setInvokeGetUsersList(true);
  };

  // api for delete button
  const deleteUserHandler = async (id) => {
    let params = {
      id: checkedUsers,
    };
    if (id) params.id = [id];
    const responseData = await invokeApi(
      config.baseUrl + apiList.deleteUser,
      params,
      cookies
    );
    if (responseData.customcode === 200) {
      responseUtils.showToster(responseData);
      setInvokeGetUsersList(true);
    }
  };

  // api for active button
  const changeStatusActiveUserHandler = async (id) => {
    let params = {
      id: checkedUsers,
      status: "ENABLE",
    };
    if (id) params.id = [id];
    const responseData = await invokeApi(
      config.baseUrl + apiList.changeStatusUser,
      params,
      cookies
    );
    if (responseData.customcode === 200) {
      responseUtils.showToster(responseData);
      setInvokeGetUsersList(true);
      setToggleStatusResponse(true);
    }
  };

  // api for inactive button
  const changeStatusInactiveUserHandler = async (id) => {
    let params = {
      id: checkedUsers,
      status: "DISABLE",
    };
    if (id) params.id = [id];
    const responseData = await invokeApi(
      config.baseUrl + apiList.changeStatusUser,
      params,
      cookies
    );
    if (responseData.customcode === 200) {
      responseUtils.showToster(responseData);
      setInvokeGetUsersList(true);
      setToggleStatusResponse(true);
    }
  };

  if (trashConfirm) {
    deleteUserHandler();
    setTrashConfirm(false);
    setCheckedUsers([]);
  }
  if (singleTrashConfirm) {
    deleteUserHandler(singleDeleteId);
    setSingleTrashConfirm(false);
  }
  if (activeConfirm) {
    console.log("coming");
    changeStatusActiveUserHandler();
    setActiveConfirm(false);
    setCheckedUsers([]);
  }
  if (inactiveConfirm) {
    console.log("comingInavtive");
    changeStatusInactiveUserHandler();
    setInactiveConfirm(false);
    setCheckedUsers([]);
  }
  if (statusConfirm) {
    console.log("coming");
    if (toggleStatus === constants.ENABLE) {
      changeStatusInactiveUserHandler(toggleId);
    } else {
      changeStatusActiveUserHandler(toggleId);
    }
    setStatusConfirm(false);
  }

  // functions

  function fetchFilterData(filterData) {
    if (filterData?.tableLimit) {
      setSkip(0);
      setInvokeGetUsersList(true);
      setLimit(filterData?.tableLimit);
    }
    if (filterData?.tableListType) {
      setSkip(0);
      setInvokeGetUsersList(true);
      setFilter(filterData?.tableListType);
    }
  }

  // onScroll effect handler
  useEffect(() => {
    setInnerRef(listInnerRef.current);
    if (innerRef) {
      innerRef.addEventListener("scroll", onScroll);
      // Clean-up
      return () => {
        innerRef.removeEventListener("scroll", onScroll);
      };
    }
  }, [innerRef, onScroll]);

  // get template data
  useEffect(() => {
    const getUsersList = async () => {
      setIsDataFetching(true);
      let params = {
        skip,
        limit: limit,
        search,
        filter: filter === constants.ARCHIVE.toUpperCase() ? filter : "",
      };
      let response = await invokeApi(
        config.baseUrl + apiList.getUsersList,
        params,
        cookies
      );

      if (response.customcode === 200) {
        if (response.data.length < 10) {
          setMaxDistReached(true);
        } else {
          setMaxDistReached(false);
        }
        if (skip > 0) {
          setUsersList((prev) => [...prev, ...response.data]);
        } else {
          setUsersList(response.data);
        }
        setTotalCount(response.total);
        setIsLoading(false);
        setIsDataFetching(false);
      }
    };
    if (invokeGetUsersList) {
      setInvokeGetUsersList(false);
      getUsersList();
    }
  }, [cookies, invokeGetUsersList, limit, filter, search, skip]);

   console.log(window.subheadings[0].includes(`${constants.USER}`))
  return (
    <div className="card-with-subheading">
      <div className="sub-heading">
     
        <div className="flex w-full card gap-4 h-fit mb-1 mt-0">
       {window.subheadings[0].includes(`${constants.USER}`)&&(
          <div className="flex gap-x-5">
          
            <div
              className={
                location.pathname === constants.USERSNAVIGATE
                  ? "font-bold flex gap-1 cursor-pointer"
                  : "flex gap-1 cursor-pointer"
              }
              onClick={() => {
                navigate(constants.USERSNAVIGATE);
              }}
            >
              {constants.USERS}
            </div>
         
          </div>
          )}
          
        </div>
     
      </div>
      {/* cARD CONTENT  */}
      <div className="card-content">
        <div className="flex mb-1 mr-2 justify-between">
          {/* Bread crumps */}
          <BreadCrumbs nav1={constants.USERS} />
          <div className="flex gap-x-3">
            {/* User list Operation buttons (Active Inactive, Delete) */}
            {checkedUsers.length > 0 && (
              <div className="flex gap-x-3">
                <div
                  onClick={() => {
                    setConfirmActivePopup(true);
                  }}
                >
                  <ActionButton
                    text={constants.ACTIVE}
                    color={constants.GREEN}
                  />
                </div>
                <div
                  onClick={() => {
                    setConfirmInactivePopup(true);
                  }}
                >
                  <ActionButton
                    text={constants.INACTIVE}
                    color={constants.BLUE}
                  />
                </div>
                <div
                  onClick={() => {
                    setConfirmTrashPopup(true);
                  }}
                >
                  <ActionButton text={constants.DELETE} color={constants.RED} />
                </div>
              </div>
            )}
            {/* Filter, add, refresh buttons  */}
            <div className="flex mr-2">
              <TbFilterCog
                onClick={() => {
                  setShowFilter(true);
                }}
                className="mr-4 text-4xl p-1 border-[1px] cursor-pointer text-[#121212] rounded-lg border-black dark:border-zinc-200 dark:text-zinc-200"
              />

              <MdOutlineAdd
                onClick={() => {
                  navigate(`/users/${constants.ADD}`);
                }}
                className="mr-4 text-4xl p-1 border-[1px] cursor-pointer text-[#121212] rounded-lg border-black dark:border-zinc-200 dark:text-zinc-200"
              />
              <MdRefresh
                onClick={() => {
                  refreshHandler();
                }}
                className="mr-4 text-4xl p-1 border-[1px] cursor-pointer text-[#121212] rounded-lg border-black dark:border-zinc-200 dark:text-zinc-200"
              />
              <form
                onSubmit={(ev) => {
                  ev.preventDefault();
                  setSkip(0);
                  setIsLoading(true);
                  setInvokeGetUsersList(true);
                }}
                className="w-[240px] rounded-lg flex items-center justify-between bg-tranparent border-black dark:border-white border-[1px] text-[#121212] dark:text-white"
              >
                <input
                  className="w-[200px] h-fit px-4 rounded-xl dark:text-white dark:border-white bg-transparent outline-none"
                  placeholder="Search.."
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  value={search}
                />
                <button type="submit">
                  <BiSearch className="text-xl mr-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="text-xs font-semibold flex justify-end m-2 text-gray-800 dark:text-white cursor-default">
          {constants.TOTAL} {constants.USERS} : {totalCount}
        </div>

        <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
          {isLoading ? (
            <ListSkeleton />
          ) : (
            <>
              {usersList?.length > 0 ? (
                <div
                  className="w-full h-[500px] overflow-y-auto overflow-x-scroll"
                  ref={listInnerRef}
                >
                  <table className="w-full text-sm text-left">
                    <thead className="z-10 sticky top-0 text-xs text-gray-700 uppercase bg-zinc-200 dark:bg-zinc-700 dark:text-gray-400">
                      <tr className="cursor-default z-10">
                        <th scope="col" className="px-6 py-3">
                          <input
                            type="checkbox"
                            className="h-[15px] w-[15px] cursor-pointer"
                            name="allSelect"
                            checked={
                              usersList.filter(
                                (user) => user?.isChecked !== true
                              ).length < 1
                            }
                            onChange={checkBoxHandler}
                          />
                        </th>

                        <th scope="col" className="px-6 py-3">
                          {constants.ID}
                        </th>

                        <th scope="col" className="px-6 py-3">
                          {constants.NAME}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {constants.EMAIL}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {constants.PHONE}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {constants.DATEOFBIRTH}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {constants.GENDER}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {constants.REGISTRATIONDATE}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {constants.STATUS}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {constants.ACTIONS}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList?.map((data, index) => {
                        return (
                          <tr
                            key={index}
                            className="bg-white border-b dark:bg-[#121212] dark:border-gray-700 cursor-default"
                          >
                            <td
                              scope="row"
                              className="px-6 py-4 font-medium text-[#121212] whitespace-nowrap dark:text-white"
                            >
                              <input
                                className="h-[15px] w-[15px] cursor-pointer"
                                type="checkbox"
                                name={data._id}
                                id={data._id}
                                checked={
                                  checkedUsers.includes(data._id) ||
                                  data?.isChecked ||
                                  false
                                }
                                onChange={checkBoxHandler}
                              />
                            </td>
                            <td className="px-6 py-4 text-[#121212] dark:text-white">
                              {index + 1}
                            </td>
                            <td
                              scope="row"
                              className="px-6 py-4 font-medium text-[#121212] whitespace-nowrap dark:text-white"
                            >
                              {`${data.firstName} ${data.lastName}`}
                            </td>
                            <td className="px-6 py-4 text-[#121212] dark:text-white">
                              {data.email}
                            </td>
                            <td className="px-6 py-4 text-black dark:text-white">
                              {`${data.phone.code} ${data.phone.number}`}
                            </td>
                            <td className="px-6 py-4 text-black dark:text-white">
                              {helperUtils.getDateFormat(
                                data.dob,
                                "dd/mm/yyyy"
                              )}
                            </td>
                            <td className="px-6 py-4 text-black dark:text-white">
                              {constants[data.gender]}
                            </td>
                            <td className="px-6 py-4 text-black dark:text-white">
                              {/* registered date */}
                              {helperUtils.getDateFormat(
                                data.registerDate,
                                "dd/mm/yyyy"
                              )}
                            </td>
                            <td
                              className="cursor-pointer px-6 py-4"
                              onClick={() => {
                                setStatus(!status);
                                setToggleStatus(
                                  data.status === constants.ENABLE
                                    ? constants.ENABLE
                                    : constants.DISABLE
                                );
                                setToggleId(data._id);
                                setConfirmStatusPopup(true);
                              }}
                            >
                              <ToggleButton
                                status={
                                  data.status === constants.ENABLE
                                    ? true
                                    : false
                                }
                                statusResponse={
                                  toggleStatusResponse ? true : false
                                }
                              />
                            </td>
                            <td className="px-6 py-4 ">
                              <div className="flex gap-4 ">
                                <div
                                  className="cursor-pointer"
                                  onClick={() =>
                                    navigate(`/users/view`, {
                                      state: data,
                                    })
                                  }
                                >
                                  <TbEye className="text-[#121212] dark:text-white text-lg" />
                                </div>

                                <div
                                  className="hover:cursor-pointer"
                                  onClick={() =>
                                    navigate(`/users/${constants.EDIT}`, {
                                      state: data,
                                    })
                                  }
                                >
                                  <MdEdit className="text-black dark:text-white text-lg" />
                                </div>
                                <div
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setSingleDeleteId(data._id);
                                    setConfirmSingleTrashPopup(true);
                                  }}
                                >
                                  <MdOutlineDelete className="text-black dark:text-white text-lg" />
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-zinc-700 text-lg text-center font-semibold">
                  No data available
                </p>
              )}
            </>
          )}
        </SkeletonTheme>
      </div>

      <ConformationPopup
        open={confirmActivePopup}
        close={onActiveClose}
        text={constants.CHANGESTATUSPOPUPTEXT}
        heading={constants.CHANGESTATUSPOPUPHEADING}
        submitHandler={confirmActiveHandler}
      />
      <ConformationPopup
        open={confirmInactivePopup}
        close={onInactiveClose}
        text={constants.CHANGESTATUSPOPUPTEXT}
        heading={constants.CHANGESTATUSPOPUPHEADING}
        submitHandler={confirmInactiveHandler}
      />
      <ConformationPopup
        open={confirmTrashPopup}
        close={onTrashClose}
        text={constants.TRASHPOPUPTEXT}
        heading={constants.TRASHPOPUPHEADING}
        submitHandler={confirmTrashHandler}
      />
      <ConformationPopup
        open={confirmSingleTrashPopup}
        close={onSingleTrashClose}
        text={constants.CHANGESTATUSPOPUPTEXT}
        heading={constants.CHANGESTATUSPOPUPHEADING}
        submitHandler={confirmSingleTrashHandler}
      />
      <ConformationPopup
        open={confirmStatusPopup}
        close={onStatusClose}
        text={constants.CHANGESTATUSPOPUPTEXT}
        heading={constants.CHANGESTATUSPOPUPHEADING}
        submitHandler={confirmStatusHandler}
      />
      <Sidebar
        open={showFilter}
        close={onFilterClose}
        fetchFilterData={fetchFilterData}
        defaultListParams={{ limit: limit, filter: filter }}
      />
    </div>
  );
}

export default UserList;
