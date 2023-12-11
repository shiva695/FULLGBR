//import dependencies
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { MdOutlineMail, MdOutlineDevices } from "react-icons/md";
import { PiGameController, PiPhoneCall } from "react-icons/pi";
//import components
import BreadCrumbs from "../general/BreadCrumbs";
import UserViewPopup from "../modals/UserViewPopUp";
import helperUtils from "../../utils/helperUtils";
import ViewSkeleton from "../general/ViewSkeleton";
//import files
import { apiList, invokeApi } from "../../utils/apiServiceUtils";
import { config } from "../../utils/configUtils";
import constants from "../../json/constants.json";

const UserView = () => {
  const [cookies] = useCookies();
  const location = useLocation(); // find location path
  const [invokeData, setInvokeData] = useState(true);
  const [userDetail, setUserDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // const [regDate, setRegDate] = useState("");

  const [phone, setPhone] = useState(null);

  const [confirmPopupView, setConfirmPopupView] = useState(false);
  const [confirmPopupViewDeviceInfo, setConfirmPopupViewDeviceInfo] =
    useState(false);

  const onClosedView = () => setConfirmPopupView(false);
  const onClosedViewDeviceInfo = () => setConfirmPopupViewDeviceInfo(false);

  // get user data
  useEffect(() => {
    const getUserDetail = async () => {
      let params = {
        _id: location.state._id,
      };
      let response = await invokeApi(
        config.baseUrl + apiList.getUserDetail,
        params,
        cookies
      );

      if (response.customcode === 200) {
        setUserDetail(response?.data);
        setPhone(response.data.phone);
        setIsLoading(false);
      } else {
        console.error("Something went wrong");
      }
    };
    if (invokeData) {
      setInvokeData(false);
      getUserDetail();
    }
  }, [cookies, invokeData, location.state._id]);

  console.log(userDetail);
  console.log(confirmPopupView);

  return (
    <>
      <div className="fixed right-0 w-[84.7%] flex flex-col h-[100vh] mt-1 dark:bg-[#121212] cursor-default">
        <div className="flex flex-col w-full bg-white dark:bg-[#121212] px-5 pt-5 dark:text-white;">
          {/* Breadcrumbs */}
          <div className="flex flex-row justify-between bg-white dark:bg-[#121212] items-center border-b border-gray-400 pb-5">
            <BreadCrumbs
              nav1={constants.USERS}
              nav2={"View"}
              link={constants.USERNAVIGATE}
            />
          </div>
        </div>
        {isLoading ? (
          <ViewSkeleton />
        ) : (
          <div className="h-[650px] p-10 overflow-y-auto bg-white dark:bg-[#121212] dark:text-white">
            {/* User info cards */}
            <div className="flex flex-col mx-auto gap-5 w-11/12 p-10 bg-white dark:bg-[#121212] rounded-xl">
              {/* User Details */}

              <div className="w-full flex justify-evenly border border-gray-400 p-5 items-center rounded-xl">
                <div className="w-1/5">
                  <div>
                    <img
                      className="rounded-2xl h-32 w-32"
                      src={
                        userDetail?.profilePic
                          ? userDetail?.profilePic
                          : "/assets/png/profilePic.png"
                      }
                    />
                  </div>
                </div>
                <div className="w-4/5 flex flex-col gap-5">
                  <div className="flex flex-col border-b border-gray-700 p-2 justify-center">
                    <div className="flex justify-between">
                      <div>
                        <div className="text-2xl font-bold">
                          {userDetail.userName}
                        </div>
                        <div className="italic text-md text-gray-500 dark:text-gray-300">
                          {helperUtils.toSentenceCase(
                            `${userDetail.firstName} ${userDetail.lastName}`
                          )}
                        </div>
                      </div>
                      <div className="flex gap-4 text-3xl items-center">
                        {userDetail?.linkedGames?.length > 0 ? (
                          <div
                            className="border-2 rounded-lg border-gray-400 p-1 cursor-pointer"
                            onClick={() => setConfirmPopupView(true)}
                          >
                            <PiGameController />
                          </div>
                        ) : (
                          ""
                        )}

                        {userDetail?.deviceInfo?.length > 0 ? (
                          <div
                            className="border-2 rounded-lg border-gray-400 p-1 cursor-pointer"
                            onClick={() => setConfirmPopupViewDeviceInfo(true)}
                          >
                            <MdOutlineDevices />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-10">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-3xl border-2 rounded-lg border-gray-400 p-1">
                        <MdOutlineMail />{" "}
                      </span>
                      <span>: &nbsp;{userDetail.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-3xl border-2 rounded-lg border-gray-400 p-1">
                        <PiPhoneCall />{" "}
                      </span>
                      {!!phone && (
                        <span>
                          : &nbsp;
                          {`${userDetail.phone.code} ${userDetail.phone.number}`}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex gap-4 w-[49%] flex-col">
                  {/* Personal Information */}
                  <div className="flex flex-col w-full border border-gray-400 p-2 items-center rounded-xl">
                    <div className="text-lg font-bold p-3 w-full text-center rounded-t-xl bg-zinc-300 dark:bg-[#242424]">
                      {constants.PERSONALINFORMATION}
                    </div>
                    <div className="mx-10 my-5 flex flex-col w-full px-10">
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-2/3">
                          {constants.USERNAME}
                        </div>
                        <div className="w-1/3">
                          {userDetail?.userName ? userDetail?.userName : ""}
                        </div>
                      </div>
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-2/3">
                          {constants.FIRSTNAME}
                        </div>
                        <div className="w-1/3">
                          {userDetail?.firstName
                            ? helperUtils.toSentenceCase(userDetail?.firstName)
                            : ""}
                        </div>
                      </div>
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-2/3">
                          {constants.LASTNAME}
                        </div>
                        <div className="w-1/3">
                          {userDetail?.lastName
                            ? helperUtils.toSentenceCase(userDetail?.lastName)
                            : ""}
                        </div>
                      </div>
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-2/3">
                          {constants.DATEOFBIRTH}
                        </div>
                        <div className="w-1/3">
                          {userDetail?.dob
                            ? helperUtils.getDateFormat(
                                userDetail?.dob,
                                "dd-mm-yyyy"
                              )
                            : ""}
                        </div>
                      </div>
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-2/3">
                          {constants.GENDER}
                        </div>
                        <div className="w-1/3">
                          {userDetail.gender
                            ? constants[userDetail.gender]
                            : ""}
                        </div>
                      </div>
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-2/3">
                          {constants.INVITATIONCODE}
                        </div>
                        <div className="w-1/3">
                          {userDetail.uniqueCode ? userDetail.uniqueCode : ""}
                        </div>
                      </div>
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-2/3">
                          {constants.STATUS}
                        </div>
                        <div className="w-1/3">
                          {userDetail.status ? userDetail.status : ""}
                        </div>
                      </div>
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-2/3">
                          {constants.REFERREDCOUNT}
                        </div>
                        <div className="w-1/3">
                          {userDetail.referredCount
                            ? userDetail.referredCount
                            : "0"}
                        </div>
                      </div>
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-2/3">
                          {constants.GOOGLEID}
                        </div>
                        <div className="w-1/3">
                          {userDetail?.googleId ? userDetail?.googleId : ""}
                        </div>
                      </div>
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-2/3">
                          {constants.FACEBOOKID}
                        </div>
                        <div className="w-1/3">
                          {userDetail?.facebookId ? userDetail?.facebookId : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Token information */}
                  <div className="flex flex-col w-full border border-gray-400 p-2 items-center rounded-xl">
                    <div className="text-lg font-bold p-3 w-full text-center rounded-t-xl bg-zinc-300 dark:bg-[#242424]">
                      {constants.TOKENINFORMATION}
                    </div>
                    <div className="mx-10 my-5 flex flex-col w-full px-10">
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-2/3">
                          {constants.AVAILABLETOKENCOUNT}
                        </div>
                        <div className="w-1/3">
                          {userDetail.tokenDetails?.availableTokenCount
                            ? userDetail.tokenDetails?.availableTokenCount
                            : "0"}
                        </div>
                      </div>
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-2/3">
                          {constants.JOININGBONUSTOKENCOUNT}
                        </div>
                        <div className="w-1/3">
                          {userDetail.tokenDetails?.joiningBonusTokenCount
                            ? userDetail.tokenDetails?.joiningBonusTokenCount
                            : "0"}
                        </div>
                      </div>
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-2/3">
                          {constants.OTHERMEDIUMTOKEN}
                        </div>
                        <div className="w-1/3">
                          {userDetail.tokenDetails?.otherMediumToken
                            ? userDetail.tokenDetails?.otherMediumToken
                            : "0"}
                        </div>
                      </div>
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-2/3">
                          {constants.REFERELTOKENCOUNT}
                        </div>
                        <div className="w-1/3">
                          {userDetail.tokenDetails?.referelTokenCount
                            ? userDetail.tokenDetails?.referelTokenCount
                            : "0"}
                        </div>
                      </div>
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-2/3">
                          {constants.SPENTTOKEN}
                        </div>
                        <div className="w-1/3">
                          {userDetail.tokenDetails?.spentToken
                            ? userDetail.tokenDetails?.spentToken
                            : "0"}
                        </div>
                      </div>
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-2/3">
                          {constants.TOTALEARNCOUNT}
                        </div>
                        <div className="w-1/3">
                          {userDetail.tokenDetails?.totalEarnCount
                            ? userDetail.tokenDetails?.totalEarnCount
                            : "0"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 w-[49%] flex-col">
                  {/* Activity information */}
                  <div className="flex flex-col border border-gray-400 p-2 items-center rounded-xl">
                    <div className="text-lg font-bold p-3 w-full text-center rounded-t-xl bg-zinc-300 dark:bg-[#242424]">
                      {constants.ACTIVITYINFORMATION}
                    </div>
                    <div className="mx-10 my-5 flex flex-col w-full px-10">
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-1/2">
                          {constants.CREATEDAT}
                        </div>
                        <div className="w-1/2">
                          {userDetail?.createdAt
                            ? `${helperUtils.getDateFormat(
                                userDetail?.createdAt
                              )}, ${helperUtils.getTimeFormat(
                                userDetail?.createdAt
                              )}`
                            : ""}
                        </div>
                      </div>
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-1/2">
                          {constants.LASTEDITEDTIME}
                        </div>
                        <div className="w-1/2">
                          {userDetail?.lastEditedTime
                            ? `${helperUtils.getDateFormat(
                                userDetail?.lastEditedTime
                              )}, ${helperUtils.getTimeFormat(
                                userDetail?.lastEditedTime
                              )}`
                            : ""}
                        </div>
                      </div>
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-1/2">
                          {constants.LASTTOKENUPDATETIME}
                        </div>
                        <div className="w-1/2">
                          {userDetail?.lastTokenUpdateTime
                            ? `${helperUtils.getDateFormat(
                                userDetail?.lastTokenUpdateTime
                              )}, ${helperUtils.getTimeFormat(
                                userDetail?.lastTokenUpdateTime
                              )}`
                            : ""}
                        </div>
                      </div>
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-1/2">
                          {constants.CODEUPDATETIME}
                        </div>
                        <div className="w-1/2">
                          {userDetail?.codeUpdateTime
                            ? `${helperUtils.getDateFormat(
                                userDetail?.codeUpdateTime
                              )}, ${helperUtils.getTimeFormat(
                                userDetail?.codeUpdateTime
                              )}`
                            : ""}
                        </div>
                      </div>
                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-1/2">
                          {constants.LASTLOGOUTTIME}
                        </div>
                        <div className="w-1/2">
                          {userDetail?.lastLogoutTime
                            ? `${helperUtils.getDateFormat(
                                userDetail?.lastLogoutTime
                              )},
                              ${helperUtils.getTimeFormat(
                                userDetail?.lastLogoutTime
                              )}
                            `
                            : ""}
                        </div>
                      </div>

                      <div className="p-3 border-b border-gray-700 flex">
                        <div className="text-md font-semibold w-1/2">
                          {constants.UPDATEDAT}
                        </div>
                        <div className="w-1/2">
                          {userDetail?.updatedAt
                            ? `${helperUtils.getDateFormat(
                                userDetail?.updatedAt
                              )}, ${helperUtils.getTimeFormat(
                                userDetail?.updatedAt
                              )}`
                            : ""}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Daily Rewards */}
                  {userDetail?.dailyRewards?.length > 0 ? (
                    <div className="flex flex-col border border-gray-400 p-2 items-center rounded-xl">
                      <div className="text-lg font-bold p-3 w-full text-center rounded-t-xl bg-zinc-300 dark:bg-[#242424]">
                        {constants.DAILYREWARDS}
                      </div>
                      <div className="mx-10 my-5 flex flex-col w-full px-10"></div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <UserViewPopup
        open={confirmPopupView}
        close={onClosedView}
        heading={constants.LINKEDGAMES}
        dataArray={userDetail.linkedGames}
      />
      <UserViewPopup
        open={confirmPopupViewDeviceInfo}
        close={onClosedViewDeviceInfo}
        heading={constants.DEVICEINFORMATION}
        dataArray={userDetail.deviceInfo}
      />
    </>
  );
};

export default UserView;
