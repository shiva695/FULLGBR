import React from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const LoginMenuModal = ({ open, close }) => {
  const navigate = useNavigate();
  if (!open) {
    return null;
  }
  return (
    <div
      onClick={() => {
        let body = document.getElementsByTagName("body")[0];
        body.classList.remove("lock-scroll");
        close();
      }}
      className="fixed z-10 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="z-10 fixed  top-[84px] right-4 w-full max-w-xs bg-[#242424] rounded-lg shadow-lg p-6 text-base font-semibold text-white">
        <button
          type="button"
          className="absolute top-5 right-5 w-8 h-8 items-center justify-center"
          onClick={() => {
            let body = document.getElementsByTagName("body")[0];
            body.classList.remove("lock-scroll");
            close();
          }}
        >
          <img
            src="/assets/svg/close.svg"
            height="26px"
            width="26px"
            style={{ cursor: "pointer" }}
          />
        </button>

        <ul className="space-y-6">
          <li onClick={() => navigate("/")}>
            <p className="cursor-pointer">Home</p>
          </li>
          <li onClick={() => navigate("/aboutus")}>
            <p className="cursor-pointer">About Us</p>
          </li>
          <li onClick={() => navigate("/blog")}>
            <p className="cursor-pointer">Blogs</p>
          </li>
          <li onClick={() => navigate("/guidelines")}>
            <p className="cursor-pointer">Guidelines</p>
          </li>
          {/* <div
            onClick={() => {
              let body = document.getElementsByTagName("body")[0];
              body.classList.add("lock-scroll");
              close();
              // setIsLoginModalOpen(true);
            }}
          >
            <Button text="Login" />
          </div> */}
        </ul>
      </div>
    </div>
  );
};

export default LoginMenuModal;
