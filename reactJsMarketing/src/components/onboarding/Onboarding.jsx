import { useState, useEffect, useRef } from "react";
import GradientHeader from "../general/uiElements/GradientHeader";
import Button from "../general/uiElements/Button";
import { useDropzone } from "react-dropzone";
import OtpInput from "react-otp-input";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { motion } from "framer-motion";
import Loading from "../general/uiElements/Loading";
import { useNavigate } from "react-router-dom";
import CropImageModal from "../general/uiElements/Modals/CropImageModal";
import {
  apiList,
  invokeApi,
  invokeFormDataApi,
} from "../../services/apiServices";
import { useCookies } from "react-cookie";
import { config } from "../../config/config";
import { emailValidation } from "../common/common";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Onboarding = () => {
  const inputRefImg = useRef();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const [onboardIndex, setOnboardIndex] = useState(0);
  const [gender, setGender] = useState("");
  const [photoUpload, setPhotoUpload] = useState("uploadPhoto");
  const [filesImg, setFilesImg] = useState([]);
  const [imgUploadFile, setImgUploadFile] = useState(null);
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(0);
  const [otp, setOtp] = useState("");
  const [showOtpbox, setShowOtpbox] = useState(false);
  const [selectGameData, setSelectGameData] = useState(null);
  const [usernameHelperText, setUsernameHelperText] = useState("");
  const [firstnameHelperText, setFirstnameHelperText] = useState("");
  const [lastnameHelperText, setLastnameHelperText] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const [dobHelperText, setDobHelperText] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [mobileHelperText, setMobileHelperText] = useState("");
  const [genderHelperText, setGenderHelperText] = useState("");
  const [profileData, setProfileData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    referredBy: "",
  });

  const [isCropModal, setIsCropModal] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);

  const [avatarIndex, setAvatarIndex] = useState(null);
  const [profileImg, setProfileImg] = useState("");
  const [profileImgHelperText, setProfileImgHelperText] = useState("");
  const [avatarImg, setAvatarImg] = useState("");
  const [invokeGameList, setInvokeGameList] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [verifyOtp, setVerifyOtp] = useState(null);

  // React drag and drop
  const {
    acceptedFiles: imgAcceptFile,
    fileRejections: imgRejectFile,
    getRootProps: imgRootProps,
    getInputProps: imgInputProps,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    maxFiles: 1,
  });

  // Profile onChange handler
  const profileOnchangeHandler = (ev) => {
    setProfileData((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };

  // filter Search handler
  const filterSearchHandler = (ev) => {
    let search = ev.target.value;
    setSearchValue(ev.target.value);
    let filterSelected = selectGameData.filter((el) => !el.showStatus);
    let newFilter = filterSelected.filter((val) => {
      if (search.length === 1) {
        return val.gameName[0].toLowerCase().includes(search.toLowerCase());
      } else {
        return val.gameName.toLowerCase().includes(search.toLowerCase());
      }
    });
    if (search === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  // verify Mobile number
  const verifyMobileNum = async () => {
    let params = {
      email: profileData?.email,
      phoneCode: "+91",
      phoneNumber: mobile.slice(3),
      // otpPlatform: radioChecked === "mobile" ? "SMS" : "EMAIL",
      otpPlatform: "MAIL",
    };
    let response = await invokeApi(config.apiDomains + apiList.sendOtp, params);
    if (response.customcode === 200) {
      setVerifyOtp(response.data.code);
      toast.success(response.data.message);
    } else {
      alert("Something went wrong");
    }
  };

  // onboarding user signup
  const userSignUp = async () => {
    let valid = validateGameList();
    if (valid) {
      const linkGames = [];
      let params = {
        userName: profileData.userName,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        dob: startDate,
        referredBy: profileData.referredBy,
        gender,
        phoneCode: "+91",
        phoneNumber: mobile.slice(3),
        profilePic: profileImg,
        avatar: avatarImg,
        googleId: "",
        facebookId: "",
        linkedGames: linkGames,
      };
      selectGameData
        ?.filter((el) => el.showStatus === true)
        .map((el) =>
          params.linkedGames.push({
            gameId: el._id,
            title: el.gameName,
            developer: "studio",
            year: el.year,
            genre: "Action",
            gameImage: el.gameImage,
          })
        );

      let response = await invokeApi(
        config.apiDomains + apiList.signUp,
        params,
        cookies
      );
      if (response.customcode === 200) {
        if (
          !!cookies[config.cookieName] &&
          cookies[config.cookieName].userData
        ) {
          setCookie(
            config.cookieName,
            JSON.stringify({
              ...cookies[config.cookieName],
              userData: response.data,
            }),
            {
              path: "/",
              maxAge: 3000000,
              sameSite: "strict",
            }
          );
        } else {
          setCookie(
            config.cookieName,
            JSON.stringify({
              userData: response.data,
            }),
            { path: "/", maxAge: 3000000, sameSite: "strict" }
          );
        }
        navigate("/onboard-success");
        // location.reload();
      } else {
        alert("Something went wrong");
      }
    }
  };
  // //  Upload Images
  const uploadProfileImg = async () => {
    let valid = validateProfileImg();
    if (valid) {
      if (imgUploadFile !== null) {
        let formData = new FormData();
        formData.append("image", imgUploadFile[0]);
        // formData.append(
        //   "oldImage",
        //   "https://gamersback.s3.ap-south-1.amazonaws.com/gb-storage/GAMERSBACK.aHhFgQJITa4R.jpg"
        // );
        let response = await invokeFormDataApi(
          config.apiDomains + apiList.singleImageUpload,
          formData
        );
        if (response.customcode === 200) {
          setProfileImg(response.data.imageUrl);
          setProfileImgHelperText("");
          setOnboardIndex(4);
        } else {
          alert("Something went wrong");
        }
      } else {
        setOnboardIndex(4);
      }
    }
  };

  // Validate profile
  const validateUserProfile = () => {
    let validationErrors = false;
    if (profileData.userName === "") {
      setUsernameHelperText("Please enter a username");
      validationErrors = true;
    }
    if (profileData.firstName === "") {
      setFirstnameHelperText("Please enter a firstname");
      validationErrors = true;
    }
    if (profileData.lastName === "") {
      setLastnameHelperText("Please enter a lastname");
      validationErrors = true;
    }
    if (profileData.email === "") {
      setEmailHelperText("Please enter a email");
      validationErrors = true;
    } else {
      let email = emailValidation(profileData.email);
      if (!email) {
        validationErrors = true;
        setEmailHelperText("Enter a valid email");
      }
    }
    if (startDate === null) {
      setDobHelperText("Please enter a date of birth");
      validationErrors = true;
    }

    if (!validationErrors) {
      return true;
    } else {
      return false;
    }
  };
  // Validate mobile
  const validateMobile = () => {
    let validationErrors = false;
    if (mobile.length === 0) {
      setMobileHelperText("Please enter a Mobile Number");
      validationErrors = true;
    } else if (mobile.length < 13) {
      setMobileHelperText("Please enter a valid mobile number");
      validationErrors = true;
    }
    if (!validationErrors) {
      return true;
    } else {
      return false;
    }
  };

  // Validate gender
  const validateGender = () => {
    let validationErrors = false;
    if (gender === "") {
      setGenderHelperText("Please select a gender");
      validationErrors = true;
    }
    if (!validationErrors) {
      return true;
    } else {
      return false;
    }
  };

  // Validate profile img OR Avatar
  const validateProfileImg = () => {
    let validationErrors = false;
    if (avatarIndex === null && imgUploadFile === null) {
      setProfileImgHelperText("Please upload picture or set avatar");
      validationErrors = true;
    }
    if (!validationErrors) {
      return true;
    } else {
      return false;
    }
  };

  const validateGameList = () => {
    let validationErrors = false;
    let filterBystatus = selectGameData?.filter((el) => el.showStatus === true);
    if (filterBystatus.length > 0) {
      if (filterBystatus.length < 5) {
        toast.error("Please add atleast 5 games");
        validationErrors = true;
      } else {
        let checkYear = filterBystatus.every((el) => el.year);
        if (checkYear) {
          validationErrors = false;
        } else {
          toast.error("Please add years");
          validationErrors = true;
        }
      }
    } else {
      validationErrors = true;
      toast.error("Please add your favourite games");
    }

    if (!validationErrors) {
      return true;
    } else {
      return false;
    }
  };

  // get game list
  useEffect(() => {
    const getGameList = async () => {
      let params = {
        skip: 0,
        limit: 10,
        search: "",
        filter: "ENABLE",
      };
      let response = await invokeApi(
        config.apiDomains + apiList.getGamesList,
        params,
        cookies
      );
      if (response.customcode === 200) {
        setSelectGameData(response.data);
      } else {
        alert("Something went wrong");
      }
    };
    if (invokeGameList) {
      setInvokeGameList(false);
      getGameList();
    }
  }, [invokeGameList]);

  // Gst Upload file handler
  useEffect(() => {
    if (imgAcceptFile.length > 0) {
      if (imgAcceptFile[0].size < 5242880) {
        setImgUploadFile(imgAcceptFile);
        setFilesImg(
          imgAcceptFile.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      }
      // else {
      //   setGstCertHelperText(
      //     "Please upload a GST certificate having less than 5MB size"
      //   );
      // }
    }
    if (imgRejectFile.length > 0) {
      // setGstCertHelperT ext(
      //   "Please upload a valid certificate in pdf/jpeg/jpg/png format"
      // );
      alert("Rejeted");
    }
  }, [imgAcceptFile, imgRejectFile]);

  // Loading check the loader
  useEffect(() => {
    const timers = setInterval(() => {
      setLoading((prev) => prev + 10);
    }, 500);

    if (loading >= 100) {
      clearInterval(timers);
      return;
    }
    return () => clearInterval(timers);
  }, [loading]);

  useEffect(() => {
    if (imgUploadFile?.length > 0) {
      setIsCropModal(true);
    }
  }, [imgUploadFile]);

  const onClose = (croppedImage) => {
    setIsCropModal(false);
    setCroppedImage(croppedImage);
  };

  const cropImg = (crop) => {
    setCroppedImage(crop);
  };

  return (
    <>
      {loading < 100 ? (
        <Loading />
      ) : (
        <div className="bg-[#121212] text-[#9D9E9E] w-full p-[40px] h-[100vh]">
          {/* onboardIndex 1 */}
          {onboardIndex !== 5 && (
            <div className="flex flex-col sticky h-[130px] my-auto space-y-5">
              <img
                src="/assets/png/GamersBack_Logo.png"
                height={200}
                width={200}
              />
              {/* Tabs list came here */}
              <div className="hidden md:flex flex-row space-x-6 items-center">
                {/* chip - 1 */}
                <div className="p-0.5 w-22 rounded-full gradient-red-to-blue">
                  <div
                    className="bg-[#121212]
                w-20 h-[22px] rounded-full p-0.5"
                  >
                    <div
                      className={`${
                        onboardIndex >= 1 ? "w-[100%] gradient-red-to-blue" : ""
                      } flex items-center h-[18px]  rounded-full`}
                    ></div>
                  </div>
                </div>

                {/* chip - 2 */}
                <div
                  className={`p-0.5 w-22 rounded-full ${
                    onboardIndex >= 1
                      ? "gradient-red-to-blue"
                      : "border-[2px] border-[#2f2f2f]"
                  }`}
                >
                  <div
                    className="bg-[#121212]
                w-20 h-[22px] rounded-full p-0.5"
                  >
                    <div
                      className={`${
                        onboardIndex >= 2 ? "w-[100%] gradient-red-to-blue" : ""
                      } flex items-center h-[18px]  rounded-full`}
                    ></div>
                  </div>
                </div>

                {/* chip - 3 */}
                <div
                  className={`p-0.5 w-22 rounded-full ${
                    onboardIndex >= 2
                      ? "gradient-red-to-blue"
                      : "border-[2px] border-[#2f2f2f]"
                  }`}
                >
                  <div
                    className="bg-[#121212]
                w-20 h-[22px] rounded-full p-0.5"
                  >
                    <div
                      className={`${
                        onboardIndex >= 3 ? "w-[100%] gradient-red-to-blue" : ""
                      } flex items-center h-[18px]  rounded-full`}
                    ></div>
                  </div>
                </div>

                {/* chip - 4 */}
                <div
                  className={`p-0.5 w-22 rounded-full ${
                    onboardIndex >= 3
                      ? "gradient-red-to-blue"
                      : "border-[2px] border-[#2f2f2f]"
                  }`}
                >
                  <div
                    className="bg-[#121212]
                w-20 h-[22px] rounded-full p-0.5"
                  >
                    <div
                      className={`${
                        onboardIndex === 4
                          ? "w-[100%] gradient-red-to-blue"
                          : ""
                      } flex items-center h-[18px]  rounded-full`}
                    ></div>
                  </div>
                </div>

                {/* chip - 5 */}
                <div
                  className={`p-0.5 w-22 rounded-full ${
                    onboardIndex === 4
                      ? "gradient-red-to-blue"
                      : "border-[2px] border-[#2f2f2f]"
                  }`}
                >
                  <div
                    className="bg-[#121212]
                w-20 h-[22px] rounded-full p-0.5"
                  >
                    <div
                      className={`${
                        onboardIndex === 5
                          ? "w-[100%] gradient-red-to-blue"
                          : ""
                      } flex items-center h-[18px]  rounded-full`}
                    ></div>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 font-medium">
                {onboardIndex + 1} of 5
              </p>
            </div>
          )}

          {onboardIndex <= 4 && (
            <>
              {onboardIndex === 0 && (
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
                  <div className="flex flex-col md:h-[450px]  md:py-[60px] space-y-3">
                    <div className="flex flex-col space-y-5">
                      <GradientHeader text="Embark on Your Gaming Yourney" />
                      <h3 className="font-semibold">
                        Power up your profile with account details for limitless
                        Gaming Adventures
                      </h3>
                    </div>
                    {/* Input came here */}
                    <div className="flex flex-row space-x-10 w-[90%] pt-1 4xl:w-[70%]">
                      <div className="flex flex-col space-y-3 w-1/2">
                        <div className="flex flex-col space-y-1">
                          <input
                            type="text"
                            className="bg-transparent border-[#2f2f2f] border-[2px] py-4 rounded-md px-10 focus:outline-none"
                            placeholder="Username"
                            name="userName"
                            value={profileData.userName.replace(/[^\w]/gi, "")}
                            onChange={(ev) => {
                              profileOnchangeHandler(ev);
                              setUsernameHelperText("");
                            }}
                          />
                          <p className="text-red-600">{usernameHelperText}</p>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <input
                            type="text"
                            className="bg-transparent border-[#2f2f2f] border-[2px] py-4 rounded-md px-10 focus:outline-none"
                            placeholder="First Name"
                            name="firstName"
                            value={profileData.firstName.replace(
                              /[^\w\s]/gi,
                              ""
                            )}
                            onChange={(ev) => {
                              profileOnchangeHandler(ev);
                              setFirstnameHelperText("");
                            }}
                          />
                          <p className=" text-red-600">{firstnameHelperText}</p>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <input
                            type="text"
                            className="bg-transparent border-[#2f2f2f] border-[2px] py-4 rounded-md px-10 focus:outline-none"
                            placeholder="Last Name"
                            name="lastName"
                            value={profileData.lastName.replace(
                              /[^\w\s]/gi,
                              ""
                            )}
                            onChange={(ev) => {
                              profileOnchangeHandler(ev);
                              setLastnameHelperText("");
                            }}
                          />
                          <p className=" text-red-600">{lastnameHelperText}</p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-3 w-1/2">
                        <div className="flex flex-col space-y-1">
                          <input
                            type="email"
                            className="bg-transparent border-[#2f2f2f] border-[2px] py-4 rounded-md px-10 focus:outline-none"
                            placeholder="Email"
                            name="email"
                            value={profileData.email}
                            onChange={(ev) => {
                              profileOnchangeHandler(ev);
                              setEmailHelperText("");
                            }}
                          />
                          <p className=" text-red-600">{emailHelperText}</p>
                        </div>
                        <div className="flex flex-col space-y-1">
                          {/* <input
                            type="date"
                            className="bg-transparent  border-[#2f2f2f] border-[2px] py-4 rounded-md px-10 focus:outline-none"
                            placeholder="Date of Birth"
                            name="dob"
                            value={profileData.dob}
                            onChange={(ev) => {
                              profileOnchangeHandler(ev);
                              setDobHelperText("");
                            }}
                            // readOnly
                          /> */}
                          <DatePicker
                            className="bg-transparent w-full  py-4 px-10 rounded-md border-[2px] border-[#2f2f2f] focus:outline-none"
                            selected={startDate}
                            onChange={(date) => {
                              setDobHelperText("");
                              setStartDate(date);
                            }}
                            placeholderText="dd/mm/yyyy"
                            dateFormat="dd/MM/yyyy"
                          />
                          <p className=" text-red-600">{dobHelperText}</p>
                        </div>
                        <input
                          type="text"
                          className="bg-transparent border-[#2f2f2f] border-[2px] py-4 rounded-md px-10 focus:outline-none"
                          placeholder="Referred By"
                          name="referredBy"
                          value={profileData.referredBy.replace(
                            /[^\w\s]/gi,
                            ""
                          )}
                          onChange={profileOnchangeHandler}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* onboardIndex 1 */}
              {onboardIndex === 1 && (
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
                  <div className="flex flex-col md:h-[450px]  md:py-[60px] py-[60px] space-y-5">
                    <div className="flex flex-col space-y-5">
                      <GradientHeader text="Craft your gaming persona's with mobile" />
                      <h3 className="font-semibold">
                        Personalize Your Profile: With Mobile Verification
                      </h3>
                    </div>

                    <div className="flex flex-col gap-5 space-y-5 pt-4">
                      <div className="flex flex-row items-center w-full text-[#e3e3e3] bg-transparent space-x-6">
                        <PhoneInput
                          defaultCountry="IN"
                          addInternationalOption={false}
                          placeholder="Mobile"
                          value={mobile}
                          onChange={setMobile}
                          className="focus:outline-none w-[300px] px-6 bg-transparent rounded-md border-[2px] text-[#9d9e9e] border-[#2f2f2f]"
                          // maxLength={12}
                        />
                        <div
                          className="w-36"
                          onClick={() => {
                            if (mobile?.length >= 13) {
                              setShowOtpbox(true);
                              verifyMobileNum();
                              setMobileHelperText("");
                            }
                          }}
                        >
                          <Button text="Send OTP" />
                        </div>
                      </div>
                      <p className="text-red-600">{mobileHelperText}</p>
                      {showOtpbox && (
                        <div className="flex flex-col rounded-md space-y-10">
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
                              fontSize: "20px",
                            }}
                            renderInput={(props) => (
                              <input
                                {...props}
                                className="bg-transparent rounded border-[#2f2f2f] border-[2px]"
                              />
                            )}
                          />
                          {/* <div className="w-36" onClick={() => setTabIndex(4)}>
                    <Button text="Submit" />
                  </div> */}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* onboardIndex 2 */}
              {onboardIndex === 2 && (
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
                  <div className="flex flex-col md:h-[450px]  md:py-[60px] py-[60px] space-y-5">
                    <div className="flex flex-col space-y-5">
                      <GradientHeader text="Craft your gaming persona's Gender Manifetstation" />
                      <h3 className="font-semibold">
                        Personalize Your Profile: Embrace Individually with
                        Gender Selection
                      </h3>
                    </div>

                    <div className="flex flex-col gap-5 md:flex-row md:space-x-8">
                      {/* Male Container */}
                      <div
                        className={`${
                          gender === "MALE" && "gradient-red-to-blue"
                        } gradient-card-border`}
                      >
                        <div
                          className="relative bg-[#121212]"
                          onClick={() => {
                            setGender("MALE");
                            setGenderHelperText("");
                          }}
                        >
                          <div className={gender === "MALE" && "opacity-30"}>
                            <img
                              src="/assets/png/male.png"
                              alt="Background Image"
                              className="h-[190px] w-[300px]"
                            />
                          </div>
                          {gender === "MALE" && (
                            <div className="absolute  inset-0 flex items-center justify-center">
                              <h1 className="text-5xl text-white impact-font">
                                Male
                              </h1>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* feMale Container */}
                      <div
                        className={`${
                          gender === "FEMALE" && "gradient-red-to-blue"
                        } gradient-card-border`}
                      >
                        <div
                          className="relative bg-[#121212]"
                          onClick={() => {
                            setGender("FEMALE");
                            setGenderHelperText("");
                          }}
                        >
                          <div className={gender === "FEMALE" && "opacity-30"}>
                            <img
                              src="/assets/png/female.png"
                              alt="Background Image"
                              className="h-[190px] w-[300px]"
                            />
                          </div>
                          {gender === "FEMALE" && (
                            <div className="absolute  inset-0 flex items-center justify-center">
                              <h1 className="text-5xl text-white impact-font">
                                FeMale
                              </h1>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-red-600">{genderHelperText}</p>
                  </div>
                </motion.div>
              )}

              {/* onboardIndex 3 */}
              {onboardIndex === 3 && (
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
                  <div className="flex flex-col md:h-[450px]  md:py-[40px]  overflow-y-scroll space-y-3">
                    <div className="flex flex-col space-y-3 ">
                      <GradientHeader text="Elevate Your Profile With Eye-Catching Display Picture" />
                      <h3 className="font-semibold">
                        Choose an Upload That Capture Your Essence!
                      </h3>
                    </div>
                    <div className="flex flex-row space-x-10 mb-2.5">
                      <div
                        onClick={() => setPhotoUpload("uploadPhoto")}
                        className={`cursor-pointer ${
                          photoUpload === "uploadPhoto"
                            ? "gradient-border text-[#cbd5e1]"
                            : ""
                        } pb-2`}
                      >
                        <h3>Upload My Photo</h3>
                      </div>
                      <div
                        onClick={() => setPhotoUpload("uploadAvatar")}
                        className={`cursor-pointer ${
                          photoUpload === "uploadAvatar"
                            ? "gradient-border text-[#cbd5e1]"
                            : ""
                        } pb-2`}
                      >
                        <h3>Choose an Avatar</h3>
                      </div>
                    </div>

                    {/* Drag and Drop */}
                    {photoUpload === "uploadPhoto" && (
                      <div className="flex flex-row pt-5">
                        <input
                          {...imgInputProps()}
                          ref={inputRefImg}
                          type="file"
                        />
                        <div className="flex flex-col cursor-pointer space-y-10 md:space-y-0 md:flex-row space-x-10 items-center">
                          <div
                            {...imgRootProps()}
                            onClick={() => inputRefImg.current.click()}
                            className="flex flex-col h-[170px] items-center justify-center w-[600px] border-[#2f2f2f] border-[2px] border-dashed outline-none rounded-xl"
                          >
                            <img
                              style={{ width: "48px", height: "48px" }}
                              src="/assets/png/drag-upload-img.png"
                            />
                            <p>Drag your image here, or browse</p>
                          </div>
                          {/* Preview here */}
                          {imgUploadFile?.length > 0 ? (
                            <div className="bg-gradient-to-r from-[#DD3131] via-[#C716DB] to-[#223EAC] p-1 rounded-md">
                              <div className="bg-[#242424] ">
                                <img
                                  style={{
                                    width: "180px",
                                    height: "170px",
                                    borderRadius: "15px",
                                    objectFit: "cover",
                                  }}
                                  src={croppedImage}
                                  alt="cropped_img"
                                />
                                <CropImageModal
                                  file={filesImg[0].preview}
                                  open={isCropModal}
                                  close={onClose}
                                  cropImg={cropImg}
                                />
                              </div>
                            </div>
                          ) : (
                            <img
                              style={{
                                width: "180px",
                                height: "170px",
                                border: "2px solid #2F2F2F",
                                borderRadius: "10px",
                                objectFit: "cover",
                              }}
                              src="/assets/png/preview-img.png"
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Avatar photos */}
                    {photoUpload === "uploadAvatar" && (
                      <div className="flex flex-row pt-5 space-x-6">
                        <img
                          src="https://gamersback.s3.ap-south-1.amazonaws.com/gb-storage/GAMERSBACK.teIPw6k7WQqX.jpg"
                          className={`rounded-md h-[150px] w-[150px] gradient-card-border ${
                            avatarIndex === 0 && "gradient-red-to-blue"
                          } `}
                          alt="avatar-1"
                          onClick={() => {
                            setAvatarIndex(0);
                            setAvatarImg(
                              "https://gamersback.s3.ap-south-1.amazonaws.com/gb-storage/GAMERSBACK.teIPw6k7WQqX.jpg"
                            );
                          }}
                        />
                        <img
                          src="https://gamersback.s3.ap-south-1.amazonaws.com/gb-storage/GAMERSBACK.VAY6RiFl5quK.jpg"
                          className={`rounded-md h-[150px] w-[150px] gradient-card-border ${
                            avatarIndex === 1 && "gradient-red-to-blue"
                          } `}
                          alt="avatar-2"
                          onClick={() => {
                            setAvatarIndex(1);
                            setAvatarImg(
                              "https://gamersback.s3.ap-south-1.amazonaws.com/gb-storage/GAMERSBACK.VAY6RiFl5quK.jpg"
                            );
                          }}
                        />
                        <img
                          src="https://gamersback.s3.ap-south-1.amazonaws.com/gb-storage/GAMERSBACK.oqzvfQNv5XnB.jpg"
                          className={`rounded-md h-[150px] w-[150px] gradient-card-border ${
                            avatarIndex === 2 && "gradient-red-to-blue"
                          } `}
                          alt="avatar-3"
                          onClick={() => {
                            setAvatarIndex(2);
                            setAvatarImg(
                              "https://gamersback.s3.ap-south-1.amazonaws.com/gb-storage/GAMERSBACK.oqzvfQNv5XnB.jpg"
                            );
                          }}
                        />

                        <img
                          src="https://gamersback.s3.ap-south-1.amazonaws.com/gb-storage/GAMERSBACK.aSnfEZw231L0.jpg"
                          className={`rounded-md h-[150px] w-[150px] gradient-card-border ${
                            avatarIndex === 3 && "gradient-red-to-blue"
                          } `}
                          alt="avatar-4"
                          onClick={() => {
                            setAvatarIndex(3);
                            setAvatarImg(
                              "https://gamersback.s3.ap-south-1.amazonaws.com/gb-storage/GAMERSBACK.aSnfEZw231L0.jpg"
                            );
                          }}
                        />
                        <img
                          src="https://gamersback.s3.ap-south-1.amazonaws.com/gb-storage/GAMERSBACK.Crz3aQtEO9tq.jpg"
                          className={`rounded-md h-[150px] w-[150px] gradient-card-border ${
                            avatarIndex === 4 && "gradient-red-to-blue"
                          } `}
                          alt="avatar-5"
                          onClick={() => {
                            setAvatarIndex(4);
                            setAvatarImg(
                              "https://gamersback.s3.ap-south-1.amazonaws.com/gb-storage/GAMERSBACK.Crz3aQtEO9tq.jpg"
                            );
                          }}
                        />
                      </div>
                    )}
                    <p className="text-red-600">{profileImgHelperText}</p>
                  </div>
                </motion.div>
              )}

              {/* onboardIndex 3 */}
              {onboardIndex === 4 && (
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
                  <div className="flex flex-col  space-y-2">
                    <div className="flex flex-col space-y-2">
                      <GradientHeader text="Select your favourite game you like.." />
                    </div>
                    {/* Search box and button */}
                    <div className="relative flex flex-col space-y-3 h-[350px]">
                      <div className="flex flex-row w-full space-x-6">
                        <input
                          type="text"
                          className="focus:outline-none w-full bg-transparent border-[1px] px-5 py-2 rounded-full border-gray-700"
                          placeholder="Search Game"
                          onChange={filterSearchHandler}
                          value={searchValue}
                        />
                        <div className="w-36">
                          <Button text="Search" />
                        </div>
                      </div>
                      {/* filtered results */}
                      {filteredData?.length > 0 && (
                        <div className="absolute top-20 w-full z-10 bg-[#121212] flex flex-col cursor-pointer space-y-3 h-[300px] overflow-y-scroll">
                          {filteredData?.slice(0, 15).map((el, idx) => (
                            <div
                              key={idx}
                              className="mb-1"
                              onClick={() => {
                                let copy = JSON.parse(
                                  JSON.stringify(selectGameData)
                                );
                                let findIdx = copy.findIndex(
                                  (element) => element._id === el._id
                                );
                                copy[findIdx].showStatus = true;
                                setSelectGameData(copy);
                                setSearchValue("");
                                setFilteredData([]);
                              }}
                            >
                              <img
                                src={el.gameImage}
                                alt=""
                                className="h-[100px] w-[150px]"
                              />
                              <p className="font-semibold text-2xl">
                                {el.gameName}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                      {selectGameData?.filter((el) => el.showStatus === true)
                        .length > 0 && (
                        <div className="w-full">
                          <div className="h-[50px] rounded-lg mt-8 shadow-[inset_0_7px_9px_-1px_rgba(0,0,0,5)] bg-[#242424] w-full flex flex-row">
                            <div className="flex flex-row font-sm text-sm text-white w-full p-5 mx-5">
                              <div className="w-[50%] flex items-center justify-start">
                                <p className="ms-[50px]">Game</p>
                              </div>
                              <p className="w-[20%] flex items-center justify-start">
                                Developer
                              </p>
                              <p className="w-[20%] flex items-center justify-start">
                                Year Played
                              </p>
                              <p className="w-[10%] flex items-center justify-start">
                                Genre
                              </p>
                            </div>
                          </div>

                          {/* Rendering game here */}
                          <div className="h-[220px] mb-2 overflow-y-scroll rounded-lg mt-3 shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)] bg-[#121212] w-full flex flex-col">
                            {selectGameData
                              ?.filter(
                                (el) =>
                                  !!el.showStatus && el.showStatus === true
                              )
                              .map((ele, idx) => (
                                <div
                                  key={idx}
                                  className="flex flex-col font-sm text-sm space-y-3mb-6 pt-3"
                                >
                                  <div className="mx-3">
                                    <div className="relative py-10 px-3 bg-[#121212] flex flex-row h-[50px] items-center justify-center">
                                      <div className="flex flex-row items-center  justify-center w-full">
                                        <div className="w-[50%] flex flex-row  items-center space-x-5">
                                          <img
                                            src={ele.gameImage}
                                            className="rounded-md h-20 w-[100px]"
                                            alt=""
                                          />
                                          <p className="text-[#9D9E9E]">
                                            {ele.gameName}
                                          </p>
                                        </div>

                                        <p className="w-[20%] flex items-center text-[#9D9E9E] justify-start">
                                          {ele.gameName}
                                        </p>

                                        <div className="w-[20%]">
                                          <input
                                            type="text"
                                            className="w-[90px] bg-transparent text-[#9D9E9E] font-semibold border-[#2f2f2f] border-[2px] py-3 rounded-md px-5 focus:outline-none"
                                            maxLength={4}
                                            onChange={(ev) => {
                                              let copy = JSON.parse(
                                                JSON.stringify(selectGameData)
                                              );
                                              let findIdx = copy.findIndex(
                                                (element) =>
                                                  element.gameName ===
                                                  ele.gameName
                                              );
                                              copy[findIdx].year =
                                                ev.target.value;
                                              setSelectGameData(copy);
                                            }}
                                          />
                                        </div>

                                        <p className="w-[10%] flex items-center text-[#9D9E9E] justify-start">
                                          <div className="w-20">
                                            <Button text="Action" />
                                          </div>
                                        </p>
                                      </div>
                                      <div
                                        className="group"
                                        onClick={() => navigate("/game-detail")}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}

          {onboardIndex === 0 && (
            <div
              className="w-36 mt-10 h-[50px]"
              onClick={() => {
                let valid = validateUserProfile();
                if (valid) {
                  setOnboardIndex(1);
                }
              }}
            >
              <Button text="continue" />
            </div>
          )}
          {onboardIndex === 1 && (
            <div className="mt-10 h-[50px]">
              <div className="flex flex-row space-x-10 items-center">
                <button className="text-2xl" onClick={() => setOnboardIndex(0)}>
                  back
                </button>
                <div
                  className="w-36"
                  onClick={() => {
                    let valid = validateMobile();
                    if (valid) {
                      if (verifyOtp === +otp) {
                        setOnboardIndex(2);
                      } else {
                        toast.error("Invalid otp");
                      }
                    }
                  }}
                >
                  <Button text="continue" />
                </div>
              </div>
            </div>
          )}
          {onboardIndex === 2 && (
            <div className="mt-10 h-[50px]">
              <div className="flex flex-row space-x-10 items-center">
                <button className="text-2xl" onClick={() => setOnboardIndex(1)}>
                  back
                </button>
                <div
                  className="w-36"
                  onClick={() => {
                    let valid = validateGender();
                    if (valid) {
                      setOnboardIndex(3);
                    }
                  }}
                >
                  <Button text="continue" />
                </div>
              </div>
            </div>
          )}
          {onboardIndex === 3 && (
            <div className="mt-10 h-[50px]">
              <div className="flex flex-row space-x-10 items-center">
                <button className="text-2xl" onClick={() => setOnboardIndex(2)}>
                  back
                </button>
                <div className="w-36" onClick={uploadProfileImg}>
                  <Button text="continue" />
                </div>
              </div>
            </div>
          )}
          {onboardIndex === 4 && (
            <div className="mt-10 h-[50px]">
              <div className="flex flex-row space-x-10 items-center">
                <button className="text-2xl" onClick={() => setOnboardIndex(3)}>
                  back
                </button>
                <div className="w-36" onClick={userSignUp}>
                  <Button text="continue" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Onboarding;
