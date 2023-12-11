/* eslint-disable react/prop-types */
// import files
import constants from "../../json/constants.json";
function PopUpButton({ text, status }) {
  return (
    <div
      className={`p-0.5 w-full border-2 bg-[${
        status === constants.GREEN ? "#92c09a" : "#c6846d"
      }] border-black dark:border-white cursor-pointer rounded-lg `}
    >
      <p className=" text-[#121212] dark:text-white h-[35px] py-1 px-1 text-center rounded-lg font-bold">
        {text}
      </p>
    </div>
  );
}

export default PopUpButton;
