import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../../common/common";
import Button from "../Button";

const CropImageModal = ({ file, open, close, cropImg }) => {
  if (!open) {
    return null;
  }
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  // const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        file,
        croppedAreaPixels,
        rotation
      );
      cropImg(croppedImage);
      // setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
      <div className="relative h-[600px] w-[550px] bg-[#555050] rounded-lg shadow-lg p-6 text-base font-semibold text-white">
        <Cropper
          image={file}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          style={{
            height: "300px",
          }}
        />
        <div
          className="absolute bottom-10 w-36"
          onClick={() => {
            close();
            showCroppedImage();
          }}
        >
          <Button className="" text="Set Image" />
        </div>
      </div>
    </div>
  );
};

export default CropImageModal;
