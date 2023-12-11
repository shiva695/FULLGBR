import { useState, useEffect } from "react";
import GradientHeader from "../GradientHeader";
import { apiList, invokeApi } from "../../../../services/apiServices";
import { config } from "../../../../config/config";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FaSearch } from "react-icons/fa";

const AddGameListModal = ({ open, close }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [invokeGameDetails, setInvokeGameDetails] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [scaleInput, setScaleInput] = useState(false);

  // filter Search handler
  const filterSearchHandler = (ev) => {
    let search = ev.target.value;
    setSearchValue(ev.target.value);
    setInvokeGameDetails(true);
    let newFilter = filteredData?.filter((val) => {
      if (search.length === 1) {
        return val.gameName[0].toLowerCase().includes(search.toLowerCase());
      } else {
        return val.gameName.toLowerCase().includes(search.toLowerCase());
      }
    });
    if (search === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  // Check access token is not there navigate to home page
  useEffect(() => {
    if (!!cookies[config.cookieName] && cookies[config.cookieName].userData) {
      setInvokeGameDetails(false);
      return;
    } else {
      navigate("/");
    }
  }, [navigate, cookies]);

  // Single game clicked
  const gameDetailClicked = async (id) => {
    let params = {
      _id: id,
    };
    let response = await invokeApi(
      config.apiDomains + apiList.getGameDetail,
      params,
      cookies
    );
    if (response.customcode === 200) {
      setSearchValue("");
      setScaleInput(false);
      setFilteredData([]);
      navigate("/game-detail", { state: response.data });
      close();
    } else {
      alert("Something went wrong");
    }
  };

  // get game list
  useEffect(() => {
    const getGameList = async () => {
      let params = {
        skip: 0,
        limit: 5,
        search: searchValue,
        filter: "ENABLE",
      };
      let response = await invokeApi(
        config.apiDomains + apiList.getGamesList,
        params,
        cookies
      );
      if (response.customcode === 200) {
        setFilteredData(response.data);
      } else {
        alert("Something went wrong");
      }
    };
    if (invokeGameDetails && searchValue?.length > 0) {
      setInvokeGameDetails(false);
      getGameList();
    }
  }, [invokeGameDetails, searchValue]);

  return (
    <>
      {open && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-90 backdrop-blur-sm flex justify-center items-center">
          <div className="relative w-full h-full bg-[#242424] rounded-lg shadow-lg p-10 text-base font-semibold text-white">
            <button
              type="button"
              className="absolute right-3 top-3 flex items-end w-8 h-8"
              onClick={() => {
                navigate("/home");
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
            {/* <div className="mb-4 w-full text-center">
              <GradientHeader text="Search your favourite game here..." />
            </div> */}
            <div
              className={`flex flex-row items-center justify-between border-[1px] rounded-full mt-5 ${
                scaleInput
                  ? "w-full transition-all duration-300 ease-out"
                  : "w-[300px]"
              }  border-gray-700 mx-auto`}
            >
              <input
                type="text"
                className="focus:outline-none bg-transparent w-full px-5 py-2 "
                placeholder="Search Game"
                onChange={filterSearchHandler}
                value={searchValue}
                onFocus={() => setScaleInput(true)}
              />
              <div className="mr-7">
                <FaSearch />
              </div>
            </div>
            <div className="w-full mt-5 z-10 bg-[#121212] flex flex-col cursor-pointer h-full overflow-y-scroll">
              {filteredData?.slice(0, 15).map((el, idx) => (
                <div
                  key={idx}
                  className="flex flex-row gap-5 items-center m-5"
                  onClick={() => {
                    gameDetailClicked(el._id);
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
          </div>
        </div>
      )}
    </>
  );
};

export default AddGameListModal;
