// @import dependencies
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

// @import components
import Pager from "../generalComponents/Pager";
import CommonBtn1 from "../generalComponents/CommonBtn1";
import CommonModal from "../generalComponents/CommonModal";
import { TabItem, Slider } from "../generalComponents/TabStyle";

const Wallet = () => {
  const tabListRef = useRef();

  // State variables
  const [value, setValue] = useState(0);
  const childRefs = useRef(new Map());
  const [slider, setSlider] = useState({ left: 0, right: 0 });

  const [isReferFriendModalOpen, setIsReferFriendModalOpen] = useState(false);
  const [referralLink, setRefferalLink] = useState(
    "www.gamersback.com/ref/123458"
  );
  const [inviteCode, setInviteCode] = useState("yrtOh78");

  const tabs = ["Tokens (30,000)", "INR (60,000)"];

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
      <div className="flex flex-col items-start mx-auto w-[1024px] mt-[92px]">
        {/* Header */}
        <div className="flex flex-col gap-[12px] items-start">
          <div className="flex flex-row items-center gap-[12px]">
            <img className="h-6 w-6" src="/assets/svg/wallet.svg" />
            <h5 className="text-[28px] font-semibold text-typo-secondary">
              Wallet
            </h5>
          </div>
          <h5 className="text-[16px] font-normal text-typo-primary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
          </h5>
        </div>
        {/* Tabs */}
        <div
          className="relative border-line  mt-[32px] w-full items-start"
          ref={tabListRef}
        >
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
                <>
                  <div className="flex flex-row items-center w-full h-[241px] mt-[16px] bg-[#252525] bg-opacity-[30%]  gap-[48px] rounded-[16px] p-[24px]">
                    <div className="h-[193px] w-[193px]">
                      <img
                        className="h-full w-full"
                        src="/assets/svg/wallet-token.svg"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-[24px] w-full h-[156px]">
                      <div className="flex flex-row w-full items-center justify-between">
                        <div className="flex flex-row items-center gap-[16px]">
                          <img
                            src="/assets/svg/wallet-target.svg"
                            className="h-8 w-8"
                          />
                          <h5 className="text-[12px] font-normal text-typo-secondary">
                            Set up profile and earn token
                          </h5>
                        </div>
                        <div>
                          <CommonBtn1
                            height="32px"
                            width="79px"
                            text="Set up"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row w-full items-center justify-between">
                        <div className="flex flex-row items-center gap-[16px]">
                          <img
                            src="/assets/svg/wallet-invite.svg"
                            className="h-8 w-8"
                          />
                          <h5 className="text-[12px] font-normal text-typo-secondary">
                            Invite friends and earn token
                          </h5>
                        </div>
                        <div
                          onClick={() => setIsReferFriendModalOpen(true)}
                          className="cursor-pointer"
                        >
                          <CommonBtn1
                            height="32px"
                            width="79px"
                            text="Invite"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col  w-full h-[241px] mt-[16px] bg-[#252525] gap-[12px] bg-opacity-[30%] rounded-[16px] p-[24px]">
                    <h5 className="typo-semibold">Token Transactions</h5>

                    <div className="flex flex-row w-full justify-between">
                      <h5 className="text-[12px] font-normal w-[30%] text-typo-primary">
                        Transaction Type
                      </h5>
                      <h5 className="text-[12px] font-normal w-[20%] text-typo-primary">
                        Amount
                      </h5>
                      <h5 className="text-[12px] font-normal w-[30%] text-typo-primary">
                        Date & Time
                      </h5>
                      <h5 className="text-[12px] font-normal w-[20%] flex justify-end text-typo-primary">
                        Receipt
                      </h5>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                      <h5 className="text-[12px] font-normal w-[30%] text-typo-primary">
                        Redeemed - Google card
                      </h5>
                      <h5 className="text-[12px] font-normal w-[20%] text-[#95D97D]">
                        -877
                      </h5>
                      <h5 className="text-[12px] font-normal w-[30%] text-typo-primary">
                        09:52 Pm 22.04.2022
                      </h5>
                      <h5 className="text-[12px]  font-normal w-[20%] flex justify-end text-typo-blue">
                        View
                      </h5>
                    </div>
                  </div>
                </>
              )}

              {i === 1 && (
                <div className="flex flex-row items-center justify-center w-full h-[241px] mt-[16px] bg-[#252525] bg-opacity-[30%]  gap-[48px] rounded-[16px] p-[24px]">
                  <h5 className="flex items-center justify-center text-sm font-semibold text-typo-secondary">
                    Coming Soon
                  </h5>
                </div>
              )}
            </div>
          ))}
        </Pager>
      </div>

      {isReferFriendModalOpen && (
        <CommonModal>
          <div className="w-[496px] h-[540px] flex flex-col">
            {/* Modal Header */}
            <div className="flex flex-row items-center justify-between px-[24px] py-[20px] rounded-tr-[16px] rounded-tl-[16px] modal-header">
              <div className="flex flex-row items-center gap-[12px]">
                <img src="/assets/svg/left-pointer.svg" className="w-2 h-3" />
                <div className="flex flex-row items-center gap-2">
                  <h5 className="font-semibold text-[18px] text-typo-secondary">
                    Refer & Earn 500
                  </h5>
                  <img className="h-5 w-5" src="/assets/svg/tokenCoin.svg" />
                </div>
              </div>
              <img
                src="/assets/svg/close-btn.svg"
                className="w-3 h-3 cursor-pointer"
                onClick={() => setIsReferFriendModalOpen(false)}
              />
            </div>
            {/* Modal Body */}
            <div className="relative h-full flex flex-col gap-[24px] p-[24px]">
              <h5 className="typo-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore
              </h5>

              <div className="flex flex-col  items-start gap-[8px]">
                <h5 className="text-sm text-typo-secondary font-normal">
                  Share your referral link
                </h5>
                <div className="h-[40px] flex flex-row justify-between gap-[12px] w-full rounded-[8px] border-[#373A3D] border-[1px] px-[12px] py-[10px]">
                  <input
                    onChange={(ev) => setRefferalLink(ev.target.value)}
                    className="bg-transparent w-full outline-none text-typo-secondary"
                    value={referralLink}
                  />
                  <img
                    className="h-5 w-5 cursor-pointer"
                    src="/assets/svg/clipboard.svg"
                    onClick={() => {
                      navigator.clipboard.writeText(referralLink);
                      toast("Copied to clipboard");
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col  items-start gap-[8px]">
                <h5 className="text-sm text-typo-secondary font-normal">
                  Invite Code
                </h5>
                <div className="h-[40px] flex flex-row justify-between gap-[12px] w-full rounded-[8px] border-[#373A3D] border-[1px] px-[12px] py-[10px]">
                  <input
                    onChange={(ev) => setInviteCode(ev.target.value)}
                    className="bg-transparent w-full outline-none text-typo-secondary"
                    value={inviteCode}
                  />
                  <img
                    className="h-5 w-5 cursor-pointer"
                    src="/assets/svg/clipboard.svg"
                    onClick={() => {
                      navigator.clipboard.writeText(inviteCode);
                      toast("Copied to clipboard");
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col  items-start gap-[12px]">
                <h5 className="text-sm text-typo-secondary font-normal">
                  Share via social media
                </h5>
                <div className="flex flex-row gap-[32px] w-full">
                  <img className="h-8 w-8" src="/assets/svg/googleIcon.svg" />
                  <img className="h-8 w-8" src="/assets/svg/facebookIcon.svg" />
                  <img className="h-8 w-8" src="/assets/svg/twitterIcon.svg" />
                  <img
                    className="h-8 w-8"
                    src="/assets/svg/instagramIcon.svg"
                  />
                  <img className="h-8 w-8" src="/assets/svg/linkedinIcon.svg" />
                </div>
              </div>
              <div className="flex flex-row items-center justify-between gap-[16px]">
                <div className="w-full  flex-col h-[96px] flex items-center justify-center bg-[#2B2E30] rounded-[12px]">
                  <h5 className="text-[24px] font-semibold text-typo-secondary">
                    24
                  </h5>
                  <h5 className="text-[16px] font-normal text-typo-primary">
                    User Reffered
                  </h5>
                </div>
                <div className="w-full h-[96px] flex flex-col items-center justify-center bg-[#2B2E30] rounded-[12px]">
                  <div className="flex flex-row items-center gap-[6px]">
                    <img className="h-5 w-5" src="/assets/svg/tokenCoin.svg" />
                    <h5 className="text-[24px] font-semibold text-typo-secondary">
                      1600
                    </h5>
                  </div>

                  <h5 className="text-[16px] font-normal text-typo-primary">
                    Referral Earnings
                  </h5>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </CommonModal>
      )}
    </>
  );
};

export default Wallet;
