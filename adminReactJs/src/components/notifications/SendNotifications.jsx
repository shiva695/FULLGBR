import { useState, useEffect, useRef } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// Import files
import constants from "../../json/constants.json";

// Import Components
import BreadCrumbs from "../general/BreadCrumbs";
import SingleSelect from "../general/SingleSelect";
import { apiList, invokeApi } from "../../utils/apiServiceUtils";
import { config } from "../../utils/configUtils";
import JoditEditor from "jodit-react";

const SendNotifications = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [selectType, setSelectType] = useState("");
  const [selectTypeList, setSelectTypeList] = useState(false);
  const [selectTemplate, setSelectTemplate] = useState("select");
  const [selectTemplateList, setSelectTemplateList] = useState(false);
  const [selectProfile, setSelectProfile] = useState("select");
  const [selectProfileList, setSelectProfileList] = useState(false);
  const [fakeData, setFakeData] = useState(null);
  const [invokeData, setInvokeData] = useState(true);
  const [filteredData, setFilteredData] = useState(null);
  const [invokeGetTemplate, setInvokeGetTemplate] = useState(false);
  const [templateData, setTemplateData] = useState([]);
  const [showLoadmore, setShowLoadmore] = useState(null);
  const [skip, setSkip] = useState(0);

  const editorConfig = {
    readonly: false,
    // toolbar: true,
    spellcheck: true,
    language: "en",
    // toolbarButtonSize: "medium",
    // toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    //defaultActionOnPaste: "insert_clear_html",
    // buttons: buttons,
    uploader: {
      insertImageAsBase64URI: true,
    },
    width: 550,
    height: 400,
  };

  // Load more handler
  const loadmoreHandler = (status) => {
    if (status) {
      setSkip((prev) => prev + 10);
      setInvokeGetTemplate(true);
    } else {
      return null;
    }
  };

  // Filter search users
  const filterSearchHandler = (ev) => {
    let search = ev.target.value;
    // setSearchValue(ev.target.value);
    let newFilter = fakeData?.filter((val) => {
      if (search.length === 1) {
        return val.firstName[0].toLowerCase().includes(search.toLowerCase());
      } else {
        return val.firstName.toLowerCase().includes(search.toLowerCase());
      }
    });
    if (search === "") {
      setFilteredData(fakeData);
    } else {
      setFilteredData(newFilter);
    }
  };

  // Fetching fake data from api
  useEffect(() => {
    const fetchingData = async () => {
      let data = await fetch("https://dummyjson.com/users");
      let res = await data.json();
      setFilteredData(res.users);
      setFakeData(res.users);
    };
    if (invokeData) {
      setInvokeData(false);
      fetchingData();
    }
  }, [invokeData]);

  // get template data
  useEffect(() => {
    const getTemplatesList = async () => {
      let params = {
        skip,
        limit: 10,
        search: "",
        filter: "",
      };
      let response = await invokeApi(
        config.baseUrl +
          apiList.getTemplates +
          `${selectType === "GENERAL" ? "ALL" : selectType}`,
        params,
        cookies
      );

      if (response.customcode === 200) {
        if (response.total > response.data.length) {
          setShowLoadmore(true);
        } else {
          setShowLoadmore(false);
        }
        if (response.data.length < 10) {
          setShowLoadmore(false);
        } else {
          setShowLoadmore(true);
        }
        if (skip > 0) {
          setTemplateData((prev) => [...prev, ...response.data]);
        } else {
          setTemplateData(response.data);
        }
      } else {
        console.error("Something went wrong");
      }
    };
    if (invokeGetTemplate) {
      setInvokeGetTemplate(false);
      getTemplatesList();
    }
  }, [cookies, invokeGetTemplate, selectType, skip]);

  return (
    <div
      className="card-with-subheading"
      onClick={() => {
        setSelectTypeList(false);
        setSelectTemplateList(false);
      }}
    >
      {/* sub - heading */}
      <div className="subheading">
        <div className="flex gap-x-5">
          <div
            className={"flex gap-1 cursor-pointer"}
            onClick={() => {
              navigate("/notifications/template");
            }}
          >
            {constants.NOTIFICATIONTEMPLATE}
          </div>
          <div
            className={
              location.pathname === "/notifications/send"
                ? "font-semibold flex gap-1"
                : "flex gap-1"
            }
          >
            {constants.SENDNOTIFICATIONS}
          </div>
        </div>
      </div>

      {/* content  */}
      <div className="card-content">
        <div className="flex flex-col space-y-5">
          {/* Bread crumps */}
          <BreadCrumbs nav1={"Send Notification"} />

          <JoditEditor
            ref={editor}
            value={content}
            config={editorConfig}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            // onChange={(newContent) => {
            // setContent(JSON.stringify(newContent));
            // }}
          />
          {/* first row */}
          <div className="flex flex-row space-x-5">
            <div className="flex flex-col w-[432px]">
              <SingleSelect
                title={constants.NOTIFICATIONTYPE}
                dataArray={[
                  constants.SELECT,
                  constants.EMAIL,
                  constants.SMS,
                  constants.PUSH,
                  constants.GENERAL,
                ]}
                fetchInputValue={(val) => {
                  setSelectType(val);
                  if (val !== constants.SELECT) {
                    setInvokeGetTemplate(true);
                    setSelectTemplate("select");
                  }
                  if (val === constants.GENERAL) {
                    setSelectProfile("");
                  } else {
                    setSelectProfile("select");
                  }
                }}
                defaultValue={constants.SELECT}
                showSearch={false}
                selectlistModal={selectTypeList}
                setSelectlistModal={setSelectTypeList}
                height="250"
                width="340"
              />
            </div>
            {/* Selecte template */}
            {!!templateData && showLoadmore !== null && (
              <div className="flex flex-col w-[432px]">
                <SingleSelect
                  title={constants.TEMPLATENAME}
                  dataArray={templateData?.map((el) => el.title)}
                  fetchInputValue={(val) => {
                    setSelectTemplate(val);
                  }}
                  defaultValue={selectTemplate ?? constants.SELECT}
                  showSearch={false}
                  selectlistModal={selectTemplateList}
                  setSelectlistModal={setSelectTemplateList}
                  showLoadmore={showLoadmore}
                  loadmoreHandler={loadmoreHandler}
                  height="400"
                  width="340"
                />
              </div>
            )}

            {/* Profile type */}
            {selectTemplate !== "select" && selectType !== "GENERAL" && (
              <div className="flex flex-col w-[432px]">
                <SingleSelect
                  title={constants.PROFILE}
                  dataArray={[
                    constants.USERROLES,
                    constants.JOURNALROLES,
                    constants.ADMINROLES,
                  ]}
                  fetchInputValue={(val) => {
                    setSelectProfile(val);
                  }}
                  defaultValue={constants.SELECT}
                  showSearch={false}
                  selectlistModal={selectProfileList}
                  setSelectlistModal={setSelectProfileList}
                  height="250"
                  width="340"
                />
              </div>
            )}
          </div>
          <div className="flex flex-row items-end space-x-4">
            <div>
              {selectProfile !== "select" && (
                <div className="flex flex-col space-y-4">
                  <label>Filter users</label>
                  <input
                    onChange={filterSearchHandler}
                    className="border-black border-[1px] w-[350px] py-4 px-3 rounded-xl dark:text-white dark:border-white bg-transparent"
                  />
                </div>
              )}
            </div>
            <div>
              {selectProfile !== "select" && (
                <div className="flex flex-row space-x-5">
                  <button
                    onClick={() => {
                      let copy = [...filteredData];
                      copy.map((el) => (el.isSelected = true));
                      setFilteredData(copy);
                    }}
                    className="border-black border-[1px] w-[250px] py-3 px-3 rounded-full dark:text-white dark:border-white bg-transparent"
                  >
                    Select all from below
                  </button>
                  {filteredData?.every((el) => el.isSelected === true) && (
                    <button
                      onClick={() => {
                        let copy = [...filteredData];
                        copy.map((el) => (el.isSelected = false));
                        setFilteredData(copy);
                      }}
                      className="border-black border-[1px] w-[250px] py-3 px-3 rounded-full dark:text-white dark:border-white bg-transparent"
                    >
                      Deselect all from below
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* second row */}
          {selectProfile !== "select" && (
            <div className="w-[76.5vw] flex flex-row flex-wrap overflow-y-scroll dark:border-white h-[400px] rounded-2xl box-border">
              {!!filteredData &&
                filteredData?.map((el, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      let copy = [...filteredData];
                      copy[idx].isSelected = !copy[idx].isSelected;
                      setFilteredData(copy);
                    }}
                    className={`cursor-pointer flex flex-col m-5 p-5 space-y-5 border-[2px] ${
                      el.isSelected ? "border-[#0f6839]" : "border-gray-300"
                    } h-[160px] w-[350px] rounded-2xl`}
                  >
                    <div className="flex flex-row items-center  space-x-4">
                      <BsFillPersonFill size={25} color="#147fb5" />
                      <h5>{el.firstName}</h5>
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                      <MdEmail size={25} color="#147fb5" />
                      <h5>{el.email}</h5>
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                      <AiFillPhone size={25} color="#147fb5" />
                      <h5>{el.phone}</h5>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendNotifications;
