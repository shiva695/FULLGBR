import { useState } from "react";
import CommonModal from "../../generalComponents/CommonModal";

export default function Followers() {
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleButtonClick = () => {
    setButtonDisabled(!isButtonDisabled);
  };
  return (
    <>
      <CommonModal>
        <div className="w-[560px] h-[655px] flex flex-col rounded-[16px] text-[#FAFBFC]">
          <div className="flex flex-row justify-start items-center bg-[#26292B] w-[560px] h-[64px] rounded-t-[16px]">
            <p className="ml-[24px] font-semibold text-[18px]">
              Followers (234)
            </p>
            <p className="ml-[24px] text-[#7D8185] font-semibold text-[18px]">
              Following (234)
            </p>
          </div>
          <div className="w-[560px] h-[528px] mt-[20px] ">
            <div className=" w-[560px] h-[72px]  rounded-lg  flex flex-row">
              <img
                src="/assets/svg/Ellipse 1494 (2).svg"
                className="w-[48px] h-[48px] mt-[12px] ml-[24px]"
              />
              <p className="font-semibold text-[#FAFBFC] text-[16px] leading-6 p-[12px]">
                Marvin McKinney{" "}
                <p className="font-normal text-[#B5B9BD] text-[14px] leading-5 ">
                  Rachelle Mayfield
                </p>
              </p>

              <button
                onClick={handleButtonClick}
                className="bg-[#2E9BFA] rounded-lg px-3 h-[32px] w-[67px] text-[#FFFFFF] ml-[207px] mt-5"
              >
                {isButtonDisabled ? (
                  <p className="flex bg-[#2B2E30] w-[87px] h-[32px] rounded-lg justify-center items-center -ml-6">
                    Following
                  </p>
                ) : (
                  <p>Follow</p>
                )}
              </button>
            </div>
            <div className=" w-[560px] h-[72px]  rounded-lg  flex flex-row">
              <img
                src="/assets/svg/Ellipse 1494 (2).svg"
                className="w-[48px] h-[48px] mt-[12px] ml-[24px]"
              />
              <p className="font-semibold text-[#FAFBFC] text-[16px] leading-6 p-[12px]">
                Marvin McKinney{" "}
                <p className="font-normal text-[#B5B9BD] text-[14px] leading-5 ">
                  Rachelle Mayfield
                </p>
              </p>

              <button
                onClick={handleButtonClick}
                className="bg-[#2E9BFA] rounded-lg px-3 h-[32px] w-[67px] text-[#FFFFFF] ml-[207px] mt-5"
              >
                {isButtonDisabled ? (
                  <p className="flex bg-[#2B2E30] w-[87px] h-[32px] rounded-lg justify-center items-center -ml-6">
                    Following
                  </p>
                ) : (
                  <p>Follow</p>
                )}
              </button>
            </div>
            <div className=" w-[560px] h-[72px]  rounded-lg  flex flex-row">
              <img
                src="/assets/svg/Ellipse 1494 (2).svg"
                className="w-[48px] h-[48px] mt-[12px] ml-[24px]"
              />
              <p className="font-semibold text-[#FAFBFC] text-[16px] leading-6 p-[12px]">
                Marvin McKinney{" "}
                <p className="font-normal text-[#B5B9BD] text-[14px] leading-5 ">
                  Rachelle Mayfield
                </p>
              </p>

              <button
                onClick={handleButtonClick}
                className="bg-[#2E9BFA] rounded-lg px-3 h-[32px] w-[67px] text-[#FFFFFF] ml-[207px] mt-5"
              >
                {isButtonDisabled ? (
                  <p className="flex bg-[#2B2E30] w-[87px] h-[32px] rounded-lg justify-center items-center -ml-6">
                    Following
                  </p>
                ) : (
                  <p>Follow</p>
                )}
              </button>
            </div>
            <div className=" w-[560px] h-[72px]  rounded-lg  flex flex-row">
              <img
                src="/assets/svg/Ellipse 1494 (2).svg"
                className="w-[48px] h-[48px] mt-[12px] ml-[24px]"
              />
              <p className="font-semibold text-[#FAFBFC] text-[16px] leading-6 p-[12px]">
                Marvin McKinney{" "}
                <p className="font-normal text-[#B5B9BD] text-[14px] leading-5 ">
                  Rachelle Mayfield
                </p>
              </p>

              <button
                onClick={handleButtonClick}
                className="bg-[#2E9BFA] rounded-lg px-3 h-[32px] w-[67px] text-[#FFFFFF] ml-[207px] mt-5"
              >
                {isButtonDisabled ? (
                  <p className="flex bg-[#2B2E30] w-[87px] h-[32px] rounded-lg justify-center items-center -ml-6">
                    Following
                  </p>
                ) : (
                  <p>Follow</p>
                )}
              </button>
            </div>
            <div className=" w-[560px] h-[72px]  rounded-lg  flex flex-row">
              <img
                src="/assets/svg/Ellipse 1494 (2).svg"
                className="w-[48px] h-[48px] mt-[12px] ml-[24px]"
              />
              <p className="font-semibold text-[#FAFBFC] text-[16px] leading-6 p-[12px]">
                Marvin McKinney{" "}
                <p className="font-normal text-[#B5B9BD] text-[14px] leading-5 ">
                  Rachelle Mayfield
                </p>
              </p>
              <img
                src="/assets/svg/Frame 195.svg"
                className="absolute w-[135px] h-[22px] ml-[230px] mt-[20px]"
              />

              <button
                onClick={handleButtonClick}
                className="bg-[#2E9BFA] rounded-lg px-3 h-[32px] w-[67px] text-[#FFFFFF] ml-[207px] mt-5"
              >
                {isButtonDisabled ? (
                  <p className="flex bg-[#2B2E30] w-[87px] h-[32px] rounded-lg justify-center items-center -ml-6">
                    Following
                  </p>
                ) : (
                  <p>Follow</p>
                )}
              </button>
            </div>
            <div className=" w-[560px] h-[72px]  rounded-lg  flex flex-row">
              <img
                src="/assets/svg/Ellipse 1494 (2).svg"
                className="w-[48px] h-[48px] mt-[12px] ml-[24px]"
              />
              <p className="font-semibold text-[#FAFBFC] text-[16px] leading-6 p-[12px]">
                Marvin McKinney{" "}
                <p className="font-normal text-[#B5B9BD] text-[14px] leading-5 ">
                  Rachelle Mayfield
                </p>
              </p>

              <button
                onClick={handleButtonClick}
                className="bg-[#2E9BFA] rounded-lg px-3 h-[32px] w-[67px] text-[#FFFFFF] ml-[207px] mt-5"
              >
                {isButtonDisabled ? (
                  <p className="flex bg-[#2B2E30] w-[87px] h-[32px] rounded-lg justify-center items-center -ml-6">
                    Following
                  </p>
                ) : (
                  <p>Follow</p>
                )}
              </button>
            </div>
            <div className=" w-[560px] h-[72px]  rounded-lg  flex flex-row">
              <img
                src="/assets/svg/Ellipse 1494 (2).svg"
                className="w-[48px] h-[48px] mt-[12px] ml-[24px]"
              />
              <p className="font-semibold text-[#FAFBFC] text-[16px] leading-6 p-[12px]">
                Marvin McKinney{" "}
                <p className="font-normal text-[#B5B9BD] text-[14px] leading-5 ">
                  Rachelle Mayfield
                </p>
              </p>

              <button
                onClick={handleButtonClick}
                className="bg-[#2E9BFA] rounded-lg px-3 h-[32px] w-[67px] text-[#FFFFFF] ml-[207px] mt-5"
              >
                {isButtonDisabled ? (
                  <p className="flex bg-[#2B2E30] w-[87px] h-[32px] rounded-lg justify-center items-center -ml-6">
                    Following
                  </p>
                ) : (
                  <p>Follow</p>
                )}
              </button>
            </div>
          </div>
        </div>
      </CommonModal>
    </>
  );
}
