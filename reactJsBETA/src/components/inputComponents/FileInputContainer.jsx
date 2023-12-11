import PropTypes from "prop-types";
import { useState } from "react";

const FileInputContainer = ({
  className,
  overrideClassName,
  imageClassName,
  children,
  onFileSelect,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file)); // Create a URL for the selected file
    onFileSelect(event.target.files[0]);
  };

  return (
    <label
      htmlFor="file-input"
      className={`cursor-pointer ${className} ${
        selectedFile ? overrideClassName : ""
      }`}
    >
      {selectedFile ? (
        <img
          className={`w-full h-full object-cover overflow-hidden ${imageClassName}`}
          src={selectedFile}
          alt="Selected Image"
        />
      ) : (
        <>
          {children}
          <input
            id="file-input"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
    </label>
  );
};

FileInputContainer.propTypes = {
  className: PropTypes.string,
  overrideClassName: PropTypes.string,
  imageClassName: PropTypes.string,
  onFileSelect: PropTypes.func,
  children: PropTypes.element,
};

export default FileInputContainer;
