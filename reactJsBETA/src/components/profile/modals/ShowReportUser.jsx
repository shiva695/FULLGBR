import CommonModal1 from "../../generalComponents/CommonModel1";
import PropTypes from "prop-types";

const ShowReportUser = ({
  setShowReportUser,
  setOpenMenu,
  setShowConfirmation,
  setShowPretend,
}) => {
  return (
    <CommonModal1>
      <div className="w-[616px] h-[276px] flex flex-col rounded-[16px] text-[#FAFBFC]">
        <div className="flex flex-row justify-start items-center bg-[#26292B] w-[616px] h-[64px] rounded-t-[16px] ">
          <img
            onClick={() => {
              setShowReportUser(false);
              setOpenMenu(true);
            }}
            src="/assets/svg/left-arrow.svg"
            className="w-[24px] h-[24px] ml-[24px] cursor-pointer"
          />
          <p className=" ml-[24px] font-semibold text-[18px] w-[218px] h-[26px]">
            Report Vinayak Mahadev
          </p>
          <img
            onClick={() => setShowReportUser(false)}
            src="/assets/svg/close-btn.svg"
            className="w-[16px] h-[16px] ml-[282px] cursor-pointer"
          />
        </div>
        <div className="w-[592px] h-[148px] mt-[20px] ml-[12px]">
          <p
            onClick={() => {
              setShowConfirmation(true);
              setShowReportUser(false);
            }}
            className="cursor-pointer h-[48px] w-[592px] flex flex-row justify-between items-center hover:bg-[#2B2E30] hover:rounded-lg p-3"
          >
            Its Posting a content that should not be on Gamersback{" "}
            <img src="/assets/svg/arrow 1.svg" />
          </p>

          <p
            onClick={() => {
              setShowPretend(true);
              setShowReportUser(false);
            }}
            className=" cursor-pointer h-[48px] w-[592px] flex flex-row justify-between items-center hover:bg-[#2B2E30] hover:rounded-lg p-3"
          >
            It&apos;s pretending to be someone else{" "}
            <img src="/assets/svg/arrow 1.svg" />
          </p>
          <p
            onClick={() => {
              setShowConfirmation(true);
              setShowReportUser(false);
            }}
            className="cursor-pointer h-[48px] w-[592px] flex flex-row justify-between items-center hover:bg-[#2B2E30] hover:rounded-lg p-3"
          >
            It may be under the age of 13
            <img src="/assets/svg/arrow 1.svg" />
          </p>
        </div>
      </div>
    </CommonModal1>
  );
};

ShowReportUser.propTypes = {
  setShowReportUser: PropTypes.func,
  setOpenMenu: PropTypes.func,
  setShowConfirmation: PropTypes.func,
  setShowPretend: PropTypes.func,
};

export default ShowReportUser;
