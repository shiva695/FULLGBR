/* eslint-disable react/no-unescaped-entities */
import GradientHeader from "../general/uiElements/GradientHeader";
import Accordion from "../general/uiElements/FAQ/Accordion";
import { faq_data } from "../../json/data.json";
import { useState, useEffect } from "react";
import EmployeeAvatar from "./EmployeeAvatar";
import Leaders from "./Leaders";
import { Link, useLocation } from "react-router-dom";
import Button from "../general/uiElements/Button";

function AboutUs() {
  const [leaderInfoModal, setLeaderInfoModal] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }

    setOpen(index);
  };

  const toggleModal = () => {
    setLeaderInfoModal(!leaderInfoModal);
  };

  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        elem.scrollIntoView({
          top: 0,
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="mt-20 lg:mt-40">
      <div className="m-54 xs:px-5 md:px-5 lg:px-36">
        <center>
          {/* Creating a world.. Section */}
          <section className="mb-20">
            <div className="w-8/12 h-full">
              <GradientHeader
                text={" Creating a world where gamers love to be."}
              />
            </div>
            <p className="text-white m-10">
              In the mystical realms of college dorms, our epic journey
              commenced in 2017. Our quest led us to the hallowed halls of the
              renowned NSRCEL IIM Bangalore pre-incubation program in 2019.
              Along this wild adventure, we battled countless challenges and
              celebrated glorious triumphs. With the power of our boundless
              imagination, we aspire to unveil a gaming revolution that will
              leave the world in awe.
            </p>
            <img className="w-9/12" src="assets/png/Team.png" />
            <p className="text-white m-10 mb-0">
              As a team at Gamersback, we are diverse: we have hidden talents
              such as being foodies, psychologists, musicians, and more. What
              brings us together is our desire to empower people and allow them
              to pursue their passion in gaming.
            </p>
            <span className="text-3xl font-bold  text-transparent bg-clip-text bg-gradient-to-r from-red-500 from-10% to-[#223EAC] to-60%">
              Join Us{" "}
            </span>{" "}
            <span className="text-white">
              on this whimsical quest to reshape the gaming universe!
            </span>
          </section>
          {/* Creating a world.. Section */}

          {/* Our Priniples Section */}
          <section className="flex xs:flex-col-reverse md:justify-center space-x-10 lg:flex-row text-white mb-20">
            {/* left div */}
            <div className="flex flex-col lg:w-1/2 2xl:ms-16">
              <div className=" w-1/2 mb-5 text-left">
                <GradientHeader size={"header2"} text={"Our Principles"} />
                {/* <span className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-500 from-30% to-blue-700 to-98%">
                  Our Principles
                </span> */}
              </div>
              <div className="mb-5 text-left">
                They embody the core of our gaming culture and inspire our
                approach to crafting technology that enriches the player's
                journey and forges lasting connections in virtual worlds.
              </div>
              <div>
                <div className="max-w-[800px]">
                  {/* FAQ  */}
                  {faq_data.map((data, index) => {
                    return (
                      <Accordion
                        key={index}
                        open={index === open}
                        title={data.faq}
                        desc={data.detail}
                        toggle={() => toggle(index)}
                      />
                    );
                  })}
                  {/* FAQ  */}
                </div>
              </div>
            </div>
            {/* right div */}
            <div className="sm:justify-center md:h-[800px] sm:ml-5 lg:w-1/2 flex xs:mb-5 xs:justify-center lg:mb-0">
              <div className="pt-10">
                <img src="assets/png/Gamer.png" className="md:h-[800px]" />
              </div>
            </div>
          </section>
          {/* Our Priniples Section */}

          {/* Leaders Section */}
          <Leaders />
          {/* Leaders Section */}

          {/* Our Family Section */}
          <section className="mb-20">
            <GradientHeader text={"Our Family"} />
            <p className="text-white m-5 w-6/12">
              Their deeds carry immense weight, leaving a lasting impression for
              the gaming world.
            </p>
            {/* Employee Avatars */}
            <EmployeeAvatar />
            {/* Employee Avatars */}
          </section>
          {/* Our Family Section */}

          <section className="mb-20">
            <div className="md:w-[400px]">
              <GradientHeader text={"Our Backers"} />
            </div>
            <p className="text-white m-5 w-6/12">
              Honoring the Incredible Backers Who Fuel Our Dreams
            </p>
            <div className="flex flex-col space-y-5 m-5 md:space-y-0 md:flex-row gap-5 items-center justify-center">
              <img src="/assets/png/ia-img.png" />
              <img
                src="/assets/png/nsrcel-img.png"
                // height={400}
                // width={400}
                className="w-full md:w-[400px]"
              />
            </div>
          </section>

          {/* Gamers Chronicles Section */}
          <section className="mb-20">
            <div className="text-start mb-10">
              <GradientHeader
                text={
                  "Gamers' Chronicles: Unveiling the Blogs of Gaming Enthusiasts"
                }
              />
            </div>
            <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row space-x-4">
              <div className="w-full md:w-1/3 mx-2">
                <div className="relative game-card gradient-card-border">
                  <div className="">
                    <img
                      src="/assets/png/game1.png"
                      alt="Background Image"
                      className="h-fit w-fit"
                    />
                  </div>
                  <div className="absolute bottom-0 flex flex-col space-y-4 text-start m-3">
                    <h1 className="text-xl text-white font-semibold">
                      BGMI now playable to all users: All the details
                    </h1>
                    <span className="border-[2px] mt-3 border-white"></span>
                    <div className="w-[100px]">
                      <Button text="BGMI" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 mx-2">
                <div className="relative game-card gradient-card-border">
                  <div className="">
                    <img
                      src="/assets/png/game2.png"
                      alt="Background Image"
                      className="h-fit w-fit"
                    />
                  </div>
                  <div className="absolute bottom-0 flex flex-col space-y-4 text-start m-3">
                    <h1 className="text-xl text-white font-semibold">
                      DOTA2: The New Frontiers Update is Here
                    </h1>
                    <span className="border-[2px] mt-3 border-white"></span>
                    <div className="w-[100px]">
                      <Button text="BGMI" />
                    </div>
                  </div>
                </div>
              </div>
              {/* KNOW MORE BUTTON */}
              <div className="w-full md:w-1/3 mx-2">
                <div className="relative game-card gradient-card-border">
                  <div className="">
                    <img
                      src="/assets/png/game3.png"
                      alt="Background Image"
                      className="h-fit w-fit"
                    />
                  </div>
                  <div className="absolute bottom-0 flex flex-col space-y-4 text-start m-3">
                    <h1 className="text-xl text-white font-semibold">
                      Valorant: Server downtime today (May 30)
                    </h1>
                    <span className="border-[2px] mt-3 border-white"></span>
                    <div className="w-[100px]">
                      <Button text="BGMI" />
                    </div>
                  </div>
                </div>
              </div>
              {/* KNOW MORE BUTTON */}
            </div>
          </section>
          {/* Gamers Chronicles Section  */}
        </center>
      </div>
    </div>
  );
}

export default AboutUs;
