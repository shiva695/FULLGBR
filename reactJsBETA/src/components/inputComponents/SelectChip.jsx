import PropTypes from "prop-types";

const SelectChip = ({ selectChange, value, userType }) => {
  return (
    <div
      onClick={selectChange}
      className={`h-[34px] py-[8px] px-[16px] w-fit flex flex-row 
${
  userType === value
    ? "border-typo-blue border-[2px]"
    : "border-[#2B2E30] border-[1px]"
} 
rounded-[20px] cursor-pointer`}
    >
      <h5 className="text-[14px] font-normal text-start text-typo-primary">
        {value}
      </h5>
    </div>
  );
};

SelectChip.propTypes = {
  selectChange: PropTypes.func,
  value: PropTypes.string,
  userType: PropTypes.string,
};

export default SelectChip;
