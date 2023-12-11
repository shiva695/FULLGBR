// @Import Dependencies
import PropTypes from "prop-types";

const EmailInput = ({
  mainClassName,
  labelClassName,
  lableName,
  isInputImage,
  inputImage,
  InputImageClassName,
  inputType,
  inputPlaceholder,
  inputEmailClassName,
  emailError,
  errorClassName,
  value,
  valueChange,
}) => {
  return (
    <div className={mainClassName}>
      {lableName && <p className={labelClassName}>{lableName}</p>}
      <div className="flex relative flex-row items-center">
        {isInputImage && (
          <img
            className={InputImageClassName}
            src={`/assets/svg/${inputImage}`}
          />
        )}
        <input
          type={inputType}
          placeholder={inputPlaceholder}
          className={inputEmailClassName}
          value={value}
          onChange={valueChange}
        />
      </div>
      {emailError && <p className={errorClassName}>{emailError}</p>}
    </div>
  );
};

EmailInput.propTypes = {
  mainClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  lableName: PropTypes.string,
  isInputImage: PropTypes.bool,
  inputImage: PropTypes.string,
  InputImageClassName: PropTypes.string,
  inputType: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  inputEmailClassName: PropTypes.string,
  emailError: PropTypes.string,
  errorClassName: PropTypes.string,
  value: PropTypes.string,
  valueChange: PropTypes.func,
};

export default EmailInput;
