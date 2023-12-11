import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TokenModal from "../general/uiElements/Modals/TokenModal";
import NotificationModal from "../general/uiElements/Modals/NotificationModal";
import AvatarModal from "../general/uiElements/Modals/AvatarModal";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { config } from "../../config/config";
import AddGameListModal from "../general/uiElements/Modals/AddGameListModal";

const HomeHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isAddGameListModal, setIsAddGameListModal] = useState(false);
  const [cookies] = useCookies();

  const onClose = () => {
    let body = document.getElementsByTagName("body")[0];
    body.classList.remove("lock-scroll");
    setIsTokenModalOpen(false);
  };
  const onCloseNotify = () => {
    let body = document.getElementsByTagName("body")[0];
    body.classList.remove("lock-scroll");
    setIsNotificationModalOpen(false);
  };
  const onCloseAvatar = () => {
    let body = document.getElementsByTagName("body")[0];
    body.classList.remove("lock-scroll");
    setIsAvatarModalOpen(false);
  };

  const onCloseAddGameList = () => {
    setIsAddGameListModal(false);
  };

  useEffect(() => {
    if (location?.pathname === "/game-detail" && location?.state === null) {
      setIsAddGameListModal(true);
    }
  }, [location]);

  return (
    <>
      <nav className="fixed z-10 bg-[#121212] top-0 w-full">
        <div className="relative max-w-screen-xl xl:max-w-screen-2xl  mx-auto my-auto px-6 py-6 flex flex-row items-center justify-between">
          {/* Logo */}
          <img src="/assets/png/GamersBack_Logo.png" height={200} width={200} />

          <div className="hidden md:flex flex-row items-center cursor-pointer justify-center space-x-[50px]">
            {/* icons */}
            {location.pathname === "/home" ? (
              <div className="relative">
                <img
                  src="/assets/png/home-icon.png"
                  alt="home"
                  height="25px"
                  width="25px"
                  className="cursor-pointer relative z-10"
                  onClick={() => navigate("/home")}
                />
                <div className="absolute h-[75px] w-[60px] top-[-19px] rounded-t-[50px] right-[-18px] bg-[#242424]"></div>
                <div className="absolute hump-right h-[15px] w-[15px] top-[41px] right-[-33px] rounded-bl-full bg-[#121212]"></div>
                <div className="absolute hump-left  h-[15px] w-[15px] top-[41px] right-[42px] rounded-br-full bg-[#121212]"></div>
              </div>
            ) : (
              <img
                src="/assets/png/home-icon.png"
                alt="home"
                height="25px"
                width="25px"
                className="cursor-pointer"
                onClick={() => navigate("/home")}
              />
            )}

            {location.pathname === "/game-detail" ? (
              <div className="relative">
                <img
                  src="/assets/png/search-icon.png"
                  alt="home"
                  height="25px"
                  width="25px"
                  className="cursor-pointer relative z-10"
                  onClick={() => {
                    setIsAddGameListModal(true);
                  }}
                />
                <div className="absolute h-[75px] w-[60px] top-[-19px] rounded-t-[50px] right-[-18px] bg-[#242424]"></div>
                <div className="absolute hump-right h-[15px] w-[15px] top-[41px] right-[-33px] rounded-bl-full bg-[#121212]"></div>
                <div className="absolute hump-left  h-[15px] w-[15px] top-[41px] right-[42px] rounded-br-full bg-[#121212]"></div>
              </div>
            ) : (
              <img
                src="/assets/png/search-icon.png"
                alt="home"
                height="25px"
                width="25px"
                className="cursor-pointer"
                onClick={() => {
                  navigate("/game-detail");
                  setIsAddGameListModal(true);
                }}
              />
            )}

            {/* {location.pathname === "/podcast" ? (
              <div className="relative">
                <img
                  src="/assets/png/mic-icon.png"
                  alt="home"
                  height="25px"
                  width="25px"
                  className="cursor-pointer relative z-10"
                  onClick={() => navigate("/podcast")}
                />
                <div className="absolute h-[75px] w-[60px] top-[-19px] rounded-t-[50px] right-[-18px] bg-[#242424]"></div>
                <div className="absolute hump-right h-[15px] w-[15px] top-[41px] right-[-33px] rounded-bl-full bg-[#121212]"></div>
                <div className="absolute hump-left  h-[15px] w-[15px] top-[41px] right-[42px] rounded-br-full bg-[#121212]"></div>
              </div>
            ) : (
              <img
                src="/assets/png/mic-icon.png"
                alt="home"
                height="25px"
                width="25px"
                className="cursor-pointer"
                onClick={() => navigate("/podcast")}
              />
            )} */}

            {/* {location.pathname === "/game-store" ? (
              <div className="relative">
                <img
                  src="/assets/png/joystick-icon.png"
                  alt="home"
                  height="25px"
                  width="25px"
                  className="cursor-pointer relative z-10"
                  onClick={() => navigate("/game-store")}
                />
                <div className="absolute h-[75px] w-[60px] top-[-19px] rounded-t-[50px] right-[-18px] bg-[#242424]"></div>
                <div className="absolute hump-right h-[15px] w-[15px] top-[41px] right-[-33px] rounded-bl-full bg-[#121212]"></div>
                <div className="absolute hump-left  h-[15px] w-[15px] top-[41px] right-[42px] rounded-br-full bg-[#121212]"></div>
              </div>
            ) : (
              <img
                src="/assets/png/joystick-icon.png"
                alt="home"
                height="25px"
                width="25px"
                className="cursor-pointer relative z-10"
                onClick={() => navigate("/game-store")}
              />
            )} */}
          </div>

          <div className="flex flex-row items-center justify-center space-x-12">
            {/* <div className="p-0.5 cursor-pointer w-24 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
            <div className="bg-neutral-900 flex flex-row items-center text-[#e3e3e3] h-[26px] text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
              <img src="/assets/png/coin.png" className="h-7 w-7 ml-2.5" />
              <p>2000</p>
            </div>
          </div> */}
            <img
              src="/assets/png/coin.png"
              alt="home"
              height="25px"
              width="25px"
              className="hidden md:block cursor-pointer"
              onClick={() => {
                let body = document.getElementsByTagName("body")[0];
                body.classList.add("lock-scroll");
                setIsTokenModalOpen(true);
              }}
            />
            <img
              src="/assets/png/settings-icon.png"
              alt="home"
              height="25px"
              width="25px"
              onClick={() => {
                navigate("/settings");
              }}
              className="hidden md:block cursor-pointer"
            />
            <img
              src="/assets/png/notification-icon.png"
              alt="home"
              height="25px"
              width="25px"
              onClick={() => {
                let body = document.getElementsByTagName("body")[0];
                body.classList.add("lock-scroll");
                setIsNotificationModalOpen(true);
              }}
              className="hidden md:block cursor-pointer"
            />
            <img
              src={
                cookies[config.cookieName]?.userData.profilePic ||
                cookies[config.cookieName]?.userData.avatar
              }
              alt="home"
              height="35px"
              width="35px"
              onClick={() => {
                let body = document.getElementsByTagName("body")[0];
                body.classList.add("lock-scroll");
                setIsAvatarModalOpen(true);
              }}
              className="cursor-pointer bg-slate-700 rounded-full"
            />
          </div>
        </div>
      </nav>

      <TokenModal open={isTokenModalOpen} close={onClose} />
      <NotificationModal open={isNotificationModalOpen} close={onCloseNotify} />
      <AvatarModal open={isAvatarModalOpen} close={onCloseAvatar} />
      <AddGameListModal open={isAddGameListModal} close={onCloseAddGameList} />
    </>
  );
};

export default HomeHeader;
