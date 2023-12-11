// @Import Dependencies
import PropTypes from "prop-types";
import OTP from "react-otp-input";

const OtpInput = ({
  mainClassName,
  value,
  valueChange,
  count,
  inputClassName,
}) => {
  return (
    <div className={mainClassName}>
      <OTP
        value={value}
        onChange={valueChange}
        shouldAutoFocus={true}
        numInputs={count}
        containerStyle={{
          gap: "12px",
        }}
        inputStyle={{
          width: "56px",
          height: "56px",
          fontWeight: "bold",
          fontSize: "20px",
        }}
        renderInput={(props) => <input {...props} className={inputClassName} />}
      />
    </div>
  );
};

OtpInput.propTypes = {
  mainClassName: PropTypes.string,
  value: PropTypes.number,
  valueChange: PropTypes.func,
  count: PropTypes.number,
  inputClassName: PropTypes.string,
};

export default OtpInput;
