/* eslint-disable react/no-unescaped-entities */
// @import Dependencies
import PropTypes from "prop-types";

// @import Model Components
import CommonModal1 from "../../generalComponents/CommonModel1";
import CommonBtn3 from "../../generalComponents/CommonBtn3";

const PlayedYearModel = ({
  open,
  onSubmit,
  onChange,
  gameLogo,
  gameName,
  value,
  onInputFocus,
  onInputBlur,
  playedYearError,
  yearInputFocused,
}) => {
  if (!open) return null;
  return (
    <CommonModal1>
      <div className="w-[676px] h-[120px] rounded-[16px] flex flex-row items-center justify-between p-[24px]">
        <div className="flex flex-row w-[378px] items-center gap-[16px]">
          <img className="w-[48px] h-[48px] rounded-[6px]" src={gameLogo} />
          <div className="flex flex-col gap-[8px]">
            <h5 className="text-[15px] font-semibold text-typo-secondary">
              When you Played {`"${gameName}"`}?
            </h5>
            <h5 className="typo-normal">
              Enter the year you played this game.
            </h5>
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-row items-center gap-[16px] w-[194px] h-[40px]">
              <input
                style={{
                  boxShadow: yearInputFocused
                    ? "0px 0px 8px 2px #2A85FF99"
                    : "0px 8px 64px 0px #0000001A",
                }}
                maxLength={4}
                autoFocus
                value={value}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                className="h-[40px] w-[110px] rounded-[8px] py-[10px] px-[16px] focus:border-typo-blue outline-none border-[#2B2E30] border-[1px] bg-transparent text-typo-secondary"
                onChange={onChange}
              />
              <button type="submit">
                <CommonBtn3
                  height="40px"
                  width="68px"
                  bgColor="#2E9BFA"
                  text="Done"
                />
              </button>
            </div>
            {playedYearError && (
              <div className="flex flex-row items-center gap-[8px]">
                <img
                  src="/assets/svg/errorInfo.svg"
                  className="h-[18px] w-[18px]"
                />
                <p className="text-typo-red text-sm">{playedYearError}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </CommonModal1>
  );
};

PlayedYearModel.propTypes = {
  open: PropTypes.bool,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onInputFocus: PropTypes.func,
  onInputBlur: PropTypes.func,
  gameLogo: PropTypes.string,
  gameName: PropTypes.string,
  value: PropTypes.string,
  playedYearError: PropTypes.string,
  yearInputFocused: PropTypes.string,
};

export default PlayedYearModel;
