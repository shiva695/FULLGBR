import React, { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Button from "../general/uiElements/Button";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { config } from "../../config/config";

const GameStore = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [tabIndex, setTabIndex] = useState(0);

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
      <div className="bg-[#242424] mt-[70px] w-full">
        <div className="flex h-[200vh] flex-col px-[30px]">
          <div className="flex flex-row space-x-5">
            {/* left crousal */}
            <div className="w-[80%] pt-10">
              <div className="bg-[#242424] rounded-lg h-[250px] 2xl:h-[250px] 4xl:h-[250px]">
                <Carousel
                  autoPlay
                  infiniteLoop
                  showArrows={false}
                  showStatus={false}
                  showThumbs={false}
                >
                  {/* img - 1 */}
                  <div className="relative bg-gradient-to-r from-[#121212] from-[30%] to-[#807e7e] to-[70%]">
                    <div className="opacity-20">
                      <div className="bg-[url('/assets/png/game-banner-1.png')] bg-no-repeat bg-cover bg-center h-[250px] rounded-lg 2xl:h-[250px] 4xl:h-[250px]"></div>
                    </div>
                    <div className="absolute bottom-5 left-0 font-semibold flex space-y-3 4xl:space-y-5  flex-col items-start mt-20 ml-10">
                      <div className="flex flex-row items-center space-x-4">
                        <img
                          src="/assets/png/trending-icon.png"
                          className="h-10 w-5"
                          alt=""
                        />
                        <h3 className="text-3xl 4xl:text-5xl text-[#9D9E9E]">
                          Trending
                        </h3>
                      </div>
                      <h5 className="text-2xl 4xl:text-4xl text-[#E3E3E3]">
                        Grand Theft Auto: Vice City
                      </h5>
                      <div className="w-36">
                        <Button text="Strategy" />
                      </div>
                    </div>
                  </div>

                  {/* img - 2 */}
                  <div className="relative bg-gradient-to-r from-[#121212] from-[30%] to-[#807e7e] to-[70%]">
                    <div className="opacity-20">
                      <div className="bg-[url('/assets/png/game-banner-2.png')] bg-no-repeat bg-cover bg-center h-[250px] rounded-lg 2xl:h-[250px] 4xl:h-[250px]"></div>
                    </div>
                    <div className="absolute  inset-0 font-semibold flex space-y-3 4xl:space-y-5  flex-col items-start mt-20 ml-10">
                      <div className="flex flex-row items-center space-x-4">
                        <img
                          src="/assets/png/trending-icon.png"
                          className="h-10 w-5"
                          alt=""
                        />
                        <h3 className="text-3xl 4xl:text-5xl text-[#9D9E9E]">
                          Trending
                        </h3>
                      </div>
                      <h5 className="text-2xl 4xl:text-4xl text-[#E3E3E3]">
                        Grand Theft Auto: Vice City
                      </h5>
                      <div className="w-36">
                        <Button text="Strategy" />
                      </div>
                    </div>
                  </div>

                  {/* img - 3 */}
                  <div className="relative bg-gradient-to-r from-[#121212] from-[30%] to-[#807e7e] to-[70%]">
                    <div className="opacity-20">
                      <div className="bg-[url('/assets/png/game-banner-3.png')] bg-no-repeat bg-cover bg-center h-[250px] rounded-lg 2xl:h-[250px] 4xl:h-[250px]"></div>
                    </div>
                    <div className="absolute  inset-0 font-semibold flex space-y-3 4xl:space-y-5  flex-col items-start mt-20 ml-10">
                      <div className="flex flex-row items-center space-x-4">
                        <img
                          src="/assets/png/trending-icon.png"
                          className="h-10 w-5"
                          alt=""
                        />
                        <h3 className="text-3xl 4xl:text-5xl text-[#9D9E9E]">
                          Trending
                        </h3>
                      </div>
                      <h5 className="text-2xl 4xl:text-4xl text-[#E3E3E3]">
                        Grand Theft Auto: Vice City
                      </h5>
                      <div className="w-36">
                        <Button text="Strategy" />
                      </div>
                    </div>
                  </div>
                </Carousel>
              </div>
            </div>
            {/* Right crousal */}
            <div className="w-[20%] pt-10">
              <div className="bg-[#242424] rounded-lg h-[250px] 2xl:h-[250px] 4xl:h-[250px]">
                <Carousel
                  autoPlay
                  infiniteLoop
                  showArrows={false}
                  showStatus={false}
                  showThumbs={false}
                >
                  {/* img - 1 */}
                  <div className="relative bg-[#121212]">
                    <div className="opacity-60">
                      <div className="bg-[url('/assets/png/game-banner-4.png')] bg-no-repeat bg-cover bg-center h-[250px] rounded-lg 2xl:h-[250px] 4xl:h-[250px]"></div>
                    </div>
                    <div className="absolute  inset-0 font-semibold flex space-y-3 4xl:space-y-5  flex-col items-start mt-[130px] ml-5">
                      <h5 className="text-2xl 4xl:text-4xl text-[#E3E3E3]">
                        Chess
                      </h5>
                      {/* button */}
                      <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                        <p className="bg-neutral-900 text-white h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                          Strategy
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* img - 2 */}
                  <div className="relative bg-[#121212]">
                    <div className="opacity-60">
                      <div className="bg-[url('/assets/png/game-banner-4.png')] bg-no-repeat bg-cover bg-center h-[250px] rounded-lg 2xl:h-[250px] 4xl:h-[250px]"></div>
                    </div>
                    <div className="absolute  inset-0 font-semibold flex space-y-3 4xl:space-y-5  flex-col items-start mt-[130px] ml-5">
                      <h5 className="text-2xl 4xl:text-4xl text-[#E3E3E3]">
                        Chess
                      </h5>
                      {/* button */}
                      <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                        <p className="bg-neutral-900 text-white h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                          Strategy
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* img - 3 */}
                  <div className="relative bg-[#121212]">
                    <div className="opacity-60">
                      <div className="bg-[url('/assets/png/game-banner-4.png')] bg-no-repeat bg-cover bg-center h-[250px] rounded-lg 2xl:h-[250px] 4xl:h-[250px]"></div>
                    </div>
                    <div className="absolute  inset-0 font-semibold flex space-y-3 4xl:space-y-5  flex-col items-start mt-[130px] ml-5">
                      <h5 className="text-2xl 4xl:text-4xl text-[#E3E3E3]">
                        Chess
                      </h5>
                      {/* button */}
                      <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                        <p className="bg-neutral-900 text-white h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                          Strategy
                        </p>
                      </div>
                    </div>
                  </div>
                </Carousel>
              </div>
            </div>
          </div>

          {/* content */}
          <div className="gamestore-sticky">
            {/* left */}
            <div className="flex flex-row space-x-5 mt-[100px]">
              <div className="w-[25%] text-[#E3E3E3] font-semibold">
                <h4 className="text-2xl pb-2.5">Screening by</h4>
                <div className="bg-[#1C1C1C] rounded-lg shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)] h-auto mt-10">
                  <div className="p-5 flex flex-col space-y-5">
                    {/* Search input and button */}
                    <div className="flex flex-row space-x-7 justify-between items-center">
                      <div className="bg-[#121212] rounded-full py-3 px-5 w-[300px] h-11 flex flex-row space-x-3">
                        <img
                          className="cursor-pointer h-5 w-5"
                          src="/assets/png/search-icon.png"
                        />
                        <input
                          type="text"
                          className="focus:outline-none w-full bg-transparent"
                          placeholder="Search game"
                        />
                      </div>
                      <div className="w-36">
                        <Button text="Search" />
                      </div>
                    </div>

                    {/* filters applied */}
                    <div className="space-y-3">
                      <p>Filters applied</p>
                      <div className="flex flex-row space-x-3 items-center">
                        <div className="w-32">
                          <Button text="casual" />
                        </div>
                        <p>X</p>
                      </div>
                    </div>
                    <div className="flex flex-col h-[360px] 4xl:h-[560px] overflow-y-scroll  space-y-3">
                      <p>Genre</p>
                      <div className="flex flex-col space-y-3 text-[#9E9D9D]">
                        <p className="px-5">Action</p>
                        <p className="px-5">Adventures</p>
                        <p className="px-5">Casual</p>
                        <p className="px-5">Racing</p>
                        <p className="px-5">Sports</p>
                        <p className="px-5">Strategy</p>
                        <p className="px-5">Puzzle</p>
                        <p className="px-5">Card game</p>
                        <p className="px-5">Shooter</p>
                        <p className="px-5">2D Game</p>
                        <p className="px-5">MOBA</p>
                        <p className="px-5">Arcade</p>
                        <p className="px-5">Fight</p>
                        <p className="px-5">Mind</p>
                        <p className="px-5">Running</p>
                        <p className="px-5">Athelets</p>
                        <p className="px-5">Fun</p>
                        <p className="px-5">Stamina</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* right */}
              <div className="w-[75%] text-[#E3E3E3] font-semibold">
                <div className="flex flex-row space-x-12 text-2xl">
                  <h5
                    className={`text-[#9D9E9E] cursor-pointer pb-2 ${
                      tabIndex === 0 && "gradient-border text-[#E3E3E3]"
                    }`}
                    onClick={() => setTabIndex(0)}
                  >
                    All
                  </h5>
                  <h5
                    className={`text-[#9D9E9E] cursor-pointer pb-2 ${
                      tabIndex === 1 && "gradient-border text-[#E3E3E3]"
                    }`}
                    onClick={() => setTabIndex(1)}
                  >
                    Popular
                  </h5>
                  <h5
                    className={`text-[#9D9E9E] cursor-pointer pb-2 ${
                      tabIndex === 2 && "gradient-border text-[#E3E3E3]"
                    }`}
                    onClick={() => setTabIndex(2)}
                  >
                    News & Trending
                  </h5>
                  <h5
                    className={`text-[#9D9E9E] cursor-pointer pb-2 ${
                      tabIndex === 3 && "gradient-border text-[#E3E3E3]"
                    }`}
                    onClick={() => setTabIndex(3)}
                  >
                    Top Rated
                  </h5>
                  <h5
                    className={`text-[#9D9E9E] cursor-pointer pb-2 ${
                      tabIndex === 4 && "gradient-border text-[#E3E3E3]"
                    }`}
                    onClick={() => setTabIndex(4)}
                  >
                    Upcoming
                  </h5>
                </div>
                <div className="bg-[#1C1C1C] h-[557px] 4xl:h-[700px] overflow-y-scroll shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)] rounded-lg mt-10">
                  <div className="p-5 flex  flex-col  space-y-5">
                    {/* grid - 1  */}
                    <div className="grid grid-cols-4 gap-10 rounded-lg">
                      {/* card -1 */}
                      <div
                        onClick={() => navigate("/game")}
                        className="h-[300px] cursor-pointer rounded-lg w-[230px] flex flex-col space-y-2 4xl:space-y-5 4xl:h-[400px] 4xl:w-[300px] bg-[#242424]"
                      >
                        <div className="bg-[url('/assets/png/episode-banner-1.png')] bg-no-repeat bg-cover bg-center h-[60%] w-full rounded-lg"></div>
                        <div className="m-3 space-y-2 4xl:space-y-4">
                          <h5 className="text-2xl">Alladin</h5>
                          <p className="text-[#9D9E9E]">Publisher Name</p>
                          <div className="flex flex-row space-x-3">
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Strategy
                              </p>
                            </div>
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Arcade
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* card - 2 */}
                      <div className="h-[300px] cursor-pointer rounded-lg w-[230px] flex flex-col space-y-2 4xl:space-y-5 4xl:h-[400px] 4xl:w-[300px] bg-[#242424]">
                        <div className="bg-[url('/assets/png/episode-banner-2.png')] bg-no-repeat bg-cover bg-center h-[60%] w-full rounded-lg"></div>
                        <div className="m-3 space-y-2 4xl:space-y-4">
                          <h5 className="text-2xl">Alladin</h5>
                          <p className="text-[#9D9E9E]">Publisher Name</p>
                          <div className="flex flex-row space-x-3">
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Strategy
                              </p>
                            </div>
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Arcade
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* card - 3 */}
                      <div className="h-[300px] rounded-lg w-[230px] flex flex-col space-y-2 4xl:space-y-5 4xl:h-[400px] 4xl:w-[300px] bg-[#242424]">
                        <div className="bg-[url('/assets/png/episode-banner-3.png')] bg-no-repeat bg-cover bg-center h-[60%] w-full rounded-lg"></div>
                        <div className="m-3 space-y-2 4xl:space-y-4">
                          <h5 className="text-2xl">Alladin</h5>
                          <p className="text-[#9D9E9E]">Publisher Name</p>
                          <div className="flex flex-row space-x-3">
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Strategy
                              </p>
                            </div>
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Arcade
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* card - 4 */}
                      <div className="h-[300px] rounded-lg w-[230px] flex flex-col space-y-2 4xl:space-y-5 4xl:h-[400px] 4xl:w-[300px] bg-[#242424]">
                        <div className="bg-[url('/assets/png/episode-banner-4.png')] bg-no-repeat bg-cover bg-center h-[60%] w-full rounded-lg"></div>
                        <div className="m-3 space-y-2 4xl:space-y-4">
                          <h5 className="text-2xl">Alladin</h5>
                          <p className="text-[#9D9E9E]">Publisher Name</p>
                          <div className="flex flex-row space-x-3">
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Strategy
                              </p>
                            </div>
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Arcade
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* grid - 2  */}
                    <div className="grid grid-cols-4 gap-10 rounded-lg">
                      {/* card -1 */}
                      <div className="h-[300px] rounded-lg w-[230px] flex flex-col space-y-2 4xl:space-y-5 4xl:h-[400px] 4xl:w-[300px] bg-[#242424]">
                        <div className="bg-[url('/assets/png/episode-banner-1.png')] bg-no-repeat bg-cover bg-center h-[60%] w-full rounded-lg"></div>
                        <div className="m-3 space-y-2 4xl:space-y-4">
                          <h5 className="text-2xl">Alladin</h5>
                          <p className="text-[#9D9E9E]">Publisher Name</p>
                          <div className="flex flex-row space-x-3">
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Strategy
                              </p>
                            </div>
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Arcade
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* card - 2 */}
                      <div className="h-[300px] rounded-lg w-[230px] flex flex-col space-y-2 4xl:space-y-5 4xl:h-[400px] 4xl:w-[300px] bg-[#242424]">
                        <div className="bg-[url('/assets/png/episode-banner-2.png')] bg-no-repeat bg-cover bg-center h-[60%] w-full rounded-lg"></div>
                        <div className="m-3 space-y-2 4xl:space-y-4">
                          <h5 className="text-2xl">Alladin</h5>
                          <p className="text-[#9D9E9E]">Publisher Name</p>
                          <div className="flex flex-row space-x-3">
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Strategy
                              </p>
                            </div>
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Arcade
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* card - 3 */}
                      <div className="h-[300px] rounded-lg w-[230px] flex flex-col space-y-2 4xl:space-y-5 4xl:h-[400px] 4xl:w-[300px] bg-[#242424]">
                        <div className="bg-[url('/assets/png/episode-banner-3.png')] bg-no-repeat bg-cover bg-center h-[60%] w-full rounded-lg"></div>
                        <div className="m-3 space-y-2 4xl:space-y-4">
                          <h5 className="text-2xl">Alladin</h5>
                          <p className="text-[#9D9E9E]">Publisher Name</p>
                          <div className="flex flex-row space-x-3">
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Strategy
                              </p>
                            </div>
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Arcade
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* card - 4 */}
                      <div className="h-[300px] rounded-lg w-[230px] flex flex-col space-y-2 4xl:space-y-5 4xl:h-[400px] 4xl:w-[300px] bg-[#242424]">
                        <div className="bg-[url('/assets/png/episode-banner-4.png')] bg-no-repeat bg-cover bg-center h-[60%] w-full rounded-lg"></div>
                        <div className="m-3 space-y-2 4xl:space-y-4">
                          <h5 className="text-2xl">Alladin</h5>
                          <p className="text-[#9D9E9E]">Publisher Name</p>
                          <div className="flex flex-row space-x-3">
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Strategy
                              </p>
                            </div>
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Arcade
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* grid - 3  */}
                    <div className="grid grid-cols-4 gap-10 rounded-lg">
                      {/* card -1 */}
                      <div className="h-[300px] rounded-lg w-[230px] flex flex-col space-y-2 4xl:space-y-5 4xl:h-[400px] 4xl:w-[300px] bg-[#242424]">
                        <div className="bg-[url('/assets/png/episode-banner-1.png')] bg-no-repeat bg-cover bg-center h-[60%] w-full rounded-lg"></div>
                        <div className="m-3 space-y-2 4xl:space-y-4">
                          <h5 className="text-2xl">Alladin</h5>
                          <p className="text-[#9D9E9E]">Publisher Name</p>
                          <div className="flex flex-row space-x-3">
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Strategy
                              </p>
                            </div>
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Arcade
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* card - 2 */}
                      <div className="h-[300px] rounded-lg w-[230px] flex flex-col space-y-2 4xl:space-y-5 4xl:h-[400px] 4xl:w-[300px] bg-[#242424]">
                        <div className="bg-[url('/assets/png/episode-banner-2.png')] bg-no-repeat bg-cover bg-center h-[60%] w-full rounded-lg"></div>
                        <div className="m-3 space-y-2 4xl:space-y-4">
                          <h5 className="text-2xl">Alladin</h5>
                          <p className="text-[#9D9E9E]">Publisher Name</p>
                          <div className="flex flex-row space-x-3">
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Strategy
                              </p>
                            </div>
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Arcade
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* card - 3 */}
                      <div className="h-[300px] rounded-lg w-[230px] flex flex-col space-y-2 4xl:space-y-5 4xl:h-[400px] 4xl:w-[300px] bg-[#242424]">
                        <div className="bg-[url('/assets/png/episode-banner-3.png')] bg-no-repeat bg-cover bg-center h-[60%] w-full rounded-lg"></div>
                        <div className="m-3 space-y-2 4xl:space-y-4">
                          <h5 className="text-2xl">Alladin</h5>
                          <p className="text-[#9D9E9E]">Publisher Name</p>
                          <div className="flex flex-row space-x-3">
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Strategy
                              </p>
                            </div>
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Arcade
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* card - 4 */}
                      <div className="h-[300px] rounded-lg w-[230px] flex flex-col space-y-2 4xl:space-y-5 4xl:h-[400px] 4xl:w-[300px] bg-[#242424]">
                        <div className="bg-[url('/assets/png/episode-banner-4.png')] bg-no-repeat bg-cover bg-center h-[60%] w-full rounded-lg"></div>
                        <div className="m-3 space-y-2 4xl:space-y-4">
                          <h5 className="text-2xl">Alladin</h5>
                          <p className="text-[#9D9E9E]">Publisher Name</p>
                          <div className="flex flex-row space-x-3">
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Strategy
                              </p>
                            </div>
                            <div className="p-0.5 cursor-pointer w-20 rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                              <p className="bg-neutral-900 text-[#9D9E9E] h-[25px] text-sm px-0.5 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                                Arcade
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default GameStore;
