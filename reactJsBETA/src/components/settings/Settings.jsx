/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// @import dependencies

import { useEffect, useRef, useState } from "react";
import { Collapse } from "react-collapse";
import OTPInput from "react-otp-input";
import { motion } from "framer-motion";
import styled from "styled-components";

// @import Json
import constants from "../../json/constants.json";

// @import Modals
import VerifyAccountModal from "./modals/VerifyAccountModal";

// @import components
import ToggleSwitch from "../inputComponents/ToggleSwitch";
import CommonModal from "../generalComponents/CommonModal";
import CommonBtn1 from "../generalComponents/CommonBtn1";
import Pager from "../generalComponents/Pager";
import { TabItem, Slider } from "../generalComponents/TabStyle";

export default function Settings() {
  // Refs
  const tabListRef = useRef();
  const childRefs = useRef(new Map());

  // State variables
  const [value, setValue] = useState(0);
  const [slider, setSlider] = useState({ left: 0, right: 0 });
  const [isPasswordCollapse, setIsPasswordCollapse] = useState(false);
  const [isTwoStepVerifyModal, setIsTwoStepVerifyModal] = useState(false);
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
  const [isAddPhoneModalOpen, setIsAddPhoneModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isAddGameModalOpen, setIsAddGameModalOpen] = useState(false);
  const [invokeCloseModals, setInvokeCloseModals] = useState(false);
  const [verification, setVerification] = useState("");
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  // tabs array
  const tabs = [
    constants.GENERAL,
    constants.ACCOUNTSETTINGS,
    constants.SECURITY,
    constants.CONNECTIONS,
    constants.NOTIFICATIONS,
    constants.HELP,
  ];

  // measure our elements
  useEffect(() => {
    const target = childRefs.current.get(value);
    const container = tabListRef.current;
    if (target) {
      const cRect = container.getBoundingClientRect();
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
    const handleCloseModals = () => {
      setIsTwoStepVerifyModal(false);
      setIsSmsModalOpen(false);
      setIsAddPhoneModalOpen(false);
      setIsOtpModalOpen(false);
      setIsPasswordModalOpen(false);
      setIsSuccessModalOpen(false);
      setIsAddGameModalOpen(false);
      setIsVerifyModalOpen(false);
    };

    if (invokeCloseModals) {
      setInvokeCloseModals(false);
      handleCloseModals();
    }
  }, [invokeCloseModals]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <>
      <div className="flex flex-col w-[1024px] mx-auto mt-[92px] pb-[92px]">
        {/* header */}
        <div className="items-center flex flex-row gap-[8px]">
          <img
            src="/assets/svg/settingsIcon.svg"
            className="w-[26px] h-[26px]"
          />
          <h4 className="font-semibold text-[28px]  text-typo-secondary">
            Account Settings
          </h4>
        </div>
        <p className="w-[616px] h-[24px] mt-[12px] font-normal text-[16px] leading-[24px] text-[#B5B9BD]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </p>

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

        {/* Pages */}
        <Pager value={value}>
          {tabs.map((tab, i) => (
            <div key={tab} className="w-full h-auto px-3">
              {/* General */}
              {i === 0 && (
                <>
                  <div className="w-[1000px] h-[328px] mt-[20px] p-6 bg-neutral-800 bg-opacity-30 rounded-2xl shadow border border-neutral-600 border-opacity-30 backdrop-blur-[80px] flex-col justify-start items-start gap-5 inline-flex">
                    <div className="self-stretch justify-start items-center inline-flex">
                      <div className="w-[177px] text-typo-primary text-sm font-normal  leading-tight">
                        Name
                      </div>
                      <div className="grow shrink basis-0 h-10 px-4 py-2.5 rounded-lg border border-[#2B2E30] justify-start items-center gap-2 flex">
                        <input className="bg-transparent outline-none text-typo-secondary w-full" />
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-center inline-flex">
                      <div className="w-[177px] text-typo-primary text-sm font-normal  leading-tight">
                        User Name
                      </div>
                      <div className="grow shrink basis-0 h-10 px-4 py-2.5 rounded-lg border border-[#2B2E30] justify-start items-center gap-2 flex">
                        <input className="bg-transparent outline-none text-typo-secondary w-full" />
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-center inline-flex">
                      <div className="w-[177px] text-typo-primary text-sm font-normal  leading-tight">
                        Gender
                      </div>
                      <div className="grow shrink basis-0 h-10 px-4 py-2.5 rounded-lg border border-[#2B2E30] justify-start items-center gap-2 flex">
                        <input className="bg-transparent outline-none text-typo-secondary w-full" />
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-center inline-flex">
                      <div className="w-[177px] text-typo-primary text-sm font-normal  leading-tight">
                        Date of Birth
                      </div>
                      <div className="grow shrink basis-0 h-10 px-4 py-2.5 rounded-lg border border-[#2B2E30] justify-start items-center gap-2 flex">
                        <input className="bg-transparent outline-none text-typo-secondary w-full" />
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-center inline-flex">
                      <div className="w-[177px] text-typo-primary text-sm font-normal  leading-tight">
                        Account type
                      </div>
                      <div className="grow shrink basis-0 h-10 px-4 py-2.5 rounded-lg border border-[#2B2E30] justify-start items-center gap-2 flex">
                        <input className="bg-transparent outline-none text-typo-secondary w-full" />
                      </div>
                    </div>
                  </div>

                  <div className="w-[1000px] h-[454px] mt-[13px] p-6 bg-neutral-800 bg-opacity-30 rounded-2xl shadow border border-neutral-600 border-opacity-30 backdrop-blur-[80px] flex-col justify-start items-start gap-5 inline-flex">
                    <h5 className="text-[18px] font-semibold text-typo-primary">
                      Social Links
                    </h5>

                    <div className="flex flex-col mt-[12px] w-full gap-[20px]">
                      <div className="self-stretch justify-start items-center inline-flex">
                        <div className="w-[177px] flex flex-row gap-[6px] items-center">
                          <img
                            className="h-8 w-8"
                            src="/assets/svg/facebookWhite.svg"
                          />
                          <div className="text-typo-primary text-sm font-normal  leading-tight">
                            Facebook
                          </div>
                        </div>
                        <div className="grow shrink basis-0 h-10 px-4 py-2.5 rounded-lg border border-[#2B2E30] justify-start items-center gap-2 flex">
                          <input className="bg-transparent outline-none text-typo-secondary w-full" />
                        </div>
                      </div>
                      <div className="self-stretch justify-start items-center inline-flex">
                        <div className="w-[177px] flex flex-row gap-[6px] items-center">
                          <img
                            className="h-8 w-8"
                            src="/assets/svg/twitterWhite.svg"
                          />
                          <div className="text-typo-primary text-sm font-normal  leading-tight">
                            Twitter
                          </div>
                        </div>
                        <div className="grow shrink basis-0 h-10 px-4 py-2.5 rounded-lg border border-[#2B2E30] justify-start items-center gap-2 flex">
                          <input className="bg-transparent outline-none text-typo-secondary w-full" />
                        </div>
                      </div>
                      <div className="self-stretch justify-start items-center inline-flex">
                        <div className="w-[177px] flex flex-row gap-[6px] items-center">
                          <img
                            className="h-8 w-8"
                            src="/assets/svg/instagramWhite.svg"
                          />
                          <div className="text-typo-primary text-sm font-normal  leading-tight">
                            Instagram
                          </div>
                        </div>
                        <div className="grow shrink basis-0 h-10 px-4 py-2.5 rounded-lg border border-[#2B2E30] justify-start items-center gap-2 flex">
                          <input className="bg-transparent outline-none text-typo-secondary w-full" />
                        </div>
                      </div>
                      <div className="self-stretch justify-start items-center inline-flex">
                        <div className="w-[177px] flex flex-row gap-[6px] items-center">
                          <img
                            className="h-8 w-8"
                            src="/assets/svg/discordWhite.svg"
                          />
                          <div className="text-typo-primary text-sm font-normal  leading-tight">
                            Discord
                          </div>
                        </div>
                        <div className="grow shrink basis-0 h-10 px-4 py-2.5 rounded-lg border border-[#2B2E30] justify-start items-center gap-2 flex">
                          <input className="bg-transparent outline-none text-typo-secondary w-full" />
                        </div>
                      </div>
                      <div className="self-stretch justify-start items-center inline-flex">
                        <div className="w-[177px] flex flex-row gap-[6px] items-center">
                          <img
                            className="h-8 w-8"
                            src="/assets/svg/youtubeWhite.svg"
                          />
                          <div className="text-typo-primary text-sm font-normal leading-tight">
                            Youtube
                          </div>
                        </div>
                        <div className="grow shrink basis-0 h-10 px-4 py-2.5 rounded-lg border border-[#2B2E30] justify-start items-center gap-2 flex">
                          <input className="bg-transparent outline-none text-typo-secondary w-full" />
                        </div>
                      </div>
                      {/* Add more save changes */}
                      <div className="flex flex-row items-center justify-end w-full gap-[16px] mt-[12px]">
                        <div className="flex justify-center items-center w-[89px] h-[32px] py-[6px] px-[12px] rounded-lg bg-[#2B2E30]">
                          <h5 className="text-sm text-white font-normal">
                            Add More
                          </h5>
                        </div>
                        <div className="flex justify-center items-center w-[119px] h-[32px] py-[6px] px-[12px] rounded-lg bg-[#2E9BFA]">
                          <h5 className="text-sm text-white font-normal">
                            Save Changes
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-[1000px] h-[266px] p-6 bg-neutral-800 bg-opacity-30 rounded-2xl shadow border border-neutral-600 border-opacity-30 backdrop-blur-[80px] flex-col justify-start items-start gap-4 inline-flex mt-[16px]">
                    <div className="text-typo-primary text-lg font-semibold">
                      Account disable & termination
                    </div>
                    <div className="self-stretch h-44 flex-col justify-start items-end gap-8 flex">
                      <div className="self-stretch justify-between items-end inline-flex">
                        <div className="flex-col justify-start items-start gap-2 inline-flex">
                          <div className="text-typo-secondary text-base font-semibold  leading-normal">
                            Disable Account
                          </div>
                          <div className="w-[352px] text-gray-400 text-sm font-normal leading-tight">
                            Disabling your account means you can recover it at
                            any time after taking this action
                          </div>
                        </div>
                        <div className="px-3 py-1.5 bg-[#2B2E30] rounded-lg justify-center items-center gap-2 flex">
                          <div className="text-right text-white text-sm font-normal  leading-tight">
                            Disable Account
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch justify-between items-end inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                          <div className="text-typo-secondary text-base font-semibold  leading-normal">
                            Terminate Account
                          </div>
                          <div className="w-[352px] text-gray-400 text-sm font-normal  leading-tight">
                            Terminating your account means you can not recover
                            it at any time after taking this action
                          </div>
                        </div>
                        <div className="px-3 py-1.5 bg-[#FF523B] rounded-lg  justify-center items-center gap-2 flex">
                          <div className="text-right text-white text-sm font-normal  leading-tight">
                            Terminate Account
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Privacy */}
              {i === 1 && (
                <>
                  <div className="w-[1000px] h-[764px] mt-[20px] p-6 bg-neutral-800 bg-opacity-30 rounded-2xl shadow border border-neutral-600 border-opacity-30 backdrop-blur-[80px] flex-col justify-start items-start gap-8 inline-flex">
                    {/* private account */}
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex flex-row items-center justify-between">
                        <h5 className="typo-semibold">Verify Account</h5>
                        <div
                          className="flex items-center justify-center w-[93px] h-[40px] bg-[#2B2E30] py-[10px] pl-[16px] pr-[12px] rounded-[8px] cursor-pointer"
                          onClick={() => {
                            setIsVerifyModalOpen(true);
                          }}
                        >
                          <div className="flex flex-row items-center justify-center gap-3">
                            <h5 className="text-sm font-semibold text-typo-primary">
                              Verify
                            </h5>
                            <img
                              className="h-[20px] w-[20px]"
                              src="/assets/svg/arrow-right.svg"
                            />
                          </div>
                        </div>
                      </div>
                      <h5 className="typo-normal w-[610px]">
                        When your account is private, only people you approve
                        can see your photos and videos on Instagram. Your
                        existing followers won&apos;t be affected.
                      </h5>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex flex-row items-center justify-between">
                        <h5 className="typo-semibold">Private Account</h5>
                        <ToggleSwitch />
                      </div>
                      <h5 className="typo-normal w-[610px]">
                        When your account is private, only people you approve
                        can see your photos and videos on Instagram. Your
                        existing followers won&apos;t be affected.
                      </h5>
                    </div>
                    {/* Activity Status */}
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex flex-row items-center justify-between">
                        <h5 className="typo-semibold">Activity Status</h5>
                        <ToggleSwitch />
                      </div>
                      <h5 className="typo-normal w-[610px]">
                        Allow accounts you follow and anyone you message to see
                        when you were last active or are currently active on
                        Instagram apps. When this is turned off, you won&apos;t
                        be able to see the activity status of other accounts.
                        Learn more
                      </h5>
                    </div>
                    {/* story sharing */}
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex flex-row items-center justify-between">
                        <h5 className="typo-semibold">Story Sharing</h5>
                        <ToggleSwitch />
                      </div>
                      <h5 className="typo-normal w-[610px]">
                        Let people share your story as messages
                      </h5>
                    </div>
                    {/* Likes and Views */}
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex flex-row items-center justify-between">
                        <h5 className="typo-semibold">Likes and Views</h5>
                        <ToggleSwitch />
                      </div>
                      <h5 className="typo-normal w-[610px]">
                        You won't see the total number of likes and views on
                        posts from other accounts. You can hide like counts on
                        your own posts when you create them by going to Advanced
                        Settings and turning on "Hide Like and View Counts on"
                      </h5>
                    </div>
                    {/* mentions */}
                    <div className="flex flex-row items-start justify-between w-full">
                      <div className="flex flex-col gap-2">
                        <h5 className="typo-semibold">Mentions</h5>
                        <h5 className="typo-normal w-[610px]">
                          Who can mention you on posts, comments etc
                        </h5>
                      </div>
                      <div className="flex items-center justify-center w-[144px] h-[40px] bg-[#2B2E30] py-[10px] px-[12px] rounded-[8px]">
                        <div className="flex flex-row items-center justify-center gap-3">
                          <img
                            className="h-[18px] w-[18px]"
                            src="/assets/svg/group-white.svg"
                          />
                          <h5 className="text-sm font-semibold text-typo-primary">
                            Everyone
                          </h5>
                          <img
                            className="h-[10px] w-[10px]"
                            src="/assets/svg/downArrow.svg"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Tags */}
                    <div className="flex flex-row items-start justify-between w-full">
                      <div className="flex flex-col gap-2">
                        <h5 className="typo-semibold">Tags</h5>
                        <h5 className="typo-normal w-[610px]">
                          Allow tags from{" "}
                        </h5>
                      </div>
                      <div className="flex items-center justify-center w-[144px] h-[40px] bg-[#2B2E30] py-[10px] px-[12px] rounded-[8px]">
                        <div className="flex flex-row items-center justify-center gap-3">
                          <img
                            className="h-[18px] w-[18px]"
                            src="/assets/svg/group-white.svg"
                          />
                          <h5 className="text-sm font-semibold text-typo-primary">
                            Everyone
                          </h5>
                          <img
                            className="h-[10px] w-[10px]"
                            src="/assets/svg/downArrow.svg"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Filter Comments */}
                    <div className="flex flex-row  w-full">
                      <div className="flex flex-col gap-2 w-full">
                        <h5 className="typo-semibold">Filter Your Comments</h5>
                        <h5 className="typo-normal w-[610px]">
                          Hide comments that contain any of the words or phrases
                          you type above from your posts.
                        </h5>
                        <div className="flex flex-row gap-[10px] h-[48px] w-full rounded-lg py-[12px] px-[16px] border-[#2B2E30] border-[1px]">
                          <div className="h-[24px] w-[72px] flex flex-row items-center justify-center bg-[#212426] rounded-[4px]">
                            <div className="flex flex-row items-center gap-2">
                              <h5 className="text-sm font-normal text-typo-secondary">
                                Fuck
                              </h5>
                              <img
                                className="h-2 w-2"
                                src="/assets/svg/close-btn.svg"
                              />
                            </div>
                          </div>
                          <div className="h-[24px] w-[72px] flex flex-row items-center justify-center bg-[#212426] rounded-[4px]">
                            <div className="flex flex-row items-center gap-2">
                              <h5 className="text-sm font-normal text-typo-secondary">
                                Shit
                              </h5>
                              <img
                                className="h-2 w-2"
                                src="/assets/svg/close-btn.svg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-[1000px] h-auto mt-[20px] p-6 bg-neutral-800 bg-opacity-30 rounded-2xl shadow border border-neutral-600 border-opacity-30 backdrop-blur-[80px] flex-col justify-start items-start gap-8 inline-flex">
                    <div className="flex flex-col gap-[8px]">
                      <h5 className="text-lg font-semibold text-typo-primary">
                        Blocked Users
                      </h5>
                      <h5 className="text-sm font-normal text-typo-primary">
                        Visit our help center and to know more about privacy and
                        settings
                      </h5>
                    </div>

                    <div className="flex flex-row items-center justify-between flex-wrap gap-y-6">
                      {/* card - 1 */}
                      <div className="w-[464px] h-[72px] flex flex-row py-[12px] px-[24px] border-[1px] border-[#2B2E30] justify-between items-center rounded-[12px]">
                        <div className="flex flex-row items-center gap-[12px]">
                          <img
                            className="h-[48px] w-[48px] object-cover rounded-full"
                            src="/assets/svg/newsfeed-img1.svg"
                          />
                          <h5 className="typo-semibold">Glenn Maxwell</h5>
                        </div>
                        <div className="flex justify-center items-center w-[89px] h-[32px] py-[6px] px-[12px] rounded-lg bg-[#2B2E30]">
                          <h5 className="text-sm text-white font-normal">
                            Unblock
                          </h5>
                        </div>
                      </div>
                      {/* card - 2 */}
                      <div className="w-[464px] h-[72px] flex flex-row py-[12px] px-[24px] border-[1px] border-[#2B2E30] justify-between items-center rounded-[12px]">
                        <div className="flex flex-row items-center gap-[12px]">
                          <img
                            className="h-[48px] w-[48px] object-cover rounded-full"
                            src="/assets/svg/newsfeed-img1.svg"
                          />
                          <h5 className="typo-semibold">Glenn Maxwell</h5>
                        </div>
                        <div className="flex justify-center items-center w-[89px] h-[32px] py-[6px] px-[12px] rounded-lg bg-[#2B2E30]">
                          <h5 className="text-sm text-white font-normal">
                            Unblock
                          </h5>
                        </div>
                      </div>
                      {/* card - 3 */}
                      <div className="w-[464px] h-[72px] flex flex-row py-[12px] px-[24px] border-[1px] border-[#2B2E30] justify-between items-center rounded-[12px]">
                        <div className="flex flex-row items-center gap-[12px]">
                          <img
                            className="h-[48px] w-[48px] object-cover rounded-full"
                            src="/assets/svg/newsfeed-img1.svg"
                          />
                          <h5 className="typo-semibold">Glenn Maxwell</h5>
                        </div>
                        <div className="flex justify-center items-center w-[89px] h-[32px] py-[6px] px-[12px] rounded-lg bg-[#2B2E30]">
                          <h5 className="text-sm text-white font-normal">
                            Unblock
                          </h5>
                        </div>
                      </div>
                      {/* card - 4 */}
                      <div className="w-[464px] h-[72px] flex flex-row py-[12px] px-[24px] border-[1px] border-[#2B2E30] justify-between items-center rounded-[12px]">
                        <div className="flex flex-row items-center gap-[12px]">
                          <img
                            className="h-[48px] w-[48px] object-cover rounded-full"
                            src="/assets/svg/newsfeed-img1.svg"
                          />
                          <h5 className="typo-semibold">Glenn Maxwell</h5>
                        </div>
                        <div className="flex justify-center items-center w-[89px] h-[32px] py-[6px] px-[12px] rounded-lg bg-[#2B2E30]">
                          <h5 className="text-sm text-white font-normal">
                            Unblock
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Change password */}
              {i === 2 && (
                <>
                  <div className="w-[1000px] h-auto mt-[20px] p-6 bg-neutral-800 bg-opacity-30 rounded-2xl shadow border border-neutral-600 border-opacity-30 backdrop-blur-[80px] flex-col justify-start items-start gap-8 inline-flex">
                    <h5 className="text-typo-secondary font-semibold text-[16px]">
                      Mail & Phone number
                    </h5>

                    <div className="flex flex-col gap-[20px]">
                      {/* Row 1 */}
                      <div className="flex flex-row gap-[16px] items-center">
                        <div className="flex flex-row items-center justify-center">
                          <h5 className="w-[177px] typo-normal">Email ID</h5>
                          <div className="w-[615px] rounded-[8px] h-[40px] py-[10px] px-[16px] border-[1px] border-[#2B2E30]">
                            <input className="w-full bg-transparent outline-none text-typo-secondary" />
                          </div>
                        </div>
                        {/* Add more */}
                        <div className="flex justify-center items-center w-[144px] h-[32px] py-[6px] px-[12px] rounded-lg bg-[#2B2E30]">
                          <h5 className="text-sm text-white font-normal">
                            Add More
                          </h5>
                        </div>
                      </div>
                      {/* Row 2 */}
                      <div className="flex flex-row gap-[16px] items-center">
                        <div className="flex flex-row items-center justify-center">
                          <h5 className="w-[177px] typo-normal">
                            New Email ID
                          </h5>
                          <div className="w-[615px] rounded-[8px] h-[40px] py-[10px] px-[16px] border-[1px] border-[#2B2E30]">
                            <input
                              className="w-full bg-transparent outline-none text-typo-secondary"
                              placeholder="Enter New email ID"
                            />
                          </div>
                        </div>
                        {/* Add more */}
                        <div className="flex justify-center items-center w-[144px] h-[32px] py-[6px] px-[12px] rounded-lg bg-transparent">
                          <h5 className="text-sm text-typo-blue font-normal">
                            verify
                          </h5>
                        </div>
                      </div>
                      {/* Row 3 */}
                      <div className="flex flex-row gap-[16px] items-center">
                        <div className="flex flex-row items-center justify-center">
                          <h5 className="w-[177px] typo-normal">
                            Phone Number
                          </h5>
                          <div className="w-[615px] rounded-[8px] h-[40px] py-[10px] px-[16px] border-[1px] border-[#2B2E30]">
                            <input
                              className="w-full bg-transparent outline-none text-typo-secondary"
                              placeholder="Add phone number"
                            />
                          </div>
                        </div>
                        {/* Add more */}
                        <div className="flex justify-center items-center w-[144px] h-[32px] py-[6px] px-[12px] rounded-lg bg-transparent">
                          <h5 className="text-sm text-typo-blue font-normal">
                            verify
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`w-[1000px] ${
                      isPasswordCollapse ? "h-auto" : "h-[80px]"
                    } mt-[24px] p-6 bg-neutral-800 bg-opacity-30 rounded-2xl shadow border border-neutral-600 border-opacity-30 backdrop-blur-[80px] flex-col justify-start items-start gap-8 inline-flex`}
                  >
                    <div className="flex flex-row w-full items-center justify-between">
                      <h5 className="typo-semibold">Change Password</h5>
                      <img
                        className={`h-[15px] w-[13px] cursor-pointer ${
                          isPasswordCollapse ? "rotate-180" : ""
                        }`}
                        src="/assets/svg/downArrow.svg"
                        onClick={() =>
                          setIsPasswordCollapse(!isPasswordCollapse)
                        }
                      />
                    </div>
                    <Collapse isOpened={isPasswordCollapse}>
                      <div className="flex flex-col  gap-[20px] w-[950px]">
                        {/* Current password */}
                        <div className="self-stretch justify-start items-center inline-flex w-full">
                          <div className="w-[177px] flex flex-row gap-[10px] items-center">
                            <h5 className="text-typo-primary text-sm font-normal  leading-tight">
                              Current Password
                            </h5>
                            <img
                              src="/assets/svg/infoIcon.svg"
                              className="w-[16px] h-[16px]"
                            />
                          </div>
                          <div className="grow shrink basis-0 h-10 px-4 py-2.5 rounded-lg border border-[#2B2E30] justify-start items-center gap-2 flex w-full">
                            <input className="bg-transparent outline-none text-typo-secondary w-full" />
                            <img
                              className="h-5 w-5"
                              src="/assets/svg/eyecross.svg"
                            />
                          </div>
                        </div>
                        {/* New password */}
                        <div className="self-stretch justify-start items-center inline-flex w-full">
                          <div className="w-[177px] flex flex-row gap-[10px] items-center">
                            <h5 className="text-typo-primary text-sm font-normal leading-tight">
                              New Password
                            </h5>
                            <img
                              src="/assets/svg/infoIcon.svg"
                              className="w-[16px] h-[16px]"
                            />
                          </div>
                          <div className="grow shrink basis-0 h-10 px-4 py-2.5 rounded-lg border border-[#2B2E30] justify-start items-center gap-2 flex w-full">
                            <input className="bg-transparent outline-none text-typo-secondary w-full" />
                            <img
                              className="h-5 w-5"
                              src="/assets/svg/eyecross.svg"
                            />
                          </div>
                        </div>
                        {/* Renter password */}
                        <div className="self-stretch justify-start items-center inline-flex w-full">
                          <div className="w-[177px] flex flex-row gap-[10px] items-center">
                            <h5 className="text-typo-primary text-sm font-normal leading-tight">
                              Re-enter Password
                            </h5>
                            <img
                              src="/assets/svg/infoIcon.svg"
                              className="w-[16px] h-[16px]"
                            />
                          </div>
                          <div className="grow shrink basis-0 h-10 px-4 py-2.5 rounded-lg border border-[#2B2E30] justify-start items-center gap-2 flex w-full">
                            <input className="bg-transparent outline-none text-typo-secondary w-full" />
                            <img
                              className="h-5 w-5"
                              src="/assets/svg/eyecross.svg"
                            />
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                          <h5 className="font-normal text-sm text-typo-blue">
                            Forget Password?
                          </h5>
                          <div className="flex justify-center items-center w-[144px] h-[32px] py-[6px] px-[12px] rounded-lg bg-[#2E9BFA]">
                            <h5 className="text-sm text-white font-normal">
                              Change Password
                            </h5>
                          </div>
                        </div>
                      </div>
                    </Collapse>
                  </div>

                  <div
                    className={`w-[1000px] h-[80px]
                mt-[24px] p-6 bg-neutral-800 bg-opacity-30 rounded-2xl shadow border border-neutral-600 border-opacity-30 backdrop-blur-[80px] flex-col justify-start items-start gap-8 inline-flex`}
                  >
                    <div className="flex flex-row w-full items-center justify-between">
                      <h5 className="typo-semibold">Two-Step Verification</h5>
                      <div
                        onClick={() => setIsTwoStepVerifyModal(true)}
                        className="flex justify-center items-center w-[89px] h-[32px] py-[6px] px-[12px] rounded-lg bg-[#2B2E30] cursor-pointer"
                      >
                        <h5 className="text-sm text-white font-normal">
                          Turn on
                        </h5>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Tab connections */}
              {i === 3 && (
                <>
                  <div className="w-[1000px] h-auto mt-[20px] p-6 bg-neutral-800 bg-opacity-30 rounded-2xl shadow border border-neutral-600 border-opacity-30 backdrop-blur-[80px] flex-col justify-start items-start gap-8 inline-flex">
                    <div className="flex flex-row items-center w-full justify-between">
                      <h5 className="text-typo-secondary font-semibold text-[16px]">
                        General Accounts
                      </h5>
                      <div className="flex flex-row w-[138px] h-[32px] py-[6px] px-[12px] gap-[8px] rounded-[8px]">
                        <img
                          className="h-5 w-5"
                          src="/assets/svg/addBlue.svg"
                        />
                        <h5 className="text-typo-blue font-normal text-[14px]">
                          Add Account
                        </h5>
                      </div>
                    </div>

                    {/* General Accounts */}
                    <div className="w-full h-auto flex flex-row items-center justify-between flex-wrap gap-y-[24px]">
                      {/* Account -1 */}
                      <div className="group hover:bg-[#2B2E30] flex flex-row w-[464px] h-[50px] rounded-[12px] py-[8px] px-[16px] bg-[#1A1C1F] items-center justify-between">
                        <div className="flex flex-row items-center gap-[12px]">
                          <img
                            className="w-8 h-8"
                            src="/assets/svg/facebookIcon.svg"
                          />
                          <div className="flex flex-col">
                            <h5 className="text-typo-secondary font-semibold text-[12px]">
                              SHIVANENDRAN
                            </h5>
                            <h5 className="text-typo-primary font-normal text-[12px]">
                              Facebook
                            </h5>
                          </div>
                        </div>
                        <div className="hidden group-hover:block w-[24px] h-[24px] p-[8px] rounded-[36px] bg-[#373A3D] cursor-pointer">
                          <img
                            className="h-[7px] w-[7px]"
                            src="/assets/svg/close-btn.svg"
                          />
                        </div>
                      </div>
                      {/* Account -2 */}
                      <div className="group hover:bg-[#2B2E30] flex flex-row w-[464px] h-[50px] rounded-[12px] py-[8px] px-[16px] bg-[#1A1C1F] items-center justify-between">
                        <div className="flex flex-row items-center gap-[12px]">
                          <img
                            className="w-8 h-8"
                            src="/assets/svg/appleIcon.svg"
                          />
                          <div className="flex flex-col">
                            <h5 className="text-typo-secondary font-semibold text-[12px]">
                              SHIVANENDRAN
                            </h5>
                            <h5 className="text-typo-primary font-normal text-[12px]">
                              Apple
                            </h5>
                          </div>
                        </div>
                        <div className="hidden group-hover:block w-[24px] h-[24px] p-[8px] rounded-[36px] bg-[#373A3D] cursor-pointer">
                          <img
                            className="h-[7px] w-[7px]"
                            src="/assets/svg/close-btn.svg"
                          />
                        </div>
                      </div>
                      {/* Account - 3 */}
                      <div className="group hover:bg-[#2B2E30] flex flex-row w-[464px] h-[50px] rounded-[12px] py-[8px] px-[16px] bg-[#1A1C1F] items-center justify-between">
                        <div className="flex flex-row items-center gap-[12px]">
                          <img
                            className="w-8 h-8"
                            src="/assets/svg/googleIcon.svg"
                          />
                          <div className="flex flex-col">
                            <h5 className="text-typo-secondary font-semibold text-[12px]">
                              SHIVANENDRAN
                            </h5>
                            <h5 className="text-typo-primary font-normal text-[12px]">
                              Google
                            </h5>
                          </div>
                        </div>
                        <div className="hidden group-hover:block w-[24px] h-[24px] p-[8px] rounded-[36px] bg-[#373A3D] cursor-pointer">
                          <img
                            className="h-[7px] w-[7px]"
                            src="/assets/svg/close-btn.svg"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Game Accounts */}
                    <h5 className="text-typo-secondary font-semibold text-[16px]">
                      Game Accounts
                    </h5>
                    <div
                      onClick={() => setIsAddGameModalOpen(true)}
                      className="w-[468px] h-[56px] rounded-[12px] py-[4px] px-[16px] flex border-[1px] border-typo-blue border-dashed items-center justify-center cursor-pointer"
                    >
                      <div className="flex flex-row w-[138px] h-[32px] py-[6px] px-[12px] gap-[8px] rounded-[8px]">
                        <img
                          className="h-5 w-5"
                          src="/assets/svg/addBlue.svg"
                        />
                        <h5 className="text-typo-blue font-normal text-[14px]">
                          Add Account
                        </h5>
                      </div>
                    </div>

                    {/* Normal Accounts */}
                    <h5 className="text-typo-secondary font-semibold text-[16px]">
                      Normal Accounts
                    </h5>
                    <div className="flex flex-row items-center justify-between w-full">
                      {/* Account -1 */}
                      <div className="flex flex-row w-[464px] h-[50px] rounded-[12px] py-[8px] px-[16px] bg-[#1A1C1F] items-center justify-between">
                        <div className="flex flex-row items-center gap-[12px]">
                          <img
                            className="w-8 h-8"
                            src="/assets/svg/telegramIcon.svg"
                          />
                          <div className="flex flex-col">
                            <h5 className="text-typo-secondary font-normal text-[12px]">
                              Connect Telegram
                            </h5>
                          </div>
                        </div>
                      </div>

                      <div className="w-[468px] h-[50px] rounded-[12px] py-[4px] px-[16px] flex border-[1px] border-typo-blue border-dashed items-center justify-center">
                        <div className="flex flex-row w-[138px] h-[32px] py-[6px] px-[12px] gap-[8px] rounded-[8px]">
                          <img
                            className="h-5 w-5"
                            src="/assets/svg/addBlue.svg"
                          />
                          <h5 className="text-typo-blue font-normal text-[14px]">
                            Add Account
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Tab notifications */}
              {i === 4 && (
                <>
                  <div className="w-[1000px] h-auto mt-[20px] p-6 bg-neutral-800 bg-opacity-30 rounded-2xl shadow border border-neutral-600 border-opacity-30 backdrop-blur-[80px] flex-col justify-start items-start inline-flex">
                    <h5 className="text-[18px] font-semibold text-typo-primary mb-[16px]">
                      Email Notification
                    </h5>
                    {/* private account */}
                    <div className="flex flex-col gap-[32px] w-full">
                      {/* Feedback Emails */}
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row items-center justify-between">
                          <h5 className="typo-semibold">Feedback Emails</h5>
                          <ToggleSwitch />
                        </div>
                        <h5 className="typo-normal w-[610px]">
                          Give feedback on Gamersback
                        </h5>
                      </div>
                      {/* Reminder emails */}
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row items-center justify-between">
                          <h5 className="typo-semibold">Reminder emails</h5>
                          <ToggleSwitch />
                        </div>
                        <h5 className="typo-normal w-[610px]">
                          Get notifications you may have missed.
                        </h5>
                      </div>
                      {/* News emails */}
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row items-center justify-between">
                          <h5 className="typo-semibold">News emails</h5>
                          <ToggleSwitch />
                        </div>
                        <h5 className="typo-normal w-[610px]">
                          Get notifications you may have missed.
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="w-[1000px] h-auto mt-[20px] p-6 bg-neutral-800 bg-opacity-30 rounded-2xl shadow border border-neutral-600 border-opacity-30 backdrop-blur-[80px] flex-col justify-start items-start inline-flex">
                    <h5 className="text-[18px] font-semibold text-typo-primary mb-[16px]">
                      Push Notifications
                    </h5>
                    {/* private account */}
                    <div className="flex flex-col gap-[32px] w-full">
                      {/* Post Likes */}
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row items-center justify-between">
                          <h5 className="typo-semibold">Post Likes</h5>
                          <ToggleSwitch />
                        </div>
                        <h5 className="typo-normal w-[610px]">
                          Give feedback on Gamersback
                        </h5>
                      </div>
                      {/* Post Comments */}
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row items-center justify-between">
                          <h5 className="typo-semibold">Post Comments</h5>
                          <ToggleSwitch />
                        </div>
                        <h5 className="typo-normal w-[610px]">
                          Get notifications you may have missed.
                        </h5>
                      </div>
                      {/* Likes and replies on your comments on other's post */}
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row items-center justify-between">
                          <h5 className="typo-semibold">
                            Likes and replies on your comments on other's post
                          </h5>
                          <ToggleSwitch />
                        </div>
                        <h5 className="typo-normal w-[610px]">
                          Get notifications you may have missed.
                        </h5>
                      </div>
                      {/* Follow Requests */}
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row items-center justify-between">
                          <h5 className="typo-semibold">Follow Requests</h5>
                          <ToggleSwitch />
                        </div>
                        <h5 className="typo-normal w-[610px]">
                          Get notifications you may have missed.
                        </h5>
                      </div>
                      {/* Chat Message requests */}
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row items-center justify-between">
                          <h5 className="typo-semibold">
                            Chat Message requests
                          </h5>
                          <ToggleSwitch />
                        </div>
                        <h5 className="typo-normal w-[610px]">
                          Get notifications you may have missed.
                        </h5>
                      </div>
                      {/* Chat Message  */}
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row items-center justify-between">
                          <h5 className="typo-semibold">Chat Message </h5>
                          <ToggleSwitch />
                        </div>
                        <h5 className="typo-normal w-[610px]">
                          Get notifications you may have missed.
                        </h5>
                      </div>
                      {/* Reminders */}
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row items-center justify-between">
                          <h5 className="typo-semibold">Reminders</h5>
                          <ToggleSwitch />
                        </div>
                        <h5 className="typo-normal w-[610px]">
                          Get notifications you may have missed.
                        </h5>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Tab help */}
              {i === 5 && (
                <div className="w-[1000px] h-auto mt-[20px] p-6 bg-neutral-800 bg-opacity-30 rounded-2xl shadow border border-neutral-600 border-opacity-30 backdrop-blur-[80px] flex-col justify-start items-start inline-flex">
                  {/* private account */}
                  <div className="flex flex-row items-center justify-between w-full">
                    {/* Feedback Emails */}
                    <div className="flex flex-row items-end justify-between gap-2 w-full">
                      <div className="flex flex-col gap-[16px]">
                        <h5 className="typo-semibold">Help Centre</h5>
                        <h5 className="typo-normal w-[610px]">
                          Visit our help center and to know more about privacy
                          and settings
                        </h5>
                      </div>
                      <CommonBtn1
                        height="32px"
                        width="132px"
                        text="Visit help centre"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Pager>
      </div>

      {/* Modals */}
      {isTwoStepVerifyModal && (
        <CommonModal>
          <div className="w-[616px] h-[468px] flex flex-col">
            {/* Modal Header */}
            <div className="flex flex-row items-center justify-between px-[24px] py-[20px] rounded-tr-[16px] rounded-tl-[16px] modal-header">
              <div className="flex flex-row items-center gap-[12px]">
                <img src="/assets/svg/left-pointer.svg" className="w-2 h-3" />
                <h1 className="font-semibold text-[18px] text-typo-secondary">
                  Two-Step Verification
                </h1>
              </div>
              <img
                src="/assets/svg/close-btn.svg"
                className="w-3 h-3 cursor-pointer"
                onClick={() => {
                  setInvokeCloseModals(true);
                }}
              />
            </div>
            {/* Modal Body */}
            <div className="relative h-full flex flex-col gap-[20px] p-[24px]">
              <h5 className="text-[16px] font-normal text-typo-primary">
                Two-Step verification enhances your account security by
                mandating an extra password when logging in from an unfamiliar
                device.
              </h5>
              <div className="w-full h-[86px] rounded-[12px] p-[16px] flex flex-row items-center justify-between bg-[#212426]">
                <div className="flex flex-col gap-[8px] w-[432px]">
                  <h5 className="text-[18px] font-semibold text-typo-secondary">
                    Text Message (SMS)
                  </h5>
                  <h5 className="text-[14px] font-normal text-typo-secondary">
                    We'll send a code to the number you choose.
                  </h5>
                </div>
                <input
                  checked={verification === "SMS" ? true : false}
                  type="radio"
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => setVerification("SMS")}
                />
              </div>
              <div className="w-full h-[86px] rounded-[12px] p-[16px] flex flex-row items-center justify-between bg-[#212426]">
                <div className="flex flex-col gap-[8px] w-[432px]">
                  <h5 className="text-[18px] font-semibold text-typo-secondary">
                    Set Password
                  </h5>
                  <h5 className="text-[14px] font-normal text-typo-secondary">
                    You can set a password that will be required when you log in
                    on a new device
                  </h5>
                </div>
                <input
                  checked={verification === "PASSWORD" ? true : false}
                  type="radio"
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => setVerification("PASSWORD")}
                />
              </div>
              {/* Submit */}
              <div className="absolute bottom-0 left-0 h-[80px] w-full flex items-center rounded-bl-xl rounded-br-xl justify-center bg-[#212426]">
                <div
                  className={`w-[568px] h-[44px] bg-[#2E9BFA] rounded-[8px] flex items-center justify-center  ${
                    verification === ""
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer"
                  }`}
                  onClick={() =>
                    verification === "SMS"
                      ? setIsSmsModalOpen(true)
                      : verification === "PASSWORD"
                      ? setIsPasswordModalOpen(true)
                      : null
                  }
                >
                  <h5 className="typo-semibold">Next</h5>
                </div>
              </div>
            </div>
          </div>
        </CommonModal>
      )}

      {isSmsModalOpen && (
        <CommonModal>
          <div className="w-[616px] h-[468px] flex flex-col">
            {/* Modal Header */}
            <div className="flex flex-row items-center justify-between px-[24px] py-[20px] rounded-tr-[16px] rounded-tl-[16px] modal-header">
              <div className="flex flex-row items-center gap-[12px]">
                <img
                  onClick={() => {
                    setIsSmsModalOpen(false);
                    setIsTwoStepVerifyModal(true);
                  }}
                  src="/assets/svg/left-pointer.svg"
                  className="w-2 h-3 cursor-pointer"
                />
                <h1 className="font-semibold text-[18px] text-typo-secondary">
                  Choose Phone Number
                </h1>
              </div>
              <img
                src="/assets/svg/close-btn.svg"
                className="w-3 h-3 cursor-pointer"
                onClick={() => setInvokeCloseModals(true)}
              />
            </div>
            {/* Modal Body */}
            <div className="relative h-full flex flex-col gap-[20px] p-[24px]">
              <h5 className="text-[16px] font-normal text-typo-primary">
                Select an existing mobile phone number linked to your account or
                include a new one. This will be the designated number to receive
                the login code
              </h5>
              <div className="w-full h-[58px] rounded-[12px] p-[16px] flex flex-row items-center justify-between bg-[#212426]">
                <h5 className="text-[18px] font-semibold text-typo-secondary">
                  +91 *******544
                </h5>
                <input
                  checked={verification === "SMS" ? true : false}
                  type="radio"
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => setVerification("SMS")}
                />
              </div>
              <h5
                onClick={() => setIsAddPhoneModalOpen(true)}
                className="text-[14px] font-normal text-typo-blue cursor-pointer"
              >
                Add phone number
              </h5>

              {/* Submit */}
              <div className="absolute bottom-0 left-0 h-[80px] w-full flex items-center rounded-bl-xl rounded-br-xl justify-center bg-[#212426]">
                <div
                  className={`w-[568px] h-[44px] bg-[#2E9BFA] rounded-[8px] flex items-center justify-center  ${
                    verification === ""
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer"
                  }`}
                  onClick={() =>
                    verification === "SMS"
                      ? setIsSmsModalOpen(true)
                      : verification === "PASSWORD"
                      ? setIsPasswordModalOpen(true)
                      : null
                  }
                >
                  <h5 className="typo-semibold">Done</h5>
                </div>
              </div>
            </div>
          </div>
        </CommonModal>
      )}

      {isAddPhoneModalOpen && (
        <CommonModal>
          <div className="w-[616px] h-[468px] flex flex-col">
            {/* Modal Header */}
            <div className="flex flex-row items-center justify-between px-[24px] py-[20px] rounded-tr-[16px] rounded-tl-[16px] modal-header">
              <div className="flex flex-row items-center gap-[12px]">
                <img
                  onClick={() => {
                    setIsAddPhoneModalOpen(false);
                    setIsSmsModalOpen(true);
                  }}
                  src="/assets/svg/left-pointer.svg"
                  className="w-2 h-3 cursor-pointer"
                />
                <h1 className="font-semibold text-[18px] text-typo-secondary">
                  Add Phone Number
                </h1>
              </div>
              <img
                src="/assets/svg/close-btn.svg"
                className="w-3 h-3 cursor-pointer"
                onClick={() => setInvokeCloseModals(true)}
              />
            </div>
            {/* Modal Body */}
            <div className="relative h-full flex flex-col gap-[20px] p-[24px]">
              <h5 className="text-[16px] font-normal text-typo-primary">
                Add new phone number and we’ll send you a confirmation code next
              </h5>
              <div className="w-full h-[40px] rounded-[8px] gap-[8px] border-[1px] border-[#2E9BFA] py-[8px] px-[4px] flex flex-row items-center justify-between bg-[#212426]">
                <div className="flex flex-row items-center w-[72px] py-[4px] px-[8px] rounded-[4px] gap-[8px] bg-[#2B2E30]">
                  <h5 className="font-normal text-[16px] text-typo-secondary">
                    +91
                  </h5>
                  <img
                    className="w-[12px] h-[8px]"
                    src="/assets/svg/downArrow.svg"
                  />
                </div>
                <input
                  className="bg-transparent outline-none w-full text-typo-secondary px-3"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Submit */}
              <div className="absolute bottom-0 left-0 h-[80px] w-full flex items-center rounded-bl-xl rounded-br-xl justify-center bg-[#212426]">
                <div
                  className={`w-[568px] h-[44px] bg-[#2E9BFA] rounded-[8px] flex items-center justify-center  ${
                    verification === ""
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer"
                  }`}
                  onClick={() => setIsOtpModalOpen(true)}
                >
                  <h5 className="typo-semibold">Verify</h5>
                </div>
              </div>
            </div>
          </div>
        </CommonModal>
      )}

      {isOtpModalOpen && (
        <CommonModal>
          <div className="w-[616px] h-[488px] flex flex-col">
            {/* Modal Header */}
            <div className="flex flex-row items-center justify-between px-[24px] py-[20px] rounded-tr-[16px] rounded-tl-[16px] modal-header">
              <div className="flex flex-row items-center gap-[12px]">
                <img
                  onClick={() => {
                    setIsOtpModalOpen(false);
                    setIsAddPhoneModalOpen(true);
                  }}
                  src="/assets/svg/left-pointer.svg"
                  className="w-2 h-3 cursor-pointer"
                />
                <h1 className="font-semibold text-[18px] text-typo-secondary">
                  Verify Number
                </h1>
              </div>
              <img
                src="/assets/svg/close-btn.svg"
                className="w-3 h-3 cursor-pointer"
                onClick={() => setInvokeCloseModals(true)}
              />
            </div>
            {/* Modal Body */}
            <div className="relative h-full items-center justify-start flex flex-col p-[24px]">
              <div className="flex flex-col items-center justify-center gap-[16px]">
                <img
                  className="h-[72px] w-[72px]"
                  src="/assets/svg/otpModalImg.svg"
                />
                <h5 className="text-[28px] font-semibold text-white">
                  Enter OTP to add Phone Number
                </h5>
                <div className="flex flex-row items-center gap-[8px]">
                  <h5 className="text-[14px] font-normal text-typo-primary">
                    Enter the unique code we sent to :{" "}
                    <span className="text-[14px] font-semibold text-typo-secondary">
                      +91 8678934564
                    </span>
                  </h5>
                  <img
                    className="w-[13px] h-[13px] cursor-pointer"
                    src="/assets/svg/blue-pen.svg"
                    onClick={() => {
                      setIsOtpModalOpen(false);
                      setIsAddPhoneModalOpen(true);
                    }}
                  />
                </div>

                <OTPInput
                  // value={otp}
                  // onChange={setOtp}
                  shouldAutoFocus={true}
                  numInputs={4}
                  containerStyle={{
                    gap: "12px",
                  }}
                  inputStyle={{
                    width: "56px",
                    height: "56px",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="bg-[#0B0C0D] rounded-[12px] text-typo-blue focus:outline-typo-blue outline-none"
                    />
                  )}
                />
                <h5 className="text-[16px] font-normal text-typo-secondary underline mt-[12px]">
                  Resend Code
                </h5>
              </div>
              {/* Submit */}
              <div className="absolute bottom-0 left-0 h-[80px] w-full flex items-center rounded-bl-xl rounded-br-xl justify-center bg-[#212426]">
                <div
                  className={`w-[568px] h-[44px] bg-[#2E9BFA] rounded-[8px] flex items-center justify-center  ${
                    verification === ""
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer"
                  }`}
                  onClick={() => setInvokeCloseModals(true)}
                >
                  <h5 className="typo-semibold">Verify</h5>
                </div>
              </div>
            </div>
          </div>
        </CommonModal>
      )}

      {isPasswordModalOpen && (
        <CommonModal>
          <div className="w-[616px] h-[468px] flex flex-col">
            {/* Modal Header */}
            <div className="flex flex-row items-center justify-between px-[24px] py-[20px] rounded-tr-[16px] rounded-tl-[16px] modal-header">
              <div className="flex flex-row items-center gap-[12px]">
                <img
                  onClick={() => {
                    setIsPasswordModalOpen(false);
                    setIsTwoStepVerifyModal(true);
                  }}
                  src="/assets/svg/left-pointer.svg"
                  className="w-2 h-3 cursor-pointer"
                />
                <h1 className="font-semibold text-[18px] text-typo-secondary">
                  Set Password
                </h1>
              </div>
              <img
                src="/assets/svg/close-btn.svg"
                className="w-3 h-3 cursor-pointer"
                onClick={() => setInvokeCloseModals(true)}
              />
            </div>
            {/* Modal Body */}
            <div className="relative h-full flex flex-col gap-[20px] p-[24px]">
              <h5 className="text-[16px] font-normal text-typo-primary">
                Two-Step verification enhances your account security by
                mandating an extra password when logging in from an unfamiliar
                device.
              </h5>

              <div className="flex flex-col gap-[20px] w-full">
                <div className="flex flex-row items-center justify-between">
                  <h5 className="typo-normal">Set Password</h5>
                  <div className=" h-10 px-4 py-2.5 rounded-lg border border-[#2B2E30] justify-start items-center gap-2 flex w-[391px]">
                    <input className="bg-transparent outline-none text-typo-secondary w-full" />
                    <img className="h-5 w-5" src="/assets/svg/eyecross.svg" />
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <h5 className="typo-normal">Re-enter Password</h5>
                  <div className=" h-10 px-4 py-2.5 rounded-lg border border-[#2B2E30] justify-start items-center gap-2 flex w-[391px]">
                    <input className="bg-transparent outline-none text-typo-secondary w-full" />
                    <img className="h-5 w-5" src="/assets/svg/eyecross.svg" />
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center gap-[10px]">
                    <h5 className="typo-normal">Hint (Optional)</h5>
                    <img
                      src="/assets/svg/infoIcon.svg"
                      className="w-[16px] h-[16px]"
                    />
                  </div>
                  <div className=" h-10 px-4 py-2.5 rounded-lg border border-[#2B2E30] justify-start items-center gap-2 flex w-[391px]">
                    <input className="bg-transparent outline-none text-typo-secondary w-full" />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="absolute bottom-0 left-0 h-[80px] w-full flex items-center rounded-bl-xl rounded-br-xl justify-center bg-[#212426]">
                <div
                  className={`w-[568px] h-[44px] bg-[#2E9BFA] rounded-[8px] flex items-center justify-center  ${
                    verification === ""
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer"
                  }`}
                  onClick={() => {
                    setIsPasswordModalOpen(false);
                    setIsSuccessModalOpen(true);
                  }}
                >
                  <h5 className="typo-semibold">Done</h5>
                </div>
              </div>
            </div>
          </div>
        </CommonModal>
      )}

      {isSuccessModalOpen && (
        <CommonModal>
          <div className="w-[616px] h-[468px] flex flex-col">
            {/* Modal Header */}
            <div className="flex flex-row items-center justify-between px-[24px] py-[20px] rounded-tr-[16px] rounded-tl-[16px] modal-header">
              <div className="flex flex-row items-center gap-[12px]">
                <img src="/assets/svg/left-pointer.svg" className="w-2 h-3" />
                <h1 className="font-semibold text-[18px] text-typo-secondary">
                  Success
                </h1>
              </div>
              <img
                src="/assets/svg/close-btn.svg"
                className="w-3 h-3 cursor-pointer"
                onClick={() => setInvokeCloseModals(true)}
              />
            </div>
            {/* Modal Body */}
            <div className="relative h-full flex flex-col gap-[20px] p-[24px]">
              <div className="flex flex-col items-center justify-center mt-[44px]">
                <img
                  className="w-[107px] h-[72px]"
                  src="/assets/svg/successGroupStar.svg"
                />
                <h5 className="text-[28px] font-semibold text-typo-secondary mt-[24px]">
                  Successfully password added
                </h5>
                <h5 className="text-[16px] font-semibold text-typo-primary mt-[12px]">
                  Your Post has been shared.
                </h5>
              </div>
              {/* Submit */}
              <div className="absolute bottom-0 left-0 h-[80px] w-full flex items-center rounded-bl-xl rounded-br-xl justify-center bg-[#212426]">
                <div
                  className={`w-[568px] h-[44px] bg-[#2E9BFA] rounded-[8px] flex items-center justify-center  ${
                    verification === ""
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer"
                  }`}
                  onClick={() => setInvokeCloseModals(true)}
                >
                  <h5 className="typo-semibold">Close</h5>
                </div>
              </div>
            </div>
          </div>
        </CommonModal>
      )}

      {isAddGameModalOpen && (
        <CommonModal>
          <div className="w-[1000px] h-[629px] flex flex-col">
            {/* Modal Header */}
            <div className="flex flex-row items-center justify-between px-[24px] py-[20px] rounded-tr-[16px] rounded-tl-[16px] modal-header">
              <div className="flex flex-row items-center gap-[12px]">
                <img src="/assets/svg/left-pointer.svg" className="w-2 h-3" />
                <h1 className="font-semibold text-[18px] text-typo-secondary">
                  Add game accounts
                </h1>
              </div>
              <img
                src="/assets/svg/close-btn.svg"
                className="w-3 h-3 cursor-pointer"
                onClick={() => setInvokeCloseModals(true)}
              />
            </div>
            {/* Modal Body */}
            <div className="h-full flex flex-col gap-[16px] p-[24px]">
              {/* title and search */}
              <div className="flex flex-row items-center justify-between w-full">
                <h5 className="text-[14px] font-normal text-typo-secondary">
                  Link your game accounts to unlock specific features on
                  Gamersback
                </h5>
                {/* Search input  */}
                <div className="relative">
                  <div className="flex flex-row gap-[12px] items-center h-[40px] w-[350px] py-[10px] px-[12px] bg-[#141517] rounded-[20px]">
                    <img
                      className="h-5 w-5"
                      src="/assets/svg/search-icon.svg"
                    />
                    <input
                      className="bg-transparent outline-none w-full text-typo-secondary"
                      placeholder="Search games"
                      // value={searchValue}
                      // onChange={(ev) => {
                      //   setSearchValue(ev.target.value);
                      //   setSkip(0);
                      //   if (ev.target.value.length >= 3)
                      //     setInvokeGameSearch(true);
                      //   if (ev.target.value.length === 0) {
                      //     setGameSearchData([]);
                      //   }
                      // }}
                    />
                  </div>
                  {/* {searchValue.length >= 3 && (
                    <div
                      ref={listInnerRef}
                      className="absolute flex flex-col gap-2 rounded-[16px] overscroll-contain  bg-[#1A1C1F] w-[350px] overflow-y-scroll h-[324px] top-[63px] px-[10px] py-[15px]"
                    >
                      {gameSearchData.length > 0 ? (
                        <>
                          {gameSearchData?.map((el, idx) => (
                            <div
                              key={idx}
                              className="flex flex-row  items-center cursor-pointer px-[10px] py-[8px] hover:bg-[#2B2E30] rounded-[10px]"
                              onClick={() =>
                                navigate(constants.PATH.NAVIGATEGAMEDETAIL, {
                                  state: { gameId: el._id },
                                })
                              }
                            >
                              <div className="flex flex-row gap-[20px] items-center">
                                <img
                                  src={el.gameBanner}
                                  className="w-10 h-10 rounded-full"
                                />
                                <p className="ml-2 text-[#FAFBFC]">
                                  {el.gameName}
                                </p>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p className="ml-2 text-[#FAFBFC] h-full w-full flex items-center justify-center">
                          No data available
                        </p>
                      )}
                    </div>
                  )} */}
                </div>
              </div>

              {/* Cards */}
              <div className="flex flex-row w-full items-center flex-wrap justify-between gap-y-[16px]">
                {/* Card -1 */}
                <div className="w-[305px] h-[80px] flex flex-row items-center p-[12px] justify-between rounded-[12px] bg-[#2B2E30]">
                  <div className="flex flex-row items-center gap-[12px]">
                    <img
                      className="w-[56px] h-[56px] object-cover rounded-[4px]"
                      src="/assets/svg/gameBanner1.svg"
                    />
                    <div className="w-[133px]">
                      <h5 className="text-[14px] font-semibold text-typo-secondary">
                        Legends of Runeterra
                      </h5>
                    </div>
                  </div>
                  <div className="cursor-pointer">
                    <CommonBtn1 height="32px" width="80px" text="Connect" />
                  </div>
                </div>
                {/* Card - 2 */}
                <div className="w-[305px] h-[80px] flex flex-row items-center p-[12px] justify-between rounded-[12px] bg-[#2B2E30]">
                  <div className="flex flex-row items-center gap-[12px]">
                    <img
                      className="w-[56px] h-[56px] object-cover rounded-[4px]"
                      src="/assets/svg/gameBanner1.svg"
                    />
                    <div className="w-[133px]">
                      <h5 className="text-[14px] font-semibold text-typo-secondary">
                        Legends of Runeterra
                      </h5>
                    </div>
                  </div>
                  <div className="cursor-pointer">
                    <CommonBtn1 height="32px" width="80px" text="Connect" />
                  </div>
                </div>
                {/* Card - 3 */}
                <div className="w-[305px] h-[80px] flex flex-row items-center p-[12px] justify-between rounded-[12px] bg-[#2B2E30]">
                  <div className="flex flex-row items-center gap-[12px]">
                    <img
                      className="w-[56px] h-[56px] object-cover rounded-[4px]"
                      src="/assets/svg/gameBanner1.svg"
                    />
                    <div className="w-[133px]">
                      <h5 className="text-[14px] font-semibold text-typo-secondary">
                        Legends of Runeterra
                      </h5>
                    </div>
                  </div>
                  <div className="cursor-pointer">
                    <CommonBtn1 height="32px" width="80px" text="Connect" />
                  </div>
                </div>
                {/* Card - 4 */}
                <div className="w-[305px] h-[80px] flex flex-row items-center p-[12px] justify-between rounded-[12px] bg-[#2B2E30]">
                  <div className="flex flex-row items-center gap-[12px]">
                    <img
                      className="w-[56px] h-[56px] object-cover rounded-[4px]"
                      src="/assets/svg/gameBanner1.svg"
                    />
                    <div className="w-[133px]">
                      <h5 className="text-[14px] font-semibold text-typo-secondary">
                        Legends of Runeterra
                      </h5>
                    </div>
                  </div>
                  <div className="cursor-pointer">
                    <CommonBtn1 height="32px" width="80px" text="Connect" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CommonModal>
      )}

      <VerifyAccountModal
        open={isVerifyModalOpen}
        onClose={() => setInvokeCloseModals(true)}
      />
    </>
  );
}
