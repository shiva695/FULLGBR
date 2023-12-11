// Common Modal Layout for popups
// @use <CommonModal>{children => inside create your divs with specific width and height}</CommonModal>

//@Import Dependencies
import PropTypes from "prop-types";

const CommonModal = ({ children }) => {
  return (
    <div className="fixed z-10 inset-0 bg-opacity-[60%] backdrop-blur-2xl bg-black flex justify-center items-center w-screen h-screen">
      <div className="bg-gradient-to-tl from-[#252525] from-[70%] to-gray-600 rounded-[16px]">
        <div className="bg-[#252525] bg-opacity-[100%] ml-[1px] mt-[1px] rounded-[16px]">
          <div className="flex flex-col rounded-[16px] bg-[url('/assets/svg/Noise.svg')] bg-no-repeat bg-cover bg-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalHeader = ({
  title = "Modal Title",
  onClose = () => {},
  onBack = () => {},
}) => {
  return (
    <div className="flex flex-row items-center justify-between px-[24px] py-[20px] rounded-tr-[16px] rounded-tl-[16px] modal-header">
      <div className="flex flex-row items-center gap-[12px]">
        <img
          src="/assets/svg/left-pointer.svg"
          className="w-2 h-3"
          onClick={onBack}
        />
        <h1 className="font-semibold text-[18px] text-typo-secondary">
          {title}
        </h1>
      </div>
      <img
        src="/assets/svg/close-btn.svg"
        className="w-3 h-3 cursor-pointer"
        onClick={onClose}
      />
    </div>
  );
};

const ModalBody = ({ children }) => {
  return (
    <div className="h-full flex flex-col gap-[16px] p-[24px]">{children}</div>
  );
};

CommonModal.propTypes = {
  children: PropTypes.element,
};

ModalHeader.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  onBack: PropTypes.func,
};

ModalBody.propTypes = {
  children: PropTypes.element,
};

export { ModalHeader, ModalBody };
export default CommonModal;
