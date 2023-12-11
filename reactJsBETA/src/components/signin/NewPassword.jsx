//  @import dependencies
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// @import Handler
import {
  resetPasswordHandler,
  togglePasswordVisibility,
  validatePassword,
} from "./handler/LoginHandler";

// @import Component
import LoginCommonContainer, {
  ContainerBody,
  ContainerHeader,
} from "../generalComponents/loginCommonContainer";
import PasswordInput from "../inputComponents/PasswordInput";
import SubmitButton from "../inputComponents/SubmitButton";

export default function NewPassword() {
  const navigate = useNavigate();
  const [newPasswordForm, setNewPasswordForm] = useState({
    newPassword: "",
    newPasswordError: "",
    showPassword: false,
    passwordType: "password",
    isButtonDisabled: true,
  });

  // newpassword handler
  const newPasswordChangeHandler = (formKey, formValue) => {
    setNewPasswordForm((prevPassword) => ({
      ...prevPassword,
      [formKey]: formValue,
    }));
  };

  return (
    <>
      <LoginCommonContainer>
        <ContainerHeader
          title="Enter new password"
          paraText="Enter your new password below"
          mainClassName="flex flex-col w-[340px] space-y-4 items-center justify-center"
        ></ContainerHeader>
        <ContainerBody
          onSubmit={(ev) =>
            resetPasswordHandler(
              ev,
              newPasswordForm.newPassword,
              navigate,
              newPasswordChangeHandler
            )
          }
        >
          <PasswordInput
            mainClassName="login-form-mainDiv"
            labelClassName="login-form-label"
            lableName=""
            isInputImage={true}
            inputImage="lock.svg"
            InputImageClassName="login-form-inputImage"
            inputType={newPasswordForm.passwordType}
            inputPlaceholder="Enter Password"
            inputEmailClassName={
              newPasswordForm.newPasswordError
                ? "login-form-inputbox-error"
                : "login-form-inputbox"
            }
            passwordError={newPasswordForm.newPasswordError}
            errorClassName="login-form-errorDiv"
            value={newPasswordForm.newPassword}
            valueChange={(e) => {
              validatePassword(e.target.value, newPasswordChangeHandler);
              newPasswordChangeHandler("newPassword", e.target.value);
              if (e.target.value.length === 0) {
                newPasswordChangeHandler("newPasswordError", "");
              }
            }}
            showPassword={newPasswordForm.showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
          <p className="w-[340px] h-[40px] text-[#999999] font-regular text-[14px] leading-5 text-center mt-[20px] mb-[20px]">
            Create an 8+ character password with letters, numbers, & symbols.
          </p>
          <SubmitButton
            buttonName="Reset Password"
            className={
              newPasswordForm.isButtonDisabled
                ? "flex justify-center bg-[#2E9BFA] w-[340px] h-[44px] rounded-lg px-4 py-[10px] text-[#FFFFFF] opacity-[60%] cursor-not-allowed"
                : "flex justify-center bg-[#2E9BFA] w-[340px] h-[44px] rounded-lg px-4 py-[10px] text-[#FFFFFF]"
            }
            type="submit"
            disabled={newPasswordForm.isButtonDisabled}
          />
        </ContainerBody>
      </LoginCommonContainer>
    </>
  );
}
