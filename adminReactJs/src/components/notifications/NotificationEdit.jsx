import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { useDropzone } from "react-dropzone";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

// Import component
import Button from "../general/Button";
import BreadCrumbs from "../general/BreadCrumbs";
import CropImageModal from "../modals/CropImageModal";

// Import files
import constants from "../../json/constants.json";
import {
  apiList,
  invokeApi,
  invokeFormDataApi,
} from "../../utils/apiServiceUtils";
import { config } from "../../utils/configUtils";
import responseUtils from "../../utils/responseUtils";
import SingleSelect from "../general/SingleSelect";
import ConformationPopup from "../modals/ConformationPopup";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";

const NotificationEdit = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const location = useLocation(); // find location path
  const inputRefImg = useRef();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [selectType, setSelectType] = useState("GENERAL");
  const [title, setTitle] = useState("");
  const [filesImg, setFilesImg] = useState([]);
  const [imgUploadFile, setImgUploadFile] = useState(null);
  const [isCropModal, setIsCropModal] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectlistModal, setSelectlistModal] = useState(false);
  const [imgLink, setImgLink] = useState(null);
  const [comments, setComments] = useState("");
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [confirmPopupEdit, setConfirmPopupEdit] = useState(false);
  const [subject, setSubject] = useState("");
  const [templateData, setTemplateData] = useState(null);
  const [invokeTemplateData, setInvokeTemplateData] = useState(true);

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

  // React drag and drop
  const {
    acceptedFiles: imgAcceptFile,
    fileRejections: imgRejectFile,
    getRootProps: imgRootProps,
    getInputProps: imgInputProps,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    maxFiles: 1,
  });

  // confirm pop up onClosed
  const onClosed = () => setConfirmPopup(false);
  const onClosedEdit = () => setConfirmPopupEdit(false);

  // pop up modal confirm handler
  const confirmHandler = (confirmActiveStatus) => {
    if (confirmActiveStatus) {
      templatesAdd();
    } else {
      return null;
    }
  };
  const confirmHandlerEdit = (confirmActiveStatus) => {
    if (confirmActiveStatus) {
      templatesEdit();
    } else {
      return null;
    }
  };

  //axios (api integration) for image
  const uploadProfileImg = async (file) => {
    let formData = new FormData();
    formData.append("image", file);

    let response = await invokeFormDataApi(
      config.baseUrl + apiList.uploadSingleImage,
      formData,
      cookies
    );
    if (response.customcode === 200) {
      setImgLink(response.data.imageUrl);
    } else {
      console.error("Something went wrong");
    }
  };

  // templates Add
  const templatesAdd = async () => {
    let params = {
      name: title,
      title: subject,
      userType: "",
      notificationType: selectType === "GENERAL" ? "ALL" : selectType,
      image: imgLink,
      comments: comments !== "" ? comments : JSON.stringify(content),
      status: "ENABLE",
    };
    let response = await invokeApi(
      config.baseUrl + apiList.templatesAdd,
      params,
      cookies
    );
    if (response.customcode === 200) {
      responseUtils.showToster(response);
      navigate("/notifications/template");
    }
  };
  // changestatus role
  const templatesEdit = async () => {
    let params = {
      _id: location?.state._id,
      name: title,
      title: subject,
      userType: "",
      notificationType: selectType === "GENERAL" ? "ALL" : selectType,
      image: imgLink,
      comments,
      status: "ENABLE",
    };
    let response = await invokeApi(
      config.baseUrl + apiList.templatesEdit,
      params,
      cookies
    );
    if (response.customcode === 200) {
      responseUtils.showToster(response);
      navigate("/notifications/template");
    }
  };

  // onclose to cropped image
  const onClose = (croppedImage) => {
    setIsCropModal(false);
    setCroppedImage(croppedImage);
  };

  // cropped image
  const cropImg = (crop) => {
    setCroppedImage(crop);
    const url = crop;
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "File name", { type: "image/png" });
        uploadProfileImg(file);
      });
  };
  // get template data
  useEffect(() => {
    const getTemplatesDetail = async () => {
      let params = {
        _id: location?.state._id,
      };
      let response = await invokeApi(
        config.baseUrl + apiList.getTemplateDetail,
        params,
        cookies
      );
      if (response.customcode === 200) {
        setTemplateData(response.data);
        setTitle(response.data.title);
        setSubject(response.data.name);
        setCroppedImage(response.data.image);
        setComments(response.data.comments);
      } else {
        console.error("Something went wrong");
      }
    };
    if (
      invokeTemplateData &&
      location.pathname === "/notifications/template/edit"
    ) {
      setInvokeTemplateData(false);
      getTemplatesDetail();
    }
  }, [
    cookies,
    invokeTemplateData,
    location.pathname,
    location?.state?._id,
    location?.state?.id,
  ]);

  // drag and drop image handler
  useEffect(() => {
    if (imgAcceptFile.length > 0) {
      if (imgAcceptFile[0].size < 5242880) {
        setImgUploadFile(imgAcceptFile);
        setFilesImg(
          imgAcceptFile.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      }
      // else {
      //   setGstCertHelperText(
      //     "Please upload a GST certificate having less than 5MB size"
      //   );
      // }
    }
    if (imgRejectFile.length > 0) {
      // setGstCertHelperT ext(
      //   "Please upload a valid certificate in pdf/jpeg/jpg/png format"
      // );
      alert("Rejeted");
    }
  }, [imgAcceptFile, imgRejectFile]);

  useEffect(() => {
    if (imgUploadFile?.length > 0) {
      setIsCropModal(true);
    }
  }, [imgUploadFile]);

  return (
    <>
      <div
        className="card-without-subheading"
        onClick={() => {
          setSelectlistModal(false);
        }}
      >
        <div className="flex flex-col w-full card space-y-5 h-[600px] overflow-y-auto">
          {/* Breadcrumbs */}
          <div className="flex flex-row justify-between items-center  border-b border-gray-300  pb-5 mb-5">
            <BreadCrumbs
              nav1={constants.NOTIFICATIONTEMPLATE}
              nav2={
                location?.pathname === constants.NOTIFICATIONTEMPLATEADDNAVIGATE
                  ? "Add"
                  : "Edit"
              }
              link={constants.NOTIFICATIONTEMPLATENAVIGATE}
            />

            <div
              className="w-[150px]"
              onClick={() => {
                if (title === "") {
                  toast.error("Please enter the title");
                } else if (
                  imgLink === null &&
                  (selectType === "GENERAL" || selectType === "PUSH")
                ) {
                  toast.error("Please select image");
                } else if (
                  comments === "" &&
                  (selectType === "SMS" ||
                    selectType === "GENERAL" ||
                    selectType === "PUSH")
                ) {
                  toast.error("Please enter comments");
                } else if (subject === "") {
                  toast.error("Please enter subject");
                } else {
                  if (
                    location?.pathname ===
                    constants.NOTIFICATIONTEMPLATEEDITNAVIGATE
                  ) {
                    setConfirmPopupEdit(true);
                  } else {
                    setConfirmPopup(true);
                  }
                }
              }}
            >
              <Button text={constants.SUBMIT} />
            </div>
          </div>

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

          {/* select user */}
          <div className="flex flex-row">
            <div className="w-1/2 flex flex-col ps-32 space-y-4  py-5">
              {/* Select users */}
              <div className="flex flex-col space-y-2">
                <label>{constants.TEMPLATENAME}</label>
                <input
                  readOnly={
                    location.pathname ===
                    constants.NOTIFICATIONTEMPLATEEDITNAVIGATE
                      ? true
                      : false
                  }
                  value={title}
                  onChange={(ev) => setTitle(ev.target.value)}
                  className="border-black border-[1px] w-[350px] py-3 px-3 rounded-xl dark:text-white dark:border-white bg-transparent outline-none"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label>{constants.SUBJECT}</label>
                <input
                  value={subject}
                  onChange={(ev) => setSubject(ev.target.value)}
                  className="border-black border-[1px] w-[350px] py-3 px-3 rounded-xl dark:text-white dark:border-white bg-transparent outline-none"
                />
              </div>
              {/* Selecte template */}
              <div className="flex flex-col  w-[432px] ">
                <SingleSelect
                  title={constants.NOTIFICATIONTYPE}
                  dataArray={[
                    constants.EMAIL,
                    constants.SMS,
                    constants.PUSH,
                    constants.GENERAL,
                  ]}
                  fetchInputValue={(val) => {
                    setSelectType(val);
                  }}
                  defaultValue={"select"}
                  showSearch={false}
                  selectlistModal={
                    location.pathname !==
                      constants.NOTIFICATIONTEMPLATEEDITNAVIGATE &&
                    selectlistModal
                  }
                  setSelectlistModal={setSelectlistModal}
                  height="170"
                  width="350"
                  disabled={
                    location.pathname ===
                    constants.NOTIFICATIONTEMPLATEEDITNAVIGATE
                  }
                />
              </div>
            </div>
            <div className="w-1/2">
              {/* {selectType === "EMAIL" && ( */}

              {/* )} */}
              {selectType === "SMS" && (
                <div className="flex flex-col space-y-4">
                  <label>Content</label>
                  <textarea
                    rows="10"
                    cols="50"
                    value={comments}
                    className="border-black border-[1px] w-[550px] py-4 px-3 rounded-xl dark:text-white dark:border-white bg-transparent outline-none"
                    onChange={(ev) => setComments(ev.target.value)}
                  ></textarea>
                </div>
              )}
              {(selectType === "PUSH" || selectType === "GENERAL") && (
                <div className="flex flex-col space-y-5">
                  {/* Drag and Drop */}
                  {(location.pathname === "/notifications/template/edit" &&
                    croppedImage !== null) ||
                  (location.pathname === "/notifications/template/add" &&
                    filesImg?.length > 0) ? (
                    <div>
                      <img
                        style={{
                          width: "180px",
                          height: "170px",
                          borderRadius: "15px",
                          objectFit: "cover",
                        }}
                        src={croppedImage}
                        alt="cropped_img"
                      />
                      {location.pathname === "/notifications/template/edit" && (
                        <>
                          <FiEdit
                            onClick={() => inputRefImg.current.click()}
                            className="text-xl text-[#121212]  w-[400px] mt-3 cursor-pointer"
                          />
                          <input
                            {...imgInputProps()}
                            ref={inputRefImg}
                            type="file"
                            className="hidden"
                          />
                          <CropImageModal
                            file={filesImg[0]?.preview}
                            open={isCropModal}
                            close={onClose}
                            cropImg={cropImg}
                          />
                        </>
                      )}
                      {location.pathname === "/notifications/template/add" && (
                        <CropImageModal
                          file={filesImg[0]?.preview}
                          open={isCropModal}
                          close={onClose}
                          cropImg={cropImg}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-row pt-5">
                      <input
                        {...imgInputProps()}
                        ref={inputRefImg}
                        type="file"
                      />
                      <div className="flex flex-col cursor-pointer space-y-10 md:space-y-0 md:flex-row space-x-10 items-center">
                        <div
                          {...imgRootProps()}
                          onClick={() => inputRefImg.current.click()}
                          className="flex flex-col h-[170px] items-center justify-center w-[550px] border-[#2f2f2f] dark:border-slate-50 border-[2px] border-dashed outline-none rounded-xl"
                        >
                          <p className="hover:underline">
                            Drag your image here, or browse
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <textarea
                    placeholder="Write your comments here..."
                    rows="8"
                    cols="50"
                    value={comments}
                    className="border-black border-[1px] w-[550px] py-4 px-3 rounded-xl dark:text-white dark:border-white bg-transparent outline-none"
                    onChange={(ev) => setComments(ev.target.value)}
                  ></textarea>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ConformationPopup
        open={confirmPopup}
        close={onClosed}
        text={constants.ADDTEMPLATEPOPUPTEXT}
        heading={constants.ADDTEMPLATE}
        submitHandler={confirmHandler}
      />
      <ConformationPopup
        open={confirmPopupEdit}
        close={onClosedEdit}
        text={constants.EDITTEMPLATEPOPUPTEXT}
        heading={constants.EDITTEMPLATE}
        submitHandler={confirmHandlerEdit}
      />
    </>
  );
};

export default NotificationEdit;
