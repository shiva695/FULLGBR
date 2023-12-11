// @Import Dependencies
import PropTypes from "prop-types";

const CommonBtn1 = ({ buttonName, className, onClick, disabled, type }) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonName}
    </button>
  );
};

CommonBtn1.propTypes = {
  buttonName: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CommonBtn1;
