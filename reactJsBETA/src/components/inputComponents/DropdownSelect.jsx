import PropTypes from "prop-types";
import Select from "react-select";

const customStyles = {
  container: (provided) => ({
    ...provided,
    backgroundColor: "#212426", // Dark background color
    fontSize: "13px",
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: "#212426", // Dark background color
    border: "1px solid #2B2E30", // border style
    "&:hover": {
      border: "1px solid #2B2E30",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#212426", // Dark background color for options container
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    backgroundColor: state.isSelected ? "#2E9BFA" : "#212426", // Dark background color
    color: "#FAFBFC", // Change text color for selected item
    "&:hover": {
      backgroundColor: "none",
    },
    "&:focus": {
      backgroundColor: "none",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#FAFBFC", // Color for selected item
  }),
};

const getTheme = (theme) => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    primary25: "#212426",
    primary50: "#212426",
  },
});

const DropdownSelect = (props) => {
  return (
    <div className="w-full">
      {props.label && (
        <label
          className="block text-[13px] text-[#B5B9BD] mb-2"
          htmlFor="dropdown"
        >
          {props.label}
        </label>
      )}
      <Select
        isSearchable={false}
        components={{
          IndicatorSeparator: null,
        }}
        styles={customStyles}
        theme={getTheme}
        {...props}
      />
    </div>
  );
};

DropdownSelect.propTypes = {
  label: PropTypes.string,
  ...Select.propTypes,
};

export default DropdownSelect;
