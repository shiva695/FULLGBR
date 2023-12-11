import React, { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import Button from "../general/uiElements/Button";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { config } from "../../config/config";
import { apiList, invokeApi } from "../../services/apiServices";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import GradientHeader from "../general/uiElements/GradientHeader";

const GameCoin = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [transaction, setTransaction] = useState("CREDIT");
  const [tokenData, setTokenData] = useState(null);
  const [invokeTokenData, setInvokeTokenData] = useState(false);
  const [tokenTransactionData, setTokenTransactionData] = useState(null);
  const [invokeTransactionData, setInvokeTransactionData] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalToken, setModalToken] = useState(null);

  const claimDailyData = async (day) => {
    let params = {
      currentDay: day,
      isReturn: true,
    };
    let response = await invokeApi(
      config.apiDomains + apiList.claimDailyData,
      params,
      cookies
    );
    if (response.customcode === 200) {
      setInvokeTokenData(true);
      setIsOpenModal(false);
      toast.success("Token claimed successfully...");
    } else {
      alert("Something went wrong");
    }
  };

  // Check access token is not there navigate to home page
  useEffect(() => {
    if (!!cookies[config.cookieName] && cookies[config.cookieName].userData) {
      setInvokeTokenData(true);
      setInvokeTransactionData(true);
      return;
    } else {
      navigate("/");
    }
  }, [navigate, cookies]);

  // getting tokens data
  useEffect(() => {
    const getTokenPageData = async () => {
      let params = {};
      let response = await invokeApi(
        config.apiDomains + apiList.getTokenPageData,
        params,
        cookies
      );
      if (response.customcode === 200) {
        setTokenData(response.data);
      } else {
        alert("Something went wrong");
      }
    };
    if (invokeTokenData) {
      setInvokeTokenData(false);
      getTokenPageData();
    }
  }, [invokeTokenData]);

  // getting tokens data
  useEffect(() => {
    const getTokenTansactionList = async () => {
      let params = {
        skip: 0,
        limit: 10,
        filter: transaction,
      };
      let response = await invokeApi(
        config.apiDomains + apiList.getTokenTansactionList,
        params,
        cookies
      );
      if (response.customcode === 200) {
        setTokenTransactionData(response.data);
      } else {
        alert("Something went wrong");
      }
    };
    if (invokeTransactionData) {
      setInvokeTransactionData(false);
      getTokenTansactionList();
    }
  }, [invokeTransactionData]);

  return (
    <>
      <HomeHeader />
      <div className="bg-[#242424] fixed flex flex-col h-[100vh] p-[30px] mt-[70px] w-full">
        <div className="bg-[#1C1C1C] rounded-lg shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)] block h-[500px] 2xl:h-[620px] 4xl:h-[790px] mt-5">
          <div className="flex flex-col m-3.5 text-[#e3e3e3] font-semibold">
            {/* header */}
            <div className="flex flex-col space-y-4">
              <h5 className="text-3xl">Tokens</h5>
              <p className="text-[#9d9e9e]">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui,
                omnis maiores tempore ab voluptate
              </p>
            </div>

            {/* Token Content */}
            <div className="flex flex-row space-x-4">
              {/* left */}
              <div className="w-[27%] mt-5">
                <div className="bg-[#242424] inline-block w-full space-y-6 rounded-lg  h-[450px] 2xl:h-[470px] 4xl:h-[600px]">
                  {/* left content header */}
                  <div className="h-[10%] flex flex-col items-center justify-center bg-[#1c1c1c] shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)] rounded-lg m-3">
                    <div className="flex flex-row items-center justify-around  w-full">
                      <p
                        className={`cursor-pointer text-[#9d9e9e] ${
                          tabIndex === 0 && "text-[#e3e3e3]"
                        }`}
                        onClick={() => setTabIndex(0)}
                      >
                        Summary
                      </p>
                      <p
                        className={`cursor-pointer text-[#9d9e9e] ${
                          tabIndex === 1 && "text-[#e3e3e3]"
                        }`}
                        onClick={() => setTabIndex(1)}
                      >
                        Transaction
                      </p>
                      <p
                        className={`cursor-pointer text-[#9d9e9e] ${
                          tabIndex === 2 && "text-[#e3e3e3]"
                        }`}
                        onClick={() => setTabIndex(2)}
                      >
                        Referral
                      </p>
                    </div>
                  </div>
                  {/* left content */}
                  <div className="h-[80%] flex flex-col bg-[#1c1c1c] text-[#9d9e9e] shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)] rounded-lg m-3">
                    {tabIndex === 0 && (
                      <div className="flex flex-col space-y-5 m-7 ">
                        <div className="flex flex-row space-x-5">
                          <h5 className="text-[#e3e3e3] pb-2 gradient-border">
                            Account Summary
                          </h5>
                        </div>

                        <div className="flex flex-row items-center justify-between">
                          <p>Tokens avilable</p>
                          <p className="text-[#e3e3e3]">
                            {tokenData?.summary.availableTokenCount}
                          </p>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                          <p>Tokens Spent</p>
                          <p className="text-[#e3e3e3]">
                            {tokenData?.summary.spentTokenCount}
                          </p>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                          <p>Total Tokens Earned</p>
                          <p className="text-[#e3e3e3]">
                            {tokenData?.summary.totalEarnCount}
                          </p>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                          <p>Tokens earned via Referral</p>
                          <p className="text-[#e3e3e3]">
                            {tokenData?.summary.referelTokenCount}
                          </p>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                          <p>Tokens earned by other mediums</p>
                          <p className="text-[#e3e3e3]">
                            {tokenData?.summary.otherMediumToken}
                          </p>
                        </div>
                      </div>
                    )}
                    {tabIndex === 1 && (
                      <div className="flex flex-col space-y-5 m-7 ">
                        <div className="flex flex-row space-x-5">
                          <h5
                            className={`cursor-pointer  ${
                              transaction === "CREDIT" &&
                              "text-[#e3e3e3] pb-2 gradient-border"
                            }`}
                            onClick={() => setTransaction("CREDIT")}
                          >
                            Incoming
                          </h5>
                          <h5
                            className={`cursor-pointer  ${
                              transaction === "DEBIT" &&
                              "text-[#e3e3e3] pb-2 gradient-border"
                            }`}
                            onClick={() => setTransaction("DEBIT")}
                          >
                            Outgoing
                          </h5>
                        </div>

                        {transaction === "CREDIT" && (
                          <>
                            {transaction === "CREDIT" &&
                            tokenTransactionData.length > 0 ? (
                              <>
                                {tokenTransactionData?.map((el, idx) => (
                                  <div
                                    key={idx}
                                    className="flex flex-row items-center justify-between"
                                  >
                                    <p>
                                      {el.fromUser.userName}-
                                      {el.toUser.userName}
                                    </p>
                                    <p className="text-teal-500">{el.amount}</p>
                                    <p>
                                      {format(new Date(el.createdAt), "h:m p")}
                                    </p>
                                  </div>
                                ))}
                              </>
                            ) : (
                              <p>No records found</p>
                            )}
                          </>
                        )}

                        {transaction === "DEBIT" && (
                          <>
                            {transaction === "DEBIT" &&
                            tokenTransactionData.length > 0 ? (
                              <>
                                <div className="flex flex-row items-center justify-between">
                                  <p>Ref-username</p>
                                  <p className="text-teal-500">100</p>
                                  <p>09:00; 13/06/2023</p>
                                </div>
                                <div className="flex flex-row items-center justify-between">
                                  <p>Ref-username</p>
                                  <p className="text-teal-500">100</p>
                                  <p>09:00; 13/06/2023</p>
                                </div>
                                <div className="flex flex-row items-center justify-between">
                                  <p>Ref-username</p>
                                  <p className="text-teal-500">100</p>
                                  <p>09:00; 13/06/2023</p>
                                </div>
                                <div className="flex flex-row items-center justify-between">
                                  <p>Ref-username</p>
                                  <p className="text-teal-500">100</p>
                                  <p>09:00; 13/06/2023</p>
                                </div>
                              </>
                            ) : (
                              <p>No records found</p>
                            )}
                          </>
                        )}
                      </div>
                    )}
                    {tabIndex === 2 && (
                      <div className="flex flex-col space-y-5 m-5">
                        {/* invite link */}
                        <div className="flex flex-col space-y-3">
                          <h5>Invite link</h5>
                          <div className="flex flex-row items-center w-full">
                            <input
                              type="text"
                              disabled
                              value="www.gamersback.com/ref/35354"
                              readonly
                              className="focus:outline-none py-2 w-full px-3 bg-transparent rounded border-[1px] border-[#323232]"
                            />
                            <img
                              className="cursor-pointer ml-[-35px] h-5 w-5"
                              src="/assets/png/clipboard-icon.png"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  tokenData?.referrel.inviteCode
                                );
                                toast("Copied to clipboard", {
                                  position: toast.POSITION.BOTTOM_CENTER,
                                  autoClose: 1000,
                                  hideProgressBar: true,
                                });
                              }}
                            />
                          </div>
                        </div>
                        {/* invite code */}
                        <div className="flex flex-col space-y-3">
                          <h5>Invite code</h5>
                          <div className="flex flex-row items-center w-full">
                            <input
                              type="text"
                              disabled
                              value={tokenData?.referrel.inviteCode}
                              readonly
                              className="focus:outline-none py-2 w-full px-3 bg-transparent rounded border-[1px] border-[#323232]"
                            />
                            <img
                              className="cursor-pointer ml-[-35px] h-5 w-5"
                              src="/assets/png/clipboard-icon.png"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  tokenData?.referrel.inviteCode
                                );
                                toast("Copied to clipboard", {
                                  position: toast.POSITION.BOTTOM_CENTER,
                                  autoClose: 1000,
                                  hideProgressBar: true,
                                });
                              }}
                            />
                          </div>
                        </div>

                        {/* two box  */}
                        <div className="flex flex-row space-x-5">
                          <div className="flex flex-col p-3.5 rounded border-[1px] border-[#323232] items-center justify-center space-y-3">
                            <h5 className="font-semibold text-[#e3e3e3]">
                              {tokenData?.referrel.userReferred}
                            </h5>
                            <p>User Referred</p>
                          </div>
                          <div className="flex flex-col p-5 items-center justify-center rounded border-[1px] border-[#323232] space-y-3">
                            <h5 className="font-semibold text-[#e3e3e3]">
                              {tokenData?.referrel.totalReferrelEarnings}
                            </h5>
                            <p>Referral Earnings</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* right */}
              <div className="w-[73%] flex flex-col space-y-3 mt-5">
                <div className="bg-[#242424] inline-block rounded-lg w-full h-[100px] 2xl:h-[150px] 4xl:h-[170px]">
                  <div className="flex flex-row">
                    {/* first block */}
                    <div className="w-[13%]">
                      <div className="bg-[#1C1C1C] rounded-lg m-3 shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)]">
                        <div className="flex flex-col space-y-4 h-[127px] 2xl:h-[127px] 4xl:h-[130px]">
                          <div className="flex flex-col h-screen my-auto items-center space-y-3 justify-center m-3">
                            <h5 className="text-3xl">30</h5>
                            <p className="text-[#9e9d9d]">Day Streak</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* second block */}
                    <div className="w-[87%]">
                      <div className="bg-[#1C1C1C] rounded-lg m-3 shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)]">
                        <div className="flex flex-col space-y-4 h-[127px] 2xl:h-[127px] 4xl:h-[130px]">
                          <div className="flex flex-row space-x-2 4xl:space-x-5 items-center">
                            {/* day - 1 */}
                            {tokenData?.dailystreak.dailyRewards.map(
                              (el, idx) => (
                                <div
                                  key={idx}
                                  className={`flex flex-col items-center rounded-lg justify-between m-2 space-y-1 p-2 ${
                                    el.isClaimed
                                      ? "border-[#DD3131]"
                                      : "border-[#57534E]"
                                  } border-[2px] border-dashed`}
                                >
                                  <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#DD3131] to-[#223EAC]">
                                    Day {el.currentDay}
                                  </p>
                                  <div className="flex flex-row space-x-1 items-center">
                                    <img
                                      src="/assets/png/coin.png"
                                      className="h-7 w-7"
                                    />
                                    <p>50</p>
                                  </div>
                                  {el.isClaimed ? (
                                    <div className="p-0.5 w-24 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                      <div className="bg-neutral-900 flex flex-row items-center text-[#e3e3e3] h-[26px] text-center rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                        <p className="mx-auto">claimed</p>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className={`p-0.5 ${
                                        tokenData?.dailystreak.dayToClaim >=
                                        el.currentDay
                                          ? "cursor-pointer"
                                          : "cursor-not-allowed"
                                      } w-24 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]`}
                                      onClick={() => {
                                        if (
                                          tokenData?.dailystreak.dayToClaim ===
                                          el.currentDay
                                        ) {
                                          claimDailyData(el.currentDay);
                                        } else if (
                                          tokenData?.dailystreak.dayToClaim <=
                                          el.currentDay
                                        ) {
                                          return;
                                        } else {
                                          setIsOpenModal(true);
                                          setModalToken(el.currentDay);
                                        }
                                      }}
                                    >
                                      <div
                                        className={`${
                                          tokenData?.dailystreak.dayToClaim >=
                                          el.currentDay
                                            ? "bg-neutral-900"
                                            : "bg-gray-800"
                                        } flex flex-row items-center text-[#e3e3e3] h-[26px] text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]`}
                                      >
                                        <p className="mx-auto">claim</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* second block */}
                <div className="bg-[#242424] inline-block  rounded-lg w-full h-[100px] 2xl:h-[310px] 4xl:h-[415px]">
                  <div className="flex flex-col m-5 space-y-5">
                    <div className="flex flex-col space-y-3">
                      <h5 className="text-3xl">Missions</h5>
                      <h6 className="text-[#9d9e9e]">
                        Unlock the Vault of gaming memories: A Saga of Triumps
                        Tribulation and unforgettable virtual worlds
                      </h6>
                    </div>
                    {/* block */}
                    <div className="w-[100%]">
                      <div className="bg-[#1C1C1C] rounded-lg shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)]">
                        <div className="flex flex-col space-y-4 h-[190px] 2xl:h-[190px] 4xl:h-[240px]">
                          <div className="flex flex-col m-5 space-y-6">
                            {/* content - 1 */}
                            <div className="flex flex-row items-center justify-between space-x-4">
                              <div className="flex flex-row items-center justify-center space-x-5">
                                <img
                                  src="/assets/svg/instagram.svg"
                                  className="h-8 w-8 hover:bounceNew"
                                />
                                <a
                                // href="https://www.instagram.com/gamersback.official/"
                                // target="_blank"
                                // className="hover:underline"
                                >
                                  Follow us on Instagram
                                </a>
                              </div>

                              {/* <h5>40</h5> */}
                              <a
                                className="w-32"
                                href="https://www.instagram.com/gamersback.official/"
                                target="_blank"
                              >
                                <Button text="Go" />
                              </a>
                            </div>
                            {/* content - 2 */}
                            {/* <div className="flex flex-row items-center justify-between space-x-4">
                              <div className="flex flex-row items-center justify-center space-x-5">
                                <img
                                  src="/assets/svg/facebook.svg"
                                  className="h-8 w-8"
                                />
                                <h6>Follow us on Facebook</h6>
                              </div>

                              <h5>40</h5>
                              <div className="w-32">
                                <Button text="claim" />
                              </div>
                            </div> */}
                            {/* content - 3 */}
                            <div className="flex flex-row items-center justify-between space-x-4">
                              <div className="flex flex-row items-center justify-center space-x-5">
                                <img
                                  src="/assets/svg/twitter.svg"
                                  className="h-8 w-8 hover:bounceNew"
                                />
                                <a>Follow us on Twitter</a>
                              </div>

                              {/* <h5 className="pl-5">40</h5> */}
                              <a
                                className="w-32"
                                href="https://twitter.com/i/flow/login?redirect_after_login=%2FGamersbackIndia"
                                target="_blank"
                              >
                                <Button text="Go" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Is Open modal */}
      {isOpenModal && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-90 backdrop-blur-sm flex justify-center items-center">
          <div className="relative w-full max-w-4xl bg-[#242424] rounded-lg shadow-lg p-6 text-base font-semibold text-white">
            <button
              type="button"
              className="absolute right-3 top-3 flex items-end w-8 h-8"
              onClick={() => {
                setIsOpenModal(false);
                setModalToken(null);
              }}
            >
              <img
                src="/assets/svg/close.svg"
                height="26px"
                width="26px"
                style={{ cursor: "pointer" }}
              />
            </button>

            <div className="flex flex-col text-center items-center justify-center mt-3">
              <GradientHeader
                text="Claim Previous day Token..."
                size="header2"
              />
              <p className="text-[#9d9e9e]">
                Are you want to claim previous day token you want to give 5
                token and claim of token 45
              </p>
              <div
                className="w-36 mt-5"
                onClick={() => {
                  claimDailyData(modalToken);
                }}
              >
                <Button text="Claim" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameCoin;
