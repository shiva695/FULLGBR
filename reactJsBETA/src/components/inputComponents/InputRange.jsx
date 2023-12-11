import PropTypes from "prop-types";

const InputRange = ({ value, valueChange, min, max, step, className }) => {
  return (
    <input
      type="range"
      className={className}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={valueChange}
    />
  );
};

InputRange.propTypes = {
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  valueChange: PropTypes.func,
  className: PropTypes.string,
};

export default InputRange;
