import PropTypes from "prop-types";
import CommonModal from "../generalComponents/CommonModal";

const DirectShareModal = ({
  setIsDirectShareModalOpen,
  searchFocus,
  setSearchFocus,
}) => {
  return (
    <CommonModal>
      <div className="relative w-[616px] h-[655px] flex flex-col rounded-[16px]">
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
            onClick={() => setIsDirectShareModalOpen(false)}
          />
        </div>

        {/* Modal Body */}
        <div className="flex flex-col p-[24px]">
          {/* to and search nbtn */}
          <div className="flex flex-col gap-[14px]">
            <h5 className="typo-semibold">To:</h5>
            <div
              style={{
                boxShadow: searchFocus
                  ? "0px 0px 8px 2px #2A85FF99"
                  : "0px 8px 64px 0px #0000001A",
              }}
              className={`${
                searchFocus ? "border-typo-blue border-[2px]" : ""
              } w-full flex flex-row gap-[12px] h-[40px] bg-[#2B2E30] rounded-[20px] py-[10px] px-[12px]`}
            >
              <img src="/assets/svg/search-icon.svg" className="h-5 w-5" />
              <input
                type="text"
                className="w-full bg-transparent outline-none text-typo-secondary"
                placeholder="Search..."
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
              />
            </div>
          </div>

          {/* share to friends */}
          <div className="mt-[4px] flex flex-col gap-[4px]">
            <div className="flex flex-row h-[72px] w-full p-[12px]  items-center justify-between">
              {/* left */}
              <div className="flex flex-row gap-[12px] items-center">
                <img
                  src="/assets/svg/rating-user-avatar.svg"
                  className="h-[48px] w-[48px] rounded-full"
                />
                <div className="flrx flex-col gap-[4px]">
                  <h5 className="typo-semibold">Kathryn Murphy</h5>
                  <h5 className="typo-normal">Rachelle Mayfield</h5>
                </div>
              </div>
              {/* right */}
              <input type="radio" className="radio-input h-5 w-5" />
            </div>
            <div className="flex flex-row h-[72px] w-full p-[12px] items-center justify-between">
              {/* left */}
              <div className="flex flex-row gap-[12px] items-center">
                <img
                  src="/assets/svg/rating-user-avatar.svg"
                  className="h-[48px] w-[48px] rounded-full"
                />
                <div className="flrx flex-col gap-[4px]">
                  <h5 className="typo-semibold">Kathryn Murphy</h5>
                  <h5 className="typo-normal">Rachelle Mayfield</h5>
                </div>
              </div>
              {/* right */}
              <input type="radio" />
            </div>
            <div className="flex flex-row h-[72px] w-full p-[12px] items-center justify-between">
              {/* left */}
              <div className="flex flex-row gap-[12px] items-center">
                <img
                  src="/assets/svg/rating-user-avatar.svg"
                  className="h-[48px] w-[48px] rounded-full"
                />
                <div className="flrx flex-col gap-[4px]">
                  <h5 className="typo-semibold">Kathryn Murphy</h5>
                  <h5 className="typo-normal">Rachelle Mayfield</h5>
                </div>
              </div>
              {/* right */}
              <input type="radio" />
            </div>
          </div>
        </div>
        <div className="absolute rounded-br-[16px] rounded-bl-[16px] bottom-0 left-0 w-full h-[68px] bg-[#2B2E30] py-[12px] px-[24px]">
          <div className="h-[44px] w-full flex items-center justify-center cursor-pointer hover:opacity-[80%] bg-typo-blue rounded-[8px] py-[10px] px-[16px]">
            <h5 className="typo-semibold">Send</h5>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};

DirectShareModal.propTypes = {
  setIsDirectShareModalOpen: PropTypes.func,
  setSearchFocus: PropTypes.func,
  searchFocus: PropTypes.bool,
};

export default DirectShareModal;
