import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import GradientHeader from "../general/uiElements/GradientHeader";
import { useNavigate } from "react-router-dom";

const OnboardSuccessPage = () => {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const [loader, setLoader] = useState(0);

  const settings = {
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 1500,
    beforeChange: (current, next) => setSlideIndex(next),
    centerMode: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setLoader(loader + 10);
    }, 1000);

    if (loader >= 100) {
      clearInterval(timer);
      navigate("/home");
      return;
    }
    return () => clearInterval(timer);
  }, [loader]);

  return (
    <div className="flex flex-col items-center text-white pt-10 justify-center space-y-6 2xl:my-auto 4xl:mt-24">
      <GradientHeader text="Gamersback: Uniting Heroes for an Epic Gaming Odyssey!S" />
      <h3 className="font-semibold">
        Prepare for an epic gaming voyage, rallying your comrades and venturing
        forth into realms unknown, as the call to adventure beckons
      </h3>
      {/* Slick */}
      <div className="w-[100%] flex flex-row">
        <div className="slider-onboard">
          <Slider {...settings}>
            <div
              className={
                0 === slideIndex
                  ? "slide-onboard slide-active"
                  : "slide-onboard"
              }
              // key={index}
            >
              <img src="/assets/png/game-banner-1.png" alt="img-carousel" />
            </div>
            <div
              className={
                1 === slideIndex
                  ? "slide-onboard slide-active"
                  : "slide-onboard"
              }
              // key={index}
            >
              <img src="/assets/png/game-banner-2.png" alt="img-carousel" />
            </div>
            <div
              className={
                2 === slideIndex
                  ? "slide-onboard slide-active"
                  : "slide-onboard"
              }
              // key={index}
            >
              <img src="/assets/png/game-banner-3.png" alt="img-carousel" />
            </div>
            <div
              className={
                3 === slideIndex
                  ? "slide-onboard slide-active"
                  : "slide-onboard"
              }
              // key={index}
            >
              <img src="/assets/png/game-banner-4.png" alt="img-carousel" />
            </div>
          </Slider>
        </div>
      </div>

      <h5 className="font-semibold">
        Prepare for an epic gaming voyage, rallying your comrades and venturing
        forth into realms unknown, as the call to adventure beckons!
      </h5>
      {/* Progress bar */}
      <div className="p-[2px] w-[404px] rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-400">
        <div
          className={`bg-[#121212]
                 h-[25px] rounded-full p-[2px]`}
        >
          <div
            className={`w-[${loader}%] flex items-center h-[20px] bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-400 rounded-full`}
          ></div>
        </div>
      </div>

      <p className="text-white font-sm">Loading... {loader + "%"}</p>
    </div>
  );
};

export default OnboardSuccessPage;
