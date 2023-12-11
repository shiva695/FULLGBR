import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { config } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import { apiList, invokeApi } from "../../services/apiServices";
import Button from "../general/uiElements/Button";
import GradientHeader from "../general/uiElements/GradientHeader";
import OtpInput from "react-otp-input";
import phone_verification from "../../json/lottie/phone-verification.json";
import mail_verification from "../../json/lottie/mail-verification.json";
import green_success_tick from "../../json/lottie/green-success-tick.json";
import Joi from "joi";

// import React from "react";
// eslint-disable-next-line react/prop-types
const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const [tabIndex, setTabIndex] = useState(0);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [radioChecked, setRadioChecked] = useState("mobile");
  const [userlogin, setUserlogin] = useState({
    name: "",
    password: "",
  });
  const [usernameHelperText, setUsernameHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  // Forget password states
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);
  const [verifyOtp, setVerifyOtp] = useState(null);
  const [changePassword, setChangePassword] = useState({
    createPassword: "",
    confirmPassword: "",
  });

  // const { error } = schema.validate({
  //   username: userlogin.name,
  //   password: userlogin.password,
  // });

  // Login change handler
  const loginChangeHandler = (ev) => {
    setUserlogin((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };

  // Password change handler
  const passwordChangeHandler = (ev) => {
    setChangePassword((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };

  // validate user login
  const validateUserLogin = () => {
    let validationErrors = false;
    if (userlogin.name === "") {
      setUsernameHelperText("Please enter a username or email");
      validationErrors = true;
    } else if (userlogin.name.length < 3) {
      setUsernameHelperText("Please enter atleast 3 characters");
      validationErrors = true;
    }

    if (userlogin.password === "") {
      setPasswordHelperText("Please enter a password");
      validationErrors = true;
    } else if (userlogin.name.length < 8) {
      setPasswordHelperText("Please enter atleast 8 characters");
      validationErrors = true;
    }

    if (!validationErrors) {
      return true;
    } else {
      return false;
    }
  };

  // user Login handler
  const userLoginhandler = async () => {
    let valid = validateUserLogin();
    if (valid) {
      let params = {
        userName: userlogin.name,
        password: userlogin.password,
      };
      let response = await invokeApi(
        config.apiDomains + apiList.userLogin,
        params,
        cookies
      );

      if (response.customcode === 200) {
        toast.success("Success");
        setCookie(
          config.cookieName,
          JSON.stringify({
            userData: response.data,
          }),
          { path: "/", maxAge: 3000000, sameSite: "strict" }
        );
        navigate("/home");
      }
    }
  };

  // username / email for forget password
  const sendUserorEmail = async (ev) => {
    ev.preventDefault();
    let params = {
      userName,
    };
    let response = await invokeApi(
      config.apiDomains + apiList.verifyUser,
      params
    );
    if (response.customcode === 200) {
      setTabIndex(2);
      setUserData(response.data);
    } else {
      alert("Something went wrong");
    }
  };

  // verify account
  const verifyAccount = async (ev) => {
    ev.preventDefault();
    let params = {
      email: userData?.email,
      phoneCode: userData?.phone.code,
      phoneNumber: userData?.phone.number,
      // otpPlatform: radioChecked === "mobile" ? "SMS" : "EMAIL",
      otpPlatform: "MAIL",
    };
    let response = await invokeApi(config.apiDomains + apiList.sendOtp, params);
    if (response.customcode === 200) {
      setTabIndex(3);
      setVerifyOtp(response.data.code);
      toast.success(response.data.message);
    } else {
      alert("Something went wrong");
    }
  };
  // verifyPassword
  const verifyPassword = async (ev) => {
    ev.preventDefault();
    let params = {
      email: userData?.email,
      password: changePassword.createPassword,
      confirmPassword: changePassword.confirmPassword,
    };
    let response = await invokeApi(
      config.apiDomains + apiList.changePassword,
      params
    );
    if (response.customcode === 200) {
      setTabIndex(5);
      toast.success("Password Reset successfully");
    } else {
      alert("Something went wrong");
    }
  };

  // Confirm user login
  const confirmUserLogin = async (platform, socialData) => {
    let params = {
      id: platform === "GOOGLE" ? socialData.data.sub : "",
      platform,
    };
    let response = await invokeApi(
      config.apiDomains + apiList.confirmUser,
      params,
      cookies
    );
    if (response.customcode === 200) {
      navigate("/home");
    } else if (response.customcode === 201) {
      navigate("/on-boarding");
    }
  };

  return (
    <div className="fixed z-50 top-[50%] left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] h-[100vh] overflow-y-scroll bg-gradient-to-r from-[#0D0C23] via-[#0F2627] to-[#121212] rounded-lg shadow-lg text-base text-[#9D9E9E]">
      {/* close btn  */}
      {tabIndex !== 1 && tabIndex !== 2 && tabIndex !== 3 && tabIndex !== 4 && (
        <button
          type="button"
          className="absolute top-5 right-5 items-center justify-center"
          onClick={() => {
            let body = document.getElementsByTagName("body")[0];
            body.classList.remove("lock-scroll");
            onClose(false);
          }}
        >
          <img
            src="/assets/svg/close.svg"
            height="26px"
            width="26px"
            style={{ cursor: "pointer" }}
          />
        </button>
      )}

      {tabIndex === 0 && (
        <div className="flex flex-col h-[100vh] items-center sm:w-full p-3 mx-auto">
          <div className="my-auto items-center space-y-5 justify-center mx-auto">
            <div className="text-center">
              <GradientHeader text="Welcome To Gamersback!" size="header1" />
            </div>
            <p className="text-center text-lg">
              Embrace the call of gaming greatness! journey through the login
              gateway and ignite your inner champion in virtual Realms.
            </p>

            {/* header small */}
            <div className="flex items-center w-full mt-5 justify-center">
              {/* gamersback button */}
              <div className="flex flex-col items-center justify-center gap-6">
                <div className="flex rounded-md border-[2px] w-[250px] border-[#2f2f2f] py-2 justify-center">
                  <img src="/assets/png/gb-video-btn.png" alt="gb-button" />
                </div>
                <p className="text-center sub-heading">
                  This video will help you with to create an account
                </p>
              </div>
            </div>

            {/* Line */}
            <h2 className="horizontal-line">
              <span>Or</span>
            </h2>

            {/* Login credentials */}
            <div className="flex w-full justify-between flex-wrap">
              {/* Login using credentials */}
              <div className="flex flex-col gap-5">
                <div className="flex items-start w-full">
                  <p className="text-xl gradient-border pb-2 text-[#E3E3E3]">
                    Login using your credentials
                  </p>
                </div>
                {/* Input fields */}
                <div className="flex gap-5">
                  <div className="flex flex-col gap-3">
                    <label className="text-sm">
                      Enter your email or username
                    </label>
                    <div className="flex flex-col space-y-1">
                      <input
                        type="text"
                        className="focus:outline-none px-3 py-2.5 bg-transparent rounded-md border-[2px] border-[#2f2f2f]"
                        maxLength={15}
                        onChange={(ev) => {
                          setUsernameHelperText("");
                          loginChangeHandler(ev);
                        }}
                        value={userlogin.name}
                        name="name"
                      />
                      <p className="text-red-600">{usernameHelperText}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-sm">Enter your password</label>
                    <div className="flex flex-row items-center justify-center">
                      <div className="flex flex-col space-y-1">
                        <div className="flex flex-row items-center">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="focus:outline-none p-1 px-3 py-2.5 bg-transparent rounded-md border-[2px] border-[#2f2f2f]"
                            maxLength={16}
                            onChange={(ev) => {
                              setPasswordHelperText("");
                              loginChangeHandler(ev);
                            }}
                            value={userlogin.password}
                            name="password"
                          />

                          {showPassword ? (
                            <img
                              className="cursor-pointer h-5 w-5 ml-[-40px]"
                              src="/assets/svg/eye.svg"
                              onClick={() => setShowPassword(false)}
                            />
                          ) : (
                            <img
                              className="cursor-pointer h-5 w-5 ml-[-40px]"
                              src="/assets/svg/eye-slash.svg"
                              onClick={() => setShowPassword(true)}
                            />
                          )}
                        </div>
                        <p className="text-red-600">{passwordHelperText}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <p className="text-white">{ValidationError} error</p> */}
                {/* Remember password and forget password */}
                <div className="flex w-full justify-between">
                  {/* check box */}
                  <div className="flex gap-2">
                    <input type="checkbox" className="p-1 rounded" />
                    <p className="font-semibold">Remember password</p>
                  </div>

                  <div>
                    <p
                      className="font-semibold cursor-pointer"
                      onClick={() => setTabIndex(1)}
                    >
                      forget password?
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => {
                    // navigate("/on-boarding");
                    // let body = document.getElementsByTagName("body")[0];
                    // body.classList.remove("lock-scroll");
                    // onClose(false);
                    userLoginhandler();
                  }}
                >
                  <Button text="Login" />
                </div>
              </div>

              {/* Login using social */}
              <div className="flex flex-col  w-[333px] gap-5">
                <div className="flex items-start w-full">
                  <p className="text-xl gradient-border pb-2 text-[#E3E3E3]">
                    Login using socials
                  </p>
                </div>
                <LoginSocialGoogle
                  client_id={config.googleClientId}
                  redirect_uri={config.RedirectUri}
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  onResolve={(data) => {
                    confirmUserLogin("GOOGLE", data);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <button
                    className="py-3 w-[250px] bg-transparent rounded-md border-[2px] border-[#2f2f2f]"
                    onClick={() => {}}
                  >
                    <div className="flex gap-4 justify-center items-center">
                      <img
                        src="/assets/svg/google.svg"
                        height="30px"
                        width="30px"
                      />
                      <p>Sign in with google</p>
                    </div>
                  </button>
                </LoginSocialGoogle>

                <LoginSocialFacebook
                  appId={config.facebookAppId}
                  fieldsProfile={
                    "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                  }
                  redirect_uri={config.RedirectUri}
                  onResolve={(response) => {
                    // console.log("data ", response);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <button
                    className="py-3 w-[250px] bg-transparent rounded-md border-[2px] border-[#2f2f2f]"
                    onClick={() => {
                      // confirmUserLogin("FACEBOOK");
                    }}
                  >
                    <div className="flex gap-4 justify-center items-center">
                      <img
                        src="/assets/svg/facebook.svg"
                        height="30px"
                        width="30px"
                      />
                      <p>Sign in with facebook</p>
                    </div>
                  </button>
                </LoginSocialFacebook>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset password tabs */}
      {tabIndex <= 5 && tabIndex > 0 && (
        <>
          <div className="md:max-w-[60%] h-[100vh] mx-auto items-center justify-center flex flex-col text-center space-y-5">
            <GradientHeader text="Welcome to Gamersback!" />
            <h3 className="font-semibold text-center">
              Embrace the Call of Gaming Greatness! Journey through the Login
              Gateway and Ignite Your Inner Champion in Virtual Realms.
            </h3>
            {tabIndex === 1 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1 }}
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <div className="flex flex-col space-y-5 p-2">
                  <div className="flex flex-col space-y-5 items-center justify-center">
                    <h5 className="text-3xl text-[#A1A1AA]">
                      Power up and Claim Your Digital Throne!
                    </h5>
                    <p className="semibold">
                      Step into the Arena again by Providing Your Email or
                      Username and Claim Victory at Every Turn!
                    </p>
                  </div>
                  <form onSubmit={sendUserorEmail}>
                    <div className="flex flex-col space-y-10 items-center md:px-[50px]">
                      <div className="flex flex-col w-[70%] space-y-4">
                        <label className="text-sm text-start">
                          Enter your email or username
                        </label>
                        <input
                          type="text"
                          className="focus:outline-none p-1 px-3 bg-transparent rounded border-[1px] border-[#A8A29E]"
                          value={userName}
                          onChange={(ev) => setUserName(ev.target.value)}
                          autoFocus
                        />
                      </div>

                      <div className="flex flex-row w-full justify-between">
                        <div
                          className="w-[100px]"
                          onClick={() => setTabIndex(0)}
                        >
                          <Button text="back" />
                        </div>
                        <button type="submit">
                          <div className="w-[100px]">
                            <Button text="Submit" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {tabIndex === 2 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1 }}
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <div className="flex flex-col items-center space-y-3">
                  <h5 className="text-3xl text-[#A1A1AA]">
                    Verify Your Account
                  </h5>
                  <p className="font-semibold">
                    Choose your method: Carrier Pigeon, Telepathy, or Digital
                    Messenger? How receive password reset code?
                  </p>
                  <form onSubmit={verifyAccount}>
                    <div className="flex flex-col items-center justify-center md:space-x-[200px] md:flex-row pb-1.5">
                      <div className="flex flex-col space-y-3">
                        <Player
                          autoplay
                          loop
                          src={phone_verification}
                          style={{ height: "80px", width: "80px" }}
                        ></Player>

                        <div className="flex flex-row items-center cursor-pointer space-x-3">
                          <input
                            type="radio"
                            checked={radioChecked === "mobile" ? true : false}
                            onChange={() => setRadioChecked("mobile")}
                          />
                          <p>
                            {userData?.phone.code} {userData?.phone.number}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-center space-y-3">
                        <Player
                          autoplay
                          loop
                          src={mail_verification}
                          style={{ height: "80px", width: "80px" }}
                        ></Player>

                        <div className="flex flex-row items-center cursor-pointer   space-x-3">
                          <input
                            type="radio"
                            checked={radioChecked === "email" ? true : false}
                            onChange={() => setRadioChecked("email")}
                          />
                          <p>{userData?.email}</p>
                        </div>
                      </div>
                    </div>
                    <button type="submit">
                      <div className="w-[331px]">
                        <Button text="send" />
                      </div>
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Otp screen */}
            {tabIndex === 3 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1 }}
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <div className="mt-5 flex flex-col space-y-5 items-center justify-center">
                  <h5 className="text-3xl text-[#A1A1AA]">
                    Enter your One Time Password
                  </h5>
                  <p className="font-semibold">
                    Unlock the Gate: Reveal thy secret key and gain access to
                    the realms beyond
                  </p>
                </div>
                <form
                  onSubmit={(ev) => {
                    ev.preventDefault();
                    if (verifyOtp === +otp) {
                      setTabIndex(4);
                    } else {
                      toast.error("Invalid otp");
                    }
                  }}
                >
                  <div className="flex flex-col space-y-10 items-center mt-10 justify-center md:px-[50px]">
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      containerStyle={{
                        gap: "15px",
                      }}
                      inputStyle={{
                        width: "50px",
                        height: "50px",
                        fontWeight: "bold",
                        fontSize: "2  0px",
                      }}
                      renderInput={(props) => (
                        <input
                          {...props}
                          className="bg-transparent border-gray-400 border-[1px]"
                        />
                      )}
                    />
                    <button type="submit" className="w-[70%]">
                      <Button text="Submit" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Reset password */}
            {tabIndex === 4 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1 }}
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <div className="flex flex-col space-y-3 items-center justify-center">
                  <h5 className="text-3xl text-[#A1A1AA]">
                    Reset Your Password
                  </h5>
                  <p className="font-semibold">
                    Reset Your Password and Reclaim Your Gaming Destiny!
                  </p>

                  <form
                    onSubmit={(ev) => {
                      if (
                        changePassword.createPassword !== "" &&
                        changePassword.confirmPassword !== ""
                      ) {
                        if (
                          changePassword.createPassword ===
                          changePassword.confirmPassword
                        ) {
                          verifyPassword(ev);
                        } else {
                          toast.error(
                            "Create password and confirm password not same"
                          );
                        }
                      } else {
                        toast.info("Please enter password");
                      }
                    }}
                  >
                    <div className="flex flex-col space-y-6 items-center md:px-[50px]">
                      <div className="flex flex-col w-[70%] space-y-2">
                        {/* <label className="text-sm text-start">
                          Create Password
                        </label> */}
                        <input
                          type="text"
                          className="focus:outline-none p-1 bg-transparent rounded border-[1px] border-[#A8A29E]"
                          onChange={passwordChangeHandler}
                          value={changePassword.createPassword}
                          name="createPassword"
                          placeholder="Create Password"
                        />
                      </div>
                      <div className="flex flex-col w-[70%] space-y-2">
                        {/* <label className="text-sm text-start">
                          Confirm Password
                        </label> */}
                        <input
                          type="text"
                          className="focus:outline-none p-1 bg-transparent rounded border-[1px] border-[#A8A29E]"
                          onChange={passwordChangeHandler}
                          value={changePassword.confirmPassword}
                          name="confirmPassword"
                          placeholder="Confirm Password"
                        />
                      </div>
                      <button type="submit">
                        <div className="w-[331px]">
                          <Button text="Submit" />
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Otp screen */}
            {tabIndex === 5 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1 }}
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <Player
                  autoplay
                  loop
                  src={green_success_tick}
                  style={{ height: "80px", width: "80px" }}
                ></Player>

                <div className="mt-5 flex flex-col space-y-10 items-center justify-center">
                  <h5 className="text-3xl text-[#A1A1AA]">
                    Password Reset Successfull
                  </h5>
                  <p className="font-semibold">
                    You can now use your new password to login to your account
                  </p>

                  <div className="w-[331px]" onClick={() => setTabIndex(0)}>
                    <Button text="Login" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LoginModal;
