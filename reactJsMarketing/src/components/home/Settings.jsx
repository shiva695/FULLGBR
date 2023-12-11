import React, { useState, useRef, useEffect } from "react";
import HomeHeader from "./HomeHeader";
import Button from "../general/uiElements/Button";
import {
  apiList,
  invokeApi,
  invokeFormDataApi,
} from "../../services/apiServices";
import { config } from "../../config/config";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import GradientHeader from "../general/uiElements/GradientHeader";
// import { dateFormat } from "../common/common";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { format } from "date-fns";

const Settings = () => {
  const inputRefProfile = useRef();
  const [cookies, setCookie] = useCookies();
  const [previewFile, setPreviewFile] = useState(null);
  const [addAvatarModal, setAddAvatarModal] = useState(false);
  const [avatarImg, setAvatarImg] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(null);
  const [fileImg, setFileImg] = useState(null);
  const [gender, setGender] = useState("OTHERS");
  const [startDate, setStartDate] = useState(new Date());
  const [passwordData, setPasswordData] = useState({
    create: "",
    confirm: "",
  });
  const [generalData, setGeneralData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    dob: "",
  });

  const [usernameHelperText, setUsernameHelperText] = useState("");
  const [firstnameHelperText, setFirstnameHelperText] = useState("");
  const [lastnameHelperText, setLastnameHelperText] = useState("");
  const [dobHelperText, setDobHelperText] = useState("");
  const [genderHelperText, setGenderHelperText] = useState("");

  // Password change handler
  const passwordHandler = (ev) => {
    setPasswordData((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };

  // General change handler
  const generalHandler = (ev) => {
    setGeneralData((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };

  const validateUserProfile = () => {
    let validationErrors = false;
    if (generalData.userName === "") {
      setUsernameHelperText("Please enter a username");
      validationErrors = true;
    }
    if (generalData.firstName === "") {
      setFirstnameHelperText("Please enter a firstname");
      validationErrors = true;
    }
    if (generalData.lastName === "") {
      setLastnameHelperText("Please enter a lastname");
      validationErrors = true;
    }
    if (generalData.dob === "") {
      setDobHelperText("Please enter a date of birth");
      validationErrors = true;
    }

    if (!validationErrors) {
      return true;
    } else {
      return false;
    }
  };

  // image upload
  const handleFileUpload = (ev) => {
    const fileUploaded = ev.target.files[0];
    let acceptProfileFileTypes = fileUploaded.type.match(
      /^image\/(jpe?g|png|gif)/
    );
    if (fileUploaded && acceptProfileFileTypes) {
      if (fileUploaded.size < 5242880) {
        // setUploadedFile(fileUploaded);
        setPreviewFile(window.URL.createObjectURL(fileUploaded));
        uploadProfileImg(fileUploaded);
        // setMaxFileSizeErr("");
      }
      //  else {
      //   setMaxFileSizeErr("Please upload an image having less than 5MB size");
      // }
    }
    // else {
    //   setMaxFileSizeErr(
    //     "Please upload a valid image in jpeg/jpg/png/gif format"
    //   );
    // }
  };

  //  Upload Images
  const uploadProfileImg = async (file) => {
    let formData = new FormData();
    formData.append("image", file);
    // formData.append(
    //   "oldImage",
    //   "https://gamersback.s3.ap-south-1.amazonaws.com/gb-storage/GAMERSBACK.aHhFgQJITa4R.jpg"
    // );
    let response = await invokeFormDataApi(
      config.apiDomains + apiList.singleImageUpload,
      formData
    );
    if (response.customcode === 200) {
      setFileImg(response.data.imageUrl);
    } else {
      alert("Something went wrong");
    }
  };

  // Edit user password
  const editUserPassword = async () => {
    let params = {
      password: passwordData.create,
      confirmPassword: passwordData.confirm,
    };
    let response = await invokeApi(
      config.apiDomains + apiList.editUserPassword,
      params,
      cookies
    );
    if (response.customcode === 200) {
      toast.success("Password change successfully");
    } else {
      console.log("Something went wrong");
    }
  };

  // Edit edit general info
  const editGeneralInfo = async () => {
    let valid = validateUserProfile();
    if (valid) {
      let params = {
        userName: generalData.userName,
        firstName: generalData.firstName,
        lastName: generalData.lastName,
        gender: gender,
        dob: startDate,
      };
      let response = await invokeApi(
        config.apiDomains + apiList.editGeneralInfo,
        params,
        cookies
      );
      if (response.customcode === 200) {
        toast.success("Profile change successfully");
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
        console.log("Something went wrong");
      }
    }
  };

  // Edit profile and avatar
  const editProfileAndAvatar = async () => {
    let params = {
      profilePic: fileImg ?? null,
      avatar: avatarImg,
    };
    let response = await invokeApi(
      config.apiDomains + apiList.editProfileAndAvatar,
      params,
      cookies
    );
    if (response.customcode === 200) {
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
      toast.success("Profile change successfully");
    } else {
      console.log("Something went wrong");
    }
  };

  // setting up general data from cookies
  useEffect(() => {
    setGeneralData({
      userName: cookies[config.cookieName]?.userData.userName,
      firstName: cookies[config.cookieName]?.userData.firstName,
      lastName: cookies[config.cookieName]?.userData.lastName,
    });
    setStartDate(
      new Date(cookies[config.cookieName]?.userData.dob.slice(0, 10))
    );
    setAvatarImg(cookies[config.cookieName]?.userData.avatar);
    setGender(cookies[config.cookieName]?.userData.gender);
  }, [cookies]);
  console.log("avatar Img ", avatarImg);

  return (
    <>
      <HomeHeader />
      <div className="bg-[#1C1C1C] fixed mt-[50px] w-full rounded">
        <div className="h-[100vh] flex flex-col space-y-5 m-[60px]">
          {/* header */}
          <div className="flex flex-col font-semibold space-y-3">
            <h5 className="text-4xl w-[150px] leading-[60px] text-transparent bg-clip-text bg-gradient-to-r from-[#DD3131]  via-purple-600 to-[#223EAC]">
              Settings
            </h5>
            <p className="text-[#9d9e9e]">
              Unlock the Vault of Gaming Memories: A Saga of Triumphs,
              Tribulations, and Unforgettable Virtual Worlds
            </p>
          </div>

          {/* content */}
          <div className="flex flex-row w-full font-semibold text-[#e3e3e3] space-x-5">
            {/* col - 1 */}
            <div className="w-[35%] flex flex-col space-y-5 mt-3">
              {/* col - 1 header */}
              <div className="flex flex-col space-y-2">
                <h4 className="text-2xl">General Information</h4>
                <p className="text-[#9d9e9e]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>

              {/* col - 1 content */}
              <div className="flex flex-col bg-[#242424] rounded-lg h-[400px] 2xl:h-[450px] 4xl:h-[460px] shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)]">
                <div className="flex flex-col h-screen my-auto items-center justify-center space-y-7 m-8">
                  <div className="flex w-full flex-col">
                    <input
                      type="text"
                      className="bg-transparent w-full mt-5 py-2 px-5 rounded-md border-[2px] border-[#2f2f2f] focus:outline-none"
                      placeholder="UserName"
                      value={generalData.userName}
                      onChange={(ev) => {
                        generalHandler(ev);
                        setUsernameHelperText("");
                      }}
                      name="userName"
                    />
                    <p className="text-red-600">{usernameHelperText}</p>
                  </div>

                  <div className="flex w-full flex-col">
                    <input
                      type="text"
                      className="bg-transparent w-full py-2 px-5 rounded-md border-[2px] border-[#2f2f2f] focus:outline-none"
                      placeholder="FirstName"
                      value={generalData.firstName}
                      onChange={(ev) => {
                        generalHandler(ev);
                        setFirstnameHelperText("");
                      }}
                      name="firstName"
                    />
                    <p className="text-red-600">{firstnameHelperText}</p>
                  </div>

                  <div className="flex w-full flex-col">
                    <input
                      type="text"
                      className="bg-transparent w-full py-2 px-5 rounded-md border-[2px] border-[#2f2f2f] focus:outline-none"
                      placeholder="LastName"
                      value={generalData.lastName}
                      onChange={(ev) => {
                        generalHandler(ev);
                        setLastnameHelperText("");
                      }}
                      name="lastName"
                    />
                    <p className="text-red-600">{lastnameHelperText}</p>
                  </div>

                  <div className="flex w-full flex-col">
                    <select
                      value={gender}
                      onClick={(ev) => {
                        setGender(ev.target.value);
                        setGenderHelperText("");
                      }}
                      className="bg-transparent text-[#aaa] py-2 px-5 rounded-md border-[2px] border-[#2f2f2f] focus:outline-none"
                    >
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHERS">Others</option>
                    </select>
                    <p className="text-red-600">{genderHelperText}</p>
                  </div>

                  <div className="flex w-full flex-col">
                    {/* <input
                      type="date"
                      className="bg-transparent  py-2 px-5 rounded-md border-[2px] border-[#2f2f2f] focus:outline-none"
                      placeholder="Date of Birth"
                      value={generalData.dob}
                      onChange={(ev) => {
                        generalHandler(ev);
                        setDobHelperText("");
                      }}
                      name="dob"
                      id="date_timepicker_end"
                      max="2222-05-26"
                    /> */}
                    <DatePicker
                      className="bg-transparent w-full  py-2 px-5 rounded-md border-[2px] border-[#2f2f2f] focus:outline-none"
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                      }}
                      dateFormat="dd/MM/yyyy"
                    />
                    <p className="text-red-600">{dobHelperText}</p>
                  </div>

                  {/* <input
                    type="text"
                    className="bg-transparent w-full py-2 px-5 rounded-md border-[2px] border-[#2f2f2f] focus:outline-none"
                    placeholder="Gender"
                    value={generalData.gender}
                    onChange={generalHandler}
                    name="gender"
                  /> */}

                  <div className="w-36" onClick={editGeneralInfo}>
                    <Button text="Confirm" />
                  </div>
                </div>
              </div>
            </div>
            {/* col - 2 */}
            <div className="w-[35%] flex flex-col space-y-5 mt-3">
              {/* col - 2 header */}
              <div className="flex flex-col space-y-2">
                <h4 className="text-2xl">Change Password</h4>
                <p className="text-[#9d9e9e]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>

              {/* col - 2 content */}
              <div className="flex flex-col bg-[#242424] rounded-lg h-[400px] 2xl:h-[280px] 4xl:h-[340px] shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)]">
                <div className="flex flex-col h-screen my-auto items-center justify-center space-y-7 m-8">
                  <input
                    type="text"
                    className="bg-transparent w-full py-2 px-5  rounded-md border-[2px] border-[#2f2f2f] focus:outline-none"
                    placeholder="Create Password"
                    name="create"
                    value={passwordData.create}
                    onChange={passwordHandler}
                  />
                  <input
                    type="text"
                    className="bg-transparent w-full py-2 px-5 rounded-md border-[2px] border-[#2f2f2f] focus:outline-none"
                    placeholder="Confirm password"
                    name="confirm"
                    value={passwordData.confirm}
                    onChange={passwordHandler}
                  />
                  <div
                    className="w-36"
                    onClick={() => {
                      if (
                        passwordData.create !== "" &&
                        passwordData.confirm !== ""
                      ) {
                        if (passwordData.create === passwordData.confirm) {
                          editUserPassword();
                        } else {
                          toast.error("Password does not matching");
                        }
                      } else {
                        toast.info("Please enter password");
                      }
                    }}
                  >
                    <Button text="Confirm" />
                  </div>
                </div>
              </div>
            </div>
            {/* col - 3 */}
            <div className="w-[30%] flex flex-col space-y-5 mt-3">
              {/* col- 3 header */}
              <div className="flex flex-col space-y-2">
                <h4 className="text-2xl">Profile Picture</h4>
                <p className="text-[#9d9e9e]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              {/* col - 3 content */}
              <div className="flex flex-col bg-[#242424] rounded-lg h-[450px] 2xl:h-[390px] 4xl:h-[380px] shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)]">
                <div className="flex flex-col h-screen my-auto items-center justify-center space-y-10 m-3">
                  <div className="flex flex-row w-full items-center justify-around">
                    <input
                      type="file"
                      className="hidden"
                      ref={inputRefProfile}
                      onChange={handleFileUpload}
                    />
                    <div className="flex flex-col space-y-2 4xl:space-y-6 items-center justify-center">
                      <img
                        src={
                          previewFile
                            ? previewFile
                            : cookies[config.cookieName]?.userData.profilePic
                        }
                        style={{ objectFit: "cover" }}
                        onClick={() => inputRefProfile.current.click()}
                        className="h-[200px] w-[150px] border-gray-700 rounded-md border-[2px] cursor-pointer"
                      />
                      <p className="text-[#9d9e9e] font-normal">Change DP</p>
                    </div>
                    <div
                      className="flex flex-col space-y-2 4xl:space-y-6  items-center justify-center"
                      onClick={() => {
                        setAddAvatarModal(true);
                      }}
                    >
                      {avatarImg !== "" ? (
                        <img
                          src={avatarImg}
                          className="h-[200px] w-[150px] border-gray-700 border-[2px] rounded-md"
                        />
                      ) : (
                        <div className="h-[200px] w-[150px] cursor-pointer border-gray-700 border-[2px] rounded-md"></div>
                      )}

                      <p className="text-[#9d9e9e] font-normal">Set Avatar</p>
                    </div>
                  </div>
                  {(avatarIndex !== null || previewFile !== null) && (
                    <div className="w-36" onClick={editProfileAndAvatar}>
                      <Button text="save changes" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Avatar Modal */}
      {addAvatarModal && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-90 backdrop-blur-sm flex justify-center items-center">
          <div className="relative w-full max-w-5xl bg-[#242424] rounded-lg shadow-lg p-10 text-base font-semibold text-white">
            <button
              type="button"
              className="absolute right-5 top-5 flex items-end w-8 h-8"
              onClick={() => {
                setAddAvatarModal(false);
              }}
            >
              <img
                src="/assets/svg/close.svg"
                className="h-7 w-7 cursor-pointer m-2"
              />
            </button>
            {/* gradient header */}
            <GradientHeader text="Select your favourite avatar..." />
            {/* Avatar came here */}
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
                  setAddAvatarModal(false);
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
                  setAddAvatarModal(false);
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
                  setAddAvatarModal(false);
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
                  setAddAvatarModal(false);
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
                  setAddAvatarModal(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
