import { useState, useRef, useEffect } from "react";
import { TbFilterCog } from "react-icons/tb";
import { CgDanger } from "react-icons/cg";
import { MdFeedback, MdRefresh } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";

// Import Componnents
import BreadCrumbs from "../general/BreadCrumbs";
import ConformationPopup from "../modals/ConformationPopup";
import Button from "../general/Button";
import ActionButton from "../general/ActionButton";
import FeedbackViewPopup from "../modals/FeedbackViewPopup";
import Sidebar from "../general/NewSidebar";
import ListSkeleton from "../general/ListSkeleton";

// Import Files
import constants from "../../json/constants.json";
import { config } from "../../utils/configUtils";
import { apiList, invokeApi } from "../../utils/apiServiceUtils";
import helperUtils from "../../utils/helperUtils";
import responseUtils from "../../utils/responseUtils";

function FeedbackList() {
  const listInnerRef = useRef(null);
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const location = useLocation();
  const [feedbackData, setFeedbackData] = useState([]);
  const [invokeData, setInvokeData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [filter, setFilter] = useState("");
  const [innerRef, setInnerRef] = useState(null);
  const [isDataFetching, setIsDataFetching] = useState(true);
  const [maxDistReached, setMaxDistReached] = useState(false);
  const [totalCount, setTotalCount] = useState(null);
  const [status, setStatus] = useState("");
  const [statusId, setStatusId] = useState(null);
  const [confirmPopupEdit, setConfirmPopupEdit] = useState(false);
  const [feedbackViewPopup, setFeedbackViewPopup] = useState(false);
  const [showResolveList, setShowResolveList] = useState(false);
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

  // Pop up close handler
  const onFilterClose = () => setShowFilter(false);
  const onClosedFeedback = () => setFeedbackViewPopup(false);

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
      console.error("Not working");
    }
  };

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

  const onClosedEdit = () => setConfirmPopupEdit(false);
  // popup confirm status handler
  const confirmHandlerEdit = (confirmActiveStatus) => {
    if (confirmActiveStatus) {
      changeStatusFeedback();
    } else {
      return null;
    }
  };
  // popup confirm status handler
  const resolveHandler = (resolveStatus) => {
    if (resolveStatus) {
      changeStatusFeedback();
    } else {
      return null;
    }
  };
  const clickHandler = (status) => {
    setShowResolveList(status);
    setInvokeData(true);
  };

  // changestatus feedback
  const changeStatusFeedback = async () => {
    let params = {
      id: [statusId],
      status,
    };
    let response = await invokeApi(
      config.baseUrl + apiList.changeStatusFeedback,
      params,
      cookies
    );
    if (response.customcode === 200) {
      responseUtils.showToster(response);
      setInvokeData(true);
      onClosedFeedback();
    } else {
      alert("Something went wrong");
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

  // get template data
  useEffect(() => {
    const getFeedbackList = async () => {
      setIsDataFetching(true);
      let params = {
        skip,
        limit: limit,
        search,
        filter:
          filter === constants.ARCHIVE.toUpperCase()
            ? filter
            : showResolveList
            ? "RESOLVED"
            : "",
      };
      let response = await invokeApi(
        config.baseUrl + apiList.getFeedbackList,
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
          setFeedbackData((prev) => [...prev, ...response.data]);
        } else {
          setFeedbackData(response.data);
        }
        setTotalCount(response.total);
        setIsLoading(false);
        setIsDataFetching(false);
      }
    };
    if (invokeData) {
      setInvokeData(false);
      getFeedbackList();
    }
  }, [cookies, invokeData, limit, filter, search, skip, showResolveList]);

  return (
    <>
      <div className="card-with-subheading">
        {/* subheading */}
        <div className="subheading">
          <div className="flex gap-x-5">
            <div
              className={
                location.pathname === constants.FEEDBACKNAVIGATE
                  ? "font-semibold flex gap-1"
                  : "flex gap-1"
              }
            >
              {constants.FEEDBACK}
            </div>
            {/* <div
              className={"flex gap-1 cursor-pointer"}
              onClick={() => {
                navigate("/feedbacks");
              }}
            >
              {constants.SENDNOTIFICATIONS}
            </div> */}
          </div>
        </div>

        {/* content */}
        <div className="card-content">
          <div className="flex flex-row items-center mb-5  justify-between">
            {/* Bread crumps */}
            <BreadCrumbs
              nav1={constants.FEEDBACK}
              nav2={showResolveList && "Resolved List"}
              clickHandler={clickHandler}
            />
            <div className="flex flex-row space-x-4">
              {/* Search filter and all */}
              <div className="flex mr-2">
                <TbFilterCog
                  className="mr-4 text-4xl p-1 border-[1px] text-[#121212] rounded-lg border-black dark:border-zinc-200 dark:text-zinc-200"
                  onClick={() => setShowFilter(true)}
                />
                <MdRefresh
                  className="mr-4 cursor-pointer text-4xl p-1 border-[1px] text-[#121212] rounded-lg border-black dark:border-zinc-200 dark:text-zinc-200"
                  onClick={() => {
                    setIsLoading(true);
                    setInvokeData(true);
                    setSearch("");
                  }}
                />

                <form
                  onSubmit={(ev) => {
                    ev.preventDefault();
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
          <div className="flex flex-row items-center space-x-5 justify-end mb-5">
            <div className="text-xs font-semibold flex justify-end m-2 text-gray-800 dark:text-white">
              {constants.TOTAL} {constants.FEEDBACK} : {totalCount}
            </div>
            {!showResolveList && (
              <div
                className="w-fit bg-zinc-300 rounded-md border-[1px] border-zinc-700"
                onClick={() => {
                  setShowResolveList(!showResolveList);
                  setInvokeData(true);
                }}
              >
                <ActionButton
                  text={constants.RESOLVELIST}
                  // color={constants.BLUE}
                />
              </div>
            )}
          </div>
          <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
            {isLoading ? (
              <ListSkeleton />
            ) : (
              <>
                {feedbackData?.length > 0 ? (
                  <div
                    className="w-full h-[500px] overflow-y-scroll overflow-x-scroll"
                    ref={listInnerRef}
                  >
                    <table className="w-full text-sm text-left">
                      <thead className="sticky top-0 z-10 text-xs text-gray-700 uppercase bg-zinc-200 dark:bg-zinc-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            ID
                          </th>

                          <th scope="col" className="px-6 py-3">
                            Users
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Created At
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Feedback Type
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Feedback Status
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {feedbackData?.map((data, index) => {
                          return (
                            <tr
                              key={index}
                              className="bg-white border-b dark:bg-[#121212] dark:border-gray-700"
                            >
                              <td className="px-6 py-4 text-[#121212] dark:text-white">
                                {index + 1}
                              </td>
                              <td
                                scope="row"
                                className="px-6 py-4 font-medium text-[#121212] whitespace-nowrap dark:text-white"
                              >
                                <div className="flex flex-col space-y-1">
                                  <div>{data.user.userName}</div>
                                  <div>{data.user.email}</div>
                                  <div>
                                    {data.user.phone.code}{" "}
                                    {data.user.phone.number}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-[#121212] dark:text-white">
                                {helperUtils.getDateFormat(
                                  data.feedbackDate,
                                  "dd/mm/yyyy"
                                )}
                              </td>
                              <td className="px-6 py-4 text-[#121212] dark:text-white">
                                <div className="w-[150px] py-1">
                                  {data.status === "NEW" ? (
                                    <div
                                      className="cursor-pointer w-fit"
                                      onClick={() => {
                                        setStatus(constants.PROGRESS);
                                        setConfirmPopupEdit(true);
                                        setStatusId(data._id);
                                      }}
                                    >
                                      <ActionButton
                                        text={constants.CLICKTOPROGRESS}
                                        color={constants.BLUE}
                                      />
                                    </div>
                                  ) : data.status === "PROGRESS" ? (
                                    <div
                                      className="cursor-pointer w-fit"
                                      onClick={() => {
                                        setStatus(constants.RESOLVED);
                                        setConfirmPopupEdit(true);
                                        setStatusId(data._id);
                                      }}
                                    >
                                      <ActionButton
                                        text={constants.CLICKTORESOLVE}
                                        color={constants.GREEN}
                                      />
                                    </div>
                                  ) : data.status === "RESOLVED" ? (
                                    <div className="w-fit">
                                      <ActionButton
                                        text={constants.RESOLVED}
                                        color={constants.GREEN}
                                      />
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-[#121212] font-semibold dark:text-white">
                                {data.type === "MINOR" ? (
                                  <div className="text-blue-400 flex items-center space-x-2">
                                    <CgDanger />
                                    <p>{data.type}</p>
                                  </div>
                                ) : data.type === "MAJOR" ? (
                                  <div className="text-red-400 flex items-center space-x-2">
                                    <CgDanger />
                                    <p>{data.type}</p>
                                  </div>
                                ) : data.type === "CRITICAL" ? (
                                  <div className="text-red-900 flex items-center space-x-2">
                                    <CgDanger />
                                    <p>{data.type}</p>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </td>

                              <td className="px-6 py-4">
                                <div className="flex gap-4">
                                  <MdFeedback
                                    size={25}
                                    className="text-[#121212] dark:text-white text-lg cursor-pointer"
                                    onClick={() => {
                                      setStatus(data.status);
                                      setStatusId(data._id);
                                      setFeedbackViewPopup(true);
                                    }}
                                  />
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
      </div>
      <ConformationPopup
        open={confirmPopupEdit}
        close={onClosedEdit}
        text={constants.EDITTFEEDBACKPOPUPTEXT}
        heading={constants.EDITTFEEDBACKSTATUS}
        submitHandler={confirmHandlerEdit}
      />
      <Sidebar
        open={showFilter}
        close={onFilterClose}
        fetchFilterData={fetchFilterData}
        defaultListParams={{ limit: limit, filter: filter }}
        showList={false}
      />
      <FeedbackViewPopup
        open={feedbackViewPopup}
        close={onClosedFeedback}
        text={
          "W3Schools is optimized for learning and training. Examples might be simplified to improve reading and learning. Tutorials, references, and examples are constantly reviewed to avoid errors, but we cannot warrant full correctness of all content. While using W3Schools, you agree to have read and accepted our terms of use, cookie and privacy policy.W3Schools is optimized for learning and training. Examples might be simplified to improve reading and learning. Tutorials, references, and examples are constantly reviewed to avoid errors, but we cannot warrant full correctness of all content. While using W3Schools, you agree to have read and accepted our terms of use, cookie and privacy policy.W3Schools is optimized for learning and training. Examples might be simplified to improve reading and learning. Tutorials, references, and examples are constantly reviewed to avoid errors, but we cannot warrant full correctness of all content. While using W3Schools, you agree to have read and accepted our terms of use, cookie and privacy policy.W3Schools is optimized for learning and training. Examples might be simplified to improve reading and learning. Tutorials, references, and examples are constantly reviewed to avoid errors, but we cannot warrant full correctness of all content. While using W3Schools, you agree to have read and accepted our terms of use, cookie and privacy policy."
        }
        heading={constants.FEEDBACKCOMMENTS}
        feedbackStatus={status}
        resolveHandler={resolveHandler}
      />
    </>
  );
}
export default FeedbackList;
