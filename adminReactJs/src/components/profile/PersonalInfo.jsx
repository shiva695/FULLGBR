//import dependencies
import { useState, useRef, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

// import files
import {
  apiList,
  invokeApi,
  invokeFormDataApi,
} from "../../utils/apiServiceUtils";
import { config } from "../../utils/configUtils";
import responseUtils from "../../utils/responseUtils";
import constants from "../../json/constants.json";

// import components
import Button from "../general/Button";
import PhoneCode from "../general/PhoneCode";
import SingleSelect from "../general/SingleSelect";
import ConformationPopup from "../modals/ConformationPopup";
import BreadCrumbs from "../general/BreadCrumbs";

function PersonalInfo() {
  const navigate = useNavigate();
  // Constants
  const inputRefImage = useRef();
  const [cookies, setCookie, removeCookie] = useCookies();
  const CookieData = cookies[constants.ADMINDATA];

  // State Variables
  const [firstName, setFirstName] = useState(CookieData.firstName);
  const [lastName, setLastName] = useState(CookieData.lastName);
  const [email, setEmail] = useState(CookieData.email);
  const [gender, setGender] = useState(CookieData.gender);
  const [phone, setPhone] = useState(CookieData.phone);
  const [phonelistModal, setPhonelistModal] = useState(false);
  const [invokeProfileDetail, setInvokeProfileDetail] = useState(true);
  const [selectlistModal, setSelectlistModal] = useState(false);

  // for uploadProfileImage
  const [avatar, setAvatar] = useState(null);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const onClose = () => {
    setConfirmPopup(false);
  };

  const submitHandler = (status) => {
    setConfirm(status);
  };

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

  function fetchPhoneDetails(phoneDetails) {
    let copy = { ...phone };
    copy.code = phoneDetails[0];
    copy.number = phoneDetails[1];
    setPhone(copy);
  }

  //axios (api integration)
  useEffect(() => {
    const personalInfoHandler = async () => {
      let params = {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        avatar: avatar,
        email: email,
        phoneCode: phone.code,
        phoneNumber: phone.number,
      };
      const responseData = await invokeApi(
        config.baseUrl + apiList.updateProfile,
        params,
        cookies
      );
      responseUtils.showToster(responseData);
      if (responseData.customcode === 200) {
        setCookie(
          constants.ADMINDATA,
          JSON.stringify({ adminData: responseData.data }),
          {
            path: "/",
            maxAge: 3000000,
            sameSite: "strict",
          }
        );
        onClose();
      }
    };
    if (confirm) {
      personalInfoHandler();
    }
  }, [
    confirm,
    phone,
    email,
    avatar,
    gender,
    lastName,
    firstName,
    cookies,
    setCookie,
  ]);

  // axios (API integration) for getting profile details

  useEffect(() => {
    const getProfileDetail = async () => {
      let response = await invokeApi(
        config.baseUrl + apiList.getProfileDetail,
        {},
        cookies
      );

      if (response.customcode === 201) removeCookie(constants.ADMINDATA);

      if (response.customcode === 200) {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setAvatar(response.data.avatar);

        setCookie(constants.ADMINDATA, JSON.stringify(response.data), {
          path: "/",
          maxAge: 3000000,
          sameSite: "strict",
        });
      }
    };

    if (invokeProfileDetail) {
      setInvokeProfileDetail(false);
      getProfileDetail();
    }
  }, [cookies, invokeProfileDetail, removeCookie, setCookie]);

  return (
    <div
      className="card-with-subheading"
      onClick={() => {
        setPhonelistModal(false);
        setSelectlistModal(false);
      }}
    >
      {/* Sub heading */}
      <div className="subheading">
        <div className="flex gap-x-5">
          <div
            className={
              location.pathname === constants.PROFILENAVIGATE
                ? "font-semibold flex gap-1"
                : "flex gap-1"
            }
          >
            {constants.PERSONALINFO}
          </div>
          <div
            className={"flex gap-1 cursor-pointer"}
            onClick={() => {
              navigate(constants.CHANGEPASSWORDNAVIGATE);
            }}
          >
            {constants.CHANGEPASSWORD}
          </div>
        </div>
      </div>
      {/* card-content */}
      <div className="card-content">
        <div className="flex flex-row mb-4 justify-between items-center border-b border-gray-300 pb-5">
          {/* Bread crumps */}
          <BreadCrumbs nav1={"Profile"} />
          {/* Submit button */}
          <div className="w-[150px]">
            <div
              onClick={() => {
                setConfirmPopup(true);
              }}
            >
              <Button text={constants.SUBMIT} />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:h-[525px] p-2 overflow-y-auto">
          <div className="flex flex-col items-center mx-20 gap-5">
            <div className="rounded-full mb-10 flex flex-col items-end">
              <input
                type="file"
                className="hidden"
                ref={inputRefImage}
                onChange={handleFileUpload}
              />
              <div>
                <img
                  className="rounded-full h-40 w-40"
                  src={avatar ? avatar : "assets/png/profilePic.png"}
                />
              </div>
              <FiEdit
                // eslint-disable-next-line no-undef
                onClick={() => inputRefImage.current.click()}
                className="text-xl text-black content-end"
              />
            </div>
            <div className="flex flex-wrap gap-y-5">
              <div className="w-1/3">
                <div className="flex flex-col gap-2">
                  <div>{constants.FIRSTNAME}:</div>
                  <div className="input-wrapping-div">
                    <input
                      className="form-input-text"
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/3">
                <div className="flex flex-col gap-2">
                  <div>{constants.LASTNAME}:</div>
                  <div className="input-wrapping-div">
                    <input
                      className="form-input-text"
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/3">
                <div className="flex flex-col gap-2">
                  <div>{constants.EMAIL}:</div>
                  <div className="input-wrapping-div">
                    <input
                      className="form-input-text"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="input-main-div">
                <SingleSelect
                  title={constants.GENDER}
                  dataArray={[
                    constants.MALE,
                    constants.FEMALE,
                    constants.OTHER,
                  ]}
                  fetchInputValue={(val) => {
                    setGender(val);
                  }}
                  defaultValue={`${constants[CookieData.gender]}`}
                  showSearch={false}
                  selectlistModal={selectlistModal}
                  setSelectlistModal={setSelectlistModal}
                  height="15"
                />
              </div>
              <div className="input-main-div">
                <div>{constants.PHONE}:</div>
                <div>
                  <PhoneCode
                    defaultValue={
                      phone !== null ? [phone.code, phone.number] : ["+91", ""]
                    }
                    fetchPhoneDetails={fetchPhoneDetails}
                    phonelistModal={phonelistModal}
                    setPhonelistModal={setPhonelistModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConformationPopup
        open={confirmPopup}
        close={onClose}
        text={"Are you sure want to submit?"}
        heading={"Form Submit"}
        submitHandler={submitHandler}
      />
    </div>
  );
}

export default PersonalInfo;
