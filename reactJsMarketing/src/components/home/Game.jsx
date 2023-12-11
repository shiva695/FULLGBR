import React from "react";
import HomeHeader from "./HomeHeader";
import Button from "../general/uiElements/Button";
import Badge from "../general/uiElements/Badge";

const Game = () => {
  return (
    <>
      <HomeHeader />
      <div className="bg-[#1C1C1C] fixed w-full rounded-3xl mt-[60px]">
        <div className="h-[100vh] flex flex-col space-y-5 m-5">
          {/* Header */}
          <div className="ml-7 flex flex-col space-y-2">
            <div className="flex flex-row items-center justify-between pt-5">
              <p className="text-3xl leading-[45px] font-semibold  text-transparent bg-clip-text bg-gradient-to-r from-[#DD3131] from-8% via-purple-600 via-12% to-[#223EAC]">
                Alladin
              </p>
            </div>

            <p className="font-medium text-[#9D9E9E]">
              Fighting game on NDS featuring many characters of the Dragon Ball
              Z saga and special moves for each of them
            </p>
          </div>

          <div className="flex flex-row space-x-5">
            {/* Left section */}
            <div className="w-[70%]">
              <div className="relative h-[400px] 2xl:h-[520px] 4xl:h-[620px] rounded-lg mt-3 mb-5 shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)] bg-[#121212] w-full flex flex-col">
                <img
                  src="/assets/png/game-banner-1.png"
                  className="p-2 h-[400px] 4xl:h-[620px] 2xl:h-[520px]"
                  alt=""
                />

                <div className="absolute left-12 bottom-12 flex flex-col space-y-5">
                  <div className="flex flex-row items-center justify-center space-x-4">
                    <img src="/assets/png/play-now.png" className="h-10 w-10" />
                    <p className="text-2xl text-[#E3E3E3] font-bold">
                      Play now
                    </p>
                  </div>
                  <p className="text-4xl text-[#E3E3E3] font-extrabold">
                    Alladin
                  </p>
                </div>
              </div>
            </div>
            {/* right section */}
            <div className="w-[30%]">
              <div className="h-[400px] 2xl:h-[520px] 4xl:h-[620px] w-full space-y-3 flex flex-col">
                <p className="text-sm text-[#E3E3E3] font-bold pt-2">
                  Discription
                </p>
                <p className="text-[#9D9E9E]">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Nihil distinctio hic laudantium officiis doloremque quas atque
                  ipsam aliquam animi obcaecati.
                  <span className="text-sm ml-5 text-[#E3E3E3] font-bold">
                    Read More
                  </span>
                </p>

                <div className="flex flex-row space-x-5 pt-5">
                  <div className="w-36">
                    <Badge text="action" />
                  </div>
                  <div className="w-36">
                    <Badge text="strategy" />
                  </div>
                </div>

                <div className="pt-5">
                  <Button text="Play Now" />
                </div>
                {/* People also like */}
                <div className="flex flex-col space-y-5 pt-3">
                  <p className="text-sm text-[#E3E3E3] font-bold">
                    People also like
                  </p>

                  <div className="flex flex-row w-[100%] space-x-5">
                    <div className="2xl:h-[200px] xl:h-[100px] shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)]">
                      <img
                        src="/assets/png/game-banner-1.png"
                        className="p-1 2xl:h-[200px] xl:h-[100px]"
                        alt=""
                      />
                    </div>
                    <div className="2xl:h-[200px] xl:h-[100px] shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)]">
                      <img
                        src="/assets/png/game-banner-2.png"
                        className="p-1 2xl:h-[200px] xl:h-[100px]"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
