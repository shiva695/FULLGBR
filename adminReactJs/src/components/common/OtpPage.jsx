// Import dependencies
import { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { BsMoonStars, BsSun } from "react-icons/bs";

// Import components
import Button from "../general/Button";

//import files
import constants from "../../json/constants.json";

function Otp(isDarkMode) {
  const [cookies, setCookie] = useCookies();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  function otpHandler() {
    if (otp === localStorage.getItem("otp")) {
      toast.success("Verification successful");
      navigate("/resetpassword");
    } else {
      toast.error("Code incorrect");
    }
  }
  return (
    <div className="flex flex-row justify-items-center h-screen text-[#121212] dark:text-white dark:bg-[#242424]">
      <div className="w-5/12 p-10">
        <img src="assets/png/loginBanner.png" className="h-full" />
      </div>

      <div className="w-7/12 p-20 flex justify-center">
        <div className="w-3/5 px-10 flex flex-col justify-center space-y-10 bg-zinc-100 dark:bg-[#121212] rounded-2xl login-banner-shadow">
          <div className="mx-10">
            <img
              src={
                cookies[constants.MODE] === "light"
                  ? "/assets/png/GamersBack_Logo_Black.png"
                  : "/assets/png/GamersBack_Logo.png"
              }
            />
          </div>
          <div className="text-3xl font-bold text-[#121212] dark:text-white text-center">
            Enter your OTP for verification
          </div>
          <div className="">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              containerStyle={{
                gap: "12px",
              }}
              inputStyle={{
                width: "45px",
                height: "45px",
                fontWeight: "bold",
                fontSize: "20px",
              }}
              renderInput={(props) => (
                <input
                  {...props}
                  className="bg-transparent rounded border-[#2f2f2f] dark:border-white border-[2px]"
                />
              )}
            />
          </div>

          <div onClick={otpHandler} className="w-1/3 mx-auto">
            <Button text={"Verify OTP"} />
          </div>
        </div>
      </div>

      <div>
        <div className="cursor-pointer m-6">
          {cookies[constants.MODE] === "light" ? (
            <BsSun
              className="text-2xl dark:text-zinc-200"
              onClick={() =>
                setCookie(constants.MODE, JSON.stringify(constants.DARK), {
                  path: "/",
                  maxAge: 3000000,
                  sameSite: "strict",
                })
              }
            />
          ) : (
            <BsMoonStars
              className="text-2xl dark:text-zinc-200"
              onClick={() =>
                setCookie(constants.MODE, JSON.stringify(constants.LIGHT), {
                  path: "/",
                  maxAge: 3000000,
                  sameSite: "strict",
                })
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Otp;
