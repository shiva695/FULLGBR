//  @import dependencies
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

//  @import Components
import EmailInput from "../inputComponents/EmailInput";
import PasswordInput from "../inputComponents/PasswordInput";
import SubmitButton from "../inputComponents/SubmitButton";
import LoginCommonContainer, {
  ContainerBody,
  ContainerHeader,
  ContainerFooter,
} from "../generalComponents/loginCommonContainer";

// @import Constants
import routeConstants from "../../constants/routeConstants";

// @import Handler
import {
  userLoginHandler,
  togglePasswordVisibility,
  validateHandeler,
} from "./handler/LoginHandler";

export default function Login() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();

  // Form login state variable
  const [loginForm, setLoginForm] = useState({
    email: "",
    emailError: "",
    password: "",
    passwordType: "password",
    passwordError: "",
    rememberMe: false,
    showPassword: false,
    isButtonDisabled: true,
  });

  // Handler Function
  const loginFormChangeHandler = (formKey, formValue) => {
    setLoginForm((prevLoginForm) => ({
      ...prevLoginForm,
      [formKey]: formValue,
    }));
  };

  return (
    <>
      <LoginCommonContainer>
        <ContainerHeader
          title="Welcome to Gamersback"
          mainClassName="flex flex-col space-y-4 items-center justify-center mb-[40px]"
        />
        <ContainerBody
          className={
            loginForm.emailError || loginForm.passwordError
              ? "flex flex-col w-[340px] mb-[90px] space-y-8"
              : "flex flex-col w-[340px] mb-[90px] space-y-6"
          }
          onSubmit={(ev) =>
            userLoginHandler(
              ev,
              loginForm.email,
              loginForm.password,
              cookies,
              navigate,
              setCookie
            )
          }
        >
          <EmailInput
            mainClassName="login-form-mainDiv"
            labelClassName="login-form-label"
            lableName="Email or Username"
            isInputImage={true}
            inputImage="email&username.svg"
            InputImageClassName="login-form-inputImage"
            inputType="text"
            inputPlaceholder="Enter Email or Username"
            inputEmailClassName={
              loginForm.emailError
                ? "login-form-inputbox-error"
                : "login-form-inputbox"
            }
            emailError={loginForm.emailError}
            errorClassName="login-form-errorDiv"
            value={loginForm.email}
            valueChange={(e) => {
              loginFormChangeHandler("email", e.target.value);
              validateHandeler(
                e.target.value,
                loginForm.password,
                loginFormChangeHandler
              );
            }}
          />
          <PasswordInput
            mainClassName="login-form-mainDiv"
            labelClassName="login-form-label"
            lableName="Password"
            isInputImage={true}
            inputImage="lock.svg"
            InputImageClassName="login-form-inputImage"
            inputType={loginForm.passwordType}
            inputPlaceholder="Enter Password"
            inputEmailClassName={
              loginForm.passwordError
                ? "login-form-inputbox-error"
                : "login-form-inputbox"
            }
            passwordError={loginForm.passwordError}
            errorClassName="login-form-errorDiv"
            value={loginForm.password}
            valueChange={(e) => {
              loginFormChangeHandler("password", e.target.value);
              validateHandeler(
                loginForm.email,
                e.target.value,
                loginFormChangeHandler
              );
              if (e.target.value.length === 0) {
                loginFormChangeHandler("passwordError", "");
              }
            }}
            showPassword={loginForm.showPassword}
            togglePasswordVisibility={() =>
              togglePasswordVisibility(
                loginForm.showPassword,
                loginFormChangeHandler
              )
            }
          />
          <div className="flex flex-row w-[340px] h-[20px] justify-between text-xs text-[#B5B9BD] items-center">
            <label className="flex cursor-pointer space-x-2 items-center">
              <input
                type="checkbox"
                className=" rounded-lg"
                checked={loginForm.rememberMe}
                onChange={() =>
                  loginFormChangeHandler("rememberMe", !loginForm.rememberMe)
                }
              />
              <span>Remember me</span>
            </label>
            <p
              onClick={() => navigate(routeConstants.NAVIGATERESETPASSWORD)}
              className="text-[#2E9BFA] cursor-pointer font-normal text-[14px] leading-5 text-center"
            >
              Forget Password?
            </p>
          </div>
          <SubmitButton
            buttonName="Login"
            type="submit"
            className={
              loginForm.isButtonDisabled
                ? "flex justify-center bg-[#2E9BFA] w-[340px] h-[44px] rounded-lg px-4 py-[10px] text-[#FFFFFF] opacity-[60%] cursor-not-allowed"
                : "flex justify-center bg-[#2E9BFA] w-[340px] h-[44px] rounded-lg px-4 py-[10px] text-[#FFFFFF]"
            }
            disabled={loginForm.isButtonDisabled}
          />
        </ContainerBody>
        <ContainerFooter
          titleBody="No account?"
          onClick={() => {
            navigate(routeConstants.NAVIGATESIGNUP);
          }}
          linkName="Sign up"
        />
      </LoginCommonContainer>
    </>
  );
}
