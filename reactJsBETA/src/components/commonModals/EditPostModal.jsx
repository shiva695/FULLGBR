import { useState } from "react";
import ToggleSwitch from "../inputComponents/ToggleSwitch";
import CommonBtn1 from "../generalComponents/CommonBtn1";
import CommonBtn2 from "../generalComponents/CommonBtn2";

const EditPostModal = ({ open, close, mediaType }) => {
  const [caption, setCaption] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const img = [
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
  ];
  const [scrollIdx, setScrollIdx] = useState(0);
  return (
    <>
      {open && (
        <div className="fixed z-10 inset-0 bg-opacity-80 bg-black  flex justify-center items-center">
          <div className="relative flex flex-row justify-end w-[1296px] h-[714px] items-end">
            {/* left */}
            <div className="flex flex-col items-end justify-end h-full gap-[20px] mr-[24px]">
              <div className="flex flex-col items-end gap-[18px] w-[189px] h-auto bottom-20 left-0">
                <img
                  className="w-[72px] h-[72px] object-cover rounded-[8px] gradient-border"
                  src="/assets/svg/newsfeed-img1.svg"
                />
                <div
                  style={{
                    background:
                      isHovering &&
                      "linear-gradient(277.73deg, #414142 -20.07%, #000001 112.69%)",
                  }}
                  className={`flex flex-row ${
                    isHovering
                      ? "items-center justify-around"
                      : "items-center justify-end"
                  } w-[189px] h-[84px] rounded-[12px]`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {isHovering && (
                    <div className="w-10 h-9 bg-transparent hover:bg-[#212426] flex items-center justify-center rounded-[8px]">
                      <img
                        src="/assets/svg/dragIndicator.svg"
                        className="w-[10px] h-[16px]"
                      />
                    </div>
                  )}
                  {isHovering && (
                    <div className="w-10 h-9 bg-transparent hover:bg-[#212426] flex items-center justify-center rounded-[8px]">
                      <img src="/assets/svg/delete-icon.svg" />
                    </div>
                  )}

                  <img
                    className="w-[72px] h-[72px] object-cover rounded-[8px]"
                    src="/assets/svg/newsfeed-img1.svg"
                  />
                </div>
              </div>
              <div>
                <CommonBtn2
                  height="40px"
                  width="122px"
                  backgroundColor="#2B2E30"
                  icon="/assets/svg/plus-icon.svg"
                  text="Add More"
                />
              </div>
            </div>
            {/* center */}
            <div className="bg-gradient-to-tl from-black from-[70%] to-gray-600 rounded-[12px]">
              <div className="bg-[#252525] bg-opacity-[100%] ml-[1px] mt-[1px] rounded-[16px]">
                <div className="z-10 flex flex-col w-[1000px] h-[665px] bg-[url('/assets/svg/Noise.svg')] bg-no-repeat bg-cover bg-center bg-opacity-[100%]">
                  {/* Modal Header */}
                  <div className="w-full h-[72px] px-[24px] py-[22px] rounded-tr-[16px] rounded-tl-[16px] modal-header">
                    <h1 className="font-semibold text-[18px] text-typo-secondary">
                      Edit Post
                    </h1>
                  </div>

                  <div className="flex flex-row gap-[24px] px-[24px] pt-[24px] pb-[56px]">
                    {/* Media div */}
                    <div className="relative w-[608px] h-[513px] rounded-[12px]">
                      {mediaType === "VIDEO" ? (
                        <video className="w-full h-full" controls autoPlay>
                          <source
                            src="/assets/svg/sample-vd.mp4"
                            type="video/mp4"
                          />
                        </video>
                      ) : (
                        <img
                          className=" h-full w-full rounded-lg object-fill"
                          src={img[scrollIdx]}
                          alt=""
                        />
                      )}
                      {mediaType === "IMAGE" && (
                        <>
                          {scrollIdx !== img.length - 1 && (
                            <div
                              className="absolute top-[45%] right-[2%] h-[48px] flex items-center justify-center w-[48px] rounded-full bg-[#26292B80] cursor-pointer"
                              onClick={() => {
                                setScrollIdx((prev) => prev + 1);
                              }}
                            >
                              <img
                                src="/assets/svg/right-scroll.svg"
                                className="w-3 h-3"
                              />
                            </div>
                          )}

                          {scrollIdx > 0 && (
                            <div
                              className="absolute top-[45%] left-[2%]  h-[48px] flex items-center justify-center w-[48px] rounded-full bg-[#26292B80] cursor-pointer"
                              onClick={() => {
                                setScrollIdx((prev) => prev - 1);
                              }}
                            >
                              <img
                                src="/assets/svg/left-scroll.svg"
                                className="w-3 h-3"
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Caption  */}
                    <div className="flex flex-col items-start">
                      <h5 className="text-[14px] text-typo-secondary font-semibold">
                        Caption
                      </h5>

                      {/* Write Caption  */}
                      <div className="flex flex-col bg-gradient-to-tl from-black from-[70%] to-gray-600 w-[320px] h-[168px] rounded-[12px] bg-[#2B2E30] mt-[12px]">
                        <textarea
                          className="h-[120px] outline-none  bg-[#2B2E30] ml-[.5px] mt-[.5px] rounded-[12px]  resize-none p-4 text-typo-secondary border-b-[#1A1C1F] border-b-[1px]"
                          placeholder="Write a caption"
                          value={caption}
                          onChange={(ev) => setCaption(ev.target.value)}
                        />
                        <div className="flex flex-row items-center justify-between p-3">
                          <img
                            src="/assets/svg/emoji-icon.svg"
                            className="h-6 w-6"
                          />

                          <h5 className="text-[12px] font-normal text-typo-light">
                            <span className="text-typo-primary">
                              {caption.length}
                            </span>
                            /2100
                          </h5>
                        </div>
                      </div>

                      {/* Allow Comments toggle */}
                      <div className="flex flex-row w-full justify-between  items-center mt-[34px]">
                        <h5 className="text-[14px] font-semibold text-typo-secondary">
                          Allow comments
                        </h5>
                        <ToggleSwitch />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right */}
            <div className="ml-[24px]">
              <CommonBtn1 height="40px" width="68px" text="Done" />
            </div>
            <div className="absolute top-1 right-24">
              <img
                src="/assets/svg/close-btn.svg"
                className="w-3 h-3 cursor-pointer"
                onClick={close}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPostModal;
