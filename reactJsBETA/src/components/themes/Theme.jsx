/* eslint-disable no-unused-vars */
// @import Dependencies
import { useState, useRef, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

// @import constants
import generalConstants from "../../constants/generalConstants";
import cookieConstants from "../../constants/cookieConstants";

// @import components
import Pager from "../generalComponents/Pager";
import { TabItem, Slider } from "../generalComponents/TabStyle";
import { ThemesContainerHead, ThemesTab } from "./components/ThemesContainer";

export default function Theme() {
  const tabListRef = useRef();
  const [cookies, setCookie] = useCookies();
  const body = document.getElementsByTagName("body");
  const config = useSelector((state) => state.configs);

  // State variables
  const [value, setValue] = useState(0);
  const childRefs = useRef(new Map());
  const [slider, setSlider] = useState({ left: 0, right: 0 });

  const [classList, setClassList] = useState(null);

  const tabs = [generalConstants.GENERAL, generalConstants.GAMESOREIENTED];

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

  useEffect(() => {
    const body = document.getElementsByTagName("body");
    setClassList(body[0].classList[0]);
  }, [classList]);

  return (
    <>
      <div className="flex flex-col w-[1024px] mx-auto pt-[60px]">
        {/* Header */}
        <ThemesContainerHead
          heading={generalConstants.THEMES}
          description={generalConstants.THEMESDESCRPITION}
        />
        {/* Tabs */}
        <div className="relative border-line mt-[24px]" ref={tabListRef}>
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
                bounceDamping: 5,
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
            <div key={tab} className="w-full h-auto px-3">
              {i === 0 && (
                <div className="flex flex-row items-center gap-[16px] mt-[16px]">
                  <div className="group relative h-[240px] w-[322px] rounded-[8px]">
                    <img
                      src="/assets/png/Rectangle 17967 (1).png"
                      className="w-full h-full object-cover rounded-[8px]"
                    />
                    {classList === "hero" && (
                      <div className="absolute top-3 right-3 rounded-[8px] w-[122px] h-[24px] bg-[#B1E5FC] py-[3px] px-[12px]">
                        <h5 className="text-[12px] font-normal text-[#1A1C1F]">
                          Currently applied
                        </h5>
                      </div>
                    )}
                    {classList !== "hero" && (
                      <div
                        style={{
                          background:
                            "linear-gradient(360deg, #161719 0%, rgba(22, 23, 25, 0.3) 150.82%)",
                        }}
                        className="hidden group-hover:flex  absolute w-full h-[48px] rounded-lg bottom-0 left-0  flex-row justify-between items-center p-[8px]"
                      >
                        <p className="m-2 text-[#FAFBFC] ">Alien Blue</p>
                        <button
                          onClick={() => {
                            setCookie(
                              cookieConstants.THEMECOOKIES,
                              JSON.stringify("/assets/svg/home-bg.svg"),
                              {
                                path: "/",
                                maxAge: 3000000,
                                sameSite: "strict",
                              }
                            );
                          }}
                          className="bg-[#2B2E30] rounded-lg px-2 py-1 border border-[#FFFFFF1F] m-2 text-sm text-[#FAFBFC]"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="group relative h-[240px] w-[322px] rounded-[8px]">
                    <img
                      src="/assets/png/theme7.png"
                      className="w-full h-full object-cover rounded-[8px]"
                    />
                    {classList === "hero1" && (
                      <div className="absolute top-3 right-3 rounded-[8px] w-[122px] h-[24px] bg-[#B1E5FC] py-[3px] px-[12px]">
                        <h5 className="text-[12px] font-normal text-[#1A1C1F]">
                          Currently applied
                        </h5>
                      </div>
                    )}
                    {classList !== "hero1" && (
                      <div
                        style={{
                          background:
                            "linear-gradient(360deg, #161719 0%, rgba(22, 23, 25, 0.3) 150.82%)",
                        }}
                        className="hidden group-hover:flex absolute w-full h-[48px] rounded-lg bottom-0 left-0  flex-row justify-between items-center p-[8px]"
                      >
                        <p className="m-2 text-[#FAFBFC] ">Greeniswal</p>
                        <button
                          onClick={() => {
                            setCookie(
                              cookieConstants.THEMECOOKIES,
                              JSON.stringify("/assets/png/theme7.png"),
                              {
                                path: "/",
                                maxAge: 3000000,
                                sameSite: "strict",
                              }
                            );
                          }}
                          className="bg-[#2B2E30] rounded-lg px-2 py-1 border border-[#FFFFFF1F] m-2 text-sm text-[#FAFBFC]"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="group relative h-[240px] w-[322px] rounded-[8px]">
                    <img
                      src="/assets/png/theme6.jpg"
                      className="w-full h-full object-cover rounded-[8px]"
                    />
                    {classList === "hero2" ? (
                      <div className="absolute top-3 right-3 rounded-[8px] w-[122px] h-[24px] bg-[#B1E5FC] py-[3px] px-[12px]">
                        <h5 className="text-[12px] font-normal text-[#1A1C1F]">
                          Currently applied
                        </h5>
                      </div>
                    ) : null}
                    {classList !== "hero2" && (
                      <div
                        style={{
                          background:
                            "linear-gradient(360deg, #161719 0%, rgba(22, 23, 25, 0.3) 150.82%)",
                        }}
                        className="hidden group-hover:flex absolute w-full h-[48px] rounded-lg bottom-0 left-0 flex-row justify-between items-center p-[8px]"
                      >
                        <p className="m-2 text-[#FAFBFC] ">Atoms Alien</p>
                        <button
                          onClick={() => {
                            setCookie(
                              cookieConstants.THEMECOOKIES,
                              JSON.stringify("/assets/png/theme6.jpg"),
                              {
                                path: "/",
                                maxAge: 3000000,
                                sameSite: "strict",
                              }
                            );
                          }}
                          className="bg-[#2B2E30] rounded-lg px-2 py-1 border border-[#FFFFFF1F] m-2 text-sm text-[#FAFBFC]"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {i === 1 && (
                <div className="flex flex-row items-center gap-[16px] mt-[16px]">
                  <div className="group relative h-[240px] w-[322px] rounded-[8px]">
                    <img
                      src="/assets/svg/game-theme.jpeg"
                      className="w-full h-full object-cover rounded-[8px]"
                    />
                    {classList === "hero3" && (
                      <div className="absolute top-3 right-3 rounded-[8px] w-[122px] h-[24px] bg-[#B1E5FC] py-[3px] px-[12px]">
                        <h5 className="text-[12px] font-normal text-[#1A1C1F]">
                          Currently applied
                        </h5>
                      </div>
                    )}
                    {classList !== "hero3" && (
                      <div
                        style={{
                          background:
                            "linear-gradient(360deg, #161719 0%, rgba(22, 23, 25, 0.3) 150.82%)",
                        }}
                        className="hidden group-hover:flex  absolute w-full h-[48px] rounded-lg bottom-0 left-0  flex-row justify-between items-center p-[8px]"
                      >
                        <p className="m-2 text-[#FAFBFC] ">Alien Blue</p>
                        <button
                          onClick={() => {
                            setCookie(
                              cookieConstants.THEMECOOKIES,
                              JSON.stringify("/assets/svg/game-theme.jpeg"),
                              {
                                path: "/",
                                maxAge: 3000000,
                                sameSite: "strict",
                              }
                            );
                          }}
                          className="bg-[#2B2E30] rounded-lg px-2 py-1 border border-[#FFFFFF1F] m-2 text-sm text-[#FAFBFC]"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </Pager>
      </div>
    </>
  );
}
