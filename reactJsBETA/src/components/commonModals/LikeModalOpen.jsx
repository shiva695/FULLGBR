import PropTypes from "prop-types";
import { Slider, TabItem } from "../generalComponents/TabStyle";
import CommonBtn1 from "../generalComponents/CommonBtn1";
import CommonModal from "../generalComponents/CommonModal";
import Pager from "../generalComponents/Pager";

const LikeModalOpen = ({
  tabListRef,
  value,
  childRefs,
  setValue,
  setIsLikeModalOpen,
  slider,
  tabs,
}) => {
  return (
    <CommonModal>
      <div className="w-[560px] h-[568px] flex flex-col">
        {/* Modal Header */}
        <div className="flex flex-row items-center justify-between pr-[24px] pl-[8px] h-[64px] rounded-tr-[16px] rounded-tl-[16px] modal-header">
          {/* Tabs */}
          <div className="relative flex flex-row items-center" ref={tabListRef}>
            <TabItem
              key={0}
              isActive={0 === value}
              transition={{ duration: 0.1 }}
              ref={(el) => childRefs.current.set(0, el)}
              onClick={() => setValue(0)}
            >
              All (48)
            </TabItem>

            <TabItem
              key={1}
              isActive={1 === value}
              transition={{ duration: 0.1 }}
              ref={(el) => childRefs.current.set(1, el)}
              onClick={() => setValue(1)}
            >
              <div className="flex flex-row items-center justify-center gap-[4px]">
                <img
                  className="h-[18px] w-[18px]"
                  src="/assets/svg/heart-icon.svg"
                />
                <h5>32</h5>
              </div>
            </TabItem>

            <TabItem
              key={2}
              isActive={2 === value}
              transition={{ duration: 0.1 }}
              ref={(el) => childRefs.current.set(2, el)}
              onClick={() => setValue(2)}
            >
              <div className="flex flex-row items-center justify-center gap-[4px]">
                <img
                  className="h-[18px] w-[18px]"
                  src="/assets/svg/thumbsup-icon.svg"
                />
                <h5>32</h5>
              </div>
            </TabItem>

            <TabItem
              key={3}
              isActive={3 === value}
              transition={{ duration: 0.1 }}
              ref={(el) => childRefs.current.set(3, el)}
              onClick={() => setValue(3)}
            >
              <div className="flex flex-row items-center justify-center gap-[4px]">
                <img
                  className="h-[18px] w-[18px]"
                  src="/assets/svg/ohh-icon.svg"
                />
                <h5>32</h5>
              </div>
            </TabItem>

            <TabItem
              key={4}
              isActive={4 === value}
              transition={{ duration: 0.1 }}
              ref={(el) => childRefs.current.set(4, el)}
              onClick={() => setValue(4)}
            >
              <div className="flex flex-row items-center justify-center gap-[4px]">
                <img
                  className="h-[18px] w-[18px]"
                  src="/assets/svg/smile-icon.svg"
                />
                <h5>32</h5>
              </div>
            </TabItem>

            <TabItem
              key={5}
              isActive={5 === value}
              transition={{ duration: 0.1 }}
              ref={(el) => childRefs.current.set(5, el)}
              onClick={() => setValue(5)}
            >
              <div className="flex flex-row items-center justify-center gap-[4px]">
                <img
                  className="h-[18px] w-[18px]"
                  src="/assets/svg/welcome-icon.svg"
                />
                <h5>32</h5>
              </div>
            </TabItem>
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
              ></Slider>
            )}
          </div>
          <img
            src="/assets/svg/close-btn.svg"
            className="w-3 h-3 cursor-pointer"
            onClick={() => setIsLikeModalOpen(false)}
          />
        </div>
        {/* Modal Body */}
        <Pager value={value}>
          {tabs.map((tab, i) => (
            <div key={tab} className="w-full h-auto px-[24px]">
              {i === 0 && (
                <div className="h-[490px] overflow-y-scroll overscroll-contain flex flex-col gap-[4px] mt-2">
                  {/* Row 1 */}
                  <div className="flex flex-row w-full h-[72px] items-center justify-between py-[12px]">
                    {/* Left */}
                    <div className="flex flex-row items-center gap-[12px]">
                      <div className="relative h-[48px] w-[48px] rounded-full">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="/assets/svg/newsfeed-img1.svg"
                        />
                        <img
                          className="absolute top-0 right-[-4px]"
                          src="/assets/svg/heart-icon.svg"
                        />
                      </div>

                      <div className="flex flex-col gap-[4px]">
                        <div className="flex flex-row items-center gap-[10px]">
                          <h5 className="typo-semibold">Jerome Bell</h5>
                          <div className="flex justify-center items-center w-[135px] h-[22px] px-[2px] py-[12px] profile-gradient-border rounded-full">
                            <p className="flex justify-center items-center w-[135px] h-[22px] bg-[#141517] text-[12px] font-normal rounded-full text-typo-secondary">
                              Pro Esports Athelete
                            </p>
                          </div>
                        </div>
                        <h5 className="typo-normal">Rachelle Mayfield</h5>
                      </div>
                    </div>
                    {/* Right */}
                    <CommonBtn1 height="32px" width="67px" text="Folow" />
                  </div>
                  {/* Row 2 */}
                  <div className="flex flex-row w-full h-[72px] items-center justify-between py-[12px]">
                    {/* Left */}
                    <div className="flex flex-row items-center gap-[12px]">
                      <div className="relative h-[48px] w-[48px] rounded-full">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="/assets/svg/newsfeed-img1.svg"
                        />
                        <img
                          className="absolute top-0 right-[-4px]"
                          src="/assets/svg/smile-icon.svg"
                        />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <h5 className="typo-semibold">Jerome Bell</h5>
                        <h5 className="typo-normal">Rachelle Mayfield</h5>
                      </div>
                    </div>
                    {/* Right */}
                    <CommonBtn1
                      height="32px"
                      width="87px"
                      text="Folowing"
                      bgColor="#2B2E30"
                    />
                  </div>
                  {/* Row 3 */}
                  <div className="flex flex-row w-full h-[72px] items-center justify-between py-[12px]">
                    {/* Left */}
                    <div className="flex flex-row items-center gap-[12px]">
                      <div className="relative h-[48px] w-[48px] rounded-full">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="/assets/svg/newsfeed-img1.svg"
                        />
                        <img
                          className="absolute top-0 right-[-4px]"
                          src="/assets/svg/thumbsup-icon.svg"
                        />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <h5 className="typo-semibold">Jerome Bell</h5>
                        <h5 className="typo-normal">Rachelle Mayfield</h5>
                      </div>
                    </div>
                    {/* Right */}
                    <CommonBtn1
                      height="32px"
                      width="87px"
                      text="Folowing"
                      bgColor="#2B2E30"
                    />
                  </div>
                  {/* Row 4 */}
                  <div className="flex flex-row w-full h-[72px] items-center justify-between py-[12px]">
                    {/* Left */}
                    <div className="flex flex-row items-center gap-[12px]">
                      <div className="relative h-[48px] w-[48px] rounded-full">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="/assets/svg/newsfeed-img1.svg"
                        />
                        <img
                          className="absolute top-0 right-[-4px]"
                          src="/assets/svg/ohh-icon.svg"
                        />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <h5 className="typo-semibold">Jerome Bell</h5>
                        <h5 className="typo-normal">Rachelle Mayfield</h5>
                      </div>
                    </div>
                    {/* Right */}
                    <CommonBtn1
                      height="32px"
                      width="87px"
                      text="Folowing"
                      bgColor="#2B2E30"
                    />
                  </div>
                  {/* Row 5 */}
                  <div className="flex flex-row w-full h-[72px] items-center justify-between py-[12px]">
                    {/* Left */}
                    <div className="flex flex-row items-center gap-[12px]">
                      <div className="relative h-[48px] w-[48px] rounded-full">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="/assets/svg/newsfeed-img1.svg"
                        />
                        <img
                          className="absolute top-0 right-[-4px]"
                          src="/assets/svg/welcome-icon.svg"
                        />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <h5 className="typo-semibold">Jerome Bell</h5>
                        <h5 className="typo-normal">Rachelle Mayfield</h5>
                      </div>
                    </div>
                    {/* Right */}
                    <CommonBtn1
                      height="32px"
                      width="87px"
                      text="Folowing"
                      bgColor="#2B2E30"
                    />
                  </div>
                </div>
              )}
              {i === 1 && (
                <div className="h-[490px] overflow-y-scroll overscroll-contain flex flex-col gap-[4px] mt-2">
                  {/* Row 1 */}
                  <div className="flex flex-row w-full h-[72px] items-center justify-between py-[12px]">
                    {/* Left */}
                    <div className="flex flex-row items-center gap-[12px]">
                      <div className="relative h-[48px] w-[48px] rounded-full">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="/assets/svg/newsfeed-img1.svg"
                        />
                        <img
                          className="absolute top-0 right-[-4px]"
                          src="/assets/svg/heart-icon.svg"
                        />
                      </div>

                      <div className="flex flex-col gap-[4px]">
                        <div className="flex flex-row items-center gap-[10px]">
                          <h5 className="typo-semibold">Jerome Bell</h5>
                          <div className="flex justify-center items-center w-[135px] h-[22px] px-[2px] py-[12px] profile-gradient-border rounded-full">
                            <p className="flex justify-center items-center w-[135px] h-[22px] bg-[#141517] text-[12px] font-normal rounded-full text-typo-secondary">
                              Pro Esports Athelete
                            </p>
                          </div>
                        </div>
                        <h5 className="typo-normal">Rachelle Mayfield</h5>
                      </div>
                    </div>
                    {/* Right */}
                    <CommonBtn1 height="32px" width="67px" text="Folow" />
                  </div>
                  {/* Row 2 */}
                  <div className="flex flex-row w-full h-[72px] items-center justify-between py-[12px]">
                    {/* Left */}
                    <div className="flex flex-row items-center gap-[12px]">
                      <div className="relative h-[48px] w-[48px] rounded-full">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="/assets/svg/newsfeed-img1.svg"
                        />
                        <img
                          className="absolute top-0 right-[-4px]"
                          src="/assets/svg/heart-icon.svg"
                        />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <h5 className="typo-semibold">Jerome Bell</h5>
                        <h5 className="typo-normal">Rachelle Mayfield</h5>
                      </div>
                    </div>
                    {/* Right */}
                    <CommonBtn1
                      height="32px"
                      width="87px"
                      text="Folowing"
                      bgColor="#2B2E30"
                    />
                  </div>
                  {/* Row 3 */}
                  <div className="flex flex-row w-full h-[72px] items-center justify-between py-[12px]">
                    {/* Left */}
                    <div className="flex flex-row items-center gap-[12px]">
                      <div className="relative h-[48px] w-[48px] rounded-full">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="/assets/svg/newsfeed-img1.svg"
                        />
                        <img
                          className="absolute top-0 right-[-4px]"
                          src="/assets/svg/heart-icon.svg"
                        />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <h5 className="typo-semibold">Jerome Bell</h5>
                        <h5 className="typo-normal">Rachelle Mayfield</h5>
                      </div>
                    </div>
                    {/* Right */}
                    <CommonBtn1
                      height="32px"
                      width="87px"
                      text="Folowing"
                      bgColor="#2B2E30"
                    />
                  </div>
                </div>
              )}
              {i === 2 && (
                <div className="h-[490px] overflow-y-scroll overscroll-contain flex flex-col gap-[4px] mt-2">
                  {/* Row 2 */}
                  <div className="flex flex-row w-full h-[72px] items-center justify-between py-[12px]">
                    {/* Left */}
                    <div className="flex flex-row items-center gap-[12px]">
                      <div className="relative h-[48px] w-[48px] rounded-full">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="/assets/svg/newsfeed-img1.svg"
                        />
                        <img
                          className="absolute top-0 right-[-4px]"
                          src="/assets/svg/thumbsup-icon.svg"
                        />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <h5 className="typo-semibold">Jerome Bell</h5>
                        <h5 className="typo-normal">Rachelle Mayfield</h5>
                      </div>
                    </div>
                    {/* Right */}
                    <CommonBtn1
                      height="32px"
                      width="87px"
                      text="Folowing"
                      bgColor="#2B2E30"
                    />
                  </div>
                  {/* Row 3 */}
                  <div className="flex flex-row w-full h-[72px] items-center justify-between py-[12px]">
                    {/* Left */}
                    <div className="flex flex-row items-center gap-[12px]">
                      <div className="relative h-[48px] w-[48px] rounded-full">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="/assets/svg/newsfeed-img1.svg"
                        />
                        <img
                          className="absolute top-0 right-[-4px]"
                          src="/assets/svg/thumbsup-icon.svg"
                        />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <h5 className="typo-semibold">Jerome Bell</h5>
                        <h5 className="typo-normal">Rachelle Mayfield</h5>
                      </div>
                    </div>
                    {/* Right */}
                    <CommonBtn1
                      height="32px"
                      width="87px"
                      text="Folowing"
                      bgColor="#2B2E30"
                    />
                  </div>
                </div>
              )}
              {i === 3 && (
                <div className="h-[490px] overflow-y-scroll overscroll-contain flex flex-col gap-[4px] mt-2">
                  {/* Row 1 */}
                  <div className="flex flex-row w-full h-[72px] items-center justify-between py-[12px]">
                    {/* Left */}
                    <div className="flex flex-row items-center gap-[12px]">
                      <div className="relative h-[48px] w-[48px] rounded-full">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="/assets/svg/newsfeed-img1.svg"
                        />
                        <img
                          className="absolute top-0 right-[-4px]"
                          src="/assets/svg/ohh-icon.svg"
                        />
                      </div>

                      <div className="flex flex-col gap-[4px]">
                        <div className="flex flex-row items-center gap-[10px]">
                          <h5 className="typo-semibold">Jerome Bell</h5>
                          <div className="flex justify-center items-center w-[135px] h-[22px] px-[2px] py-[12px] profile-gradient-border rounded-full">
                            <p className="flex justify-center items-center w-[135px] h-[22px] bg-[#141517] text-[12px] font-normal rounded-full text-typo-secondary">
                              Pro Esports Athelete
                            </p>
                          </div>
                        </div>
                        <h5 className="typo-normal">Rachelle Mayfield</h5>
                      </div>
                    </div>
                    {/* Right */}
                    <CommonBtn1 height="32px" width="67px" text="Folow" />
                  </div>
                  {/* Row 2 */}
                  <div className="flex flex-row w-full h-[72px] items-center justify-between py-[12px]">
                    {/* Left */}
                    <div className="flex flex-row items-center gap-[12px]">
                      <div className="relative h-[48px] w-[48px] rounded-full">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="/assets/svg/newsfeed-img1.svg"
                        />
                        <img
                          className="absolute top-0 right-[-4px]"
                          src="/assets/svg/ohh-icon.svg"
                        />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <h5 className="typo-semibold">Jerome Bell</h5>
                        <h5 className="typo-normal">Rachelle Mayfield</h5>
                      </div>
                    </div>
                    {/* Right */}
                    <CommonBtn1
                      height="32px"
                      width="87px"
                      text="Folowing"
                      bgColor="#2B2E30"
                    />
                  </div>
                  {/* Row 3 */}
                  <div className="flex flex-row w-full h-[72px] items-center justify-between py-[12px]">
                    {/* Left */}
                    <div className="flex flex-row items-center gap-[12px]">
                      <div className="relative h-[48px] w-[48px] rounded-full">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="/assets/svg/newsfeed-img1.svg"
                        />
                        <img
                          className="absolute top-0 right-[-4px]"
                          src="/assets/svg/ohh-icon.svg"
                        />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <h5 className="typo-semibold">Jerome Bell</h5>
                        <h5 className="typo-normal">Rachelle Mayfield</h5>
                      </div>
                    </div>
                    {/* Right */}
                    <CommonBtn1
                      height="32px"
                      width="87px"
                      text="Folowing"
                      bgColor="#2B2E30"
                    />
                  </div>
                </div>
              )}
              {i === 4 && (
                <div className="h-[490px] overflow-y-scroll overscroll-contain flex flex-col gap-[4px] mt-2">
                  {/* Row 2 */}
                  <div className="flex flex-row w-full h-[72px] items-center justify-between py-[12px]">
                    {/* Left */}
                    <div className="flex flex-row items-center gap-[12px]">
                      <div className="relative h-[48px] w-[48px] rounded-full">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="/assets/svg/newsfeed-img1.svg"
                        />
                        <img
                          className="absolute top-0 right-[-4px]"
                          src="/assets/svg/smile-icon.svg"
                        />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <h5 className="typo-semibold">Jerome Bell</h5>
                        <h5 className="typo-normal">Rachelle Mayfield</h5>
                      </div>
                    </div>
                    {/* Right */}
                    <CommonBtn1
                      height="32px"
                      width="87px"
                      text="Folowing"
                      bgColor="#2B2E30"
                    />
                  </div>
                  {/* Row 3 */}
                  <div className="flex flex-row w-full h-[72px] items-center justify-between py-[12px]">
                    {/* Left */}
                    <div className="flex flex-row items-center gap-[12px]">
                      <div className="relative h-[48px] w-[48px] rounded-full">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="/assets/svg/newsfeed-img1.svg"
                        />
                        <img
                          className="absolute top-0 right-[-4px]"
                          src="/assets/svg/smile-icon.svg"
                        />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <h5 className="typo-semibold">Jerome Bell</h5>
                        <h5 className="typo-normal">Rachelle Mayfield</h5>
                      </div>
                    </div>
                    {/* Right */}
                    <CommonBtn1
                      height="32px"
                      width="87px"
                      text="Folowing"
                      bgColor="#2B2E30"
                    />
                  </div>
                </div>
              )}
              {i === 5 && (
                <div className="h-[490px] overflow-y-scroll overscroll-contain flex flex-col gap-[4px] mt-2">
                  {/* Row 2 */}
                  <div className="flex flex-row w-full h-[72px] items-center justify-between py-[12px]">
                    {/* Left */}
                    <div className="flex flex-row items-center gap-[12px]">
                      <div className="relative h-[48px] w-[48px] rounded-full">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="/assets/svg/newsfeed-img1.svg"
                        />
                        <img
                          className="absolute top-0 right-[-4px]"
                          src="/assets/svg/welcome-icon.svg"
                        />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <h5 className="typo-semibold">Jerome Bell</h5>
                        <h5 className="typo-normal">Rachelle Mayfield</h5>
                      </div>
                    </div>
                    {/* Right */}
                    <CommonBtn1
                      height="32px"
                      width="87px"
                      text="Folowing"
                      bgColor="#2B2E30"
                    />
                  </div>
                  {/* Row 3 */}
                  <div className="flex flex-row w-full h-[72px] items-center justify-between py-[12px]">
                    {/* Left */}
                    <div className="flex flex-row items-center gap-[12px]">
                      <div className="relative h-[48px] w-[48px] rounded-full">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="/assets/svg/newsfeed-img1.svg"
                        />
                        <img
                          className="absolute top-0 right-[-4px]"
                          src="/assets/svg/welcome-icon.svg"
                        />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <h5 className="typo-semibold">Jerome Bell</h5>
                        <h5 className="typo-normal">Rachelle Mayfield</h5>
                      </div>
                    </div>
                    {/* Right */}
                    <CommonBtn1
                      height="32px"
                      width="87px"
                      text="Folowing"
                      bgColor="#2B2E30"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </Pager>
      </div>
    </CommonModal>
  );
};

LikeModalOpen.propTypes = {
  tabListRef: PropTypes.object,
  childRefs: PropTypes.object,
  value: PropTypes.number,
  setValue: PropTypes.func,
  setIsLikeModalOpen: PropTypes.func,
  slider: PropTypes.object,
  tabs: PropTypes.array,
};

export default LikeModalOpen;
