/* eslint-disable react/no-unescaped-entities */
// @import dependencies
import { useRef, useState } from "react";

// @import Components
import CommonModal1 from "../../generalComponents/CommonModel1";
import CommonBtn3 from "../../generalComponents/CommonBtn3";

export default function UploadProfilePhoto({ onClose, done }) {
  const inputRef = useRef(null);
  const [img, setImg] = useState(null);
  const [showAvatars, setShowAvatars] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const handleImageUpload = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    console.log(event.target.files[0]);
    setImg(event.target.files[0]);
  };
  return (
    <>
      <CommonModal1>
        <div className="flex flex-col items-center w-[513px] h-[452px] rounded-[16px]">
          <div className="flex justify-center items-center bg-[#26292B] w-[513px] h-[64px] rounded-t-[16px] mb-[20px]">
            <div className="flex justify-between items-center w-[465px] h-[32px]">
              <div className="flex w-[200px] h-[26px] space-x-4">
                <img
                  onClick={() => onClose()}
                  src="/assets/svg/left-pointer.svg"
                  className="w-[24px] h-[24px] p-[6px] text-[#7D8185] cursor-pointer"
                />
                <h1 className="font-semibold text-[18px] w-[180px] h-[26px] text-[#FAFBFC]">
                  Edit Profile Photo
                </h1>
              </div>
              <img
                onClick={() => onClose()}
                src="/assets/svg/close-btn.svg"
                className="w-[12px] h-[12px] cursor-pointer"
              />
            </div>
          </div>

          <div className="w-[465px] h-[344px] flex flex-col space-y-2 ">
            <div
              onClick={handleImageUpload}
              className="cursor-pointer w-[465px] h-[80px] py-[20px] rounded-lg bg-[#212426] flex ps-[125px]"
            >
              <img
                className="mr-2"
                src="/assets/svg/uploadProfilePic.svg"
                alt="Upload Icon"
              />
              <input
                type="file"
                className="hidden"
                ref={inputRef}
                onChange={handleImageChange}
              />
              <p className="flex items-center text-typo-blue font-semibold text-16 leading-24">
                Upload New photo
              </p>
            </div>
            <div className="cursor-pointer w-[465px] h-[80px] py-[20px] rounded-lg bg-[#212426] flex ps-[125px]">
              <img
                className="mr-2"
                src="/assets/svg/create3Davatar.svg"
                alt="3D Avatar Icon"
              />
              <p className="flex items-center text-typo-blue font-semibold text-16 leading-24">
                Create 3D avatars
              </p>
            </div>
            <div
              onClick={() => {
                setShowAvatars(true);
              }}
              className="cursor-pointer w-[465px] h-[80px] py-[20px] rounded-lg bg-[#212426] flex ps-[125px]"
            >
              <img
                className="mr-2"
                src="/assets/svg/choosefromtemplate.svg"
                alt="Choose From Template"
              />
              <p className="flex items-center text-typo-blue font-semibold text-16 leading-24">
                Choose from templates
              </p>
            </div>
            <div
              onClick={() => {
                setShowRemoveConfirm(true);
              }}
              className="cursor-pointer w-[465px] h-[80px] py-[20px] rounded-lg bg-[#212426] flex ps-[125px]"
            >
              <img
                className="mr-2"
                src="/assets/svg/removeProfilePic.svg"
                alt="Remove Icon"
              />
              <p className="flex items-center text-typo-red font-semibold text-16 leading-24">
                Remove Profile photo
              </p>
            </div>
          </div>
        </div>
      </CommonModal1>

      {img && (
        <CommonModal1>
          <div className="flex flex-col items-center w-[513px] h-[452px] rounded-[16px]">
            <div className="flex justify-center items-center bg-[#26292B] w-[513px] h-[64px] rounded-t-[16px] mb-[20px]">
              <div className="flex justify-between items-center w-[465px] h-[32px]">
                <div className="flex w-[250px] h-[26px] space-x-4">
                  <img
                    onClick={() => {
                      setImg(null);
                    }}
                    src="/assets/svg/left-pointer.svg"
                    className="w-[24px] h-[24px] p-[6px] text-[#7D8185] cursor-pointer"
                  />
                  <h1 className="font-semibold text-[18px] w-[204px] h-[26px] text-[#FAFBFC]">
                    Update profile picture
                  </h1>
                </div>
                <img
                  onClick={() => {
                    onClose();
                  }}
                  src="/assets/svg/close-btn.svg"
                  className="w-[12px] h-[12px] cursor-pointer"
                />
              </div>
            </div>
            <div className="w-[513px] h-[220px] flex justify-center mb-[20px] ">
              {img ? (
                <img
                  src={URL.createObjectURL(img)}
                  className="w-[260px] h-[190px]"
                />
              ) : (
                <img
                  src="/assets/svg/profile.svg"
                  className="w-[260px] h-[190px]"
                />
              )}
            </div>
            <div className="w-[384px] h-[36px] flex flex-row justify-start items-center text-[#7D8185] -ml-[100px] mb-[20px] space-x-4">
              <div className="flex w-[140px] h-[36px] justify-center items-center space-x-2">
                <img src="/assets/svg/zoom-resize-loap 1.svg" />
                <p className="text-[14px] font-normal">Zoom</p>
              </div>
              <input
                className="h-1 w-[422px] outline-none "
                // value={previewImages[scrollIdx].zoom}
                type="range"
                min="1"
                max="10"
                step={0.1}
                // onChange={(ev) => {
                //   setZoom(ev.target.value);
                //   let copyPreviewImg = [...previewImages];
                //   copyPreviewImg[scrollIdx].zoom = ev.target.value;
                //   if (ev.target.value === "1") {
                //     copyPreviewImg[scrollIdx].showzoom = 0;
                //   } else {
                //     copyPreviewImg[scrollIdx].showzoom = ev.target.value * 10;
                //   }
                //   setPreviewImages(copyPreviewImg);
                // }}
              />
            </div>
            <div className="flex justify-center  w-[465px] h-[44px] mb-[20px]">
              <div
                onClick={() => {
                  setImg(null);
                }}
                className="hover:opacity-80 "
              >
                <CommonBtn3
                  height="44px"
                  width="225px"
                  bgColor="#2B2E30"
                  text="Cancel"
                />
              </div>
              <div
                onClick={() => done(img)}
                className="hover:opacity-80 ml-[16px]"
              >
                <CommonBtn3
                  height="44px"
                  width="225px"
                  bgColor="#2E9BFA"
                  text="Done"
                />
              </div>
            </div>
          </div>
        </CommonModal1>
      )}

      {showAvatars && (
        <CommonModal1>
          <div className="flex flex-col items-center w-[513px] h-[452px] rounded-[16px]">
            <div className="flex justify-center items-center bg-[#26292B] w-[513px] h-[64px] rounded-t-[16px] mb-[20px]">
              <div className="flex justify-between items-center w-[465px] h-[32px]">
                <div className="flex w-[250px] h-[26px] space-x-4">
                  <img
                    onClick={() => {
                      setShowAvatars(false);
                    }}
                    src="/assets/svg/left-pointer.svg"
                    className="w-[24px] h-[24px] p-[6px] text-[#7D8185] cursor-pointer"
                  />
                  <h1 className="font-semibold text-[18px] w-[204px] h-[26px] text-[#FAFBFC]">
                    Choose from templates
                  </h1>
                </div>
                <img
                  onClick={() => {
                    setShowAvatars(false);
                    onClose();
                  }}
                  src="/assets/svg/close-btn.svg"
                  className="w-[12px] h-[12px] cursor-pointer"
                />
              </div>
            </div>

            <div className="w-[465px] h-[344px] flex flex-col justify-between space-y-2">
              <div className="flex flex-col justify-between w-[465px] h-[240px] mb-[20px]">
                <div className="w-[465px] h-[100px] flex flex-col justify-between">
                  <p className="w-[71px] h-[20px] font-normal text-[14px] leading-5 text-[#FAFBFC]">
                    2d avatars
                  </p>
                  <div className="w-[465px] h-[64px] flex flex-row space-x-4">
                    <img
                      src="/assets/svg/2davatar1.svg"
                      className="w-[64px] h-[64px]"
                    />
                    <img
                      src="/assets/svg/2davatar1.svg"
                      className="w-[64px] h-[64px]"
                    />
                    <img
                      src="/assets/svg/2davatar1.svg"
                      className="w-[64px] h-[64px]"
                    />
                    <img
                      src="/assets/svg/2davatar1.svg"
                      className="w-[64px] h-[64px]"
                    />
                    <img
                      src="/assets/svg/2davatar1.svg"
                      className="w-[64px] h-[64px]"
                    />
                    <img
                      src="/assets/svg/2davatar1.svg"
                      className="w-[64px] h-[64px]"
                    />
                  </div>
                </div>
                <div className="w-[465px] h-[100px] flex flex-col justify-between">
                  <p className="w-[71px] h-[20px] font-normal text-[14px] leading-5 text-[#FAFBFC]">
                    2d avatars
                  </p>
                  <div className="w-[465px] h-[64px] flex flex-row space-x-4">
                    <img
                      src="/assets/svg/3davatar1.svg"
                      className="w-[64px] h-[64px]"
                    />
                    <img
                      src="/assets/svg/3davatar1.svg"
                      className="w-[64px] h-[64px]"
                    />
                    <img
                      src="/assets/svg/3davatar1.svg"
                      className="w-[64px] h-[64px]"
                    />
                    <img
                      src="/assets/svg/3davatar1.svg"
                      className="w-[64px] h-[64px]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-centerw-[465px] h-[44px]">
                <div
                  onClick={() => {
                    setShowAvatars(false);
                  }}
                  className="hover:opacity-80 "
                >
                  <CommonBtn3
                    height="44px"
                    width="225px"
                    bgColor="#2B2E30"
                    text="Cancel"
                  />
                </div>
                <div
                  onClick={(e) => {
                    done(e.target.value);
                  }}
                  className="hover:opacity-80 ml-[16px]"
                >
                  <CommonBtn3
                    height="44px"
                    width="225px"
                    bgColor="#2E9BFA"
                    text="Done"
                  />
                </div>
              </div>
            </div>
          </div>
        </CommonModal1>
      )}

      {showRemoveConfirm && (
        <CommonModal1>
          <div className="flex flex-col items-center w-[513px] h-[452px] rounded-[16px]">
            <div className="flex justify-center items-center bg-[#26292B] w-[513px] h-[64px] rounded-t-[16px] mb-[20px]">
              <div className="flex justify-between items-center w-[465px] h-[32px]">
                <div className="flex w-[250px] h-[26px] space-x-4">
                  <img
                    onClick={() => {
                      setShowRemoveConfirm(false);
                    }}
                    src="/assets/svg/left-pointer.svg"
                    className="w-[24px] h-[24px] p-[6px] text-[#7D8185] cursor-pointer"
                  />
                  <h1 className="font-semibold text-[18px] w-[204px] h-[26px] text-[#FAFBFC]">
                    Remove profile picture
                  </h1>
                </div>
                <img
                  onClick={() => {
                    setShowRemoveConfirm(false);
                    onClose();
                  }}
                  src="/assets/svg/close-btn.svg"
                  className="w-[12px] h-[12px] cursor-pointer"
                />
              </div>
            </div>

            <div className="w-[465px] h-[344px] flex justify-center mb-[20px] ">
              <div className="w-[356px] h-[148px] flex flex-col items-center space-y-5 mt-[20px]">
                <img
                  src="/assets/svg/Ellipse 1406.svg"
                  className="w-[80px] h-[80px]"
                />
                <p className="flex w-[283px] h-[52px] text-[#FAFBFC] text-[18px] leading-6 font-semibold text-center ">
                  Are you sure you want to remove profile pic ?
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-around w-[465px] h-[44px] mb-[20px]">
              <div
                onClick={() => setShowRemoveConfirm(false)}
                className="hover:opacity-80 "
              >
                <CommonBtn3
                  height="44px"
                  width="225px"
                  bgColor="#2B2E30"
                  text="Cancel"
                />
              </div>
              <div
                onClick={() => {
                  setShowRemoveConfirm(false);
                  onClose();
                }}
                className="hover:opacity-80 ml-[16px]"
              >
                <CommonBtn3
                  height="44px"
                  width="225px"
                  bgColor="#FF523B"
                  text="Remove"
                />
              </div>
            </div>
          </div>
        </CommonModal1>
      )}
    </>
  );
}
