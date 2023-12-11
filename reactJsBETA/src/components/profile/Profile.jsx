/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */
// @import dependencies
import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// @import Components
import CommonModal1 from "../generalComponents/CommonModel1";
import CommonBtn3 from "../generalComponents/CommonBtn3";

// @import files
import UploadProfilePhoto from "./modals/UploadProfilePhoto";
import constants from "../../json/constants.json";
import BlockConfirmation from "./modals/BlockConfirmation";
import ShowReportUser from "./modals/ShowReportUser";
import ShowConfirmation from "./modals/ShowConfirmation";
import ShowPretend from "./modals/ShowPretend";
import ShoePretendSearch from "./modals/ShoePretendSearch";

export default function Profile() {
  const navigate = useNavigate();
  const [cookies] = useCookies();

  const [tab, setTab] = useState(1);
  const [openMenu, setOpenMenu] = useState(false);
  const [openUploadProfile, setOpenUploadProfile] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showBlockConfirmation, setShowBlockConfirmation] = useState(false);
  const [showReportUser, setShowReportUser] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPretend, setShowPretend] = useState(false);
  const [showPretendSearch, setShowPretendSearch] = useState(false);

  const [profileValue, setProfilevalue] = useState(
    cookies[constants.COOKIES.PROFILEVALUE]
      ? cookies[constants.COOKIES.PROFILEVALUE]
      : 0
  ); // For demo purpose

  const handleSetProfileImage = (image) => {
    setProfileImage(image);
  };
  const imgArray = [
    "/assets/png/Rectangle 17802.png",
    "/assets/png/Rectangle 17794.png",
    "/assets/png/Rectangle 17795.png",
    "/assets/png/Rectangle 17797.png",
    "/assets/png/Rectangle 17796.png",
    "/assets/png/Rectangle 17798.png",
    "/assets/png/Rectangle 17800.png",
    "/assets/png/Rectangle 17801.png",
    "/assets/png/Rectangle 17799.png",
  ];
  const handleTab1 = () => {
    setTab(1);
  };
  const handleTab2 = () => {
    setTab(2);
  };
  const handleShare = () => {
    navigate("/reportuser");
  };
  const handleFollowers = () => {
    navigate("/followers");
  };
  return (
    <>
      <div
        onClick={() => {
          if (openMenu) setOpenMenu(false);
        }}
        className="justify-center items-center flex flex-col"
      >
        <div className="w-[1000px] overflow-y-auto">
          <div className="w-[999px] h-[223px] rounded-t-[16px] mt-[92px]">
            <div className="group relative flex justify-center ">
              <img src="/assets/png/Rectangle 1907.png" className="" />
              {profileValue === 0 && (
                <div className="hidden group-hover:flex absolute w-[190px] h-[32px] bottom-4 right-4 rounded-full backdrop-blur-3xl bg-[#2525254D] text-[#FAFBFC]  items-center p-3 text-sm space-x-2 cursor-pointer">
                  <img src="/assets/svg/camera1.svg" />
                  <p>Change Cover Photo</p>
                </div>
              )}
            </div>
          </div>
          <div className="rounded-b-[16px] profile-shadow mb-[16px]">
            <div className="bg-[#141517] w-[999px] rounded-b-[16px] border-[1px] border-[#4D4E504D] flex flex-col">
              <div className="flex flex-row mb-[32px] justify-between px-[20px]">
                <div className="flex">
                  <div className="group w-[104px] h-[104px] ml-[20px] mt-[40px]  relative">
                    {profileImage ? (
                      <img
                        src={URL.createObjectURL(profileImage)}
                        className="w-[104px] h-[104px] rounded-full"
                      />
                    ) : (
                      <img
                        src="/assets/svg/Ellipse 1406.svg"
                        className="w-[104px] h-[104px]"
                      />
                    )}
                    {profileValue === 0 && (
                      <img
                        onClick={() => setOpenUploadProfile(true)}
                        src="/assets/svg/Frame 593.svg"
                        className="hidden group-hover:block absolute cursor-pointer w-[28px] h-[28px] ml-[75px] -mt-[30px]"
                      />
                    )}
                  </div>
                  <div className="relative w-[230px] h-[98px] mt-[42px] ml-[32px] text-[#FAFBFC]">
                    <div className="flex justify-center items-center w-full h-[22px] py-[12px] profile-gradient-border rounded-full">
                      <p className="flex justify-center items-center  h-[22px] bg-[#141517] px-[10px] text-[12px] font-normal rounded-full">
                        Pro Esports Athelete At Gamersback
                      </p>
                    </div>
                    <p className="font-semibold text-[20px] leading-7  h-[28px] flex flex-row w-[230px] mt-[16px]">
                      Wade Warren
                      <p className="text-[#B5B9BD] font-normal text-[14px] leading-5 text-right ml-[8px] flex items-center">
                        @warren1994
                      </p>
                    </p>
                    <p
                      onClick={handleFollowers}
                      className="w-[195px] h-[20px] text-[14px] text-[#7D8185] font-normal leading-5 mt-[12px]"
                    >
                      <span className="font-bold cursor-pointer text-[#FAFBFC]">
                        234
                      </span>{" "}
                      Followers
                      <span className="ml-[12px] cursor-pointer font-bold text-[#FAFBFC]">
                        48
                      </span>{" "}
                      Following
                    </p>
                  </div>
                </div>
                <div className="relative h-[32px] mt-[65px] flex flex-row space-x-2 px-4">
                  {/* <p className="bg-[#2B2E30] rounded-md text-[14px] font-normal text-[#FFFFFF] flex justify-center items-center w-[66px] h-[32px]">
                    Lobby
                    </p>
                    <p className="bg-[#2B2E30] rounded-md text-[14px] font-normal text-[#FFFFFF] flex justify-center items-center w-[84px] h-[32px]">
                    Message
                  </p> */}
                  {profileValue !== 0 && (
                    <p
                      className={`bg-typo-blue rounded-md text-[14px] font-normal text-[#FFFFFF] flex justify-center items-center w-[66px] h-[32px]`}
                    >
                      Follow
                    </p>
                  )}
                  <div>
                    <p
                      onClick={() => {
                        setOpenMenu(!openMenu);
                      }}
                      className={`bg-[#2B2E30] rounded-md text-[14px] cursor-pointer font-normal text-[#FFFFFF] flex justify-center items-center  w-[36px] h-[32px]`}
                    >
                      {openMenu ? (
                        <img src="/assets/svg/profieMoreButton.svg" />
                      ) : (
                        <img src="/assets/svg/profileMoreBtn.svg" />
                      )}
                    </p>
                    {openMenu && (
                      <div className="absolute bg-gradient-to-tl from-[#252525] me-[30px] from-[70%] to-gray-600 rounded-[16px] mt-[8px] -ml-[185px]">
                        <div className="bg-[#252525] bg-opacity-[100%] ml-[1px] mt-[1px]  rounded-[16px]">
                          <div className="flex flex-col rounded-[16px] bg-[url('/assets/svg/Noise.svg')] bg-no-repeat bg-cover bg-center">
                            <div className="w-[222px] flex flex-col py-[14px]">
                              {profileValue === 0 ? (
                                <div>
                                  <div className="flex flex-row w-[206px] h-[40px] mx-[8px] hover:bg-[#2B2E30] rounded-lg items-center ">
                                    <img
                                      src="/assets/svg/Single,-User,-Info 1 (1).svg"
                                      className="w-[24px] h-[24px] my-[10px] mx-[12px]"
                                    />
                                    <p className="text-white my-[8px] mx-[12px]">
                                      About Account
                                    </p>
                                  </div>
                                  <div className="flex flex-row w-[206px] h-[40px] mx-[8px] hover:bg-[#2B2E30] rounded-lg items-center ">
                                    <img
                                      src="/assets/svg/Qr-code 1.svg"
                                      className="w-[24px] h-[24px] my-[10px] mx-[12px]"
                                    />
                                    <p className="text-white my-[8px] mx-[12px]">
                                      QR Code
                                    </p>
                                  </div>
                                  <div className="flex flex-row w-[206px] h-[40px] mx-[8px] hover:bg-[#2B2E30] rounded-lg items-center ">
                                    <img
                                      src="/assets/svg/Group 47346.svg"
                                      className="w-[24px] h-[24px] my-[10px] mx-[12px]"
                                    />
                                    <p className="text-white my-[8px] mx-[12px] cursor-pointer">
                                      Share Profile
                                    </p>
                                  </div>
                                  {/* <div className="flex flex-row w-[206px] h-[40px] mx-[8px] hover:bg-[#2B2E30] rounded-lg items-center ">
                                    <img
                                      src="/assets/svg/user-profile-time-clock 1 (1).svg"
                                      className="w-[24px] h-[24px] my-[10px] mx-[12px]"
                                    />
                                    <p className="text-white my-[8px] mx-[12px]">
                                      Activity Log
                                    </p>
                                  </div> */}
                                </div>
                              ) : (
                                <div>
                                  <div
                                    onClick={() => {
                                      setShowBlockConfirmation(true);
                                    }}
                                    className="flex flex-row w-[206px] h-[40px] mx-[8px] hover:bg-[#2B2E30] rounded-lg items-center "
                                  >
                                    <img
                                      src="/assets/svg/Group 47346 (2).svg"
                                      className="w-[24px] h-[24px] my-[10px] mx-[12px]"
                                    />
                                    <p className="cursor-pointer text-white my-[8px] mx-[12px]">
                                      Block
                                    </p>
                                  </div>
                                  <div
                                    onClick={() => {
                                      setShowReportUser(true);
                                    }}
                                    className="flex flex-row w-[206px] h-[40px] mx-[8px] hover:bg-[#2B2E30] rounded-lg items-center "
                                  >
                                    <img
                                      src="/assets/svg/Group 47346 (3).svg"
                                      className="w-[24px] h-[24px] my-[10px] mx-[12px]"
                                    />
                                    <p className="cursor-pointer text-white my-[8px] mx-[12px]">
                                      Report
                                    </p>
                                  </div>
                                  <div
                                    onClick={handleShare}
                                    className="flex flex-row w-[206px] h-[40px] mx-[8px] hover:bg-[#2B2E30] rounded-lg items-center "
                                  >
                                    <img
                                      src="/assets/svg/Group 47346 (1).svg"
                                      className="w-[24px] h-[24px] my-[10px] mx-[12px]"
                                    />
                                    <p className="text-white my-[8px] mx-[12px] cursor-pointer">
                                      Share Profile
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {profileValue !== 2 && (
                <div className="w-[918px] border-b-[1px] border-[#4D4E504D] ml-[40px] mb-[24px]"></div>
              )}
              {profileValue !== 2 && (
                <div className="w-[248px] h-[28px] flex flex-row space-x-4 ml-[40px] mb-[20px] ">
                  <a
                    className="cursor-pointer"
                    href="https://www.facebook.com/"
                    target="_blank"
                  >
                    <img src="/assets/svg/Facebook (1).svg" />
                  </a>
                  <a
                    className="cursor-pointer"
                    href="https://www.instagram.com/"
                    target="_blank"
                  >
                    <img src="assets/svg/Instagram (1).svg" />
                  </a>
                  <a
                    className="cursor-pointer"
                    href="https://twitter.com/"
                    target="_blank"
                  >
                    <img src="/assets/svg/Twitter (1).svg" />
                  </a>
                  <a
                    className="cursor-pointer"
                    href="https://www.linkedin.com/"
                    target="_blank"
                  >
                    <img src="/assets/svg/Linkedin.svg" />
                  </a>
                  <a
                    className="cursor-pointer"
                    href="https://www.google.com/"
                    target="_blank"
                  >
                    <img src="/assets/svg/Google.svg" />
                  </a>
                  <a
                    className="cursor-pointer"
                    href="https://www.youtube.com/"
                    target="_blank"
                  >
                    <img src="/assets/svg/YouTube.svg" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* <div className="w-[999px] h-[184px] mt-[18px] bg-[#25252566] rounded-[16px]">
          <div className=" w-[157px] h-[24px] mt-[18px] ml-[24px]   flex flex-row justify-between items-center">
            <img
              src="/assets/svg/Group (6).svg"
              className="w-[24px] h-[24px] mt-[24px]"
            />
            <p className="text-[#FAFBFC] font-semibold mt-[24px] text-[16px] leading-4">
              Story Highlights
            </p>
          </div>
          <div className="flex flex-row space-x-4 justify-center items-center mt-[20px]">
            <img
              src="/assets/svg/Frame 1135.svg"
              className="mt-[23px] ml-[15px]"
            />
            <img
              src="/assets/svg/Stories.svg"
              className="mt-[20px] ml-[4px] "
            />
            <img
              src="/assets/svg/Stories.svg"
              className="mt-[20px] ml-[4px] "
            />
            <img
              src="/assets/svg/Stories.svg"
              className="mt-[20px] ml-[4px] "
            />
            <img
              src="/assets/svg/Stories.svg"
              className="mt-[20px] ml-[4px] "
            />
            <img
              src="/assets/svg/Stories.svg"
              className="mt-[20px] ml-[4px] "
            />
            <img
              src="/assets/svg/Stories.svg"
              className="mt-[20px] ml-[4px] "
            />
            <img
              src="/assets/svg/Stories.svg"
              className="mt-[20px] ml-[4px] "
            />
            <img
              src="/assets/svg/Stories.svg"
              className="mt-[20px] ml-[4px] "
            />
            <img
              src="/assets/svg/Stories.svg"
              className="mt-[20px] ml-[4px] "
            />
            <img
              src="/assets/svg/Stories.svg"
              className="mt-[20px] ml-[4px] "
            />
            <img
              src="/assets/svg/Stories.svg"
              className="mt-[20px] ml-[4px] "
            />
            <img
              src="/assets/svg/Frame 1134.svg"
              className="mt-[23px] ml-[888px] "
            />
          </div>
        </div> */}
          {profileValue !== 2 && tab === 1 && (
            <>
              <div className="w-[936px] ml-[5px] h-[36px] mt-[32px] border-b-2 border-[#212426]">
                <button
                  onClick={handleTab1}
                  className="text-white font-semibold text-[16px] leading-6"
                >
                  Post
                </button>

                <button
                  onClick={handleTab2}
                  className="text-[#7D8185] font-normal  text-[14px] leading-5 ml-[32px]"
                >
                  Lineage
                </button>

                <div className="bg-[#2E9BFA] w-[35px] h-[4px] mt-[8px] rounded-t-md"></div>
              </div>
              {profileValue === 0 ? (
                <div className="bg-[#141517] border-t-[1px] border-l-[1px] border-[#4D4E504D] w-[999px] h-[424px] mt-[16px] rounded-[16px] flex justify-center items-center flex-col mb-[70px]">
                  <img
                    src="/assets/svg/Group 47383 (2).svg"
                    className="w-[121px] h-[64px] "
                  />
                  <h3 className="text-[#FAFBFC] w-[287px] h-[32px] mt-[24px] font-semibold text-[24px] leading-[32px] text-center">
                    There is no post to Show
                  </h3>
                  <p className="text-[#B5B9BD]  w-[287px] h-[40px] mt-[12px] font-normal text-[14px] leading-5 text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor
                  </p>
                  {profileValue === 0 && (
                    <button className="flex flex-row bg-[#2E9BFA] mt-[48px] w-[111px] h-[44px] rounded-[16px] text-[#FFFFFF] justify-center items-center text-[16px] font-semibold leading-6 text-right ">
                      <img
                        src="/assets/svg/Component 14.svg "
                        className="text-[#B5B9BD] m-1"
                      />
                      Upload
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex bg-[#141517] border-t-[1px] border-l-[1px] border-[#4D4E504D] w-[999px] mt-[16px] rounded-[16px] mb-[70px] justify-center items-center py-[20px]">
                  <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                    className="w-[935px] h-[896px]"
                  >
                    <Masonry columnsCount={3} gutter="12px">
                      {imgArray.map((image, i) => (
                        <img
                          key={i}
                          src={image}
                          style={{
                            width: "100%",
                            display: "block",
                            borderRadius: "12px",
                            cursor: "pointer",
                          }}
                          alt=""
                          // onClick={() => setIsPostViewModalOpen(true)}
                        />
                      ))}
                    </Masonry>
                  </ResponsiveMasonry>
                </div>
              )}
            </>
          )}
          {profileValue !== 2 && tab === 2 && (
            <>
              <div className="w-[936px] h-[36px] ml-[5px] mt-[32px] border-b-2 border-[#212426]">
                <button
                  onClick={handleTab1}
                  className="text-[#7D8185] font-normal  text-[14px] leading-5 "
                >
                  Post
                </button>

                <button
                  onClick={handleTab2}
                  className="text-white font-semibold text-[16px] leading-6 ml-[32px]"
                >
                  Lineage
                </button>

                <div className="bg-[#2E9BFA] w-[62px] h-[4px] ml-[62px] mt-[8px] rounded-t-md"></div>
              </div>
              {profileValue === 0 ? (
                <div className="bg-[#141517] border-t-[1px] border-l-[1px] border-[#4D4E504D] w-[999px] h-[424px] mt-[16px] rounded-[16px] flex justify-center items-center flex-col mb-[70px]">
                  <img
                    src="/assets/svg/Group 47943.svg"
                    className="w-[121px] h-[64px] "
                  />
                  <h3 className="text-[#FAFBFC] w-[319px] h-[32px] mt-[24px] font-semibold text-[24px] leading-[32px] text-center">
                    There is no lineage to Show
                  </h3>
                  <p className="text-[#B5B9BD]  w-[287px] h-[40px] mt-[12px] font-normal text-[14px] leading-5 text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor
                  </p>
                  <button className="flex flex-row bg-[#2E9BFA] mt-[48px] w-[139px] h-[44px] rounded-[16px] text-[#FFFFFF] justify-center items-center text-[16px] font-semibold leading-6 text-right ">
                    <img
                      src="/assets/svg/Component 14 (4).svg "
                      className="text-[#B5B9BD] m-1 justify-start"
                    />
                    Add lineage
                  </button>
                </div>
              ) : (
                <div className="bg-[#141517] border-t-[1px] border-l-[1px] border-[#4D4E504D] w-[999px] mt-[16px] rounded-[16px] relative mb-[70px] flex flex-col items-center">
                  <div className="flex flex-row w-[980px] h-[56px] mt-[10px] justify-between items-center mb-[20px]">
                    <div className="flex w-[140px] h-[51px] ms-[20px]">
                      <select className="relative w-[140px] h-[40px] bg-[#141517] border-[2px] border-[#2B2E30] rounded-[8px] text-[#B5B9BD] outline-none mt-[9px]">
                        <option value={0}>Newest First</option>
                        <option value={1}>Oldest First</option>
                      </select>
                      <div className="absolute flex w-[56px] h-[18px] bg-[#141517] text-[#B5B9BD] justify-center font-normal text-[12px] ml-[10px]">
                        Sort by :
                      </div>
                    </div>
                    <div className="flex w-[300px] h-[32px] space-x-[16px]">
                      <div
                        className={`flex flex-row bg-[#2B2E30] space-x-2 items-center rounded-[8px] w-[208px] h-[32px] px-[16px]`}
                      >
                        <img
                          className="w-[20px] h-[20px] "
                          src="/assets/svg/search-icon.svg"
                        />
                        <input
                          className="outline-none bg-transparent w-full text-typo-secondary"
                          placeholder="Search Games"
                        />
                      </div>
                      <div className="w-[75px] h-[32px] bg-[#2B2E30] rounded-[8px] flex flex-row space-x-1 items-center px-2 cursor-pointer">
                        <img
                          src="/assets/svg/Component 14 (4).svg"
                          className="w-[20px] h-[20px]"
                        />
                        <p className="w-[26px] h-[20px] text-[#FFFFFF] font-normal text-[14px] leading-5 text-right">
                          {" "}
                          Add
                        </p>
                      </div>
                    </div>
                  </div>
                  <table>
                    <thead className="w-[980px] h-[30px] flex flex-row items-center px-4">
                      <td className="w-[334px] h-[18px] text-left text-[#B5B9BD] font-normal text-[12px] leading-[18px]">
                        Game Played
                      </td>
                      <td className="w-[185px] h-[18px] text-left text-[#B5B9BD] font-normal text-[12px] leading-[18px] ">
                        Developer
                      </td>
                      <td className="w-[130px] h-[18px] text-left text-[#B5B9BD] font-normal text-[12px] leading-[18px] ">
                        Year Played
                      </td>
                      <td className="w-[220px] h-[18px] text-left text-[#B5B9BD] font-normal text-[12px] leading-[18px] ">
                        Genre
                      </td>
                      <td className="w-[90px] h-[18px] text-left text-[#B5B9BD] font-normal text-[12px] leading-[18px] "></td>
                    </thead>
                    <tbody className="w-[980px] flex flex-col">
                      <tr className="w-[980px] h-[90px] flex flex-row items-center group hover:bg-[#1A1C1F] hover:rounded-[16px] px-4">
                        <td className="w-[334px] h-[88px] flex flex-row items-center space-x-4">
                          <img
                            className="w-[80px] h-[64px]"
                            src="/assets/svg/Rectangle 17867 (1).svg"
                          />
                          <p className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[153px] h-[40px]">
                            Counter-Strike Global Offensive
                          </p>
                        </td>
                        <td className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[190px] h-[20px]">
                          Wade Warren
                        </td>
                        <td className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[130px] h-[20px]">
                          2023
                        </td>
                        <td className="w-[200px] h-[20px]">
                          <span className=" w-[61px] h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] text-[12px] font-normal leading-[18px]">
                            Action
                          </span>
                          <span className=" w-[61px] h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] text-[12px] font-normal leading-[18px] ml-[12px]">
                            Arcade
                          </span>
                          {/* <p className="w-[72px] h-[24px] text-[#2E9BFA] text-[12px] font-semibold leading-[18px] text-right flex justify-center items-center">
                            +2 more
                          </p> */}
                        </td>
                        <td className="w-[90px] h-[20px] hidden group-hover:block cursor-pointer">
                          <div className="w-[74px] h-[32px] bg-[#2B2E30] rounded-[8px] flex flex-row space-x-2 justify-center items-center">
                            <img
                              src="/assets/svg/Component 14 (5).svg"
                              className="w-[20px] h-[20px]"
                            />
                            <p className="w-[26px] h-[20px] text-[#FFFFFF] font-normal text-[14px] leading-5 text-right">
                              {" "}
                              Edit
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr className="w-[980px] h-[90px] flex flex-row items-center group hover:bg-[#1A1C1F] hover:rounded-[16px] px-4">
                        <td className="w-[334px] h-[88px] flex flex-row items-center space-x-4">
                          <img
                            className="w-[80px] h-[64px]"
                            src="/assets/svg/Rectangle 17867 (1).svg"
                          />
                          <p className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[153px] h-[40px]">
                            Counter-Strike Global Offensive
                          </p>
                        </td>
                        <td className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[190px] h-[20px]">
                          Wade Warren
                        </td>
                        <td className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[130px] h-[20px]">
                          2023
                        </td>
                        <td className="w-[200px] h-[20px]">
                          <span className=" w-[61px] h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] text-[12px] font-normal leading-[18px]">
                            Action
                          </span>
                          <span className=" w-[61px] h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] text-[12px] font-normal leading-[18px] ml-[12px]">
                            Arcade
                          </span>
                          {/* <p className="w-[72px] h-[24px] text-[#2E9BFA] text-[12px] font-semibold leading-[18px] text-right flex justify-center items-center">
                            +2 more
                          </p> */}
                        </td>
                        <td className="w-[90px] h-[20px] hidden group-hover:block cursor-pointer">
                          <div className="w-[74px] h-[32px] bg-[#2B2E30] rounded-[8px] flex flex-row space-x-2 justify-center items-center">
                            <img
                              src="/assets/svg/Component 14 (5).svg"
                              className="w-[20px] h-[20px]"
                            />
                            <p className="w-[26px] h-[20px] text-[#FFFFFF] font-normal text-[14px] leading-5 text-right">
                              {" "}
                              Edit
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr className="w-[980px] h-[90px] flex flex-row items-center group hover:bg-[#1A1C1F] hover:rounded-[16px] px-4">
                        <td className="w-[334px] h-[88px] flex flex-row items-center space-x-4">
                          <img
                            className="w-[80px] h-[64px]"
                            src="/assets/svg/Rectangle 17867 (1).svg"
                          />
                          <p className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[153px] h-[40px]">
                            Counter-Strike Global Offensive
                          </p>
                        </td>
                        <td className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[190px] h-[20px]">
                          Wade Warren
                        </td>
                        <td className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[130px] h-[20px]">
                          2023
                        </td>
                        <td className="w-[200px] h-[20px]">
                          <span className=" w-[61px] h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] text-[12px] font-normal leading-[18px]">
                            Action
                          </span>
                          <span className=" w-[61px] h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] text-[12px] font-normal leading-[18px] ml-[12px]">
                            Arcade
                          </span>
                          {/* <p className="w-[72px] h-[24px] text-[#2E9BFA] text-[12px] font-semibold leading-[18px] text-right flex justify-center items-center">
                            +2 more
                          </p> */}
                        </td>
                        <td className="w-[90px] h-[20px] hidden group-hover:block cursor-pointer">
                          <div className="w-[74px] h-[32px] bg-[#2B2E30] rounded-[8px] flex flex-row space-x-2 justify-center items-center">
                            <img
                              src="/assets/svg/Component 14 (5).svg"
                              className="w-[20px] h-[20px]"
                            />
                            <p className="w-[26px] h-[20px] text-[#FFFFFF] font-normal text-[14px] leading-5 text-right">
                              {" "}
                              Edit
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr className="w-[980px] h-[90px] flex flex-row items-center group hover:bg-[#1A1C1F] hover:rounded-[16px] px-4">
                        <td className="w-[334px] h-[88px] flex flex-row items-center space-x-4">
                          <img
                            className="w-[80px] h-[64px]"
                            src="/assets/svg/Rectangle 17867 (1).svg"
                          />
                          <p className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[153px] h-[40px]">
                            Counter-Strike Global Offensive
                          </p>
                        </td>
                        <td className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[190px] h-[20px]">
                          Wade Warren
                        </td>
                        <td className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[130px] h-[20px]">
                          2023
                        </td>
                        <td className="w-[200px] h-[20px]">
                          <span className=" w-[61px] h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] text-[12px] font-normal leading-[18px]">
                            Action
                          </span>
                          <span className=" w-[61px] h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] text-[12px] font-normal leading-[18px] ml-[12px]">
                            Arcade
                          </span>
                          {/* <p className="w-[72px] h-[24px] text-[#2E9BFA] text-[12px] font-semibold leading-[18px] text-right flex justify-center items-center">
                            +2 more
                          </p> */}
                        </td>
                        <td className="w-[90px] h-[20px] hidden group-hover:block cursor-pointer">
                          <div className="w-[74px] h-[32px] bg-[#2B2E30] rounded-[8px] flex flex-row space-x-2 justify-center items-center">
                            <img
                              src="/assets/svg/Component 14 (5).svg"
                              className="w-[20px] h-[20px]"
                            />
                            <p className="w-[26px] h-[20px] text-[#FFFFFF] font-normal text-[14px] leading-5 text-right">
                              {" "}
                              Edit
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr className="w-[980px] h-[90px] flex flex-row items-center group hover:bg-[#1A1C1F] hover:rounded-[16px] px-4">
                        <td className="w-[334px] h-[88px] flex flex-row items-center space-x-4">
                          <img
                            className="w-[80px] h-[64px]"
                            src="/assets/svg/Rectangle 17867 (1).svg"
                          />
                          <p className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[153px] h-[40px]">
                            Counter-Strike Global Offensive
                          </p>
                        </td>
                        <td className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[190px] h-[20px]">
                          Wade Warren
                        </td>
                        <td className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[130px] h-[20px]">
                          2023
                        </td>
                        <td className="w-[200px] h-[20px]">
                          <span className=" w-[61px] h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] text-[12px] font-normal leading-[18px]">
                            Action
                          </span>
                          <span className=" w-[61px] h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] text-[12px] font-normal leading-[18px] ml-[12px]">
                            Arcade
                          </span>
                          {/* <p className="w-[72px] h-[24px] text-[#2E9BFA] text-[12px] font-semibold leading-[18px] text-right flex justify-center items-center">
                            +2 more
                          </p> */}
                        </td>
                        <td className="w-[90px] h-[20px] hidden group-hover:block cursor-pointer">
                          <div className="w-[74px] h-[32px] bg-[#2B2E30] rounded-[8px] flex flex-row space-x-2 justify-center items-center">
                            <img
                              src="/assets/svg/Component 14 (5).svg"
                              className="w-[20px] h-[20px]"
                            />
                            <p className="w-[26px] h-[20px] text-[#FFFFFF] font-normal text-[14px] leading-5 text-right">
                              {" "}
                              Edit
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr className="w-[980px] h-[90px] flex flex-row items-center group hover:bg-[#1A1C1F] hover:rounded-[16px] px-4">
                        <td className="w-[334px] h-[88px] flex flex-row items-center space-x-4">
                          <img
                            className="w-[80px] h-[64px]"
                            src="/assets/svg/Rectangle 17867 (1).svg"
                          />
                          <p className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[153px] h-[40px]">
                            Counter-Strike Global Offensive
                          </p>
                        </td>
                        <td className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[190px] h-[20px]">
                          Wade Warren
                        </td>
                        <td className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[130px] h-[20px]">
                          2023
                        </td>
                        <td className="w-[200px] h-[20px]">
                          <span className=" w-[61px] h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] text-[12px] font-normal leading-[18px]">
                            Action
                          </span>
                          <span className=" w-[61px] h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] text-[12px] font-normal leading-[18px] ml-[12px]">
                            Arcade
                          </span>
                          {/* <p className="w-[72px] h-[24px] text-[#2E9BFA] text-[12px] font-semibold leading-[18px] text-right flex justify-center items-center">
                            +2 more
                          </p> */}
                        </td>
                        <td className="w-[90px] h-[20px] hidden group-hover:block cursor-pointer">
                          <div className="w-[74px] h-[32px] bg-[#2B2E30] rounded-[8px] flex flex-row space-x-2 justify-center items-center">
                            <img
                              src="/assets/svg/Component 14 (5).svg"
                              className="w-[20px] h-[20px]"
                            />
                            <p className="w-[26px] h-[20px] text-[#FFFFFF] font-normal text-[14px] leading-5 text-right">
                              {" "}
                              Edit
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr className="w-[980px] h-[90px] flex flex-row items-center group hover:bg-[#1A1C1F] hover:rounded-[16px] px-4">
                        <td className="w-[334px] h-[88px] flex flex-row items-center space-x-4">
                          <img
                            className="w-[80px] h-[64px]"
                            src="/assets/svg/Rectangle 17867 (1).svg"
                          />
                          <p className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[153px] h-[40px]">
                            Counter-Strike Global Offensive
                          </p>
                        </td>
                        <td className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[190px] h-[20px]">
                          Wade Warren
                        </td>
                        <td className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[130px] h-[20px]">
                          2023
                        </td>
                        <td className="w-[200px] h-[20px]">
                          <span className=" w-[61px] h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] text-[12px] font-normal leading-[18px]">
                            Action
                          </span>
                          <span className=" w-[61px] h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] text-[12px] font-normal leading-[18px] ml-[12px]">
                            Arcade
                          </span>
                          {/* <p className="w-[72px] h-[24px] text-[#2E9BFA] text-[12px] font-semibold leading-[18px] text-right flex justify-center items-center">
                            +2 more
                          </p> */}
                        </td>
                        <td className="w-[90px] h-[20px] hidden group-hover:block cursor-pointer">
                          <div className="w-[74px] h-[32px] bg-[#2B2E30] rounded-[8px] flex flex-row space-x-2 justify-center items-center">
                            <img
                              src="/assets/svg/Component 14 (5).svg"
                              className="w-[20px] h-[20px]"
                            />
                            <p className="w-[26px] h-[20px] text-[#FFFFFF] font-normal text-[14px] leading-5 text-right">
                              {" "}
                              Edit
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr className="w-[980px] h-[90px] flex flex-row items-center group hover:bg-[#1A1C1F] hover:rounded-[16px] px-4">
                        <td className="w-[334px] h-[88px] flex flex-row items-center space-x-4">
                          <img
                            className="w-[80px] h-[64px]"
                            src="/assets/svg/Rectangle 17867 (1).svg"
                          />
                          <p className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[153px] h-[40px]">
                            Counter-Strike Global Offensive
                          </p>
                        </td>
                        <td className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[190px] h-[20px]">
                          Wade Warren
                        </td>
                        <td className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[130px] h-[20px]">
                          2023
                        </td>
                        <td className="w-[200px] h-[20px]">
                          <span className=" w-[61px] h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] text-[12px] font-normal leading-[18px]">
                            Action
                          </span>
                          <span className=" w-[61px] h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] text-[12px] font-normal leading-[18px] ml-[12px]">
                            Arcade
                          </span>
                          {/* <p className="w-[72px] h-[24px] text-[#2E9BFA] text-[12px] font-semibold leading-[18px] text-right flex justify-center items-center">
                            +2 more
                          </p> */}
                        </td>
                        <td className="w-[90px] h-[20px] hidden group-hover:block cursor-pointer">
                          <div className="w-[74px] h-[32px] bg-[#2B2E30] rounded-[8px] flex flex-row space-x-2 justify-center items-center">
                            <img
                              src="/assets/svg/Component 14 (5).svg"
                              className="w-[20px] h-[20px]"
                            />
                            <p className="w-[26px] h-[20px] text-[#FFFFFF] font-normal text-[14px] leading-5 text-right">
                              {" "}
                              Edit
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr className="w-[980px] h-[90px] flex flex-row items-center group hover:bg-[#1A1C1F] hover:rounded-[16px] px-4">
                        <td className="w-[334px] h-[88px] flex flex-row items-center space-x-4">
                          <img
                            className="w-[80px] h-[64px]"
                            src="/assets/svg/Rectangle 17867 (1).svg"
                          />
                          <p className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[153px] h-[40px]">
                            Counter-Strike Global Offensive
                          </p>
                        </td>
                        <td className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[190px] h-[20px]">
                          Wade Warren
                        </td>
                        <td className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[130px] h-[20px]">
                          2023
                        </td>
                        <td className="w-[200px] h-[20px]">
                          <span className=" w-[61px] h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] text-[12px] font-normal leading-[18px]">
                            Action
                          </span>
                          <span className=" w-[61px] h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] text-[12px] font-normal leading-[18px] ml-[12px]">
                            Arcade
                          </span>
                          {/* <p className="w-[72px] h-[24px] text-[#2E9BFA] text-[12px] font-semibold leading-[18px] text-right flex justify-center items-center">
                            +2 more
                          </p> */}
                        </td>
                        <td className="w-[90px] h-[20px] hidden group-hover:block cursor-pointer">
                          <div className="w-[74px] h-[32px] bg-[#2B2E30] rounded-[8px] flex flex-row space-x-2 justify-center items-center">
                            <img
                              src="/assets/svg/Component 14 (5).svg"
                              className="w-[20px] h-[20px]"
                            />
                            <p className="w-[26px] h-[20px] text-[#FFFFFF] font-normal text-[14px] leading-5 text-right">
                              {" "}
                              Edit
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr className="w-[980px] h-[90px] flex flex-row items-center group hover:bg-[#1A1C1F] hover:rounded-[16px] px-4">
                        <td className="w-[334px] h-[88px] flex flex-row items-center space-x-4">
                          <img
                            className="w-[80px] h-[64px]"
                            src="/assets/svg/Rectangle 17867 (1).svg"
                          />
                          <p className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[153px] h-[40px]">
                            Counter-Strike Global Offensive
                          </p>
                        </td>
                        <td className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[190px] h-[20px]">
                          Wade Warren
                        </td>
                        <td className="font-normal text-[14px] leading-5 text-[#FAFBFC] w-[130px] h-[20px]">
                          2023
                        </td>
                        <td className="w-[200px] h-[20px]">
                          <span className=" w-[61px] h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] text-[12px] font-normal leading-[18px]">
                            Action
                          </span>
                          <span className=" w-[61px] h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] text-[12px] font-normal leading-[18px] ml-[12px]">
                            Arcade
                          </span>
                          {/* <p className="w-[72px] h-[24px] text-[#2E9BFA] text-[12px] font-semibold leading-[18px] text-right flex justify-center items-center">
                            +2 more
                          </p> */}
                        </td>
                        <td className="w-[90px] h-[20px] hidden group-hover:block cursor-pointer">
                          <div className="w-[74px] h-[32px] bg-[#2B2E30] rounded-[8px] flex flex-row space-x-2 justify-center items-center">
                            <img
                              src="/assets/svg/Component 14 (5).svg"
                              className="w-[20px] h-[20px]"
                            />
                            <p className="w-[26px] h-[20px] text-[#FFFFFF] font-normal text-[14px] leading-5 text-right">
                              {" "}
                              Edit
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {profileValue === 2 && (
            <div className="bg-[#141517] border-t-[1px] border-l-[1px] border-[#4D4E504D] w-[999px] h-[424px] rounded-[16px] mb-[70px]">
              <div className="w-[999px] h-[424px] flex justify-center items-center flex-col">
                <img
                  src="/assets/svg/Group 47943 (1).svg"
                  className="w-[121px] h-[64px] "
                />
                <h3 className="text-[#FAFBFC] w-[287px] h-[32px] mt-[24px] font-semibold text-[24px] leading-[32px] text-center">
                  Account is private
                </h3>
                <p className="text-[#B5B9BD]  w-[287px] h-[40px] mt-[12px] font-normal text-[14px] leading-5 text-center">
                  Follow to see their photos & videos
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Models */}
      {openUploadProfile && (
        <UploadProfilePhoto
          onClose={() => setOpenUploadProfile(false)}
          done={(image) => {
            handleSetProfileImage(image);
            setOpenUploadProfile(false);
          }}
        />
      )}

      {showBlockConfirmation && <BlockConfirmation />}

      {showReportUser && <ShowReportUser />}

      {showConfirmation && <ShowConfirmation />}

      {showPretend && <ShowPretend />}

      {showPretendSearch && <ShoePretendSearch />}
    </>
  );
}
