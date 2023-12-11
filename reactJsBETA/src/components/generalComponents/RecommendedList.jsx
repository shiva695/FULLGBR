import PropTypes from "prop-types";

const RecommendedList = ({
  profilePic,
  name,
  userName,
  onClick,
  isSelected,
  mainClassName,
}) => {
  return (
    <div className={mainClassName}>
      <div className="flex space-x-2">
        <img src={profilePic} className="w-[48px] h-[48px] rounded-lg" />
        <p className="font-semibold text-[#FAFBFC] text-[16px] leading-6">
          {name}
          <p className="font-normal text-[#B5B9BD] text-[14px] leading-5 ">
            {userName}
          </p>
        </p>
      </div>
      <button
        onClick={onClick}
        className={`flex text-[#FFFFFF] ${
          isSelected ? "bg-[#2B2E30] w-[87px]" : "bg-[#2E9BFA] w-[67px]"
        } h-[32px]  px-3 justify-center items-center rounded-lg`}
      >
        {isSelected ? "Following" : "Follow"}
      </button>
    </div>
  );
};

RecommendedList.propTypes = {
  profilePic: PropTypes.string,
  mainClassName: PropTypes.string,
  name: PropTypes.string,
  isSelected: PropTypes.bool,
  userName: PropTypes.string,
  onClick: PropTypes.func,
};

export default RecommendedList;
