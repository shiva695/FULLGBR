// Common Modal Layout for popups
// @use <CommonModal>{children => inside create your divs with specific width and height}</CommonModal>

//@Import Dependencies
import PropTypes from "prop-types";

const CommonModal1 = ({ children }) => {
  return (
    <div className="fixed z-10 inset-0 bg-opacity-[60%] backdrop-blur-sm bg-black flex justify-center items-center">
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

CommonModal1.propTypes = {
  children: PropTypes.element,
};

export default CommonModal1;
