/* eslint-disable react/prop-types */
function ActionButton({ text, color }) {
  return (
    <div
      className={`w-full mx-auto ${
        color === "RED"
          ? "bg-red-300 border-[1px] border-red-700"
          : color === "GREEN"
          ? "bg-green-300 border-[1px] border-green-700"
          : color === "BLUE"
          ? "bg-blue-300 border-[1px] border-blue-700"
          : "white"
      } cursor-pointer rounded-md py-2 px-1`}
    >
      <span className=" text-[#121212] px-2 font-semibold">{text}</span>
    </div>
  );
}

export default ActionButton;
