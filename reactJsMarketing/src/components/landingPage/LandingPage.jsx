import { useState, useEffect } from "react";
import GradientHeader from "../general/uiElements/GradientHeader";
import { landing_page_features_data } from "../../json/data.json";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../general/uiElements/Button";
import { useCookies } from "react-cookie";
import { config } from "../../config/config";
import { v4 as uuidv4 } from "uuid";
import { detectDeviceType, getOS } from "../common/common";

function LandingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();

  const [toggle, setToggle] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [initialCookie, setInitialCookie] = useState(true);
  const [deviceUniqueId, setDeviceUniqueId] = useState("");

  // Check if accesstoken is there or not
  useEffect(() => {
    if (
      !!cookies[config.cookieName] &&
      cookies[config.cookieName]?.userData?.deviceInfo[0]?.accessToken
    ) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [cookies]);

  // Scroll to top function
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

  // Setting unique device Id
  useEffect(() => {
    let storedDeviceId = localStorage.getItem("deviceId");
    if (!storedDeviceId) {
      storedDeviceId = uuidv4();
      localStorage.setItem("deviceId", storedDeviceId);
    }
    setDeviceUniqueId(storedDeviceId);
  }, []);

  // find ip address
  useEffect(() => {
    const findIP = async () => {
      let host = window.location.host.slice(0, -5);
      let getOs = getOS();
      let deviceType = detectDeviceType();
      setCookie(
        config.deviceCookie,
        JSON.stringify({
          deviceId: deviceUniqueId,
          ipAddress: host,
          platform: getOs,
          deviceType: deviceType,
        }),
        { path: "/", maxAge: 3000000, sameSite: "strict" }
      );
    };
    if (initialCookie && deviceUniqueId !== "") {
      setInitialCookie(false);
      findIP();
    }
  }, [initialCookie, deviceUniqueId]);

  return (
    <div className="text-white xs:mx-5 lg:mx-20">
      {/* Gaming realm section start */}
      <section className="mt-28 xs:mb-28 lg:mb-40">
        <div className="xs:flex-col xs:gap-5 xs:text-center flex lg:flex-row lg:text-start">
          <div className="xs:w-full lg:w-2/3 flex flex-col justify-center lg:px-10">
            <div className="xs:text-3xl lg:text-5xl">
              Forging a{" "}
              <span className="xs:text-3xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#DD3131] to-[#223EAC]">
                Game realm
              </span>{" "}
              for
              <br />
              Warriors in{" "}
              <span className="xs:text-3xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F17A04] to-[#C716DB]">
                Making
              </span>
            </div>
            <div className="text-2xl mt-6 mb-3">
              Unlock a world of Gaming Connections
            </div>
            <div className="text-[#878c92]">
              Unlock Boundless Gaming Excitement at Gamersback. Play, Record,
              and Conquer. Build Your Gaming Legacy and Discover Epic
              Adventures.
            </div>
            <div className="flex flex-row gap-4 mt-10">
              <div className="flex items-center justify-center bg-[#D9832C] rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl w-52 h-14 btn-shadow">
                <div>
                  <img src="assets/png/watchIcon.png" />
                </div>
                <div className="text-white text-xl">&nbsp; Watch</div>
              </div>
              <div className="flex items-center justify-center bg-[#55A54E] rounded-bl-3xl rounded-tr-3xl rounded-br-3xl w-52 h-14 btn-shadow">
                <div>
                  <img src="assets/png/loginIcon.png" />
                </div>
                <div className="text-white text-xl">&nbsp; Login</div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 xs:p-5 lg:p-5 pe-0 justify-center">
            <img src="/assets/png/landingBanner1.png" />
          </div>
        </div>
      </section>

      {/* Beta version sneak peek start */}
      <section className="xs:mb-28 lg:mb-40">
        <div className="flex flex-col xs:gap-4">
          <div>
            <p className="text-white text-center">
              QUANTUMPLAY: REDEFINING GAMING FEATURES FOR THE FUTURE!
            </p>
          </div>
          <div className="text-center">
            <GradientHeader text={"Exclusive Sneak Peek: Pre-Beta Delights!"} />
          </div>
          <div>
            <p className="text-[#ffffff] xs:mx-5 lg:mx-96 text-center mb-10 text-md">
              Embark on an Extraordinary Gaming Journey with Exclusive Access to
              Pre-Beta Features!"
            </p>
          </div>

          <div className="xs:flex lg:flex-row xs:flex-col justify-center">
            <div className="flex flex-col lg:w-1/4 lg:gap-32">
              {/* Social media image start */}
              <div className="relative">
                <div className="ml-10">
                  <img src="/assets/png/playGames.png" />
                </div>
                <div className="absolute bottom-7 w-1/2 left-3 p-0.5 cursor-pointer rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                  <p className="bg-neutral-900 text-white h-[45px] py-2 px-3 text-center rounded-full">
                    Play Games
                  </p>
                </div>
              </div>

              {/* Connect with others image start */}
              <div className="relative">
                <div className="ml-10">
                  <img src="/assets/png/betaTokenRewards.png" />
                </div>
                <div className="absolute bottom-10 left-0 p-0.5 cursor-pointer rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                  <p className="bg-neutral-900 text-white h-[45px] py-2 px-3 text-center rounded-full">
                    Beta Token Rewards
                  </p>
                </div>
              </div>
            </div>
            <div className="xs:mx-10 lg:w-2/4">
              <img className="" src="/assets/png/betaMainImg.png" />
            </div>
            <div className="flex flex-col lg:w-1/4 lg:gap-32">
              {/* Right-bottom image start */}
              <div className="relative">
                <div className="mr-10">
                  <img src="/assets/png/listenToPodcast.png" />
                </div>
                <div className="absolute bottom-7 right-0 p-0.5 cursor-pointer rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                  <p className="bg-neutral-900 text-white h-[45px] py-2 px-3 text-center rounded-full ">
                    Listen To Podcast
                  </p>
                </div>
              </div>

              {/* Set Up Profile image start */}
              <div className="relative">
                <div className="mr-10">
                  <img src="/assets/png/createGamography.png" />
                </div>
                <div className="absolute bottom-10 right-3 p-0.5 cursor-pointer rounded-full bg-gradient-to-b from-[#223EAC] to-[#DD3131]">
                  <p className="bg-neutral-900 text-white h-[45px] py-2 px-3 text-center rounded-full">
                    Create Gamography
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All In One Platform section start  */}
      <section id="career" className="xs:mb-28 lg:mb-40">
        <div className="flex flex-col justify-center text-center items-center lg:mx-60 xs:gap-4">
          <div>
            <p className="text-white text-center">
              Beta Features: Be a Part of the Experiment
            </p>
          </div>
          <div className="">
            <GradientHeader
              text={
                "All in one platform for gamers to help you build your career..."
              }
            />
          </div>
          <div>
            <p className="text-[#ffffff] xs:mx-5 text-center mb-10 text-md lg:mt-10">
              Break the chains of social media restrictions and embark on a
              journey of limitless gaming expression. Join our platform now and
              get ready to level up your gaming experience to epic proportions!
            </p>
          </div>
        </div>
        {/* Video tab start */}
        <div className="w-full xs:border-[10px] lg:border-[20px] border-[#121212] lg:rounded-3xl lg:my-10">
          <img src="/assets/png/gamingInsider.png" />
        </div>
      </section>

      {/* How it works section start */}
      <section className="xs:mb-28 lg:mb-32">
        <div className="flex flex-col gap-5 justify-center items-center">
          <div>
            <p className="text-white text-center">
              Decoding the Magic: How It Works Explained
            </p>
          </div>

          <div className="text-center">
            <GradientHeader text={"How it works?"} />
          </div>
          <div>
            <p className="text-[#ffffff]  xs:mx-5 lg:mx-96 text-center mb-10">
              The Legend of Zelda says "It’s dangerous to go alone " Our team
              has got your back in this whole journey.
            </p>
          </div>
          <div className="flex gap-5 xs:w-1/2 lg:w-5/12 justify-center">
            <div className="xs:w-2/3 md:w-1/4">
              <Button text={"Coming Soon"} />
            </div>
            {/* <div className="xs:w-2/3 md:w-1/4">
              <Button text={"Register"} />
            </div> */}
          </div>

          <div className="xs:flex xs:flex-col lg:flex-row justify-center">
            <div className="flex flex-col lg:w-1/4 lg:gap-32">
              {/* Social media image start */}
              <div className="relative">
                <div className="mr-5">
                  <img src="/assets/png/work1.png" />
                </div>
                <div className="absolute bottom-14 right-0 p-0.5 cursor-pointer rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                  <p className="bg-neutral-900 text-white h-[45px] py-2 px-3 text-center rounded-full">
                    Register via social links
                  </p>
                </div>
              </div>

              {/* Connect with others image start */}
              <div className="relative">
                <div className="mr-10">
                  <img src="/assets/png/work2.png" />
                </div>
                <div className="absolute bottom-12 right-0 p-0.5 cursor-pointer rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                  <p className="bg-neutral-900 text-white h-[45px] py-2 px-3 text-center rounded-full">
                    Connect with other gamers
                  </p>
                </div>
              </div>
            </div>
            <div className="xs:mt-10 lg:w-2/4">
              <img className="" src="/assets/png/landingBanner2.png" />
            </div>
            <div className="flex flex-col lg:w-1/4 lg:gap-32">
              {/* Right-bottom image start */}
              <div className="relative">
                <div className="ml-10">
                  <img src="/assets/png/work4.png" />
                </div>
                <div className="absolute bottom-12 left-0 p-0.5 cursor-pointer rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                  <p className="bg-neutral-900 text-white h-[45px] py-2 px-3 text-center rounded-full ">
                    Show off your game highlights
                  </p>
                </div>
              </div>

              {/* Set Up Profile image start */}
              <div className="relative">
                <div className="ml-5">
                  <img src="/assets/png/work3.png" />
                </div>
                <div className="absolute bottom-12 left-0 p-0.5 cursor-pointer rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                  <p className="bg-neutral-900 text-white h-[45px] py-2 px-3 text-center rounded-full">
                    Set up your profile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Tournament Requirements */}
      <section className="xs:mb-28 lg:mb-32">
        <div className="flex flex-col gap-5 justify-center items-center">
          <div>
            <p className="text-white text-center">
              THE FUTURE OF GAMING COMING SOON
            </p>
          </div>
          <div className="text-center">
            <GradientHeader
              text={"All of your Requirements in one application"}
            />
          </div>
          <div>
            <p className="xs:mx-5 lg:mx-96 text-center mb-10 text-md">
              With gamersback you get a unified platform to meet all your gaming
              needs. We always have new features to offer. Take a look at what
              we offer
            </p>
          </div>
          {/* Info card start */}
          <div className="xs:flex xs:flex-col lg:flex-row justify-center xs:items-center">
            {activeTab === 0 && (
              <div className="flex flex-col lg:w-2/3 justify-center gap-5">
                <div className="font-extrabold text-4xl xs:text-center lg:text-start">
                  Social Media
                </div>
                <div className="xs:text-center lg:text-start">
                  Esports & gaming enthusiasts worldwide can now connect with
                  each other in an open, secure social space to play, build,
                  support and evolve together, making it the home of gamers.
                </div>

                <div className="xs:mb-10 border-2 xs:mx-auto lg:mx-0 border-gray-500 rounded-3xl text-center py-3 xs:w-2/3 lg:w-1/4 mt-5">
                  Coming Soon!
                </div>
              </div>
            )}
            {activeTab === 1 && (
              <div className="flex flex-col lg:w-2/3 justify-center gap-5">
                <div className="font-extrabold text-4xl xs:text-center lg:text-start">
                  Tournament
                </div>
                <div className="xs:text-center lg:text-start">
                  Esports & gaming enthusiasts worldwide can now connect with
                  each other in an open, secure social space to play, build,
                  support and evolve together, making it the home of gamers.
                </div>

                <div className="xs:mb-10 border-2 xs:mx-auto border-gray-500 rounded-3xl text-center py-3 xs:w-2/3 lg:w-1/4 mt-5">
                  Coming Soon!
                </div>
              </div>
            )}
            {activeTab === 2 && (
              <div className="flex flex-col lg:w-2/3 justify-center gap-5">
                <div className="font-extrabold text-4xl xs:text-center lg:text-start">
                  Team
                </div>
                <div className="xs:text-center lg:text-start">
                  Esports & gaming enthusiasts worldwide can now connect with
                  each other in an open, secure social space to play, build,
                  support and evolve together, making it the home of gamers.
                </div>

                <div className="xs:mb-10 border-2 xs:mx-auto border-gray-500 rounded-3xl text-center py-3 xs:w-2/3 lg:w-1/4 mt-5">
                  Coming Soon!
                </div>
              </div>
            )}
            {activeTab === 3 && (
              <div className="flex flex-col lg:w-2/3 justify-center gap-5">
                <div className="font-extrabold text-4xl xs:text-center lg:text-start">
                  Jobs
                </div>
                <div className="xs:text-center lg:text-start">
                  Esports & gaming enthusiasts worldwide can now connect with
                  each other in an open, secure social space to play, build,
                  support and evolve together, making it the home of gamers.
                </div>

                <div className="xs:mb-10 border-2 xs:mx-auto border-gray-500 rounded-3xl text-center py-3 xs:w-2/3 lg:w-1/4 mt-5">
                  Coming Soon!
                </div>
              </div>
            )}
            {activeTab === 4 && (
              <div className="flex flex-col lg:w-2/3 justify-center gap-5">
                <div className="font-extrabold text-4xl xs:text-center lg:text-start">
                  Blogs
                </div>
                <div className="xs:text-center lg:text-start">
                  Esports & gaming enthusiasts worldwide can now connect with
                  each other in an open, secure social space to play, build,
                  support and evolve together, making it the home of gamers.
                </div>

                <div className="xs:mb-10 border-2 xs:mx-auto border-gray-500 rounded-3xl text-center py-3 xs:w-2/3 lg:w-1/4 mt-5">
                  Coming Soon!
                </div>
              </div>
            )}

            <div>
              <img src="/assets/png/tournamentReqBanner.png" />
            </div>
          </div>
          {/* Slider start */}
          <div className="flex xs:flex-wrap xs:flex-col content-center md:flex-row lg:flex-nowrap gap-7 m-10 justify-center">
            <div
              onClick={() => {
                setActiveTab(0);
              }}
              className="cursor-pointer border-2 border-gray-400 rounded-xl hover:scale-105 hover:border-[#DD3131] lg:w-1/5 pt-5"
            >
              <img src="/assets/png/sliderSocialMedia.png" />
            </div>
            <div
              onClick={() => {
                setActiveTab(1);
              }}
              className="cursor-pointer border-2 border-gray-400 rounded-xl hover:scale-105 hover:border-[#DD3131] lg:w-1/5 pl-8 pt-3"
            >
              <img src="/assets/png/sliderTournament.png" />
            </div>
            <div
              onClick={() => {
                setActiveTab(2);
              }}
              className="cursor-pointer border-2 border-gray-400 rounded-xl hover:scale-105 hover:border-[#DD3131] lg:w-1/5 pt-3 pl-3"
            >
              <img src="/assets/png/sliderTeam.png" />
            </div>
            <div
              onClick={() => {
                setActiveTab(3);
              }}
              className="cursor-pointer border-2 border-gray-400 rounded-xl hover:scale-105 hover:border-[#DD3131] lg:w-1/5 pt-9"
            >
              <img src="/assets/png/sliderJobs.png" />
            </div>
            <div
              onClick={() => {
                setActiveTab(4);
              }}
              className="cursor-pointer border-2 border-gray-400 rounded-xl hover:scale-105 hover:border-[#DD3131] lg:w-1/5 pt-8 pl-8"
            >
              <img src="/assets/png/sliderBlog.png" className="" />
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Features start*/}
      <section className="xs:mb-20 lg:mb-40">
        {/* Heading start*/}
        <div className="lg:mx-40">
          <div>
            <p className="text-white text-center">
              Experience the Future: Sneak Peek into Our Beta Features
            </p>
          </div>

          <div className="lg:px-80 xl:px-52 text-center">
            <GradientHeader text={"Features lined up for the next update"} />
          </div>
        </div>

        {/* Tabs start */}
        <div className="flex flex-row xs:flex-wrap text-white text-md xs:gap-5 lg:gap-14 justify-center items-center my-10">
          {landing_page_features_data.map((data, index) => {
            return (
              <div
                key={index}
                className={toggle === index ? "gradient-border p-3" : "p-3"}
              >
                <span
                  onClick={() => {
                    setToggle(index);
                  }}
                  className="cursor-pointer"
                >
                  {data.feature}
                </span>
              </div>
            );
          })}
          {/* <div className={toggle === 1 ? "gradient-border p-3" : "p-3"}>
              <span
                onClick={() => {
                  setToggle(1);
                }}
                className="cursor-pointer"
              >
                Voice Chat
              </span>
            </div>
            <div className={toggle === 2 ? "gradient-border p-3" : "p-3"}>
              <span
                onClick={() => {
                  setToggle(2);
                }}
                className="cursor-pointer"
              >
                Game Stats Sync
              </span>
            </div>
            <div className={toggle === 3 ? "gradient-border p-3" : "p-3"}>
              <span
                onClick={() => {
                  setToggle(3);
                }}
                className="cursor-pointer"
              >
                Game History
              </span>
            </div>
            <div className={toggle === 4 ? "gradient-border p-3" : "p-3"}>
              <span
                onClick={() => {
                  setToggle(4);
                }}
                className="cursor-pointer"
              >
                Voice Assistant
              </span>
            </div> */}
        </div>

        {/* Display card start */}

        <div className="w-full xs:border-[10px] lg:border-[20px] border-[#707070] xs:rounded-xl lg:rounded-3xl lg:my-10">
          <img src={landing_page_features_data[toggle].img} />
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
