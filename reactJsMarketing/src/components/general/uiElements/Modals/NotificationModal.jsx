import React, { useState, useEffect } from "react";
import { apiList, invokeApi } from "../../../../services/apiServices";
import { config } from "../../../../config/config";
import { useCookies } from "react-cookie";

const NotificationModal = ({ open, close }) => {
  const [cookies] = useCookies();
  const [invokeGetNotification, setInvokeGetNotification] = useState(true);
  const [notificationData, setNotificationData] = useState(null);
  // console.log("notificationData: ", notificationData);

  useEffect(() => {
    const getNotifications = async () => {
      let params = {
        skip: 0,
        limit: 10,
        filter: "ENABLE",
      };
      let response = await invokeApi(
        config.apiDomains + apiList.getNotifications,
        params,
        cookies
      );
      if (response.customcode === 200) {
        setNotificationData(response.data);
      } else {
        alert("Something went wrong");
      }
    };
    if (invokeGetNotification) {
      setInvokeGetNotification(false);
      getNotifications();
    }
  }, [invokeGetNotification]);
  return (
    <>
      {open && (
        <div
          onClick={() => close()}
          className="fixed z-10 inset-0 cursor-pointer bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="absolute top-[74px] right-[95px] 4xl:right-[285px] modal-notch"></div>
          <div className="absolute top-[104px] right-[70px] 4xl:right-[260px] w-[350px] 4xl:w-[400px] bg-[#242424] rounded-lg shadow-lg p-4  font-semibold text-white">
            <div className="flex flex-col space-y-2">
              <h5 className="text-3xl">Notification</h5>
              <p className="text-[#9d9e9e]">Latest Battlefronts Explored</p>
            </div>

            <div className="bg-[#1C1C1C] rounded-lg mt-4 mx-2 shadow-[inset_0_7px_9px_-2px_rgba(0,0,0,5)]">
              <div className="flex flex-col space-y-4 h-auto">
                <div className="m-3 flex flex-col space-y-6 h-[300px] w-full overflow-y-auto">
                  {notificationData?.length > 0 ? (
                    <>
                      {notificationData?.map((el, idx) => (
                        <div
                          key={idx}
                          className="flex flex-row items-center space-x-3"
                        >
                          <img
                            src="/assets/png/game-banner-1.png"
                            className="h-[70px] w-[100px] rounded"
                            alt=""
                          />
                          <div>
                            <p>New Game Update!</p>
                            <p className="text-[#9d9e9e]">
                              Latest Battlefronts Explored
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="h-full w-full flex justify-center items-center">
                      No Notification avialable
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationModal;
