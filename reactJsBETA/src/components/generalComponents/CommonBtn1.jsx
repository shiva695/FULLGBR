// Common Btn1  for only Text
// @use <CommonBtn1 height, width => your height amd width with px text => string  />

// @Import Dependencies
import PropTypes from "prop-types";

const CommonBtn1 = ({ height, width, text, bgColor, onClick, disabled }) => {
  const btnStyle = {
    height: height,
    width: width,
    backgroundColor: bgColor ? bgColor : "#2E9BFA",
    padding: "6px 12px 6px 12px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };
  return (
    <button style={btnStyle} onClick={onClick} disabled={disabled}>
      <h5 className="text-[14px] text-white text-normal">{text}</h5>
    </button>
  );
};

CommonBtn1.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  text: PropTypes.string,
  bgColor: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CommonBtn1;
