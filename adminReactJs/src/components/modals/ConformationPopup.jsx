// eslint-disable-next-line react/prop-types
const ConformationPopup = ({ open, close, text, heading, submitHandler }) => {
  if (!open) {
    return null;
  }
  return (
    <div className="fixed z-20 pop-card-shadow  inset-0 bg-opacity-20 bg-slate-700 backdrop-blur-lg flex justify-center items-center">
      <div className="flex flex-col space-y-5 w-full  max-w-sm bg-white dark:bg-[#121212]  border-[1px] border-black dark:border-white  rounded-2xl  p-6  text-white">
        <h3 className="text-[#121212] text-center text-2xl dark:text-white dark:border-white border-black pb-2 border-b-[1px] font-semibold">
          {heading}
        </h3>
        <p className="text-[#121212] dark:text-white text-center text-lg">
          {text}
        </p>
        <div className="flex flex-row items-center justify-center space-x-5">
          <div
            className="cursor-pointer"
            onClick={() => {
              submitHandler(false);
              close();
            }}
          >
            <img src="/assets/svg/close.svg" className="h-[48px] w-[48px]" />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              submitHandler(true);
              close();
            }}
          >
            <img src="/assets/svg/done.svg" className="h-[40px] w-[40px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConformationPopup;
