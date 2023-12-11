import React, { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import Button from "../general/uiElements/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { config } from "../../config/config";

const GamePodcast = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [showEpisode, setShowEpisode] = useState(false);

  // Check access token is not there navigate to home page
  useEffect(() => {
    if (!!cookies[config.cookieName] && cookies[config.cookieName].userData) {
      return;
    } else {
      navigate("/");
    }
  }, [navigate, cookies]);

  return (
    <>
      <HomeHeader />
      <div className="bg-[#242424] fixed mt-[70px] w-full rounded">
        <div className="h-[100vh] flex flex-col space-y-5 m-[60px]">
          {/* header */}
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row items-center justify-between">
              <p className="text-4xl leading-[45px] font-bold  text-transparent bg-clip-text bg-gradient-to-r from-[#DD3131] from-8% via-purple-600 via-12% to-[#223EAC]">
                Podcast Zone
              </p>

              <div className="flex flex-row space-x-10">
                <div className="w-36" onClick={() => setShowEpisode(true)}>
                  <Button text="All Podcasts" />
                </div>
                <div className="w-36">
                  <Button text="All episodes" />
                </div>
              </div>
            </div>
            <p className="font-medium text-lg text-[#9D9E9E]">
              Your Gateway to Gaming Bliss - Join the Conversation, Uncover
              {window.innerWidth}
              Secrets, and Level Up Your Gaming knowledge
            </p>
          </div>

          {/* podcast content */}
          <div
            className={`w-[100%] relative text-[#E3E3E3] ${showEpisode && ""}`}
          >
            <div className="bg-[url('/assets/png/podcast-banner.png')] bg-no-repeat bg-cover bg-center h-[400px] 2xl:h-[500px] 4xl:h-[640px] rounded-lg shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)] w-full flex flex-col"></div>
            <div className="absolute left-16 bottom-12 flex flex-col space-y-5">
              <div className="flex flex-row space-x-5">
                <img src="/assets/png/play-now.png" className="h-10 w-10" />
                <p className="text-2xl font-bold">Now Playing</p>
              </div>

              <h5 className="text-4xl">
                GameCast Central: Unlocking the World of Gaming
              </h5>
              <p className="text-2xl">
                Episode 2: From Pixels to play: A journey in to Gaming history
              </p>
            </div>

            {showEpisode && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1 }}
                variants={{
                  hidden: { opacity: 0, x: 50, y: -640 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <div className="absolute right-2  4xl:top-0 bg-[#242424] rounded-lg h-[400px] top-[240px] 2xl:h-[500px] 4xl:h-[640px] 2xl:top-[140px] shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)] w-[30%] flex flex-col space-y-5">
                  <div className="flex flex-col m-6 space-y-5">
                    {/* search and search buton */}
                    <div className="flex flex-row space-x-7 justify-between items-center">
                      <div className="bg-[#121212] rounded-full py-3 px-5 w-[300px] h-11 flex flex-row space-x-3">
                        <img
                          className="cursor-pointer h-5 w-5"
                          src="/assets/png/search-icon.png"
                        />
                        <input
                          type="text"
                          className="focus:outline-none w-full bg-transparent"
                          placeholder="Search the episode..."
                        />
                      </div>

                      <div className="w-36">
                        <Button text="Search" />
                      </div>
                    </div>

                    {/* Epsidoes content */}
                    <div className="overflow-y-scroll bg-[#121212] h-[290px] 2xl:h-[400px] 4xl:h-[540px] rounded-lg shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)]">
                      <div className="flex flex-col space-y-6 m-4">
                        {/* content-1 */}
                        <div
                          className="flex flex-row items-center space-x-5 cursor-pointer"
                          onClick={() => setShowEpisode(false)}
                        >
                          <img
                            src="/assets/png/episode-banner-1.png"
                            className="2xl:h-[80px] 4xl:h-[120px]"
                          />
                          <div className="flex flex-col font-semibold space-y-1">
                            <h4 className="text-[#E3E3E3] 4xl:text-2xl 2xl:text-lg">
                              Episode 1
                            </h4>
                            <h6 className="text-[#9D9E9E] 4xl:text-lg 2xl:text-sm">
                              From Pixels to Play: Lorem ipsum dolor, sit amet
                              <p className="text-[#9D9E9E] 4xl:text-lg 2xl:text-sm">
                                1 Jun 2023
                              </p>
                            </h6>
                          </div>
                        </div>
                        {/* content-2 */}
                        <div className="flex flex-row items-center space-x-5">
                          <img
                            src="/assets/png/episode-banner-2.png"
                            className="2xl:h-[80px] 4xl:h-[120px]"
                          />
                          <div className="flex flex-col font-semibold space-y-1">
                            <h4 className="text-[#E3E3E3] 4xl:text-2xl 2xl:text-lg">
                              Episode 2
                            </h4>
                            <h6 className="text-[#9D9E9E] 4xl:text-lg 2xl:text-sm">
                              From Pixels to Play: Lorem ipsum dolor, sit amet
                              <p className="text-[#9D9E9E] 4xl:text-lg 2xl:text-sm">
                                1 Jun 2023
                              </p>
                            </h6>
                          </div>
                        </div>
                        {/* content-3 */}
                        <div className="flex flex-row items-center space-x-5">
                          <img
                            src="/assets/png/episode-banner-3.png"
                            className="2xl:h-[80px] 4xl:h-[120px]"
                          />
                          <div className="flex flex-col font-semibold space-y-1">
                            <h4 className="text-[#E3E3E3] 4xl:text-2xl 2xl:text-lg">
                              Episode 3
                            </h4>
                            <h6 className="text-[#9D9E9E] 4xl:text-lg 2xl:text-sm">
                              From Pixels to Play: Lorem ipsum dolor, sit amet
                              <p className="text-[#9D9E9E] 4xl:text-lg 2xl:text-sm">
                                1 Jun 2023
                              </p>
                            </h6>
                          </div>
                        </div>
                        {/* content-4 */}
                        <div className="flex flex-row items-center space-x-5">
                          <img
                            src="/assets/png/episode-banner-4.png"
                            className="2xl:h-[80px] 4xl:h-[120px]"
                          />
                          <div className="flex flex-col font-semibold space-y-1">
                            <h4 className="text-[#E3E3E3] 4xl:text-2xl 2xl:text-lg">
                              Episode 4
                            </h4>
                            <h6 className="text-[#9D9E9E] 4xl:text-lg 2xl:text-sm">
                              From Pixels to Play: Lorem ipsum dolor, sit amet
                              <p className="text-[#9D9E9E] 4xl:text-lg 2xl:text-sm">
                                1 Jun 2023
                              </p>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePodcast;
