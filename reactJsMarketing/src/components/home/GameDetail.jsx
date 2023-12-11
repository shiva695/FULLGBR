import React, { useState, c, useEffect } from "react";
import HomeHeader from "./HomeHeader";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { getDateFormat } from "../common/common";

const GameDetail = () => {
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(0);
  const [gameSingleData, setGameSingleData] = useState(null);

  // set game single data
  useEffect(() => {
    if (location?.state !== null) {
      setGameSingleData(location?.state);
    }
  }, [location]);

  return (
    <>
      <HomeHeader />
      <div className="bg-[#242424] mt-[70px] fixed w-full rounded">
        <div className="h-[100vh] flex flex-col space-y-5 m-[60px]">
          {/* Header */}
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row items-center justify-between">
              <p className="text-4xl leading-[45px] font-bold  text-transparent bg-clip-text bg-gradient-to-r from-[#DD3131] from-8% via-purple-600 via-12% to-[#223EAC]">
                {gameSingleData?.gameName}
              </p>
            </div>

            <p className="font-medium text-lg text-[#9D9E9E]">
              Unlock The Vault of Gaming Memories: A Saga of Triumph,
              Tribulations, and Unforgettable Virtual Words
            </p>
          </div>

          {/* Tabs list */}
          <div className="flex flex-row items-start gap-[10%] border-b-[#242424] border-b-[3px] pt-5 4xl:pt-10 text-[#E3E3E3] text-2xl">
            <h5
              className={`cursor-pointer pb-2 ${
                tabIndex === 0 && "gradient-border"
              }`}
              onClick={() => setTabIndex(0)}
            >
              Overview
            </h5>
            <h5
              className={`cursor-pointer pb-2 ${
                tabIndex === 1 && "gradient-border"
              }`}
              onClick={() => setTabIndex(1)}
            >
              Plot
            </h5>
            <h5
              className={`cursor-pointer pb-2 ${
                tabIndex === 2 && "gradient-border"
              }`}
              onClick={() => setTabIndex(2)}
            >
              Awards
            </h5>
            <h5
              className={`cursor-pointer pb-2 ${
                tabIndex === 3 && "gradient-border"
              }`}
              onClick={() => setTabIndex(3)}
            >
              Ratings and Reviews
            </h5>
            <h5
              className={`cursor-pointer pb-2 ${
                tabIndex === 4 && "gradient-border"
              }`}
              onClick={() => setTabIndex(4)}
            >
              Gallery
            </h5>
            <h5
              className={`cursor-pointer pb-2 ${
                tabIndex === 5 && "gradient-border"
              }`}
              onClick={() => setTabIndex(5)}
            >
              Founder
            </h5>
          </div>

          {/* content row */}
          <div className="flex flex-row space-x-4">
            {/* column 1 */}
            <div className="w-[25%]">
              <div className="bg-[url('/assets/png/game-banner-3.png')] bg-no-repeat bg-cover bg-center h-[350px] 2xl:h-[420px] 4xl:h-[540px] rounded-lg shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)] w-full flex flex-col"></div>
            </div>
            {/* column 2 */}
            <div className="w-[30%]">
              <div className="h-[350px] 2xl:h-[420px] 4xl:h-[540px] text-[#E3E3E3] rounded-lg shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)] bg-[#121212] w-full flex flex-col">
                <div className="m-5 flex flex-col">
                  <div className="flex flex-col space-y-3 border-b-[#242424] pb-3 border-b-[3px]">
                    <h5 className="text-4xl">
                      {gameSingleData?.overview.title}
                    </h5>
                    <p className="text-[#9D9E9E] font-bold">
                      {gameSingleData?.overview.description}
                    </p>
                  </div>
                </div>

                {/* publishers dev age */}
                <div className="flex flex-row text-lg font-semibold mt-3 4xl:mt-10 items-center justify-around">
                  <div className="flex flex-col items-center justify-center">
                    <h5>Publishers</h5>
                    <p className="text-[#9D9E9E]">
                      {gameSingleData?.overview.publishers}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <h5>Developers</h5>
                    <p className="text-[#9D9E9E]">
                      {gameSingleData?.overview.developers}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <h5>Age</h5>
                    <p className="text-[#9D9E9E]">nill</p>
                  </div>
                </div>
                {/* release date genre Userbase */}
                <div className="flex flex-row font-semibold text-lg mt-5 4xl:mt-10 items-center justify-around">
                  <div className="flex flex-col items-center justify-center">
                    <h5>Release Date</h5>
                    <p className="text-[#9D9E9E]">
                      {getDateFormat(
                        gameSingleData?.overview.releseDate,
                        "dd/mm/yyyy"
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <h5>Genre</h5>
                    <p className="text-[#9D9E9E] text-ellipsis truncate w-10">
                      {gameSingleData?.overview.genre}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <h5>Userbase</h5>
                    <p className="text-[#9D9E9E]">
                      {gameSingleData?.overview.totalDownloads}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row text-lg font-semibold items-center mt-10 justify-center space-x-10">
                  <div className="flex flex-col space-y-2 items-center justify-center">
                    <p>Platform</p>
                    <div className="flex flex-row gap-4">
                      {gameSingleData?.overview.platform.map((el, idx) => (
                        <img key={idx} src={el} className="h-10 w-10" />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 items-center justify-center">
                    <p>Ratings</p>
                    <p className="text-[#9D9E9E]">
                      {gameSingleData?.overview.rating === 1
                        ? "★"
                        : gameSingleData?.overview.rating === 2
                        ? "★ ★"
                        : gameSingleData?.overview.rating === 3
                        ? "★ ★ ★"
                        : gameSingleData?.overview.rating === 4
                        ? "★ ★ ★ ★"
                        : gameSingleData?.overview.rating === 5
                        ? "★ ★ ★ ★ ★"
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* column 3 */}
            <div className="w-[50%]">
              <div className="relative h-[350px] 2xl:h-[420px] 4xl:h-[540px] rounded-lg shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)] bg-[#121212] w-full flex flex-col overflow-y-scroll overflow-x-hidden">
                {/* Summary */}
                {tabIndex === 0 && (
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 2 }}
                    variants={{
                      hidden: { opacity: 0, x: 0 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <div className="m-5 text-[#E3E3E3] flex flex-col">
                      <div className="flex flex-col space-y-5 border-b-[#242424] pb-3 border-b-[3px]">
                        <h5 className="text-4xl">
                          {gameSingleData?.summary.title}
                        </h5>
                        <p className="text-[#9D9E9E] font-bold">
                          {gameSingleData?.summary.description}
                        </p>
                      </div>

                      <div className="text-start text-lg mt-5 4xl:mt-10 text-[#9D9E9E] font-semibold">
                        {gameSingleData?.summary.detail}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* plots */}
                {tabIndex === 1 && (
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 2 }}
                    variants={{
                      hidden: { opacity: 0, x: 0 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <div className="m-5 text-[#E3E3E3] flex flex-col">
                      <div className="flex flex-col space-y-5 border-b-[#242424] pb-3 border-b-[3px]">
                        <h5 className="text-4xl">
                          {gameSingleData?.plot.title}
                        </h5>
                        <p className="text-[#9D9E9E] font-bold">
                          {gameSingleData?.plot.description}
                        </p>
                      </div>

                      <div className="text-start font-semibold text-[#9D9E9E] text-lg mt-10">
                        {gameSingleData?.plot.detail}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* awards */}
                {tabIndex === 2 && (
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 2 }}
                    variants={{
                      hidden: { opacity: 0, x: 0 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <div className="m-5 text-[#E3E3E3] flex flex-col">
                      <div className="flex flex-col space-y-5 border-b-[#242424] pb-3 border-b-[3px]">
                        <h5 className="text-4xl">
                          {gameSingleData?.awards.title}
                        </h5>
                        <p className="text-[#9D9E9E] font-bold">
                          {gameSingleData?.awards.description}
                        </p>
                      </div>

                      <table className="w-full text-sm text-left">
                        <thead className="sticky top-0 z-10 text-xs text-gray-700 uppercase bg-zinc-200 dark:bg-zinc-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Name
                            </th>

                            <th scope="col" className="px-6 py-3">
                              Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Result
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {gameSingleData?.awards.awards.map((el, index) => {
                            return (
                              <tr
                                key={index}
                                className="bg-white border-b dark:bg-[#121212] dark:border-gray-700"
                              >
                                <td className="px-6 py-4 text-[#121212] dark:text-white">
                                  {el.name}
                                </td>
                                <td className="px-6 py-4 text-[#121212] dark:text-white">
                                  {el.category}
                                </td>
                                <td className="px-6 py-4 text-[#121212] dark:text-white">
                                  {getDateFormat(el.date, "dd/mm/yyyy")}
                                </td>
                                <td className="px-6 py-4 text-[#121212] dark:text-white">
                                  {el.status}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {/* Rating and review */}
                {tabIndex === 3 && (
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    // viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 2 }}
                    variants={{
                      hidden: { opacity: 0, x: 0 },
                      visible: { opacity: 1, x: 1 },
                    }}
                  >
                    <div className="m-5 text-[#E3E3E3] flex flex-col">
                      <div className="flex flex-col space-y-5 border-b-[#242424] pb-3 border-b-[3px]">
                        <h5 className="text-4xl">
                          {gameSingleData?.rating.title}
                        </h5>
                        <p className="text-[#9D9E9E] font-bold">
                          {gameSingleData?.rating.description}
                        </p>
                      </div>

                      <div className="text-lg font-semibold mt-10 space-y-5">
                        <div>
                          Ratings{" "}
                          {gameSingleData?.rating.rating === 1
                            ? "★"
                            : gameSingleData?.rating.rating === 2
                            ? "★ ★"
                            : gameSingleData?.rating.rating === 3
                            ? "★ ★ ★"
                            : gameSingleData?.rating.rating === 4
                            ? "★ ★ ★ ★"
                            : gameSingleData?.rating.rating === 5
                            ? "★ ★ ★ ★ ★"
                            : ""}
                        </div>
                        <div className="flex flex-row flex-wrap gap-4 justify-between">
                          {gameSingleData?.rating.ratingData.map((el) => (
                            <div className="flex flex-row space-x-3">
                              <p className="text-[#9D9E9E]">{el.title}</p>
                              <p>
                                {el.value === 1
                                  ? "★"
                                  : el.value === 2
                                  ? "★ ★"
                                  : el.value === 3
                                  ? "★ ★ ★"
                                  : el.value === 4
                                  ? "★ ★ ★ ★"
                                  : el.value === 5
                                  ? "★ ★ ★ ★ ★"
                                  : ""}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Comments section */}
                      <div className="flex flex-col font-semibold space-y-5">
                        <h5 className="text-2xl mt-5">Comments</h5>
                        {/* avatar and coment sec */}
                        {gameSingleData?.rating.comments.map((el, idx) => (
                          <div key={idx} className="flex flex-row">
                            <div className="w-[10%]">
                              <div className="h-[40px] w-[40px] bg-[url('/assets/png/avatar-icon.png')] bg-no-repeat bg-cover bg-center"></div>
                            </div>
                            <div className="w-[90%]">
                              <div className="flex flex-col space-y-5 bg-[#242424] h-fit p-5 rounded-2xl">
                                <div className="flex flex-row items-center justify-between">
                                  <h5>{el.userName}</h5>
                                  <p className="text-[#9D9E9E]">1 day ago</p>
                                </div>
                                <p className="text-[#9D9E9E]">{el.comments}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* gallery */}
                {tabIndex === 4 && (
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 2 }}
                    variants={{
                      hidden: { opacity: 0, x: 0 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <div className="m-5 text-[#E3E3E3] flex flex-col">
                      <div className="flex flex-col space-y-5 border-b-[#242424] pb-3 border-b-[3px]">
                        <h5 className="text-4xl">
                          {gameSingleData?.gallery.title}
                        </h5>
                        <p className="text-[#9D9E9E] font-bold">
                          {gameSingleData?.gallery.description}
                        </p>
                      </div>

                      <div className="w-[100%] mt-6">
                        <div className="bg-[url('/assets/png/game-banner-1.png')] bg-no-repeat bg-cover bg-center xl:h-[200px] 2xl:h-[370px] rounded-lg"></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* founder */}
                {tabIndex === 5 && (
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 2 }}
                    variants={{
                      hidden: { opacity: 0, x: 0 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <div className="m-5 text-[#E3E3E3] flex flex-col">
                      <div className="flex flex-col space-y-5 border-b-[#242424] pb-3 border-b-[3px]">
                        <h5 className="text-4xl">
                          {gameSingleData?.founders.title}
                        </h5>
                        <p className="text-[#9D9E9E] font-bold">
                          {gameSingleData?.founders.description}
                        </p>
                      </div>

                      <div className="text-lg mt-[60px]">
                        <div className="flex flex-row items-center justify-around">
                          {/* avt 1 */}
                          {gameSingleData?.founders.data.map((el, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col items-center space-y-3"
                            >
                              <img
                                src={el.image}
                                className={`h-[150px] w-[130px] rounded-lg`}
                              />
                              <p>{el.name}</p>
                              <p>{el.designation}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameDetail;
