import PropTypes from "prop-types";

const TextInput = ({
  label,
  placeholder,
  mainClassName,
  inputClassName,
  errorClassName,
  error,
  value,
  valueChange,
  showSpinner,
  inputBlur,
  maxlength,
}) => {
  return (
    <div className={mainClassName}>
      {label && (
        <p className="bg-transparent  h-[20px] font-normal text-[14px] leading-5 text-[#FAFBFC]">
          {label}
        </p>
      )}
      <div className="flex flex-row relative items-center">
        <input
          className={inputClassName}
          placeholder={placeholder}
          value={value}
          onChange={valueChange}
          onBlur={inputBlur}
          maxLength={maxlength}
        />
        {showSpinner && (
          <img
            src="/assets/png/spinnerGif.gif"
            className="absolute right-2 h-[20px] w-[20px]"
          />
        )}
      </div>

      {error && (
        <p className={errorClassName}>
          <img src="/assets/svg/errorInfo.svg" className="h-[18px] w-[18px]" />
          <p className="text-typo-red text-sm">{error}</p>
        </p>
      )}
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  mainClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  valueChange: PropTypes.func,
  showSpinner: PropTypes.bool,
  inputBlur: PropTypes.func,
  maxlength: PropTypes.string,
};

export default TextInput;
