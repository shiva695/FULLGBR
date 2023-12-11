// @import dependencies
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// @import Handler
import { forgotPasswordHandler, validateEmail } from "./handler/LoginHandler";

// @import Components
import EmailInput from "../inputComponents/EmailInput";
import SubmitButton from "../inputComponents/SubmitButton";
import LoginCommonContainer, {
  ContainerBody,
  ContainerHeader,
} from "../generalComponents/loginCommonContainer";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [resetPasswordForm, setResetPasswordForm] = useState({
    email: "",
    emailError: "",
    isStateEmail: true,
    isButtonDisabled: "",
  });

  const resetFormChangeHandler = (formKey, formValue) => {
    setResetPasswordForm((prevResetForm) => ({
      ...prevResetForm,
      [formKey]: formValue,
    }));
  };

  if (resetPasswordForm.isStateEmail) {
    if (location?.state?.email)
      resetFormChangeHandler("email", location?.state?.email);
    resetFormChangeHandler("isStateEmail", false);
  }

  return (
    <>
      <LoginCommonContainer>
        <ContainerHeader
          title="Reset Password"
          paraText="Forgotten your password?  We'll email you OTP to reset your
              password."
          mainClassName="flex flex-col space-y-4 items-center justify-center mb-[40px]"
        ></ContainerHeader>
        <ContainerBody
          className={
            resetPasswordForm.emailError
              ? "flex flex-col w-[340px] space-y-4"
              : "flex flex-col w-[340px]"
          }
          onSubmit={(ev) =>
            forgotPasswordHandler(
              ev,
              resetPasswordForm.email,
              resetFormChangeHandler,
              navigate
            )
          }
        >
          <EmailInput
            mainClassName="login-form-mainDiv"
            labelClassName="login-form-label"
            lableName=""
            isInputImage={true}
            inputImage="email&username.svg"
            InputImageClassName="login-form-inputImage"
            inputType="email"
            inputPlaceholder="Enter Email"
            inputEmailClassName={
              resetPasswordForm.emailError
                ? "login-form-inputbox-error"
                : "login-form-inputbox"
            }
            emailError={resetPasswordForm.emailError}
            errorClassName="login-form-errorDiv"
            value={resetPasswordForm.email}
            valueChange={(e) => {
              validateEmail(e.target.value, resetFormChangeHandler);
              resetFormChangeHandler("email", e.target.value);
            }}
          />
          <SubmitButton
            buttonName="Send OTP"
            type="submit"
            className={
              resetPasswordForm.isButtonDisabled
                ? "flex justify-center bg-[#2E9BFA] w-[340px] h-[44px] rounded-lg px-4 py-[10px] text-[#FFFFFF] opacity-[60%] cursor-not-allowed"
                : "flex justify-center bg-[#2E9BFA] w-[340px] h-[44px] rounded-lg px-4 py-[10px] text-[#FFFFFF]"
            }
            disabled={false}
          />
        </ContainerBody>
      </LoginCommonContainer>
    </>
  );
}
