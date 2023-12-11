import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useNavigate } from "react-router-dom";

export default function PrivateProfile() {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
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

  const handleMenuOpen = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="justify-center items-center  flex flex-col">
      <div className="h-[100vh] w-[1000px] overflow-y-auto mt-[92px]">
        <div className="w-[1000px] h-[471px]  rounded-lg ">
          <div className="relative">
            <img src="/assets/png/Rectangle 1907.png" className=" " />

            <div className="absolute top-0 left-0 w-[190px] h-[32px] rounded-full backdrop-blur-sm bg-white/10  text-[#FAFBFC]  mt-[175px] ml-[794px] flex flex-row justify-between items-center p-2 text-sm">
              <img src="/assets/svg/Frame 593.svg" />
              <p>Change Cover Photo</p>
            </div>
          </div>

          <div className="bg-[#25252566] w-[1000px] h-[248px] rounded-b-lg ">
            <div className="w-[104px] h-[104px]  relative">
              <img
                src="/assets/svg/Ellipse 1406.svg"
                className="absolute w-[104px] h-[104px] mt-[40px] ml-[40px]"
              />
              <img
                src="/assets/svg/Frame 593.svg"
                className="absolute w-[28px] h-[28px] mt-[116px] ml-[116px]"
              />
            </div>
            <div className=" w-[230px] h-[98px] -mt-[54px]  ml-[176px]  text-[#FAFBFC]">
              <p className=" w-[135px] h-[22px]">
                <img src="/assets/svg/Frame 195.svg" />
              </p>
              <p className="font-semibold text-[20px] leading-7  h-[28px] flex flex-row w-[230px] mt-[16px]">
                Wade Warren
                <p className="text-[#B5B9BD] font-normal text-[14px] leading-5 text-right ml-[8px] flex items-center">
                  @warren1994
                </p>
              </p>
              <p className="w-[195px] h-[20px] text-[14px] text-[#7D8185] font-normal leading-5 mt-[12px]">
                <span className="font-bold cursor-pointer text-[#FAFBFC]">
                  234
                </span>{" "}
                Followers{" "}
                <span className=" cursor-pointer font-bold text-[#FAFBFC]">
                  48
                </span>{" "}
                Following
              </p>
            </div>
          </div>
          <div className="relative w-[114px] h-[32px] flex flex-row -mt-[141px] ml-[846px]">
            <p className="bg-[#2B2E30] rounded-md text-[14px] font-normal text-[#FFFFFF] flex justify-center items-center w-[66px] h-[32px]">
              Lobby
            </p>
            <p
              onClick={handleMenuOpen}
              className=" bg-[#2B2E30] rounded-md text-[14px] cursor-pointer font-normal text-[#FFFFFF] flex justify-center items-center  w-[36px] h-[32px] ml-[12px]"
            >
              <img src="/assets/svg/Button (3).svg" />
            </p>
          </div>
          {/* <div className=" w-[248px] h-[28px] mt-[52px] ml-[40px] flex flex-row space-x-4">
            <img src="/assets/svg/Facebook (1).svg" />
            <img src="assets/svg/Instagram (1).svg" />
            <img src="/assets/svg/Twitter (1).svg" />
            <img src="/assets/svg/Linkedin.svg" />
            <img src="/assets/svg/Google.svg" />
            <img src="/assets/svg/YouTube.svg" />
          </div> */}
        </div>
        {/* <div className="w-[1000px] h-[184px] mt-[18px] bg-[#25252566] rounded-lg">
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

        <>
          <div className="w-[1000px]  h-[424px] mt-[16px] bg-[#2525254D] rounded-lg flex justify-center items-center flex-col">
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
        </>
      </div>
    </div>
  );
}
