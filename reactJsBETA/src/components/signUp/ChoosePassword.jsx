//  @import dependencies
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// @import Component
import LoginCommonContainer, {
  ContainerBody,
  ContainerHeader,
} from "../generalComponents/loginCommonContainer";
import PasswordInput from "../inputComponents/PasswordInput";
import SubmitButton from "../inputComponents/SubmitButton";

export default function ChoosePassword() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [isPasswordBtnDisabled, setIsPasswordBtnDisabled] = useState(true);

  const togglePasswordVisibility = () => {
    if (!showPassword) setPasswordType("text");
    else setPasswordType("password");
    setShowPassword(!showPassword);
  };

  // Validate email and enable button
  const validateHandeler = () => {
    if (password.length > 3) {
      if (!passwordPattern.test(password)) {
        setPasswordError("Please enter a valid password");
        setIsPasswordBtnDisabled(true);
      } else {
        setPasswordError("");
        setIsPasswordBtnDisabled(false);
      }
    } else {
      setPasswordError("");
      setIsPasswordBtnDisabled(true);
    }
  };

  return (
    <>
      <LoginCommonContainer>
        <ContainerHeader
          title="Choose Password"
          paraText="Let add a Password"
          mainClassName="flex flex-col w-[340px] space-y-4 items-center justify-center"
        ></ContainerHeader>
        <ContainerBody
          onSubmit={(ev) => {
            ev.preventDefault();
            localStorage.setItem("PASSWORD", window.btoa(password));
            navigate("/onboarding");
          }}
        >
          <PasswordInput
            mainClassName="login-form-mainDiv"
            labelClassName="login-form-label"
            lableName=""
            isInputImage={true}
            inputImage="lock.svg"
            InputImageClassName="login-form-inputImage"
            inputType={passwordType}
            inputPlaceholder="Create New Password"
            inputEmailClassName={
              passwordError
                ? "login-form-inputbox-error"
                : "login-form-inputbox"
            }
            passwordError={passwordError}
            errorClassName="login-form-errorDiv"
            value={password}
            valueChange={(e) => {
              validateHandeler();
              setPassword(e.target.value);
              if (e.target.value.length === 0) {
                setPasswordError("");
              }
            }}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
          {password.length > 3 && !isPasswordBtnDisabled ? (
            <p className="w-[340px] h-[40px] text-[#999999] font-regular text-[14px] leading-5 text-center mt-[20px] mb-[20px]">
              Your password is top notch.
            </p>
          ) : (
            <p className="w-[340px] h-[40px] text-[#999999] font-regular text-[14px] leading-5 text-center mt-[20px] mb-[20px]">
              Create an 8+ character password with letters, numbers, & symbols.
            </p>
          )}
          <SubmitButton
            type="submit"
            buttonName="Reset Password"
            className={
              isPasswordBtnDisabled
                ? "flex justify-center bg-[#2E9BFA] w-[340px] h-[44px] rounded-lg px-4 py-[10px] text-[#FFFFFF] opacity-[60%] cursor-not-allowed"
                : "flex justify-center bg-[#2E9BFA] w-[340px] h-[44px] rounded-lg px-4 py-[10px] text-[#FFFFFF]"
            }
            disabled={isPasswordBtnDisabled}
          />
        </ContainerBody>
      </LoginCommonContainer>
    </>
  );
}
