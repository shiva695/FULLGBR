import PropTypes from "prop-types";
import { toast } from "react-toastify";

const NewFeedCard = ({
  setIsPostViewModalOpen,
  setIsFeedModalOpen,
  setDoubleClicked,
  setIsStreamModalOpen,
  isFeedModalOpen,
  setIsEditPostModalOpen,
  setIsRemovePostModalOpen,
  setIsSharePostModalOpen,
  setIsFullScreenModalOpen,
  setIsLikeModalOpen,
  setValue,
}) => {
  return (
    <div className="w-[883px] mt-[32px] h-[446px]">
      <div className="flex flex-row items-center w-full h-[330px] gap-[24px]">
        {/* left div */}
        <div className="flex flex-col items-end justify-end w-[139px] h-full">
          {/* Name and profile div */}
          <div className="flex flex-row items-center gap-[10px]">
            <div className="flex flex-col gap-1">
              <h5 className="text-[14px] font-semibold text-typo-secondary">
                Wade Warren
              </h5>
              <h5 className="text-[12px] font-normal text-typo-primary">
                Today 09:00AM
              </h5>
            </div>
            <img
              className="h-8 w-8 rounded-full"
              src="/assets/svg/rating-user-avatar.svg"
            />
          </div>
          {/* save, shares, comments */}
          <div className="mt-[24px] flex flex-col items-end gap-[8px]">
            <div className="flex flex-row items-center gap-[10px]">
              <h5 className="typo-normal">20 Saves</h5>
              <div className="w-8 h-8 bg-[#212426] rounded-full flex items-center justify-center">
                <img className="h-5 w-5" src="/assets/svg/save-icon.svg" />
              </div>
            </div>
            <div className="flex flex-row items-center gap-[10px]">
              <h5 className="typo-normal">34 Shares</h5>
              <div className="w-8 h-8 bg-[#212426] rounded-full flex items-center justify-center">
                <img className="h-5 w-5" src="/assets/svg/shares-icon.svg" />
              </div>
            </div>
            <div
              onClick={() => setIsPostViewModalOpen(true)}
              className="flex flex-row items-center gap-[10px] cursor-pointer"
            >
              <h5 className="typo-normal">12 Comments</h5>
              <div className="w-8 h-8 bg-[#212426] rounded-full flex items-center justify-center">
                <img className="h-5 w-5" src="/assets/svg/comments-icon.svg" />
              </div>
            </div>
          </div>
        </div>
        {/* center div */}
        <div
          className="relative w-[616px] h-full rounded-[8px] cursor-pointer"
          onClick={() => setIsFeedModalOpen(false)}
          onDoubleClick={() => {
            setDoubleClicked(true);
            setIsStreamModalOpen(true);
          }}
        >
          <img className="w-full h-full" src="/assets/svg/Rectangle 1907.png" />
          <img
            className={`absolute cursor-pointer top-[12px] right-[12px] w-9 h-8 hover:bg-[#44474ACC] rounded-[8px] ${
              isFeedModalOpen && "bg-[#44474ACC]"
            }`}
            src="/assets/svg/menu-icon.svg"
            onClick={(ev) => {
              ev.stopPropagation();
              setIsFeedModalOpen(true);
            }}
          />
          {isFeedModalOpen && (
            <div className="w-[222px] h-[276px] absolute top-[49px] p-[8px] rounded-[12px] right-[12px] flex flex-col z-5 gap-[4px] bg-[#1A1C1F]">
              <div
                className="btn-bg1"
                onClick={() => setIsEditPostModalOpen(true)}
              >
                <img className="h-6 w-6" src="/assets/svg/edit-pen.svg" />
                <h5 className="text-typo-secondary font-normal text-[14px]">
                  Edit Post
                </h5>
              </div>
              <div
                className="btn-bg1"
                onClick={() => setIsRemovePostModalOpen(true)}
              >
                <img className="h-6 w-6" src="/assets/svg/delete-icon.svg" />
                <h5 className="text-typo-secondary font-normal text-[14px]">
                  Remove Post
                </h5>
              </div>
              <div
                className="btn-bg1"
                onClick={() =>
                  toast(
                    <div className="flex flex-row gap-[8px] justify-center items-center">
                      <img
                        className="h-6 w-6"
                        src="/assets/svg/comment-off.svg"
                      />
                      <h5 className="text-[#1A1C1F] font-semibold text-[16px]">
                        Comment turned Off
                      </h5>
                    </div>
                  )
                }
              >
                <img
                  className="h-6 w-6"
                  src="/assets/svg/turnoff-comments.svg"
                />
                <h5 className="text-typo-secondary font-normal text-[14px]">
                  Turn off comments
                </h5>
              </div>
              <div
                className="btn-bg1"
                onClick={() =>
                  toast(
                    <div className="flex flex-row gap-[8px] justify-center items-center">
                      <img
                        className="h-6 w-6"
                        src="/assets/svg/hideEye-black.svg"
                      />
                      <h5 className="text-[#1A1C1F] font-semibold text-[16px]">
                        Like count hidden
                      </h5>
                    </div>
                  )
                }
              >
                <img className="h-6 w-6" src="/assets/svg/hideEye.svg" />
                <h5 className="text-typo-secondary font-normal text-[14px]">
                  Hide like counts
                </h5>
              </div>
              <div
                className="btn-bg1"
                onClick={() => setIsSharePostModalOpen(true)}
              >
                <img className="h-6 w-6" src="/assets/svg/share-to.svg" />
                <h5 className="text-typo-secondary font-normal text-[14px]">
                  Share to
                </h5>
              </div>
              <div
                className="btn-bg1"
                onClick={() => setIsFullScreenModalOpen(true)}
              >
                <img className="h-6 w-6" src="/assets/svg/fullscreen.svg" />
                <h5 className="text-typo-secondary font-normal text-[14px]">
                  Full screen
                </h5>
              </div>
            </div>
          )}
        </div>

        {/* right div */}
        <div className="w-[80px] flex flex-col justify-end h-full">
          <div
            onClick={() => {
              setIsLikeModalOpen(true);
              setValue(0);
            }}
            className="flex flex-col items-start gap-[8px] cursor-pointer"
          >
            <div className="flex flex-row items-center gap-[10px]">
              <div className="w-8 h-8 bg-[#212426] rounded-full flex items-center justify-center">
                <img className="h-5 w-5" src="/assets/svg/thumbsup-icon.svg" />
              </div>
              <h5 className="typo-normal">12K+</h5>
            </div>
            <div className="flex flex-row items-center gap-[10px]">
              <div className="w-8 h-8 bg-[#212426] rounded-full flex items-center justify-center">
                <img className="h-5 w-5" src="/assets/svg/heart-icon.svg" />
              </div>
              <h5 className="typo-normal">8K+</h5>
            </div>
            <div className="flex flex-row items-center gap-[10px]">
              <div className="w-8 h-8 bg-[#212426] rounded-full flex items-center justify-center">
                <img className="h-5 w-5" src="/assets/svg/smile-icon.svg" />
              </div>
              <h5 className="typo-normal">45</h5>
            </div>
            <div className="flex flex-row items-center gap-[10px]">
              <div className="w-8 h-8 bg-[#212426] rounded-full flex items-center justify-center">
                <img className="h-5 w-5" src="/assets/svg/ohh-icon.svg" />
              </div>
              <h5 className="typo-normal">45</h5>
            </div>
            <div className="flex flex-row items-center gap-[10px]">
              <div className="w-8 h-8 bg-[#212426] rounded-full flex items-center justify-center">
                <img className="h-5 w-5" src="/assets/svg/welcome-icon.svg" />
              </div>
              <h5 className="typo-normal">45</h5>
            </div>
          </div>
        </div>
      </div>
      {/* Text newsfeed */}
      <div className="flex flex-col gap-[12px] w-[616px] mt-[16px] ml-[163px]">
        <h5 className="typo-semibold">
          Partial excision (craterization, saucerization, or diaphysectomy) bone
          (eg, osteomyelitis); distal phalanx of finger
        </h5>
        <h5 className="typo-normal">
          #gamingislife #mobilegaming #gamingclips #gamingroom #consolegaming
          #gamingchannel #gamingsetups #twitchgaming #fortnitegaming #gamingrig
        </h5>
      </div>
    </div>
  );
};

NewFeedCard.propTypes = {
  setIsPostViewModalOpen: PropTypes.func,
  setIsFeedModalOpen: PropTypes.func,
  setDoubleClicked: PropTypes.func,
  setIsStreamModalOpen: PropTypes.func,
  isFeedModalOpen: PropTypes.bool,
  setIsEditPostModalOpen: PropTypes.func,
  setIsRemovePostModalOpen: PropTypes.func,
  setIsSharePostModalOpen: PropTypes.func,
  setIsFullScreenModalOpen: PropTypes.func,
  setIsLikeModalOpen: PropTypes.func,
  setValue: PropTypes.func,
};

export default NewFeedCard;
