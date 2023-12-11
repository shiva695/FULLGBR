import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import constants from "../../json/constants.json";
import BreadCrumbs from "../general/BreadCrumbs";
import { apiList, invokeApi } from "../../utils/apiServiceUtils";
import { config } from "../../utils/configUtils";
import Button from "../general/Button";
import ConformationPopup from "../modals/ConformationPopup";
import responseUtils from "../../utils/responseUtils";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import ActionButton from "../general/ActionButton";
import { IoIosArrowForward } from "react-icons/io";

const FeedbackView = () => {
  const [cookies] = useCookies();
  const location = useLocation();
  const navigate = useNavigate();
  const [invokeData, setInvokeData] = useState(true);
  const [feedbackDetail, getFeedbackDetail] = useState(null);
  //   const [selectlistModal, setSelectlistModal] = useState(false);
  const [status, setStatus] = useState("");
  const [confirmPopupEdit, setConfirmPopupEdit] = useState(false);

  const onClosedEdit = () => setConfirmPopupEdit(false);

  const confirmHandlerEdit = (confirmActiveStatus) => {
    if (confirmActiveStatus) {
      changeStatusFeedback();
    } else {
      return null;
    }
  };

  // changestatus feedback
  const changeStatusFeedback = async () => {
    let params = {
      id: [location?.state._id],
      status,
    };
    let response = await invokeApi(
      config.baseUrl + apiList.changeStatusFeedback,
      params,
      cookies
    );
    if (response.customcode === 200) {
      responseUtils.showToster(response);
      navigate("/feedbacks");
    } else {
      alert("Something went wrong");
    }
  };

  // get template data
  useEffect(() => {
    const getFeedbackList = async () => {
      let params = {
        _id: location.state._id,
      };
      let response = await invokeApi(
        config.baseUrl + apiList.getFeedbackDetail,
        params,
        cookies
      );

      if (response.customcode === 200) {
        getFeedbackDetail(response.data);
      } else {
        console.error("Something went wrong");
      }
    };
    if (invokeData) {
      setInvokeData(false);
      getFeedbackList();
    }
  }, [cookies, invokeData, location.state._id]);

  return (
    <>
      <div className="card-without-subheading">
        <div className="flex flex-col w-full card space-y-5 h-[600px] overflow-y-auto">
          {/* Breadcrumbs */}
          <div className="flex flex-row justify-between items-center  border-b border-gray-300  pb-5 mb-5">
            <BreadCrumbs
              nav1={constants.FEEDBACK}
              nav2={"View"}
              link={constants.FEEDBACKNAVIGATE}
            />
          </div>

          {/* select user */}
          <div className="flex flex-col h-full space-y-10 w-[80%] m-auto">
            {/* Left side */}
            <div className="flex flex-row  space-x-10">
              <img
                src={
                  feedbackDetail?.user.profilePic !== ""
                    ? feedbackDetail?.user.profilePic
                    : feedbackDetail?.user.avatar
                }
                alt="cropped_img"
                className="w-[250px] h-[200px] rounded-2xl"
              />
              <div className="flex flex-col justify-center items-start space-y-5">
                <div className="flex flex-row items-end justify-center space-x-5">
                  <BsFillPersonFill size={20} className="text-gray-400" />
                  <h5 className=" dark:text-white text-lg dark:border-white">
                    {feedbackDetail?.user.userName}
                  </h5>
                </div>
                <div className="flex flex-row items-end justify-center space-x-5">
                  <MdEmail size={20} className="text-gray-400" />
                  <h5 className=" dark:text-white text-lg dark:border-white">
                    {feedbackDetail?.user.email}
                  </h5>
                </div>
                <div className="flex flex-row items-end justify-center space-x-5">
                  <AiFillPhone size={20} className="text-gray-400" />
                  <h5 className=" dark:text-white text-lg dark:border-white">
                    {feedbackDetail?.user.phone.code +
                      " " +
                      feedbackDetail?.user.phone.number}
                  </h5>
                </div>
              </div>
            </div>
            {/* Right side */}
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col items-center justify-center space-y-5 w-[250px] h-[100px] overflow-y-auto">
                <h3 className="text-gray-400 font-semibold text-2xl">
                  Feedback Description
                </h3>
                <h5 className=" dark:text-white text-lg dark:border-white">
                  {feedbackDetail?.description}
                </h5>
              </div>
              <div className="flex flex-col items-center justify-center space-y-5 w-[550px] h-[100px]">
                <h3 className="text-gray-400 font-semibold text-2xl">
                  Feedback Status
                </h3>
                <div className="flex flex-row w-full justify-center space-x-4 items-center dark:text-white text-lg dark:border-white">
                  <div>
                    {feedbackDetail?.status === "NEW" ? (
                      <ActionButton
                        text={constants.NEWBTN}
                        color={constants.RED}
                      />
                    ) : feedbackDetail?.status === "PROGRESS" ? (
                      <ActionButton
                        text={constants.PROGRESS}
                        color={constants.BLUE}
                      />
                    ) : feedbackDetail?.status === "RESOLVED" ? (
                      <ActionButton
                        text={constants.RESOLVED}
                        color={constants.GREEN}
                      />
                    ) : (
                      ""
                    )}
                  </div>

                  {feedbackDetail?.status !== "RESOLVED" && (
                    <IoIosArrowForward
                      size={20}
                      className="dark:text-white text-[#121212]"
                    />
                  )}

                  <div>
                    {feedbackDetail?.status === "NEW" ? (
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setStatus(constants.PROGRESS);
                          setConfirmPopupEdit(true);
                        }}
                      >
                        <ActionButton
                          text={constants.PROGRESSBTN}
                          color={constants.BLUE}
                        />
                      </div>
                    ) : feedbackDetail?.status === "PROGRESS" ? (
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setStatus(constants.RESOLVED);
                          setConfirmPopupEdit(true);
                        }}
                      >
                        <ActionButton
                          text={constants.RESOLVED}
                          color={constants.GREEN}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-5 w-[250px] h-[100px] overflow-y-auto">
                <h3 className="text-gray-400 font-semibold text-2xl">
                  Feedback Type
                </h3>
                <h5 className=" dark:text-white text-lg dark:border-white">
                  {feedbackDetail?.type}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConformationPopup
        open={confirmPopupEdit}
        close={onClosedEdit}
        text={constants.EDITTFEEDBACKPOPUPTEXT}
        heading={constants.EDITTFEEDBACKSTATUS}
        submitHandler={confirmHandlerEdit}
      />
    </>
  );
};

export default FeedbackView;

{
  /* <div className="w-full flex flex-row items-center justify-center space-x-10">
<div className="flex flex-col space-y-2">
  <label>{constants.USERNAME}</label>
  <input
    readOnly={true}
    value={feedbackDetail?.user.userName}
    className="border-black border-[1px] w-[350px] py-3 px-3 rounded-xl dark:text-white dark:border-white bg-transparent outline-none"
  />
</div>

<div className="flex flex-col space-y-2">
  <label>{constants.USEREMAIL}</label>
  <input
    readOnly={true}
    value={feedbackDetail?.user.email}
    className="border-black border-[1px] w-[350px] py-3 px-3 rounded-xl dark:text-white dark:border-white bg-transparent outline-none"
  />
</div>
<div className="flex flex-col space-y-2">
  <label>{constants.USERPHONE}</label>
  <input
    readOnly={true}
    value={
      feedbackDetail?.user.phone.code +
      feedbackDetail?.user.phone.number
    }
    className="border-black border-[1px] w-[350px] py-3 px-3 rounded-xl dark:text-white dark:border-white bg-transparent outline-none"
  />
</div>
</div>
<div className="w-full flex flex-row items-center justify-center space-x-10">
<div className="flex flex-col space-y-2">
  <label>{constants.USERDESCRIPTION}</label>
  <input
    readOnly={true}
    value={feedbackDetail?.description}
    className="border-black border-[1px] w-[350px] py-3 px-3 rounded-xl dark:text-white dark:border-white bg-transparent outline-none"
  />
</div>

<div className="flex flex-col space-y-2">
  <label>{constants.USERSTATUS}</label>
  <div className="w-[350px] relative">
    <SingleSelect
      // title={"Cron Time Zone:"}
      dataArray={[constants.PROGRESS, constants.RESOLVED]}
      defaultValue={feedbackDetail?.status}
      fetchInputValue={(val) => {
        setStatus(val);
      }}
      showSearch={true}
      selectlistModal={selectlistModal}
      setSelectlistModal={setSelectlistModal}
      height="30"
    />
    <FiEdit
      className="absolute right-5 bottom-5 text-black dark:text-white cursor-pointer"
      onClick={(ev) => {
        ev.stopPropagation();
        setSelectlistModal(true);
      }}
    />
  </div>
</div>
<div className="flex flex-col space-y-2">
  <label>{constants.USERTYPE}</label>
  <input
    readOnly={true}
    value={feedbackDetail?.type}
    className="border-black border-[1px] w-[350px] py-3 px-3 rounded-xl dark:text-white dark:border-white bg-transparent outline-none"
  />
</div>
</div> */
}
