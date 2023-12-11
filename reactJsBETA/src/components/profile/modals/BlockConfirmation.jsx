import CommonBtn3 from "../../generalComponents/CommonBtn3";
import CommonModal1 from "../../generalComponents/CommonModel1";
import PropTypes from "prop-types";

const BlockConfirmation = ({ setShowBlockConfirmation }) => {
  return (
    <CommonModal1>
      <div className="w-[404px] h-[316px] flex flex-col justify-between rounded-[16px] p-[24px]">
        <div className="flex flex-col gap-[8px]  justify-center items-center">
          <img
            src="/assets/svg/Ellipse 1297.svg"
            className="w-[58px] h-[58px]"
          />
          <h5 className="text-[18px] text-typo-secondary w-[236px] h-[52px] text-center ">
            Are you sure you want to block Esther Howard ?
          </h5>
          <h5 className="typo-normal w-[261px] h-[54px] text-center font-normal text-[12px] leading-[18px] mt-[12px] text-[#7D8185]">
            They can&apos;t find your profile, posts, or story on Gamersback,
            and the platform won&apos;t alert them about your block.
          </h5>

          <div className="flex flex-row justify-between mt-[32px]">
            <div
              onClick={() => setShowBlockConfirmation(false)}
              className="hover:opacity-80 "
            >
              <CommonBtn3
                height="44px"
                width="170px"
                bgColor="#2B2E30"
                text="Cancel"
              />
            </div>
            <div
              onClick={() => setShowBlockConfirmation(false)}
              className="hover:opacity-80 ml-[16px]"
            >
              <CommonBtn3
                height="44px"
                width="170px"
                bgColor="#FF523B"
                text="Block"
              />
            </div>
          </div>
        </div>
      </div>
    </CommonModal1>
  );
};

BlockConfirmation.propTypes = {
  setShowBlockConfirmation: PropTypes.func,
};

export default BlockConfirmation;
