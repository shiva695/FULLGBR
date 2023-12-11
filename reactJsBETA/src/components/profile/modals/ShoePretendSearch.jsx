import CommonModal1 from "../../generalComponents/CommonModel1";
import PropTypes from "prop-types";

const ShoePretendSearch = ({ setShowPretendSearch, setShowPretend }) => {
  return (
    <CommonModal1>
      <div className="w-[616px] h-[655px] flex flex-col  rounded-[16px] text-[#FAFBFC]">
        <div className="bg-[#26292B] w-[616px] h-[64px] rounded-t-lg flex flex-row  ">
          <img
            onClick={() => {
              setShowPretendSearch(false);
              setShowPretend(true);
            }}
            className="w-[24px] h-[24px] my-[20px] p-[6px] ml-[24px] cursor-pointer"
            src="/assets/svg/left-pointer.svg"
          />
          <h1 className="w-[218px] h-[26px] mt-[19px] ml-[12px] font-semibold text-[18px] leading-[26px] text-[#FAFBFC] ">
            Report Vinayak Mahadev
          </h1>
          <img
            onClick={() => {
              setShowPretendSearch(false);
            }}
            className="w-[32px] h-[32px] mt-[16px] p-[10px] ml-[282px] cursor-pointer"
            src="/assets/svg/close-btn.svg"
          />
        </div>
        <h1 className="w-[339px] h-[26px] mt-[20px]  ml-[24px] font-semibold text-[18px] leading-[26px] text-[#FAFBFC]">
          Who is this account pretending to be?
        </h1>

        <div className="relative flex justify-center items-center mt-[12px]">
          <img
            className="absolute left-[36px] top-[22px] transform -translate-y-1/2 w-5 h-5"
            src="/assets/svg/search-icon.svg"
            alt="Search Icon"
          />
          <input
            type="search"
            placeholder="Search"
            className="w-[568px] h-[40px]  pl-10 rounded-full bg-[#2B2E30] text-white focus:border-2 outline-none focus:border-[#2E9BFA]"
          />
        </div>

        <div className=" w-[560px] h-[72px]  rounded-lg  flex flex-row">
          <img
            src="/assets/svg/Ellipse 1494 (2).svg"
            className="w-[48px] h-[48px] mt-[12px] ml-[24px]"
          />
          <p className="font-semibold text-[#FAFBFC] text-[16px] leading-6 p-[12px]">
            Marvin McKinney{" "}
            <p className="font-normal text-[#B5B9BD] text-[14px] leading-5 ">
              Rachelle Mayfield
            </p>
          </p>
        </div>

        <div className="w-[616px] h-[80px] mt-[360px] rounded-b-lg flex justify-center items-center space-x-4">
          <button
            onClick={() => {
              setShowPretendSearch(false);
            }}
            className="w-[568px] h-[44px] bg-[#2E9BFA] rounded-lg "
          >
            Submit Report
          </button>
        </div>
      </div>
    </CommonModal1>
  );
};

ShoePretendSearch.propTypes = {
  setShowPretend: PropTypes.func,
  setShowPretendSearch: PropTypes.func,
};

export default ShoePretendSearch;
