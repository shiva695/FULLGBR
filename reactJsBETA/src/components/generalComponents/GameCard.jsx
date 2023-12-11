import PropTypes from "prop-types";

const GameCard = ({ onClick, gameLogo, gameName }) => {
  return (
    <div
      className="flex flex-col items-center gap-[8px] cursor-pointer"
      onClick={onClick}
    >
      <img
        className="w-[95px] h-[102px] bg-black rounded-[12px]"
        src={gameLogo}
      />
      <h5 className="text-[12px] h-[36px] w-[95px] overflow-y-scroll text-center font-semibold text-typo-primary">
        {gameName}
      </h5>
    </div>
  );
};

GameCard.propTypes = {
  gameName: PropTypes.string,
  gameLogo: PropTypes.string,
  onClick: PropTypes.func,
};

export default GameCard;
