// Import dependencies
import { useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsMoonStars, BsSun } from "react-icons/bs";
import { useCookies } from "react-cookie";

// Import file
import constants from "../../json/constants.json";

// Import components
import Popup from "./Popup";

const Header = () => {
  const [cookies, setCookie] = useCookies();
  const [openModal, setOpenModal] = useState(false);



 




  const onClose = () => {
    setOpenModal(false);
  };
  return (
    <>
      <div className="h-20 bg-white dark:bg-[#121212]">
        <div className="flex justify-between px-5">
          {/* Logo start */}
          <div className="w-52 h-20 content-center">
            <img
              className="mt-5"
              src={
                // eslint-disable-next-line react/prop-types
                cookies[constants.MODE] === "light"
                  ? "/assets/png/GamersBack_Logo_Black.png"
                  : "/assets/png/GamersBack_Logo.png"
              }
            />
          </div>
          {/* search and profile start */}
          <div className="flex flex-row-reverse rounded-xl gap-8 items-center w-1/2">
            <div
              className="rounded-full w-10 cursor-pointer"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <img className="rounded-full" src="/assets/png/profilePic.png" />
            </div>

            <div>
              <AiOutlineBell className="text-3xl dark:text-zinc-200" />
            </div>

            <div className="cursor-pointer">
              {cookies[constants.MODE] === "light" ? (
                <BsSun
                  className="text-2xl dark:text-zinc-200"
                  onClick={() => {
                    setCookie(constants.MODE, JSON.stringify(constants.DARK), {
                      path: "/",
                      maxAge: 3000000,
                      sameSite: "strict",
                    });
                  }}
                />
              ) : (
                <BsMoonStars
                  className="text-2xl dark:text-zinc-200"
                  onClick={() => {
                    setCookie(constants.MODE, JSON.stringify(constants.LIGHT), {
                      path: "/",
                      maxAge: 3000000,
                      sameSite: "strict",
                    });
                  }}
                />
              )}
            </div>

            <div className="w-1/3 h-10 rounded-lg flex justify-between px-3 py-1 bg-tranparent border-black dark:border-white border-[1px] text-[#121212] dark:text-white">
              <div className="ms-5">search</div>
              <div>
                <BiSearch className="text-xl m-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popup open={openModal} close={onClose} />
    </>
  );
};

export default Header;
