import { useState } from "react";
import "./HelpCenter.css";
import { h_c_data } from "../../../json/data.json";

function HelpCenter({ dindex }) {
  const [toggle, setToggle] = useState(dindex);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [headingIndex, setHeadingIndex] = useState(dindex);

  function updateToggle(id) {
    setToggle(id);
    setActiveSubTab(0);
  }

  return (
    <div className="m-20 mt-36">
      {/* Help center heading and text start*/}
      <section>
        <p className="text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 from-1% via-purple-500 via-5% to-[#dd3131] to-15%">
          Help Center
        </p>
        <br />
        <br />
        <p className="text-white">
          Empower Your Journey with Our Robust Help Center, Your Trusted Source
          for Expert Guidance, Essential Troubleshooting Tips, and Invaluable
          Insights. Enhance Your Experience and Overcome Challenges with
          Confidence, Every Step of the Way.
        </p>
      </section>
      {/* Tab headings start*/}
      <section className="mb-14 mt-10">
        <div className="flex text-[#9D9E9E]">
          {h_c_data.map((data, index) => {
            return (
              <div
                key={index}
                className="flex cursor-pointer text-start w-1/6"
                onClick={() => {
                  updateToggle(index);
                  setHeadingIndex(index);
                }}
              >
                <span
                  key={index}
                  className={
                    toggle === index
                      ? "gradient-border text-sm pb-5 text-white"
                      : "text-sm pb-5"
                  }
                >
                  {data.mainHeading}
                </span>
              </div>
            );
          })}
        </div>
      </section>
      {/* Tab Sub-heading start*/}
      <div className="flex justify-start gap-4 items-center">
        {h_c_data[headingIndex].subHeadings.map((data, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                setActiveSubTab(idx);
              }}
              className={
                activeSubTab === idx
                  ? "flex-initial pl-5 pe-10 text-[#9D9E9E] gradient-border-left hover:cursor-pointer"
                  : "flex-initial pl-5 pe-10 text-[#9D9E9E] hover:cursor-pointer"
              }
            >
              {data.subTitle}
            </div>
          );
        })}
      </div>
      <br /> <br />
      {/* Sub-heading data start */}
      {/* <p className="text-white font-bold text-2xl mb-10">
        Principles of Data Protection
      </p> */}
      <br />
      {/* Card start */}
      <section className="overflow-hidden border-2 border-gray-800 bg-transparent px-20 pt-14 pb-20 rounded-3xl mb-5">
        {/* dynamic card data from help_center_data */}

        {h_c_data[headingIndex].subHeadings[activeSubTab].data.map(
          (data, index) => {
            return (
              <div key={index}>
                <ul className="list-disc marker:text-red-600">
                  <p className="text-[#E3E3E3]">
                    <li>
                      <h1 className="text-xl ">
                        <b>{data.pointTitle}</b>
                      </h1>
                    </li>
                    <br />
                    {data.pointsData}
                  </p>
                  <br />
                </ul>
              </div>
            );
          }
        )}
      </section>
      <br />
      <p className="text-white">
        The internet is an open platform, but every user has the right to
        confidentiality. Learn more about the type of information you leave on
        VK and how we can manage that data together.
      </p>
      <p className="text-[#dc3131] mt-5">Go to Data Management Rules -</p>
    </div>
  );
}

export default HelpCenter;
