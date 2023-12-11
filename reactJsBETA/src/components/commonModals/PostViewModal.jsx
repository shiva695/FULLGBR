import { useState } from "react";
import { MdOutlineOpenInFull } from "react-icons/md";
import CommonBtn1 from "../generalComponents/CommonBtn1";
import StreamMediaModal from "./StreamMediaModal";

// eslint-disable-next-line react/prop-types
const PostViewModal = ({ open, close, mediaType }) => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

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

  const closePathHome = (path) => {
    if (path === "/") {
      close();
    }
  };
  return (
    <>
      {open && (
        <div
          onClick={() => {
            setIsMenuModalOpen(false);
          }}
          className="fixed z-10 inset-0  bg-black bg-opacity-[80%] flex justify-center items-center
          backdrop-blur-3xl
          "
        >
          {/* Main div box */}
          <div className="model-gradient-border rounded-[16px] bg-[url('/assets/svg/Noise1.svg')] bg-no-repeat">
            <div className="flex flex-row w-[1248px] h-[704px]  rounded-[16px]  bg-[#252525] bg-opacity-[50%]">
              {/* Post img / vdo */}
              <div className="relative group w-full m-[12px] rounded-[12px]">
                <img
                  className="h-[680px] w-full rounded-[12px] object-contain"
                  src={img[scrollIdx]}
                />
                <div
                  className="hidden group-hover:block absolute bottom-3 right-3 cursor-pointer bg-[#252525] p-2 rounded-full"
                  onClick={() => {
                    setIsMediaModalOpen(true);
                  }}
                >
                  <MdOutlineOpenInFull color="white" size={20} />
                </div>
              </div>

              <div className="relative flex w-[948px] flex-col border-l-[#2B2E30] border-l-[1px] my-2 px-[24px]">
                {/* Row 1 */}
                <div className="flex flex-row w-full items-center justify-between pb-[20px] border-b-[#2B2E30] border-b-[1px]">
                  {/* Name and profile details */}
                  <div className="flex flex-row items-center gap-[10px]">
                    <img
                      className="h-10 w-10 rounded-[20px]"
                      src="/assets/svg/rating-user-avatar.svg"
                    />
                    <div className="flex flex-col gap-1">
                      <h5 className="text-[14px] font-semibold text-typo-secondary">
                        Wade Warren
                      </h5>
                      <h5 className="text-[12px] font-normal text-typo-primary">
                        Today 09:00AM
                      </h5>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-row items-center gap-[12px]">
                    <div>
                      <CommonBtn1 height="32px" width="67px" text="Follow" />
                    </div>
                    <img
                      className="w-9 h-8 hover:bg-[#2E9BFA1A] rounded-[8px] cursor-pointer"
                      src="/assets/svg/three-dots.svg"
                    />
                  </div>
                </div>

                <div className="flex flex-col  gap-[12px] border-b-[#2B2E30] border-b-[1px] pb-3 mt-3">
                  <h5 className="typo-semibold">
                    Partial excision (craterization, saucerization, or
                    diaphysectomy) bone (eg, osteomyelitis); distal phalanx of
                    finger
                  </h5>
                  <h5 className="typo-normal">
                    #gamingislife #mobilegaming #gamingclips #gamingroom
                    #consolegaming #gamingchannel #gamingsetups #twitchgaming
                    #fortnitegaming #gamingrigs
                  </h5>
                </div>

                {/* Comments */}
                <div className="flex flex-col gap-[18px] h-[330px] overscroll-contain overflow-y-scroll pb-40">
                  {/* comment - 1 */}
                  <div className="flex flex-col gap-[18px]">
                    <div className="mt-[24px] flex flex-col gap-[8px]">
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-[12px]">
                          <img
                            className="w-6 h-6 rounded-full"
                            src="/assets/svg/profile.svg"
                          />
                          <h5 className="typo-semibold">Shiva SJ</h5>
                          <h5 className="typo-normal">&#x2022;</h5>
                          <h5 className="typo-normal">14 min ago</h5>
                        </div>
                        <div className="relative">
                          <img
                            className="w-9 h-8 hover:bg-[#2E9BFA1A] rounded-[8px] cursor-pointer"
                            src="/assets/svg/three-dots.svg"
                            onClick={(ev) => {
                              ev.stopPropagation();
                              setIsMenuModalOpen(true);
                            }}
                          />
                          {isMenuModalOpen && (
                            <div className="absolute flex flex-col gap-[4px] z-10 top-10 right-0 w-[148px] h-[100px] bg-[#1A1C1F] p-2 rounded-[8px]">
                              <div className="flex flex-row  w-full h-[40px] items-center gap-[8px] py-[10px] px-[12px] hover:bg-[#2B2E30] rounded-[8px]">
                                <img
                                  className="h-6 w-6"
                                  src="/assets/svg/edit-pen.svg"
                                />
                                <h5 className="text-[14px] text-typo-secondary font-normal">
                                  Edit
                                </h5>
                              </div>
                              <div className="flex flex-row w-full h-[40px] items-center gap-[8px] py-[10px] px-[12px] hover:bg-[#2B2E30] rounded-[8px]">
                                <img
                                  className="h-6 w-6"
                                  src="/assets/svg/delete-icon.svg"
                                />
                                <h5 className="text-[14px] text-typo-secondary font-normal">
                                  Delete
                                </h5>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-[8px] ml-9 items-start">
                        <h5 className="text-typo-secondary  font-normal text-[14px]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore
                        </h5>
                        <div className="flex flex-row">
                          <div className="flex flex-row gap-[8px] items-center">
                            <div className="flex flex-row gap-[8px] items-center">
                              <img
                                className="w-[15px] h-[12.5px]"
                                src="/assets/svg/heart-gray.svg"
                              />
                              <h5 className="text-[12px] font-normal text-typo-light">
                                4 Likes
                              </h5>
                            </div>
                            <h5 className="text-[12px] font-normal text-typo-light">
                              &#x2022;
                            </h5>
                            <div className="flex flex-row gap-[8px] items-center">
                              <img
                                className="w-[15px] h-[12.5px]"
                                src="/assets/svg/comment-gray.svg"
                              />
                              <h5 className="text-[12px] font-normal text-typo-light">
                                Replay
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Replay comments */}
                    <div className="ml-9 flex flex-col gap-[8px]">
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-[12px]">
                          <img
                            className="w-6 h-6 rounded-full"
                            src="/assets/svg/rating-user-avatar.svg"
                          />
                          <h5 className="typo-semibold">Shweta sri</h5>
                          <h5 className="typo-normal">&#x2022;</h5>
                          <h5 className="typo-normal">14 min ago</h5>
                        </div>
                        <img
                          className="w-9 h-8 hover:bg-[#2E9BFA1A] rounded-[8px] cursor-pointer"
                          src="/assets/svg/three-dots.svg"
                        />
                      </div>
                      <div className="flex flex-col gap-[8px] ml-9 items-start">
                        <h5 className="text-typo-secondary  font-normal text-[14px]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore
                        </h5>
                        <div className="flex flex-row">
                          <div className="flex flex-row gap-[8px] items-center">
                            <div className="flex flex-row gap-[8px] items-center">
                              <img
                                className="w-[15px] h-[12.5px]"
                                src="/assets/svg/heart-gray.svg"
                              />
                              <h5 className="text-[12px] font-normal text-typo-light">
                                4 Likes
                              </h5>
                            </div>
                            <h5 className="text-[12px] font-normal text-typo-light">
                              &#x2022;
                            </h5>
                            <div className="flex flex-row gap-[8px] items-center">
                              <img
                                className="w-[15px] h-[12.5px]"
                                src="/assets/svg/comment-gray.svg"
                              />
                              <h5 className="text-[12px] font-normal text-typo-light">
                                Replay
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* comment - 2 */}
                  <div className="flex flex-col gap-[18px]">
                    <div className="mt-[24px] flex flex-col gap-[8px]">
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-[12px]">
                          <img
                            className="w-6 h-6 rounded-full"
                            src="/assets/svg/profile.svg"
                          />
                          <h5 className="typo-semibold">Shiva SJ</h5>
                          <h5 className="typo-normal">&#x2022;</h5>
                          <h5 className="typo-normal">14 min ago</h5>
                        </div>
                        <img
                          className="w-9 h-8 hover:bg-[#2E9BFA1A] rounded-[8px] cursor-pointer"
                          src="/assets/svg/three-dots.svg"
                        />
                      </div>
                      <div className="flex flex-col gap-[8px] ml-9 items-start">
                        <h5 className="text-typo-secondary  font-normal text-[14px]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore
                        </h5>
                        <div className="flex flex-row">
                          <div className="flex flex-row gap-[8px] items-center">
                            <div className="flex flex-row gap-[8px] items-center">
                              <img
                                className="w-[15px] h-[12.5px]"
                                src="/assets/svg/heart-gray.svg"
                              />
                              <h5 className="text-[12px] font-normal text-typo-light">
                                4 Likes
                              </h5>
                            </div>
                            <h5 className="text-[12px] font-normal text-typo-light">
                              &#x2022;
                            </h5>
                            <div className="flex flex-row gap-[8px] items-center">
                              <img
                                className="w-[15px] h-[12.5px]"
                                src="/assets/svg/comment-gray.svg"
                              />
                              <h5 className="text-[12px] font-normal text-typo-light">
                                Replay
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Replay comments */}
                    <div className="ml-9 flex flex-col gap-[8px]">
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-[12px]">
                          <img
                            className="w-6 h-6 rounded-full"
                            src="/assets/svg/rating-user-avatar.svg"
                          />
                          <h5 className="typo-semibold">Devishree</h5>
                          <h5 className="typo-normal">&#x2022;</h5>
                          <h5 className="typo-normal">14 min ago</h5>
                        </div>
                        <img
                          className="w-9 h-8 hover:bg-[#2E9BFA1A] rounded-[8px] cursor-pointer"
                          src="/assets/svg/three-dots.svg"
                        />
                      </div>
                      <div className="flex flex-col gap-[8px] ml-9 items-start">
                        <h5 className="text-typo-secondary  font-normal text-[14px]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore
                        </h5>
                        <div className="flex flex-row">
                          <div className="flex flex-row gap-[8px] items-center">
                            <div className="flex flex-row gap-[8px] items-center">
                              <img
                                className="w-[15px] h-[12.5px]"
                                src="/assets/svg/heart-gray.svg"
                              />
                              <h5 className="text-[12px] font-normal text-typo-light">
                                4 Likes
                              </h5>
                            </div>
                            <h5 className="text-[12px] font-normal text-typo-light">
                              &#x2022;
                            </h5>
                            <div className="flex flex-row gap-[8px] items-center">
                              <img
                                className="w-[15px] h-[12.5px]"
                                src="/assets/svg/comment-gray.svg"
                              />
                              <h5 className="text-[12px] font-normal text-typo-light">
                                Replay
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* comment - 3 */}
                  <div className="flex flex-col gap-[18px]">
                    <div className="mt-[24px] flex flex-col gap-[8px]">
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-[12px]">
                          <img
                            className="w-6 h-6 rounded-full"
                            src="/assets/svg/profile.svg"
                          />
                          <h5 className="typo-semibold">Shiva SJ</h5>
                          <h5 className="typo-normal">&#x2022;</h5>
                          <h5 className="typo-normal">14 min ago</h5>
                        </div>
                        <img
                          className="w-9 h-8 hover:bg-[#2E9BFA1A] rounded-[8px] cursor-pointer"
                          src="/assets/svg/three-dots.svg"
                        />
                      </div>
                      <div className="flex flex-col gap-[8px] ml-9 items-start">
                        <h5 className="text-typo-secondary  font-normal text-[14px]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore
                        </h5>
                        <div className="flex flex-row">
                          <div className="flex flex-row gap-[8px] items-center">
                            <div className="flex flex-row gap-[8px] items-center">
                              <img
                                className="w-[15px] h-[12.5px]"
                                src="/assets/svg/heart-gray.svg"
                              />
                              <h5 className="text-[12px] font-normal text-typo-light">
                                4 Likes
                              </h5>
                            </div>
                            <h5 className="text-[12px] font-normal text-typo-light">
                              &#x2022;
                            </h5>
                            <div className="flex flex-row gap-[8px] items-center">
                              <img
                                className="w-[15px] h-[12.5px]"
                                src="/assets/svg/comment-gray.svg"
                              />
                              <h5 className="text-[12px] font-normal text-typo-light">
                                Replay
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Replay comments */}
                    <div className="ml-9 flex flex-col gap-[8px]">
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-[12px]">
                          <img
                            className="w-6 h-6 rounded-full"
                            src="/assets/svg/rating-user-avatar.svg"
                          />
                          <h5 className="typo-semibold">Devishree</h5>
                          <h5 className="typo-normal">&#x2022;</h5>
                          <h5 className="typo-normal">14 min ago</h5>
                        </div>
                        <img
                          className="w-9 h-8 hover:bg-[#2E9BFA1A] rounded-[8px] cursor-pointer"
                          src="/assets/svg/three-dots.svg"
                        />
                      </div>
                      <div className="flex flex-col gap-[8px] ml-9 items-start">
                        <h5 className="text-typo-secondary  font-normal text-[14px]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore
                        </h5>
                        <div className="flex flex-row">
                          <div className="flex flex-row gap-[8px] items-center">
                            <div className="flex flex-row gap-[8px] items-center">
                              <img
                                className="w-[15px] h-[12.5px]"
                                src="/assets/svg/heart-gray.svg"
                              />
                              <h5 className="text-[12px] font-normal text-typo-light">
                                4 Likes
                              </h5>
                            </div>
                            <h5 className="text-[12px] font-normal text-typo-light">
                              &#x2022;
                            </h5>
                            <div className="flex flex-row gap-[8px] items-center">
                              <img
                                className="w-[15px] h-[12.5px]"
                                src="/assets/svg/comment-gray.svg"
                              />
                              <h5 className="text-[12px] font-normal text-typo-light">
                                Replay
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="border-b-[1px] border-[#2B2E30]"></span>
                {/* Footer */}
                <div className="absolute px-[24px] py-[8px] bottom-0 h-[116px] w-full left-0 flex flex-col gap-[18px] rounded-br-[16px]">
                  {/* Comments likes shares */}
                  <div className="flex flex-row items-center gap-[24px] mt-[6px]">
                    <div className="flex flex-row items-center gap-[8px]">
                      <div className="flex flex-row">
                        <img
                          className="h-6 w-6 mr-[-9px] z-20"
                          src="/assets/svg/thumpsUp.svg"
                        />
                        <img
                          className="h-6 w-6  z-10"
                          src="/assets/svg/heart.svg"
                        />
                        <img
                          className="h-6 w-6 ml-[-9px]  z-0"
                          src="/assets/svg/smiley.svg"
                        />
                      </div>

                      <h5 className="text-[12px] text-typo-primary font-normal">
                        64 Reactions
                      </h5>
                    </div>
                    <div className="flex flex-row items-center gap-[8px]">
                      <img
                        src="/assets/svg/comments-icon.svg"
                        className="w-4 h-4"
                      />
                      <h5 className="text-[12px] text-typo-primary font-normal">
                        12 Comments
                      </h5>
                    </div>
                    <div className="flex flex-row items-center gap-[8px]">
                      <img
                        src="/assets/svg/save-icon.svg"
                        className="w-4 h-4"
                      />
                      <h5 className="text-[12px] text-typo-primary font-normal">
                        14 Save
                      </h5>
                    </div>
                  </div>
                  {/* Type Comments */}
                  <div className="h-[56px] flex flex-row items-center justify-between w-full p-[12px]  bg-white rounded-[8px] [background:linear-gradient(180deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.1)_100%)]">
                    <textarea
                      placeholder="Add Comment"
                      className="resize-none bg-transparent outline-none text-typo-secondary w-[86%]"
                    />
                    <div>
                      <CommonBtn1 height="32px" width="54px" text="Post" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Close btn */}
          <div className="fixed top-5 right-5 cursor-pointer" onClick={close}>
            <img src="/assets/svg/close-btn.svg" className="w-3 h-3" />
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

      {isMediaModalOpen && (
        <StreamMediaModal
          open={isMediaModalOpen}
          close={() => setIsMediaModalOpen(false)}
          mediaType={"IMAGE"}
          path="post-view"
          closePathHome={closePathHome}
        />
      )}
    </>
  );
};

export default PostViewModal;
