import PropTypes from "prop-types";

const SearchInput = ({
  value,
  valueChange,
  placeholder,
  mainClassName,
  inputClassName,
  imageClassName,
}) => {
  return (
    <div className={mainClassName}>
      <img className={imageClassName} src="/assets/svg/search-icon.svg" />
      <input
        type="text"
        placeholder={placeholder}
        className={inputClassName}
        value={value}
        onChange={valueChange}
      />
    </div>
  );
};

SearchInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  inputClassName: PropTypes.string,
  mainClassName: PropTypes.string,
  imageClassName: PropTypes.string,
  valueChange: PropTypes.func,
};

export default SearchInput;
