// @import dependencies
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// @import json
import constants from "../../json/constants.json";
import responseData from "../../json/testhomedata.json";

// @import Utils
import { apiList, invokeApi } from "../../utills/apiService";
import { config } from "../../utills/configUtils";

// @import Utils
import generalConstants from "../../constants/generalConstants";

// @import components
import {
  GameDiv,
  TopGameContainer,
  GameContainerHead,
  // PlayerDiv,
  // TeamDiv,
} from "./components/GameContainer";

const GameStore = () => {
  const listInnerRef = useRef(null);
  const navigate = useNavigate();
  // State varaibles
  const [gameData, setGameData] = useState(responseData.data.gamepediaData);
  const [invokeGameData, setInvokeGameData] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [gameSearchData, setGameSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [innerRef, setInnerRef] = useState(null);
  const [skip, setSkip] = useState(0);
  const [isGameLoading, setIsGameLoading] = useState(true);
  const [maxDistReached, setMaxDistReached] = useState(false);
  const [invokeGameSearch, setInvokeGameSearch] = useState(true);

  // onScroll effect handler
  useEffect(() => {
    const onScroll = () => {
      if (innerRef) {
        const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight;
        if (isNearBottom && !isLoading && !maxDistReached) {
          setSkip((prev) => prev + 10);
          setInvokeGameSearch(true);
        }
      } else {
        console.error("on bottom scroll error");
      }
    };

    setInnerRef(listInnerRef.current);
    if (innerRef) {
      innerRef.addEventListener("scroll", onScroll);
      // Clean-up
      return () => {
        innerRef.removeEventListener("scroll", onScroll);
      };
    }
  }, [innerRef, isLoading, maxDistReached]);

  //get game data
  useEffect(() => {
    const getGamepediaHomeData = async () => {
      let params = {};
      const controller = new AbortController();
      const { signal } = controller;
      const response = await invokeApi(
        config.baseUrl + apiList.getGamepediaHomeData,
        params,
        { signal }
      );
      if (response.customcode === 200) {
        setGameData(response.data.gamepediaData);
        let timer = setTimeout(() => setIsGameLoading(false), 1000);
        return () => clearTimeout(timer);
      } else {
        alert("Something went wrong");
        setIsGameLoading(false);
      }

      // UseEffect abort on unmount for cleanup
      return () => {
        controller.abort();
      };
    };
    if (invokeGameData) {
      setInvokeGameData(false);
      getGamepediaHomeData();
    }
  }, [invokeGameData]);

  //get game data
  useEffect(() => {
    const getGamepediaSearch = async () => {
      setIsLoading(true);
      let params = { skip, limit: 10, search: searchValue };
      const controller = new AbortController();
      const { signal } = controller;
      const response = await invokeApi(
        config.baseUrl + apiList.getTopSearchGamepediaList,
        params,
        { signal }
      );
      if (response.customcode === 200) {
        if (response.data.length < 10) {
          setMaxDistReached(true);
        } else {
          setMaxDistReached(false);
        }
        if (skip > 0) {
          setGameSearchData((prev) => [...prev, ...response.data]);
        } else {
          setGameSearchData(response.data);
        }
        setIsLoading(false);
      } else {
        alert("Something went wrong");
      }

      // UseEffect abort on unmount for cleanup
      return () => {
        controller.abort();
      };
    };
    if (searchValue.length >= 3 && invokeGameSearch) {
      setInvokeGameSearch(false);
      getGamepediaSearch();
    }
  }, [invokeGameSearch, searchValue, skip]);

  // Testing purpose
  setTimeout(() => setIsGameLoading(false), 1000);

  return (
    <div className="flex flex-col w-[1024px] h-[100vh] pt-[40px] mx-auto pb-[40px]">
      <GameContainerHead
        heading={generalConstants.GAMEFOLIO}
        description={generalConstants.GAMEFOLIODESCRIPTION}
      >
        <div className="flex flex-row gap-[12px] items-center h-[40px] w-[350px] py-[10px] px-[12px] bg-[#141517] mt-[16px] rounded-[20px]">
          <img className="h-5 w-5" src="/assets/svg/search-icon.svg" />
          <input
            className="bg-transparent outline-none w-full text-typo-secondary"
            placeholder="Search games"
            value={searchValue}
            onChange={(ev) => {
              setSearchValue(ev.target.value);
              setSkip(0);
              if (ev.target.value.length >= 3) setInvokeGameSearch(true);
              if (ev.target.value.length === 0) {
                setGameSearchData([]);
              }
            }}
          />
        </div>
        {searchValue.length >= 3 && (
          <div
            ref={listInnerRef}
            className="absolute flex flex-col gap-2 rounded-[16px] overscroll-contain  bg-[#1A1C1F] w-[350px] overflow-y-scroll h-[324px] top-[63px] px-[10px] py-[15px]"
          >
            {gameSearchData.length > 0 ? (
              <>
                {gameSearchData?.map((el, idx) => (
                  <div
                    key={idx}
                    className="flex flex-row  items-center cursor-pointer px-[10px] py-[8px] hover:bg-[#2B2E30] rounded-[10px]"
                    onClick={() =>
                      navigate(constants.PATH.NAVIGATEGAMEDETAIL, {
                        state: { gameId: el._id },
                      })
                    }
                  >
                    <div className="flex flex-row gap-[20px] items-center">
                      <img
                        src={el.gameBanner}
                        className="w-10 h-10 rounded-full"
                      />
                      <p className="ml-2 text-[#FAFBFC]">{el.gameName}</p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p className="ml-2 text-[#FAFBFC] h-full w-full flex items-center justify-center">
                No data available
              </p>
            )}
          </div>
        )}
      </GameContainerHead>
      <TopGameContainer heading="Top Search Games">
        <div className="w-full flex flex-row gap-2 items-center justify-between overflow-x-scroll">
          {gameData?.map((el, idx) => (
            <GameDiv
              key={idx}
              mainClassName="flex flex-col gap-[12px] cursor-pointer"
              onClick={() =>
                navigate(constants.PATH.NAVIGATEGAMEDETAIL, {
                  state: { gameId: el._id },
                })
              }
              isGameLoading={isGameLoading}
              gameBanner={el.gameBanner}
              gameName={el.gameName}
            />
          ))}
        </div>
      </TopGameContainer>
      {/* <TopGameContainer heading="Top Search Players">
        <div className="flex flex-row w-full items-center justify-between overflow-x-scroll">
          {gameData?.map((el, idx) => (
            <PlayerDiv
              key={idx}
              mainClassName="flex flex-col items-center justify-center gap-[12px] space-x-4 cursor-pointer"
              onClick={() => {}}
              isPlayerLoading=""
              playerAvatar=""
              playerName=""
            />
          ))}
        </div>
      </TopGameContainer>
      <TopGameContainer heading="Top Search Teams">
        <div className="flex flex-row items-center justify-between w-full overflow-x-scroll">
          {gameData?.map((el, idx) => (
            <TeamDiv
              key={idx}
              mainClassName="flex flex-col items-center justify-center gap-[12px] space-x-4 cursor-pointer"
              onClick={() => {}}
              isTeamLoading=""
              teamLogo=""
              teamName=""
            />
          ))}
        </div>
      </TopGameContainer> */}
    </div>
  );
};

export default GameStore;
