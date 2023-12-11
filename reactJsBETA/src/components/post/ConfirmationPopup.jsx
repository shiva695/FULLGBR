export default function ConfirmationPopup() {
  return (
    <div className="relative w-[1440px] h-[100vh] top-0 overflow-y-hidden ">
      <div className=" absolute rounded-2xl  bg-opacity-90 drop-shadow-lg backdrop-blur-lg bg-[#2B2E30]  w-[366px] h-[202px] top-[299px] left-[537px] ">
        <img
          src="/assets/png/Noise.png"
          className="relative rounded-2xl w-[366px] h-[202px]"
        />
        <div className="absolute text-white flex flex-col text-center  text-lg w-[196px] h-[102px] top-[10px] left-[80px] justify-center items-center">
          <p className="font-bold">Are you sure you want to discord post ?</p>
          <p className="text-xs mt-4">You haven’t finished your post yet.</p>
        </div>
        <div className="absolute flex flex-row top-28 left-4 space-x-4 w-full p-6 text-white">
          <button className="bg-[#2B2E30] rounded-full py-2 px-6">
            Save As Draft
          </button>
          <button className="bg-[#FF523B] rounded-full py-2 px-6">
            Discord
          </button>
        </div>
      </div>
    </div>
  );
}
