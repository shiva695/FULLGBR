// eslint-disable-next-line react/prop-types
const CommonBtn3 = ({ height, width, bgColor, text }) => {
  return (
    <div
      style={{
        height: height,
        width: width,
        backgroundColor: bgColor,
        padding: "10px 16px 10px 16px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <h5 className="typo-semibold">{text}</h5>
    </div>
  );
};

export default CommonBtn3;
