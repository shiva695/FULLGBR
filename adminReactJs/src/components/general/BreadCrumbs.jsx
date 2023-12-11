/* eslint-disable react/prop-types */
// import dependencies
import { AiOutlineHome } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

// Import files
import constants from "../../json/constants.json";

const BreadCrumbs = ({ nav1, nav2, link, clickHandler }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row  items-center space-x-3">
      <AiOutlineHome
        size={25}
        className="cursor-pointer dark:text-white text-[#121212]"
        onClick={() => navigate(constants.DASHBOARDNAVIGATE)}
      />
      <IoIosArrowForward size={20} className="dark:text-white text-[#121212]" />
      <div
        className={`text-lg ${
          nav2 !== undefined
            ? "dark:text-white cursor-pointer"
            : "dark:text-white text-black font-bold cursor-pointer"
        }`}
        onClick={() => {
          navigate(link);
          clickHandler(false);
        }}
      >
        {nav1}
      </div>
      {!!nav2 && (
        <>
          <IoIosArrowForward
            size={20}
            className="dark:text-white text-[#121212]"
          />
          <div
            className={`dark:text-white text-black font-bold cursor-pointer`}
          >
            {nav2}
          </div>
        </>
      )}
    </div>
  );
};

export default BreadCrumbs;
