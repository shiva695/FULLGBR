// import React from "react";

// eslint-disable-next-line react/prop-types
const Button = ({ text }) => {
  return (
    <div className="p-0.5 w-full cursor-pointer rounded-full bg-gradient-to-b from-[#223EAC] to-[#DD3131]">
      <p className="bg-neutral-900 text-white h-[35px] py-1 px-1 text-center rounded-full hover:bg-gradient-to-b from-[#223EAC] to-[#DD3131]">
        {text}
      </p>
    </div>
  );
};

export default Button;
