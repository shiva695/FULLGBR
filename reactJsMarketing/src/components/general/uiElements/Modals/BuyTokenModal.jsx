import React from "react";
import Button from "../Button";
import GradientHeader from "../GradientHeader";

const BuyTokenModal = ({ open, close }) => {
  if (!open) {
    return null;
  }
  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-90 backdrop-blur-sm flex justify-center items-center">
      <div className="relative w-full max-w-4xl bg-[#242424] rounded-lg shadow-lg p-6 text-base font-semibold text-white">
        <button
          type="button"
          className="absolute right-3 top-3 flex items-end w-8 h-8"
          onClick={() => {
            close();
          }}
        >
          <img
            src="/assets/svg/close.svg"
            height="26px"
            width="26px"
            style={{ cursor: "pointer" }}
          />
        </button>

        <div className="flex flex-col text-center items-center justify-center mt-3">
          <GradientHeader
            text="Token Purchases Temporarily Unavailable: Gaming Adventure Awaits!"
            size="header2"
          />
          <p className="text-[#9d9e9e]">
            Apologies, but token purchases are currently unavailable in the
            gaming realm. We're working to bring them soon. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuyTokenModal;
