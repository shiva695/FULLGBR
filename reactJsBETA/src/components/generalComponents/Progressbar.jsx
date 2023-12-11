// @Import Dependencies
import PropTypes from "prop-types";

const LinearProgressbar = ({ bgColor, rating }) => {
  return (
    <div className="w-[179px] bg-[#2B2E30] rounded-full h-1.5">
      <div
        className={`h-[6px] rounded-full`}
        style={{ width: rating, backgroundColor: bgColor }}
      ></div>
    </div>
  );
};

LinearProgressbar.propTypes = {
  bgColor: PropTypes.string,
  rating: PropTypes.string,
};

export default LinearProgressbar;
