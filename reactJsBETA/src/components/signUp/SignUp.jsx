/* eslint-disable no-unused-vars */
// @import Dependencies
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

// @import Json
import constants from "../../json/constants.json";

import constant from "../../constants/generalConstants";

// @import Components
import LoginCommonContainer, {
  ContainerHeader,
  ContainerHeadBody,
  ContainerFooter,
} from "../generalComponents/loginCommonContainer";
import SubmitButton from "../inputComponents/SubmitButton";

export default function SignUp() {
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const location = useLocation();
  const [cookies, setCookie] = useCookies();
  const [showEmail, setShowEmail] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [accType, setAccType] = useState(true);
  const [email, setEmail] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [isEmailBtnDisabled, setIsEmailBtnDisabled] = useState(true);
  const navigate = useNavigate();
  const [isStateEmail, setIsStateEmail] = useState(true);

  // setting state variable to location
  if (isStateEmail) {
    if (location?.state?.email) {
      setEmail(location?.state?.email);
      setShowAccount(true);
      setAccType(false);
      setShowEmail(!showEmail);
    }
    setIsStateEmail(false);
  }

  const handleChangeAccount = () => {
    setShowAccount(false);
    setAccType(true);
  };

  // Validate email and enable button
  const validateChange = () => {
    if (email.length > 3) {
      if (!emailPattern.test(email)) {
        setShowEmailError(`${email} is not a valid Email address`);
        setIsEmailBtnDisabled(true);
      } else {
        setShowEmailError("");
        setIsEmailBtnDisabled(false);
      }
    } else {
      setShowEmailError("");
      setIsEmailBtnDisabled(true);
    }
  };

  return (
    <>
      <LoginCommonContainer>
        <ContainerHeader
          title="Welcome To Gamersback"
          mainClassName="flex flex-col space-y-4 items-center justify-center "
        />
        <ContainerHeadBody>
          {accType && (
            <p className="w-[210px] text-[#999999] text-[14px] leading-5 mb-[40px]">
              Choose an account type.
            </p>
          )}
          {showAccount && (
            <p className="flex w-[360px] text-[#999999] text-[14px] items-center justify-center leading-5 mb-[40px]">
              Create account with your email.
              <span
                onClick={handleChangeAccount}
                className="cursor-pointer text-[14px] text-typo-blue font-normal"
              >
                &nbsp; Change account
              </span>
            </p>
          )}
        </ContainerHeadBody>
        {accType && (
          <div
            className={`flex flex-row w-[460px] h-[150px] space-x-2 text-[#FFFFFF] mb-[232px]`}
          >
            <div
              onClick={() => {
                setShowAccount(true);
                setAccType(false);
                setCookie(
                  constants.COOKIES.ACCTYPECOOKIES,
                  JSON.stringify(constant.NORMAL),
                  {
                    path: "/",
                    maxAge: 3000000,
                    sameSite: "strict",
                  }
                );
              }}
              className="bg-[#2B2E30] hover:bg-[#494949] cursor-pointer rounded-2xl w-[150px] h-[150px] flex relative items-end p-2"
            >
              <div
                className={`absolute flex flex-col w-[62px] h-[60px] top-[70px] left-[12px] space-y-2 wobble-vertical`}
              >
                <img
                  src="/assets/svg/Group 772537424 (2).svg"
                  className="w-[32px] h-[32px] "
                />
                <p className="w-[36px] h-[24px] leading-4 text-[12px]">
                  Regular Account
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                setShowAccount(true);
                setAccType(false);
                setCookie(
                  constants.COOKIES.ACCTYPECOOKIES,
                  JSON.stringify(constant.TOURNAMENT),
                  {
                    path: "/",
                    maxAge: 3000000,
                    sameSite: "strict",
                  }
                );
              }}
              className="bg-[#2B2E30] hover:bg-[#494949] cursor-pointer rounded-2xl w-[150px] h-[150px] flex relative items-end p-2"
            >
              <div
                className={`absolute flex flex-col w-[62px] h-[60px] top-[70px] left-[12px] space-y-2 wobble-vertical`}
              >
                <img
                  src="/assets/svg/Group 772537424 (2).svg"
                  className="w-[32px] h-[32px] "
                />
                <p className="w-[36px] h-[24px] leading-4 text-[12px]">
                  Tournament Organizer
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                setShowAccount(true);
                setAccType(false);
                setCookie(
                  constants.COOKIES.ACCTYPECOOKIES,
                  JSON.stringify(constant.TEAM),
                  {
                    path: "/",
                    maxAge: 3000000,
                    sameSite: "strict",
                  }
                );
              }}
              className="bg-[#2B2E30] hover:bg-[#494949] cursor-pointer rounded-2xl w-[150px] h-[150px] flex relative items-end p-2"
            >
              <div
                className={`absolute flex flex-col w-[62px] h-[60px] top-[70px] left-[12px] space-y-2 wobble-vertical`}
              >
                <img
                  src="/assets/svg/Group 772537424 (2).svg"
                  className="w-[32px] h-[32px] "
                />
                <p className="w-[36px] h-[24px] leading-4 text-[12px]">
                  Buisness Account
                </p>
              </div>
            </div>
          </div>
        )}
        {showAccount && (
          <div
            className={`flex flex-row w-[340px] h-[120px] space-x-2 ${
              showEmail ? "mb-[32px]" : "mb-[232px]"
            }`}
          >
            <div className="bg-[#2B2E30] hover:bg-[#494949] cursor-pointer rounded-[16px] w-[90px] h-[120px] flex relative items-end p-2">
              <div
                className={`absolute flex flex-col w-[48px] h-[60px] top-[58px] left-[12px] wobble-vertical `}
              >
                <img
                  src="/assets/svg/gmail.svg"
                  className={`w-[24px] h-[24px] mb-2`}
                />
                <p className="w-[48px] h-[24px] text-[#FAFBFC] text-[12px]">
                  Google
                </p>
              </div>
            </div>
            <div className="bg-[#2B2E30] hover:bg-[#494949] cursor-pointer rounded-[16px] w-[90px] h-[120px] flex relative items-end p-2">
              <div
                className={`absolute flex flex-col w-[62px] h-[60px] top-[58px] left-[12px] wobble-vertical`}
              >
                <img
                  src="/assets/svg/facebookIcon.svg"
                  className={`w-[24px] h-[24px] mb-2`}
                />
                <p className="w-[62px] h-[24px] text-[#FAFBFC] text-[12px]">
                  Facebook
                </p>
              </div>
            </div>
            <div
              onClick={() => setShowEmail(!showEmail)}
              className="bg-[#2B2E30] hover:bg-[#494949] cursor-pointer rounded-[16px] w-[150px] h-[120px] flex relative items-end p-2"
            >
              <div
                className={`absolute flex flex-col w-[52px] h-[64px]  ${
                  showEmail
                    ? "top-[50px] left-[12px]"
                    : "top-[76px] left-[12px]"
                } wobble-vertical`}
              >
                <p className="w-[53px] h-[28px] text-[#FAFBFC] text-[20px] mb-2">
                  Email
                </p>

                {showEmail && (
                  <p className="w-[45px] h-[24px] text-[#B5B9BD] text-[14px]">
                    Type...
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        {showEmail && (
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              localStorage.setItem("EMAIL", window.btoa(email));
              navigate("/verifyemail", { state: { email } });
            }}
          >
            <div className="flex flex-col w-[366px] space-y-4 mb-[100px]">
              <div className="flex flex-col w-[340px] h-auto space-y-2 mx-auto">
                <div className="flex relative flex-row items-center">
                  <img
                    className="w-[20px] h-[20px] flex absolute left-[10px]"
                    src="/assets/svg/email&username.svg"
                  />
                  <input
                    type="text"
                    placeholder="Enter Email"
                    className={` w-[340px] h-[40px] pl-10 focus:border-typo-blue outline-none border-[#2B2E30] border-[1px] rounded-[8px] bg-transparent text-[14px] text-typo-secondary ${
                      showEmailError ? "border-red-500" : ""
                    }`}
                    value={email}
                    onChange={(e) => {
                      validateChange();
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                {showEmailError && (
                  <div className="flex flex-row items-center gap-[8px] mt-1">
                    <img
                      src="/assets/svg/errorInfo.svg"
                      className="h-[18px] w-[18px]"
                    />
                    <p className="text-typo-red text-sm">{showEmailError}</p>
                  </div>
                )}
              </div>
              <SubmitButton
                buttonName="Continue with Email"
                type="submit"
                className={
                  isEmailBtnDisabled
                    ? "flex items-center justify-center bg-[#2E9BFA] w-[340px] h-[44px] rounded-lg text-[#FFFFFF] mx-auto opacity-[60%] cursor-not-allowed"
                    : "flex items-center justify-center bg-[#2E9BFA] w-[340px] h-[44px] rounded-lg text-[#FFFFFF] mx-auto"
                }
                disabled={isEmailBtnDisabled}
              />
            </div>
          </form>
        )}
        {(showEmail || showAccount) && (
          <p className="text-[#B5B9BD] w-[366px] h-[20px] font-normal text-[14px] leading-5 text-center mb-[16px]">
            By proceeding, you agree to our{" "}
            <span className="text-[#FAFBFC]">Terms</span> &{" "}
            <span className="text-[#FAFBFC]">Privacy Policy</span>
          </p>
        )}
        <ContainerFooter
          titleBody="Already have an account?"
          onClick={() => {
            navigate("/login");
          }}
          linkName="Login"
        />
      </LoginCommonContainer>
    </>
  );
}
