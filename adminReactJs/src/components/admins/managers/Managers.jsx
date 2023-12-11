import { useState, useRef, useEffect } from "react";
import { TbEye, TbFilterCog } from "react-icons/tb";
import {
  MdEdit,
  MdOutlineAdd,
  MdOutlineDelete,
  MdRefresh,
} from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";

// Import Componnents
import Spinner from "../../general/Spinner";
import BreadCrumbs from "../../general/BreadCrumbs";
import ActionButton from "../../general/ActionButton";
import ConformationPopup from "../../modals/ConformationPopup";
import ToggleButton from "../../general/ToggleButton";

// Import Files
import constants from "../../../json/constants.json";
import { config } from "../../../utils/configUtils";
import { apiList, invokeApi } from "../../../utils/apiServiceUtils";
import responseUtils from "../../../utils/responseUtils";
import helperUtils from "../../../utils/helperUtils";
import Sidebar from "../../general/NewSidebar";

function Managers() {
  const listInnerRef = useRef(null);
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const location = useLocation();
  const [templateData, setTemplateData] = useState([]);
  const [invokeData, setInvokeData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmActivePopup, setConfirmActivePopup] = useState(false);
  const [confirmInactivePopup, setConfirmInactivePopup] = useState(false);
  const [confirmStatusPopup, setConfirmStatusPopup] = useState(false);
  const [confirmTrashPopup, setConfirmTrashPopup] = useState(false);
  const [toggleId, setToggleId] = useState(null);
  const [toggleStatus, setToggleStatus] = useState(null);
  const [toggleStatusResponse, setToggleStatusResponse] = useState(false);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [filter, setFilter] = useState("");
  const [innerRef, setInnerRef] = useState(null);
  const [isDataFetching, setIsDataFetching] = useState(true);
  const [maxDistReached, setMaxDistReached] = useState(false);
  const [totalCount, setTotalCount] = useState(null);

  // Pop up close handler
  const onActiveClose = () => setConfirmActivePopup(false);
  const onInactiveClose = () => setConfirmInactivePopup(false);
  const onStatusClose = () => setConfirmStatusPopup(false);
  const onTrashClose = () => setConfirmTrashPopup(false);
  const onFilterClose = () => setShowFilter(false);

  // Check bottom Scroll reached
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onScroll = () => {
    if (innerRef) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight;
      if (isNearBottom && !isDataFetching && !maxDistReached) {
        setSkip((prev) => prev + 10);
        setInvokeData(true);
      }
    } else {
      console.error("on bottom scroll error");
    }
  };

  // popup confirm status handler
  const confirmStatusHandler = (confirmStatus) => {
    if (confirmStatus) {
      changeStatusRoles();
    } else {
      return null;
    }
  };

  const confirmActiveHandler = (confirmActiveStatus) => {
    if (confirmActiveStatus) {
      changeStatusRoles();
    } else {
      return null;
    }
  };

  const confirmInactiveHandler = (confirmInactiveStatus) => {
    if (confirmInactiveStatus) {
      changeStatusRoles();
    } else {
      return null;
    }
  };

  const confirmTrashHandler = (confirmTrashStatus) => {
    if (confirmTrashStatus) {
      deleteRoles();
    } else {
      return null;
    }
  };

  // changestatus role
  const changeStatusRoles = async () => {
    let params = {
      id: toggleId,
      status: toggleStatus,
    };
    let response = await invokeApi(
      config.baseUrl + apiList.changeStatusManagers,
      params,
      cookies
    );
    if (response.customcode === 200) {
      responseUtils.showToster(response);
      setInvokeData(true);
      setToggleId(null);
      setToggleStatus(null);
      setToggleStatusResponse(true);
    }
  };

  // delete roles
  const deleteRoles = async () => {
    let params = {
      id: toggleId,
    };
    let response = await invokeApi(
      config.baseUrl + apiList.deleteManagers,
      params,
      cookies
    );
    if (response.customcode === 200) {
      responseUtils.showToster(response);
      setInvokeData(true);
      setToggleId(null);
      setToggleStatus(null);
    }
  };

  // Fetch filter data
  function fetchFilterData(filterData) {
    if (filterData?.tableLimit) {
      setSkip(0);
      setInvokeData(true);
      setLimit(filterData?.tableLimit);
    }
    if (filterData?.tableListType) {
      setSkip(0);
      setInvokeData(true);
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
    const getManagersList = async () => {
      setIsDataFetching(true);
      let params = {
        skip,
        limit: limit,
        search,
        filter: filter === constants.ARCHIVE.toUpperCase() ? filter : "",
      };
      let response = await invokeApi(
        config.baseUrl + apiList.getManagersList,
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
          setTemplateData((prev) => [...prev, ...response.data]);
        } else {
          setTemplateData(response.data);
        }
        setTotalCount(response.total);
        setIsLoading(false);
        setIsDataFetching(false);
      }
    };

    if (invokeData) {
      setInvokeData(false);
      getManagersList();
    }
  }, [cookies, invokeData, limit, filter, search, skip]);

  return (
    <>
      <div className="card-with-subheading">
        {/* subheading */}
        <div className="subheading">
          <div className="flex gap-x-5 cursor-pointer">
            <div
              className={
                location.pathname === constants.ROLESNAVIGATE
                  ? "font-semibold flex gap-1"
                  : "flex gap-1"
              }
              onClick={() => {
                navigate("/roles");
              }}
            >
              {constants.ROLES}
            </div>
            <div
              className={"flex gap-1 cursor-pointer"}
              onClick={() => {
                navigate("/managers");
              }}
            >
              {constants.MANAGERS}
            </div>
          </div>
        </div>

        {/* content */}
        <div className="card-content">
          <div className="flex flex-row items-center mb-5  justify-between">
            {/* Bread crumps */}
            <BreadCrumbs nav1={constants.MANAGERS} />
            <div className="flex flex-row space-x-4">
              {/* Active buttons */}
              {templateData?.some((el) => el.isChecked === true) > 0 && (
                <div className="flex gap-x-3">
                  <div
                    onClick={() => {
                      let tempData = [...templateData];
                      let mapData = tempData
                        ?.filter((el) => el.isChecked === true)
                        .map((el) => el._id);
                      setToggleId(mapData);
                      setToggleStatus(constants.ENABLE);
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
                      let tempData = [...templateData];
                      let mapData = tempData
                        ?.filter((el) => el.isChecked === true)
                        .map((el) => el._id);
                      setToggleId(mapData);
                      setToggleStatus(constants.DISABLE);
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
                      let tempData = [...templateData];
                      let mapData = tempData
                        ?.filter((el) => el.isChecked === true)
                        .map((el) => el._id);
                      setToggleId(mapData);
                      setConfirmTrashPopup(true);
                    }}
                  >
                    <ActionButton
                      text={constants.DELETE}
                      color={constants.RED}
                    />
                  </div>
                </div>
              )}
              {/* Search filter and all */}
              <div className="flex mr-2">
                <TbFilterCog
                  className="mr-4 text-4xl p-1 border-[1px] text-[#121212] rounded-lg border-black dark:border-zinc-200 dark:text-zinc-200"
                  onClick={() => setShowFilter(true)}
                />
                <MdOutlineAdd
                  onClick={() => {
                    navigate(`/managers/${"add"}`);
                  }}
                  className="cursor-pointer mr-4 text-4xl p-1 border-[1px] text-[#121212] rounded-lg border-black dark:border-zinc-200 dark:text-zinc-200"
                />
                <MdRefresh
                  className="mr-4 cursor-pointer text-4xl p-1 border-[1px] text-[#121212] rounded-lg border-black dark:border-zinc-200 dark:text-zinc-200"
                  onClick={() => {
                    setIsLoading(true);
                    setInvokeData(true);
                    setSearch("");
                    setSkip(0);
                  }}
                />

                <form
                  onSubmit={(ev) => {
                    ev.preventDefault();
                    setSkip(0);
                    setIsLoading(true);
                    setInvokeData(true);
                  }}
                  className="w-[240px] rounded-lg flex items-center justify-between bg-tranparent border-black dark:border-white border-[1px] text-[#121212] dark:text-white"
                >
                  <div>
                    <input
                      placeholder="Search..."
                      className="w-[200px] h-fit px-4 rounded-xl dark:text-white dark:border-white bg-transparent outline-none"
                      value={search}
                      onChange={(ev) => setSearch(ev.target.value)}
                    />
                    <button type="submit">
                      <BiSearch className="text-xl mr-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="text-xs font-semibold flex justify-end m-2 text-gray-800 dark:text-zinc-300 cursor-default">
            {constants.TOTAL} {constants.USERS} : {totalCount}
          </div>

          {isLoading ? (
            <div className="h-fit w-fit mx-auto mt-[200px]">
              <Spinner />
            </div>
          ) : (
            <>
              {templateData?.length > 0 ? (
                <div
                  className="w-full h-[500px] overflow-y-scroll overflow-x-scroll"
                  ref={listInnerRef}
                >
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300">
                      <tr>
                        <th scope="col" className="px-6 py-3 ">
                          <input
                            type="checkbox"
                            className="h-[15px] w-[15px] cursor-pointer"
                            name="allSelect"
                            checked={templateData?.every(
                              (check) => check.isChecked
                            )}
                            onChange={() => {
                              let tempData = [...templateData];
                              tempData.map(
                                (el) => (el.isChecked = !el.isChecked)
                              );
                              setTemplateData(tempData);
                            }}
                          />
                        </th>

                        <th scope="col" className="px-6 py-3 cursor-default">
                          ID
                        </th>

                        <th scope="col" className="px-6 py-3 cursor-default">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 cursor-default">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 cursor-default">
                          Phone
                        </th>
                        <th scope="col" className="px-6 py-3 cursor-default">
                          Gender
                        </th>
                        <th scope="col" className="px-6 py-3 cursor-default">
                          Register Date
                        </th>
                        <th scope="col" className="px-6 py-3 cursor-default">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 cursor-default">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {templateData?.map((data, index) => {
                        return (
                          <tr
                            key={index}
                            className="bg-white border-b dark:bg-[#121212] dark:border-gray-700"
                          >
                            <td
                              scope="row"
                              className="px-6 py-4 font-medium text-[#121212] whitespace-nowrap dark:text-white"
                            >
                              <input
                                className="h-[15px] w-[15px] cursor-pointer"
                                type="checkbox"
                                name={data._id}
                                checked={data?.isChecked ? true : false}
                                onChange={() => {
                                  let tempData = [...templateData];
                                  tempData[index].isChecked =
                                    !tempData[index].isChecked;
                                  setTemplateData(tempData);
                                }}
                              />
                            </td>
                            <td className="px-6 py-4 text-[#121212] dark:text-white cursor-default">
                              {index + 1}
                            </td>
                            <td
                              scope="row"
                              className="px-6 py-4 font-small text-[#121212] whitespace-nowrap dark:text-white cursor-default"
                            >
                              {`${data.firstName} ${data.lastName}`}
                            </td>
                            <td className="px-6 py-4 text-[#121212] dark:text-white cursor-default">
                              {data.email}
                            </td>
                            <td className="px-6 py-4 text-black dark:text-white cursor-default">
                              {`${data.phone.code} ${data.phone.number}`}
                            </td>
                            {/* <td className="px-6 py-4 text-black dark:text-white">
                            {getDateFormat(data.dob, "dd/mm/yyyy")}
                          </td> */}
                            <td className="px-6 py-4 text-black dark:text-white cursor-default">
                              {`${data.gender}`}
                            </td>
                            <td className="px-6 py-4 text-black dark:text-white cursor-default">
                              {/* registered date */}
                              {helperUtils.getDateFormat(
                                data.registerDate,
                                "dd/mm/yyyy"
                              )}
                            </td>
                            <td
                              className="cursor-pointer px-6 py-4"
                              onClick={() => {
                                setToggleId([data._id]);
                                setToggleStatus(
                                  data.status === constants.ENABLE
                                    ? constants.DISABLE
                                    : constants.ENABLE
                                );
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

                            <td className="px-6 py-4">
                              <div className="flex gap-4">
                                <TbEye
                                  className="text-[#121212] dark:text-white text-lg cursor-pointer"
                                  onClick={() =>
                                    navigate(`/notifications/template/view`, {
                                      state: data,
                                    })
                                  }
                                />

                                <MdEdit
                                  className="text-black dark:text-white text-lg cursor-pointer"
                                  onClick={() =>
                                    navigate(`/managers/${"edit"}`, {
                                      state: data,
                                    })
                                  }
                                />
                                <div
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setToggleId([data._id]);
                                    setConfirmTrashPopup(true);
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
        </div>
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
        open={confirmStatusPopup}
        close={onStatusClose}
        text={constants.CHANGESTATUSPOPUPTEXT}
        heading={constants.CHANGESTATUSPOPUPHEADING}
        submitHandler={confirmStatusHandler}
      />
      <ConformationPopup
        open={confirmTrashPopup}
        close={onTrashClose}
        text={constants.TRASHPOPUPTEXT}
        heading={constants.TRASHPOPUPHEADING}
        submitHandler={confirmTrashHandler}
      />
      <Sidebar
        open={showFilter}
        close={onFilterClose}
        fetchFilterData={fetchFilterData}
        defaultListParams={{ limit: limit, filter: filter }}
      />
    </>
  );
}
export default Managers;
