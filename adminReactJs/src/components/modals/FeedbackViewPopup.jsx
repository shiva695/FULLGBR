import ActionButton from "../general/ActionButton";
import constants from "../../json/constants.json";

// eslint-disable-next-line react/prop-types
const FeedbackViewPopup = ({
  open,
  close,
  text,
  heading,
  feedbackStatus,
  resolveHandler,
  notificationType,
}) => {
  if (!open) {
    return null;
  }
  return (
    <div className="fixed pop-card-shadow   inset-0 bg-opacity-20 bg-slate-700 backdrop-blur-lg flex justify-center items-center">
      <div className="flex flex-col h-[50%] space-y-5 w-full  max-w-xl bg-white dark:bg-[#121212]  border-[1px] border-black dark:border-white  rounded-2xl  p-6  text-white">
        <div className="flex flex-row w-full  items-center border-black pb-2 border-b-[1px]">
          <div className="cursor-pointer" onClick={close}>
            <img src="/assets/svg/close.svg" className="h-[48px] w-[48px]" />
          </div>
          <h3 className="text-[#121212] w-full text-center text-2xl dark:text-white dark:border-white  font-semibold">
            {heading}
          </h3>
          {feedbackStatus === constants.PROGRESS && (
            <div
              className="w-[100px] flex justify-end"
              onClick={() => resolveHandler(true)}
            >
              <ActionButton text={"Resolved"} color={constants.GREEN} />
            </div>
          )}
        </div>
        {notificationType !== "EMAIL" ? (
          <p className="text-[#121212]  overflow-y-auto  dark:text-white text-center text-lg">
            {text}
          </p>
        ) : (
          <div
            className="text-black"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}
      </div>
    </div>
  );
};

export default FeedbackViewPopup;
