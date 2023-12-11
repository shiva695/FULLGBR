import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";
import { useNavigate } from "react-router-dom";
import { FaCommentDots, FaSignOutAlt, FaCoins } from "react-icons/fa";
import { apiList, invokeApi } from "../../../../services/apiServices";
import FeedbackModal from "./FeedbackModal";

const AvatarModal = ({ open, close }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [invokeCookie, setInvokeCookie] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const onClose = () => setFeedbackModalOpen(false);

  // Removing cookies when logout
  useEffect(() => {
    const removeCookies = async () => {
      let params = {};
      let response = await invokeApi(
        config.apiDomains + apiList.userLogout,
        params,
        cookies
      );
      if (response.customcode === 200) {
        if (cookies[config.cookieName]) {
          removeCookie(config.cookieName, { path: "/" });
        }
        if (cookies[config.deviceCookie]) {
          removeCookie(config.deviceCookie, { path: "/" });
        }
        navigate("/");
      }
    };
    if (invokeCookie) {
      setInvokeCookie(false);
      removeCookies();
    }
  }, [cookies, navigate, invokeCookie]);

  // if (!open) {
  //   return null;
  // }

  return (
    <>
      {open && (
        <div
          onClick={() => close()}
          className="fixed z-10 inset-0 cursor-pointer bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="absolute top-[74px] right-[35px] 4xl:right-[215px] modal-notch"></div>
          <div className="absolute top-[105px] right-[10px] 4xl:right-[190px] w-[350px] bg-[#242424] rounded-lg shadow-lg p-4  font-semibold text-white">
            <div className="flex flex-row space-x-2">
              <img
                src={
                  cookies[config.cookieName]?.userData.profilePic ||
                  cookies[config.cookieName]?.userData.avatar
                }
                className="h-[60px] w-[60px] rounded-full bg-slate-600"
              />
              <div className="flex flex-col">
                <h5>{cookies[config.cookieName]?.userData.userName}</h5>
                <p>{cookies[config.cookieName]?.userData.email}</p>
              </div>
            </div>
            <div>
              <div className="bg-[#1C1C1C] text-[#9d9e9e] rounded-lg mt-4 shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)]">
                <div className="flex flex-col h-auto">
                  <div className="m-5 flex flex-col gap-5">
                    <div className="md:hidden flex flex-row items-center space-x-5">
                      <img
                        src="/assets/png/home-icon.png"
                        className="h-6 w-6"
                      />
                      <p>Home</p>
                    </div>
                    <div className="md:hidden flex flex-row items-center space-x-5">
                      <img
                        src="/assets/png/search-icon.png"
                        className="h-6 w-6"
                      />
                      <p>Search</p>
                    </div>
                    <div className="md:hidden flex flex-row items-center space-x-5">
                      <img src="/assets/png/mic-icon.png" className="h-6 w-6" />
                      <p>Podcast</p>
                    </div>
                    <div className="md:hidden flex flex-row items-center space-x-5">
                      <img
                        src="/assets/png/joystick-icon.png"
                        className="h-6 w-6"
                      />
                      <p>Store</p>
                    </div>
                    <div className="md:hidden flex flex-row items-center space-x-5">
                      <FaCoins className="h-6 w-6" />
                      <p>Coins</p>
                    </div>
                    <div className="md:hidden flex flex-row items-center space-x-5">
                      <img
                        src="/assets/png/settings-icon.png"
                        className="h-6 w-6"
                      />
                      <p>Settings</p>
                    </div>
                    <div className="md:hidden flex flex-row items-center space-x-5">
                      <img
                        src="/assets/png/notification-icon.png"
                        className="h-6 w-6"
                      />
                      <p>Notification</p>
                    </div>
                    <div
                      className="flex flex-row items-center space-x-5"
                      onClick={() => {
                        setFeedbackModalOpen(true);
                      }}
                    >
                      {/* <img src="/assets/png/feedback.png" className="h-10 w-10" /> */}
                      <FaCommentDots className="h-6 w-6" />
                      <p>Feedback</p>
                    </div>
                    <div
                      className="flex flex-row items-center space-x-5"
                      onClick={() => {
                        setInvokeCookie(true);
                      }}
                    >
                      <FaSignOutAlt className="h-6 w-6" />
                      <p>Logout</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      <FeedbackModal open={feedbackModalOpen} onClose={onClose} />
    </>
  );
};

export default AvatarModal;
