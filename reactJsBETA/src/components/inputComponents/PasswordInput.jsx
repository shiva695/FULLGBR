// @Import Dependencies
import PropTypes from "prop-types";

const PasswordInput = ({
  mainClassName,
  labelClassName,
  lableName,
  isInputImage,
  inputImage,
  InputImageClassName,
  inputType,
  inputPlaceholder,
  inputEmailClassName,
  passwordError,
  errorClassName,
  value,
  valueChange,
  togglePasswordVisibility,
  showPassword,
}) => {
  return (
    <div className={mainClassName}>
      <p className={labelClassName}>{lableName}</p>
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
          autoComplete="new-password"
          value={value}
          onChange={valueChange}
        />
        <button
          type="button"
          className="absolute text-[#7D8185] right-[5px] w-6 h-6 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <img
              className="w-[20px] h-[20px] left-[10px]"
              src="/assets/svg/eye.svg"
            />
          ) : (
            <img
              className="w-[20px] h-[20px] left-[10px]"
              src="/assets/svg/eyecross.svg"
            />
          )}
        </button>
      </div>
      {passwordError && <p className={errorClassName}>{passwordError}</p>}
    </div>
  );
};

PasswordInput.propTypes = {
  mainClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  lableName: PropTypes.string,
  isInputImage: PropTypes.bool,
  inputImage: PropTypes.string,
  InputImageClassName: PropTypes.string,
  inputType: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  inputEmailClassName: PropTypes.string,
  passwordError: PropTypes.string,
  errorClassName: PropTypes.string,
  value: PropTypes.string,
  valueChange: PropTypes.func,
  togglePasswordVisibility: PropTypes.func,
  showPassword: PropTypes.bool,
};

export default PasswordInput;
