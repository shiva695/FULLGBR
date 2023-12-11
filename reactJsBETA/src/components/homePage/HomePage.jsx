// @import Dependencies
import { useState, useEffect, useRef } from "react";

// @import Modals
import EditPostModal from "../commonModals/EditPostModal";
import StreamMediaModal from "../commonModals/StreamMediaModal";
import PostViewModal from "../commonModals/PostViewModal";

// @import components
// import LeftChat from "./LeftChat";
// import RightChat from "./RightChat";
import NewFeedCard from "../generalComponents/NewFeedCard";
import RemovePostModal from "../commonModals/RemovePostModal";
import SharePostModal from "../commonModals/SharePostModal";
import DirectShareModal from "../commonModals/DirectShareModal";
import LikeModalOpen from "../commonModals/LikeModalOpen";

const HomePage = () => {
  // Refs
  const tabListRef = useRef(null);
  const childRefs = useRef(new Map());

  // State variables
  const [value, setValue] = useState(null);
  const [slider, setSlider] = useState({ left: 0, right: 0 });
  const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const [isRemovePostModalOpen, setIsRemovePostModalOpen] = useState(false);
  const [isSharePostModalOpen, setIsSharePostModalOpen] = useState(false);
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);
  const [isDirectShareModalOpen, setIsDirectShareModalOpen] = useState(false);
  const [isPostViewModalOpen, setIsPostViewModalOpen] = useState(false);
  const [isLikeModalOpen, setIsLikeModalOpen] = useState(false);
  const [isStreamModalOpen, setIsStreamModalOpen] = useState(false);
  const [doubleClicked, setDoubleClicked] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);

  const tabs = [0, 1, 2, 3, 4, 5];

  // Double click Handler
  const doubleClickedHandler = (status) => {
    if (isStreamModalOpen && status) {
      setIsPostViewModalOpen(status);
      setDoubleClicked(false);
    }
  };

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

  return (
    <>
      {/* <LeftChat />
      <RightChat /> */}
      <div
        onMouseLeave={() => setIsFeedModalOpen(false)}
        className="flex flex-col w-[883px] mx-auto mt-[60px] gap-[56px]"
      >
        {/* NewsFeed 1 */}
        <NewFeedCard
          setIsPostViewModalOpen={setIsPostViewModalOpen}
          setIsFeedModalOpen={setIsFeedModalOpen}
          setDoubleClicked={setDoubleClicked}
          setIsStreamModalOpen={setIsStreamModalOpen}
          isFeedModalOpen={isFeedModalOpen}
          setIsEditPostModalOpen={setIsEditPostModalOpen}
          setIsRemovePostModalOpen={setIsRemovePostModalOpen}
          setIsSharePostModalOpen={setIsSharePostModalOpen}
          setIsFullScreenModalOpen={setIsFullScreenModalOpen}
          setIsLikeModalOpen={setIsLikeModalOpen}
          setValue={setValue}
        />
        <NewFeedCard
          setIsPostViewModalOpen={setIsPostViewModalOpen}
          setIsFeedModalOpen={setIsFeedModalOpen}
          setDoubleClicked={setDoubleClicked}
          setIsStreamModalOpen={setIsStreamModalOpen}
          isFeedModalOpen={isFeedModalOpen}
          setIsEditPostModalOpen={setIsEditPostModalOpen}
          setIsRemovePostModalOpen={setIsRemovePostModalOpen}
          setIsSharePostModalOpen={setIsSharePostModalOpen}
          setIsFullScreenModalOpen={setIsFullScreenModalOpen}
          setIsLikeModalOpen={setIsLikeModalOpen}
          setValue={setValue}
        />
        <NewFeedCard
          setIsPostViewModalOpen={setIsPostViewModalOpen}
          setIsFeedModalOpen={setIsFeedModalOpen}
          setDoubleClicked={setDoubleClicked}
          setIsStreamModalOpen={setIsStreamModalOpen}
          isFeedModalOpen={isFeedModalOpen}
          setIsEditPostModalOpen={setIsEditPostModalOpen}
          setIsRemovePostModalOpen={setIsRemovePostModalOpen}
          setIsSharePostModalOpen={setIsSharePostModalOpen}
          setIsFullScreenModalOpen={setIsFullScreenModalOpen}
          setIsLikeModalOpen={setIsLikeModalOpen}
          setValue={setValue}
        />
      </div>

      {isEditPostModalOpen && (
        <EditPostModal
          open={isEditPostModalOpen}
          close={() => setIsEditPostModalOpen(false)}
          mediaType={"IMAGE"}
        />
      )}

      {isFullScreenModalOpen && (
        <StreamMediaModal
          open={isFullScreenModalOpen}
          close={() => setIsFullScreenModalOpen(false)}
          mediaType={"IMAGE"}
        />
      )}

      {isRemovePostModalOpen && (
        <RemovePostModal setIsRemovePostModalOpen={setIsRemovePostModalOpen} />
      )}
      {isSharePostModalOpen && (
        <SharePostModal
          setIsSharePostModalOpen={setIsSharePostModalOpen}
          setIsDirectShareModalOpen={setIsDirectShareModalOpen}
        />
      )}

      {/* Direct share modal */}
      {isDirectShareModalOpen && (
        <DirectShareModal
          setIsDirectShareModalOpen={setIsDirectShareModalOpen}
          searchFocus={searchFocus}
          setSearchFocus={setSearchFocus}
        />
      )}

      {isPostViewModalOpen && (
        <PostViewModal
          open={isPostViewModalOpen}
          close={() => setIsPostViewModalOpen(false)}
          mediaType="IMAGE"
        />
      )}

      {isStreamModalOpen && (
        <StreamMediaModal
          open={isStreamModalOpen}
          close={() => setIsStreamModalOpen(false)}
          mediaType={"IMAGE"}
          path="post-view"
          doubleClicked={doubleClicked}
          doubleClickedHandler={doubleClickedHandler}
        />
      )}

      {isLikeModalOpen && (
        <LikeModalOpen
          tabListRef={tabListRef}
          value={value}
          childRefs={childRefs}
          setValue={setValue}
          setIsLikeModalOpen={setIsLikeModalOpen}
          slider={slider}
          tabs={tabs}
        />
      )}
    </>
  );
};

export default HomePage;
