// Common Btn1  for icon, Text
// @use <CommonBtn1 height, width => your height amd width with px text => string background color, icon => source file  />

// eslint-disable-next-line react/prop-types
const CommonBtn2 = ({ height, width, backgroundColor, icon, text }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "8px 12px 8px 12px",
        borderRadius: "8px",
        height: height,
        width: width,
        backgroundColor: backgroundColor,
      }}
    >
      <img src={icon} className="h-4 w-4" />
      <p className="text-white font-normal text-[14px]">{text}</p>
    </div>
  );
};

export default CommonBtn2;
