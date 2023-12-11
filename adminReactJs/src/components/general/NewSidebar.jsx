/* eslint-disable react/prop-types */
// Import Dependencies
import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useCookies } from "react-cookie";
import { motion } from "framer-motion";
// Import Components
import SingleSelect from "./SingleSelect";

// Import Files
import constants from "../../json/constants.json";
import helperUtils from "../../utils/helperUtils";

export default function Sidebar({
  open,
  close,
  fetchFilterData,
  defaultListParams,
  showList,
}) {
  const [cookies] = useCookies(); //Cookies
  const [showSidebar, setShowSidebar] = useState(true);
  const [listType, setListType] = useState([constants.ALL, constants.ARCHIVE]);
  const [list, setList] = useState([constants.ALL, constants.ARCHIVE]);
  const [tableLimitList, setTableLimitList] = useState([]);
  const [selectlistModal, setSelectlistModal] = useState(false);
  const [tableLimitModal, setTableLimitModal] = useState(false);
  if (!open) return null;
  if (tableLimitList.length === 0)
    setTableLimitList(helperUtils.fetchTableLimits(cookies));

  return (
    <>
      {showSidebar && (
        <div className="">
          <div className="flex flex-col fixed inset-0 backdrop-blur-sm z-10">
            <aside
              onClick={() => {
                setSelectlistModal(false);
                setTableLimitModal(false);
              }}
              className="fixed z-10 h-[100%] bottom-0 right-0 w-[20%] flex flex-col bg-white filter-card-shadow dark:bg-[#121212]"
            >
              <div className="flex justify-start p-2 pb-3 border-b-2 border-gray-300">
                <AiOutlineArrowRight
                  className="cursor-pointer dark:text-white text-black"
                  size={25}
                  onClick={close}
                />
                <div className="text-center mx-auto font-semibold text-md uppercase flex items-center gap-x-10 dark:text-white text-black">
                  <div>{constants.FILTERS}</div>
                </div>
              </div>
              <div className="flex flex-col gap-y-4 p-4">
                <SingleSelect
                  title={constants.TABLELIMIT}
                  dataArray={tableLimitList}
                  fetchInputValue={(val) => {
                    fetchFilterData({ tableLimit: val });
                    close(true);
                  }}
                  defaultValue={defaultListParams.limit}
                  showSearch={false}
                  selectlistModal={tableLimitModal}
                  setSelectlistModal={setTableLimitModal}
                />
                {showList && (
                  <SingleSelect
                    title={constants.LIST}
                    dataArray={list}
                    fetchInputValue={(val) => {
                      fetchFilterData({ tableListType: val.toUpperCase() });
                      close(true);
                    }}
                    defaultValue={
                      defaultListParams.filter === ""
                        ? constants.ALL
                        : constants[`${defaultListParams.filter}`]
                    }
                    showSearch={false}
                    selectlistModal={selectlistModal}
                    setSelectlistModal={setSelectlistModal}
                  />
                )}
              </div>
            </aside>
          </div>
        </div>
      )}
    </>
  );
}
