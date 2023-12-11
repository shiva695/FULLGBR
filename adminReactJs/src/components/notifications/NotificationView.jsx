import { useState, useRef } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import constants from "../../json/constants.json";
import BreadCrumbs from "../general/BreadCrumbs";
import { apiList, invokeApi } from "../../utils/apiServiceUtils";
import { config } from "../../utils/configUtils";
import FeedbackViewPopup from "../modals/FeedbackViewPopup";

const NotificationEdit = () => {
  const [cookies] = useCookies();
  const location = useLocation(); // find location path
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [invokeData, setInvokeData] = useState(true);
  const [templateDetail, setTemplateDetail] = useState(null);
  const [notificationViewPopup, setNotificationViewPopup] = useState(false);

  const editorConfig = {
    readonly: false,
    // toolbar: true,
    spellcheck: true,
    language: "en",
    // toolbarButtonSize: "medium",
    // toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    //defaultActionOnPaste: "insert_clear_html",
    // buttons: buttons,
    uploader: {
      insertImageAsBase64URI: true,
    },
    width: 550,
    height: 400,
  };

  const onClosedNotification = () => {
    setNotificationViewPopup(false);
  };

  // get template data
  useEffect(() => {
    const getTemplatesList = async () => {
      let params = {
        _id: location.state._id,
      };
      let response = await invokeApi(
        config.baseUrl + apiList.getTemplateDetail,
        params,
        cookies
      );

      if (response.customcode === 200) {
        setTemplateDetail(response.data);
      } else {
        console.error("Something went wrong");
      }
    };
    if (invokeData) {
      setInvokeData(false);
      getTemplatesList();
    }
  }, [cookies, invokeData, location.state._id]);

  console.log("templateDetail: ", templateDetail);

  return (
    <>
      <div className="card-without-subheading">
        <div className="flex flex-col w-full card space-y-5 h-[600px] overflow-y-auto">
          {/* Breadcrumbs */}
          <div className="flex flex-row justify-between items-center  border-b border-gray-300  pb-5 mb-5">
            <BreadCrumbs
              nav1={constants.NOTIFICATIONTEMPLATE}
              nav2={"View"}
              link={constants.NOTIFICATIONTEMPLATENAVIGATE}
            />
          </div>

          {/* select user */}
          <div className="w-[50%] mx-auto flex flex-row justify-center space-x-10 items-center p-5 border-[1px] border-black rounded-2xl">
            {(templateDetail?.notificationType === "PUSH" ||
              templateDetail?.notificationType === "ALL") && (
              <div className="flex flex-col justify-center items-center space-y-5">
                {/* Drag and Drop */}
                <div>
                  <img
                    style={{
                      width: "180px",
                      height: "170px",
                      borderRadius: "15px",
                      objectFit: "cover",
                    }}
                    src={templateDetail?.image}
                    alt="cropped_img"
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col items-start justify-center space-y-4">
              <div className="flex flex-row space-x-5">
                <label className="font-bold">{constants.TEMPLATENAME}:</label>
                <h5>{templateDetail?.name}</h5>
              </div>

              <div className="flex flex-row space-x-5">
                <label className="font-bold">{constants.SUBJECT}:</label>
                {/* <input
                  readOnly={true}
                  value={templateDetail?.title}
                  className="border-black border-[1px] w-[350px] py-3 px-3 rounded-xl dark:text-white dark:border-white bg-transparent outline-none"
                /> */}
                <h5>{templateDetail?.title}</h5>
              </div>
              <div className="flex flex-row space-x-5">
                <label className="font-bold">
                  {constants.NOTIFICATIONTYPE}:
                </label>
                {/* <input
                  readOnly={true}
                  value={templateDetail?.notificationType}
                  className="border-black border-[1px] w-[350px] py-3 px-3 rounded-xl dark:text-white dark:border-white bg-transparent outline-none"
                /> */}
                <h5>{templateDetail?.notificationType}</h5>
              </div>
              <div className="flex flex-row space-x-1 w-[350px]">
                <label className="font-bold">{constants.COMMENT}:</label>
                <h5 className="truncate  text-ellipsis w-[400px]">
                  {templateDetail?.comments}
                </h5>
                <p
                  className="font-semibold w-full cursor-pointer"
                  onClick={() => setNotificationViewPopup(true)}
                >
                  See More
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeedbackViewPopup
        open={notificationViewPopup}
        close={onClosedNotification}
        text={
          templateDetail?.notificationType === "EMAIL"
            ? JSON.parse(templateDetail?.comments)
            : templateDetail?.comments
        }
        notificationType={templateDetail?.notificationType}
        heading={constants.FEEDBACKCOMMENTS}
      />
    </>
  );
};

export default NotificationEdit;
