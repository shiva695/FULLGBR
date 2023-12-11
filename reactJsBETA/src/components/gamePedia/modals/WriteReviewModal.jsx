// @Import Dependencies
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

import { apiList, invokeApi } from "../../../utills/apiService";
import { config } from "../../../utills/configUtils";
import CommonModal from "../../generalComponents/CommonModal";

const WriteReviewModal = ({ open, close, gameId, getCommentData }) => {
  const [cookies] = useCookies();
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [commentsError, setCommentsError] = useState(false);

  // user login api integration
  const writeReviewHandler = async () => {
    const controller = new AbortController();
    const { signal } = controller;
    if (rating === 0) {
      toast.info("Please give Rating");
    } else if (comments === "") {
      setCommentsError("Please write comments");
    } else {
      let params = {
        _id: gameId,
        comments: comments,
        ratingValue: rating,
      };
      const response = await invokeApi(
        config.baseUrl + apiList.updateGameComments,
        params,
        cookies,
        { signal }
      );
      if (response.customcode === 200) {
        toast.success("Thanks for rating");
        getCommentData(response.data);
        close();
      } else {
        alert("Something went wrong");
      }
    }

    // UseEffect abort on unmount for cleanup
    return () => {
      controller.abort();
    };
  };
  return (
    <>
      {open && (
        <CommonModal>
          <div className="w-[616px] h-[655px] flex flex-col">
            {/* Modal Header */}
            <div className="flex flex-row items-center justify-between px-[24px] py-[20px] rounded-tr-[16px] rounded-tl-[16px] modal-header">
              <div className="flex flex-row items-center gap-[12px]">
                <img src="/assets/svg/left-pointer.svg" className="w-2 h-3" />
                <h1 className="font-semibold text-[18px] text-typo-secondary">
                  Rate & Review
                </h1>
              </div>
              <img
                src="/assets/svg/close-btn.svg"
                className="w-3 h-3 cursor-pointer"
                onClick={close}
              />
            </div>
            {/* Modal Body */}
            <div className="flex flex-col px-[24px] py-[20px]">
              {/* Img and Game Name */}
              <div className="flex flex-row gap-[12px]">
                <img
                  src="/assets/svg/rating-user-avatar.svg"
                  className="h-14 w-14"
                />
                <div className="flex flex-col gap-[4px]">
                  <h5 className="typo-semibold">Grand Theft Auto</h5>
                  <h5 className="typo-normal">Grand Theft Auto</h5>
                </div>
              </div>
              {/* Ratings */}
              <div className="flex flex-col gap-[12px] mt-[40px]">
                <h5 className="typo-semibold">Overall ratings:</h5>
                <div className="flex flex-row gap-[8px]">
                  <svg
                    onClick={() => setRating(1)}
                    className="cursor-pointer"
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.7328 18.829C6.48434 18.9587 6.20452 19.0162 5.92506 18.995C5.6456 18.9737 5.37768 18.8746 5.15167 18.7089C4.92566 18.5432 4.7506 18.3174 4.64634 18.0573C4.54208 17.7971 4.5128 17.513 4.5618 17.237L5.3708 12.6L1.9648 9.33601C1.76077 9.14144 1.61571 8.89331 1.54624 8.62008C1.47678 8.34684 1.48573 8.05956 1.57206 7.79117C1.65839 7.52279 1.8186 7.28416 2.03434 7.10267C2.25008 6.92117 2.5126 6.80415 2.7918 6.76501L7.5208 6.08901L9.6558 1.83001C9.77989 1.57961 9.97148 1.36886 10.2089 1.22151C10.4464 1.07417 10.7203 0.996094 10.9998 0.996094C11.2793 0.996094 11.5532 1.07417 11.7906 1.22151C12.0281 1.36886 12.2197 1.57961 12.3438 1.83001L14.4788 6.08901L19.2078 6.76501C19.487 6.80415 19.7495 6.92117 19.9653 7.10267C20.181 7.28416 20.3412 7.52279 20.4275 7.79117C20.5139 8.05956 20.5228 8.34684 20.4533 8.62008C20.3839 8.89331 20.2388 9.14144 20.0348 9.33601L16.6288 12.6L17.4378 17.238C17.4868 17.514 17.4575 17.7981 17.3532 18.0583C17.249 18.3184 17.0739 18.5442 16.8479 18.7099C16.6219 18.8756 16.354 18.9747 16.0745 18.996C15.7951 19.0172 15.5153 18.9597 15.2668 18.83L10.9998 16.625L6.7328 18.829Z"
                      fill={`${rating > 0 ? "#EDC748" : ""}`}
                      stroke={`${rating < 1 ? "#7D8185" : ""}`}
                      strokeWidth={`${rating < 1 ? "1.5" : ""}`}
                      strokeLinecap={`${rating < 1 ? "round" : ""}`}
                      strokeLinejoin={`${rating < 1 ? "round" : ""}`}
                    />
                  </svg>
                  <svg
                    onClick={() => setRating(2)}
                    className="cursor-pointer"
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.7328 18.829C6.48434 18.9587 6.20452 19.0162 5.92506 18.995C5.6456 18.9737 5.37768 18.8746 5.15167 18.7089C4.92566 18.5432 4.7506 18.3174 4.64634 18.0573C4.54208 17.7971 4.5128 17.513 4.5618 17.237L5.3708 12.6L1.9648 9.33601C1.76077 9.14144 1.61571 8.89331 1.54624 8.62008C1.47678 8.34684 1.48573 8.05956 1.57206 7.79117C1.65839 7.52279 1.8186 7.28416 2.03434 7.10267C2.25008 6.92117 2.5126 6.80415 2.7918 6.76501L7.5208 6.08901L9.6558 1.83001C9.77989 1.57961 9.97148 1.36886 10.2089 1.22151C10.4464 1.07417 10.7203 0.996094 10.9998 0.996094C11.2793 0.996094 11.5532 1.07417 11.7906 1.22151C12.0281 1.36886 12.2197 1.57961 12.3438 1.83001L14.4788 6.08901L19.2078 6.76501C19.487 6.80415 19.7495 6.92117 19.9653 7.10267C20.181 7.28416 20.3412 7.52279 20.4275 7.79117C20.5139 8.05956 20.5228 8.34684 20.4533 8.62008C20.3839 8.89331 20.2388 9.14144 20.0348 9.33601L16.6288 12.6L17.4378 17.238C17.4868 17.514 17.4575 17.7981 17.3532 18.0583C17.249 18.3184 17.0739 18.5442 16.8479 18.7099C16.6219 18.8756 16.354 18.9747 16.0745 18.996C15.7951 19.0172 15.5153 18.9597 15.2668 18.83L10.9998 16.625L6.7328 18.829Z"
                      fill={`${rating > 1 ? "#EDC748" : ""}`}
                      stroke={`${rating < 2 ? "#7D8185" : ""}`}
                      strokeWidth={`${rating < 2 ? "1.5" : ""}`}
                      strokeLinecap={`${rating < 2 ? "round" : ""}`}
                      strokeLinejoin={`${rating < 2 ? "round" : ""}`}
                    />
                  </svg>
                  <svg
                    onClick={() => setRating(3)}
                    className="cursor-pointer"
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.7328 18.829C6.48434 18.9587 6.20452 19.0162 5.92506 18.995C5.6456 18.9737 5.37768 18.8746 5.15167 18.7089C4.92566 18.5432 4.7506 18.3174 4.64634 18.0573C4.54208 17.7971 4.5128 17.513 4.5618 17.237L5.3708 12.6L1.9648 9.33601C1.76077 9.14144 1.61571 8.89331 1.54624 8.62008C1.47678 8.34684 1.48573 8.05956 1.57206 7.79117C1.65839 7.52279 1.8186 7.28416 2.03434 7.10267C2.25008 6.92117 2.5126 6.80415 2.7918 6.76501L7.5208 6.08901L9.6558 1.83001C9.77989 1.57961 9.97148 1.36886 10.2089 1.22151C10.4464 1.07417 10.7203 0.996094 10.9998 0.996094C11.2793 0.996094 11.5532 1.07417 11.7906 1.22151C12.0281 1.36886 12.2197 1.57961 12.3438 1.83001L14.4788 6.08901L19.2078 6.76501C19.487 6.80415 19.7495 6.92117 19.9653 7.10267C20.181 7.28416 20.3412 7.52279 20.4275 7.79117C20.5139 8.05956 20.5228 8.34684 20.4533 8.62008C20.3839 8.89331 20.2388 9.14144 20.0348 9.33601L16.6288 12.6L17.4378 17.238C17.4868 17.514 17.4575 17.7981 17.3532 18.0583C17.249 18.3184 17.0739 18.5442 16.8479 18.7099C16.6219 18.8756 16.354 18.9747 16.0745 18.996C15.7951 19.0172 15.5153 18.9597 15.2668 18.83L10.9998 16.625L6.7328 18.829Z"
                      fill={`${rating > 2 ? "#EDC748" : ""}`}
                      stroke={`${rating < 3 ? "#7D8185" : ""}`}
                      strokeWidth={`${rating < 3 ? "1.5" : ""}`}
                      strokeLinecap={`${rating < 3 ? "round" : ""}`}
                      strokeLinejoin={`${rating < 3 ? "round" : ""}`}
                    />
                  </svg>
                  <svg
                    onClick={() => setRating(4)}
                    className="cursor-pointer"
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.7328 18.829C6.48434 18.9587 6.20452 19.0162 5.92506 18.995C5.6456 18.9737 5.37768 18.8746 5.15167 18.7089C4.92566 18.5432 4.7506 18.3174 4.64634 18.0573C4.54208 17.7971 4.5128 17.513 4.5618 17.237L5.3708 12.6L1.9648 9.33601C1.76077 9.14144 1.61571 8.89331 1.54624 8.62008C1.47678 8.34684 1.48573 8.05956 1.57206 7.79117C1.65839 7.52279 1.8186 7.28416 2.03434 7.10267C2.25008 6.92117 2.5126 6.80415 2.7918 6.76501L7.5208 6.08901L9.6558 1.83001C9.77989 1.57961 9.97148 1.36886 10.2089 1.22151C10.4464 1.07417 10.7203 0.996094 10.9998 0.996094C11.2793 0.996094 11.5532 1.07417 11.7906 1.22151C12.0281 1.36886 12.2197 1.57961 12.3438 1.83001L14.4788 6.08901L19.2078 6.76501C19.487 6.80415 19.7495 6.92117 19.9653 7.10267C20.181 7.28416 20.3412 7.52279 20.4275 7.79117C20.5139 8.05956 20.5228 8.34684 20.4533 8.62008C20.3839 8.89331 20.2388 9.14144 20.0348 9.33601L16.6288 12.6L17.4378 17.238C17.4868 17.514 17.4575 17.7981 17.3532 18.0583C17.249 18.3184 17.0739 18.5442 16.8479 18.7099C16.6219 18.8756 16.354 18.9747 16.0745 18.996C15.7951 19.0172 15.5153 18.9597 15.2668 18.83L10.9998 16.625L6.7328 18.829Z"
                      fill={`${rating > 3 ? "#EDC748" : ""}`}
                      stroke={`${rating < 4 ? "#7D8185" : ""}`}
                      strokeWidth={`${rating < 4 ? "1.5" : ""}`}
                      strokeLinecap={`${rating < 4 ? "round" : ""}`}
                      strokeLinejoin={`${rating < 4 ? "round" : ""}`}
                    />
                  </svg>
                  <svg
                    onClick={() => setRating(5)}
                    className="cursor-pointer"
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.7328 18.829C6.48434 18.9587 6.20452 19.0162 5.92506 18.995C5.6456 18.9737 5.37768 18.8746 5.15167 18.7089C4.92566 18.5432 4.7506 18.3174 4.64634 18.0573C4.54208 17.7971 4.5128 17.513 4.5618 17.237L5.3708 12.6L1.9648 9.33601C1.76077 9.14144 1.61571 8.89331 1.54624 8.62008C1.47678 8.34684 1.48573 8.05956 1.57206 7.79117C1.65839 7.52279 1.8186 7.28416 2.03434 7.10267C2.25008 6.92117 2.5126 6.80415 2.7918 6.76501L7.5208 6.08901L9.6558 1.83001C9.77989 1.57961 9.97148 1.36886 10.2089 1.22151C10.4464 1.07417 10.7203 0.996094 10.9998 0.996094C11.2793 0.996094 11.5532 1.07417 11.7906 1.22151C12.0281 1.36886 12.2197 1.57961 12.3438 1.83001L14.4788 6.08901L19.2078 6.76501C19.487 6.80415 19.7495 6.92117 19.9653 7.10267C20.181 7.28416 20.3412 7.52279 20.4275 7.79117C20.5139 8.05956 20.5228 8.34684 20.4533 8.62008C20.3839 8.89331 20.2388 9.14144 20.0348 9.33601L16.6288 12.6L17.4378 17.238C17.4868 17.514 17.4575 17.7981 17.3532 18.0583C17.249 18.3184 17.0739 18.5442 16.8479 18.7099C16.6219 18.8756 16.354 18.9747 16.0745 18.996C15.7951 19.0172 15.5153 18.9597 15.2668 18.83L10.9998 16.625L6.7328 18.829Z"
                      fill={`${rating > 4 ? "#EDC748" : ""}`}
                      stroke={`${rating < 5 ? "#7D8185" : ""}`}
                      strokeWidth={`${rating < 5 ? "1.5" : ""}`}
                      strokeLinecap={`${rating < 5 ? "round" : ""}`}
                      strokeLinejoin={`${rating < 5 ? "round" : ""}`}
                    />
                  </svg>
                </div>
              </div>

              {/* Write review */}
              <div className="flex flex-col gap-[12px] mt-[40px]">
                <h5 className="typo-semibold">Write your review:</h5>

                <textarea
                  className={`modal-header focus:outline-typo-blue ${
                    commentsError ? "outline-typo-red" : ""
                  }  w-full outline-none p-[16px] rounded-[16px] text-typo-primary resize-none`}
                  rows="8"
                  placeholder="Write your detailed review here *"
                  value={comments}
                  onChange={(ev) => {
                    setComments(ev.target.value);
                    setCommentsError(false);
                  }}
                ></textarea>
                <p className="text-[12px] font-normal text-typo-red">
                  {commentsError}
                </p>
              </div>

              {/* Button */}
              <div className="flex flex-row mt-[35px] gap-[16px]">
                <div
                  className="w-1/2 modal-header py-[10px] px-[16px] rounded-[8px] cursor-pointer"
                  onClick={close}
                >
                  <h5 className="typo-semibold text-center">Cancel</h5>
                </div>
                <div
                  className="w-1/2 bg-typo-blue py-[10px] px-[16px] rounded-[8px] cursor-pointer"
                  onClick={writeReviewHandler}
                >
                  <h5 className="typo-semibold text-center">Submit Review</h5>
                </div>
              </div>
            </div>
          </div>
        </CommonModal>
      )}
    </>
  );
};

WriteReviewModal.propTypes = {
  open: PropTypes.func,
  close: PropTypes.func,
  gameId: PropTypes.string,
  getCommentData: PropTypes.func,
};

export default WriteReviewModal;
