import { useState } from "react";
import Badge from "../general/uiElements/Badge";
import { blog_data, constants } from "../../json/data.json";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Blog() {
  const [toggle, setToggle] = useState(0);
  const [dataIndex, setDataIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const navigate = useNavigate();

  function categoryIndexHandler(ctgyIndex) {
    if (blog_data[dataIndex].categories.length > ctgyIndex) {
      setCategoryIndex(ctgyIndex);
      setToggle(ctgyIndex);
    }
  }

  function sliderDataIndexHandler(dir) {
    if (dir === constants.LEFT && 0 < dataIndex) {
      setDataIndex(dataIndex - 1);
      setCategoryIndex(0);
    } else if (dir === constants.RIGHT && dataIndex < blog_data.length - 1) {
      setDataIndex(dataIndex + 1);
      setCategoryIndex(0);
    }
  }

  return (
    <div className="mt-32 mx-3 md:mx-10">
      {/* Banner start */}
      <section className="flex justify-between">
        <div className={blog_data.length > 1 ? "my-auto" : "invisible"}>
          <IoIosArrowDropleft
            className="text-white cursor-pointer"
            size="25px"
            onClick={() => sliderDataIndexHandler(constants.LEFT)}
          />
        </div>
        <div
          className={`relative bg-no-repeat bg-cover bg-center rounded-3xl shadow sm:p-4 w-11/12`}
        >
          <img
            src={blog_data[dataIndex].bannerImg}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950"></div>
          <div className="relative flex flex-col px-4">
            {/* User image, Full Name , Username start*/}

            <div className="relative flex flex-row mt-16 text-left">
              <div>
                <img
                  className="rounded-full mr-5 w-20"
                  src={blog_data[dataIndex].profilePic}
                />
              </div>
              <div className="text-white">
                <span className="block">{blog_data[dataIndex].username}</span>
                <span>{blog_data[dataIndex].uniqueId}</span>
              </div>
            </div>

            {/* User image, Full Name , Username end*/}

            {/* Description start */}
            <div className="relative text-white text-left text-xl border-b-4 border-[rgba(185,190,202,255)] border-opacity-50 pt-10 pb-5 mb-5">
              <span className="overflow-ellipsis overflow-hidden">
                {blog_data[dataIndex].desc}
              </span>
            </div>
            {/* Description end */}
            {/* Badges start*/}

            <div className="relative flex flex-row space-x-3 ">
              {blog_data[dataIndex].badges.map((badgeData, badgeIndex) => {
                return (
                  <div key={badgeIndex}>
                    <Badge text={badgeData} />
                  </div>
                );
              })}
            </div>

            {/* Badges end*/}
          </div>
        </div>
        <div className={blog_data.length > 1 ? "my-auto" : "invisible"}>
          <IoIosArrowDropright
            className="text-white cursor-pointer"
            size="25px"
            onClick={() => sliderDataIndexHandler(constants.RIGHT)}
          />
        </div>
      </section>
      {/* Banner End */}
      {/* Tabs start */}
      <section className="mx-10 text-white flex justify-start my-5 mb-10 lg:w-4/12">
        {blog_data[dataIndex].categories.map((ctgy, ctgyIndex) => {
          return (
            <div
              key={ctgyIndex}
              className="flex-1 w-1/12 inline-block cursor-pointer text-start"
              onClick={() => categoryIndexHandler(ctgyIndex)}
            >
              <span
                className={
                  toggle === ctgyIndex
                    ? "gradient-border text-xl pb-2"
                    : "text-xl pb-5"
                }
              >
                {ctgy.title}
              </span>
            </div>
          );
        })}
      </section>
      {/* Tabs end */}

      {/* Grids start */}
      <section className="md:mx-10 text-white grid xl:grid-cols-4 lg:grid-cols-3 gap-2 md:grid-cols-2 xs:grid-cols-1 my-5 mb-10 ">
        {blog_data[dataIndex].categories[categoryIndex].categoryData.map(
          (ctgyData, ctgyDataIndex) => {
            return (
              <a href={ctgyData.meduimUrl} target="_blank">
                <div
                  key={ctgyDataIndex}
                  className={`px-5 py-5 bg-no-repeat bg-cover pt-12 relative cursor-pointer`}
                >
                  <img
                    className="rounded-2xl absolute inset-0 h-full w-full"
                    src={ctgyData.img}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl"></div>
                  <div className="relative border-b-4">
                    <p className="mt-10 mb-3 font-normal text-white relative">
                      {ctgyData.desc}
                    </p>
                  </div>
                  {/* Badges start*/}
                  <div className="relative flex flex-row space-x-3 mt-5">
                    {blog_data[dataIndex].categories[
                      categoryIndex
                    ].categoryData[ctgyDataIndex].badge.map(
                      (badgesData, badgesIndex) => {
                        return (
                          <div key={badgesIndex}>
                            <Badge text={badgesData} />
                          </div>
                        );
                      }
                    )}
                  </div>
                  {/* Badges end*/}
                </div>
              </a>
            );
          }
        )}
      </section>
      {/* Grids end */}
    </div>
  );
}

export default Blog;
