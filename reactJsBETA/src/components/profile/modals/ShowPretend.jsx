import CommonModal1 from "../../generalComponents/CommonModel1";
import PropTypes from "prop-types";

const ShowPretend = ({
  setShowPretend,
  setShowReportUser,
  setShowPretendSearch,
}) => {
  return (
    <CommonModal1>
      <div className="w-[616px] h-[450px] flex flex-col  rounded-[16px] text-[#FAFBFC]">
        <div className="bg-[#26292B] w-[616px] h-[64px] rounded-t-lg flex flex-row">
          <img
            onClick={() => {
              setShowPretend(false);
              setShowReportUser(true);
            }}
            className="w-[24px] h-[24px] my-[20px] p-[6px] ml-[24px] cursor-pointer"
            src="/assets/svg/left-pointer.svg"
          />
          <h1 className="w-[218px] h-[26px] mt-[19px] ml-[12px] font-semibold text-[18px] leading-[26px] text-[#FAFBFC]">
            Report Vinayak Mahadev
          </h1>
          <img
            onClick={() => {
              setShowPretend(false);
            }}
            className="w-[32px] h-[32px] mt-[16px] p-[10px] ml-[282px] cursor-pointer"
            src="/assets/svg/close-btn.svg"
          />
        </div>
        <h1 className="w-[330px] h-[26px] mt-[20px]  ml-[24px] font-semibold text-[18px] leading-[26px] text-[#FAFBFC]">
          Who is this account pretending to be?
        </h1>

        <div className="w-[592px] h-[216px] mt-[12px]  ml-[12px] font-normal text-[16px] leading-[24px] text-[#FAFBFC] flex flex-col">
          <div className="w-[592px] h-[48px] flex flex-row justify-start items-center space-x-3 p-2">
            <input type="radio" name="selection" />
            <p>Me</p>
          </div>
          <div className="w-[592px] h-[48px] flex flex-row justify-start items-center space-x-3 p-2 mt-[8px]">
            <input type="radio" name="selection" />
            <p>Someone I follow</p>
          </div>
          <div className="w-[592px] h-[48px] flex flex-row justify-start items-center space-x-3 p-2 mt-[8px]">
            <input type="radio" name="selection" />
            <p>A celebrity or public figure</p>
          </div>
          <div className="w-[592px] h-[48px] flex flex-row justify-start items-center space-x-3 p-2 mt-[8px]">
            <input type="radio" name="selection" />
            <p>A business or organization</p>
          </div>
        </div>

        <button
          onClick={() => {
            setShowPretendSearch(true);
            setShowPretend(false);
          }}
          className="w-[568px] h-[44px] bg-[#2E9BFA] rounded-lg mt-[40px] ml-[24px] "
        >
          Submit Report
        </button>
      </div>
    </CommonModal1>
  );
};

ShowPretend.propTypes = {
  setShowReportUser: PropTypes.func,
  setShowPretend: PropTypes.func,
  setShowPretendSearch: PropTypes.func,
};

export default ShowPretend;
