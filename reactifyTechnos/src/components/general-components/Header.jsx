import React from "react";

const Header = () => {
  return (
    <div className="gradient-border z-10 border-b-[2px] fixed top-0 left-0 flex flex-row items-center justify-between w-full h-[80px] bg-[#141517CC] py-3 px-10">
      <div className="flex flex-row items-center gap-[18px]">
        <img src="/assets/react-logo.png" className="h-[55px] w-[55px]" />
        <h5 className="text-3xl font-medium text-gray-400 italic">
          Reactify Technos
        </h5>
      </div>
    </div>
  );
};

export default Header;
