import { useState, useRef, useEffect, useCallback } from "react";
import CommonBtn1 from "../generalComponents/CommonBtn1";
import CommonBtn2 from "../generalComponents/CommonBtn2";
import { filterValues } from "../../utills/editImageStyles.js";
import Cropper from "react-easy-crop";
import "./imageEditStyles.css";
import CommonBtn3 from "../generalComponents/CommonBtn3";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDropzone } from "react-dropzone";
import ToggleSwitch from "../inputComponents/ToggleSwitch";
import PostUploading from "./PostUploading";
import * as htmlToImage from "html-to-image";

// eslint-disable-next-line react/prop-types
const ImageEditorPost = ({ open, close, img }) => {
  const imageRef = useRef(null);
  const inputRefImg = useRef(null);
  const [previewImages, setPreviewImages] = useState(img);
  const [imgFilt, setImgFilt] = useState(filterValues);
  const [applyFilt, setApplyFilt] = useState(filterValues[0].class);
  const [postEdit, setPostEdit] = useState(0);
  const [isZoom, setIsZoom] = useState(-1);
  const [adjustments, setAdjustments] = useState({
    bright: "0",
    contrast: "0",
    fade: "0",
    saturation: "0",
    temperature: "0",
    vignette: "0",
    scale: "0",
  });
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [fade, setFade] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [aspectIndex, setAspectIndex] = useState(0);
  const [isPostUploadingOpen, setIsPostUploadingopen] = useState(false);

  const [scrollIdx, setScrollIdx] = useState(0);

  const [imgUploadFile, setImgUploadFile] = useState(null);
  const [filesImg, setFilesImg] = useState(null);

  const [isPostFinalAdjustments, setIsPostFinalAdjustments] = useState(false);
  const [caption, setCaption] = useState("");

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [invokeAddClassname, setInvokeAddClassname] = useState(false);
  // const [showZoom, setShowZoom] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageElement, setImageElement] = useState(null);
  // console.log("croppedAreaPixels: ", croppedAreaPixels);
  // const [croppedImage, setCroppedImage] = useState(null);

  // console.log("crop ", crop);

  const [aspectLeft, setAspectLeft] = useState(1);
  const [aspectRight, setAspectRight] = useState(1);

  const styless = {
    mediaStyle: {
      // filter: `contrast(${contrast > 0 ? contrast : ""}%) brightness(${
      //   brightness > 0 ? brightness : ""
      // }%) saturate(${saturation > 0 ? saturation : ""}%) opacity(${
      //   fade > 0 ? fade : ""
      // }%)`,
      filter: postEdit === 1 && `brightness(${brightness})`,
    },
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // const showCroppedImage = useCallback(async () => {
  //   try {
  //     const croppedImage = await utils.getCroppedImg(
  //       previewImages[scrollIdx].preview,
  //       croppedAreaPixels,
  //       rotation
  //     );
  //     return croppedImage;
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, [croppedAreaPixels, previewImages, rotation, scrollIdx]);

  // React drag and drop
  const {
    acceptedFiles: imgAcceptFile,
    fileRejections: imgRejectFile,
    getInputProps: imgInputProps,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
      "video/mp4": [".mp4", ".MP4"],
    },
    maxFiles: 6,
  });

  // onChange handler
  const adjustmentHandler = (ev) => {
    setAdjustments((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };

  // Function to update list on drop
  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;

    var updatedList = [...previewImages];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setPreviewImages(updatedList);
  };

  // Rotate image left
  const rotateLeft = () => {
    let newRotation = rotation - 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }
    let copy = [...previewImages];
    copy[scrollIdx].rotation = newRotation;
    setPreviewImages(copy);
    setRotation(newRotation);
  };

  // Rotate image Right
  const rotateRight = () => {
    let newRotation = rotation + 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }
    let copy = [...previewImages];
    copy[scrollIdx].rotation = newRotation;
    setPreviewImages(copy);
    setRotation(newRotation);
  };

  // Img upload file handler
  useEffect(() => {
    if (imgAcceptFile.length > 0) {
      setImgUploadFile(imgAcceptFile);
      let copy = [...previewImages];
      copy.push(...imgAcceptFile);
      setPreviewImages(copy);
      setFilesImg(
        imgAcceptFile.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    }
    imgAcceptFile.length = 0;
    if (imgRejectFile.length > 0) {
      // setGstCertHelperT ext(
      //   "Please upload a valid certificate in pdf/jpeg/jpg/png format"
      // );
      alert("Rejeted");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgAcceptFile, imgRejectFile]);

  useEffect(() => {
    // const addClassName = () => {
    if (previewImages[scrollIdx].type !== "video/mp4") {
      const gstImg = document.getElementsByClassName("reactEasyCrop_Image");
      setImageElement(gstImg[0]);
      gstImg[0].classList.add(previewImages[scrollIdx].styleBG);
      gstImg[0].classList.replace(
        gstImg[0].classList[2],
        previewImages[scrollIdx].styleBG
      );
    }
    // };
    // if (invokeAddClassname) {
    //   setInvokeAddClassname(false);
    //   addClassName();
    // }
  }, [applyFilt, invokeAddClassname, previewImages, scrollIdx]);

  return (
    <>
      {open && (
        <div className="fixed z-10 inset-0 bg-opacity-80 bg-black  flex justify-center items-center">
          <div className="relative flex flex-row justify-end w-[1296px] h-[714px] items-end">
            {/* left */}
            <div className="flex flex-col items-end justify-end h-full gap-[20px] mr-[24px]">
              <DragDropContext onDragEnd={handleDrop}>
                <Droppable droppableId="preview">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {previewImages?.map((el, index) => (
                        <Draggable
                          key={el.preview}
                          draggableId={el.preview}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              className="flex flex-col items-end gap-[18px] mt-3 w-[189px] h-auto bottom-20 left-0"
                            >
                              <div
                                style={{
                                  background:
                                    el.isHover &&
                                    "linear-gradient(277.73deg, #414142 -20.07%, #000001 112.69%)",
                                }}
                                className={`flex flex-row ${
                                  el.isHover
                                    ? "items-center justify-around"
                                    : "items-center justify-end"
                                } w-[189px] h-[84px] rounded-[12px]`}
                                onMouseEnter={() => {
                                  let copy = [...previewImages];
                                  copy[index].isHover = true;
                                  setPreviewImages(copy);
                                }}
                                onMouseLeave={() => {
                                  let copy = [...previewImages];
                                  copy[index].isHover = false;
                                  setPreviewImages(copy);
                                }}
                              >
                                {el.isHover && (
                                  <div className="w-10 h-9 bg-transparent hover:bg-[#212426] flex items-center justify-center rounded-[8px]">
                                    <img
                                      src="/assets/svg/dragIndicator.svg"
                                      className="w-[10px] h-[16px]"
                                    />
                                  </div>
                                )}
                                {el.isHover && (
                                  <div
                                    onClick={() => {
                                      let copy = [...previewImages];
                                      copy.splice(index, 1);
                                      if (copy.length === 0) close();
                                      setPreviewImages(copy);
                                    }}
                                    className="w-10 h-9 bg-transparent hover:bg-[#212426] flex items-center justify-center cursor-pointer rounded-[8px]"
                                  >
                                    <img src="/assets/svg/delete-icon.svg" />
                                  </div>
                                )}
                                <img
                                  className="w-[72px] h-[72px] object-cover rounded-[8px] gradient-border"
                                  src={
                                    el.type === "video/mp4"
                                      ? el.thumb
                                      : el.preview
                                  }
                                  onClick={() => {
                                    setScrollIdx(index);
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <input {...imgInputProps()} ref={inputRefImg} type="file" />
              {!isPostFinalAdjustments && (
                <div
                  onClick={() => {
                    inputRefImg.current.click();
                  }}
                  className="cursor-pointer bg-opacity-[10%]"
                >
                  <CommonBtn2
                    height="40px"
                    width="122px"
                    backgroundColor="#2B2E30"
                    icon="/assets/svg/plus-icon.svg"
                    text="Add More"
                  />
                </div>
              )}
            </div>

            {/* center */}
            <div className="bg-gradient-to-tl from-black from-[70%] to-gray-600 rounded-[12px]">
              <div className="bg-[#252525] bg-opacity-[100%] ml-[1px] mt-[1px] rounded-[16px]">
                <div className="z-10 flex flex-col w-[1000px] h-[665px] bg-[url('/assets/svg/Noise.svg')] bg-no-repeat bg-cover bg-center bg-opacity-[100%]">
                  {/* Modal Header */}
                  <div className="w-full flex flex-row justify-between items-center h-[72px] px-[24px] py-[22px] rounded-tr-[16px] rounded-tl-[16px] modal-header">
                    {!isPostFinalAdjustments ? (
                      <>
                        <div className="flex flex-row items-center gap-[20px]">
                          {/* Aspect ratio */}
                          <div className="flex flex-row w-[200px] h-[40px] bg-[#1A1C1F] gap-[8px] items-center rounded-[12px]  px-[12px] py-[4px]">
                            <div
                              className={`h-8 w-8 rounded-[6px] flex items-center justify-center ${
                                aspectIndex === 0
                                  ? "bg-[#2B2E30]"
                                  : "cursor-pointer"
                              } hover:bg-[rgb(43,46,48)]`}
                              onClick={() => {
                                setAspectIndex(0);
                                setAspectLeft(11);
                                setAspectRight(12);
                              }}
                            >
                              <img
                                src="/assets/svg/aspect-1.svg"
                                className="w-[18px] h-[14px]"
                              />
                            </div>
                            <span className="h-[20px] border-[1px] border-[#2B2E30]"></span>
                            <div
                              className={`h-8 w-8 rounded-[6px] flex items-center justify-center ${
                                aspectIndex === 1
                                  ? "bg-[#2B2E30]"
                                  : "cursor-pointer"
                              } hover:bg-[#2B2E30]`}
                              onClick={() => {
                                setAspectIndex(1);
                                setAspectLeft(1);
                                setAspectRight(1);
                              }}
                            >
                              <img
                                src="/assets/svg/aspect-2.svg"
                                className="w-[18px] h-[18px]"
                              />
                            </div>
                            <span className="h-[20px] border-[1px] border-[#2B2E30]"></span>
                            <div
                              className={`h-8 w-8 rounded-[6px] flex items-center justify-center ${
                                aspectIndex === 2
                                  ? "bg-[#2B2E30]"
                                  : "cursor-pointer"
                              } hover:bg-[#2B2E30]`}
                              onClick={() => {
                                setAspectIndex(2);
                                setAspectLeft(4);
                                setAspectRight(5);
                              }}
                            >
                              <img
                                src="/assets/svg/aspect-3.svg"
                                className="w-[14px] h-[18px]"
                              />
                            </div>
                            <span className="h-[20px] border-[1px] border-[#2B2E30]"></span>
                            <div
                              className={`h-8 w-8 rounded-[6px] flex items-center justify-center ${
                                aspectIndex === 3
                                  ? "bg-[#2B2E30]"
                                  : "cursor-pointer"
                              } hover:bg-[#2B2E30]`}
                              onClick={() => {
                                setAspectIndex(3);
                                setAspectLeft(16);
                                setAspectRight(9);
                              }}
                            >
                              <img
                                src="/assets/svg/aspect-4.svg"
                                className="w-[18px] h-[10px]"
                              />
                            </div>
                          </div>
                          {/* Zoom + Rotate */}
                          <div className="w-[305px] h-[40px] flex flex-row items-center gap-[4px] p-[4px] rounded-[12px] bg-[#1A1C1F]">
                            <div
                              onClick={() => {
                                if (isZoom !== 0) setIsZoom(0);
                                if (isZoom === 0) setIsZoom(-1);
                                let copy = [...previewImages];
                                if (copy[scrollIdx].zoom === undefined) {
                                  copy[scrollIdx].zoom = 1;
                                  copy[scrollIdx].showzoom = 0;
                                }
                                setPreviewImages(copy);
                              }}
                              className={`w-[145px] h-[32px] flex items-center gap-[8px] justify-center rounded-[8px] hover:bg-[#2B2E30] ${
                                isZoom === 0
                                  ? "bg-[#2B2E30] cursor-pointer"
                                  : "cursor-pointer"
                              } `}
                            >
                              <img
                                className="w-5 h-5"
                                src="/assets/svg/zoom-img-icon.svg"
                              />
                              <h5 className="text-[14px] text-white ">Zoom</h5>
                            </div>
                            <span className="h-[20px] border-[1px] border-[#2B2E30]"></span>
                            <div
                              onClick={() => {
                                if (isZoom !== 1) setIsZoom(1);
                                if (isZoom === 1) setIsZoom(-1);
                                let copy = [...previewImages];
                                if (copy[scrollIdx].rotate === undefined) {
                                  copy[scrollIdx].rotate = 0;
                                  setPreviewImages(copy);
                                }
                              }}
                              className={`w-[145px] h-[32px] flex items-center gap-[8px] justify-center rounded-[8px] hover:bg-[#2B2E30] ${
                                isZoom === 1 ? "bg-[#2B2E30]" : "cursor-pointer"
                              }`}
                            >
                              <img
                                className="w-5 h-5"
                                src="/assets/svg/rotate-img-icon.svg"
                              />
                              <h5 className="text-[14px] text-white ">
                                Rotate
                              </h5>
                            </div>
                          </div>
                        </div>

                        {/* Filter and Adjustment */}
                        <div className="w-[320px] h-[40px] flex flex-row items-center gap-[4px] p-[4px] rounded-[12px] bg-[#1A1C1F]">
                          <div
                            onClick={() => setPostEdit(0)}
                            className={`w-[156px] h-[32px] flex items-center gap-[8px] justify-center rounded-[8px] ${
                              postEdit === 0 ? "bg-[#2B2E30]" : "cursor-pointer"
                            } `}
                          >
                            <img
                              className="w-5 h-5"
                              src="/assets/svg/filters-img-icon.svg"
                            />
                            <h5 className="text-[14px] text-white ">Filters</h5>
                          </div>
                          <span className="h-[20px] border-[1px] border-[#2B2E30]"></span>
                          <div
                            onClick={() => {
                              setPostEdit(1);
                            }}
                            className={`w-[156px] h-[32px] flex items-center gap-[8px] justify-center rounded-[8px] ${
                              postEdit === 1 ? "bg-[#2B2E30]" : "cursor-pointer"
                            } `}
                          >
                            <img
                              className="w-5 h-5"
                              src="/assets/svg/adjust-img-icon.svg"
                            />
                            <h5 className="text-[14px] text-white ">
                              Adjustments
                            </h5>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-row items-center justify-center gap-[10px]">
                        <img
                          className="h-3 w-3 cursor-pointer"
                          src="/assets/svg/left-scroll.svg"
                          onClick={() => setIsPostFinalAdjustments(false)}
                        />
                        <h2 className="text-[20px] text-typo-secondary font-semibold">
                          Final Adjustments
                        </h2>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-row items-center justify-between px-[24px] pt-[24px] pb-[56px]">
                    {/* Media div */}
                    <div className="relative w-[550px] h-[550px] rounded-[12px] flex flex-col justify-center items-center">
                      {previewImages[scrollIdx].type === "video/mp4" ? (
                        <Cropper
                          video={previewImages[scrollIdx].preview}
                          crop={crop}
                          rotation={previewImages[scrollIdx].rotation}
                          zoom={previewImages[scrollIdx].zoom}
                          aspect={aspectLeft / aspectRight}
                          objectFit="cover"
                          onCropChange={setCrop}
                          onRotationChange={setRotation}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                        />
                      ) : (
                        <Cropper
                          ref={imageRef}
                          image={
                            previewImages[scrollIdx].filterBlob ??
                            previewImages[scrollIdx].preview
                          }
                          crop={previewImages[scrollIdx].crop}
                          rotation={previewImages[scrollIdx].rotation}
                          zoom={previewImages[scrollIdx].zoom}
                          aspect={aspectLeft / aspectRight}
                          objectFit="cover"
                          onCropChange={(crop) => {
                            let copy = [...previewImages];
                            copy[scrollIdx].crop = crop;
                            setPreviewImages(copy);
                          }}
                          onRotationChange={setRotation}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                          style={styless}
                        />
                      )}

                      {isZoom === 1 && (
                        <div className="absolute h-[36px] inset-0 flex flex-row gap-[12px] items-start justify-center mt-[12px]">
                          <div
                            className="h-9 w-9  bg-[#44474A] rounded-[8px] flex items-center justify-center cursor-pointer"
                            onClick={rotateLeft}
                          >
                            <img
                              src="/assets/svg/minus-icon.svg"
                              className=""
                            />
                          </div>
                          <div>
                            <CommonBtn3
                              height="36px"
                              width="116px"
                              bgColor="#2B2E30"
                              text="Rotate 90&#176;"
                            />
                          </div>
                          <div
                            className="h-9 w-9 bg-[#44474A] rounded-[8px] flex items-center justify-center cursor-pointer"
                            onClick={rotateRight}
                          >
                            <img
                              src="/assets/svg/plus-icon.svg"
                              className="h-5 w-5"
                            />
                          </div>
                        </div>
                      )}
                      {isZoom === 0 && (
                        <div className="absolute inset-0 h-[36px] z-10 flex flex-row gap-[12px] items-start justify-center mt-[12px]">
                          <div className="flex flex-row items-center gap-5">
                            <input
                              className="h-1 w-[247px] outline-none"
                              value={previewImages[scrollIdx].zoom}
                              type="range"
                              min="1"
                              max="10"
                              step={0.1}
                              onChange={(ev) => {
                                setZoom(ev.target.value);
                                let copyPreviewImg = [...previewImages];
                                copyPreviewImg[scrollIdx].zoom =
                                  ev.target.value;
                                if (ev.target.value === "1") {
                                  copyPreviewImg[scrollIdx].showzoom = 0;
                                } else {
                                  copyPreviewImg[scrollIdx].showzoom =
                                    ev.target.value * 10;
                                }
                                setPreviewImages(copyPreviewImg);
                              }}
                            />
                            <div className="w-[53px] h-[32px] bg-[#373A3D] border-[1px] border-[#2B2E30] flex items-center justify-center rounded-[8px]">
                              <h5 className="typo-semibold">
                                {previewImages[scrollIdx].showzoom ?? 0}
                              </h5>
                            </div>
                          </div>
                        </div>
                      )}

                      {scrollIdx !== previewImages?.length - 1 && (
                        <div
                          className="absolute top-[45%] right-[2%] h-[48px] flex items-center justify-center w-[48px] rounded-full bg-[#26292B80] cursor-pointer"
                          onClick={() => {
                            // showCroppedImage().then((res) => {
                            let copy = [...previewImages];
                            //   copy[scrollIdx].preview = res;
                            //   setPreviewImages(copy);
                            // });
                            if (
                              copy[scrollIdx].styleBG !== undefined &&
                              copy[scrollIdx].filterBlob === undefined
                            ) {
                              htmlToImage
                                .toBlob(imageRef.current.imageRef.current)
                                .then((blob) => {
                                  let createBlob = URL.createObjectURL(blob);
                                  copy[scrollIdx].filterBlob = createBlob;
                                  if (
                                    copy[scrollIdx].filterBlob !== undefined
                                  ) {
                                    setScrollIdx((prev) => prev + 1);
                                    setIsZoom(-1);
                                  }
                                })
                                .catch((err) => {
                                  console.error(
                                    "oops, something went wrong!",
                                    err
                                  );
                                });
                            } else {
                              setScrollIdx((prev) => prev + 1);
                              setIsZoom(-1);
                            }
                          }}
                        >
                          <img
                            src="/assets/svg/right-scroll.svg"
                            className="w-3 h-3"
                          />
                        </div>
                      )}
                      {console.log("previewImages ", previewImages)}
                      {scrollIdx > 0 && (
                        <div
                          className="absolute top-[45%] left-[2%] h-[48px] flex items-center justify-center w-[48px] rounded-full bg-[#26292B80] cursor-pointer"
                          onClick={() => {
                            setScrollIdx((prev) => prev - 1);
                          }}
                        >
                          <img
                            src="/assets/svg/left-scroll.svg"
                            className="w-3 h-3"
                          />
                        </div>
                      )}
                    </div>

                    {/* Caption  */}
                    {!isPostFinalAdjustments ? (
                      <div className="w-[370px] h-[550px] overflow-y-scroll gap-[16px] flex flex-wrap flex-row items-start p-1">
                        {postEdit === 0 ? (
                          <>
                            {imgFilt?.map((el, idx) => (
                              <div
                                key={idx}
                                className="w-[110px] h-[88px] rounded-[4px]"
                                style={{
                                  boxShadow:
                                    previewImages[scrollIdx].styleBG ===
                                    el.class
                                      ? "0px 0px 8px 2px #2A85FF99"
                                      : "0px 8px 64px 0px #0000001A",
                                  border:
                                    previewImages[scrollIdx].styleBG ===
                                    el.class
                                      ? "2px solid #2E9BFA"
                                      : "",
                                }}
                              >
                                <img
                                  src={previewImages[scrollIdx].preview}
                                  className={`w-full h-full rounded-[4px] ${el.class} cursor-pointer`}
                                  onClick={() => {
                                    let copy = [...imgFilt];
                                    let copyPreviewImg = [...previewImages];
                                    copy.map((el) => (el.status = false));
                                    copy[idx].status = true;
                                    copyPreviewImg[scrollIdx].styleBG =
                                      el.class;
                                    setPreviewImages(copyPreviewImg);
                                    setInvokeAddClassname(true);
                                    setPreviewImages(copyPreviewImg);
                                    setApplyFilt(el.class);
                                    setImgFilt(copy);
                                  }}
                                />
                              </div>
                            ))}
                          </>
                        ) : (
                          <div className="w-full flex flex-col gap-[12px]">
                            <div className="flex flex-col gap-[8px] justify-center h-[60px]">
                              <label
                                htmlFor="default-range"
                                className="mb-2 text-sm font-normal text-typo-secondary"
                              >
                                Brightness
                              </label>
                              <div className="flex flex-row items-center gap-5">
                                <input
                                  className="h-1 w-[247px] outline-none"
                                  type="range"
                                  value={adjustments.bright}
                                  onChange={(ev) => {
                                    adjustmentHandler(ev);
                                    if (+adjustments.bright >= 0) {
                                      setBrightness(
                                        100 + +adjustments.bright * 2
                                      );
                                    } else if (+adjustments.bright < 0) {
                                      setBrightness(
                                        100 + +adjustments.bright / 2
                                      );
                                    }
                                  }}
                                  name="bright"
                                  min="-100"
                                  max="100"
                                />
                                <div className="w-[53px] h-[32px] border-[1px] border-[#2B2E30] flex items-center justify-center rounded-[8px]">
                                  <h5 className="typo-semibold">
                                    {adjustments.bright}
                                  </h5>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-[8px] justify-center h-[60px]">
                              <label
                                htmlFor="default-range"
                                className="mb-2 text-sm font-normal text-typo-secondary"
                              >
                                Contrast
                              </label>
                              <div className="flex flex-row items-center gap-5">
                                <input
                                  className="h-1 w-[247px]"
                                  type="range"
                                  value={adjustments.contrast}
                                  onChange={(ev) => {
                                    adjustmentHandler(ev);
                                    if (+adjustments.contrast >= 0) {
                                      setContrast(
                                        100 + +adjustments.contrast * 2
                                      );
                                    } else if (+adjustments.contrast < 0) {
                                      setContrast(
                                        100 + +adjustments.contrast / 2
                                      );
                                    }
                                  }}
                                  name="contrast"
                                  min="-100"
                                  max="100"
                                />
                                <div className="w-[53px] h-[32px] border-[1px] border-[#2B2E30] flex items-center justify-center rounded-[8px]">
                                  <h5 className="typo-semibold">
                                    {adjustments.contrast}
                                  </h5>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-[8px] justify-center h-[60px]">
                              <label
                                htmlFor="default-range"
                                className="mb-2 text-sm font-normal text-typo-secondary"
                              >
                                Fade
                              </label>
                              <div className="flex flex-row items-center gap-5">
                                <input
                                  className="h-1 w-[247px]"
                                  type="range"
                                  value={adjustments.fade}
                                  onChange={(ev) => {
                                    adjustmentHandler(ev);
                                    if (+adjustments.fade >= 0) {
                                      setFade(100 + +adjustments.fade * 10);
                                    } else if (+adjustments.fade < 0) {
                                      setFade(100 + +adjustments.fade / 2);
                                    }
                                  }}
                                  name="fade"
                                  min="-100"
                                  max="100"
                                />
                                <div className="w-[53px] h-[32px] border-[1px] border-[#2B2E30] flex items-center justify-center rounded-[8px]">
                                  <h5 className="typo-semibold">
                                    {adjustments.fade}
                                  </h5>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-[8px] justify-center h-[60px]">
                              <label
                                htmlFor="default-range"
                                className="mb-2 text-sm font-normal text-typo-secondary"
                              >
                                Saturation
                              </label>
                              <div className="flex flex-row items-center gap-5">
                                <input
                                  className="h-1 w-[247px]"
                                  type="range"
                                  value={adjustments.saturation}
                                  onChange={(ev) => {
                                    adjustmentHandler(ev);
                                    if (+adjustments.saturation >= 0) {
                                      setSaturation(
                                        100 + +adjustments.saturation * 2
                                      );
                                    } else if (+adjustments.saturation < 0) {
                                      setSaturation(
                                        100 + +adjustments.saturation / 2
                                      );
                                    }
                                  }}
                                  name="saturation"
                                  min="-100"
                                  max="100"
                                />
                                <div className="w-[53px] h-[32px] border-[1px] border-[#2B2E30] flex items-center justify-center rounded-[8px]">
                                  <h5 className="typo-semibold">
                                    {adjustments.saturation}
                                  </h5>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-[8px] justify-center h-[60px]">
                              <label
                                htmlFor="default-range"
                                className="mb-2 text-sm font-normal text-typo-secondary"
                              >
                                Temperature
                              </label>
                              <div className="flex flex-row items-center gap-5">
                                <input
                                  className="h-1 w-[247px]"
                                  type="range"
                                  value={adjustments.temperature}
                                  onChange={(ev) => {
                                    adjustmentHandler(ev);
                                    if (+adjustments.temperature >= 0) {
                                      setTemperature(+adjustments.temperature);
                                    } else if (+adjustments.temperature < 0) {
                                      setTemperature(+adjustments.temperature);
                                    }
                                  }}
                                  name="temperature"
                                  min="-100"
                                  max="100"
                                />
                                <div className="w-[53px] h-[32px] border-[1px] border-[#2B2E30] flex items-center justify-center rounded-[8px]">
                                  <h5 className="typo-semibold">
                                    {adjustments.temperature}
                                  </h5>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-[8px] justify-center h-[60px]">
                              <label
                                htmlFor="default-range"
                                className="text-sm font-normal text-typo-secondary"
                              >
                                Vignette
                              </label>
                              <div className="flex flex-row items-center gap-5">
                                <input
                                  className="h-1 w-[247px]"
                                  type="range"
                                  value={adjustments.vignette}
                                  onChange={adjustmentHandler}
                                  name="vignette"
                                  min="-100"
                                  max="100"
                                />
                                <div className="w-[53px] h-[32px] border-[1px] border-[#2B2E30] flex items-center justify-center rounded-[8px]">
                                  <h5 className="typo-semibold">
                                    {adjustments.vignette}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-[350px] h-[550px] overflow-y-scroll flex flex-col items-start p-1">
                        <div className="flex flex-col gap-[8px] w-full">
                          <h5 className="text-[14px] text-typo-secondary font-semibold">
                            Title
                          </h5>
                          <div className="w-full h-[40px] py-[10px] px-[16px] border-[1px] rounded-[8px] border-[#2B2E30]">
                            <input
                              type="text"
                              className="w-full outline-none bg-transparent text-typo-secondary"
                              placeholder="Type title"
                            />
                          </div>
                        </div>

                        <div className="mt-[24px] flex flex-col gap-[8px]">
                          <h5 className="text-[14px] text-typo-secondary font-semibold">
                            Caption
                          </h5>
                          <div className="flex flex-col w-[320px] h-[168px] rounded-[12px]  border-[1px] border-[#2B2E30] mt-[12px]">
                            <textarea
                              className="h-[120px] outline-none  bg-transparent ml-[.5px] mt-[.5px]  rounded-tr-[12px] rounded-tl-[12px] resize-none p-4 text-typo-secondary border-b-[#2B2E30] border-b-[1px]"
                              placeholder="Write a caption"
                              value={caption}
                              onChange={(ev) => setCaption(ev.target.value)}
                            />
                            <div className="flex flex-row items-center justify-between p-3">
                              <img
                                src="/assets/svg/emoji-icon.svg"
                                className="h-6 w-6"
                              />

                              <h5 className="text-[12px] font-normal text-typo-light">
                                <span className="text-typo-primary">
                                  {caption.length}
                                </span>
                                /2100
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className="mt-[24px] flex flex-col w-full gap-[26px]">
                          <div className="flex flex-row w-full justify-between  items-center">
                            <h5 className="text-[14px] font-semibold text-typo-secondary">
                              Allow comments
                            </h5>
                            <ToggleSwitch />
                          </div>
                          <div className="flex flex-row w-full justify-between  items-center">
                            <h5 className="text-[14px] font-semibold text-typo-secondary">
                              Shedule
                            </h5>
                            <ToggleSwitch />
                          </div>
                        </div>

                        <div className="w-full h-[40px] flex flex-row justify-between items-center mt-[8px]">
                          <div className="flex flex-row w-[152px] py-[10px] px-[12px] items-center justify-between rounded-[8px] border-[1px] border-[#2B2E30]">
                            <h5 className="typo-normal">Today</h5>
                            <img
                              className="h-3.5 w-3.5"
                              src="/assets/svg/calendar-icon.svg"
                            />
                          </div>
                          <div className="flex flex-row w-[152px] py-[10px] px-[12px] items-center justify-between rounded-[8px] border-[1px] border-[#2B2E30]">
                            <h5 className="typo-normal">Set Time</h5>
                            <img
                              className="h-3.5 w-3.5"
                              src="/assets/svg/setTime-icon.svg"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Right */}
            {!isPostFinalAdjustments ? (
              <div
                className="ml-[24px] cursor-pointer"
                onClick={() => setIsPostFinalAdjustments(true)}
              >
                <CommonBtn1 height="40px" width="68px" text="Done" />
              </div>
            ) : (
              <div
                className="ml-[24px] cursor-pointer"
                onClick={() => setIsPostUploadingopen(true)}
              >
                <CommonBtn1 height="40px" width="68px" text="Post" />
              </div>
            )}

            <div className="absolute top-1 right-24">
              <img
                src="/assets/svg/close-btn.svg"
                className="w-3 h-3 cursor-pointer"
                onClick={close}
              />
            </div>
          </div>
        </div>
      )}

      {isPostUploadingOpen && (
        <PostUploading
          open={isPostUploadingOpen}
          close={() => setIsPostUploadingopen(false)}
        />
      )}
    </>
  );
};

export default ImageEditorPost;
