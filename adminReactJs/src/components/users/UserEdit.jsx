//Import Dependencies
import { useLocation, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { useCookies } from "react-cookie";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { useState, useRef, useEffect } from "react";

// Import components
import Button from "../general/Button";
import BreadCrumbs from "../general/BreadCrumbs";
import SingleSelect from "../general/SingleSelect";
import PhoneCode from "../general/PhoneCode";
import ConformationPopup from "../modals/ConformationPopup";

// Import files
import constants from "../../json/constants.json";
import {
  apiList,
  invokeApi,
  invokeFormDataApi,
} from "../../utils/apiServiceUtils";
import { config } from "../../utils/configUtils";
import responseUtils from "../../utils/responseUtils";
import helperUtils from "../../utils/helperUtils";

const UserEdit = () => {
  const [cookies] = useCookies();
  const location = useLocation(); // find location path
  const navigate = useNavigate();
  const inputRefImage = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  // const [regDate, setRegDate] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState(null);
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [avatar, setAvatar] = useState(
    "https://gamersback.s3.ap-south-1.amazonaws.com/gb-storage/GAMERSBACK.Y7AchvzfihEQ.jpg"
  );
  const [selectGenderListModal, setSelectGenderListModal] = useState(false);
  const [selectStatusListModal, setSelectStatusListModal] = useState(false);
  const [phonelistModal, setPhonelistModal] = useState(false);
  const [invokeUserData, setInvokeUserData] = useState(true);
  const [confirmPopupEdit, setConfirmPopupEdit] = useState(false);
  const [confirmPopupAdd, setConfirmPopupAdd] = useState(false);

  const onClosedEdit = () => setConfirmPopupEdit(false);
  const onClosedAdd = () => setConfirmPopupAdd(false);

  const confirmHandlerEdit = (confirmEditStatus) => {
    if (confirmEditStatus) {
      singleUserEdit();
    } else {
      return null;
    }
  };

  const confirmHandlerAdd = (confirmAddStatus) => {
    if (confirmAddStatus) {
      addUserHandler();
    } else {
      return null;
    }
  };

  function fetchPhoneDetails(phoneDetails) {
    let copy = { ...phone };
    copy.code = phoneDetails[0];
    copy.number = phoneDetails[1];
    setPhone(copy);
  }

  // Image upload
  const handleFileUpload = (ev) => {
    const fileUploaded = ev.target.files[0];
    let acceptProfileFileTypes = fileUploaded.type.match(
      /^image\/(jpe?g|png|gif)/
    );
    if (fileUploaded && acceptProfileFileTypes) {
      if (fileUploaded.size < 5242880) {
        setAvatar(window.URL.createObjectURL(fileUploaded));
      }
      uploadProfileImg(fileUploaded);
    }
  };

  //axios (api integration) for image
  const uploadProfileImg = async (file) => {
    let formData = new FormData();
    formData.append("image", file);

    let response = await invokeFormDataApi(
      config.baseUrl + apiList.uploadSingleImage,
      formData,
      cookies
    );
    setAvatar(response.data.imageUrl);
  };

  console.log("avatar: ", avatar);

  // Add user
  const addUserHandler = async () => {
    console.log(gender.toUpperCase());
    let params = {
      userName: username,
      firstName: firstname,
      lastName: lastname,
      email: email,
      gender: gender.toUpperCase(),
      dob: birthDate,
      profilePic: avatar,
      phoneCode: phone.code,
      phoneNumber: phone.number,
      password: confirmPassword,
      status: status,
    };

    const responseData = await invokeApi(
      config.baseUrl + apiList.userAdd,
      params,
      cookies
    );
    if (responseData.customcode === 200) {
      console.log(responseData);
      responseUtils.showToster(responseData);
      navigate("/users");
    }
    if (responseData.customcode !== 200) {
      console.log(responseData);
      responseUtils.showToster(responseData);
    }
  };

  function submitHandler() {
    if (password === confirmPassword) {
      setPasswordError("");
      if (location.pathname === `/users/${constants.ADD}`)
        setConfirmPopupAdd(true);
      else if (location.pathname === `/users/${constants.EDIT}`) {
        setConfirmPopupEdit(true);
      }
    } else {
      setPasswordError("Passwords do not match");
    }
  }

  // get user data (for edit)
  useEffect(() => {
    const getUserDetail = async () => {
      console.log(location?.state._id);
      let params = {
        _id: location?.state._id,
      };
      let response = await invokeApi(
        config.baseUrl + apiList.getUserDetail,
        params,
        cookies
      );
      if (response.customcode === 200) {
        setAvatar(response.data.profilePic);
        setUsername(response.data.userName);
        setFirstname(response.data.firstName);
        setLastname(response.data.lastName);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setBirthDate(
          helperUtils.getDateFormat(response.data.dob, "yyyy-mm-dd")
        );
        setGender(constants[response.data.gender]);
        setPassword("");
        setConfirmPassword("");
        setStatus(response.data.status);
      } else {
        console.error("Something went wrong");
      }
    };

    if (invokeUserData) {
      setInvokeUserData(false);
      if (location.pathname === "/users/Add")
        setPhone({ code: "+91", number: "" });
      if (location.pathname === "/users/Edit") getUserDetail();
    }
  }, [cookies, invokeUserData, location.pathname, location]);

  // change/edit data
  const singleUserEdit = async () => {
    console.log(location?.state._id);
    let params = {
      _id: location?.state._id,
      userName: username,
      firstName: firstname,
      lastName: lastname,
      email: email,
      gender: gender.toUpperCase(),
      dob: birthDate,
      profilePic: avatar,
      phoneCode: phone.code,
      phoneNumber: phone.number,
      password: password,
      status: status,
    };
    let response = await invokeApi(
      config.baseUrl + apiList.userEdit,
      params,
      cookies
    );
    if (response.customcode === 200) {
      responseUtils.showToster(response);
      navigate("/users");
    }
  };

  return (
    <>
      <div className="card-without-subheading">
        <div className="flex flex-col w-full card space-y-5 h-[600px] overflow-y-auto">
          {/* Breadcrumbs */}
          <div className="flex flex-row justify-between items-center  border-b border-gray-300  pb-5 mb-5">
            <BreadCrumbs
              nav1={constants.USERS}
              nav2={
                location?.pathname === constants.USERADDNAVIGATE
                  ? `${constants.ADD}`
                  : `${constants.EDIT}`
              }
              link={constants.USERNAVIGATE}
            />

            <div
              onClick={() => {
                submitHandler();
              }}
              className="w-[150px]"
            >
              <Button text={constants.SUBMIT} />
            </div>
          </div>

          {/* form */}

          <div
            className="flex flex-col"
            onClick={() => {
              setPhonelistModal(false);
              setSelectGenderListModal(false);
              setSelectStatusListModal(false);
            }}
          >
            <form
              className="rounded-full mb-10 flex flex-col items-end mx-auto"
              autoComplete="none"
            >
              <input
                type="file"
                className="hidden"
                ref={inputRefImage}
                onChange={handleFileUpload}
              />
              <div>
                <img
                  className="rounded-full h-40 w-40"
                  src={avatar ? avatar : "/assets/png/profilePic.png"}
                />
              </div>
              <FiEdit
                // eslint-disable-next-line no-undef
                onClick={() => inputRefImage.current.click()}
                className="text-xl text-black dark:text-white content-end"
              />
            </form>

            <div className="flex flex-col  md:h-[525px] p-2 overflow-y-auto">
              <div className="flex flex-col mx-20 gap-5">
                <div className="flex flex-wrap gap-y-5">
                  {/* USERNAME */}
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <div className="dark:text-white">
                        {constants.USERNAME}:
                      </div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text"
                          type="text"
                          placeholder={constants.USERNAME}
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* FIRSTNAME */}
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <div className="dark:text-white">
                        {constants.FIRSTNAME}:
                      </div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text"
                          type="text"
                          placeholder={constants.FIRSTNAME}
                          value={firstname}
                          onChange={(e) => {
                            setFirstname(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* LASTNAME */}
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <div className="dark:text-white">
                        {constants.LASTNAME}:
                      </div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text"
                          type="text"
                          placeholder={constants.LASTNAME}
                          value={lastname}
                          onChange={(e) => {
                            setLastname(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* EMAIL */}
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <div className="dark:text-white">{constants.EMAIL}:</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text"
                          type="email"
                          placeholder={constants.EMAIL}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* PHONE NUMBER */}
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <div className="dark:text-white">{constants.PHONE}:</div>
                      {!!phone && (
                        <div>
                          <PhoneCode
                            defaultValue={[phone?.code, phone?.number]}
                            fetchPhoneDetails={fetchPhoneDetails}
                            phonelistModal={phonelistModal}
                            setPhonelistModal={setPhonelistModal}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* DATE OF BIRTH */}
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <div className="dark:text-white">
                        {constants.DATEOFBIRTH}:
                      </div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text"
                          type="date"
                          placeholder={constants.DATEOFBIRTH}
                          value={birthDate}
                          onChange={(e) => {
                            setBirthDate(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* GENDER */}
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <SingleSelect
                          title={constants.GENDER}
                          dataArray={[
                            constants.MALE,
                            constants.FEMALE,
                            constants.OTHERS,
                          ]}
                          fetchInputValue={(val) => {
                            setGender(val);
                          }}
                          showSearch={false}
                          selectlistModal={selectGenderListModal}
                          setSelectlistModal={setSelectGenderListModal}
                          defaultValue={gender}
                          height="135"
                          width="290"
                        />
                      </div>
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <div className="dark:text-white">
                        {constants.PASSWORD}:
                      </div>
                      <div className="input-wrapping-div">
                        <div className="flex w-4/5">
                          <input
                            className="form-password-field focus:outline-none"
                            type={showPassword ? "text" : "password"}
                            placeholder={constants.PASSWORD}
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                          <div className="flex w-1/6 items-center justify-center cursor-pointer rounded-r-xl border-t-[1px] border-b-[1px] border-r-[1px] border-black dark:bg-white">
                            {showPassword ? (
                              <div>
                                <AiFillEyeInvisible
                                  className="text-2xl dark:text-black"
                                  onClick={() => setShowPassword(false)}
                                />
                              </div>
                            ) : (
                              <div>
                                <AiFillEye
                                  className="text-2xl dark:text-black"
                                  onClick={() => setShowPassword(true)}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* CONFIRM PASSWORD */}

                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <div className="dark:text-white">
                        {constants.CONFIRMPASSWORD}:
                      </div>
                      <div className="input-wrapping-div">
                        <div className="flex w-4/5">
                          <input
                            className="form-password-field focus:outline-new-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder={constants.CONFIRMPASSWORD}
                            value={confirmPassword}
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                            }}
                          />
                          <div className="flex w-1/6 items-center justify-center cursor-pointer rounded-r-xl border-t-[1px] border-b-[1px] border-r-[1px] border-black dark:bg-white">
                            {showConfirmPassword ? (
                              <div>
                                <AiFillEyeInvisible
                                  className="text-2xl dark:text-black"
                                  onClick={() => setShowConfirmPassword(false)}
                                />
                              </div>
                            ) : (
                              <div>
                                <AiFillEye
                                  className="text-2xl dark:text-black"
                                  onClick={() => setShowConfirmPassword(true)}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* STATUS */}
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <SingleSelect
                          title={constants.STATUS}
                          dataArray={[constants.ENABLE, constants.DISABLE]}
                          fetchInputValue={(val) => {
                            setStatus(val);
                          }}
                          showSearch={false}
                          selectlistModal={selectStatusListModal}
                          setSelectlistModal={setSelectStatusListModal}
                          height="100"
                          width="290"
                          defaultValue={status}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConformationPopup
        open={confirmPopupEdit}
        close={onClosedEdit}
        text={constants.EDITUSERPOPUPTEXT}
        heading={constants.EDITUSER}
        submitHandler={confirmHandlerEdit}
      />
      <ConformationPopup
        open={confirmPopupAdd}
        close={onClosedAdd}
        text={constants.ADDUSERPOPUPTEXT}
        heading={constants.ADDUSER}
        submitHandler={confirmHandlerAdd}
      />
    </>
  );
};

export default UserEdit;
