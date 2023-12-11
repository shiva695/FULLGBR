// @import Dependencies
import PropTypes from "prop-types";

const ThemesContainerHead = ({ heading, description }) => {
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

ThemesContainerHead.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
};

const ThemesTab = ({ drafts }) => {
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

ThemesTab.propTypes = {
  drafts: PropTypes.array,
};

export { ThemesContainerHead, ThemesTab };
