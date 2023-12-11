// eslint-disable-next-line react/prop-types
const GradientHeader = ({ text, size = "header1" }) => {
  return (
    <>
      {size === "header1" && (
        <p className="xs:text-3xl md:text-5xl lg:text-5xl xs:leading-[40px] lg:leading-[70px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#DD3131] to-[#223EAC]">
          {text}
        </p>
      )}
      {size === "header2" && (
        <p className="text-4xl leading-[70px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#DD3131] to-[#223EAC]">
          {text}
        </p>
      )}
      {size === "header3" && (
        <p className="text-3xl leading-[50px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#F17A04] to-[#C716DB] to-[90%]">
          {text}
        </p>
      )}
    </>
  );
};
export default GradientHeader;
