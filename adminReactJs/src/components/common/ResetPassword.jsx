//import dependencies
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router";
import { BsMoonStars, BsSun } from "react-icons/bs";
import { useCookies } from "react-cookie";

// import components
import Button from "../general/Button";

// import files
import { apiList, invokeApi } from "../../utils/apiServiceUtils";
import { config } from "../../utils/configUtils";
import responseUtils from "../../utils/responseUtils";
import constants from "../../json/constants.json";

function ResetPassword(isDarkMode) {
  const [cookies, setCookie] = useCookies();
  // state variables
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //constants
  const navigate = useNavigate();
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  //axios (api integration)
  const resetPasswordHandler = async () => {
    let params = {
      email: localStorage.getItem("email"),
      password: password,
      confirmPassword: confirmPassword,
    };
    let response = await invokeApi(
      config.baseUrl + apiList.changePassword,
      params,
      cookies
    );
    responseUtils.showToster(response);

    if (response.customcode === 200) {
      navigate("/login");
    }
  };

  function handlePasswordChange(event) {
    const { value } = event.target;
    setPassword(value);
    setPasswordError("");
  }

  function handleConfirmPassword(event) {
    const { value } = event.target;
    if (value === password) {
      setConfirmPassword(value);
    } else {
      setPasswordError("Passwords do not match");
    }
  }

  function handleSubmit() {
    if (!passwordPattern.test(password)) {
      setPasswordError("Please enter a valid password.");
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
            Reset Password
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between  border-black dark:border-white rounded-lg border-2">
              <div>
                <input
                  className="bg-transparent appearance-none p-3 w-full text-[#121212] dark:text-white placeholder-black dark:placeholder-white leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="flex items-center me-3">
                {showPassword ? (
                  <div>
                    <AiFillEyeInvisible
                      className="text-2xl"
                      onClick={() => setShowPassword(false)}
                    />
                  </div>
                ) : (
                  <div>
                    <AiFillEye
                      className="text-2xl"
                      onClick={() => setShowPassword(true)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <input
              className="bg-transparent border-2 border-black dark:border-white p-3 rounded-lg appearance-none w-full text-[#121212] dark:text-white leading-tight placeholder-black dark:placeholder-white focus:outline-none focus:shadow-outline"
              id="cnfmPassword"
              type="text"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            {passwordError && (
              <span className="text-red-600">{passwordError}</span>
            )}
          </div>

          <div
            className="w-1/3 mx-auto"
            onClick={() => {
              handleSubmit();
              resetPasswordHandler();
              // handleConfirmPassword();
            }}
          >
            <Button text={"Reset"} />
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

export default ResetPassword;
