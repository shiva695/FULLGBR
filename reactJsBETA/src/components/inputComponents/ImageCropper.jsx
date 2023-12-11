import Cropper from "react-easy-crop";
import PropTypes from "prop-types";

const ImageCropper = ({
  mainClassName,
  filesImg,
  crop,
  zoom,
  setCrop,
  onCropComplete,
  setZoom,
}) => {
  return (
    <div className={mainClassName}>
      <Cropper
        image={filesImg}
        crop={crop}
        zoom={zoom}
        cropShape="round"
        objectFit="cover"
        aspect={1}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
    </div>
  );
};

ImageCropper.propTypes = {
  mainClassName: PropTypes.string,
  filesImg: PropTypes.string,
  crop: PropTypes.object,
  zoom: PropTypes.number,
  setCrop: PropTypes.func,
  onCropComplete: PropTypes.func,
  setZoom: PropTypes.func,
};

export default ImageCropper;
