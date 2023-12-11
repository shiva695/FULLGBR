import constants from "../../../constants/cookieConstants";
import {
  apiList,
  invokeApi,
  invokeFormDataApi,
} from "../../../utills/apiService";
import { config } from "../../../utills/configUtils";
import { getCroppedImg } from "../../../utills/helperUtils";

// Checkuser name is already available
export const checkUserName = async (
  profileData,
  profileChangeHandler,
  cookies
) => {
  if (profileData.userName.length > 2) {
    profileChangeHandler("showSpinner", true);
    let params = {
      accountType: "NORMAL",
      userName: profileData.userName,
    };
    const response = await invokeApi(
      config.baseUrl + apiList.checkUsername,
      params,
      cookies
    );
    if (response.customcode === 400) {
      profileChangeHandler("userNameError", "Username already exists...");
      profileChangeHandler("isContinueBtnDisabled", true);
      profileChangeHandler("showSpinner", false);
    } else if (response.customcode === 200) {
      profileChangeHandler("userNameError", "");
      profileChangeHandler("showSpinner", false);
    } else {
      alert("Something went wrong");
      profileChangeHandler("userNameError", "");
      profileChangeHandler("showSpinner", false);
    }
  }
};

// User signUp
export const userSignUp = async (
  profileData,
  monthArray,
  selectedgameData,
  recommendedFollow,
  cookies,
  toast,
  navigate
) => {
  let params = {
    accountType: cookies[constants.ACCTYPECOOKIES],
    userType: profileData.userType,
    userName: profileData.userName,
    name: profileData.fullName,
    email: window.atob(localStorage.getItem("EMAIL")),
    profilePic: profileData.imgLink,
    gender: profileData.gender,
    dob: `${profileData.dobDate}/${
      monthArray.map((el) => el.label).indexOf(profileData.dobMonth) + 1
    }/${profileData.dobYear}`,
    referredBy: profileData.referralId,
    password: window.atob(localStorage.getItem("PASSWORD")),
    socialLinks: {
      facebookLink: profileData.facebook,
      twitterLink: profileData.twitter,
      instagramLink: profileData.instagram,
      discordLink: profileData.discord,
      youtubeLink: profileData.youtube,
    },
    favouriteTopics: profileData.favTopics
      .filter((el) => el.isSelected === true)
      .map((el) => el.tag),
    followings: recommendedFollow
      .filter((el) => el.isSelected === true)
      .map((el) => el._id),
    gamesHistory: [],
  };
  selectedgameData?.map((el) =>
    params.gamesHistory.push({
      gameImage: el.gameLogo,
      title: el.gameName,
      developer: el.developers,
      year: el.year,
    })
  );
  const response = await invokeApi(
    config.baseUrl + apiList.signUp,
    params,
    cookies
  );
  if (response.customcode === 200) {
    toast("Onboarding Successfully Completed");
    navigate("/");
  } else {
    alert("Something went wrong");
  }
};

// Show Cropped image
export const showCroppedImage = async (profileData, profileChangeHandler) => {
  try {
    const croppedImage = await getCroppedImg(
      profileData.filesImg[0].preview,
      profileData.croppedAreaPixels
    );
    const url = croppedImage;
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "File name", { type: "image/png" });
        uploadProfileImg(file, profileChangeHandler);
      });
  } catch (e) {
    console.error(e);
  }
};

// Image upload api
const uploadProfileImg = async (file, profileChangeHandler) => {
  let formData = new FormData();
  formData.append("image", file);

  let response = await invokeFormDataApi(
    config.baseUrl + apiList.singleImage,
    formData
  );
  if (response.customcode === 200) {
    profileChangeHandler("imgLink", response.data.imageUrl);
  } else {
    console.error("Something went wrong");
  }
};
