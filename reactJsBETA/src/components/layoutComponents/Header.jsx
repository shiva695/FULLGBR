// @import dependencies
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// @import json
import constants from "../../json/constants.json";

// @import components
import CommonBtn1 from "../generalComponents/CommonBtn1";
import CommonModal from "../generalComponents/CommonModal";
import Pager from "../generalComponents/Pager";
import { TabItem, Slider } from "../generalComponents/TabStyle";

//@import Utils
import { apiList, invokeApi } from "../../utills/apiService";
import { config } from "../../utills/configUtils";

const Header = () => {
  const navigate = useNavigate();
  const tabListRef = useRef();
  const [cookies, setCookie] = useCookies();

  // State variables
  const [value, setValue] = useState(0);
  const childRefs = useRef(new Map());
  const [slider, setSlider] = useState({ left: 0, right: 0 });

  const [isDropdownModalOpen, setIsDropdownModalOpen] = useState(false);
  const [isNotificationModalopen, setIsNotificationModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [recentListData, setRecentListData] = useState(null);
  const [invokeRecentListData, setInvokeRecentListData] = useState(true);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [skip, setSkip] = useState(0);

  const [searchListData, setSearchListData] = useState(null);
  const [invokeSearchListData, setInvokeSearchListData] = useState(true);

  const tabs = [constants.GENERAL, constants.FOLLOWREQUEST];

  // update recent search list
  const updateRecentSearchList = async (id, typeStatus) => {
    let params = {
      matchId: id,
      type: typeStatus,
    };
    const response = await invokeApi(
      config.baseUrl + apiList.updateRecentSearchList,
      params,
      cookies
    );
    if (response.customcode === 200) {
      setSearchUser("");
      if (typeStatus === "ADD") {
        navigate(constants.PATH.NAVIGATEPROFILE);
        setIsDropdownModalOpen(false);
      }
      setInvokeRecentListData(true);
    } else if (response.customcode === 201) {
      navigate(constants.PATH.NAVIGATELOGOUT);
    } else {
      alert("Something went wrong");
    }
  };

  // measure our elements
  useEffect(() => {
    if (isNotificationModalopen) {
      const target = childRefs.current.get(value);
      const container = tabListRef.current;
      if (target) {
        const cRect = container.getBoundingClientRect();

        // when container is `display: none`, width === 0.
        // ignore this case
        if (cRect.width === 0) {
          return;
        }

        const tRect = target.getBoundingClientRect();
        const left = tRect.left - cRect.left;
        const right = cRect.right - tRect.right;

        setSlider({
          hasValue: true,
          left: left + 8,
          right: right + 8,
        });
      }
    }
  }, [value, isNotificationModalopen]);

  //get Recent data
  useEffect(() => {
    const getRecentSearchList = async () => {
      // setIsLoading(true);
      let params = { skip, limit: 10, search: "" };
      const controller = new AbortController();
      const { signal } = controller;
      const response = await invokeApi(
        config.baseUrl + apiList.getRecentSearchList,
        params,
        cookies,
        { signal }
      );
      if (response.customcode === 200) {
        // if (response.data.length < 10) {
        //   setMaxDistReached(true);
        // } else {
        //   setMaxDistReached(false);
        // }
        // if (selectedgameData?.length > 0) {
        //   for (let i = 0; i < selectedgameData?.length; i++) {
        //     for (let j = 0; j < response.data.length; j++) {
        //       if (selectedgameData[i].gameName === response.data[j].gameName) {
        //         response.data.splice(j, 1);
        //       }
        //     }
        //   }
        // }
        // if (skip > 0) {
        //   setGameSearchData((prev) => [...prev, ...response.data]);
        // } else {
        setRecentListData(response.data);
        // }
        // setIsLoading(false);
      } else if (response.customcode === 201) {
        navigate(constants.PATH.NAVIGATELOGOUT);
      } else {
        alert("Something went wrong");
      }

      // UseEffect abort on unmount for cleanup
      return () => {
        controller.abort();
      };
    };
    if (isDropdownModalOpen && invokeRecentListData) {
      setInvokeRecentListData(false);
      getRecentSearchList();
    }
  }, [cookies, invokeRecentListData, isDropdownModalOpen, navigate, skip]);

  //get search game
  useEffect(() => {
    const getSearchList = async () => {
      setIsSearchLoading(true);
      let params = { skip, limit: 10, search: searchUser };
      const controller = new AbortController();
      const { signal } = controller;
      const response = await invokeApi(
        config.baseUrl + apiList.getSearchList,
        params,
        cookies,
        { signal }
      );
      if (response.customcode === 200) {
        // if (response.data.length < 10) {
        //   setMaxDistReached(true);
        // } else {
        //   setMaxDistReached(false);
        // }
        // if (selectedgameData?.length > 0) {
        //   for (let i = 0; i < selectedgameData?.length; i++) {
        //     for (let j = 0; j < response.data.length; j++) {
        //       if (selectedgameData[i].gameName === response.data[j].gameName) {
        //         response.data.splice(j, 1);
        //       }
        //     }
        //   }
        // }
        // if (skip > 0) {
        //   setGameSearchData((prev) => [...prev, ...response.data]);
        // } else {
        setSearchListData(response.data);
        let timer = setTimeout(() => setIsSearchLoading(false), 1000);
        return () => clearTimeout(timer);
        // }
        // setIsLoading(false);
      } else if (response.customcode === 201) {
        navigate(constants.PATH.NAVIGATELOGOUT);
      } else {
        setIsSearchLoading(false);
        alert("Something went wrong");
      }

      // UseEffect abort on unmount for cleanup
      return () => {
        controller.abort();
      };
    };
    if (isDropdownModalOpen && invokeSearchListData && searchUser.length >= 1) {
      setInvokeSearchListData(false);
      getSearchList();
    }
  }, [
    cookies,
    invokeSearchListData,
    isDropdownModalOpen,
    navigate,
    searchUser,
    skip,
  ]);

  return (
    <>
      <div
        onClick={() => {
          setIsNotificationModalOpen(false);
          setIsProfileModalOpen(false);
        }}
        className="gradient-border z-10 border-b-[2px] fixed top-0 left-0  flex flex-row items-center justify-between w-full h-[60px] bg-[#141517] py-3 px-10"
      >
        {/* Logo */}
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <img className="h-8 w-8" src="/assets/svg/gb-logo.svg" />
        </div>
        {/* Search and add icons*/}
        <div className="flex flex-row gap-[12px] w-[616px] h-8 ms-[246px]">
          {/* search bar */}
          <div
            style={{
              boxShadow: isDropdownModalOpen
                ? "0px 0px 8px 2px #2A85FF99"
                : "0px 8px 64px 0px #0000001A",
              width: isDropdownModalOpen ? "616px" : "532px",
            }}
            className={`${
              isDropdownModalOpen ? "border-typo-blue border-[2px]" : ""
            } flex flex-row h-9 bg-[#2B2E30] space-x-5 items-center py-2.5 px-6  rounded-[18px]`}
          >
            <img className="h-5 w-5" src="/assets/svg/search-icon.svg" />
            <input
              className="outline-none bg-transparent w-full text-typo-secondary"
              onFocus={() => {
                setIsDropdownModalOpen(true);
              }}
              value={searchUser}
              onChange={(ev) => {
                setSearchUser(ev.target.value);
                if (ev.target.value.length > 0) {
                  setInvokeSearchListData(true);
                }
              }}
            />
          </div>
          {/* add icon */}
          {!isDropdownModalOpen && (
            <div
              onClick={() => navigate("add-post")}
              className="h-9 flex items-center justify-center w-[72px] rounded-[18px] bg-[#2B2E30] py-2 px-4 cursor-pointer"
            >
              <img className="h-5 w-5" src="/assets/svg/plus.svg" />
            </div>
          )}
        </div>

        {/* Right Icons */}
        <div className="flex flex-row items-center justify-end w-[224px] h-9 gap-[32px]">
          <div className="w-[160px] flex flex-row items-center justify-end gap-[24px]">
            {/* <div className="h-8 w-8 bg-[#2B2E30] rounded-full flex items-center justify-center">
              <img
                className="h-[18px] w-[18px]"
                src="/assets/svg/comment-white.svg"
              />
            </div>
            <div className="h-8 w-8 bg-[#2B2E30] rounded-full flex items-center justify-center">
              <img
                className="h-[18px] w-[18px]"
                src="/assets/svg/group-white.svg"
              />
            </div> */}
            <div
              onClick={(ev) => {
                ev.stopPropagation();
                setIsNotificationModalOpen(!isNotificationModalopen);
                setIsProfileModalOpen(false);
              }}
              style={{
                boxShadow: isNotificationModalopen
                  ? "0px 0px 8px 2px #2A85FF99"
                  : "0px 8px 64px 0px #0000001A",
              }}
              className={`h-8 w-8 bg-[#2B2E30] ${
                isNotificationModalopen ? "border-[2px] border-typo-blue" : ""
              } rounded-full flex items-center justify-center cursor-pointer`}
            >
              <img
                className="h-[18px] w-[18px]"
                src="/assets/svg/notification-white.svg"
              />
            </div>
            {/* Profile avatar */}
            <div
              onClick={(ev) => {
                ev.stopPropagation();
                setIsProfileModalOpen(!isProfileModalOpen);
                setIsNotificationModalOpen(false);
              }}
              style={{
                boxShadow: isProfileModalOpen
                  ? "0px 0px 8px 2px #2A85FF99"
                  : "0px 8px 64px 0px #0000001A",
              }}
              className={`h-8 w-8 bg-[#2B2E30] ${
                isProfileModalOpen ? "border-[2px] border-typo-blue" : ""
              } rounded-full flex items-center justify-center cursor-pointer`}
            >
              <img src="/assets/svg/profile.svg" />
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown modal open */}
      {isDropdownModalOpen && (
        <div
          onClick={() => {
            setIsDropdownModalOpen(false);
          }}
          className="fixed z-10 bg-opacity-[60%] backdrop-blur-3xl bg-black inset-0 flex justify-center items-start mt-[60px]"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="flex flex-col rounded-[16px] bg-gradient-to-tl from-[#252525] from-[70%] to-gray-600 mt-4 ms-[49px]"
          >
            <div className="w-[616px] h-[324px] flex flex-col bg-[#252525]  bg-opacity-[100%]  rounded-[16px] mt-[1px] ml-[1px] gap-[16px] bg-[url('/assets/svg/Noise1.svg')] bg-no-repeat">
              {searchUser.length > 0 ? (
                <div className="flex flex-col h-full overflow-y-scroll py-[12px]">
                  {/* render */}
                  {searchListData?.length > 0 ? (
                    <>
                      {searchListData?.map((el, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setSearchUser("");
                            updateRecentSearchList(el._id, "ADD");
                          }}
                          className="flex flex-row items-center hover:bg-[#2B2E30] rounded-[8px] justify-between cursor-pointer px-[24px] py-[12px]"
                        >
                          <div className="flex flex-row items-center gap-[12px]">
                            {isSearchLoading ? (
                              <SkeletonTheme
                                baseColor="#2B2E30"
                                highlightColor="#141517"
                                duration={3}
                              >
                                <Skeleton className="h-8 w-8 rounded-full" />
                              </SkeletonTheme>
                            ) : (
                              <img
                                src={el.profilePic}
                                className="h-8 w-8 rounded-full"
                              />
                            )}
                            {isSearchLoading ? (
                              <SkeletonTheme
                                baseColor="#2B2E30"
                                highlightColor="#141517"
                                duration={3}
                              >
                                <Skeleton className="h-10 w-20" />
                              </SkeletonTheme>
                            ) : (
                              <h5 className="text-[14px] font-normal text-typo-secondary">
                                {el.userName}
                              </h5>
                            )}
                          </div>

                          {isSearchLoading ? (
                            <SkeletonTheme
                              baseColor="#2B2E30"
                              highlightColor="#141517"
                              duration={3}
                            >
                              <Skeleton className="h-4 w-8 px-2  rounded-lg" />
                            </SkeletonTheme>
                          ) : (
                            <button className="text-sm text-typo-secondary font-normal py-[3px] outline-none bg-typo-blue px-2  rounded-lg">
                              Profile
                            </button>
                          )}
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <h5 className="text-sm font-semibold text-typo-light">
                        No results found.
                      </h5>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col px-[24px] py-[24px] gap-[20px]">
                  <div className="flex flex-row items-center justify-between">
                    <h5 className="text-[14px] font-semibold text-typo-secondary">
                      Recent
                    </h5>
                    {recentListData?.length > 0 && (
                      <h5
                        onClick={() =>
                          updateRecentSearchList(
                            recentListData[0]._id,
                            "CLEARALL"
                          )
                        }
                        className="text-[14px] font-semibold text-typo-blue cursor-pointer"
                      >
                        Clear All
                      </h5>
                    )}
                  </div>
                  <div className="flex flex-col  h-[240px] overflow-y-scroll">
                    {/* render */}
                    {recentListData?.length > 0 ? (
                      <>
                        {recentListData?.map((el, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              // navigate(constants.PATH.NAVIGATEPROFILE);
                              // setIsDropdownModalOpen(false);
                            }}
                            className="flex flex-row items-center py-[12px] justify-between cursor-pointer"
                          >
                            <div className="flex flex-row items-center gap-[12px]">
                              <img
                                src={el.profilePic}
                                className="h-8 w-8 rounded-full"
                              />
                              <h5 className="text-[14px] font-normal text-typo-secondary">
                                {el.userName}
                              </h5>
                            </div>

                            <img
                              className="h-[13px] w-[13px]"
                              src="/assets/svg/close-btn.svg"
                              onClick={() => {
                                let copy = [...recentListData];
                                copy.splice(idx, 1);
                                setRecentListData(copy);
                                updateRecentSearchList(el._id, "REMOVE");
                              }}
                            />
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <h5 className="text-sm font-semibold text-typo-light">
                          No recent searches.
                        </h5>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isNotificationModalopen && (
        <div
          className="fixed z-10 bg-opacity-[10%] bg-black inset-0 flex justify-end items-start mt-[60px]"
          onClick={() => {
            setIsNotificationModalOpen(false);
          }}
        >
          <div className="bg-gradient-to-tl from-[#252525] me-[30px] from-[70%] to-gray-600 rounded-[16px] mt-3">
            <div className="bg-[#252525] bg-opacity-[100%] ml-[1px] mt-[1px]  rounded-[16px]">
              <div className="flex flex-col rounded-[16px] bg-[url('/assets/svg/Noise.svg')] bg-no-repeat bg-cover bg-center">
                <div className="w-[460px] h-[600px] flex flex-col">
                  {/* Tabs */}
                  <div
                    className="relative border-line2 w-[430px] mt-[10px] px-[12px]"
                    ref={tabListRef}
                  >
                    {tabs.map((tab, i) => (
                      <TabItem
                        key={tab}
                        isActive={i === value}
                        transition={{ duration: 0.1 }}
                        ref={(el) => childRefs.current.set(i, el)}
                        onClick={(ev) => {
                          ev.stopPropagation();
                          setValue(i);
                        }}
                      >
                        {tab}
                      </TabItem>
                    ))}
                    {slider.hasValue && (
                      <Slider
                        positionTransition={{
                          bounceDamping: 5,
                        }}
                        initial={false}
                        style={{
                          left: slider.left,
                          right: slider.right,
                        }}
                      />
                    )}
                  </div>
                  <Pager value={value}>
                    {tabs.map((tab, i) => (
                      <div key={tab} className="w-full h-auto px-1">
                        {i === 0 && (
                          <div className="flex flex-col mt-4">
                            {/* render */}
                            <div className="flex flex-row item-start justify-between py-[16px] px-[24px] hover:bg-[#2E9BFA33]">
                              <div className="flex flex-row w-[316px] gap-[8px] items-start">
                                <img
                                  src="/assets/svg/rating-user-avatar.svg"
                                  className="h-[48px] w-[48px] rounded-full"
                                />
                                <div className="flex flex-col gap-[8px]">
                                  <h5 className="text-[14px] text-typo-primary font-normal">
                                    <span className="text-[14px] text-typo-secondary font-semibold">
                                      Sudha Muthupandi
                                    </span>{" "}
                                    Mentioned you and others in a comment in{" "}
                                    <span className="text-[14px] text-typo-secondary font-semibold">
                                      Raja Velu Ramanathan
                                    </span>
                                    post
                                  </h5>
                                  <h5 className="text-[12px] text-typo-primary font-normal">
                                    25m ago.
                                  </h5>
                                </div>
                              </div>
                              {/* button */}
                              <CommonBtn1
                                height="32px"
                                width="67px"
                                text="Follow"
                              />
                            </div>
                            {/* render */}
                            <div className="flex flex-row item-start justify-between py-[16px] px-[24px] hover:bg-[#2E9BFA33]">
                              <div className="flex flex-row w-[316px] gap-[8px] items-start">
                                <img
                                  src="/assets/svg/rating-user-avatar.svg"
                                  className="h-[48px] w-[48px] rounded-full"
                                />
                                <div className="flex flex-col gap-[8px]">
                                  <h5 className="text-[14px] text-typo-primary font-normal">
                                    <span className="text-[14px] text-typo-secondary font-semibold">
                                      Monica
                                    </span>{" "}
                                    commented on your post
                                  </h5>
                                  <h5 className="text-[12px] text-typo-primary font-normal">
                                    25m ago.
                                  </h5>
                                </div>
                              </div>
                              {/* button */}
                              <img
                                src="/assets/svg/three-dots.svg"
                                className="h-10 w-10 cursor-pointer"
                              />
                            </div>
                            {/* render */}
                            <div className="flex flex-row item-start justify-between py-[16px] px-[24px] hover:bg-[#2E9BFA33]">
                              <div className="flex flex-row w-[316px] gap-[8px] items-start">
                                <img
                                  src="/assets/svg/rating-user-avatar.svg"
                                  className="h-[48px] w-[48px] rounded-full"
                                />
                                <div className="flex flex-col gap-[8px]">
                                  <h5 className="text-[14px] text-typo-primary font-normal">
                                    <span className="text-[14px] text-typo-secondary font-semibold">
                                      Monica
                                    </span>{" "}
                                    commented on your post
                                  </h5>
                                  <h5 className="text-[12px] text-typo-primary font-normal">
                                    25m ago.
                                  </h5>
                                </div>
                              </div>
                              {/* button */}
                              <img
                                src="/assets/svg/three-dots.svg"
                                className="h-10 w-10 cursor-pointer"
                              />
                            </div>
                            {/* render */}
                            <div className="flex flex-row item-start justify-between py-[16px] px-[24px] hover:bg-[#2E9BFA33]">
                              <div className="flex flex-row w-[316px] gap-[8px] items-start">
                                <img
                                  src="/assets/svg/rating-user-avatar.svg"
                                  className="h-[48px] w-[48px] rounded-full"
                                />
                                <div className="flex flex-col gap-[8px]">
                                  <h5 className="text-[14px] text-typo-primary font-normal">
                                    <span className="text-[14px] text-typo-secondary font-semibold">
                                      Monica
                                    </span>{" "}
                                    commented on your post
                                  </h5>
                                  <h5 className="text-[12px] text-typo-primary font-normal">
                                    25m ago.
                                  </h5>
                                </div>
                              </div>
                              {/* button */}
                              <img
                                src="/assets/svg/three-dots.svg"
                                className="h-10 w-10 cursor-pointer"
                              />
                            </div>
                            {/* render */}
                            <div className="flex flex-row item-start justify-between py-[16px] px-[24px] hover:bg-[#2E9BFA33]">
                              <div className="flex flex-row w-[316px] gap-[8px] items-start">
                                <img
                                  src="/assets/svg/rating-user-avatar.svg"
                                  className="h-[48px] w-[48px] rounded-full"
                                />
                                <div className="flex flex-col gap-[8px]">
                                  <h5 className="text-[14px] text-typo-primary font-normal">
                                    <span className="text-[14px] text-typo-secondary font-semibold">
                                      Monica
                                    </span>{" "}
                                    commented on your post
                                  </h5>
                                  <h5 className="text-[12px] text-typo-primary font-normal">
                                    25m ago.
                                  </h5>
                                </div>
                              </div>
                              {/* button */}
                              <img
                                src="/assets/svg/three-dots.svg"
                                className="h-10 w-10 cursor-pointer"
                              />
                            </div>
                            {/* render */}
                            <div className="flex flex-row item-start justify-between py-[16px] px-[24px] hover:bg-[#2E9BFA33]">
                              <div className="flex flex-row w-[316px] gap-[8px] items-start">
                                <img
                                  src="/assets/svg/rating-user-avatar.svg"
                                  className="h-[48px] w-[48px] rounded-full"
                                />
                                <div className="flex flex-col gap-[8px]">
                                  <h5 className="text-[14px] text-typo-primary font-normal">
                                    <span className="text-[14px] text-typo-secondary font-semibold">
                                      Monica
                                    </span>{" "}
                                    commented on your post
                                  </h5>
                                  <h5 className="text-[12px] text-typo-primary font-normal">
                                    25m ago.
                                  </h5>
                                </div>
                              </div>
                              {/* button */}
                              <img
                                src="/assets/svg/three-dots.svg"
                                className="h-10 w-10 cursor-pointer"
                              />
                            </div>
                          </div>
                        )}
                        {i === 1 && (
                          <div className="flex flex-col  mt-4">
                            <h5 className="typo-semibold w-full h-[500px] flex items-center justify-center">
                              No Follow Requests
                            </h5>
                          </div>
                        )}
                      </div>
                    ))}
                  </Pager>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isProfileModalOpen && (
        <div
          onClick={() => setIsProfileModalOpen(false)}
          className="fixed z-10 inset-0 bg-opacity-[10%]  bg-black flex justify-end items-start mt-[60px]"
        >
          <div className="bg-gradient-to-tl from-[#252525] me-[30px] from-[70%] to-gray-600 rounded-[16px] mt-3">
            <div className="bg-[#252525] bg-opacity-[100%] ml-[1px] mt-[1px]  rounded-[16px]">
              <div className="flex flex-col rounded-[16px] bg-[url('/assets/svg/Noise.svg')] bg-no-repeat bg-cover bg-center">
                <div className="w-[274px] h-[426px] flex flex-col py-[12px] px-[8px]">
                  {/* Avatar and Name name */}
                  <div
                    onClick={() => {
                      navigate(constants.PATH.NAVIGATEPROFILE);
                      setCookie(constants.COOKIES.PROFILEVALUE, 0, {
                        path: "/",
                        maxAge: 3000000,
                        sameSite: "strict",
                      });
                    }}
                    className="flex flex-row w-full h-[70px] items-center cursor-pointer hover:bg-[#2B2E30] py-[12px] px-[16px] gap-4 border-b-[1px] border-[#373A3D] rounded-lg mb-[2px]"
                  >
                    <img src="/assets/svg/profile.svg" className="w-10 h-10" />
                    <div className="flex flex-col items-start gap-[4px]">
                      <h5 className="typo-semibold">SHIVASUDHAKAR</h5>
                      <h5 className="typo-normal">@shivasj</h5>
                    </div>
                  </div>

                  {/* Web download */}
                  {/* <div className="w-full h-[48px] bg-[url('/assets/svg/webAppDownload.svg')] bg-no-repeat bg-cover bg-center rounded-lg mb-2"></div> */}

                  {/* nav buttons */}
                  <div className="flex flex-col w-full h-[320px] gap-[2px] cursor-pointer">
                    <div
                      className="flex flex-row items-center py-2 px-3 gap-[14px] hover:bg-[#2B2E30] rounded-[8px]"
                      onClick={() => navigate(constants.PATH.NAVIGATETHEME)}
                    >
                      <img
                        src="/assets/svg/themesIcon.svg"
                        className="h-6 w-6"
                      />
                      <h5 className="text-[14px] font-semibold text-typo-secondary">
                        Themes
                      </h5>
                    </div>
                    <div
                      onClick={() => navigate(constants.PATH.NAVIGATEWALLET)}
                      className="flex flex-row items-center py-2 px-3 gap-[14px] hover:bg-[#2B2E30] rounded-[8px]"
                    >
                      <img
                        src="/assets/svg/walletIcon.svg"
                        className="h-6 w-6"
                      />
                      <h5 className="text-[14px] font-semibold text-typo-secondary">
                        Wallets
                      </h5>
                    </div>
                    {/* <div className="flex flex-row items-center py-2 px-3 gap-[14px] hover:bg-[#2B2E30] rounded-[8px]">
                      <img
                        src="/assets/svg/dashboardIcon.svg"
                        className="h-6 w-6"
                      />
                      <h5 className="text-[14px] font-semibold text-typo-secondary">
                        Dashboard
                      </h5>
                    </div> */}
                    <div className="flex flex-row items-center py-2 px-3 gap-[14px] hover:bg-[#2B2E30] rounded-[8px]">
                      <img
                        src="/assets/svg/heartIcon.svg"
                        className="h-6 w-6"
                      />
                      <h5 className="text-[14px] font-semibold text-typo-secondary">
                        Saved
                      </h5>
                    </div>
                    <div
                      onClick={() => navigate(constants.PATH.NAVIGATEDRAFT)}
                      className="flex flex-row items-center py-2 px-3 gap-[14px] hover:bg-[#2B2E30] rounded-[8px]"
                    >
                      <img
                        src="/assets/svg/draftIcon.svg"
                        className="h-6 w-6"
                      />
                      <h5 className="text-[14px] font-semibold text-typo-secondary">
                        Draft
                      </h5>
                    </div>
                    <div
                      onClick={() => setIsFeedbackModalOpen(true)}
                      className="flex flex-row items-center py-2 px-3 gap-[14px] hover:bg-[#2B2E30] rounded-[8px]"
                    >
                      <img
                        src="/assets/svg/feedbackIcon.svg"
                        className="h-6 w-6"
                      />
                      <h5 className="text-[14px] font-semibold text-typo-secondary">
                        Give Feedback
                      </h5>
                    </div>
                    <div className="flex flex-row items-center py-2 px-3 gap-[14px] hover:bg-[#2B2E30] rounded-[8px]">
                      <img
                        src="/assets/svg/helpAndSupport.svg"
                        className="h-6 w-6"
                      />
                      <h5 className="text-[14px] font-semibold text-typo-secondary">
                        Help Center
                      </h5>
                    </div>
                    <div
                      onClick={() => navigate(constants.PATH.NAVIGATESETTINGS)}
                      className="flex flex-row items-center py-2 px-3 gap-[14px] hover:bg-[#2B2E30] rounded-[8px]"
                    >
                      <img
                        src="/assets/svg/settingsIcon.svg"
                        className="h-6 w-6"
                      />
                      <h5 className="text-[14px] font-semibold text-typo-secondary">
                        Settings
                      </h5>
                    </div>
                    <div
                      onClick={() => navigate(constants.PATH.NAVIGATELOGOUT)}
                      className="flex flex-row items-center py-2 px-3 gap-[14px] hover:bg-[#2B2E30] rounded-[8px]"
                    >
                      <img
                        src="/assets/svg/logoutIcon.svg"
                        className="h-6 w-6"
                      />
                      <h5 className="text-[14px] font-semibold text-typo-secondary">
                        Logout
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isFeedbackModalOpen && (
        <CommonModal>
          <div className="w-[616px] h-[655px] flex flex-col">
            {/* Modal Header */}
            <div className="flex flex-row items-center justify-between px-[24px] py-[20px] rounded-tr-[16px] rounded-tl-[16px] modal-header">
              <div className="flex flex-row items-center gap-[12px]">
                <img src="/assets/svg/left-pointer.svg" className="w-2 h-3" />
                <h1 className="font-semibold text-[18px] text-typo-secondary">
                  Feedback
                </h1>
              </div>
              <img
                src="/assets/svg/close-btn.svg"
                className="w-3 h-3 cursor-pointer"
                onClick={() => setIsFeedbackModalOpen(false)}
              />
            </div>
            {/* Modal Body */}
            <div className="relative h-full flex flex-col gap-[20px] p-[24px]">
              {/* Add subject */}
              <div className="flex flex-col gap-[13px]">
                <h5 className="text-[18px] font-semibold text-typo-secondary">
                  Subject
                </h5>
                <input
                  className="outline-none bg-transparent w-full h-[40px] rounded-xl py-[10px] px-[16px] border-[1px] border-[#373A3D]"
                  placeholder="Add Subject"
                  type="text"
                />
              </div>
              {/* Add Comment */}
              <div className="flex flex-col gap-[13px]">
                <h5 className="text-[18px] font-semibold text-typo-secondary">
                  Comment
                </h5>
                <textarea
                  className="outline-none bg-transparent w-full resize-none rounded-xl py-[10px] px-[16px] border-[1px] border-[#373A3D]"
                  rows="8"
                  placeholder="Write your comment"
                  // value={comments}
                  // onChange={(ev) => {
                  //   setComments(ev.target.value);
                  //   setCommentsError(false);
                  // }}
                ></textarea>
              </div>

              {/* Submit */}
              <div className="absolute bottom-0 left-0 h-[80px] w-full flex items-center rounded-bl-xl rounded-br-xl justify-center bg-[#212426]">
                <div className="w-[568px] h-[44px] bg-[#2E9BFA] rounded-[8px] flex items-center justify-center">
                  <h5 className="typo-semibold">Submit Feedback</h5>
                </div>
              </div>
            </div>
          </div>
        </CommonModal>
      )}
    </>
  );
};

export default Header;
