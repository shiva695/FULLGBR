import PropTypes from "prop-types";

const RadioInput = ({
  inputClassName,
  radioValue,
  radioChange,
  displayValue,
}) => {
  return (
    <div className={inputClassName}>
      <input type="radio" checked={radioValue} onChange={radioChange} />
      <span>{displayValue}</span>
    </div>
  );
};

RadioInput.propTypes = {
  inputClassName: PropTypes.string,
  radioValue: PropTypes.bool,
  radioChange: PropTypes.func,
  displayValue: PropTypes.string,
};

export default RadioInput;
