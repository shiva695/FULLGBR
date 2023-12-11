// eslint-disable-next-line react/prop-types
const StarRatings = ({ stars }) => {
  let numSt = Math.floor(stars);
  let starSize = [];

  const showStars = () => {
    for (let i = 1; i <= numSt.toString(); i++) {
      starSize.push("full");
    }
    if (+stars % 1 !== 0) {
      starSize.push("half");
    }
    return starSize;
  };
  return (
    <div className="flex flex-row gap-[6px]">
      {showStars().map((el, idx) => (
        <div key={idx}>
          <img
            className="h-4.5 w-4.5"
            src={
              el === "full"
                ? "/assets/svg/rating-star.svg"
                : "/assets/svg/rating-star-half.svg"
            }
          />
        </div>
      ))}
    </div>
  );
};

export default StarRatings;
