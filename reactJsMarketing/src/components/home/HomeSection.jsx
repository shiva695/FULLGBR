import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../general/uiElements/Button";
import { useCookies } from "react-cookie";
import { config } from "../../config/config";
import { FaPlusCircle } from "react-icons/fa";
import { apiList, invokeApi } from "../../services/apiServices";

const HomeSection = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [gameEdit, setGameEdit] = useState(false);
  const [addGameModal, setAddGameModal] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [gameData, setGameData] = useState([]);
  const [invokeGameList, setInvokeGameList] = useState(false);
  const [selectedGames, setSelectedGames] = useState(null);

  // filter Search handler
  const filterSearchHandler = (ev) => {
    let search = ev.target.value;
    setSearchValue(ev.target.value);
    let newFilter = gameData?.filter((val) => {
      if (search.length === 1) {
        return val.gameName[0].toLowerCase().includes(search.toLowerCase());
      } else {
        return val.gameName.toLowerCase().includes(search.toLowerCase());
      }
    });
    // if (search === "") {
    //   setFilteredData([]);
    // } else {
    setFilteredData(newFilter);
    // }
  };

  // Check access token is not there navigate to home page
  useEffect(() => {
    if (!!cookies[config.cookieName] && cookies[config.cookieName].userData) {
      setInvokeGameList(true);
      setSelectedGames(cookies[config.cookieName]?.userData?.linkedGames);
      return;
    } else {
      navigate("/");
    }
  }, [navigate, cookies]);

  // get game list
  useEffect(() => {
    const getGameList = async () => {
      let params = {
        skip: 0,
        limit: 10,
        search: "",
        filter: "ENABLE",
      };
      let response = await invokeApi(
        config.apiDomains + apiList.getGamesList,
        params,
        cookies
      );
      if (response.customcode === 200) {
        setGameData(response.data);
      } else {
        alert("Something went wrong");
      }
    };
    if (invokeGameList) {
      setInvokeGameList(false);
      getGameList();
    }
  }, [invokeGameList]);

  return (
    <>
      <div className="bg-[#242424] fixed w-full mt-[80px] rounded">
        <div className="h-[100vh] overflow-y-scroll md:overflow-y-hidden flex-col flex md:flex-row m-5 space-x-3">
          {/* left space */}
          <div className="w-full md:w-3/4">
            {/* header */}
            <div className="ml-7 flex flex-col space-y-2">
              <div className="flex flex-row items-center justify-between">
                <p className="text-3xl leading-[45px] font-semibold  text-transparent bg-clip-text bg-gradient-to-r from-[#DD3131] from-8% via-purple-600 via-12% to-[#223EAC]">
                  My Gaming History
                </p>

                <div className="flex flex-row space-x-6 items-center justify-center text-[#E3E3E3] mr-8">
                  <div
                    className="has-tooltip flex flex-row  cursor-pointer items-center space-x-3"
                    onClick={() => {
                      setGameEdit(!gameEdit);
                      setSelectedGames(
                        cookies[config.cookieName]?.userData?.linkedGames
                      );
                    }}
                  >
                    <img src="/assets/png/info.png" className="h-4 w-4" />
                    {/* <span class="tooltip rounded shadow-lg p-1 bg-[#121212] text-[#e3e3e3]">
                      Edit your game list
                    </span> */}
                    <p className="font-medium">{gameEdit ? "Undo" : "Edit"}</p>
                  </div>
                  <div
                    className="flex flex-row items-center space-x-3"
                    onClick={() => setAddGameModal(true)}
                  >
                    <FaPlusCircle className="h-4 w-4" />
                    <p className="font-medium">Add Games</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center  w-full">
                <p className="w-[80%] font-medium text-[#9D9E9E]">
                  Unlock the Vault of Gaming Memories: A Saga of Triumphs,
                  Tribulations, and Unforgettable Virtual Worlds
                </p>
                {gameEdit && (
                  <div className="w-[20%] flex justify-end">
                    <button className="text-white px-5 py-1.5 rounded-full mr-5 bg-[#121212]">
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* bar with headings */}
            <div className="h-[50px] rounded-lg mt-5 shadow-[inset_0_7px_9px_-1px_rgba(0,0,0,5)] bg-[#121212] w-full flex flex-row">
              <div className="flex flex-row font-sm text-sm text-white w-full p-5 mx-5">
                <div className="w-[50%] flex items-center justify-start">
                  <p className="ms-[50px]">Game</p>
                </div>
                <p className="w-[20%] flex items-center justify-start">
                  Developer
                </p>
                <p className="w-[20%] flex items-center justify-start">
                  Year Played
                </p>
                <p className="w-[10%] flex items-center justify-start">Genre</p>
              </div>
            </div>

            <div className="h-[350px] 2xl:h-[470px] 4xl:h-[640px] rounded-lg mt-3 mb-5 shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)] bg-[#121212] w-full flex flex-col">
              <div className="flex overflow-y-scroll flex-col font-sm text-sm space-y-3 mb-6 pt-3">
                {selectedGames?.length > 0 ? (
                  <>
                    {selectedGames?.map((el, idx) => (
                      <div
                        key={idx}
                        className={`${
                          !gameEdit && "gradient-card-border"
                        } group mx-3`}
                      >
                        <div className="relative py-10 px-3 bg-[#121212] flex flex-row h-[50px] items-center justify-center">
                          <div
                            className={`flex flex-row items-center ${
                              !gameEdit && "group-hover:opacity-5"
                            } justify-center w-full`}
                          >
                            <div className="w-[50%] flex flex-row  items-center space-x-5">
                              <img
                                src={el.gameImage}
                                className="rounded-md h-[70px] w-[90px]"
                                // width={100}
                                // height={70}
                                alt=""
                              />
                              <p className="text-[#9D9E9E]">{el.title}</p>
                            </div>

                            <p className="w-[20%] flex items-center text-[#9D9E9E] justify-start">
                              {el.developer}
                            </p>
                            {gameEdit ? (
                              <div className="w-[20%]">
                                <input
                                  type="text"
                                  className="w-[90px] bg-transparent text-[#9D9E9E] font-semibold border-[#2f2f2f] border-[2px] py-3 rounded-md px-5 focus:outline-none"
                                  maxLength={4}
                                  onChange={(ev) => {
                                    let copy = JSON.parse(
                                      JSON.stringify(selectedGames)
                                    );
                                    copy[idx].year = ev.target.value.replace(
                                      /[^\d]/g,
                                      ""
                                    );
                                    setSelectedGames(copy);
                                  }}
                                  value={el.year}
                                />
                              </div>
                            ) : (
                              <p className="w-[20%] flex items-center text-[#9D9E9E] justify-start">
                                {el.year}
                              </p>
                            )}

                            <p className="w-[10%] flex items-center text-[#9D9E9E] justify-start">
                              <div className="w-20">
                                <Button text="Action" />
                              </div>
                            </p>
                          </div>
                          {!gameEdit && (
                            <div
                              className="group"
                              onClick={() => navigate("/game-detail")}
                            >
                              <div className="absolute  inset-0 flex items-center justify-center">
                                <button className="hidden group-hover:block w-36 bg-[#242424] text-[#9D9E9E] p-2 rounded-full">
                                  View game
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-white h-screen flex items-center justify-center">
                    No data avilable
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* right space */}
          <div className="w-full md:w-1/4">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <p className="text-3xl leading-[45px] font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#DD3131] from-1% via-purple-600 via-35% to-[#223EAC]">
                  Recently played
                </p>
                <p className="font-medium text-[#9D9E9E] mt-[7px]">
                  Latest Battlefronts Explored
                </p>

                {/* bar with headings */}
                <div className="h-[50px] rounded-lg mt-5 shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)] bg-[#121212] w-full flex flex-row">
                  <div className="flex flex-row font-sm text-sm items-center justify-between text-[#E3E3E3] w-full p-5 mx-5">
                    <p className="flex items-center justify-start">Game</p>
                    <p className="flex items-center justify-start">Time</p>
                  </div>
                </div>

                {/* right data */}
                <div className="h-[350px] 2xl:h-[470px] 4xl:h-[640px] rounded-lg mt-3 shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)] bg-[#121212] w-full flex flex-col">
                  <div className="flex flex-col justify-center items-center h-screen m-2.5 font-sm text-sm space-y-[50px] 2xl:space-y-[80px]">
                    {/* <div className="mt-7 2xl:mt-10 flex flex-row h-[30px] justify-between">
                      <div className="flex flex-row  items-center space-x-2">
                        <img
                          src="/assets/png/game-banner-2.png"
                          className="rounded-md h-14 w-20 md:w-[100px] md:h-[60px] 2xl:w-[130px] 2xl:h-[90px]"
                          alt=""
                        />
                        <div className="flex flex-col space-y-1 text-[#9D9E9E]">
                          <p>Mario</p>
                          <p>06:00; 10/06/2023</p>
                        </div>
                      </div>
                      <div className="px-2 bg-[#242424] flex items-center rounded-lg border-[2px] border-[#121212]">
                        <p className="text-[#E3E3E3]">continue</p>
                      </div>
                    </div> */}
                    <p className="text-white">No data avilable</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Game Modal */}
      {addGameModal && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-90 backdrop-blur-sm flex justify-center items-center">
          <div className="relative w-full max-w-4xl bg-[#242424] rounded-lg shadow-lg p-10 text-base font-semibold text-white">
            <button
              type="button"
              className="absolute right-3 top-3 flex items-end w-8 h-8"
              onClick={() => {
                setAddGameModal(false);
              }}
            >
              <img
                src="/assets/svg/close.svg"
                className="h-7 w-7 cursor-pointer m-2"
              />
            </button>
            <div className="flex flex-row w-full space-x-6">
              <input
                type="text"
                className="focus:outline-none w-full bg-transparent border-[1px] px-5 py-2 rounded-full border-gray-700"
                placeholder="Search Game"
                onChange={filterSearchHandler}
                value={searchValue}
              />
              <div className="w-36">
                <Button text="Search" />
              </div>
            </div>
            {/* {filteredData?.length > 0 && ( */}
            <div className="w-full mt-5 z-10 bg-[#121212] flex flex-col cursor-pointer h-[300px] overflow-y-scroll">
              {filteredData?.slice(0, 15).map((el, idx) => (
                <div
                  key={idx}
                  className="flex flex-row gap-5 items-center m-5"
                  onClick={() => {
                    let copy = JSON.parse(JSON.stringify(gameData));
                    let findIdx = copy.findIndex(
                      (element) => element._id === el._id
                    );
                    copy.push(gameData[findIdx]);
                    setGameData(copy);
                    setSearchValue("");
                    setFilteredData([]);
                    setAddGameModal(false);
                  }}
                >
                  <img
                    src={el.gameImage}
                    alt=""
                    className="h-[100px] w-[150px]"
                  />
                  <p className="font-semibold text-2xl">{el.gameName}</p>
                </div>
              ))}
            </div>
            {/* )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default HomeSection;
