/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
// import dependencies

import { AiOutlineSetting } from "react-icons/ai";
import { BsGlobe2 } from "react-icons/bs";
import { MdOutlinePersonPin } from "react-icons/md";
import { LuToggleRight } from "react-icons/lu";
// import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

// import files
import constants from "../../json/constants.json";

// eslint-disable-next-line react/prop-types
function Popup({ open, close }) {
  const navigate = useNavigate();
  //Cookies
  const [cookies, setCookie, removeCookie] = useCookies();

  const removeCookies = () => {
    if (cookies[constants.ADMINDATA] !== undefined) {
      removeCookie(constants.ADMINDATA);
      navigate("/login");
    }
  };

  if (!open) {
    return null;
  }
  return (
    <div
      className="flex flex-col fixed inset-0 backdrop-blur-sm z-10"
      onClick={close}
    >
      <div className="h-72 w-1/6 bg-white dark:bg-zinc-700 dark:text-white rounded-xl fixed right-4 top-20 popup-shadow flex flex-col gap-5 justify-center p-5">
        <div className="border-b border-gray-500 pb-4">
          <div className="font-bold">Admin name</div>
          <div className="text-sm">superadmin@gmail.com</div>
        </div>
        <div
          className="flex gap-2 cursor-pointer"
          onClick={() => {
            navigate(constants.PROFILENAVIGATE);
          }}
        >
          <div className="text-2xl">
            <MdOutlinePersonPin />
          </div>
          <div>{constants.PROFILE}</div>
        </div>
        <a href="https://gamersback.com/" target="_blank">
          <div className="flex gap-2 cursor-pointer">
            <div className="text-xl mr-1">
              <BsGlobe2 />
            </div>
            <div>View Site</div>
          </div>
        </a>
        <div
          className="flex gap-2 cursor-pointer"
          onClick={() => {
            navigate(constants.SETTINGNAVIGATE);
          }}
        >
          <div className="text-2xl">
            <AiOutlineSetting />
          </div>
          <div>Settings</div>
        </div>
        <div
          className="flex gap-2 border-t border-gray-500 pt-4 cursor-pointer"
          onClick={removeCookies}
        >
          <div className="text-2xl">
            <LuToggleRight />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
