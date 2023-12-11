//  @import dependencies
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// @import Utils
import { apiList, invokeApi } from "../../utills/apiService";
import { config } from "../../utills/configUtils";

// @import Constants
import routeConstants from "../../constants/routeConstants";

// @import Componenets
import LoginCommonContainer, {
  ContainerBody,
  ContainerHeader,
  ContainerHeadBody,
} from "../generalComponents/loginCommonContainer";
import OtpInput from "../inputComponents/OtpInput";
import { resendOtpdHandler } from "../signin/handler/LoginHandler";

export default function SendOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [otpData, setOtpData] = useState(null);
  const [isIncorrectOtp, setIsIncorrectOtp] = useState(false);
  const [invokeVerifyEmail, setInvokeVerifyEmail] = useState(true);

  // Check reset otp
  useEffect(() => {
    if (otp.length === 4) {
      if (otpData === +otp) {
        navigate("/choosepassword");
      } else {
        setIsIncorrectOtp(true);
      }
    } else {
      setIsIncorrectOtp(false);
    }
  }, [navigate, otp, otpData]);

  //get otp data
  useEffect(() => {
    const verifyEmail = async () => {
      let params = {
        accountType: "NORMAL",
        email: location?.state?.email,
      };
      const controller = new AbortController();
      const { signal } = controller;
      const response = await invokeApi(
        config.baseUrl + apiList.verifyEmail,
        params,
        { signal }
      );
      if (response.customcode === 200) {
        setOtpData(response.data.code);
      } else {
        alert("Something went wrong");
      }
      // UseEffect abort on unmount for cleanup
      return () => {
        controller.abort();
      };
    };
    if (invokeVerifyEmail) {
      setInvokeVerifyEmail(false);
      verifyEmail();
    }
  }, [invokeVerifyEmail, location]);

  return (
    <>
      <LoginCommonContainer>
        <ContainerHeader
          title="Verify your email"
          mainClassName="flex flex-col space-y-4 items-center justify-center"
        ></ContainerHeader>
        <ContainerHeadBody>
          <h5 className="text-[14px] text-typo-primary font-normal">
            Enter the unique code we sent to :
            <span className="text-[14px] text-typo-secondary font-normal">
              {" "}
              {location?.state?.email}
            </span>
          </h5>
          <div
            className="flex flex-row items-center ml-3 gap-1 cursor-pointer"
            onClick={() => {
              navigate(routeConstants.NAVIGATESIGNUP, {
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
              isIncorrectOtp
                ? "bg-[#1A1C1F] rounded-[12px] outline-typo-red text-typo-blue focus:outline-typo-blue outline-none"
                : "bg-[#1A1C1F] rounded-[12px] text-typo-blue focus:outline-typo-blue outline-none"
            }
          />
          {isIncorrectOtp && (
            <h5 className="text-sm font-normal text-typo-red text-center mt-[16px]">
              Incorrect, Try again
            </h5>
          )}
        </ContainerBody>
        <h5
          onClick={() => resendOtpdHandler(location?.state?.email)}
          className="text-[16px] mt-[32px] text-typo-secondary font-semibold underline cursor-pointer"
        >
          Resend code
        </h5>
      </LoginCommonContainer>
    </>
  );
}
