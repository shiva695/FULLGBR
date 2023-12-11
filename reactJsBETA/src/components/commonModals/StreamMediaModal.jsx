// @Import Dependencies
import PropTypes from "prop-types";
import { useState } from "react";

import { MdOutlineCloseFullscreen } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

const StreamMediaModal = ({
  open,
  close,
  mediaType,
  video,
  path,
  idx,
  closePathHome,
  doubleClicked,
  doubleClickedHandler,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
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
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-12.jpg",
  ];
  const [scrollIdx, setScrollIdx] = useState(idx ?? 0);

  return (
    <>
      {open && (
        <div className="fixed z-10 inset-0 bg-opacity-80 bg-black  flex justify-center items-center">
          <div className="bg-gradient-to-tl from-black from-[70%] to-gray-600  rounded-[16px]">
            <div
              className={`flex flex-row space-y-5 ${
                path !== "game-detail" ? "w-[1248px]" : "w-[1158]"
              } gap-[32px] h-[704px] rounded-[12px] p-[12px] ml-[1px] mt-[1px] bg-[#161717]`}
            >
              <div className="w-[1132px] h-full rounded-[12px]">
                {mediaType === "VIDEO" ? (
                  <video className="w-full h-full" controls autoPlay>
                    <source src={video} type="video/mp4" />
                    Your browser does not support HTML video.
                  </video>
                ) : (
                  <div className="group relative h-full w-full">
                    <img
                      className="h-full w-full rounded-lg object-fill"
                      src={img[scrollIdx]}
                      alt=""
                    />
                    <div
                      className="hidden group-hover:block absolute bottom-3 right-3 cursor-pointer bg-[#252525] p-2 rounded-full"
                      onClick={() => {
                        close();
                        if (doubleClicked) {
                          doubleClickedHandler(true);
                        }
                      }}
                    >
                      <MdOutlineCloseFullscreen color="white" size={20} />
                    </div>
                  </div>
                )}
              </div>
              {path !== "game-detail" && (
                <div className="flex flex-col items-center w-[40px] h-[340px] gap-[24px]">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="/assets/svg/profile.svg"
                  />
                  <div className="w-8 h-8 bg-[#212426] rounded-full flex items-center justify-center">
                    <img
                      className="h-5 w-5"
                      src="/assets/svg/thumbsup-icon.svg"
                    />
                  </div>
                  <div className="w-8 h-8 bg-[#212426] rounded-full flex items-center justify-center">
                    <img
                      className="h-5 w-5"
                      src="/assets/svg/comments-icon.svg"
                    />
                  </div>
                  <div className="w-8 h-8 bg-[#212426] rounded-full flex items-center justify-center">
                    <img
                      className="h-5 w-5"
                      src="/assets/svg/shares-icon.svg"
                    />
                  </div>
                  <div className="w-8 h-8 bg-[#212426] rounded-full flex items-center justify-center">
                    <img className="h-5 w-5" src="/assets/svg/save-icon.svg" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="fixed top-5 right-5">
            <img
              src="/assets/svg/close-btn.svg"
              className="w-3 h-3 cursor-pointer"
              onClick={() => {
                close();
                if (location.pathname === "/") {
                  closePathHome(location.pathname);
                } else {
                  navigate(location.pathname);
                }
              }}
            />
          </div>
          {mediaType === "IMAGE" && (
            <>
              {scrollIdx !== img.length - 1 && (
                <div
                  className="fixed top-[50%] right-[2%] h-[48px] flex items-center justify-center w-[48px] rounded-full bg-[#1A1C1F] cursor-pointer"
                  onClick={() => {
                    setScrollIdx((prev) => prev + 1);
                  }}
                >
                  <img src="/assets/svg/right-scroll.svg" className="w-3 h-3" />
                </div>
              )}

              {scrollIdx > 0 && (
                <div
                  className="fixed top-[50%] left-[2%]  h-[48px] flex items-center justify-center w-[48px] rounded-full bg-[#1A1C1F] cursor-pointer"
                  onClick={() => {
                    setScrollIdx((prev) => prev - 1);
                  }}
                >
                  <img src="/assets/svg/left-scroll.svg" className="w-3 h-3" />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

StreamMediaModal.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  mediaType: PropTypes.string,
  video: PropTypes.string,
  path: PropTypes.string,
  idx: PropTypes.number,
  closePathHome: PropTypes.number,
  doubleClicked: PropTypes.number,
  doubleClickedHandler: PropTypes.number,
};

export default StreamMediaModal;
