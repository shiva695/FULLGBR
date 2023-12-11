/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
//import dependencies
import { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

//import components
import Button from "../general/Button";
import PhoneCode from "../general/PhoneCode";
import ToggleButton from "../general/ToggleButton";
import SingleSelect from "../general/SingleSelect";

//import json
import codesArray from "../../json/timezone.json";
import constants from "../../json/constants.json";

// import Utils
import {
  invokeApi,
  invokeFormDataApi,
  apiList,
} from "../../utils/apiServiceUtils";
import { config } from "../../utils/configUtils";
import responseUtils from "../../utils/responseUtils";
import BreadCrumbs from "../general/BreadCrumbs";
import ConformationPopup from "../modals/ConformationPopup";

function Settings() {
  // ********** STATE VARIABLES ***********//

  //Cookies
  const [cookies, setCookie, removeCookie] = useCookies();

  // Site Settings
  const [siteTitle, setSiteTitle] = useState(null);
  const [siteUrl, setSiteUrl] = useState(null);
  const [siteAddress, setSiteAddress] = useState(null);
  const [siteEmail, setSiteEmail] = useState(null);
  const [careerEmail, setCareerEmail] = useState(null);
  const [maxUserLoginCount, setMaxUserLoginCount] = useState(null);
  const [emergencyNumber, setEmergencyNumber] = useState(null);
  const [minAge, setMinAge] = useState(null);
  const [cronTimeZone, setCronTimeZone] = useState(null);
  const [companyLocation, setCompanyLocation] = useState(null);
  const [companyPhone, setCompanyPhone] = useState({
    code: "+91",
    number: "9898878998",
  });
  // site settings - logos variables
  const [darkLogoPreview, setDarkLogoPreview] = useState(null);
  const [lightLogoPreview, setLightLogoPreview] = useState(null);
  const [mobileLogoPreview, setMobileLogoPreview] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(null);
  const [lightLogoImg, setLightLogoImg] = useState(null);
  const [darkLogoImg, setDarkLogoImg] = useState(null);
  const [mobileLogoImg, setMobileLogoImg] = useState(null);
  const [faviconImg, setFaviconImg] = useState(null);
  const inputRefLightLogo = useRef(null);
  const inputRefDarkLogo = useRef(null);
  const inputRefMobile = useRef(null);
  const inputRefFavicon = useRef(null);
  // Table Limit Size
  const [checkboxStatus, setCheckboxStatus] = useState([
    {
      num: 10,
      status: false,
    },
    {
      num: 20,
      status: false,
    },

    {
      num: 30,
      status: false,
    },

    {
      num: 40,
      status: false,
    },
    {
      num: 50,
      status: false,
    },
    {
      num: 100,
      status: false,
    },
    {
      num: 200,
      status: false,
    },
    {
      num: 500,
      status: false,
    },
  ]);
  // Spaces Credentials
  const [spacesCredentials, setSpacesCredentials] = useState(null);
  // FCM Credentials
  const [fcmCredentials, setFcmCredentials] = useState(null);
  // SMS Settings
  const [smsSettings, setSmsSettings] = useState(null);
  // Google Credentials
  const [googleCredentials, setGoogleCredentials] = useState(null);
  // Facebook Credentials
  const [facebookCredentials, setFacebookCredentials] = useState(null);
  // SMTP Settings
  const [smtpSettings, setSmtpSettings] = useState(null);
  // App Version Settings
  const [appVersionSettings, setAppVersionSettings] = useState(null);
  // Redirect URLs
  const [redirectUrls, setRedirectUrls] = useState(null);
  // Social URLs
  const [socialUrls, setSocialUrls] = useState(null);
  // General Settings
  const [generalSettings, setGeneralSettings] = useState(null);
  // Settings Id
  const [settingsId, setSettingsId] = useState(null);
  const [invokeGetSettings, setInvokeGetSettings] = useState(true);

  const [confirmPopup, setConfirmPopup] = useState(false);
  const [darkLogo, setDarkLogo] = useState(null);
  const [lightLogo, setLightLogo] = useState(null);
  const [mobileLogo, setMobileLogo] = useState(null);
  const [faviconLogo, setFaviconLogo] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [phonelistModal, setPhonelistModal] = useState(false);
  const [selectlistModal, setSelectlistModal] = useState(false);

  // Submit handler
  const submitHandler = (status) => {
    setConfirm(status);
  };

  // onClose
  const onClose = () => {
    setConfirmPopup(false);
  };

  // Handle Phone Dropdown

  function fetchPhoneDetails(phoneDetails) {
    let copy = { ...companyPhone };
    copy.code = phoneDetails[0];
    copy.number = phoneDetails[1];
    setCompanyPhone(copy);
  }

  //axios (api integration) for image
  const uploadProfileImg = async (file, type) => {
    console.log("file ", file);
    let formData = new FormData();
    formData.append("image", file);

    let response = await invokeFormDataApi(
      config.baseUrl + apiList.uploadSingleImage,
      formData,
      cookies
    );
    switch (type) {
      case "lightlogo":
        setLightLogoImg(response.data.imageUrl);
        break;
      case "darklogo":
        setDarkLogoImg(response.data.imageUrl);
        break;
      case "favicon":
        setFaviconImg(response.data.imageUrl);
        break;
      case "mobilelogo":
        setMobileLogoImg(response.data.imageUrl);
        break;
    }
  };

  //axios (api integration) for posting editted setting details
  const editSettingsHandler = async () => {
    let params = {
      _id: settingsId,
      data: {
        fcm: fcmCredentials,
        smtp: smtpSettings,
        sms: smsSettings,
        google: googleCredentials,
        facebook: facebookCredentials,
        appVersion: appVersionSettings,
        spaces: spacesCredentials,
        siteTitle: siteTitle,
        siteUrl: siteUrl,
        siteAddress: siteAddress,
        siteEmail: siteEmail,
        // siteStatus: siteS,
        siteCareerEmail: careerEmail,
        lat: companyLocation?.lat,
        lng: companyLocation?.long,
        phoneCode: companyPhone?.code ?? "+91",
        phoneNumber: companyPhone?.number ?? "8787665565",
        lightLogo: lightLogoImg ?? lightLogo,
        darkLogo: darkLogoImg ?? darkLogo,
        favicon: faviconImg ?? faviconLogo,
        mobileLogo: mobileLogoImg ?? mobileLogo,
        emergencyNumber: emergencyNumber,
        maxUserLoginCount: maxUserLoginCount,
        joiningTokenBonus: generalSettings?.joiningTokenBonus,
        referrelTokenBonus: generalSettings?.referrelTokenBonus,
        dailyTokenBonus: generalSettings?.dailyTokenBonus,
        returnClaimTokenBonus: generalSettings?.returnClaimTokenBonus,
        dayToClaim: generalSettings?.dayToClaim,
        tableLimitSize: checkboxStatus,
        userMinAge: minAge,
        cronTimeZone: cronTimeZone,
        redirectUrls: redirectUrls,
        socailUrls: socialUrls,
      },
    };
    let response = await invokeApi(
      config.baseUrl + apiList.editGeneralSettings,
      params,
      cookies
    );
    responseUtils.showToster(response);
    if (response.customcode === 200) {
      setCookie(constants.SETTINGSDATA, JSON.stringify(response.data), {
        path: "/",
        maxAge: 3000000,
        sameSite: "strict",
      });
      setConfirm(false);
      onClose();
    } else {
      setConfirm(false);
      toast.error(response);
    }
  };
  useEffect(() => {
    if (confirm) {
      editSettingsHandler();
    }
  }, [confirm, editSettingsHandler]);

  // Image upload
  const handleFileUpload = (ev, type) => {
    const fileUploaded = ev.target.files[0];
    let acceptProfileFileTypes = fileUploaded.type.match(
      /^image\/(jpe?g|png|gif)/
    );
    if (fileUploaded && acceptProfileFileTypes) {
      if (fileUploaded.size < 5242880) {
        switch (type) {
          case "lightlogo":
            setLightLogoPreview(window.URL.createObjectURL(fileUploaded));
            break;
          case "darklogo":
            setDarkLogoPreview(window.URL.createObjectURL(fileUploaded));
            break;
          case "favicon":
            setFaviconPreview(window.URL.createObjectURL(fileUploaded));
            break;
          case "mobilelogo":
            setMobileLogoPreview(window.URL.createObjectURL(fileUploaded));
            break;
        }
      }
      uploadProfileImg(fileUploaded, type);
    }
  };

  useEffect(() => {
    const getSettingsHandler = async () => {
      let response = await invokeApi(
        config.baseUrl + apiList.getGeneralSettings,
        {},
        cookies
      );
      if (response.customcode === 201) removeCookie(constants.ADMINDATA);
      if (response.customcode === 200) {
        // Images
        setDarkLogo(response.data?.darkLogo);
        setLightLogo(response.data?.lightLogo);
        setMobileLogo(response.data?.mobileLogo);
        setFaviconLogo(response.data?.favicon);
        //Social URLs
        setSocialUrls({
          googleUrl: response.data?.socailUrls.googleUrl,
          instagramUrl: response.data?.socailUrls.instagramUrl,
          discordUrl: response.data?.socailUrls.discordUrl,
          linkedinUrl: response.data?.socailUrls.linkedinUrl,
          youtubeUrl: response.data?.socailUrls.youtubeUrl,
          twitterUrl: response.data?.socailUrls.twitterUrl,
        });
        //Space Credentials
        setSpacesCredentials({
          spacesKey: response.data?.spaces.spacesKey,
          spacesSecret: response.data?.spaces.spacesSecret,
          spacesEndpoint: response.data?.spaces.spacesEndpoint,
          spacesBucketName: response.data?.spaces.spacesBucketName,
          spacesBaseUrl: response.data?.spaces.spacesBaseUrl,
          spacesObjectName: response.data?.spaces.spacesObjectName,
        });
        //FCM Data
        setFcmCredentials({
          androidUser: response.data?.fcm.androidUser,
          iosUser: response.data?.fcm.iosUser,
          desktopUser: response.data?.fcm.desktopUser,
        });
        //SMS settings
        setSmsSettings({
          SSID: response.data?.sms.SSID,
          authToken: response.data?.sms.authToken,
        });
        //Google credentials
        setGoogleCredentials({
          appId: response.data?.google.appId,
          appSecret: response.data?.google.appSecret,
        });
        //Facebook credentials
        setFacebookCredentials({
          appId: response.data?.facebook.appId,
        });
        //SMTP settings
        setSmtpSettings({
          user: response.data?.smtp.user,
          password: response.data?.smtp.password,
          host: response.data?.smtp.host,
          port: response.data?.smtp.port,
          isSecure: response.data?.smtp.isSecure,
          isRejectUnauthorized: response.data?.smtp.isRejectUnauthorized,
        });
        //App Version settings
        setAppVersionSettings({
          androidVersion: response.data?.appVersion.androidVersion,
          iosVersion: response.data?.appVersion.iosVersion,
          iosStatus: response.data?.appVersion.iosStatus,
          androidStatus: response.data?.appVersion.androidStatus,
        });
        //Redurect Urls
        setRedirectUrls({
          userPlayStore: response.data?.redirectUrls.userPlayStore,
          userAppStore: response.data?.redirectUrls.userAppStore,
          userWebStore: response.data?.redirectUrls.userWebStore,
          userAppleId: response.data?.redirectUrls.userAppleId,
          faqUrl: response.data?.redirectUrls.faqUrl,
          termsAndConditionUrl:
            response.data?.redirectUrls.termsAndConditionUrl,
          privacyUrl: response.data?.redirectUrls.privacyUrl,
          aboutUrl: response.data?.redirectUrls.aboutUrl,
        });
        //General settings
        setGeneralSettings({
          maxUserLoginCount: 4,
          joiningTokenBonus: response.data?.joiningTokenBonus,
          referrelTokenBonus: response.data?.referrelTokenBonus,
          dailyTokenBonus: response.data?.dailyTokenBonus,
          returnClaimTokenBonus: response.data?.returnClaimTokenBonus,
          dayToClaim: response.data?.dayToClaim,
        });
        // Settings ID
        setSettingsId(response.data?._id);
        // Site Settings
        setSiteTitle(response.data?.siteTitle);
        setSiteUrl(response.data?.siteUrl);
        setSiteAddress(response.data?.siteAddress);
        setSiteEmail(response.data?.siteEmail);
        setCareerEmail(response.data?.siteCareerEmail);
        setMaxUserLoginCount(response.data?.maxUserLoginCount);
        setEmergencyNumber(response.data?.emergencyNumber);
        setMinAge(response.data?.userMinAge);
        setCronTimeZone(response?.data?.cronTimeZone);
        setCompanyLocation({
          lat: response.data?.companyLocation.lat,
          long: response.data?.companyLocation.lng,
        });
        setCompanyPhone(response.data?.companyPhone);
        setCheckboxStatus(response.data.tableLimitSize);
        setCookie(constants.SETTINGSDATA, JSON.stringify(response.data), {
          path: "/",
          maxAge: 3000000,
          sameSite: "strict",
        });
      }
    };

    if (invokeGetSettings) {
      setInvokeGetSettings(false);
      getSettingsHandler();
    }
  }, [cookies, invokeGetSettings, removeCookie, setCookie]);

  return (
    <>
      <div
        className="card-without-subheading"
        onClick={() => {
          setPhonelistModal(false);
          setSelectlistModal(false);
        }}
      >
        <div className="flex flex-row items-center justify-between border-b border-gray-300 p-5">
          <BreadCrumbs nav1={"Settings"} />
          {/* Submit Button */}
          <div
            className="w-[150px]"
            onClick={() => {
              // editSettingsHandler();
            }}
          >
            <div onClick={() => setConfirmPopup(true)}>
              <Button text={constants.SUBMIT} />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 h-[515px] overflow-y-scroll dark:text-white">
          {/*  Site Settings start */}
          <div className="flex flex-col w-11/12 gap-y-10 border-[1px] border-gray-300 shadow-md rounded-xl p-5 py-10">
            <div className="font-bold w-full text-xl border-b border-gray-300 pb-5">
              Site Settings
            </div>

            <div className="flex flex-wrap gap-y-10">
              {/* Site Title */}
              <div className="input-main-div">
                <div>{constants.SITETITLE}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={siteTitle ?? ""}
                    onChange={(e) => {
                      setSiteTitle(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/* Site Url */}
              <div className="input-main-div">
                <div>{constants.SITEURL}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={siteUrl}
                    onChange={(e) => {
                      setSiteUrl(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/* site Email */}
              <div className="input-main-div">
                <div>{constants.SITEEMAIL}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="email"
                    value={siteEmail}
                    onChange={(e) => {
                      setSiteEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/* Career Email */}
              <div className="input-main-div">
                <div>{constants.SITECAREEREMAIL}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="email"
                    value={careerEmail}
                    onChange={(e) => {
                      setCareerEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/* Phone */}
              <div className="input-main-div">
                <div>{constants.COMPANYPHONE}:</div>
                <div>
                  <PhoneCode
                    defaultValue={
                      companyPhone !== null
                        ? [companyPhone?.code, companyPhone?.number]
                        : ["+91", ""]
                    }
                    fetchPhoneDetails={fetchPhoneDetails}
                    phonelistModal={phonelistModal}
                    setPhonelistModal={setPhonelistModal}
                  />
                </div>
              </div>
              {/* Company Location */}
              <div className="input-main-div">
                <div>{constants.LATITUDE}:</div>

                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={companyLocation?.lat}
                    onChange={(e) => {
                      let copy = { ...companyLocation };
                      copy.lat = e.target.value;
                      setCompanyLocation(copy);
                    }}
                  />
                </div>
              </div>
              <div className="input-main-div">
                <div>{constants.LONGITUDE}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={companyLocation?.long}
                    onChange={(e) => {
                      let copy = { ...companyLocation };
                      copy.long = e.target.value;
                      setCompanyLocation(copy);
                    }}
                  />
                </div>
              </div>
              {/* Emergency number */}
              <div className="input-main-div">
                <div>{constants.EMERGENCYNUMBER}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={emergencyNumber}
                    onChange={(e) => {
                      setEmergencyNumber(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/* Cron Timezone */}
              <div className="input-main-div">
                <SingleSelect
                  title={"Cron Time Zone:"}
                  dataArray={codesArray}
                  defaultValue={cronTimeZone}
                  fetchInputValue={(val) => {
                    setCronTimeZone(val);
                  }}
                  showSearch={true}
                  selectlistModal={selectlistModal}
                  setSelectlistModal={setSelectlistModal}
                  height="60"
                  // width="100%"
                />
              </div>
              {/* Site address */}
              <div className="input-main-div">
                <div>{constants.SITEADDRESS}:</div>
                <div className="input-wrapping-div">
                  <textarea
                    className="form-input-text"
                    value={siteAddress}
                    onChange={(e) => {
                      setSiteAddress(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            {/* general settings- images */}
            <div className="flex flex-wrap">
              <div className="input-main-img-div">
                <div>{constants.LIGHTLOGO}:</div>
                <div className="input-wrapping-div">
                  <div className="mb-10 flex flex-col items-end">
                    <input
                      type="file"
                      className="hidden"
                      ref={inputRefLightLogo}
                      onChange={(e) => handleFileUpload(e, "lightlogo")}
                    />
                    <div>
                      <img
                        id="lightlogo"
                        className="h-[150px] w-[150px] rounded-full"
                        src={
                          lightLogo !== null
                            ? lightLogo
                            : lightLogoPreview
                            ? lightLogoPreview
                            : "assets/png/profilePic.png"
                        }
                      />
                    </div>
                    <FiEdit
                      onClick={() => inputRefLightLogo.current.click()}
                      className="text-xl text-[#121212] content-end"
                    />
                  </div>
                </div>
              </div>
              <div className="input-main-img-div">
                <div>{constants.DARKLOGO}:</div>
                <div className="input-wrapping-div">
                  <div className="mb-10 flex flex-col items-end">
                    <input
                      type="file"
                      className="hidden"
                      ref={inputRefDarkLogo}
                      onChange={(e) => handleFileUpload(e, "darklogo")}
                    />
                    <div>
                      <img
                        id="darklogo"
                        className="h-[150px] w-[150px] rounded-full"
                        src={
                          darkLogo !== null
                            ? darkLogo
                            : darkLogoPreview
                            ? darkLogoPreview
                            : "assets/png/profilePic.png"
                        }
                      />
                    </div>
                    <FiEdit
                      // eslint-disable-next-line no-undef
                      onClick={() => inputRefDarkLogo.current.click()}
                      className="text-xl text-[#121212] content-end"
                    />
                  </div>
                </div>
              </div>
              <div className="input-main-img-div">
                <div>{constants.MOBILELOGO}:</div>
                <div className="input-wrapping-div">
                  <div className="mb-10 flex flex-col items-end">
                    <input
                      type="file"
                      className="hidden"
                      ref={inputRefMobile}
                      onChange={(e) => handleFileUpload(e, "mobilelogo")}
                    />
                    <div>
                      <img
                        className="h-[150px] w-[150px] rounded-full"
                        src={
                          mobileLogo !== null
                            ? mobileLogo
                            : mobileLogoPreview
                            ? mobileLogoPreview
                            : "assets/png/profilePic.png"
                        }
                      />
                    </div>
                    <FiEdit
                      // eslint-disable-next-line no-undef
                      onClick={() => inputRefMobile.current.click()}
                      className="text-xl text-[#121212] content-end"
                    />
                  </div>
                </div>
              </div>
              <div className="input-main-img-div">
                <div>{constants.FAVICON}:</div>
                <div className="input-wrapping-div">
                  <div className="mb-10 flex flex-col items-end">
                    <input
                      type="file"
                      className="hidden"
                      ref={inputRefFavicon}
                      onChange={(e) => handleFileUpload(e, "favicon")}
                    />
                    <div>
                      <img
                        className="h-[150px] w-[150px] rounded-full"
                        src={
                          faviconLogo !== null
                            ? faviconLogo
                            : faviconPreview
                            ? faviconPreview
                            : "assets/png/profilePic.png"
                        }
                      />
                    </div>
                    <FiEdit
                      // eslint-disable-next-line no-undef
                      onClick={() => inputRefFavicon.current.click()}
                      className="text-xl text-[#121212] content-end"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* General Settings */}
          <div className="flex flex-col w-11/12 gap-y-10 border-[1px] border-gray-300 shadow-md rounded-xl p-5 py-10">
            <div className="font-bold w-full text-xl border-b border-gray-300 pb-5">
              General Settings
            </div>
            <div className="flex flex-wrap gap-y-10">
              {/* User minimum age */}
              <div className="input-main-div">
                <div>{constants.USERMINAGE}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="number"
                    value={minAge}
                    onChange={(e) => {
                      setMinAge(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/* Maximum user login */}
              <div className="input-main-div">
                <div>{constants.MAXUSERLOGIN}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="number"
                    placeholder="Maximum user login count"
                    value={maxUserLoginCount}
                    onChange={(e) => {
                      setMaxUserLoginCount(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/* Joining Token */}
              <div className="input-main-div">
                <div>{constants.JOININGTOKEN}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={generalSettings?.joiningTokenBonus}
                    onChange={(e) => {
                      let copy = { ...generalSettings };
                      copy.joiningTokenBonus = e.target.value;

                      setGeneralSettings(copy);
                    }}
                  />
                </div>
              </div>
              {/* Referrel Token */}
              <div className="input-main-div">
                <div>{constants.REFERRALTOKEN}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={generalSettings?.referrelTokenBonus}
                    onChange={(e) => {
                      let copy = { ...generalSettings };
                      copy.referrelTokenBonus = e.target.value;

                      setGeneralSettings(copy);
                    }}
                  />
                </div>
              </div>
              {/* Daily Token */}
              <div className="input-main-div">
                <div>{constants.DAILYTOKEN}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={generalSettings?.dailyTokenBonus}
                    onChange={(e) => {
                      let copy = { ...generalSettings };
                      copy.dailyTokenBonus = e.target.value;

                      setGeneralSettings(copy);
                    }}
                  />
                </div>
              </div>
              {/* Return Token */}
              <div className="input-main-div">
                <div>{constants.RETURNTOKEN}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={generalSettings?.returnClaimTokenBonus}
                    onChange={(e) => {
                      let copy = { ...generalSettings };
                      copy.returnClaimTokenBonus = e.target.value;

                      setGeneralSettings(copy);
                    }}
                  />
                </div>
              </div>
              <div className="input-main-div">
                <div>{constants.DAYTOCLAIM}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={generalSettings?.dayToClaim}
                    onChange={(e) => {
                      let copy = { ...generalSettings };
                      copy.dayToClaim = e.target.value;

                      setGeneralSettings(copy);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Table Limit */}
          <div className="flex flex-col w-11/12 gap-y-10 border-[1px] border-gray-300 shadow-md rounded-xl p-5 py-10">
            <div className="font-bold w-full text-xl border-b border-gray-300 pb-5">
              {constants.TABLELIMIT}
            </div>
            <div className="flex gap-5">
              {checkboxStatus.map((el, idx) => (
                <div
                  key={idx}
                  className={
                    el.status
                      ? "table-limit-div bg-zinc-400 dark:bg-zinc-500"
                      : "table-limit-div"
                  }
                  onClick={() => {
                    let copy = [...checkboxStatus];
                    copy[idx].status = !copy[idx].status;
                    setCheckboxStatus(copy);
                  }}
                >
                  {el.num}
                </div>
              ))}
            </div>
          </div>
          {/* Space Credentials */}
          <div className="flex flex-col w-11/12 gap-y-10 border-[1px] border-gray-300 shadow-md rounded-xl p-5 py-10">
            <div className="font-bold w-full text-xl border-b border-gray-300 pb-5">
              {constants.SPACESCREDENTIALS}
            </div>
            <div className="flex flex-wrap gap-y-10 justify-center items-center">
              {/* Spaces Key */}
              <div className="input-main-div">
                <div>{constants.SPACESKEY}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={spacesCredentials?.spacesKey}
                    onChange={(e) => {
                      let copy = { ...spacesCredentials };
                      copy.spacesKey = e.target.value;

                      setSpacesCredentials(copy);
                    }}
                  />
                </div>
              </div>
              {/* Spaces Secret */}
              <div className="input-main-div">
                <div>{constants.SPACESSECRET}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={spacesCredentials?.spacesSecret}
                    onChange={(e) => {
                      let copy = { ...spacesCredentials };
                      copy.spacesSecret = e.target.value;
                      setSpacesCredentials(copy);
                    }}
                  />
                </div>
              </div>
              {/* Spaces Endpoint */}
              <div className="input-main-div">
                <div>{constants.SPACESENDPOINT}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={spacesCredentials?.spacesEndpoint}
                    onChange={(e) => {
                      let copy = { ...spacesCredentials };
                      copy.spacesEndpoint = e.target.value;
                      setSpacesCredentials(copy);
                    }}
                  />
                </div>
              </div>
              {/* Spaces Bucket Name */}
              <div className="input-main-div">
                <div>{constants.SPACESBUCKETNAME}</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={spacesCredentials?.spacesBucketName}
                    onChange={(e) => {
                      let copy = { ...spacesCredentials };
                      copy.spacesBucketName = e.target.value;
                      setSpacesCredentials(copy);
                    }}
                  />
                </div>
              </div>
              {/* Spaces Base URL */}
              <div className="input-main-div">
                <div>{constants.SPACESBASEURL}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={spacesCredentials?.spacesBaseUrl}
                    onChange={(e) => {
                      let copy = { ...spacesCredentials };
                      copy.spacesBaseUrl = e.target.value;
                      setSpacesCredentials(copy);
                    }}
                  />
                </div>
              </div>
              {/* Spaces Object Name */}
              <div className="input-main-div">
                <div>{constants.SPACESOBJECTNAME}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={spacesCredentials?.spacesObjectName}
                    onChange={(e) => {
                      let copy = { ...spacesCredentials };
                      copy.spacesObjectName = e.target.value;
                      setSpacesCredentials(copy);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/*  FCM Data start */}
          <div className="flex flex-col w-11/12 gap-y-10 border-[1px] border-gray-300 shadow-md rounded-xl p-5 py-10">
            <div className="font-bold w-full text-xl border-b border-gray-300 pb-5">
              {constants.FCMCREDENTIALS}
            </div>
            <div className="flex flex-wrap gap-y-10">
              {/* Android User */}
              <div className="input-main-div">
                <div>{constants.ANDROIDUSER}</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={fcmCredentials?.androidUser}
                    onChange={(e) => {
                      let copy = { ...fcmCredentials };
                      copy.androidUser = e.target.value;

                      setFcmCredentials(copy);
                    }}
                  />
                </div>
              </div>
              {/* IOS User */}
              <div className="input-main-div">
                <div>{constants.IOSUSER}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={fcmCredentials?.iosUser}
                    onChange={(e) => {
                      let copy = { ...fcmCredentials };
                      copy.iosUser = e.target.value;

                      setFcmCredentials(copy);
                    }}
                  />
                </div>
              </div>
              {/* Desktop User */}
              <div className="input-main-div">
                <div>{constants.DESKTOPUSER}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={fcmCredentials?.desktopUser}
                    onChange={(e) => {
                      let copy = { ...fcmCredentials };
                      copy.desktopUser = e.target.value;

                      setFcmCredentials(copy);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* SMS Setting */}
          <div className="flex flex-col w-11/12 gap-y-10 border-[1px] border-gray-300 shadow-md rounded-xl p-5 py-10">
            <div className="font-bold w-full text-xl border-b border-gray-300 pb-5">
              {constants.SMSSETTINGS}
            </div>
            <div className="flex flex-wrap gap-y-10">
              <div className="input-main-div">
                <div>{constants.SSID}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={smsSettings?.SSID}
                    onChange={(e) => {
                      let copy = { ...smsSettings };
                      copy.SSID = e.target.value;

                      setSmsSettings(copy);
                    }}
                  />
                </div>
              </div>
              <div className="input-main-div">
                <div>{constants.AUTHTOKEN}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={smsSettings?.authToken}
                    onChange={(e) => {
                      let copy = { ...smsSettings };
                      copy.authToken = e.target.value;

                      setSmsSettings(copy);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* SMTP/ Mail Setting */}
          <div className="flex flex-col w-11/12 gap-y-10 border-[1px] border-gray-300 shadow-md rounded-xl p-5 py-10">
            <div className="font-bold w-full text-xl border-b border-gray-300 pb-5">
              {constants.SMTPSETTINGS}
            </div>
            <div className="flex flex-wrap gap-y-10">
              <div className="input-main-div">
                <div>{constants.SMTPUSER}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={smtpSettings?.user}
                    onChange={(e) => {
                      let copy = { ...smtpSettings };
                      copy.user = e.target.value;
                      setSmtpSettings(copy);
                    }}
                  />
                </div>
              </div>
              <div className="input-main-div">
                <div>{constants.SMTPPASSWORD}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={smtpSettings?.password}
                    onChange={(e) => {
                      let copy = { ...smtpSettings };
                      copy.password = e.target.value;
                      setSmtpSettings(copy);
                    }}
                  />
                </div>
              </div>
              <div className="input-main-div">
                <div>{constants.SMTPHOST}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={smtpSettings?.host}
                    onChange={(e) => {
                      let copy = { ...smtpSettings };
                      copy.host = e.target.value;
                      setSmtpSettings(copy);
                    }}
                  />
                </div>
              </div>
              <div className="input-main-div">
                <div>{constants.SMTPPORT}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="number"
                    value={smtpSettings?.port}
                    onChange={(e) => {
                      let copy = { ...smtpSettings };
                      copy.port = e.target.value;
                      setSmtpSettings(copy);
                    }}
                  />
                </div>
              </div>
              <div className="input-main-toggle-div">
                <div>{constants.SMTPISSECURE}:</div>

                <ToggleButton
                  status={smtpSettings?.isSecure}
                  fetchStatus={(status) => {
                    let copy = { ...smtpSettings };
                    copy.isSecure = status;
                    // setSmtpSettings(copy);
                  }}
                />
              </div>
              <div className="input-main-toggle-div">
                <div>{constants.SMTPISREJECTUNAUTHORIZED}:</div>
                <ToggleButton status={smtpSettings?.isRejectUnauthorized} />
              </div>
            </div>
          </div>
          {/* App Version settings*/}
          <div className="flex flex-col w-11/12 gap-y-10 border-[1px] border-gray-300 shadow-md rounded-xl p-5 py-10">
            <div className="font-bold w-full text-xl border-b border-gray-300 pb-5">
              {constants.APPVERSIONSETTINGS}
            </div>
            <div className="flex flex-wrap gap-y-10">
              <div className="input-main-div">
                <div>{constants.ANDROIDVERSION}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={appVersionSettings?.androidVersion}
                    onChange={(e) => {
                      let copy = { ...appVersionSettings };
                      copy.androidVersion = e.target.value;
                      setAppVersionSettings(copy);
                    }}
                  />
                </div>
              </div>
              <div className="input-main-div">
                <div>{constants.IOSVERSION}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={appVersionSettings?.iosVersion}
                    onChange={(e) => {
                      let copy = { ...appVersionSettings };
                      copy.iosVersion = e.target.value;
                      setAppVersionSettings(copy);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5 mx-10">
                <div>{constants.ANDROIDSTATUS}:</div>
                <div className="">
                  {/* <input
                  className="form-input-text"
                  type="text"
                  value={androidStatus}
                /> */}

                  <ToggleButton status={appVersionSettings?.androidStatus} />
                </div>
              </div>

              <div className=" flex flex-col gap-5 mx-10">
                <div>{constants.IOSSTATUS}:</div>
                <div className="">
                  {/* <input
                  className="form-input-text"
                  type="text"
                  value={iosStatus}
                /> */}
                  <ToggleButton status={appVersionSettings?.iosStatus} />
                </div>
              </div>
            </div>
          </div>
          {/* Redirect Url */}
          <div className="flex flex-col w-11/12 gap-y-10 border-[1px] border-gray-300 shadow-md rounded-xl p-5 py-10">
            <div className="font-bold w-full text-xl border-b border-gray-300 pb-5">
              {constants.REDIRECTURL}
            </div>

            <div className="flex flex-wrap gap-y-10">
              <div className="input-main-div">
                <div>{constants.USERAPPSTORE}</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={redirectUrls?.userAppStore}
                    onChange={(e) => {
                      let copy = { ...redirectUrls };
                      copy.userAppStore = e.target.value;

                      setRedirectUrls(copy);
                    }}
                  />
                </div>
              </div>
              <div className="input-main-div">
                <div>{constants.USERPLAYSTORE}</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={redirectUrls?.userPlayStore}
                    onChange={(e) => {
                      let copy = { ...redirectUrls };
                      copy.userPlayStore = e.target.value;

                      setRedirectUrls(copy);
                    }}
                  />
                </div>
              </div>
              <div className="input-main-div">
                <div>{constants.USERWEBSTORE}</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={redirectUrls?.userWebStore}
                    onChange={(e) => {
                      let copy = { ...redirectUrls };
                      copy.userWebStore = e.target.value;

                      setRedirectUrls(copy);
                    }}
                  />
                </div>
              </div>
              <div className="input-main-div">
                <div>{constants.USERAPPLEID}</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={redirectUrls?.userAppleId}
                    onChange={(e) => {
                      let copy = { ...redirectUrls };
                      copy.userAppleId = e.target.value;

                      setRedirectUrls(copy);
                    }}
                  />
                </div>
              </div>
              <div className="input-main-div">
                <div>{constants.FAQURL}</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={redirectUrls?.faqUrl}
                    onChange={(e) => {
                      let copy = { ...redirectUrls };
                      copy.faqUrl = e.target.value;

                      setRedirectUrls(copy);
                    }}
                  />
                </div>
              </div>
              <div className="input-main-div">
                <div>T{constants.TERMSANDCONDITIONURL}</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={redirectUrls?.termsAndConditionUrl}
                    onChange={(e) => {
                      let copy = { ...redirectUrls };
                      copy.termsAndConditionUrl = e.target.value;

                      setRedirectUrls(copy);
                    }}
                  />
                </div>
              </div>
              <div className="input-main-div">
                <div>{constants.PRIVACYURL}</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={redirectUrls?.privacyUrl}
                    onChange={(e) => {
                      let copy = { ...redirectUrls };
                      copy.privacyUrl = e.target.value;

                      setRedirectUrls(copy);
                    }}
                  />
                </div>
              </div>
              <div className="input-main-div">
                <div>{constants.ABOUTURL}</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={redirectUrls?.aboutUrl}
                    onChange={(e) => {
                      let copy = { ...redirectUrls };
                      copy.aboutUrl = e.target.value;

                      setRedirectUrls(copy);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Social Login Credentials */}
          <div className="flex flex-col w-11/12 gap-y-10 border-[1px] border-gray-300 shadow-md rounded-xl p-5 py-10">
            <div className="font-bold w-full text-xl border-b border-gray-300 pb-5">
              {constants.SOCIALLOGINCREDENTIALS}
            </div>
            <div className="flex w-full">
              {/* Google */}
              <div className="flex flex-col gap-y-5 w-1/2 border-r border-gray-500">
                <div>
                  <div className="font-semibold w-full text-lg pb-5">
                    {constants.GOOGLE}
                  </div>
                </div>

                <div className="flex flex-col w-full gap-2">
                  <div>{constants.GOOGLEAPPID}:</div>
                  <div className="input-wrapping-div">
                    <input
                      className="form-input-text"
                      type="text"
                      value={googleCredentials?.appId}
                      onChange={(e) => {
                        let copy = { ...googleCredentials };
                        copy.appId = e.target.value;

                        setGoogleCredentials(copy);
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <div>{constants.GOOGLEAPPSECRET}:</div>
                  <div className="input-wrapping-div">
                    <input
                      className="form-input-text"
                      type="text"
                      value={googleCredentials?.appSecret}
                      onChange={(e) => {
                        let copy = { ...googleCredentials };
                        copy.appSecret = e.target.value;

                        setGoogleCredentials(copy);
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Facebook */}
              <div className="flex flex-col gap-y-5 w-1/2 ms-5">
                <div>
                  <div className="font-semibold w-full text-lg pb-5">
                    {constants.FACEBOOK}
                  </div>
                </div>

                <div className="flex flex-col w-full gap-2">
                  <div>{constants.FACEBOOKAPPID}</div>
                  <div className="input-wrapping-div">
                    <input
                      className="form-input-text"
                      type="text"
                      value={facebookCredentials?.appId}
                      onChange={(e) => {
                        let copy = { ...facebookCredentials };
                        copy.appId = e.target.value;

                        setFacebookCredentials(copy);
                      }}
                    />
                  </div>
                </div>

                {/* <div className="flex flex-col w-2/3 gap-2">
                <div>App Secret: </div>
                <div className="input-wrapping-div">
                  <input className="form-input-text" type="text" />
                </div>
              </div> */}
              </div>
            </div>
          </div>
          {/* Social URLs */}
          <div className="flex flex-col w-11/12 gap-y-10 border-[1px] border-gray-300 shadow-md rounded-xl p-5 py-10">
            <div className="font-bold w-full text-xl border-b border-gray-300 pb-5">
              {constants.SOCIALURLS}
            </div>
            <div className="flex flex-wrap gap-y-10">
              <div className="input-main-div">
                <div>{constants.GOOGLEURL}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={socialUrls?.googleUrl}
                    onChange={(e) => {
                      let copy = { ...socialUrls };
                      copy.googleUrl = e.target.value;

                      setSocialUrls(copy);
                    }}
                  />
                </div>
              </div>
              <div className="input-main-div">
                <div>{constants.INSTAGRAMURL}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={socialUrls?.instagramUrl}
                    onChange={(e) => {
                      let copy = { ...socialUrls };
                      copy.instagramUrl = e.target.value;

                      setSocialUrls(copy);
                    }}
                  />
                </div>
              </div>
              <div className="input-main-div">
                <div>{constants.DISCORDURL}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={socialUrls?.discordUrl}
                    onChange={(e) => {
                      let copy = { ...socialUrls };
                      copy.discordUrl = e.target.value;

                      setSocialUrls(copy);
                    }}
                  />
                </div>
              </div>
              <div className="input-main-div">
                <div>{constants.YOUTUBEURL}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={socialUrls?.youtubeUrl}
                    onChange={(e) => {
                      let copy = { ...socialUrls };
                      copy.youtubeUrl = e.target.value;

                      setSocialUrls(copy);
                    }}
                  />
                </div>
              </div>
              <div className="input-main-div">
                <div>{constants.LINKEDINURL}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={socialUrls?.linkedinUrl}
                    onChange={(e) => {
                      let copy = { ...socialUrls };
                      copy.linkedinUrl = e.target.value;

                      setSocialUrls(copy);
                    }}
                  />
                </div>
              </div>
              <div className="input-main-div">
                <div>{constants.TWITTERURL}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text"
                    type="text"
                    value={socialUrls?.twitterUrl}
                    onChange={(e) => {
                      let copy = { ...socialUrls };
                      copy.twitterUrl = e.target.value;

                      setSocialUrls(copy);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <ConformationPopup
        open={confirmPopup}
        close={onClose}
        text={"Are you sure want to submit?"}
        heading={"Form Submit"}
        submitHandler={submitHandler}
      />
    </>
  );
}

export default Settings;
