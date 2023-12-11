import React, { useState } from "react";
import GradientHeader from "../GradientHeader";
import Button from "../Button";
import { apiList, invokeApi } from "../../../../services/apiServices";
import { config } from "../../../../config/config";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const FeedbackModal = ({ open, onClose }) => {
  const [feedback, setFeedback] = useState("");
  const [feedbackHelper, setFeedbackHelper] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionHelper, setDescriptionHelper] = useState("");

  const [cookies] = useCookies();

  if (!open) {
    return null;
  }

  const sendFeedback = async () => {
    let valid = validateFedback();
    if (valid) {
      let params = {
        description,
        type: feedback,
      };
      let response = await invokeApi(
        config.apiDomains + apiList.sendFeedback,
        params,
        cookies
      );
      if (response.customcode === 200) {
        toast.success("Feedback send successfully");
        onClose();
      } else {
        alert("Somethinf went wrong");
      }
    }
  };

  const validateFedback = () => {
    let validationErrors = false;

    if (description === "") {
      validationErrors = true;
      setDescriptionHelper("Please enter the discription");
    }
    if (feedback === "") {
      validationErrors = true;
      setFeedbackHelper("Please select the feedback type");
    }

    if (!validationErrors) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-90 backdrop-blur-sm flex justify-center items-center">
      <div className="relative w-full max-w-4xl bg-[#242424] rounded-lg shadow-lg p-6 text-base font-semibold text-white">
        <button
          type="button"
          className="absolute right-3 top-3 flex items-end w-8 h-8"
          onClick={() => {
            onClose();
            setDescriptionHelper("");
            setFeedbackHelper("");
          }}
        >
          <img
            src="/assets/svg/close.svg"
            height="26px"
            width="26px"
            style={{ cursor: "pointer" }}
          />
        </button>

        <div className="flex flex-col w-full items-center justify-center mt-3">
          <GradientHeader text="Write Your Feedback here..." size="header2" />

          <div className="flex flex-col w-full space-y-5">
            <label className="text-start">Feedback Type</label>
            <div className="flex flex-col space-y-3">
              <select
                onClick={(ev) => {
                  setFeedbackHelper("");
                  setFeedback(ev.target.value);
                }}
                className="bg-transparent w-full text-[#9d9e9e] py-2 px-5 rounded-md border-[2px] border-[#2f2f2f] focus:outline-none"
              >
                <option value="MINOR">Minor</option>
                <option value="MAJOR">Major</option>
                <option value="OTHERS">Others</option>
              </select>
              <p className="text-red-600">{feedbackHelper}</p>
            </div>

            <div className="flex flex-col space-y-3">
              <textarea
                rows="4"
                cols="50"
                placeholder="Write your feedback..."
                className="bg-transparent w-full rounded-md border-[2px] p-5 border-[#2f2f2f] focus:outline-none"
                value={description}
                onChange={(ev) => {
                  setDescriptionHelper("");
                  setDescription(ev.target.value);
                }}
              ></textarea>
              <p className="text-red-600">{descriptionHelper}</p>
            </div>
          </div>
          <div className="w-40 flex justify-end mt-4" onClick={sendFeedback}>
            <Button text="Send Feedback" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
