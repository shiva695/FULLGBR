import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BuyTokenModal from "./BuyTokenModal";

const TokenModal = ({ open, close }) => {
  const [isBuyTokenModal, setIsBuyTokenModal] = useState(false);
  const navigate = useNavigate();

  const onClose = () => {
    setIsBuyTokenModal(false);
  };

  // if (!open) {
  //   return null;
  // }

  return (
    <>
      {open && (
        <div
          onClick={() => close()}
          className="fixed z-10 inset-0 cursor-pointer bg-black bg-opacity-50  flex justify-center items-center"
        >
          <div className="absolute top-[64px] right-[245px] 4xl:right-[435px] modal-notch"></div>
          <div className="absolute top-[94px] right-[215px] w-[350px] 4xl:right-[395px] bg-[#242424] rounded-lg shadow-lg p-4  font-semibold text-white">
            <div className="flex flex-col space-y-2">
              <p className="text-lg w-13 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#DD3131] to-[#223EAC]">
                Tokens
              </p>
              <p className="text-[#9d9e9e]">
                Power, Prestige and Victory Await - Claim Them with Title
                Tokens!
              </p>
            </div>
            <div>
              <div className="bg-[#1C1C1C] rounded-lg mt-4 mx-2 shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)]">
                <div className="flex flex-col space-y-4 h-[127px]">
                  <div className="m-5 flex flex-col space-y-3">
                    <div
                      className="flex flex-row cursor-pointer items-center space-x-3"
                      onClick={() => {
                        setIsBuyTokenModal(true);
                      }}
                    >
                      <img
                        src="/assets/png/cart-icon.png"
                        className="h-10 w-12"
                        alt=""
                      />
                      <p className="text-[#9d9e9e]">Buy tokens</p>
                    </div>
                    <div
                      className="flex flex-row cursor-pointer items-center space-x-3"
                      onClick={() => {
                        close();
                        navigate("/game-coin");
                      }}
                    >
                      <img
                        src="/assets/png/earned-coins.png"
                        className="h-10 w-12"
                        alt=""
                      />
                      <p className="text-[#9d9e9e]">Earned tokens</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buy token Modal */}
      <BuyTokenModal open={isBuyTokenModal} close={onClose} />
    </>
  );
};

export default TokenModal;
