// @import dependencies
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// @import Json
import constants from "../../json/constants.json";
import responseData from "../../json/test.json";

// @import Constants
import generalConstants from "../../constants/generalConstants";
import apiConstants from "../../constants/apiConstants";

// @import Utils
import { config } from "../../utills/configUtils";
import { invokeApi } from "../../utills/apiService";
import helperUtils from "../../utills/helperUtils";

// @import Modals
import WriteReviewModal from "./modals/WriteReviewModal";
import StreamMediaModal from "../commonModals/StreamMediaModal";

// @import components
import Pager from "../generalComponents/Pager";
import { TabItem, Slider } from "../generalComponents/TabStyle";
import {
  GameFolioContainerHead,
  GameFolioBannerContainer,
  GameFolioPlotContainer,
  GameFolioAwardsContainer,
  GameFolioRatingContainer,
  GameFolioRatingReviewContainer,
  GameFolioCreatorsContainer,
  GameFolioGalleryContainer,
} from "./components/GameContainer";

const GameFolio = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabListRef = useRef();

  // State variables
  const [value, setValue] = useState(0);
  const childRefs = useRef(new Map());
  const [slider, setSlider] = useState({ left: 0, right: 0 });

  const [gameDetail, setGameDetail] = useState(responseData.data);
  const [invokeGameDetail, setInvokeGameDetail] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isGameLoading, setIsGameLoading] = useState(true);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaType, setMediaType] = useState(null);
  const [videoPlayer, setVideoPlayer] = useState(null);

  const tabs = [
    constants.PLOT,
    constants.AWARDS,
    constants.RATINGANDREVIEW,
    constants.GALLERY,
    constants.CREATORS,
  ];

  // get comment data and append
  const getCommentData = (data) => {
    let copy = JSON.parse(JSON.stringify(gameDetail));
    copy.rating.ratingData = data.ratingData;
    copy.rating.comments.unshift(...data.comments);
    copy.rating.rating = data.rating;
    copy.rating.totalRatingCount = data.totalRatingCount;
    copy.rating.totalReviewsCount = data.totalReviewsCount;
    setGameDetail(copy);
  };

  //get game details
  useEffect(() => {
    const getGamepediaHomeData = async () => {
      let params = {
        _id: location?.state?.gameId,
      };
      const controller = new AbortController();
      const { signal } = controller;
      const response = await invokeApi(
        config.baseUrl + apiConstants.getGamepediaData,
        params,
        { signal }
      );
      if (response.customcode === 200) {
        setGameDetail(response.data);
        let timer = setTimeout(() => setIsGameLoading(false), 1000);
        return () => clearTimeout(timer);
      } else {
        alert("Something went wrong");
      }
      // UseEffect abort on unmount for cleanup
      return () => {
        controller.abort();
      };
    };

    if (invokeGameDetail) {
      setInvokeGameDetail(false);
      getGamepediaHomeData();
    }
  }, [invokeGameDetail, location]);

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
      <div className="flex flex-col w-[1100px] h-auto pb-[90px] mx-auto mt-[60px]">
        <GameFolioContainerHead
          heading={generalConstants.GAMEFOLIO}
          gameName={gameDetail?.gameName}
          onclick={() => navigate(constants.PATH.NAVIGATEGAMEFOLIO)}
        />

        <GameFolioBannerContainer
          isGameLoading={isGameLoading}
          gameBanner={gameDetail?.gameBanner}
          gameLogo={gameDetail?.gameLogo}
          gameDescription={gameDetail?.gameDescription}
          developers={gameDetail?.developers}
          publishers={gameDetail?.publishers}
          age={gameDetail?.age}
          genre={gameDetail?.genre[0]}
          releseDate={helperUtils.getDateFormat(
            gameDetail?.releseDate,
            "dd/mm/yyyy"
          )}
          totalUsers={gameDetail?.totalUsers}
        >
          {gameDetail?.platform?.map((el, idx) => (
            <div
              key={idx}
              className="w-fit h-[24px] bg-[#B5E4CA] rounded-[8px] py-[3px] px-[12px] flex justify-center items-center"
            >
              <h5 className="text-[12px] text-[#1A1C1F] font-semibold">{el}</h5>
            </div>
          ))}
        </GameFolioBannerContainer>

        {/* Tabs */}
        <div className="relative border-line mt-[42px]" ref={tabListRef}>
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
            <div key={tab} className="w-full px-3">
              {i === 0 && (
                <GameFolioPlotContainer
                  heading="Plot"
                  plotDescription={gameDetail?.plotDescription}
                />
              )}
              {i === 1 && (
                <GameFolioAwardsContainer>
                  {gameDetail?.awards.map((el, idx) => (
                    <tr key={idx} className="bg-transparent">
                      <td className="px-6 py-3 text-typo-secondary font-semibold text-[14px]">
                        {el.name}
                      </td>
                      <td className="px-6 py-3 text-typo-secondary font-semibold text-[14px]">
                        {el.category}
                      </td>
                      <td className="px-6 py-3 text-typo-secondary font-semibold text-[14px]">
                        {el.date.substring(0, 4)}
                      </td>
                    </tr>
                  ))}
                </GameFolioAwardsContainer>
              )}
              {i === 2 && (
                <GameFolioRatingContainer
                  rating={gameDetail?.rating}
                  totalRatingCount={gameDetail?.rating.totalRatingCount}
                  totalReviewsCount={gameDetail?.rating.totalReviewsCount}
                  onClick={() => setIsReviewModalOpen(true)}
                >
                  {gameDetail?.rating.comments.map((el, idx) => (
                    <GameFolioRatingReviewContainer key={idx} user={el} />
                  ))}
                </GameFolioRatingContainer>
              )}
              {i === 3 && (
                <GameFolioGalleryContainer
                  gameDetail={gameDetail}
                  setVideoPlayer={setVideoPlayer}
                  setIsMediaModalOpen={setIsMediaModalOpen}
                  setMediaType={setMediaType}
                />
              )}
              {i === 4 && (
                <GameFolioCreatorsContainer founders={gameDetail?.founders} />
              )}
            </div>
          ))}
        </Pager>
      </div>

      {isReviewModalOpen && (
        <WriteReviewModal
          open={isReviewModalOpen}
          close={() => setIsReviewModalOpen(false)}
          gameId={location?.state?.gameId}
          getCommentData={getCommentData}
        />
      )}

      <StreamMediaModal
        open={isMediaModalOpen}
        close={() => setIsMediaModalOpen(false)}
        mediaType={mediaType}
        video={videoPlayer}
        path="game-detail"
      />
    </>
  );
};

export default GameFolio;
