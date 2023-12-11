// @import dependencies
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// @import files
import constants from "../../json/constants.json";

const Footer = () => {
  const navigate = useNavigate();
  const [showGameMedia, setShowGameMedia] = useState(false);
  const [showDiscover, setShowDiscover] = useState(false);
  // const [showWallet, setShowWallet] = useState(false);
  const [showRetroPlay, setShowRetroPlay] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [showMedal, setShowMedal] = useState(false);
  const [showGamePedia, setShowGamePedia] = useState(false);

  return (
    <div className="gradient-border border-t-[2px] fixed bottom-0 flex flex-row items-center overflow-x-hidden  w-full h-[60px] bg-[#141517] py-3 px-10">
      <div className="flex flex-row gap-[9px] items-center w-[614px] h-8  mx-auto justify-center">
        <div
          className="wobble-vertical w-[80px] space-x-2 flex flex-row items-center justify-center cursor-pointer"
          onMouseEnter={() => setShowGameMedia(true)}
          onMouseLeave={() => setShowGameMedia(false)}
          onClick={() => navigate(constants.PATH.NAVIGATEHOME)}
        >
          <img className="h-5 w-full" src="/assets/svg/gamefeed.svg" />
          {showGameMedia && (
            <p className="text-white text-center mt-[3px] text-xs pe-3">Home</p>
          )}
        </div>

        <div
          className="wobble-vertical w-[80px] space-x-2 flex flex-row items-center justify-center cursor-pointer"
          onMouseEnter={() => setShowDiscover(true)}
          onMouseLeave={() => setShowDiscover(false)}
          onClick={() => navigate(constants.PATH.NAVIGATEDISCOVER)}
        >
          <img className="h-5 w-full" src="/assets/svg/discover.svg" />
          {showDiscover && (
            <p className="text-white text-center mt-[3px] text-xs pe-3">
              Discover
            </p>
          )}
        </div>
        {/* <div
          className="wobble-vertical w-[80px] space-x-2 flex flex-row items-center justify-center cursor-pointer"
          onMouseEnter={() => setShowWallet(true)}
          onMouseLeave={() => setShowWallet(false)}
        >
          <img className="h-5 w-full" src="/assets/svg/wallet.svg" />
          {showWallet && (
            <p className="text-white text-center mt-[3px] text-xs pe-2.5">
              Wallet
            </p>
          )}
        </div> */}
        <div
          className="wobble-vertical w-[80px] space-x-2 flex flex-row items-center justify-center cursor-pointer"
          onMouseEnter={() => setShowRetroPlay(true)}
          onMouseLeave={() => setShowRetroPlay(false)}
        >
          <img className="h-5 w-full" src="/assets/svg/retroplay.svg" />
          {showRetroPlay && (
            <p className="text-white  text-center mt-[3px]  text-xs pe-3">
              Retroplay
            </p>
          )}
        </div>
        {/* <div
          className="wobble-vertical w-[80px] space-x-2 flex flex-row items-center justify-center cursor-pointer"
          onMouseEnter={() => setShowChallenge(true)}
          onMouseLeave={() => setShowChallenge(false)}
        >
          <img className="h-5 w-full" src="/assets/svg/challenge.svg" />
          {showChallenge && (
            <p className="text-white  text-center mt-[3px] text-xs pe-3">
              Challenge
            </p>
          )}
        </div> */}
        {/* <div
          className="wobble-vertical w-[80px] space-x-2 flex flex-row items-center justify-center cursor-pointer"
          onMouseEnter={() => setShowMedal(true)}
          onMouseLeave={() => setShowMedal(false)}
        >
          <img className="h-5 w-full" src="/assets/svg/military-medal.svg" />
          {showMedal && (
            <p className="text-white  text-center mt-[3px] text-xs pe-2">
              Stars
            </p>
          )}
        </div> */}
        <div
          className="wobble-vertical w-[80px] flex flex-row items-center justify-center cursor-pointer"
          onMouseEnter={() => setShowGamePedia(true)}
          onMouseLeave={() => setShowGamePedia(false)}
          onClick={() => navigate(constants.PATH.NAVIGATEGAMEFOLIO)}
        >
          <img className="h-5 w-full" src="/assets/svg/gamedia.svg" />
          {showGamePedia && (
            <p className="text-white text-center mt-[3px] text-xs">Gamefolio</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
