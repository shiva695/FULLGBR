//import dependencies
import { useCookies } from "react-cookie";
import { BsMoonStars, BsSun } from "react-icons/bs";

//import components
import Button from "../general/Button";

// import files
import { apiList, invokeApi } from "../../utils/apiServiceUtils";
import { config } from "../../utils/configUtils";
import responseUtils from "../../utils/responseUtils";
import { useState } from "react";
import { useNavigate } from "react-router";
import constants from "../../json/constants.json";

function ForgotPassword(isDarkMode) {
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const navigate = useNavigate();

  // state variables
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [cookies, setCookie] = useCookies();

  const forgotPasswordHandler = async () => {
    let params = {
      email: email,
    };

    let response = await invokeApi(
      config.baseUrl + apiList.forgotPassword,
      params,
      cookies
    );
    responseUtils.showToster(response);
    setTimeout(() => {
      if (response.customcode === 200) {
        localStorage.setItem("email", email);
        localStorage.setItem("otp", response.data.code);
        navigate("/otp");
      }
    }, 1000);
  };

  function handleEmailChange(event) {
    const { value } = event.target;
    setEmail(value);
    setEmailError("");
  }

  function handleSubmit() {
    // event.preventDefault();

    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email.");

      return;
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
            Forgot Password
          </div>
          <div className="flex flex-col">
            <div>
              <input
                className="bg-transparent border-2 border-black dark:border-white p-3 rounded-lg appearance-none w-full text-[#121212] dark:text-white leading-tight placeholder-black dark:placeholder-white focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div>
              {emailError && <p className="text-red-600">{emailError}</p>}
            </div>
          </div>

          <div
            onClick={() => {
              handleSubmit();
              forgotPasswordHandler();
            }}
            className="w-1/3 mx-auto"
          >
            <Button text={"Send Email"} />
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

export default ForgotPassword;
