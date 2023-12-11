import { useCallback, useEffect, useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import CommonModal from "../generalComponents/CommonModal";

export default function PostUploading({ open, close }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(10);
  const [isSuccess, setIsSuccess] = useState(false);

  const navIFSuccess = useCallback(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [navigate, isSuccess]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoader((prev) => prev + 1);
    }, 100);

    if (loader >= 100) {
      clearInterval(timer);
      setIsSuccess(true);
      navIFSuccess();
      return;
    }
    return () => clearInterval(timer);
  }, [loader, navIFSuccess]);

  return (
    <>
      {open && (
        <CommonModal>
          <div className="w-[616px] h-[661px] flex flex-col">
            {/* Modal Header */}
            <div className="w-full h-[72px] px-[24px] py-[22px] flex flex-row items-center justify-between rounded-tr-[16px] rounded-tl-[16px] modal-header">
              <h1 className="font-semibold text-[18px] text-typo-secondary">
                Post Uploading
              </h1>

              <div className="flex flex-row items-center gap-[20px]">
                <img
                  src="/assets/svg/monitor-minimize.svg"
                  className="h-5 w-5"
                />
                <img
                  src="/assets/svg/close-btn.svg"
                  className="h-3 w-3"
                  onClick={close}
                />
              </div>
            </div>

            {/* Modal Body */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col items-center justify-center w-[370px] h-[260px] text-white">
                {!isSuccess ? (
                  <div className="w-full h-full flex flex-col justify-center items-center">
                    <CircularProgressbarWithChildren
                      value={loader}
                      // text={`${percentage}%`}
                      className="w-[134px] h-[134px] font-semibold"
                      strokeWidth="5"
                      styles={buildStyles({
                        textSize: "32px",
                        pathTransitionDuration: 0.5,
                        pathColor: "#2E9BFA",
                        textColor: "white",
                        trailColor: "#373A3D",
                      })}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <h5 className="text-[32px] font-semibold text-typo-secondary">
                          {loader}%
                        </h5>
                        <h5 className="font-normal text-typo-secondary text-[14px]">
                          Done
                        </h5>
                      </div>
                    </CircularProgressbarWithChildren>
                    <h4 className="mt-[32px] font-semibold text-typo-secondary text-[28px]">
                      Just a Moment...
                    </h4>
                    <p className="text-center text-[16px] text-typo-primary font-normal mt-[12px]">
                      Your upload is currently in progress. Please allow us a
                      moment to complete the process.
                    </p>
                  </div>
                ) : (
                  <div className="relative w-full h-full flex flex-col justify-center items-center">
                    <img
                      className="absolute left-[230px] top-2"
                      src="/assets/svg/Combined Shape (1).svg"
                    />
                    <img className="" src="/assets/png/Circle 1.png" />
                    <img
                      className="absolute left-[260px] top-20 "
                      src="/assets/svg/Combined Shape (2).svg"
                    />
                    <img
                      className="absolute left-[90px] top-10"
                      src="/assets/svg/Combined Shape.svg"
                    />

                    <p className="mt-[32px] font-semibold text-typo-secondary text-[28px]">
                      Success!
                    </p>
                    <p className="font-normal text-[16px] text-typo-primary mt-3">
                      Your post has been shared
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CommonModal>
      )}
    </>
  );
}
