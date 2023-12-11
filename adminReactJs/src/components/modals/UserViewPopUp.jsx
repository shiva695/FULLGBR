//import dependencies
import { useState, useEffect } from "react";
//import files
import constants from "../../json/constants.json";
function UserViewPopup({ open, close, heading, type, dataArray }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(dataArray);
  }, [dataArray]);
  if (!open) {
    return null;
  }
  console.log(dataArray);
  return (
    <div className="fixed pop-card-shadow inset-0 bg-opacity-20 bg-slate-700 backdrop-blur-lg flex justify-center items-center" onClick={() => close()}>
      <div className="flex flex-col h-[80%] space-y-5 w-[80%] px-10 items-center bg-white dark:bg-[#121212]  border-[1px] border-gray-400 dark:border-white  rounded-2xl p-3 text-white">
        <div className="flex flex-row w-full  items-center border-gray-400 pb-2 border-b-[1px]">
          <div className="cursor-pointer" onClick={() => close()}>
            <img src="/assets/svg/close.svg" className="h-[48px] w-[48px]" />
          </div>
          <h3 className="text-[#121212] w-full text-center text-2xl dark:text-white dark:border-white font-semibold">
            {heading}
          </h3>
        </div>
        {heading === `${constants.LINKEDGAMES}` ? (
          <div className={`flex flex-wrap  overflow-y-auto gap-5`}>
            {data.map((data, index) => {
              console.log(data);
              return (
                <div
                  key={index}
                  className="flex flex-col w-1/5 border rounded-xl border-gray-400 text-black dark:border-white dark:text-white gap-5 items-center p-5"
                >
                  <div className="">
                    <img className="w-[30%] mx-auto" src={data.gameImage} />
                  </div>
                  <div className="flex flex-col items-start">
                    <div>{`${constants.TITLE} : ${data.title}`}</div>
                    <div>{`${constants.GENRE} : ${data.genre}`}</div>
                    <div>{`${constants.DEVELOPER} : ${data.developer}`}</div>
                    <div>{`${constants.YEAR} : ${data.year}`}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : heading === `${constants.DEVICEINFORMATION}` ? (
          <div className="flex flex-col">
            {data.map((data, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col gap-2 border border-gray-400 text-black dark:border-white dark:text-white rounded-xl p-6"
                >
                  <div>{`${constants.DEVICEID} : ${data.deviceId}`}</div>
                  <div>{`${constants.DEVICETYPE} : ${data.deviceType}`}</div>
                  <div>{`${constants.IPADDRESS} : ${data.ip}`}</div>
                  <div>{`${constants.PLATFORM} : ${data.platform}`}</div>
                  <div>{`${constants.USERAGENT} : ${data.userAgent}`}</div>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default UserViewPopup;
