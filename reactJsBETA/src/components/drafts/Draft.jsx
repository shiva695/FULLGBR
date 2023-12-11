// @import Dependencies
import { useState, useRef, useEffect } from "react";

// @import Json
import constants from "../../json/constants.json";

// @import Constants
import generalConstants from "../../constants/generalConstants";

// @import Components
import Pager from "../generalComponents/Pager";
import { TabItem, Slider } from "../generalComponents/TabStyle";
import {
  DraftContainerHead,
  DraftPostsTab,
  DraftBlogsTab,
} from "./components/DraftContainer";

export default function Draft() {
  const tabListRef = useRef();

  // State variables
  const [value, setValue] = useState(0);
  const childRefs = useRef(new Map());
  const [slider, setSlider] = useState({ left: 0, right: 0 });

  const [classList, setClassList] = useState(null);

  const tabs = [constants.POSTS, constants.BLOGS];

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
      <div className="flex flex-col w-[1024px] mx-auto mt-[92px]">
        <DraftContainerHead
          heading={generalConstants.DRAFT}
          description={generalConstants.DRAFTDESCRIPTION}
        ></DraftContainerHead>
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
                <DraftPostsTab
                  drafts={[
                    { image: "/assets/png/theme-2.jpg", id: "1" },
                    { image: "/assets/png/theme-3.jpg", id: "2" },
                    { image: "/assets/png/theme-4.jpg", id: "3" },
                  ]}
                />
              )}

              {i === 1 && (
                <DraftBlogsTab
                  blogs={[
                    {
                      id: "1",
                      image: "/assets/png/theme-5.jpg",
                      heading: "images for space science",
                      description:
                        "Amidst the vibrant cityscape, a gentle breeze whispered",
                    },
                    {
                      id: "2",
                      image: "/assets/png/theme-3.jpg",
                      heading: "PlayStation Studios’ future — what to expect?",
                      description:
                        "The future of PlayStation Studios is put into question.",
                    },
                  ]}
                />
              )}
            </div>
          ))}
        </Pager>
      </div>
    </>
  );
}
