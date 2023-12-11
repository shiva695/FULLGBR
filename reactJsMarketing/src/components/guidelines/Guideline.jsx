import { useState } from "react";
import Accordion from "../general/uiElements/FAQ/Accordion";
import { faq_data } from "../../json/data.json";
import GradientHeader from "../general/uiElements/GradientHeader";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function Guideline({ chooseDataIdx }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }

    setOpen(index);
  };

  return (
    <div className="flex flex-col items-center 2xl:mt-60 lg:mt-60 lg:m-20 xs:m-3 2xl:m-40 mb-0">
      <section className="items-center text-center mt-40 md:mt-10">
        <center>
          <div>
            <GradientHeader text={"Gamersback Guidelines"} />
          </div>
          <div>
            <p className="text-white lg:w-4/5 2xl:w-5/6 mt-10 cursor-default select-none">
              Your Essential Rulebook to Triumph in the Expansive Gaming
              Universe. Dive deep into our comprehensive guidelines, unlock the
              secrets of gaming mastery, and embark on exhilarating adventures
              like never before. Conquer challenges, level up your skills, and
              embrace the gaming greatness that awaits you!
            </p>
          </div>
          <div className="lg:w-3/12 mt-10 mb-72">
            {/* <div className="py-0.5 w-2/4 cursor-pointer rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
              <a href="#popularTopics">
                <p className="bg-neutral-900 pt-1 text-center text-white h-[35px] rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                  <span>Browse our Topics</span>
                </p>
              </a>
            </div> */}

            <HashLink smooth to="#popularTopics">
              <div className="p-0.5 xs:w-32 lg:w-3/4 cursor-pointer rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                <p className="bg-neutral-900 text-white xs:h-auto lg:h-[50px] xs:py-1 lg:py-3 px-1 text-center rounded-full hover:bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
                  Browse our Topics
                </p>
              </div>
            </HashLink>
          </div>
        </center>
      </section>

      <section
        id="popularTopics"
        className="xs:w-full items-center text-center mb-10"
      >
        <center>
          <p className="text-white text-2xl flex lg:w-4/5 2xl:w-5/6 mt-24">
            Popular Topics
          </p>
          {/* CARDS */}

          <div>
            <div className="flex flex-row flex-wrap ml-4 md:ml-10">
              <div
                onClick={() => {
                  chooseDataIdx(0);
                  navigate("/helpcenter");
                }}
                className="2xl:w-[31%] lg:w-[31%] cursor-pointer overflow-hidden border-2 border-gray-800 bg-transparent px-6 pt-16 rounded-3xl mt-5 mr-5 hover:border-5 hover:border-[#dd3131] hover:border-opacity-40"
              >
                <img
                  className="w-fit mx-auto px-14 mb-2"
                  src="assets/svg/Terms.svg"
                  alt="Gamersback Terms of Service"
                />
                <div className="py-6">
                  <div className="font-bold text-md mb-5 text-white">
                    <span className="gradient-border pb-3">
                      Gamersback Terms of Service
                    </span>
                  </div>
                  <p className="text-white text-sm pb-10">
                    Explore Our Website's Terms and Conditions, where Warriors
                    Unite and Gaming Adventures Await!
                  </p>
                </div>
              </div>

              <div
                onClick={() => {
                  chooseDataIdx(1);
                  navigate("/helpcenter");
                }}
                className="2xl:w-[31%] cursor-pointer lg:w-[31%] overflow-hidden border-2 border-gray-800 bg-transparent px-6 pt-16 rounded-3xl mt-5 mr-5 hover:border-5 hover:border-[#dd3131] hover:border-opacity-40"
              >
                <img
                  className="w-fit mx-auto px-14 mb-2"
                  src="assets/png/cookiePolicy.png"
                  alt="Cookie Policy"
                />
                <div className="py-6">
                  <div className="font-bold text-md mb-5 text-white">
                    <span className="gradient-border pb-3">Cookie Policy</span>
                  </div>
                  <p className="text-white text-sm pb-10">
                    Explore the Tasty Details of the Information We Collect.
                    Level Up Your Knowledge and Delve into the Sweet World of
                    Gaming Data.
                  </p>
                </div>
              </div>
              <div
                onClick={() => {
                  chooseDataIdx(2);
                  navigate("/helpcenter");
                }}
                className="2xl:w-[31%] lg:w-[31%] cursor-pointer overflow-hidden border-2 border-gray-800 bg-transparent px-6 pt-16 rounded-3xl mt-5 mr-5 hover:border-5 hover:border-[#dd3131] hover:border-opacity-40"
              >
                <img
                  className="w-fit mx-auto px-14 mb-2"
                  src="assets/png/privacyPolicy.png"
                  alt="Privacy Policy"
                />
                <div className="py-6">
                  <div className="font-bold text-md mb-5 text-white">
                    <span className="gradient-border pb-3">Privacy Policy</span>
                  </div>
                  <p className="text-white text-sm pb-10">
                    Discover Our Secure Gaming Protocols. Strengthen Your
                    Security and Safeguard Your Gaming Identity.
                  </p>
                </div>
              </div>
              <div
                onClick={() => {
                  chooseDataIdx(3);
                  navigate("/helpcenter");
                }}
                className="2xl:w-[31%] lg:w-[31%] cursor-pointer overflow-hidden border-2 border-gray-800 bg-transparent px-6 pt-16 rounded-3xl mt-5 mr-5 hover:border-5 hover:border-[#dd3131] hover:border-opacity-40"
              >
                <img
                  className="w-fit mx-auto px-14 mb-2"
                  src="assets/png/parentsGuidelines.png"
                  alt="Parents Guidelines"
                />
                <div className="py-6">
                  <div className="font-bold text-md mb-5 text-white">
                    <span className="gradient-border pb-3">
                      Parents Guidelines
                    </span>
                  </div>
                  <p className="text-white text-sm pb-10">
                    Conquer Your Child's Gaming Habits with Our Expert Guide.
                    Forge a Balanced Gaming Path, Set Boundaries, and Unlock
                    Epic Adventures.
                  </p>
                </div>
              </div>
              <div
                onClick={() => {
                  chooseDataIdx(4);
                  navigate("/helpcenter");
                }}
                className="2xl:w-[31%] lg:w-[31%] cursor-pointer overflow-hidden border-2 border-gray-800 bg-transparent px-6 pt-16 rounded-3xl mt-5 mr-5 hover:border-5 hover:border-[#dd3131] hover:border-opacity-40"
              >
                <img
                  className="w-fit mx-auto px-14 mb-2"
                  src="assets/png/gameAddiction.png"
                  alt="Game Addiction"
                />
                <div className="py-6">
                  <div className="font-bold text-md mb-5 text-white">
                    <span className="gradient-border pb-3">Game Addiction</span>
                  </div>
                  <p className="text-white text-sm pb-10">
                    Unravel the Clues of Gaming Addiction. Decode the Symptoms
                    and Experience the Effects of this Gaming Adventure Gone
                    Awry.
                  </p>
                </div>
              </div>
              <div
                onClick={() => {
                  chooseDataIdx(5);
                  navigate("/helpcenter");
                }}
                className="2xl:w-[31%] lg:w-[31%] cursor-pointer overflow-hidden border-2 border-gray-800 bg-transparent px-6 pt-16 rounded-3xl mt-5 mr-5 hover:border-5 hover:border-[#dd3131] hover:border-opacity-40"
              >
                <img
                  className="w-fit mx-auto px-14 mb-2"
                  src="assets/png/healthyGameplay.png"
                  alt="Healthy Gameplay"
                />
                <div className="py-6">
                  <div className="font-bold text-md mb-5 text-white">
                    <span className="gradient-border pb-3">
                      Healthy Gameplay
                    </span>
                  </div>
                  <p className="text-white text-sm pb-10">
                    Embrace the Power of Health and Fun! Discover our Epic List
                    of Strategies to Amplify the Joy and Promote a Healthy
                    Gaming Adventure.
                  </p>
                </div>
              </div>
              <div
                onClick={() => {
                  chooseDataIdx(6);
                  navigate("/helpcenter");
                }}
                className="2xl:w-[31%] lg:w-[31%] cursor-pointer overflow-hidden border-2 border-gray-800 bg-transparent px-6 pt-16 rounded-3xl mt-5 mr-5 hover:border-5 hover:border-[#dd3131] hover:border-opacity-40"
              >
                <img
                  className="w-fit mx-auto px-14 mb-2"
                  src="assets/png/govtAdvisory.png"
                  alt="Indian Govt Advisory"
                />
                <div className="py-6">
                  <div className="font-bold text-md mb-5 text-white">
                    <span className="gradient-border pb-3">
                      Indian Govt Advisory
                    </span>
                  </div>
                  <p className="text-white text-sm pb-10">
                    Ministry of Education, India's Guidelines for Parents and
                    Educators. Essential Do's and Don'ts for a Secure Gaming
                    Environment.
                  </p>
                </div>
              </div>
              <div
                onClick={() => {
                  chooseDataIdx(7);
                  navigate("/helpcenter");
                }}
                className="2xl:w-[31%] lg:w-[31%] cursor-pointer overflow-hidden border-2 border-gray-800 bg-transparent px-6 pt-16 rounded-3xl mt-5 mr-5 hover:border-5 hover:border-[#dd3131] hover:border-opacity-40"
              >
                <img
                  className="w-fit mx-auto px-14 mb-2"
                  src="assets/png/gamersbackGuidelines.png"
                  alt="Gamersback Guidelines"
                />
                <div className="py-6">
                  <div className="font-bold text-md mb-5 text-white">
                    <span className="gradient-border pb-3">
                      Gamersback Guidelines
                    </span>
                  </div>
                  <p className="text-white text-sm pb-10">
                    Embody Platform Standards and Champion Social
                    Accountability. Elevate Your Gaming Journey with Honor,
                    Respect, and Responsible Gaming Practices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CARDS */}
        </center>
      </section>

      {/* FAQ Accordion */}
      <section className="xs:w-full text-white my-20">
        <center>
          <p className="lg:w-4/5 2xl:w-5/6 text-2xl flex items-start">FAQ</p>
          <div className="lg:w-4/5 2xl:w-5/6 mt-10">
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
        </center>
      </section>

      {/* FAQ Accordion */}
    </div>
  );
}
export default Guideline;
