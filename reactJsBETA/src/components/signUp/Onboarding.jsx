// @import Dependencies
import PropTypes from "prop-types";
import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// @import Utils
import { apiList, invokeApi } from "../../utills/apiService";
import { config } from "../../utills/configUtils";

// @import Json
import userTypeData from "../../json/usertype.json";
import profileAvatars from "../../json/profileavatars.json";
import favtopics from "../../json/favtopics.json";

// @import files
import {
  checkUserName,
  showCroppedImage,
  userSignUp,
} from "./handler/OnboardingHandler";

// @import Components
import PlayedYearModel from "./modals/PlayedYearModel";
import TextInput from "../inputComponents/TextInput";
import DropdownSelect from "../inputComponents/DropdownSelect";
import RadioInput from "../inputComponents/RadioInput";
import SelectChip from "../inputComponents/SelectChip";
import SearchInput from "../inputComponents/SearchInput";
import ImageCropper from "../inputComponents/ImageCropper";
import InputRange from "../inputComponents/InputRange";
import ProfileAvatars from "../generalComponents/ProfileAvatars";
import GameCard from "../generalComponents/GameCard";
import RecommendedList from "../generalComponents/RecommendedList";

// @Personalize profile
const Personalizeprofile = ({
  profileData,
  profileChangeHandler,
  checkUserName,
  monthArray,
  genderArray,
}) => {
  const [invokeValidate, setInvokeValidate] = useState(false);
  const { data: configData } = useSelector((state) => state.configs);
  useEffect(() => {
    const validateProfile = () => {
      if (
        profileData.fullName !== "" &&
        profileData.userName !== "" &&
        profileData.dobYear !== "" &&
        profileData.dobMonth !== "" &&
        profileData.dobDate !== "" &&
        profileData.gender !== "" &&
        profileData.dobError === "" &&
        profileData.userNameError === ""
      ) {
        const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
        const currentYear = new Date().getFullYear();
        const ageCookie = configData?.userMinAge;
        const underAge = currentYear - ageCookie;
        const maxAge = currentYear - 90;
        if (
          daysInMonth(
            +profileData.dobYear,
            monthArray.map((el) => el.label).indexOf(profileData.dobMonth) + 1
          ) < +profileData.dobDate
        ) {
          profileChangeHandler(
            "dobError",
            "Please enter a valid date of birth"
          );
          profileChangeHandler("isContinueBtnDisabled", true);
        } else {
          if (currentYear <= +profileData.dobYear) {
            profileChangeHandler("dobError", "Please enter valid dob");
            profileChangeHandler("isContinueBtnDisabled", true);
          } else if (underAge < +profileData.dobYear) {
            profileChangeHandler("dobError", "User age atleast 13 years");
            profileChangeHandler("isContinueBtnDisabled", true);
          } else if (maxAge > +profileData.dobYear) {
            profileChangeHandler("dobError", "User age must be under 50 years");
            profileChangeHandler("isContinueBtnDisabled", true);
          } else {
            profileChangeHandler("dobError", "");
            profileChangeHandler("isContinueBtnDisabled", false);
          }
        }
      } else {
        profileChangeHandler("isContinueBtnDisabled", true);
      }
    };

    if (invokeValidate) {
      setInvokeValidate(false);
      validateProfile();
    }
  }, [
    configData?.userMinAge,
    invokeValidate,
    monthArray,
    profileChangeHandler,
    profileData.dobDate,
    profileData.dobError,
    profileData.dobMonth,
    profileData.dobYear,
    profileData.fullName,
    profileData.gender,
    profileData.userName,
    profileData.userNameError,
  ]);
  return (
    <div className="flex flex-col justify-center items-center text-[#FFFFFF] ">
      <h5 className="w-[365px] h-[38px] font-semibold text-[32px] leading-[38.4px] text-center mb-[32px] ">
        Personalize your profile
      </h5>
      <div className=" flex flex-col w-[550px]">
        <TextInput
          label={"Full Name"}
          placeholder={"Enter full name"}
          mainClassName={`flex flex-col bg-transparent w-[550px] space-y-2 ${
            profileData.fullNameError ? "mb-[8px]" : "mb-[24px]"
          } `}
          inputClassName={`bg-transparent w-[550px] h-[40px] rounded-lg px-[10px] py-[16px] placeholder-[#7D8185] border-[#2B2E30] border-[1px] ${
            profileData.fullNameError
              ? "outline-typo-red outline-none border-none"
              : "focus:outline-typo-blue outline-none focus:border-none"
          }`}
          errorClassName={"flex flex-row items-center gap-[8px]"}
          error={profileData.fullNameError}
          value={profileData.fullName}
          valueChange={(ev) => {
            profileChangeHandler("fullName", ev.target.value);
            setInvokeValidate(true);
          }}
          showSpinner={false}
        />
        <TextInput
          label={"User Name"}
          placeholder={"Enter user name"}
          mainClassName={`flex flex-col bg-transparent w-[550px] space-y-2 ${
            profileData.userNameError ? "mb-[8px]" : "mb-[24px]"
          } `}
          inputClassName={`bg-transparent w-[550px] h-[40px] rounded-lg px-[10px] py-[16px] placeholder-[#7D8185] border-[#2B2E30] border-[1px] ${
            profileData.userNameError
              ? "outline-typo-red outline-none border-none"
              : "focus:outline-typo-blue outline-none focus:border-none"
          }`}
          errorClassName={"flex flex-row items-center gap-[8px]"}
          error={profileData.userNameError}
          value={profileData.userName}
          valueChange={(ev) => {
            profileChangeHandler("userName", ev.target.value);
            setInvokeValidate(true);
          }}
          showSpinner={profileData.showSpinner}
          inputBlur={checkUserName}
        />

        <div
          className={`flex flex-col bg-transparent w-[550px] space-y-2  ${
            profileData.dobError ? "mb-[8px]" : "mb-[24px]"
          }`}
        >
          <p className="bg-transparent w-[85px] h-[20px] font-normal text-[14px] leading-5 text-[#FAFBFC]">
            Date of Birth
          </p>
          <div className="flex w-full space-x-2">
            <TextInput
              placeholder={"Year"}
              mainClassName={`flex flex-col bg-transparent w-[550px] space-y-2`}
              inputClassName={`bg-transparent w-[178px] h-[40px] rounded-lg px-[10px] py-[16px] placeholder-[#7D8185] border-[#2B2E30] border-[1px] ${
                profileData.dobError
                  ? "outline-typo-red outline-none border-none"
                  : "focus:outline-typo-blue outline-none focus:border-none"
              }`}
              // errorClassName={"flex flex-row items-center gap-[8px]"}
              // error={profileData.dobError}
              value={profileData.dobYear.replace(/[^\d]/g, "")}
              valueChange={(ev) => {
                profileChangeHandler("dobYear", ev.target.value);
                profileChangeHandler("dobError", "");
                setInvokeValidate(true);
              }}
              maxlength={"4"}
            />

            <DropdownSelect
              options={monthArray}
              defaultValue={profileData.dobMonth}
              placeholder={profileData.dobMonth ?? "Month"}
              onChange={(selectedItem) => {
                profileChangeHandler("dobMonth", selectedItem.label);
                setInvokeValidate(true);
              }}
            />

            <TextInput
              placeholder={"Date"}
              mainClassName={`flex flex-col bg-transparent w-[550px] space-y-2`}
              inputClassName={`bg-transparent w-[178px] h-[40px] rounded-lg px-[10px] py-[16px] placeholder-[#7D8185] border-[#2B2E30] border-[1px] ${
                profileData.dobError
                  ? "outline-typo-red outline-none border-none"
                  : "focus:outline-typo-blue outline-none focus:border-none"
              }`}
              // errorClassName={"flex flex-row items-center gap-[8px]"}
              // error={profileData.dobError}
              value={profileData.dobDate.replace(/[^\d]/g, "")}
              valueChange={(ev) => {
                profileChangeHandler("dobDate", ev.target.value);
                profileChangeHandler("dobError", "");
                setInvokeValidate(true);
              }}
              maxlength={"2"}
            />
          </div>
          {profileData.dobError && (
            <p className="flex flex-row items-center gap-[8px]">
              <img
                src="/assets/svg/errorInfo.svg"
                className="h-[18px] w-[18px]"
              />
              <p className="text-typo-red text-sm">{profileData.dobError}</p>
            </p>
          )}
        </div>

        <div
          className={`flex flex-col bg-transparent w-[550px] space-y-2 mb-[24px]`}
        >
          <p className="bg-transparent w-[74px] h-[20px] font-normal text-[14px] leading-5 text-[#FAFBFC]">
            Gender
          </p>
          <div className="flex flex-row w-[318px] h-[40px] items-center space-x-3 text-[#7D8185]">
            {genderArray?.map((el, idx) => (
              <RadioInput
                key={idx}
                inputClassName="flex w-[94px] h-[40px] items-center space-x-3"
                radioValue={profileData.gender === el.value ? true : false}
                radioChange={() => {
                  profileChangeHandler("gender", el.value);
                  setInvokeValidate(true);
                }}
                displayValue={el.displayValue}
              />
            ))}
          </div>
        </div>
        <TextInput
          label={"Referral Id"}
          placeholder={"Enter referral id"}
          mainClassName={`flex flex-col bg-transparent w-[550px] space-y-2 mb-[24px]`}
          inputClassName={`bg-transparent w-[550px] h-[40px] rounded-lg focus:outline-typo-blue outline-none px-[10px] py-[16px] placeholder-[#7D8185] border-[#2B2E30] border-[1px]`}
          // errorClassName={"flex flex-row items-center gap-[8px]"}
          // error={profileData.userNameError}
          value={profileData.referralId}
          valueChange={(ev) => {
            profileChangeHandler("referralId", ev.target.value);
            setInvokeValidate(true);
          }}
        />
      </div>
    </div>
  );
};

Personalizeprofile.propTypes = {
  profileData: PropTypes.object,
  profileChangeHandler: PropTypes.func,
  checkUserName: PropTypes.func,
  monthArray: PropTypes.array,
  genderArray: PropTypes.array,
};

// @Select userType
const SelectUserType = ({ profileData, profileChangeHandler }) => {
  const validateUserType = (ele) => {
    if (ele !== "") {
      profileChangeHandler("isContinueBtnDisabled", false);
    } else {
      profileChangeHandler("isContinueBtnDisabled", true);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h5 className="w-[365px] h-[38px] text-[#FFFFFF] font-semibold text-[32px] leading-[38.4px] text-center mb-[32px] ">
        Select User Type
      </h5>
      {/* Search  */}
      <SearchInput
        value={profileData.searchUserType}
        placeholder="Search Topic"
        inputClassName="text-[14px] w-[100px] focus:border-typo-blue outline-none  bg-transparent text-typo-secondary"
        mainClassName="flex flex-row w-[262px] h-[40px] py-[10px] px-[16px] gap-[12px] justify-center items-center border-[2px] border-[#2B2E30] rounded-[20px]"
        imageClassName="w-[15px] h-[15px] flex"
        valueChange={(ev) => {
          profileChangeHandler("searchUserType", ev.target.value);
          if (ev.target.value.length > 0) {
            const filteredData = profileData.userTypeData.map((item) => ({
              title: item.title,
              select: item.select.filter((option) =>
                option.toLowerCase().includes(ev.target.value.toLowerCase())
              ),
            }));
            profileChangeHandler("userTypeData", filteredData);
          } else {
            profileChangeHandler("userTypeData", userTypeData);
          }
        }}
      />

      {/* Chips */}
      <div className="w-[727px] h-[382px] flex  flex-col gap-[36px] mt-[36px]">
        {/* Row 1 */}
        {profileData.userTypeData.map((el, idx) => (
          <div
            key={idx}
            className="w-full flex flex-row flex-wrap items-center gap-[12px]"
          >
            <h5 className="text-[14px] font-normal text-typo-secondary">
              {el.title}
            </h5>
            {el.select.map((ele, indx) => (
              <SelectChip
                key={indx}
                selectChange={() => {
                  profileChangeHandler("userType", ele);
                  validateUserType(ele);
                }}
                value={ele}
                userType={profileData.userType}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

SelectUserType.propTypes = {
  profileData: PropTypes.object,
  profileChangeHandler: PropTypes.func,
};

// @Set Profile picture
const SetProfilePicture = ({
  profileData,
  profileChangeHandler,
  onCropComplete,
  inputRefImg,
}) => {
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

  const validateSetProfilePicture = () => {
    if (
      imgAcceptFile.length > 0 ||
      profileData.profileAvatars.some((el) => el.isSelected === true)
    ) {
      profileChangeHandler("isContinueBtnDisabled", false);
    } else {
      profileChangeHandler("isContinueBtnDisabled", true);
    }
  };

  // IMG Upload file handler
  useEffect(() => {
    if (imgAcceptFile.length > 0) {
      profileChangeHandler(
        "filesImg",
        imgAcceptFile.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      let feAvtr = [...profileData.profileAvatars];
      feAvtr.map((el) => (el.isSelected = false));
      profileChangeHandler("profileAvatars", feAvtr);
      validateSetProfilePicture();
    }
    if (imgRejectFile.length > 0) {
      alert("Rejeted");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgAcceptFile, imgRejectFile]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h5 className="w-[365px] h-[38px] text-[#FFFFFF] font-semibold text-[32px] leading-[38.4px] text-center mb-[32px] ">
        Set Profile picture
      </h5>
      <div className="w-[550px] h-[430px]">
        {profileData.filesImg?.length > 0 ? (
          <div className="flex flex-col items-center justify-center gap-[24px]">
            <ImageCropper
              mainClassName="relative w-[245px]  h-[180px] border-[3px] box-border border-[#1A1C1F]"
              filesImg={profileData.filesImg[0].preview}
              crop={profileData.crop}
              zoom={profileData.zoom}
              setCrop={(crop) => profileChangeHandler("crop", crop)}
              onCropComplete={onCropComplete}
              setZoom={(zoom) => profileChangeHandler("zoom", zoom)}
            />

            <div className="flex flex-row gap-[20px] items-center">
              <div className="flex flex-row items-center justify-center gap-[8px]">
                <img className="h-6 w-6" src="/assets/svg/zoom-img-icon.svg" />
                <h5 className="text-sm font-normal text-[#7D8185]">Zoom</h5>
              </div>
              <InputRange
                value={profileData.zoom}
                valueChange={(ev) => {
                  profileChangeHandler("zoom", ev.target.value);
                }}
                min={1}
                max={3}
                step={0.1}
                className="h-1 [w-210px] outline-none"
              />
            </div>
          </div>
        ) : (
          <div
            {...imgRootProps()}
            onClick={(ev) => {
              ev.stopPropagation();
            }}
            className=" flex  w-[550px] h-[156px] border-dashed bg-[#2A85FF06] cursor-pointer border-[#2A85FF50] border-[1px] rounded-lg justify-center items-center"
          >
            <div className="flex flex-col w-[347px] h-[100px] space-y-2 rounded-xl items-center">
              <img
                src="/assets/svg/defaultDp.svg"
                className="w-[64px] h-[64px] "
              />

              <input type="file" {...imgInputProps()} ref={inputRefImg} />
              <p
                onClick={() => {
                  inputRefImg.current.click();
                }}
                className="w-[214px] h-[20px] font-semibold text-[14px] leading-5 text-[#2E9BFA] cursor-pointer"
              >
                Click to upload{" "}
                <span className="font-normal text-[14px] leading-5 text-[#B5B9BD]">
                  a new profile pic
                </span>
              </p>
            </div>
          </div>
        )}

        <p className="w-[135px] h-[20px] font-normal text-[14px] leading-5 text-[#FAFBFC] mt-6">
          Or choose an Avator
        </p>
        <div className="flex flex-row space-x-4 mt-5">
          {profileData.profileAvatars.map((el, idx) => (
            <ProfileAvatars
              key={idx}
              onClick={() => {
                let copy = [...profileData.profileAvatars];
                copy.map((el) => (el.isSelected = false));
                copy[idx].isSelected = true;
                profileChangeHandler("filesImg", null);
                profileChangeHandler("profileAvatars", copy);
                validateSetProfilePicture();
              }}
              img={el.img}
              isSelected={el.isSelected}
              mainClassName="relative cursor-pointer"
              imgClassName="w-[64px] h-[64px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

SetProfilePicture.propTypes = {
  profileData: PropTypes.object,
  profileChangeHandler: PropTypes.func,
  onCropComplete: PropTypes.func,
  inputRefImg: PropTypes.object,
};

// @Add social Links
const AddSocialLinks = ({ profileData, profileChangeHandler }) => {
  const validateAddSocialLinks = () => {
    if (
      profileData.facebook !== "" &&
      profileData.twitter !== "" &&
      profileData.instagram !== "" &&
      profileData.discord !== "" &&
      profileData.youtube !== ""
    ) {
      profileChangeHandler("isContinueBtnDisabled", false);
    } else {
      profileChangeHandler("isContinueBtnDisabled", true);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h5 className="w-[365px] h-[38px] text-[#FFFFFF] font-semibold text-[32px] leading-[38.4px] text-center mb-[32px] ">
        Add your Social Links
      </h5>
      <div className="w-[550px] h-[430px] flex flex-col">
        <div className="flex flex-row mt-8">
          <div className="w-[120px] h-[32px] space-x-2 flex flex-row mr-8">
            <img
              src="/assets/svg/onboardFB.svg"
              className="w-[32px] h-[32px]"
            />
            <p className="w-[66px] h-[20px] font-normal text-[14px] leading-5 text-[#FAFBFC] ml-2 mt-2">
              Facebook
            </p>
          </div>
          <TextInput
            inputClassName="bg-transparent border-[1px] outline-none text-[#FAFBFC] px-3 text-[14px] font-normal focus:border-typo-blue border-[#2B2E30] rounded-lg w-[398px] h-[40px]"
            value={profileData.facebook}
            valueChange={(ev) => {
              profileChangeHandler("facebook", ev.target.value);
              validateAddSocialLinks();
            }}
          />
        </div>
        <div className="flex flex-row mt-8">
          <div className="w-[120px] h-[32px] space-x-2 flex flex-row mr-8">
            <img src="/assets/svg/onboardX.svg" className="w-[32px] h-[32px]" />
            <p className="w-[66px] h-[20px] font-normal text-[14px] leading-5 text-[#FAFBFC] ml-2 mt-2">
              Twitter
            </p>
          </div>
          <TextInput
            inputClassName="bg-transparent border-[1px] outline-none text-[#FAFBFC] px-3 text-[14px] font-normal focus:border-typo-blue border-[#2B2E30] rounded-lg w-[398px] h-[40px]"
            value={profileData.twitter}
            valueChange={(ev) => {
              profileChangeHandler("twitter", ev.target.value);
              validateAddSocialLinks();
            }}
          />
        </div>
        <div className="flex flex-row mt-8">
          <div className="w-[120px] h-[32px] space-x-2 flex flex-row mr-8">
            <img
              src="/assets/svg/onboardIN.svg"
              className="w-[32px] h-[32px]"
            />
            <p className="w-[66px] h-[20px] font-normal text-[14px] leading-5 text-[#FAFBFC] ml-2 mt-2">
              Instagram
            </p>
          </div>
          <TextInput
            inputClassName="bg-transparent border-[1px] outline-none text-[#FAFBFC] px-3 text-[14px] font-normal focus:border-typo-blue border-[#2B2E30] rounded-lg w-[398px] h-[40px]"
            value={profileData.instagram}
            valueChange={(ev) => {
              profileChangeHandler("instagram", ev.target.value);
              validateAddSocialLinks();
            }}
          />
        </div>
        <div className="flex flex-row mt-8">
          <div className="w-[120px] h-[32px] space-x-2 flex flex-row mr-8">
            <img
              src="/assets/svg/onboardDS.svg"
              className="w-[32px] h-[32px]"
            />
            <p className="w-[66px] h-[20px] font-normal text-[14px] leading-5 text-[#FAFBFC] ml-2 mt-2">
              Discord
            </p>
          </div>
          <TextInput
            inputClassName="bg-transparent border-[1px] outline-none text-[#FAFBFC] px-3 text-[14px] font-normal focus:border-typo-blue border-[#2B2E30] rounded-lg w-[398px] h-[40px]"
            value={profileData.discord}
            valueChange={(ev) => {
              profileChangeHandler("discord", ev.target.value);
              validateAddSocialLinks();
            }}
          />
        </div>
        <div className="flex flex-row mt-8">
          <div className="w-[120px] h-[32px] space-x-2 flex flex-row mr-8">
            <img
              src="/assets/svg/onboardYT.svg"
              className="w-[32px] h-[32px]"
            />
            <p className="w-[66px] h-[20px] font-normal text-[14px] leading-5 text-[#FAFBFC] ml-2 mt-2">
              Youtube
            </p>
          </div>
          <TextInput
            inputClassName="bg-transparent border-[1px] outline-none text-[#FAFBFC] px-3 text-[14px] font-normal focus:border-typo-blue border-[#2B2E30] rounded-lg w-[398px] h-[40px]"
            value={profileData.youtube}
            valueChange={(ev) => {
              profileChangeHandler("youtube", ev.target.value);
              validateAddSocialLinks();
            }}
          />
        </div>
      </div>
    </div>
  );
};

AddSocialLinks.propTypes = {
  profileData: PropTypes.object,
  profileChangeHandler: PropTypes.func,
};

// @Games Played
const GamesPlayed = ({
  profileData,
  selectedgameData,
  setSelectedGameData,
}) => {
  const listInnerRef = useRef(null);
  const [innerRef, setInnerRef] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [maxDistReached, setMaxDistReached] = useState(false);
  const [invokeGameSearch, setInvokeGameSearch] = useState(true);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedgameData, setSelectedGameData] = useState([]);
  const [gameSearchData, setGameSearchData] = useState(null);
  const [isPlayedYearModal, setIsPlayedYearModal] = useState(false);
  const [playerModalData, setPlayerModalData] = useState(null);
  const [yearInputFocused, setYearInputFocused] = useState(false);
  const [playedYearError, setPlayedYearError] = useState("");

  // scroll left handler
  const onScrollLeft = useCallback(() => {
    if (innerRef) {
      const { scrollLeft, scrollWidth, clientWidth } = listInnerRef.current;
      const isNearLeft =
        Math.round(scrollLeft) + 1 + clientWidth >= scrollWidth;
      if (isNearLeft && !isLoading && !maxDistReached) {
        setSkip((prev) => prev + 10);
        setInvokeGameSearch(true);
      }
    } else {
      console.error("on left scroll error");
    }
  }, [innerRef, isLoading, maxDistReached]);

  const validatePlayedYear = () => {
    let validationErrors = false;
    const currentYear = new Date().getFullYear();

    if (currentYear < +playerModalData?.year) {
      setPlayedYearError("Please enter valid year");
      validationErrors = true;
    } else if (+playerModalData?.year < +profileData.dobYear + 5) {
      setPlayedYearError("Please enter valid year");
      validationErrors = true;
    } else {
      validationErrors = false;
      setPlayedYearError("");
    }
    return validationErrors ? false : true;
  };
  // onScroll left handler
  useEffect(() => {
    setInnerRef(listInnerRef.current);
    if (innerRef) {
      innerRef.addEventListener("scroll", onScrollLeft);
      // Clean-up
      return () => {
        innerRef.removeEventListener("scroll", onScrollLeft);
      };
    }
  }, [innerRef, onScrollLeft]);

  useEffect(() => {
    const getGamepediaSearch = async () => {
      setIsLoading(true);
      let params = { skip, limit: 10, search: searchValue };
      const controller = new AbortController();
      const { signal } = controller;
      const response = await invokeApi(
        config.baseUrl + apiList.getHistoryGamelist,
        params,
        { signal }
      );
      if (response.customcode === 200) {
        if (response.data.length < 10) {
          setMaxDistReached(true);
        } else {
          setMaxDistReached(false);
        }
        if (selectedgameData?.length > 0) {
          for (let i = 0; i < selectedgameData?.length; i++) {
            for (let j = 0; j < response.data.length; j++) {
              if (selectedgameData[i].gameName === response.data[j].gameName) {
                response.data.splice(j, 1);
              }
            }
          }
        }
        if (skip > 0) {
          setGameSearchData((prev) => [...prev, ...response.data]);
        } else {
          setGameSearchData(response.data);
        }
        setIsLoading(false);
      } else {
        alert("Something went wrong");
      }

      // UseEffect abort on unmount for cleanup
      return () => {
        controller.abort();
      };
    };
    if (searchValue.length >= 3 && invokeGameSearch) {
      setInvokeGameSearch(false);
      getGamepediaSearch();
    }
  }, [invokeGameSearch, searchValue, selectedgameData, skip]);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h5 className="w-[365px] h-[38px] text-[#FFFFFF] font-semibold text-[32px] leading-[38.4px] text-center mb-[32px] ">
          Games Played History
        </h5>

        <div className="w-[854px] h-[438px] overflow-y-hidden">
          {/* Search  */}
          <SearchInput
            value={searchValue}
            placeholder="Search games to add"
            inputClassName="w-[262px] h-[40px] rounded-full pl-20 text-[14px] focus:border-typo-blue outline-none border-[#2B2E30] border-[1px] bg-transparent text-typo-secondary"
            mainClassName="flex flex-row relative justify-center items-center my-6"
            imageClassName="w-[15px] h-[15px] flex absolute left-[350px]"
            valueChange={(ev) => {
              setSearchValue(ev.target.value);
              setSkip(0);
              if (ev.target.value.length >= 3) setInvokeGameSearch(true);
              if (ev.target.value.length === 0) {
                setGameSearchData(null);
              }
            }}
          />

          {/* Searched games */}
          {gameSearchData?.length > 0 && (
            <div
              ref={listInnerRef}
              className="w-[441px] h-[146px] mx-auto flex flex-row overflow-x-scroll gap-[20px]"
            >
              {/* render */}
              {gameSearchData?.map((el, idx) => (
                <GameCard
                  key={idx}
                  onClick={() => {
                    setPlayerModalData(el);
                    setIsPlayedYearModal(true);
                  }}
                  gameLogo={el.gameLogo}
                  gameName={el.gameName}
                />
              ))}
            </div>
          )}

          <div
            className={`text-white flex flex-row w-full ${
              gameSearchData?.length > 0 ? "h-[194px]" : "h-[340px]"
            } overflow-y-scroll mt-[20px] px-[24px]`}
          >
            <table>
              <tr className="flex  h-[40px]">
                <th className="w-[290px] text-start">
                  <span className="text-[12px] font-normal leading-4">
                    Game played
                  </span>
                </th>
                <th className="w-[150px] text-start">
                  <span className="text-[12px] font-normal leading-4">
                    Developer
                  </span>
                </th>
                <th className="w-[100px] text-start">
                  <span className="text-[12px] font-normal leading-4">
                    Year played
                  </span>
                </th>
                <th className="w-[254px] text-center">
                  <span className="text-[12px] font-normal leading-4">
                    Genre
                  </span>
                </th>
              </tr>
              {selectedgameData?.length > 0 ? (
                <>
                  {selectedgameData?.map((game, idx) => (
                    <tr key={idx} className="flex  h-[50px]">
                      <td className="flex w-[290px] h-[36px] text-start items-center gap-[8px] leading-4 text-[12px]">
                        <img
                          src={`${game.gameLogo}`}
                          className="w-[36px] h-[36px] rounded-lg"
                        />
                        <span>{game.gameName}</span>
                      </td>
                      <td className="flex w-[150px] h-[36px] text-start leading-4 text-[12px] items-center">
                        {game.developers}
                      </td>
                      <td className="flex w-[100px] h-[36px] text-start leading-4 text-[12px] items-center">
                        {game.year}
                      </td>
                      <td className="flex w-[254px] h-[36px] ps-6 space-x-2 items-center justify-center">
                        {game.genre.slice(0, 2).map((gen) => (
                          <span
                            key={gen}
                            className="w-[83px] h-[24px] truncate text-ellipsis rounded-lg bg-[#CABDFF] p-1 text-center text-[12px] text-black"
                          >
                            {gen}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr className="flex w-[854px] h-[50px]">
                  <td className="flex w-[350px] h-[36px] text-start justify-start leading-4 text-[12px] items-center">
                    <span>--</span>
                  </td>
                  <td className="flex w-[150px] h-[36px] text-start justify-start leading-4 text-[12px] items-center">
                    <span>--</span>
                  </td>
                  <td className="flex w-[100px] h-[36px] text-start leading-4 text-[12px] items-center">
                    <span>--</span>
                  </td>
                  <td className="flex w-[254px] h-[36px]  leading-4 text-[12px] items-center justify-center">
                    <span>--</span>
                  </td>
                </tr>
              )}
            </table>
          </div>
        </div>
      </div>

      {isPlayedYearModal && (
        <PlayedYearModel
          open={isPlayedYearModal}
          gameLogo={playerModalData.gameLogo}
          gameName={playerModalData.gameName}
          value={playerModalData?.year}
          playedYearError={playedYearError}
          onInputBlur={() => setYearInputFocused(false)}
          onInputFocus={() => setYearInputFocused(true)}
          yearInputFocused={yearInputFocused}
          onSubmit={(ev) => {
            ev.preventDefault();
            if (playerModalData?.year && playerModalData?.year.length === 4) {
              let val = validatePlayedYear();
              if (val) {
                let copy = JSON.parse(JSON.stringify(selectedgameData));
                copy.push(playerModalData);
                setSelectedGameData(copy);
                setIsPlayedYearModal(false);
                setGameSearchData(null);
                setSearchValue("");
              }
            } else {
              setPlayedYearError("Please enter played year");
            }
          }}
          onChange={(ev) => {
            let copy = { ...playerModalData };
            copy.year = ev.target.value.replace(/[^\d]/g, "");
            setPlayedYearError("");
            setPlayerModalData(copy);
          }}
        />
      )}
    </>
  );
};

GamesPlayed.propTypes = {
  profileData: PropTypes.object,
  selectedgameData: PropTypes.array,
  setSelectedGameData: PropTypes.func,
};

// @Choose favourite topics
const ChooseFavouriteTopics = ({ profileData, profileChangeHandler }) => {
  const [filtFav, setFiltFav] = useState([]);

  const validateChooseFavouriteTopics = () => {
    let checkFavTopics = profileData.favTopics?.filter(
      (el) => el.isSelected === true
    );
    if (checkFavTopics.length >= 3) {
      profileChangeHandler("isContinueBtnDisabled", false);
    } else {
      profileChangeHandler("isContinueBtnDisabled", true);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h5 className="w-[525px] h-[38px] text-[#FFFFFF] font-semibold text-[32px] leading-[38.4px] text-center mb-[32px] ">
        Choose 3 or more favourite topics
      </h5>

      <div className="flex flex-col relative w-[854px] h-[438px] justify-center items-center mt-1 ">
        <SearchInput
          value={null}
          valueChange={null}
          placeholder="Search Topic"
          mainClassName="flex flex-row relative justify-center items-center my-6"
          inputClassName="w-[262px] h-[40px] rounded-full pl-24 text-[14px] focus:border-typo-blue outline-none border-[#2B2E30] border-[1px] bg-transparent text-typo-secondary"
          imageClassName="w-[15px] h-[15px] flex absolute left-[70px]"
        />
        <div className=" w-[738px] h-[380px] flex flex-wrap overflow-y-scroll">
          {profileData.favTopics?.map((el, idx) => (
            <ProfileAvatars
              key={idx}
              onClick={() => {
                let copy = [...profileData.favTopics];
                let fi = [...filtFav];
                copy[idx].isSelected = !copy[idx].isSelected;
                if (copy[idx].isSelected) {
                  fi.push(copy[idx]);
                } else {
                  fi.splice(fi[idx], 1);
                }
                let f = copy.filter((el) => el.isSelected === true);
                if (f.length > 3) {
                  fi[0].isSelected = false;
                  fi.splice(f[0], 1);
                }
                setFiltFav(fi);
                profileChangeHandler("favTopics", copy);
                validateChooseFavouriteTopics();
              }}
              img={el.img}
              isSelected={el.isSelected}
              title={el.title}
              mainClassName="relative w-[88px] h-[116px] flex flex-col m-4 cursor-pointer"
              imgClassName="w-[88px] h-[88px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

ChooseFavouriteTopics.propTypes = {
  profileData: PropTypes.object,
  profileChangeHandler: PropTypes.func,
};

// @RecommendedFollow
const RecommendedFollow = ({ recommendedFollow, setRecommendedFollow }) => {
  // const [skip, setSkip] = useState(0);
  const [invokerRecommend, setInvokerRecommend] = useState(true);
  // const [recommendedFollow, setRecommendedFollow] = useState(null);
  useEffect(() => {
    const getSuggestUser = async () => {
      // setIsLoading(true);
      let params = { skip: 0, limit: 10, search: "" };
      const controller = new AbortController();
      const { signal } = controller;
      const response = await invokeApi(
        config.baseUrl + apiList.getSuggestUser,
        params,
        { signal }
      );
      if (response.customcode === 200) {
        setRecommendedFollow(response.data);
      } else {
        alert("Something went wrong");
      }

      // UseEffect abort on unmount for cleanup
      return () => {
        controller.abort();
      };
    };
    if (invokerRecommend) {
      setInvokerRecommend(false);
      getSuggestUser();
    }
  }, [invokerRecommend]);
  return (
    <div className="flex flex-col justify-center items-center">
      <h5 className="w-[525px] h-[38px] text-[#FFFFFF] font-semibold text-[32px] leading-[38.4px] text-center mb-[32px] ">
        Recommended for you to follow
      </h5>
      <div className="flex flex-col relative w-[854px] h-[440px] rounded-[16px]">
        <SearchInput
          value={null}
          valueChange={null}
          placeholder="Search people to follow"
          mainClassName="flex flex-row relative justify-center items-center my-6"
          inputClassName="w-[262px] h-[40px] rounded-full pl-14 text-[14px] focus:border-typo-blue outline-none border-[#2B2E30] border-[1px] bg-transparent text-typo-secondary"
          imageClassName="w-[15px] h-[15px] flex absolute left-[328px]"
        />
        <div className=" w-[774px] mx-10 flex flex-wrap gap-x-4 gap-y-6 overflow-y-scroll">
          {recommendedFollow?.map((el, idx) => (
            <RecommendedList
              key={idx}
              profilePic={el.profilePic}
              name={el.name}
              userName={el.userName}
              onClick={() => {
                let copy = [...recommendedFollow];
                recommendedFollow[idx].isSelected =
                  !recommendedFollow[idx].isSelected;
                setRecommendedFollow(copy);
              }}
              isSelected={el.isSelected}
              mainClassName=" w-[375px] h-[72px] border-[1px] rounded-lg border-[#2B2E30] flex flex-row justify-between items-center px-4"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

RecommendedFollow.propTypes = {
  recommendedFollow: PropTypes.array,
  setRecommendedFollow: PropTypes.func,
};

export default function Onboarding() {
  const monthArray = [
    { label: "JANUARY" },
    { label: "FEBRUARY" },
    { label: "MARCH" },
    { label: "APRIL" },
    { label: "MAY" },
    { label: "JUNE" },
    { label: "JULY" },
    { label: "AUGUST" },
    { label: "SEPTEMBER" },
    { label: "OCTOBER" },
    { label: "NOVEMBER" },
    { label: "DECEMBER" },
  ];

  const genderArray = [
    { value: "MALE", displayValue: "Male" },
    { value: "FEMALE", displayValue: "Female" },
    { value: "OTHERS", displayValue: "Others" },
  ];
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [cookies] = useCookies();
  const inputRefImg = useRef(null);
  const [profileData, setProfileData] = useState({
    fullName: "",
    fullNameError: "",
    userName: "",
    userNameError: "",
    showSpinner: false,
    dobYear: "",
    dobError: "",
    dobMonth: null,
    dobDate: "",
    gender: "MALE",
    referralId: "",
    userType: "",
    zoom: 1,
    facebook: "",
    twitter: "",
    instagram: "",
    discord: "",
    youtube: "",
    searchUserType: "",
    searchGames: "",
    filesImg: null,
    crop: { x: 0, y: 0 },
    isContinueBtnDisabled: true,
    croppedAreaPixels: null,
    gameSearchData: null,
    userTypeData: userTypeData,
    favTopics: favtopics,
    profileAvatars: profileAvatars,
  });
  const [selectedgameData, setSelectedGameData] = useState([]);
  const [recommendedFollow, setRecommendedFollow] = useState([]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    profileChangeHandler("croppedAreaPixels", croppedAreaPixels);
  }, []);

  // @Profile input change handler
  const profileChangeHandler = (formKey, formValue) => {
    setProfileData((prevProfileForm) => ({
      ...prevProfileForm,
      [formKey]: formValue,
    }));
  };

  // @Render Components
  const renderComponent = () => {
    switch (tab) {
      case 0:
        return (
          <Personalizeprofile
            profileData={profileData}
            profileChangeHandler={profileChangeHandler}
            monthArray={monthArray}
            checkUserName={() => {
              checkUserName(profileData, profileChangeHandler, cookies);
            }}
            genderArray={genderArray}
            cookies={cookies}
          />
        );
      case 1:
        return (
          <SelectUserType
            profileData={profileData}
            profileChangeHandler={profileChangeHandler}
          />
        );
      case 2:
        return (
          <SetProfilePicture
            profileData={profileData}
            profileChangeHandler={profileChangeHandler}
            onCropComplete={onCropComplete}
            inputRefImg={inputRefImg}
          />
        );
      case 3:
        return (
          <AddSocialLinks
            profileData={profileData}
            profileChangeHandler={profileChangeHandler}
          />
        );
      case 4:
        return (
          <GamesPlayed
            profileData={profileData}
            profileChangeHandler={profileChangeHandler}
            selectedgameData={selectedgameData}
            setSelectedGameData={setSelectedGameData}
          />
        );
      case 5:
        return (
          <ChooseFavouriteTopics
            profileData={profileData}
            profileChangeHandler={profileChangeHandler}
          />
        );
      case 6:
        return (
          <RecommendedFollow
            setRecommendedFollow={setRecommendedFollow}
            recommendedFollow={recommendedFollow}
          />
        );

      default:
        return <Personalizeprofile />;
    }
  };

  // @Continue button handler
  useEffect(() => {
    if (tab === 0) {
      if (
        profileData.fullName !== "" &&
        profileData.userName !== "" &&
        profileData.dobYear !== "" &&
        profileData.dobMonth !== "" &&
        profileData.dobDate !== "" &&
        profileData.gender !== "" &&
        profileData.dobError === "" &&
        profileData.userNameError === ""
      ) {
        profileChangeHandler("isContinueBtnDisabled", false);
      } else {
        profileChangeHandler("isContinueBtnDisabled", true);
      }
    }
    if (tab === 1) {
      if (profileData.userType !== "") {
        profileChangeHandler("isContinueBtnDisabled", false);
      } else {
        profileChangeHandler("isContinueBtnDisabled", true);
      }
    }
    if (tab === 2) {
      if (
        profileData.filesImg?.length > 0 ||
        profileData.profileAvatars.some((el) => el.isSelected === true)
      ) {
        profileChangeHandler("isContinueBtnDisabled", false);
      } else {
        profileChangeHandler("isContinueBtnDisabled", true);
      }
    }
    if (tab === 3) {
      if (
        profileData.facebook !== "" &&
        profileData.twitter !== "" &&
        profileData.instagram !== "" &&
        profileData.discord !== "" &&
        profileData.youtube !== ""
      ) {
        profileChangeHandler("isContinueBtnDisabled", false);
      } else {
        profileChangeHandler("isContinueBtnDisabled", true);
      }
    }
    if (tab === 4) {
      if (selectedgameData.length > 0) {
        profileChangeHandler("isContinueBtnDisabled", false);
      } else {
        profileChangeHandler("isContinueBtnDisabled", true);
      }
    }
    if (tab === 5) {
      let checkFavTopics = profileData.favTopics?.filter(
        (el) => el.isSelected === true
      );
      if (checkFavTopics.length >= 3) {
        profileChangeHandler("isContinueBtnDisabled", false);
      } else {
        profileChangeHandler("isContinueBtnDisabled", true);
      }
      if (tab === 6) {
        profileChangeHandler("isContinueBtnDisabled", false);
      }
    }
  }, [
    profileData.discord,
    profileData.dobDate,
    profileData.dobError,
    profileData.dobMonth,
    profileData.dobYear,
    profileData.facebook,
    profileData.favTopics,
    profileData.filesImg?.length,
    profileData.fullName,
    profileData.gender,
    profileData.instagram,
    profileData.profileAvatars,
    profileData.twitter,
    profileData.userName,
    profileData.userNameError,
    profileData.userType,
    profileData.youtube,
    selectedgameData.length,
    tab,
  ]);

  return (
    <>
      <div className="flex flex-col h-screen bg-[#0B0C0D] space-y-24">
        {/* Header */}
        <div className="fixed flex flex-row justify-between items-center top-0  px-3 w-full">
          <img
            src="/assets/svg/logoOnboarding.svg"
            className="w-[153.17px] h-[27px] mt-[35px] ml-[64px]"
          />
          <div className="flex flex-row w-[184px] h-[32px] mt-[32px] mr-[64px] justify-between text-[#FAFBFC]">
            <img src="/assets/svg/token.svg" className="w-[32px] h-[32px]" />
            <p className="h-[20px] mt-[6px] text-[14px] font-normal leading-5">
              Tokens Earned:{" "}
              <span className="text-[14px] font-semibold leading-5">{200}</span>
            </p>
          </div>
        </div>

        {renderComponent()}

        {/* Footer */}
        <div className="fixed bottom-0 left-0 flex flex-row items-center justify-center px-10 h-[90px] w-full">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="w-[33.3%]">
              {tab > 0 && (
                <button
                  onClick={() => {
                    profileChangeHandler("isContinueBtnDisabled", false);
                    setTab((prev) => prev - 1);
                  }}
                  className="bg-[#2B2E30] flex justify-start  py-1.5 px-3 rounded-lg text-[#FFFFFF]"
                >
                  Back
                </button>
              )}
            </div>

            <div className="flex w-[33.3%] justify-center flex-row h-[6px]">
              <div
                className={`${
                  tab === 1 ? "bg-[#2E9BFA]" : "bg-[#000000]"
                } w-[31.33px] h-[6px] rounded-[4px]`}
              ></div>
              <div
                className={`${
                  tab === 2 ? "bg-[#2E9BFA]" : "bg-[#000000]"
                } w-[31.33px] h-[6px] rounded-[4px]`}
              ></div>
              <div
                className={`${
                  tab === 3 ? "bg-[#2E9BFA]" : "bg-[#000000]"
                } w-[31.33px] h-[6px] rounded-[4px]`}
              ></div>
              <div
                className={`${
                  tab === 4 ? "bg-[#2E9BFA]" : "bg-[#000000]"
                } w-[31.33px] h-[6px] rounded-[4px]`}
              ></div>
              <div
                className={`${
                  tab === 5 ? "bg-[#2E9BFA]" : "bg-[#000000]"
                } w-[31.33px] h-[6px] rounded-[4px]`}
              ></div>
              <div
                className={`${
                  tab === 6 ? "bg-[#2E9BFA]" : "bg-[#000000]"
                } w-[31.33px] h-[6px] rounded-[4px]`}
              ></div>
              <div
                className={`${
                  tab === 7 ? "bg-[#2E9BFA]" : "bg-[#000000]"
                } w-[31.33px] h-[6px] rounded-[4px]`}
              ></div>
            </div>
            <div className="flex w-[33.3%] justify-end flex-row gap-[20px] items-center">
              {(tab === 3 || tab === 4 || tab === 6) && (
                <button
                  onClick={() => {
                    if (tab === 6) {
                      userSignUp(
                        profileData,
                        monthArray,
                        selectedgameData,
                        recommendedFollow,
                        cookies,
                        toast,
                        navigate
                      );
                    } else {
                      setTab((prev) => prev + 1);
                    }
                  }}
                  className="bg-[#0B0C0D] text-[#2E9BFA] py-1.5 px-3 rounded-lg"
                >
                  Skip
                </button>
              )}
              <button
                disabled={profileData.isContinueBtnDisabled}
                onClick={() => {
                  switch (tab) {
                    case 0:
                      if (!profileData.isContinueBtnDisabled) {
                        setTab((prev) => prev + 1);
                      }
                      break;
                    case 1:
                      if (!profileData.isContinueBtnDisabled) {
                        setTab((prev) => prev + 1);
                      }
                      break;
                    case 2:
                      if (!profileData.isContinueBtnDisabled) {
                        console.log(
                          "profileData.filesImg: ",
                          profileData.filesImg
                        );
                        if (profileData.filesImg !== null) {
                          showCroppedImage(profileData, profileChangeHandler);
                        }
                        setTab((prev) => prev + 1);
                      } else {
                        alert("came");
                      }
                      break;
                    case 3:
                      if (!profileData.isContinueBtnDisabled) {
                        setTab((prev) => prev + 1);
                      }
                      break;
                    case 4:
                      if (!profileData.isContinueBtnDisabled) {
                        setTab((prev) => prev + 1);
                      }
                      break;
                    case 5:
                      if (!profileData.isContinueBtnDisabled) {
                        setTab((prev) => prev + 1);
                      }
                      break;
                    case 6:
                      userSignUp(
                        profileData,
                        monthArray,
                        selectedgameData,
                        recommendedFollow,
                        cookies,
                        toast,
                        navigate
                      );
                      break;
                  }
                }}
                className={`bg-[#2E9BFA] py-1.5 px-3  rounded-lg  text-[#FFFFFF] ${
                  profileData.isContinueBtnDisabled
                    ? "cursor-not-allowed opacity-[60%]"
                    : ""
                }`}
              >
                {tab === 5
                  ? "Select atleast 3 to continue"
                  : tab === 6
                  ? "Finish"
                  : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
