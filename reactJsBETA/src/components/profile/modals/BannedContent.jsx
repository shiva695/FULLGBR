import { useState } from "react";
import CommonModal from "../../generalComponents/CommonModal";
import { useNavigate } from "react-router-dom";

export default function BannedContent() {
  const [suicideReport, setSuicideReport] = useState(false);
  const [nudityReport, setNudityReport] = useState(false);
  const [commonReport, setCommonReport] = useState(false);
  const navigate = useNavigate();

  const handleReport = () => {
    navigate("/confirmation");
  };
  const handleSuicideReport = () => {
    setSuicideReport(true);
  };
  const handleNudityReport = () => {
    setNudityReport(true);
  };
  const handleCommonReport = () => {
    setCommonReport(true);
  };

  return (
    <>
      <CommonModal>
        <div className="w-[616px] h-[660px] flex flex-col  rounded-[16px] text-[#FAFBFC]">
          <div className="flex flex-row   justify-start items-center bg-[#26292B] w-[616px] h-[64px] rounded-t-lg ">
            <img
              src="/assets/svg/left-arrow.svg"
              className="w-[24px] h-[24px] ml-[24px]"
            />
            <p className=" ml-[24px] font-semibold text-[18px] w-[218px] h-[26px]">
              Report Vinayak Mahadev
            </p>
            <img
              src="/assets/svg/close-btn.svg"
              className="w-[16px] h-[16px] ml-[282px] "
            />
          </div>
          <div className="w-[592px] h-[148px] mt-[20px] ml-[12px]">
            <p
              onClick={handleReport}
              className="h-[48px] w-[592px] flex flex-row justify-between items-center hover:bg-[#2B2E30] hover:rounded-lg p-3"
            >
              Its Spam
              <img src="/assets/svg/arrow 1.svg" />
            </p>

            <p
              onClick={handleCommonReport}
              className="h-[48px] w-[592px] flex flex-row justify-between items-center hover:bg-[#2B2E30] hover:rounded-lg p-3"
            >
              I just don't like it <img src="/assets/svg/arrow 1.svg" />
            </p>
            <p
              onClick={handleSuicideReport}
              className="h-[48px] w-[592px] flex flex-row justify-between items-center hover:bg-[#2B2E30] hover:rounded-lg p-3"
            >
              Suicide, self-injury or eating disorders
              <img src="/assets/svg/arrow 1.svg" />
            </p>
            <p
              onClick={handleNudityReport}
              className="h-[48px] w-[592px] flex flex-row justify-between items-center hover:bg-[#2B2E30] hover:rounded-lg p-3"
            >
              Nudity or sexual activity <img src="/assets/svg/arrow 1.svg" />
            </p>

            <p
              onClick={handleReport}
              className="h-[48px] w-[592px] flex flex-row justify-between items-center hover:bg-[#2B2E30] hover:rounded-lg p-3"
            >
              Hate speech or symbols <img src="/assets/svg/arrow 1.svg" />
            </p>
            <p
              onClick={handleReport}
              className="h-[48px] w-[592px] flex flex-row justify-between items-center hover:bg-[#2B2E30] hover:rounded-lg p-3"
            >
              Violence or dangerous organizations
              <img src="/assets/svg/arrow 1.svg" />
            </p>
            <p
              onClick={handleReport}
              className="h-[48px] w-[592px] flex flex-row justify-between items-center hover:bg-[#2B2E30] hover:rounded-lg p-3"
            >
              Bullying or harassment <img src="/assets/svg/arrow 1.svg" />
            </p>
            <p
              onClick={handleReport}
              className="h-[48px] w-[592px] flex flex-row justify-between items-center hover:bg-[#2B2E30] hover:rounded-lg p-3"
            >
              Intellectual property violation
              <img src="/assets/svg/arrow 1.svg" />
            </p>
            <p
              onClick={handleReport}
              className="h-[48px] w-[592px] flex flex-row justify-between items-center hover:bg-[#2B2E30] hover:rounded-lg p-3"
            >
              False information <img src="/assets/svg/arrow 1.svg" />
            </p>
            <p
              onClick={handleReport}
              className="h-[48px] w-[592px] flex flex-row justify-between items-center hover:bg-[#2B2E30] hover:rounded-lg p-3"
            >
              Selling Hacks
              <img src="/assets/svg/arrow 1.svg" />
            </p>
          </div>
        </div>
      </CommonModal>

      {suicideReport && (
        <CommonModal>
          <div className="w-[457px] h-[306px] flex flex-col  rounded-[16px] text-[#FAFBFC]">
            <div className="bg-[#26292B] w-[455px] h-[64px] rounded-t-lg flex flex-row  ">
              <img
                className="w-[24px] h-[24px] my-[20px] p-[6px] ml-[24px]"
                src="/assets/svg/left-pointer.svg"
              />
              <h1 className="w-[218px] h-[26px] mt-[19px] ml-[12px] font-semibold text-[18px] leading-[26px] text-[#FAFBFC] ">
                Report Vinayak Mahadev
              </h1>
              <img
                className="w-[32px] h-[32px] mt-[16px] p-[10px] ml-[122px]"
                src="/assets/svg/close-btn.svg"
              />
            </div>
            <h1 className="w-[316px] h-[26px] mt-[20px]  ml-[24px] font-semibold text-[18px] leading-[26px] text-[#FAFBFC]">
              Suicide, self-injury guidelines
            </h1>
            <div className="w-[408px] h-[80px] mt-[8px]  ml-[24px] font-normal text-[14px] leading-[20px] text-[#7D8185]">
              We remove accounts encouraging or promoting self-injury, which
              includes suicide, cutting and eating disorders. We may also remove
              posts identifying victims of self-injury or if the post attacks or
              makes fun of them.
            </div>
            <button
              onClick={() => navigate("/profile")}
              className="w-[408px] h-[44px] bg-[#2E9BFA] rounded-lg mt-[40px] ml-[24px] "
            >
              Submit Report
            </button>
          </div>
        </CommonModal>
      )}

      {nudityReport && (
        <CommonModal>
          <div className="w-[616px] h-[655px] flex flex-col  rounded-[16px] text-[#FAFBFC]">
            <div className="bg-[#26292B] w-[616px] h-[64px] rounded-t-lg flex flex-row ">
              <img
                className="w-[24px] h-[24px] mt-[20px] p-[6px] ml-[24px]"
                src="/assets/svg/left-pointer.svg"
              />
              <h1 className="w-[218px] h-[26px] mt-[19px]   ml-[12px] font-semibold text-[18px] leading-[26px] text-[#FAFBFC] ">
                Report Vinayak Mahadev
              </h1>
              <img
                className="w-[32px] h-[32px] mt-[16px] p-[10px] ml-[282px]"
                src="/assets/svg/close-btn.svg"
              />
            </div>
            <h1 className="w-[316px] h-[26px] mt-[20px]  ml-[24px] font-semibold text-[18px] leading-[26px] text-[#FAFBFC]">
              Why are you reporting this account?
            </h1>
            <div className="w-[592px] h-[216px] mt-[12px]  ml-[12px] font-normal text-[16px] leading-[24px] text-[#FAFBFC] flex flex-col">
              <div className="w-[592px] h-[48px] flex flex-row justify-start items-center space-x-3 p-2">
                <input type="radio" name="selection" />
                <p>Nudity or pornography</p>
              </div>
              <div className="w-[592px] h-[48px] flex flex-row justify-start items-center space-x-3 p-2 mt-[8px]">
                <input type="radio" name="selection" />
                <p>Sexual exploitation or solicitation</p>
              </div>
              <div className="w-[592px] h-[48px] flex flex-row justify-start items-center space-x-3 p-2 mt-[8px]">
                <input type="radio" name="selection" />
                <p>Sharing private images</p>
              </div>
              <div className="w-[592px] h-[48px] flex flex-row justify-start items-center space-x-3 p-2 mt-[8px]">
                <input type="radio" name="selection" />
                <p>Involves a child</p>
              </div>
            </div>

            <h1 className="w-[305px] h-[26px] mt-[32px]  ml-[24px] font-semibold text-[18px] leading-[26px] text-[#FAFBFC]">
              Nudity or sexual activity guidelines
            </h1>
            <p className="w-[305px] h-[26px] mt-[16px]  ml-[24px] font-semibold text-[16px] leading-[24px] text-[#7D8185] ">
              We remove accounts with:
            </p>
            <div className="w-[592px] h-[64px] mt-[8px]  ml-[12px] font-normal text-[14px] leading-[20px] text-[#B5B9BD] p-3 flex justify-center items-center flex-row">
              <li className="h-[6px] w-[6px] mb-10 "> </li>
              <p className="w-[550px] h-[40px] ml-[12px]">
                Photos, videos and some digitally-created content that show
                sexual intercourse, genitals, and close-ups of fully-nude
                buttocks.
              </p>
            </div>
            <div className="w-[592px] h-[64px] mt-[8px]  ml-[12px] font-normal text-[14px] leading-[20px] text-[#B5B9BD] p-3 flex flex-row justify-center items-center">
              <li className="h-[6px] w-[6px] mb-10"> </li>
              <p className="w-[550px] h-[40px] ml-[12px]">
                Some photos of female nipples, but videos of post-mastectomy
                scarring and women actively breastfeeding are allowed.
              </p>
            </div>

            <div className="bg-[#26292B] w-[616px] h-[80px] rounded-b-lg flex flex-row mt-[3px]">
              <button
                onClick={() => navigate("/profile")}
                className="w-[568px] h-[44px] bg-[#2E9BFA] rounded-lg mt-[12px] ml-[24px] "
              >
                Submit Report
              </button>
            </div>
          </div>
        </CommonModal>
      )}

      {commonReport && (
        <CommonModal>
          <div className="w-[616px] h-[655px] flex flex-col  rounded-[16px] text-[#FAFBFC]">
            <div className="bg-[#26292B] w-[616px] h-[64px] rounded-t-lg flex flex-row  ">
              <img
                className="w-[24px] h-[24px] my-[20px] p-[6px] ml-[24px]"
                src="/assets/svg/left-pointer.svg"
              />
              <h1 className="w-[218px] h-[26px] mt-[19px] ml-[12px] font-semibold text-[18px] leading-[26px] text-[#FAFBFC] ">
                Report Vinayak Mahadev
              </h1>
              <img
                className="w-[32px] h-[32px] mt-[16px] p-[10px] ml-[282px]"
                src="/assets/svg/close-btn.svg"
              />
            </div>
            <h1 className="w-[339px] h-[26px] mt-[20px]  ml-[24px] font-semibold text-[18px] leading-[26px] text-[#FAFBFC]">
              You have chosen the following reason :
            </h1>
            <div className="w-[568px] h-[56px] mt-[12px] bg-[#26292B80] rounded-xl  ml-[24px] font-normal text-[16px] leading-[24px] text-[#FAFBFC] flex justify-start items-center space-x-2">
              <img
                className="w-[12px] h-[12px] ml-[16px] my-[23px]"
                src="/assets/svg/Rectangle 17949.svg"
              />
              <p>I dont like this</p>
            </div>

            <p className="w-[156px] h-[26px] mt-[40px] ml-[24px] font-semibold text-[18px] leading-[26px ] text-[#FAFBFC]">
              Comment{" "}
              <span className="font-normal text-[14px] leading-[20px ] text-[#B5B9BD]">
                (Optional)
              </span>
            </p>

            <textarea
              placeholder="Write your comment"
              className="w-[572px] h-[108px] mt-[18px] ml-[20px] bg-transparent rounded-2xl border-2 border-[#373A3D] p-4"
            ></textarea>

            <div className="w-[616px] h-[80px] mt-[205px] bg-[#212426] rounded-b-lg flex justify-center items-center space-x-4">
              <button className="w-[276px] h-[44px] bg-[#2B2E30] rounded-lg  ">
                Back
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="w-[276px] h-[44px] bg-[#2E9BFA] rounded-lg "
              >
                Submit Report
              </button>
            </div>
          </div>
        </CommonModal>
      )}
    </>
  );
}
