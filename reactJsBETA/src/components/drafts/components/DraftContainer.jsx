// @import Dependencies
import PropTypes from "prop-types";

const DraftContainerHead = ({ heading, description }) => {
  return (
    <div className="flex flex-col gap-[12px] items-start mt-[32px]">
      <div className="flex flex-row gap-[12px] items-center">
        <img src="/assets/svg/draftIcon.svg" className="w-[30px] h-[30px]" />
        <h5 className="text-[28px] font-semibold text-typo-secondary">
          {heading}
        </h5>
      </div>
      <h5 className="typo-normal">{description}</h5>
    </div>
  );
};

DraftContainerHead.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
};

const DraftPostsTab = ({ drafts }) => {
  return (
    <div className="flex flex-row items-center gap-[16px] mt-[16px]">
      {drafts.map((drft, idx) => {
        return (
          <div
            key={idx}
            className="group relative h-[240px] w-[322px] rounded-[8px]"
          >
            <img
              src={drft?.image}
              className="w-full h-full object-cover rounded-[8px]"
            />
            <div className="absolute inset-0 hidden group-hover:flex flex-row gap-[16px] justify-center items-center">
              <img
                className="h-[32px] w-[36px]"
                src="/assets/svg/hoverEditBtn.svg"
              />
              <img
                className="h-[32px] w-[36px]"
                src="/assets/svg/hoverDeleteBtn.svg"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

DraftPostsTab.propTypes = {
  drafts: PropTypes.array,
};

const DraftBlogsTab = ({ blogs }) => {
  return (
    <div className="flex flex-row items-center gap-[16px] flex-wrap">
      {blogs.map((blg, idx) => {
        return (
          <div
            key={idx}
            className="relative group bg-gradient-to-tl from-[#252525] rounded-[8px] from-[70%] to-gray-600 mt-[16px] w-[492px] h-[188px"
          >
            <div className="flex flex-row gap-[20px] bg-[#252525] bg-opacity-[100%] mt-[1px] ml-[1px] w-[492px] h-[188px] p-[20px]  bg-[url('/assets/svg/Noise1.svg')] bg-no-repeat  items-start rounded-[8px]">
              <img
                className="h-[112px] w-[112px] rounded-[8px] object-cover"
                src={blg.image}
              />
              <div className="flex flex-col w-full h-[112px] gap-[12px]">
                <h1 className="text-[18px] text-typo-secondary">
                  {blg.heading}
                </h1>
                <h5 className="text-[16px] text-typo-primary font-normal">
                  {blg.description}
                </h5>
              </div>
            </div>
            <div className="absolute bottom-3 left-5 hidden group-hover:flex flex-row gap-[16px] justify-center items-center">
              <img
                className="h-[32px] w-[36px]"
                src="/assets/svg/hoverEditBtn.svg"
              />
              <img
                className="h-[32px] w-[36px]"
                src="/assets/svg/hoverDeleteBtn.svg"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

DraftBlogsTab.propTypes = {
  blogs: PropTypes.array,
};

export { DraftContainerHead, DraftPostsTab, DraftBlogsTab };
