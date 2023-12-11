//  @import dependencies
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// @import Components
import LoginCommonContainer, {
  ContainerBody,
  ContainerHeader,
  ContainerHeadBody,
} from "../generalComponents/loginCommonContainer";
import OtpInput from "../inputComponents/OtpInput";

// @import Handler
import { resendOtpdHandler } from "./handler/LoginHandler";

// @import Constants
import routeConstants from "../../constants/routeConstants";

export default function SendOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  // Check reset otp
  useEffect(() => {
    if (otp.length === 4) {
      setOtpError("");
      let getOtp = window.atob(localStorage.getItem("OTP"));
      if (getOtp === otp) {
        navigate(routeConstants.NAVIGATENEWPASSWORD);
      } else {
        setOtpError("Incorrect OTP");
      }
    }
  }, [navigate, otp]);

  return (
    <>
      <LoginCommonContainer>
        <ContainerHeader
          title="Enter OTP to reset password"
          mainClassName="flex flex-col space-y-4 items-center justify-center"
        ></ContainerHeader>
        <ContainerHeadBody>
          <h5 className="text-[14px] text-typo-primary font-normal">
            Enter the unique code we sent to :
            <span className="text-[14px] text-typo-secondary font-normal">
              {location?.state?.email}
            </span>
          </h5>
          <div
            className="flex flex-row items-center ml-3 gap-1 cursor-pointer"
            onClick={() => {
              navigate(routeConstants.NAVIGATERESETPASSWORD, {
                state: { email: location?.state?.email },
              });
            }}
          >
            <img
              className="h-[13.22px] w-[13.22px]"
              src="/assets/svg/blue-pen.svg"
            />
            <h5 className="text-[14px] text-typo-blue font-normal">
              Edit mail id
            </h5>
          </div>
        </ContainerHeadBody>
        <ContainerBody>
          <OtpInput
            mainClassName="mt-[50px]"
            value={otp}
            valueChange={setOtp}
            count={4}
            inputClassName={
              otpError
                ? "bg-[#1A1C1F] rounded-[12px] outline-typo-red text-typo-blue focus:outline-typo-blue outline-none"
                : "bg-[#1A1C1F] rounded-[12px] text-typo-blue focus:outline-typo-blue outline-none"
            }
          />
          {otpError && (
            <h5 className="text-sm font-normal text-typo-red text-center mt-[16px]">
              Incorrect, Try again
            </h5>
          )}
        </ContainerBody>
        <h5
          className="text-[16px] mt-[32px] text-typo-secondary font-semibold underline cursor-pointer"
          onClick={() => resendOtpdHandler(location?.state?.email)}
        >
          Resend code
        </h5>
      </LoginCommonContainer>
    </>
  );
}
