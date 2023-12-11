import React, { useState } from "react";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { carousel_data, constants } from "../../../json/data.json";

function Carousel() {
  const [slideIndex, setSlideIndex] = useState(0);

  return (
    // <div className="mt-40  overflow-auto whitespace-nowrap">
    //   <div className="flex flex-row justify-center gap-5">
    //     <div className="my-auto">
    //       <IoIosArrowDropleft
    //         className="text-white cursor-pointer"
    //         size="25px"
    //         onClick={() => {
    //           setSlideIndex(slideIndex - 1);
    //         }}
    //       />
    //     </div>

    //     {console.log(carousel_data[slideIndex])}

    //     <div className="flex flex-row gap-4 w-6/12">
    //       {carousel_data[slideIndex].map((data, index) => {
    //         return (
    //           <div className="cursor-pointer  border-2 border-gray-400 rounded-xl hover:scale-105 hover:border-[#DD3131]">
    //             <img src={data.img} />
    //           </div>
    //         );
    //       })}
    //       \
    //     </div>

    //     <div className="my-auto">
    //       <IoIosArrowDropright
    //         className="text-white cursor-pointer"
    //         size="25px"
    //         onClick={() => {
    //           setSlideIndex(slideIndex + 1);
    //         }}
    //       />
    //     </div>
    //   </div>

    // </div>
    <div className="flex mt-40 overflow-x-auto">
      <div className="cursor-pointer min-w-[110px] border-2 border-gray-400 rounded-xl hover:scale-105 hover:border-[#DD3131]">
        <img src="/assets/png/game1.png" />
      </div>
      <div className="cursor-pointer min-w-[110px] border-2 border-gray-400 rounded-xl hover:scale-105 hover:border-[#DD3131]">
        <img src="/assets/png/game1.png" />
      </div>
      <div className="cursor-pointer min-w-[110px] border-2 border-gray-400 rounded-xl hover:scale-105 hover:border-[#DD3131]">
        <img src="/assets/png/game1.png" />
      </div>
      <div className="cursor-pointer min-w-[110px] border-2 border-gray-400 rounded-xl hover:scale-105 hover:border-[#DD3131]">
        <img src="/assets/png/game1.png" />
      </div>
      <div className="cursor-pointer min-w-[110px] border-2 border-gray-400 rounded-xl hover:scale-105 hover:border-[#DD3131]">
        <img src="/assets/png/game1.png" />
      </div>
      <div className="cursor-pointer min-w-[110px] border-2 border-gray-400 rounded-xl hover:scale-105 hover:border-[#DD3131]">
        <img src="/assets/png/game1.png" />
      </div>
    </div>
  );
}

export default Carousel;
