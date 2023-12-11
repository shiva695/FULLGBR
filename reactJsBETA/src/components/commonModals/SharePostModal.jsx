import PropTypes from "prop-types";
import CommonBtn1 from "../generalComponents/CommonBtn1";
import CommonModal from "../generalComponents/CommonModal";

const SharePostModal = ({
  setIsSharePostModalOpen,
  setIsDirectShareModalOpen,
}) => {
  return (
    <CommonModal>
      <div className="w-[476px] h-[321px] flex flex-col rounded-[16px]">
        {/* Modal Header */}
        <div className="flex flex-row items-center justify-between px-[24px] py-[20px] rounded-tr-[16px] rounded-tl-[16px] modal-header">
          <div className="flex flex-row items-center gap-[12px]">
            <img src="/assets/svg/left-pointer.svg" className="w-2 h-3" />
            <h1 className="font-semibold text-[18px] text-typo-secondary">
              Share to
            </h1>
          </div>
          <img
            src="/assets/svg/close-btn.svg"
            className="w-3 h-3 cursor-pointer"
            onClick={() => setIsSharePostModalOpen(false)}
          />
        </div>

        {/* Modal Body */}
        <div className="flex flex-col gap-[8px] p-[12px]">
          <div
            onClick={() => {
              setIsSharePostModalOpen(false);
              setIsDirectShareModalOpen(true);
            }}
            className="h-[48px] w-full flex flex-row items-center gap-[15px] p-[12px] hover:bg-[#2B2E30] rounded-[8px] ease-out duration-200"
          >
            <img className="h-4 w-4" src="/assets/svg/share-com.svg" />
            <h5 className="typo-semibold">Share to direct</h5>
          </div>
          <div className="h-[48px] w-full flex flex-row items-center gap-[15px] p-[12px] hover:bg-[#2B2E30] rounded-[8px]">
            <img className="h-4 w-4" src="/assets/svg/email.svg" />
            <h5 className="typo-semibold">Share via Email</h5>
          </div>
          <div className="h-[48px] w-full flex flex-row items-center gap-[15px] p-[12px] hover:bg-[#2B2E30] rounded-[8px]">
            <img className="h-4 w-4" src="/assets/svg/chain-icon.svg" />
            <h5 className="typo-semibold">Url</h5>
          </div>
          <div className="h-[40px] flex flex-row items-center justify-between w-full rounded-[12px] border-[1px] border-[#373A3D]">
            <input
              className="w-[313px] bg-transparent outline-none text-typo-secondary px-[12px] py-[8px]"
              value={"https://www.instagram.com/p/CwCw4zXPtQ4/"}
              type="text"
            />
            <div className="p-1 cursor-pointer hover:opacity-80">
              <CommonBtn1 height="32px" width="59px" text="Copy" />
            </div>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};

SharePostModal.propTypes = {
  setIsSharePostModalOpen: PropTypes.func,
  setIsDirectShareModalOpen: PropTypes.func,
};

export default SharePostModal;
