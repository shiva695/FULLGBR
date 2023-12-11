import PropTypes from "prop-types";
import CommonModal from "../generalComponents/CommonModal";
import CommonBtn3 from "../generalComponents/CommonBtn3";

const RemovePostModal = ({ setIsRemovePostModalOpen }) => {
  return (
    <CommonModal>
      <div className="w-[470px] h-[190px] flex flex-col justify-between rounded-[16px] p-[24px]">
        <div className="flex flex-col gap-[8px]">
          <h5 className="text-[18px] text-typo-secondary">Remove Post?</h5>
          <h5 className="typo-normal">
            Are you sure you want to remove this post?
          </h5>

          <div className="flex flex-row justify-between mt-[32px]">
            <div
              onClick={() => setIsRemovePostModalOpen(false)}
              className="hover:opacity-80"
            >
              <CommonBtn3
                height="44px"
                width="190px"
                bgColor="#2B2E30"
                text="Cancel"
              />
            </div>
            <div className="hover:opacity-80">
              <CommonBtn3
                height="44px"
                width="190px"
                bgColor="#FF523B"
                text="Remove"
              />
            </div>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};

RemovePostModal.propTypes = {
  setIsRemovePostModalOpen: PropTypes.func,
};

export default RemovePostModal;
