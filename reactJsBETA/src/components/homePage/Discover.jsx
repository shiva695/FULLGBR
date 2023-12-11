// @import dependencies
import { useState, useRef, useEffect } from "react";
import PhotoAlbum from "react-photo-album";

// @import Json
import constants from "../../json/constants.json";

// @import Modals
// import PostViewModal from "../Modals/PostViewModal";
// import RightChat from "./RightChat";
// import LeftChat from "./LeftChat";
import StreamMediaModal from "../commonModals/StreamMediaModal";

// @import components
import Pager from "../generalComponents/Pager";
import { TabItem, Slider } from "../generalComponents/TabStyle";

const Discover = () => {
  const tabListRef = useRef();

  // State variables
  const [value, setValue] = useState(0);
  const childRefs = useRef(new Map());
  const [slider, setSlider] = useState({ left: 0, right: 0 });
  const [isStreamModalOpen, setIsStreamModalOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const photos = [
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
      width: 800,
      height: 800,
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
      width: 800,
      height: 800,
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
      width: 800,
      height: 1200,
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
      width: 800,
      height: 800,
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
      width: 800,
      height: 800,
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
      width: 800,
      height: 1200,
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
      width: 800,
      height: 800,
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
      width: 800,
      height: 800,
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
      width: 800,
      height: 1200,
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
      width: 800,
      height: 800,
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
      width: 800,
      height: 800,
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
      width: 800,
      height: 1200,
    },
  ];

  const tabs = [constants.POSTS, constants.ARTICLES];

  // measure our elements
  useEffect(() => {
    const target = childRefs.current.get(value);
    const container = tabListRef.current;
    if (target) {
      const cRect = container.getBoundingClientRect();

      // when container is `display: none`, width === 0.
      // ignore this case
      if (cRect.width === 0) {
        return;
      }

      const tRect = target.getBoundingClientRect();
      const left = tRect.left - cRect.left;
      const right = cRect.right - tRect.right;

      setSlider({
        hasValue: true,
        left: left + 8,
        right: right + 8,
      });
    }
  }, [value]);

  return (
    <>
      {/* <LeftChat />
      <RightChat /> */}
      <div className="flex flex-col w-[1020px] mx-auto mt-[60px] pb-[92px]">
        {/* Tabs */}
        <div className="relative border-line mt-[32px]" ref={tabListRef}>
          {tabs.map((tab, i) => (
            <TabItem
              key={tab}
              isActive={i === value}
              transition={{ duration: 0.1 }}
              ref={(el) => childRefs.current.set(i, el)}
              onClick={() => setValue(i)}
            >
              {tab}
            </TabItem>
          ))}
          {slider.hasValue && (
            <Slider
              positionTransition={{
                bounceDamping: 1,
              }}
              initial={false}
              style={{
                left: slider.left,
                right: slider.right,
              }}
            />
          )}
        </div>

        <Pager value={value}>
          {tabs.map((tab, i) => (
            <div key={tab} className="w-full h-auto px-5">
              {i === 0 && (
                <div className="mt-[16px] w-full">
                  <PhotoAlbum
                    layout="columns"
                    photos={photos}
                    columns={3}
                    spacing={10}
                    onClick={(e) => {
                      console.log(e);
                      setIdx(e.index);
                      setIsStreamModalOpen(true);
                    }}
                  />
                </div>
              )}

              {i === 1 && (
                <div className="w-full flex flex-col gap-[16px] mt-[24px]">
                  {/* card 1 */}
                  <div className="bg-gradient-to-tl from-[#252525] rounded-[16px] from-[70%] to-gray-600">
                    <div className="flex flex-row gap-[20px] bg-[#252525] bg-opacity-[100%] mt-[1px] ml-[1px] w-full h-[238px] p-[20px]  bg-[url('/assets/svg/Noise1.svg')] bg-no-repeat  items-start rounded-[16px]">
                      <img
                        className="h-[153px] w-[153px] rounded-[16px] object-cover"
                        src="/assets/svg/newsfeed-img1.svg"
                      />
                      <div className="flex flex-col w-full h-full gap-[12px]">
                        {/* line 1 */}
                        <div className="flex flex-row items-center justify-between">
                          <div className="flex flex-row items-center gap-[12px]">
                            <img
                              className="w-6 h-6"
                              src="/assets/svg/profile.svg"
                            />
                            <h5 className="text-[14px] text-typo-secondary font-normal">
                              Shiva SJ
                            </h5>
                            <h5 className="text-[14px] text-typo-primary font-normal">
                              &#x2022;
                            </h5>
                            <h5 className="text-[14px] text-typo-primary font-normal">
                              14 min ago
                            </h5>
                          </div>
                          <div className="w-[85px] h-[26px] py-[4px] px-[12px] bg-[#373A3D] rounded-[13px]">
                            <h5 className="text-[12px] font-semibold text-typo-primary">
                              2 min read
                            </h5>
                          </div>
                        </div>
                        {/* line 2 */}
                        <h1 className="text-[18px] text-typo-secondary">
                          Partial excision (craterization, saucerization, or
                          diaphysectomy) bone (eg, osteomyelitis);
                        </h1>
                        <h5 className="text-[16px] text-typo-primary font-normal">
                          Amidst the vibrant cityscape, a gentle breeze
                          whispered secrets to the leaves, painting ...
                        </h5>

                        {/* Comments likes shares */}
                        <div className="flex flex-row items-center gap-[24px] mt-[12px]">
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
                      </div>
                    </div>
                  </div>
                  {/* card 1 */}
                  <div className="bg-gradient-to-tl from-[#252525] rounded-[16px] from-[70%] to-gray-600">
                    <div className="flex flex-row gap-[20px] bg-[#252525] bg-opacity-[100%] mt-[1px] ml-[1px] w-full h-[238px] p-[20px]  bg-[url('/assets/svg/Noise1.svg')] bg-no-repeat  items-start rounded-[16px]">
                      <img
                        className="h-[153px] w-[153px] rounded-[16px] object-cover"
                        src="/assets/svg/newsfeed-img1.svg"
                      />
                      <div className="flex flex-col w-full h-full gap-[12px]">
                        {/* line 1 */}
                        <div className="flex flex-row items-center justify-between">
                          <div className="flex flex-row items-center gap-[12px]">
                            <img
                              className="w-6 h-6"
                              src="/assets/svg/profile.svg"
                            />
                            <h5 className="text-[14px] text-typo-secondary font-normal">
                              Shiva SJ
                            </h5>
                            <h5 className="text-[14px] text-typo-primary font-normal">
                              &#x2022;
                            </h5>
                            <h5 className="text-[14px] text-typo-primary font-normal">
                              14 min ago
                            </h5>
                          </div>
                          <div className="w-[85px] h-[26px] py-[4px] px-[12px] bg-[#373A3D] rounded-[13px]">
                            <h5 className="text-[12px] font-semibold text-typo-primary">
                              2 min read
                            </h5>
                          </div>
                        </div>
                        {/* line 2 */}
                        <h1 className="text-[18px] text-typo-secondary">
                          Partial excision (craterization, saucerization, or
                          diaphysectomy) bone (eg, osteomyelitis);
                        </h1>
                        <h5 className="text-[16px] text-typo-primary font-normal">
                          Amidst the vibrant cityscape, a gentle breeze
                          whispered secrets to the leaves, painting ...
                        </h5>

                        {/* Comments likes shares */}
                        <div className="flex flex-row items-center gap-[24px] mt-[12px]">
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
                      </div>
                    </div>
                  </div>
                  {/* card 1 */}
                  <div className="bg-gradient-to-tl from-[#252525] rounded-[16px] from-[70%] to-gray-600">
                    <div className="flex flex-row gap-[20px] bg-[#252525] bg-opacity-[100%] mt-[1px] ml-[1px] w-full h-[238px] p-[20px]  bg-[url('/assets/svg/Noise1.svg')] bg-no-repeat  items-start rounded-[16px]">
                      <img
                        className="h-[153px] w-[153px] rounded-[16px] object-cover"
                        src="/assets/svg/newsfeed-img1.svg"
                      />
                      <div className="flex flex-col w-full h-full gap-[12px]">
                        {/* line 1 */}
                        <div className="flex flex-row items-center justify-between">
                          <div className="flex flex-row items-center gap-[12px]">
                            <img
                              className="w-6 h-6"
                              src="/assets/svg/profile.svg"
                            />
                            <h5 className="text-[14px] text-typo-secondary font-normal">
                              Shiva SJ
                            </h5>
                            <h5 className="text-[14px] text-typo-primary font-normal">
                              &#x2022;
                            </h5>
                            <h5 className="text-[14px] text-typo-primary font-normal">
                              14 min ago
                            </h5>
                          </div>
                          <div className="w-[85px] h-[26px] py-[4px] px-[12px] bg-[#373A3D] rounded-[13px]">
                            <h5 className="text-[12px] font-semibold text-typo-primary">
                              2 min read
                            </h5>
                          </div>
                        </div>
                        {/* line 2 */}
                        <h1 className="text-[18px] text-typo-secondary">
                          Partial excision (craterization, saucerization, or
                          diaphysectomy) bone (eg, osteomyelitis);
                        </h1>
                        <h5 className="text-[16px] text-typo-primary font-normal">
                          Amidst the vibrant cityscape, a gentle breeze
                          whispered secrets to the leaves, painting ...
                        </h5>

                        {/* Comments likes shares */}
                        <div className="flex flex-row items-center gap-[24px] mt-[12px]">
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
                      </div>
                    </div>
                  </div>
                  {/* card 1 */}
                  <div className="bg-gradient-to-tl from-[#252525] rounded-[16px] from-[70%] to-gray-600">
                    <div className="flex flex-row gap-[20px] bg-[#252525] bg-opacity-[100%] mt-[1px] ml-[1px] w-full h-[238px] p-[20px]  bg-[url('/assets/svg/Noise1.svg')] bg-no-repeat  items-start rounded-[16px]">
                      <img
                        className="h-[153px] w-[153px] rounded-[16px] object-cover"
                        src="/assets/svg/newsfeed-img1.svg"
                      />
                      <div className="flex flex-col w-full h-full gap-[12px]">
                        {/* line 1 */}
                        <div className="flex flex-row items-center justify-between">
                          <div className="flex flex-row items-center gap-[12px]">
                            <img
                              className="w-6 h-6"
                              src="/assets/svg/profile.svg"
                            />
                            <h5 className="text-[14px] text-typo-secondary font-normal">
                              Shiva SJ
                            </h5>
                            <h5 className="text-[14px] text-typo-primary font-normal">
                              &#x2022;
                            </h5>
                            <h5 className="text-[14px] text-typo-primary font-normal">
                              14 min ago
                            </h5>
                          </div>
                          <div className="w-[85px] h-[26px] py-[4px] px-[12px] bg-[#373A3D] rounded-[13px]">
                            <h5 className="text-[12px] font-semibold text-typo-primary">
                              2 min read
                            </h5>
                          </div>
                        </div>
                        {/* line 2 */}
                        <h1 className="text-[18px] text-typo-secondary">
                          Partial excision (craterization, saucerization, or
                          diaphysectomy) bone (eg, osteomyelitis);
                        </h1>
                        <h5 className="text-[16px] text-typo-primary font-normal">
                          Amidst the vibrant cityscape, a gentle breeze
                          whispered secrets to the leaves, painting ...
                        </h5>

                        {/* Comments likes shares */}
                        <div className="flex flex-row items-center gap-[24px] mt-[12px]">
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
                      </div>
                    </div>
                  </div>
                  {/* card 1 */}
                  <div className="bg-gradient-to-tl from-[#252525] rounded-[16px] from-[70%] to-gray-600">
                    <div className="flex flex-row gap-[20px] bg-[#252525] bg-opacity-[100%] mt-[1px] ml-[1px] w-full h-[238px] p-[20px]  bg-[url('/assets/svg/Noise1.svg')] bg-no-repeat  items-start rounded-[16px]">
                      <img
                        className="h-[153px] w-[153px] rounded-[16px] object-cover"
                        src="/assets/svg/newsfeed-img1.svg"
                      />
                      <div className="flex flex-col w-full h-full gap-[12px]">
                        {/* line 1 */}
                        <div className="flex flex-row items-center justify-between">
                          <div className="flex flex-row items-center gap-[12px]">
                            <img
                              className="w-6 h-6"
                              src="/assets/svg/profile.svg"
                            />
                            <h5 className="text-[14px] text-typo-secondary font-normal">
                              Shiva SJ
                            </h5>
                            <h5 className="text-[14px] text-typo-primary font-normal">
                              &#x2022;
                            </h5>
                            <h5 className="text-[14px] text-typo-primary font-normal">
                              14 min ago
                            </h5>
                          </div>
                          <div className="w-[85px] h-[26px] py-[4px] px-[12px] bg-[#373A3D] rounded-[13px]">
                            <h5 className="text-[12px] font-semibold text-typo-primary">
                              2 min read
                            </h5>
                          </div>
                        </div>
                        {/* line 2 */}
                        <h1 className="text-[18px] text-typo-secondary">
                          Partial excision (craterization, saucerization, or
                          diaphysectomy) bone (eg, osteomyelitis);
                        </h1>
                        <h5 className="text-[16px] text-typo-primary font-normal">
                          Amidst the vibrant cityscape, a gentle breeze
                          whispered secrets to the leaves, painting ...
                        </h5>

                        {/* Comments likes shares */}
                        <div className="flex flex-row items-center gap-[24px] mt-[12px]">
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
                      </div>
                    </div>
                  </div>
                  {/* card 1 */}
                  <div className="bg-gradient-to-tl from-[#252525] rounded-[16px] from-[70%] to-gray-600">
                    <div className="flex flex-row gap-[20px] bg-[#252525] bg-opacity-[100%] mt-[1px] ml-[1px] w-full h-[238px] p-[20px]  bg-[url('/assets/svg/Noise1.svg')] bg-no-repeat  items-start rounded-[16px]">
                      <img
                        className="h-[153px] w-[153px] rounded-[16px] object-cover"
                        src="/assets/svg/newsfeed-img1.svg"
                      />
                      <div className="flex flex-col w-full h-full gap-[12px]">
                        {/* line 1 */}
                        <div className="flex flex-row items-center justify-between">
                          <div className="flex flex-row items-center gap-[12px]">
                            <img
                              className="w-6 h-6"
                              src="/assets/svg/profile.svg"
                            />
                            <h5 className="text-[14px] text-typo-secondary font-normal">
                              Shiva SJ
                            </h5>
                            <h5 className="text-[14px] text-typo-primary font-normal">
                              &#x2022;
                            </h5>
                            <h5 className="text-[14px] text-typo-primary font-normal">
                              14 min ago
                            </h5>
                          </div>
                          <div className="w-[85px] h-[26px] py-[4px] px-[12px] bg-[#373A3D] rounded-[13px]">
                            <h5 className="text-[12px] font-semibold text-typo-primary">
                              2 min read
                            </h5>
                          </div>
                        </div>
                        {/* line 2 */}
                        <h1 className="text-[18px] text-typo-secondary">
                          Partial excision (craterization, saucerization, or
                          diaphysectomy) bone (eg, osteomyelitis);
                        </h1>
                        <h5 className="text-[16px] text-typo-primary font-normal">
                          Amidst the vibrant cityscape, a gentle breeze
                          whispered secrets to the leaves, painting ...
                        </h5>

                        {/* Comments likes shares */}
                        <div className="flex flex-row items-center gap-[24px] mt-[12px]">
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
                      </div>
                    </div>
                  </div>
                  {/* card 1 */}
                  <div className="bg-gradient-to-tl from-[#252525] rounded-[16px] from-[70%] to-gray-600">
                    <div className="flex flex-row gap-[20px] bg-[#252525] bg-opacity-[100%] mt-[1px] ml-[1px] w-full h-[238px] p-[20px]  bg-[url('/assets/svg/Noise1.svg')] bg-no-repeat  items-start rounded-[16px]">
                      <img
                        className="h-[153px] w-[153px] rounded-[16px] object-cover"
                        src="/assets/svg/newsfeed-img1.svg"
                      />
                      <div className="flex flex-col w-full h-full gap-[12px]">
                        {/* line 1 */}
                        <div className="flex flex-row items-center justify-between">
                          <div className="flex flex-row items-center gap-[12px]">
                            <img
                              className="w-6 h-6"
                              src="/assets/svg/profile.svg"
                            />
                            <h5 className="text-[14px] text-typo-secondary font-normal">
                              Shiva SJ
                            </h5>
                            <h5 className="text-[14px] text-typo-primary font-normal">
                              &#x2022;
                            </h5>
                            <h5 className="text-[14px] text-typo-primary font-normal">
                              14 min ago
                            </h5>
                          </div>
                          <div className="w-[85px] h-[26px] py-[4px] px-[12px] bg-[#373A3D] rounded-[13px]">
                            <h5 className="text-[12px] font-semibold text-typo-primary">
                              2 min read
                            </h5>
                          </div>
                        </div>
                        {/* line 2 */}
                        <h1 className="text-[18px] text-typo-secondary">
                          Partial excision (craterization, saucerization, or
                          diaphysectomy) bone (eg, osteomyelitis);
                        </h1>
                        <h5 className="text-[16px] text-typo-primary font-normal">
                          Amidst the vibrant cityscape, a gentle breeze
                          whispered secrets to the leaves, painting ...
                        </h5>

                        {/* Comments likes shares */}
                        <div className="flex flex-row items-center gap-[24px] mt-[12px]">
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
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Pager>
      </div>

      {isStreamModalOpen && (
        <StreamMediaModal
          open={isStreamModalOpen}
          close={() => setIsStreamModalOpen(false)}
          mediaType={"IMAGE"}
          path="post-view"
          idx={idx}
        />
      )}
    </>
  );
};

export default Discover;
