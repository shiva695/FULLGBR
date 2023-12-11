// @Import Dependencies
import PropTypes from "prop-types";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactPlayer from "react-player";
import PhotoAlbum from "react-photo-album";

// @import Utils
import helperUtils from "../../../utills/helperUtils";

// @import Components
import StarRatings from "../../generalComponents/StarRatings";
import LinearProgressbar from "../../generalComponents/Progressbar";

const TopGameContainer = ({ heading, children }) => {
  return (
    <div className="flex flex-col items-start w-full h-auto gap-[26px] mt-10">
      <h5 className="text-[20px] text-typo-secondary font-semibold">
        {heading}
      </h5>
      {children}
    </div>
  );
};

TopGameContainer.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.element,
};

const GameContainerHead = ({ heading, description, children }) => {
  return (
    <div className="flex flex-col gap-[12px] items-start mt-[32px]">
      <div className="flex flex-row gap-[12px] items-center">
        <img
          src="/assets/svg/military-medal.svg"
          className="w-[20px] h-[30px]"
        />
        <h5 className="text-[28px] font-semibold text-typo-secondary">
          {heading}
        </h5>
      </div>
      <h5 className="typo-normal">{description}</h5>
      <div className="relative">{children}</div>
    </div>
  );
};

GameContainerHead.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.array,
};

const GameDiv = ({
  mainClassName,
  onClick,
  isGameLoading,
  gameBanner,
  gameName,
}) => {
  return (
    <div className={mainClassName} onClick={onClick}>
      {isGameLoading ? (
        <SkeletonTheme
          baseColor="#2B2E30"
          highlightColor="#141517"
          duration={3}
        >
          <Skeleton className="w-[180px] h-[129px] rounded-[16px]" />
        </SkeletonTheme>
      ) : (
        <img className="w-[180px] h-[129px] rounded-[16px]" src={gameBanner} />
      )}
      {isGameLoading ? (
        <SkeletonTheme
          baseColor="#2B2E30"
          highlightColor="#141517"
          duration={3}
        >
          <Skeleton className="h-[10px] w-[180px]" />
        </SkeletonTheme>
      ) : (
        <h5 className="typo-semibold h-[60px] w-[180px]">{gameName}</h5>
      )}
    </div>
  );
};

GameDiv.propTypes = {
  mainClassName: PropTypes.string,
  onClick: PropTypes.func,
  isGameLoading: PropTypes.bool,
  gameBanner: PropTypes.string,
  gameName: PropTypes.string,
};

const PlayerDiv = ({
  mainClassName,
  onClick,
  isPlayerLoading,
  playerAvatar,
  playerName,
}) => {
  return (
    <div className={mainClassName} onClick={onClick}>
      {isPlayerLoading ? (
        <SkeletonTheme
          baseColor="#2B2E30"
          highlightColor="#141517"
          duration={3}
        >
          <Skeleton className="w-[125px] h-[125px] rounded-[16px]" />
        </SkeletonTheme>
      ) : (
        <img
          className="w-[125px] h-[125px] rounded-[16px]"
          src={playerAvatar}
        />
      )}
      {isPlayerLoading ? (
        <SkeletonTheme
          baseColor="#2B2E30"
          highlightColor="#141517"
          duration={3}
        >
          <Skeleton className="h-[60px] w-[125px]" />
        </SkeletonTheme>
      ) : (
        <h5 className="typo-semibold text-center h-[60px] w-[125px]">
          {playerName}
        </h5>
      )}
    </div>
  );
};

PlayerDiv.propTypes = {
  mainClassName: PropTypes.string,
  onClick: PropTypes.func,
  isPlayerLoading: PropTypes.bool,
  playerAvatar: PropTypes.string,
  playerName: PropTypes.string,
};

const TeamDiv = ({
  mainClassName,
  onClick,
  isTeamLoading,
  teamLogo,
  teamName,
}) => {
  return (
    <div className={mainClassName} onClick={onClick}>
      {isTeamLoading ? (
        <SkeletonTheme
          baseColor="#2B2E30"
          highlightColor="#141517"
          duration={3}
        >
          <Skeleton className="w-[125px] h-[125px] rounded-[16px]" />
        </SkeletonTheme>
      ) : (
        <img
          className="w-[125px] h-[125px] rounded-[16px] object-cover"
          src={teamLogo}
        />
      )}
      {isTeamLoading ? (
        <SkeletonTheme
          baseColor="#2B2E30"
          highlightColor="#141517"
          duration={3}
        >
          <Skeleton className="h-[60px] w-[125px]" />
        </SkeletonTheme>
      ) : (
        <h5 className="typo-semibold text-center h-[60px] w-[125px]">
          {teamName}
        </h5>
      )}
    </div>
  );
};

TeamDiv.propTypes = {
  mainClassName: PropTypes.string,
  onClick: PropTypes.func,
  isTeamLoading: PropTypes.bool,
  teamLogo: PropTypes.string,
  teamName: PropTypes.string,
};

const GameFolioContainerHead = ({ onclick, heading, gameName }) => {
  return (
    <div className="flex flex-row items-center gap-[12px] mt-[32px]">
      <div
        className="flex flex-row items-center gap-2 cursor-pointer"
        onClick={onclick}
      >
        <img className="h-3 w-3" src="/assets/svg/left-arrow.svg" />
        <h5 className="text-[16px] text-typo-primary">{heading}</h5>
      </div>
      <p className="text-typo-primary">/</p>
      <h5 className="text-[16px] text-typo-secondary font-semibold">
        {gameName}
      </h5>
    </div>
  );
};

GameFolioContainerHead.propTypes = {
  onclick: PropTypes.func,
  heading: PropTypes.string,
  gameName: PropTypes.string,
};

const GameFolioBannerContainer = ({
  isGameLoading,
  gameBanner,
  gameLogo,
  gameDescription,
  developers,
  publishers,
  genre,
  age,
  releseDate,
  totalUsers,
  children,
}) => {
  return (
    <div className="image-shade relative w-full h-[497px] mt-[16px] bg-gradient-to-tl from-black from-[70%] to-gray-600 rounded-[18px]">
      {isGameLoading ? (
        <SkeletonTheme baseColor="black" highlightColor="#141517" duration={3}>
          <Skeleton className="h-[497px] w-full ml-0.5 pt-0.5 rounded-[18px]" />
        </SkeletonTheme>
      ) : (
        <img
          src={gameBanner}
          className="h-full w-full ml-0.5 pt-0.5 rounded-[18px] object-cover"
        />
      )}

      <div className="absolute top-[32px] left-[40px]">
        {isGameLoading ? (
          <SkeletonTheme
            baseColor="#2B2E30"
            highlightColor="#141517"
            duration={3}
          >
            <Skeleton className="w-[182px] h-[160px] rounded-[18px]" />
          </SkeletonTheme>
        ) : (
          <img className="w-[182px] h-[160px]" src={gameLogo} />
        )}
        {isGameLoading ? (
          <SkeletonTheme
            baseColor="#2B2E30"
            highlightColor="#141517"
            duration={3}
          >
            <Skeleton className="w-[550px] h-[120px] mt-[22px] rounded-[18px]" />
          </SkeletonTheme>
        ) : (
          <div className="w-[550px] text-[#FBFCFC] font-light mt-[22px] h-[120px] overflow-y-scroll text-[16px]">
            {gameDescription}
          </div>
        )}
        {isGameLoading ? (
          <SkeletonTheme
            baseColor="#2B2E30"
            highlightColor="#141517"
            duration={3}
          >
            <Skeleton className="w-[full] h-[20px] mt-[30px] rounded-[18px]" />
          </SkeletonTheme>
        ) : (
          <div className="flex flex-row gap-[22px] mt-[20px]">
            <div className="flex flex-row text-[14px] space-x-2">
              <h5 className="text-typo-light">Developers: </h5>
              <h5 className="text-typo-secondary">{developers}</h5>
            </div>
            <div className="flex flex-row text-[14px] space-x-2">
              <h5 className="text-typo-light">Publishers: </h5>
              <h5 className="text-typo-secondary">{publishers}</h5>
            </div>
            <div className="flex flex-row text-[14px] space-x-2">
              <h5 className="text-typo-light">Age: </h5>
              <h5 className="text-typo-secondary">{age}</h5>
            </div>
          </div>
        )}

        {isGameLoading ? (
          <SkeletonTheme
            baseColor="#2B2E30"
            highlightColor="#141517"
            duration={3}
          >
            <Skeleton className="w-[full] h-[20px] mt-[20px] rounded-[18px]" />
          </SkeletonTheme>
        ) : (
          <div className="flex flex-row gap-[24px] mt-[20px]">
            <div className="flex flex-row text-[14px] space-x-2">
              <h5 className="text-typo-light">Genre: </h5>
              <h5 className="text-typo-secondary">{genre}</h5>
            </div>
            <div className="flex flex-row text-[14px] space-x-2">
              <h5 className="text-typo-light">Release Date: </h5>
              <h5 className="text-typo-secondary">{releseDate}</h5>
            </div>
            <div className="flex flex-row text-[14px] space-x-2">
              <h5 className="text-typo-light">Users: </h5>
              <h5 className="text-typo-secondary">{totalUsers}</h5>
            </div>
          </div>
        )}

        {isGameLoading ? (
          <SkeletonTheme
            baseColor="#2B2E30"
            highlightColor="#141517"
            duration={3}
          >
            <Skeleton className="w-[full] h-[20px] mt-[20px] rounded-[18px]" />
          </SkeletonTheme>
        ) : (
          <div className="flex flex-row gap-[12px] mt-[20px]">
            <div className="flex flex-row text-[14px] space-x-4">
              <h5 className="text-typo-light">Platforms: </h5>
              <div className="flex flex-row gap-[5px] items-center">
                {children}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

GameFolioBannerContainer.propTypes = {
  isGameLoading: PropTypes.bool,
  gameBanner: PropTypes.string,
  gameLogo: PropTypes.string,
  gameDescription: PropTypes.string,
  developers: PropTypes.string,
  publishers: PropTypes.string,
  genre: PropTypes.string,
  age: PropTypes.string,
  releseDate: PropTypes.string,
  totalUsers: PropTypes.string,
  children: PropTypes.array,
};

const GameFolioPlotContainer = ({ heading, plotDescription }) => {
  return (
    <div className="mt-[16px] flex flex-col w-full gap-[16px] rounded-[16px] px-[32px] py-[24px] bg-[#242424] bg-opacity-[40%]">
      <h5 className="text-typo-secondary font-semibold text-[18px]">
        {heading}
      </h5>
      <h5 className="text-white font-normal text-[16px]">{plotDescription}</h5>
    </div>
  );
};

GameFolioPlotContainer.propTypes = {
  heading: PropTypes.string,
  plotDescription: PropTypes.string,
};

const GameFolioAwardsContainer = ({ children }) => {
  return (
    <div className="mt-[16px] flex flex-col w-full rounded-[16px]  p-[20px] bg-[#242424] bg-opacity-[40%]">
      <table className="w-full text-sm text-left">
        <thead className="sticky top-0 bg-[#1A1C1F]">
          <tr>
            <th scope="col" className="awards-table-th">
              Awards
            </th>
            <th scope="col" className="awards-table-th">
              Category
            </th>
            <th scope="col" className="awards-table-th">
              Year
            </th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

GameFolioAwardsContainer.propTypes = {
  children: PropTypes.array,
};

const GameFolioRatingProgressContainer = ({
  heading,
  totalRatingCount,
  starCount,
}) => {
  return (
    <div className="flex flex-row gap-[19px] items-center">
      <h5 className="text-[14px] font-normal text-typo-secondary">{heading}</h5>
      <LinearProgressbar
        bgColor={"#7FD1E5"}
        rating={
          helperUtils.getProgressPercent(totalRatingCount, starCount) + "%"
        }
      />
      <h5 className="typo-normal">{starCount}</h5>
    </div>
  );
};

GameFolioRatingProgressContainer.propTypes = {
  heading: PropTypes.string,
  totalRatingCount: PropTypes.string,
  starCount: PropTypes.string,
};

const GameFolioRatingReviewContainer = ({ user }) => {
  return (
    <div className="w-full flex flex-row  items-start mt-[34px]">
      <div className="w-[30%] flex flex-row gap-[16px] items-center">
        <img className="h-10 w-10" src={user.userImage} />
        <h5 className="text-typo-secondary font-semibold text-[16px]">
          {user.userName}
        </h5>
      </div>

      <div className="w-[70%] flex flex-col gap-[10px]">
        <div className="flex flex-row items-center gap-[23px]">
          <StarRatings stars={user.rating} />

          <h5 className="text-typo-primary font-normal text-[12px]">
            {helperUtils.getDateFormat(user.createdAt, "dd/mm/yyyy")}
          </h5>
        </div>

        <h5 className="text-typo-primary font-normal text-[16px]">
          {user.comments}
        </h5>
      </div>
    </div>
  );
};

GameFolioRatingReviewContainer.propTypes = {
  user: PropTypes.object,
};

const GameFolioRatingContainer = ({
  totalRatingCount,
  onClick,
  totalReviewsCount,
  rating,
  children,
}) => {
  return (
    <div>
      <div className="mt-[16px] flex flex-col w-full h-[250px] rounded-[16px] bg-[#242424] bg-opacity-[40%] px-[32px] py-[24px]">
        <div className="flex flex-row items-center justify-between">
          <h5 className="text-typo-secondary font-semibold text-[18px]">
            Ratings({totalRatingCount})
          </h5>
          <button
            className="bg-typo-blue flex flex-row gap-[10px] items-center px-[12px] py-[8px] w-fit h-[32px] rounded-[8px] cursor-pointer"
            onClick={onClick}
          >
            <div className="flex flex-row items-center gap-2">
              <img src="/assets/svg/btn-star.svg" className="h-4 w-4" />
              <p className="text-white font-normal text-[14px]">
                Rate this game
              </p>
            </div>
          </button>
        </div>

        {/* Total Ratings div */}
        <div className="flex h-[246px] flex-row items-start gap-[45px]">
          <div className="mt-[20px] w-[285px] flex flex-col gap-[12px]">
            <h5 className="text-typo-secondary font-normal text-[14px]">
              Overall Ratings
            </h5>
            <div className="flex flex-row gap-[20px] items-center">
              <h3 className="text-typo-secondary text-[24px] font-semibold">
                {rating?.rating}
              </h3>
              <StarRatings stars={rating?.rating} />
            </div>
            <h3 className="text-typo-primary text-[12px] font-normal">
              {totalRatingCount} Global ratings
            </h3>
          </div>
          <span className="mt-[20px] separation-gradient"></span>
          <div className="mt-[20px] w-[285px] flex flex-col gap-[12px]">
            <GameFolioRatingProgressContainer
              heading="5 Star"
              starCount={rating?.ratingData?.fivestar}
              totalRatingCount={totalRatingCount}
            />
            <GameFolioRatingProgressContainer
              heading="4 Star"
              starCount={rating?.ratingData?.fourstar}
              totalRatingCount={totalRatingCount}
            />
            <GameFolioRatingProgressContainer
              heading="3 Star"
              starCount={rating?.ratingData?.threestar}
              totalRatingCount={totalRatingCount}
            />
            <GameFolioRatingProgressContainer
              heading="2 Star"
              starCount={rating?.ratingData?.twostar}
              totalRatingCount={totalRatingCount}
            />
            <GameFolioRatingProgressContainer
              heading="1 Star"
              starCount={rating?.ratingData?.onestar}
              totalRatingCount={totalRatingCount}
            />
          </div>
          <span className="mt-[20px] separation-gradient"></span>
        </div>
      </div>
      <div className="mt-[16px] flex flex-col w-full h-[400px] overflow-y-scroll rounded-[16px] bg-[#242424] bg-opacity-[40%] px-[32px] py-[24px]">
        <div className="flex flex-row items-center justify-between">
          <h5 className="text-typo-secondary font-semibold text-[18px]">
            Reviews({totalReviewsCount})
          </h5>
        </div>
        {children}
      </div>
    </div>
  );
};

GameFolioRatingContainer.propTypes = {
  children: PropTypes.array,
  totalRatingCount: PropTypes.number,
  onClick: PropTypes.func,
  totalReviewsCount: PropTypes.number,
  rating: PropTypes.object,
};

const GameFolioCreatorsContainer = ({ founders }) => {
  return (
    <div className="mt-[16px] flex flex-col w-full rounded-[16px] bg-[#242424] bg-opacity-[40%] px-[32px] py-[24px] mb-[60px]">
      <h5 className="text-typo-secondary font-semibold text-[18px]">
        Creators
      </h5>
      <div className="flex flex-row mt-[16px] gap-[16px] items-center">
        {/* Creators row */}
        {founders.map((el, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-[16px] w-[174px] h-[317px] rounded-[202px] py-[16px] px-[22px] hover-bg"
          >
            <img
              src={el.image}
              className="w-[130px] h-[171px] rounded-[189px] object-cover"
            />
            <div className="flex flex-col items-center gap-[4px]">
              <h5 className="typo-semibold">{el.name}</h5>
              <h5 className="text-[12px] text-typo-primary">
                {el.designation}
              </h5>
            </div>

            <div className="flex flex-row gap-[8px] items-center justify-center">
              <h5 className="text-typo-blue font-normal text-[14px]">
                View Profile
              </h5>
              <img
                className="w-[5px] h-[15px]"
                src="/assets/svg/right-arrow-blue.svg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

GameFolioCreatorsContainer.propTypes = {
  founders: PropTypes.array,
};

const GameFolioGalleryContainer = ({
  gameDetail,
  setIsMediaModalOpen,
  setMediaType,
  setVideoPlayer,
}) => {
  return (
    <div className="mt-[16px] flex flex-col w-full rounded-[16px] bg-[#242424] bg-opacity-[40%] px-[32px] py-[24px]">
      <h5 className="text-typo-secondary font-semibold text-[18px]">Videos</h5>
      <div className="flex flex-row flex-wrap items-center gap-[16px] mt-[16px]">
        {/* Videos render here */}
        {gameDetail?.gallery.videos.map((el, idx) => (
          <div
            key={idx}
            className=" relative w-[301px] h-[231px] rounded-[16px]"
          >
            <ReactPlayer
              url={el}
              width="301px"
              height="100%"
              style={{
                borderRadius: "16px",
                background: "white",
              }}
              config={{
                file: {
                  attributes: {
                    crossOrigin: "true",
                  },
                },
              }}
            />

            <div
              className="absolute  inset-0 flex items-center justify-center cursor-pointer"
              onClick={() => {
                setVideoPlayer(el);
                setIsMediaModalOpen(true);
                setMediaType("VIDEO");
              }}
            >
              <img className="w-12 h-12" src="/assets/svg/play-button.svg" />
            </div>
          </div>
        ))}
      </div>

      <h5 className="text-typo-secondary font-semibold text-[18px] mt-[40px] mb-[16px]">
        Images
      </h5>

      <PhotoAlbum
        layout="columns"
        photos={helperUtils.setSizeForImages(gameDetail?.gallery.images)}
        columns={3}
        spacing={10}
        onClick={() => {
          setIsMediaModalOpen(true);
          setMediaType("IMAGES");
        }}
      />
    </div>
  );
};

GameFolioGalleryContainer.propTypes = {
  gameDetail: PropTypes.object,
  setIsMediaModalOpen: PropTypes.func,
  setMediaType: PropTypes.func,
  setVideoPlayer: PropTypes.func,
};

export {
  TopGameContainer,
  GameContainerHead,
  GameDiv,
  PlayerDiv,
  TeamDiv,
  GameFolioContainerHead,
  GameFolioBannerContainer,
  GameFolioPlotContainer,
  GameFolioAwardsContainer,
  GameFolioRatingProgressContainer,
  GameFolioRatingReviewContainer,
  GameFolioRatingContainer,
  GameFolioCreatorsContainer,
  GameFolioGalleryContainer,
};
