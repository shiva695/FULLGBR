import { useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import CommonBtn2 from "../generalComponents/CommonBtn2";
import CommonBtn1 from "../generalComponents/CommonBtn1";
import ImageEditorPost from "./ImageEditorPost";
import ToggleSwitch from "../inputComponents/ToggleSwitch";
import EditorJS from "@editorjs/editorjs";
import HeaderTool from "@editorjs/header";
import ImageTool from "@editorjs/image";

export default function AddPost() {
  const navigate = useNavigate();
  const inputRefImg = useRef(null);
  const [imgUploadFile, setImgUploadFile] = useState([]);
  const [filesImg, setFilesImg] = useState(null);
  const [postIndex, setPostIndex] = useState(0);
  const [content, setContent] = useState("");
  const [isImageEditorModalOpen, setIsImageEditorModalOpen] = useState(false);
  const [isBlogNext, setIsBlogNext] = useState(false);
  const [isFinalAdjustments, setIsFinalAdjustments] = useState(false);
  // const [base64, setBase64] = useState(null);

  const ejInstance = useRef();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      // data: DEFAULT_INITIAL_DATA,yy
      onChange: async () => {
        let content = await editor.saver.save();

        console.log(content);
      },
      tools: {
        header: {
          class: HeaderTool,
          config: {
            levels: [2, 3, 4], // Specify the heading levels you want to allow
          },
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: "http://localhost:5173/uploadFile", // Your backend file uploader endpoint
              byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
            },
          },
        },
      },
    });
  };

  // This will run only once
  useEffect(() => {
    if (ejInstance.current === null && postIndex === 1) {
      initEditor();
    }
    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, [postIndex]);

  // React drag and drop
  const {
    acceptedFiles: imgAcceptFile,
    fileRejections: imgRejectFile,
    getRootProps: imgRootProps,
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

  // Gst Upload file handler
  useEffect(() => {
    if (imgAcceptFile.length > 0) {
      setImgUploadFile(imgAcceptFile);
      for (let i = 0; i < imgAcceptFile.length; i++) {
        console.log("imgAcceptFile[i].type: ", imgAcceptFile[i].type);
        if (imgAcceptFile[i].type === "video/mp4") {
          setFilesImg(
            imgAcceptFile.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
                crop: { x: 0, y: 0 },
              })
            )
          );
        } else {
          setFilesImg(
            imgAcceptFile.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
                crop: { x: 0, y: 0 },
              })
            )
          );
        }
        setIsImageEditorModalOpen(true);
      }
    }
    if (imgRejectFile.length > 0) {
      alert("Rejeted");
    }
  }, [imgAcceptFile, imgRejectFile]);

  return (
    <>
      <div className="fixed z-10 bg-opacity-[60%] backdrop-blur-3xl bg-black inset-0 flex justify-center items-center">
        {postIndex === 0 ? (
          <div className="flex flex-col w-[634px] h-[799px] px-[9px] mt-10">
            {/* Header Buttons  */}
            <div className="flex flex-row h-[36px] w-full justify-between items-center mt-[32px] gap-[8px]">
              <div className="flex flex-row items-center gap-[8px]">
                <div
                  className={`flex flex-row gap-[9px] py-[8px] px-[12px] ${
                    postIndex === 0 ? "bg-[#2B2E30]" : "cursor-pointer"
                  } rounded-[8px]`}
                  onClick={() => setPostIndex(0)}
                >
                  <img
                    src="/assets/svg/image-check.svg"
                    className="h-[24px] w-[24px]"
                  />
                  <p
                    className={`text-[14px] font-normal ${
                      postIndex === 0 ? "text-white" : "text-typo-primary"
                    }`}
                  >
                    Normal Post
                  </p>
                </div>
                <div
                  className={`flex flex-row gap-[9px] py-[8px] px-[12px] ${
                    postIndex === 1 ? "bg-[#2B2E30]" : "cursor-pointer"
                  } rounded-[8px]`}
                  onClick={() => setPostIndex(1)}
                >
                  <img
                    src="/assets/svg/write-blog.svg "
                    className="h-[24px] w-[24px]"
                  />
                  <p
                    className={`text-[14px] font-normal ${
                      postIndex === 1 ? "text-white" : "text-typo-primary"
                    }`}
                  >
                    Write Blog
                  </p>
                </div>
              </div>
              {/* close btn */}
              <img
                src="/assets/svg/close-btn.svg"
                className="h-3 w-3 cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>

            {/* Card */}
            <div className="bg-gradient-to-tl from-[#252525] from-[70%] to-gray-600 rounded-[16px] mt-[24px]">
              <div className="bg-[#252525] bg-opacity-[100%] ml-[1px] mt-[1px] rounded-[16px]">
                <div
                  className="flex flex-col items-center justify-center rounded-[16px] bg-[url('/assets/svg/Noise.svg')] w-[616px] h-[650px] bg-no-repeat bg-cover bg-center"
                  {...imgRootProps()}
                  onClick={(ev) => {
                    ev.stopPropagation();
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-[180px] w-[217px] gap-[24px]">
                    <img
                      src="/assets/svg/drag-img-group.svg"
                      className="h-[64px] w-[121px]"
                    />
                    <h5 className="text-[16px] font-normal text-typo-primary">
                      Drag Photos, Videos & Audio
                    </h5>
                    <input {...imgInputProps()} ref={inputRefImg} type="file" />
                    <div
                      className="cursor-pointer hover:opacity-[80%]"
                      onClick={() => {
                        inputRefImg.current.click();
                      }}
                    >
                      <CommonBtn2
                        height="44px"
                        width="114px"
                        backgroundColor="#2E9BFA"
                        icon="/assets/svg/upload-icon.svg"
                        text="Browse"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : postIndex === 1 ? (
          <div className="flex flex-col items-center justify-center w-[1226px] h-[713px]">
            <div className="flex flex-row gap-[20px] items-end mt-[20px]">
              {/* save as draft */}
              <div className="w-[122px] h-[40px] py-[10px] px-[14px] rounded-[8px] bg-[#2B2E30] flex justify-center items-center">
                <h5 className="text-[13px] text-typo-secondary font-semibold">
                  Save as Draft
                </h5>
              </div>
              {/* Blog input */}
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row gap-1 items-center">
                    <img src="/assets/svg/left-arrow.svg" className="h-3 w-3" />
                    <h5
                      className="typo-normal cursor-pointer"
                      onClick={() => setPostIndex(0)}
                    >
                      Add Post
                    </h5>
                    <h5 className="typo-normal">/</h5>
                    <h5 className="typo-semibold">Blog</h5>
                  </div>
                  <img
                    src="/assets/svg/close-btn.svg"
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setPostIndex(0)}
                  />
                </div>
                <div className="bg-gradient-to-tl from-[#252525] from-[70%] to-gray-600 rounded-[16px]">
                  <div className="bg-[#252525] bg-opacity-[100%] ml-[1px] mt-[1px] rounded-[16px]">
                    <div className="flex flex-col rounded-[16px] bg-[url('/assets/svg/Noise.svg')] w-[1000px] h-[665px] bg-no-repeat bg-cover bg-center">
                      {!isFinalAdjustments ? (
                        <>
                          {!isBlogNext ? (
                            <div
                              id="editorjs"
                              className="mt-[20px] text-white w-full h-full"
                            ></div>
                          ) : (
                            <div
                              className="flex flex-col justify-center items-center  text-typo-secondary py-[24px] px-[80px]"
                              dangerouslySetInnerHTML={{ __html: content }}
                            />
                          )}
                        </>
                      ) : (
                        <div className="w-full flex flex-col justify-between  h-[72px] px-[24px] py-[22px] rounded-tr-[16px] rounded-tl-[16px] modal-header">
                          <div className="flex items-start justify-start">
                            <h2 className="text-[20px] text-typo-secondary font-semibold">
                              Final Adjustments
                            </h2>
                          </div>

                          <div className="flex flex-row gap-[14px] px-[24px] pt-[24px] pb-[56px] mt-[20px]">
                            {/* Media div */}
                            <div className="relative overflow-hidden w-[608px] h-[513px] rounded-[12px] flex flex-col justify-center items-center">
                              <img
                                className={`rounded-lg object-cover h-full w-full
                              }`}
                                src="/assets/svg/gta-banner.svg"
                                alt=""
                              />
                            </div>

                            <div className="w-[330px] h-[513px] gap-[24px] overflow-y-scroll flex flex-col items-start p-1">
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

                              <div className="flex flex-col gap-[8px]">
                                <h5 className="text-[14px] text-typo-secondary font-semibold">
                                  Caption
                                </h5>
                                <div className="flex flex-col w-[320px] h-[168px] rounded-[12px]  border-[1px] border-[#2B2E30] mt-[12px]">
                                  <textarea
                                    className="h-[120px] outline-none  bg-transparent ml-[.5px] mt-[.5px]  rounded-tr-[12px] rounded-tl-[12px] resize-none p-4 text-typo-secondary border-b-[#2B2E30] border-b-[1px]"
                                    placeholder="Write a caption"
                                    // value={caption}
                                    // onChange={(ev) => setCaption(ev.target.value)}
                                  />
                                  <div className="flex flex-row items-center justify-between p-3">
                                    <img
                                      src="/assets/svg/emoji-icon.svg"
                                      className="h-6 w-6"
                                    />

                                    <h5 className="text-[12px] font-normal text-typo-light">
                                      <span className="text-typo-primary">
                                        {/* {caption.length} */}
                                      </span>
                                      /2100
                                    </h5>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col gap-[8px] w-full">
                                <h5 className="text-[14px] text-typo-secondary font-semibold">
                                  Tags
                                </h5>
                                <div className="w-full h-[40px] py-[10px] px-[16px] border-[1px] rounded-[8px] border-[#2B2E30]">
                                  <input
                                    type="text"
                                    className="w-full outline-none bg-transparent text-typo-secondary"
                                    placeholder="Add tags"
                                  />
                                </div>

                                <h5 className="text-[12px] font-normal text-typo-primary">
                                  Suggested:{" "}
                                  <span className="text-[12px] font-normal text-typo-blue">
                                    #Game #gaming #pubg #freefire
                                  </span>
                                </h5>
                              </div>

                              <div className="flex flex-col w-full gap-[14px]">
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

                              <div className="w-full h-[40px] flex flex-row justify-between items-center">
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
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Next */}
              {!isBlogNext ? (
                <div
                  className="hover:opacity-[80%]"
                  onClick={() => setIsBlogNext(true)}
                >
                  <CommonBtn1 height="40px" width="64px" text="Next" />
                </div>
              ) : isBlogNext && !isFinalAdjustments ? (
                <div
                  className="hover:opacity-[80%] cursor-pointer"
                  onClick={() => setIsFinalAdjustments(true)}
                >
                  <CommonBtn1 height="40px" width="64px" text="Next" />
                </div>
              ) : isFinalAdjustments ? (
                <div
                  className="hover:opacity-[80%] cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  <CommonBtn1 height="40px" width="64px" text="Done" />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {isImageEditorModalOpen && (
        <ImageEditorPost
          open={isImageEditorModalOpen}
          close={() => setIsImageEditorModalOpen(false)}
          img={filesImg}
        />
      )}
    </>
  );
}
