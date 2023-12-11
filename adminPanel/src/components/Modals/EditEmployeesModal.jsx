// @import dependencies
import { useState, useRef, useEffect } from "react";
import { MdClose, MdRemoveCircleOutline } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoMdAddCircle, IoMdAddCircleOutline } from "react-icons/io";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { parseISO } from "date-fns";

// @import files
import {
  apiList,
  invokeApi,
  invokeFormDataApi,
} from "../../utils/apiServiceUtils";
import responseUtils from "../../utils/responseUtils";
import { config } from "../../utils/configUtils";
import PhoneNumberInput from "../general-components/PhoneNumberInput";

// eslint-disable-next-line react/prop-types
const EditEmployeesModal = ({ open, close, editId }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const inputRefProfile = useRef();
  const [profession, setProfession] = useState("");
  const [previewFile, setPreviewFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [resetAdminData, setResetAdminData] = useState(false);
  const [presentAddress, setPresentAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });
  const [permenantAddress, setPermanantAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation Check
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [dobError, setdobError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [employeeIdError, setEmployeeIdError] = useState("");
  const [maritialStatusError, setMaritialStatusError] = useState("");
  const [aboutMeError, setAboutMeError] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [preAddressLine1Error, setPreAddressLine1Error] = useState("");
  const [preAddressLine2Error, setPreAddressLine2Error] = useState("");
  const [preAddressCityError, setPreAddressCityError] = useState("");
  const [preAddressStateError, setPreAddressStateError] = useState("");
  const [preAddressCountryError, setPreAddressCountryError] = useState("");
  const [preAddressPinError, setPreAddressPinError] = useState("");

  const [perAddressLine1Error, setPerAddressLine1Error] = useState("");
  const [perAddressLine2Error, setPerAddressLine2Error] = useState("");
  const [perAddressCityError, setPerAddressCityError] = useState("");
  const [perAddressStateError, setPerAddressStateError] = useState("");
  const [perAddressCountryError, setPerAddressCountryError] = useState("");
  const [perAddressPinError, setPerAddressPinError] = useState("");

  const [panNumberError, setPanNumberError] = useState("");
  const [aadhaarNumberError, setAadharNumberError] = useState("");
  const [employeeTypeError, setEmployeeTypeError] = useState("");
  const [adminTypeError, setAdminTypeError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [dojError, setDojError] = useState("");
  const [createPasswordError, setCreatePasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [previewFileError, setPrevieFileError] = useState("");

  const [invokeEmployee, setInvokeEmployee] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [invokeEditAdminData, setInvokeEditAdminData] = useState(false);

  const [management, setManagement] = useState([
    {
      name: "Social Media",
      status: false,
    },
    {
      name: "Tournament Management",
      status: false,
    },
    {
      name: "Ad-control Management",
      status: false,
    },
  ]);

  const [workExperirence, setWorkExperience] = useState([]);
  const [educationalQual, setEducationalQual] = useState([]);

  const [addAdminData, setAddAdminData] = useState({
    userType: "ADMINS",
    adminType: "",
    serviceType: null,
    firstName: "",
    lastName: "",
    nickName: "",
    email: "",
    gender: "",
    employeeId: "",
    dob: "",
    dateOfJoining: "",
    phoneCode: "",
    phoneNumber: "",
    status: "",
    maritalStatus: "",
    employeeType: "",
    aboutMe: "",
    avatar: "",
    password: "",
    panNumber: "",
    aadhaarNumber: "",
    workExperiance: null,
    educationalQulification: null,
    privileges: [],
  });

  // get Countycode number
  const getPhoneNumber = (code, phoneNumber) => {
    setAddAdminData((prev) => ({ ...prev, phoneCode: code }));
    setAddAdminData((prev) => ({ ...prev, phoneNumber: phoneNumber }));
  };

  // addAdminChangeHandler
  const addAdminChangeHandler = (ev) => {
    setAddAdminData((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };

  // image upload
  const handleFileUpload = (ev) => {
    const fileUploaded = ev.target.files[0];
    let acceptProfileFileTypes = fileUploaded.type.match(/^image\/(jpe?g|png)/);
    if (fileUploaded && acceptProfileFileTypes) {
      if (fileUploaded.size < 5242880) {
        setPreviewFile(window.URL.createObjectURL(fileUploaded));
        setPrevieFileError("");
        setImgFile(fileUploaded);
      }
    }
  };

  //  Upload Images
  const uploadProfileImg = async () => {
    let valid = addAdminValidations();
    if (valid) {
      if (previewFile !== null) {
        let formData = new FormData();
        formData.append("image", imgFile);
        formData.append("oldImage", addAdminData?.avatar);
        let response = await invokeFormDataApi(
          config.baseUrl + apiList.singleImage,
          formData
        );
        if (response.customcode === 200) {
          setAddAdminData((prev) => ({
            ...prev,
            avatar: response.data.imageUrl,
          }));
          toast.success("Image uploaded successfully");
          setInvokeEditAdminData(true);
        } else {
          alert("Something went wrong");
        }
      } else {
        setInvokeEditAdminData(true);
      }
    } else {
      toast.error("Please enter the required fields");
    }
  };

  // add admin data validations
  const addAdminValidations = () => {
    let validationErrors = false;

    if (addAdminData.firstName === "") {
      validationErrors = true;
      setFirstNameError("Please enter the firstName");
    }
    if (addAdminData.lastName === "") {
      validationErrors = true;
      setLastNameError("Please enter the lastName");
    }
    if (addAdminData.dob === "") {
      validationErrors = true;
      setdobError("Please select the Date of birth");
    }
    if (addAdminData.gender === "" || addAdminData.gender === "select") {
      validationErrors = true;
      setGenderError("Please select the gender");
    }
    if (addAdminData.employeeId === "") {
      validationErrors = true;
      setEmployeeIdError("Please enter the employeeId");
    }
    if (
      addAdminData.maritalStatus === "" ||
      addAdminData.maritalStatus === "select"
    ) {
      validationErrors = true;
      setMaritialStatusError("Please select the Maritial Status");
    }
    if (addAdminData.aboutMe === "") {
      validationErrors = true;
      setAboutMeError("Please enter about me");
    }
    if (addAdminData.nickName === "") {
      validationErrors = true;
      setNickNameError("Please enter nick name");
    }
    if (addAdminData.phoneCode === "" && addAdminData.phoneNumber === "") {
      validationErrors = true;
      setPhoneNumberError("Please enter phone number");
    }
    if (addAdminData.email === "") {
      validationErrors = true;
      setEmailError("Please enter email");
    }
    if (presentAddress.addressLine1 === "") {
      validationErrors = true;
      setPreAddressLine1Error("Please enter addressline1");
    }
    if (presentAddress.addressLine2 === "") {
      validationErrors = true;
      setPreAddressLine2Error("Please enter addressline2");
    }
    if (presentAddress.city === "") {
      validationErrors = true;
      setPreAddressCityError("Please enter city");
    }
    if (presentAddress.state === "") {
      validationErrors = true;
      setPreAddressStateError("Please enter state");
    }
    if (presentAddress.country === "") {
      validationErrors = true;
      setPreAddressCountryError("Please enter country");
    }
    if (presentAddress.postalCode === "") {
      validationErrors = true;
      setPreAddressPinError("Please enter postalCode");
    }
    if (permenantAddress.addressLine1 === "") {
      validationErrors = true;
      setPerAddressLine1Error("Please enter addressline1");
    }
    if (permenantAddress.addressLine2 === "") {
      validationErrors = true;
      setPerAddressLine2Error("Please enter addressline2");
    }
    if (permenantAddress.city === "") {
      validationErrors = true;
      setPerAddressCityError("Please enter city");
    }
    if (permenantAddress.state === "") {
      validationErrors = true;
      setPerAddressStateError("Please enter state");
    }
    if (permenantAddress.country === "") {
      validationErrors = true;
      setPerAddressCountryError("Please enter country");
    }
    if (permenantAddress.postalCode === "") {
      validationErrors = true;
      setPerAddressPinError("Please enter postalCode");
    }
    if (addAdminData.panNumber === "") {
      validationErrors = true;
      setPanNumberError("Please enter pan number");
    }
    if (addAdminData.aadhaarNumber === "") {
      validationErrors = true;
      setAadharNumberError("Please enter aadhaar number");
    }
    if (
      addAdminData.employeeType === "" ||
      addAdminData.employeeType === "select"
    ) {
      validationErrors = true;
      setEmployeeTypeError("Please select employee Type");
    }
    if (addAdminData.adminType === "" || addAdminData.adminType === "select") {
      validationErrors = true;
      setAdminTypeError("Please select admin Type");
    }
    if (addAdminData.status === "" || addAdminData.status === "select") {
      validationErrors = true;
      setStatusError("Please select status Type");
    }
    if (addAdminData.dateOfJoining === "") {
      validationErrors = true;
      setDojError("Please enter date of joining");
    }
    // if (addAdminData.password === "") {
    //   validationErrors = true;
    //   setCreatePasswordError("Please enter create password");
    // }
    // if (confirmPassword === "") {
    //   validationErrors = true;
    //   setConfirmPasswordError("Please enter confirm password");
    // }

    if (addAdminData.password !== "" && confirmPassword !== "") {
      if (addAdminData.password !== confirmPassword) {
        validationErrors = true;
        toast.error("Passwords are not same");
      }
    }

    if (previewFile === null && addAdminData.avatar === "") {
      validationErrors = true;
      setPrevieFileError("please add profile image");
    }

    let copy = [...workExperirence];
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].companyName === "") {
        validationErrors = true;
        copy[i].companyNameError = "Please enter company name";
      }
      if (copy[i].jobTitle === "") {
        validationErrors = true;
        copy[i].jobTitleError = "Please enter job Title";
      }
      if (copy[i].from === "") {
        validationErrors = true;
        copy[i].fromError = "Please enter From Date";
      }
      if (copy[i].to === "") {
        validationErrors = true;
        copy[i].toError = "Please enter To Date";
      }
      setWorkExperience(copy);
    }

    let copyEdu = [...educationalQual];
    for (let j = 0; j < copyEdu.length; j++) {
      if (copyEdu[j].institutionName === "") {
        validationErrors = true;
        copyEdu[j].institutionNameError = "Please enter institution name";
      }
      if (copyEdu[j].degree === "") {
        validationErrors = true;
        copyEdu[j].degreeError = "Please enter degree";
      }
      if (copyEdu[j].dateOfCompletion === "") {
        validationErrors = true;
        copyEdu[j].dateOfCompletionError = "Please enter Date of completion";
      }
      setEducationalQual(copyEdu);
    }

    if (!validationErrors) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const editAdminFunc = async () => {
      let params = {
        ...addAdminData,
      };
      params._id = editId;
      params.presentAddress = presentAddress;
      params.permanentAddress = permenantAddress;
      params.workExperiance = workExperirence;
      params.educationalQulification = educationalQual;
      params.serviceType =
        addAdminData.adminType === "SUBADMINS" ? ["ALL"] : ["EMPLOYEES"];
      const response = await invokeApi(
        config.baseUrl + apiList.editAdmin,
        params,
        cookies
      );
      responseUtils.showToster(response);
      if (response.customcode === 200) {
        setResetAdminData(true);
        close();
      } else if (response.customcode === 201) {
        navigate("/logout");
      } else {
        alert("Something went wrong");
      }
    };
    if (invokeEditAdminData) {
      setInvokeEditAdminData(false);
      editAdminFunc();
    }
  }, [
    addAdminData,
    close,
    cookies,
    editId,
    educationalQual,
    invokeEditAdminData,
    navigate,
    permenantAddress,
    presentAddress,
    workExperirence,
  ]);

  // Resetting add admin data while closing the modal
  useEffect(() => {
    const resetAddAdmin = () => {
      setPreviewFile(null);
      setPresentAddress({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        postalCode: null,
      });
      setPermanantAddress({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        postalCode: null,
      });
      setWorkExperience([
        {
          companyName: "",
          jobTitle: "",
          from: "",
          to: "",
        },
      ]);
      setEducationalQual([
        {
          institutionName: "",
          degree: "",
          dateOfCompletion: "",
        },
      ]);

      setFirstNameError("");
      setLastNameError("");
      setdobError("");
      setGenderError("");
      setEmployeeIdError("");
      setMaritialStatusError("");
      setAboutMeError("");
      setNickNameError("");
      setPhoneNumberError("");
      setEmailError("");
      setPreAddressLine1Error("");
      setPreAddressLine2Error("");
      setPreAddressCityError("");
      setPreAddressStateError("");
      setPreAddressCountryError("");
      setPreAddressPinError("");
      setPerAddressLine1Error("");
      setPerAddressLine2Error("");
      setPerAddressCityError("");
      setPerAddressStateError("");
      setPerAddressCountryError("");
      setPerAddressPinError("");
      setPanNumberError("");
      setAadharNumberError("");
      setEmployeeTypeError("");
      setAdminTypeError("");
      setStatusError("");
      setDojError("");
      setCreatePasswordError("");
      setConfirmPasswordError("");
      setPrevieFileError("");
    };
    if (resetAdminData) {
      setResetAdminData(false);
      resetAddAdmin();
    }
  }, [resetAdminData]);

  // get template data
  useEffect(() => {
    const getEmployee = async () => {
      let params = {
        _id: editId,
      };
      let response = await invokeApi(
        config.baseUrl + apiList.getAdminDetail,
        params,
        cookies
      );

      if (response.customcode === 200) {
        setAddAdminData({
          userType: "ADMINS",
          adminType: response.data.adminType,
          serviceType: null,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          nickName: response.data.nickName,
          email: response.data.email,
          gender: response.data.gender,
          employeeId: response.data.employeeId,
          dob: parseISO(response.data.dob),
          dateOfJoining: parseISO(response.data.dateOfJoining),
          phoneCode: response.data.phone.code,
          phoneNumber: response.data.phone.number,
          status: response.data.status,
          maritalStatus: response.data.maritalStatus,
          employeeType: response.data.employeeType,
          aboutMe: response.data.aboutMe,
          avatar: response.data.avatar,
          password: "",
          panNumber: response.data.panNumber,
          aadhaarNumber: response.data.aadhaarNumber,
          workExperiance: null,
          educationalQulification: null,
          privileges: [],
        });
        setPresentAddress({
          addressLine1: response.data.presentAddress.addressLine1,
          addressLine2: response.data.presentAddress.addressLine2,
          city: response.data.presentAddress.city,
          state: response.data.presentAddress.state,
          country: response.data.presentAddress.country,
          postalCode: response.data.presentAddress.postalCode,
        });
        setPermanantAddress({
          addressLine1: response.data.permanentAddress.addressLine1,
          addressLine2: response.data.permanentAddress.addressLine2,
          city: response.data.permanentAddress.city,
          state: response.data.permanentAddress.state,
          country: response.data.permanentAddress.country,
          postalCode: response.data.permanentAddress.postalCode,
        });
        let copyWkExp = [...workExperirence];
        response.data.workExperiance.map((el) =>
          copyWkExp.push({
            companyName: el.companyName,
            companyNameError: "",
            jobTitle: el.jobTitle,
            jobTitleError: "",
            from: parseISO(el.from),
            fromError: "",
            to: parseISO(el.to),
            toError: "",
          })
        );
        setWorkExperience(copyWkExp);

        let copyEduQlf = [...educationalQual];
        response.data.educationalQulification.map((el) =>
          copyEduQlf.push({
            institutionName: el.institutionName,
            institutionNameError: "",
            degree: el.degree,
            degreeError: "",
            dateOfCompletion: parseISO(el.dateOfCompletion),
            dateOfCompletionError: "",
          })
        );
        setEducationalQual(copyEduQlf);
        setIsLoading(false);
      } else if (response.customcode === 201) {
        navigate("logout");
      } else {
        alert("Something went wrong");
      }
    };
    if (invokeEmployee) {
      setInvokeEmployee(false);
      getEmployee();
    }
  }, [
    cookies,
    editId,
    educationalQual,
    invokeEmployee,
    navigate,
    workExperirence,
  ]);

  return (
    <>
      {open && !isLoading && (
        <div className="fixed z-10 inset-0 bg-opacity-60 bg-black  flex justify-center items-center">
          <div className="flex flex-col w-[90%] dark:border-white">
            {/* card header */}
            <div className="flex flex-row w-full items-center  justify-between px-6 py-4 bg-white dark:bg-[#393939]  rounded-tr-2xl  rounded-tl-2xl">
              <div className="flex flex-row items-center space-x-6">
                {/* <img src="/assets/png/add.png" /> */}
                <IoMdAddCircle
                  size={30}
                  className="text-black dark:text-white"
                />
                <h5 className="text-black font-semibold dark:text-white">
                  Edit Employee
                </h5>
              </div>

              <MdClose
                className="cursor-pointer text-black dark:text-white"
                size={25}
                onClick={() => {
                  setResetAdminData(true);
                  close();
                }}
              />
            </div>

            <div className="flex flex-row w-full h-[600px] text-[#242424] dark:text-[#ffffff] bg-white dark:bg-[#393939]">
              {/* left */}
              <div className="flex flex-col w-[70%] border-r-slate-200 border-r-[1px] h-full overflow-y-scroll">
                {/*Basic information header */}
                <div className="bg-[#F7F7F9] w-full">
                  <h5 className="text-[#242424] font-normal p-5">
                    Basic Information
                  </h5>
                </div>
                <div className="flex flex-row p-5 w-full space-x-5">
                  <div className="w-1/2 flex flex-col space-y-3">
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="First Name *"
                        name="firstName"
                        value={addAdminData.firstName}
                        onChange={(ev) => {
                          addAdminChangeHandler(ev);
                          setFirstNameError("");
                        }}
                      />
                      <p className="text-red-500 text-sm">{firstNameError}</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <DatePicker
                        className="input-outline"
                        selected={addAdminData.dob}
                        onChange={(date) => {
                          console.log("date ", date);
                          setAddAdminData((prev) => ({ ...prev, dob: date }));
                          setdobError("");
                        }}
                        placeholderText={"Date of Birth *"}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown={true}
                        showMonthDropdown={true}
                      />
                      <p className="text-red-500 text-sm">{dobError}</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="Employee ID *"
                        name="employeeId"
                        value={addAdminData.employeeId}
                        onChange={(ev) => {
                          addAdminChangeHandler(ev);
                          setEmployeeIdError("");
                        }}
                      />
                      <p className="text-red-500 text-sm">{employeeIdError}</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <textarea
                        className="input-outline"
                        rows="4"
                        cols="50"
                        placeholder="About Me *"
                        name="aboutMe"
                        value={addAdminData.aboutMe}
                        onChange={(ev) => {
                          addAdminChangeHandler(ev);
                          setAboutMeError("");
                        }}
                      />
                      <p className="text-red-500 text-sm">{aboutMeError}</p>
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col space-y-3">
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="Last Name *"
                        name="lastName"
                        value={addAdminData.lastName}
                        onChange={(ev) => {
                          addAdminChangeHandler(ev);
                          setLastNameError("");
                        }}
                      />
                      <p className="text-red-500 text-sm">{lastNameError}</p>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <select
                        // value={addAdminData.gender}
                        onClick={(ev) => {
                          setAddAdminData((prev) => ({
                            ...prev,
                            gender: ev.target.value,
                          }));
                          setGenderError("");
                        }}
                        className="input-outline"
                      >
                        <option value="select" className="text-black">
                          Gender *
                        </option>
                        <option
                          value="MALE"
                          selected={
                            addAdminData.gender === "MALE" ? true : false
                          }
                          className="text-black"
                        >
                          Male
                        </option>
                        <option
                          value="FEMALE"
                          selected={
                            addAdminData.gender === "FEMALE" ? true : false
                          }
                          className="text-black"
                        >
                          FeMale
                        </option>
                        <option
                          value="OTHERS"
                          selected={
                            addAdminData.gender === "OTHERS" ? true : false
                          }
                          className="text-black"
                        >
                          Others
                        </option>
                      </select>
                      <p className="text-red-500 text-sm">{genderError}</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <select
                        onClick={(ev) => {
                          setAddAdminData((prev) => ({
                            ...prev,
                            maritalStatus: ev.target.value,
                          }));
                          setMaritialStatusError("");
                        }}
                        className="input-outline"
                      >
                        <option value="select" className="text-black">
                          Martial Status *
                        </option>
                        <option
                          value="SINGLE"
                          selected={
                            addAdminData.maritalStatus === "SINGLE"
                              ? true
                              : false
                          }
                          className="text-black"
                        >
                          Single
                        </option>
                        <option
                          value="MARRIED"
                          selected={
                            addAdminData.maritalStatus === "MARRIED"
                              ? true
                              : false
                          }
                          className="text-black"
                        >
                          Married
                        </option>
                      </select>
                      <p className="text-red-500 text-sm">
                        {maritialStatusError}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="Nick Name *"
                        value={addAdminData?.nickName}
                        name="nickName"
                        onChange={(ev) => {
                          addAdminChangeHandler(ev);
                          setNickNameError("");
                        }}
                      />
                      <p className="text-red-500 text-sm">{nickNameError}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="bg-[#F7F7F9] w-full">
                  <h5 className="text-[#242424] font-normal p-5">
                    Contact Details
                  </h5>
                </div>
                <div className="flex flex-row p-5 w-full space-x-5">
                  <div className="w-1/2 flex flex-col space-y-3">
                    <div className="flex flex-col space-y-1">
                      <PhoneNumberInput
                        getPhoneNumber={getPhoneNumber}
                        setPhoneNumberError={setPhoneNumberError}
                        value={`${addAdminData.phoneCode}${addAdminData.phoneNumber}`}
                      />
                      <p className="text-red-500 text-sm">{phoneNumberError}</p>
                    </div>
                    <h5 className="font-semibold text-center">
                      Present Address
                    </h5>
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="Address line 1 *"
                        value={presentAddress.addressLine1}
                        onChange={(ev) => {
                          setPresentAddress((prev) => ({
                            ...prev,
                            addressLine1: ev.target.value,
                          }));
                          setPreAddressLine1Error("");
                        }}
                      />
                      <p className="text-red-500 text-sm">
                        {preAddressLine1Error}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="Address line 2 *"
                        value={presentAddress.addressLine2}
                        onChange={(ev) => {
                          setPresentAddress((prev) => ({
                            ...prev,
                            addressLine2: ev.target.value,
                          }));
                          setPreAddressLine2Error("");
                        }}
                      />
                      <p className="text-red-500 text-sm">
                        {preAddressLine2Error}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="City *"
                        value={presentAddress.city}
                        onChange={(ev) => {
                          setPresentAddress((prev) => ({
                            ...prev,
                            city: ev.target.value,
                          }));
                          setPreAddressCityError("");
                        }}
                      />
                      <p className="text-red-500 text-sm">
                        {preAddressCityError}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="State *"
                        value={presentAddress.state}
                        onChange={(ev) => {
                          setPresentAddress((prev) => ({
                            ...prev,
                            state: ev.target.value,
                          }));
                          setPreAddressStateError("");
                        }}
                      />
                      <p className="text-red-500 text-sm">
                        {preAddressStateError}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="Country *"
                        value={presentAddress.country}
                        onChange={(ev) => {
                          setPresentAddress((prev) => ({
                            ...prev,
                            country: ev.target.value,
                          }));
                          setPreAddressCountryError("");
                        }}
                      />
                      <p className="text-red-500 text-sm">
                        {preAddressCountryError}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="Pincode *"
                        value={presentAddress.postalCode}
                        onChange={(ev) => {
                          setPresentAddress((prev) => ({
                            ...prev,
                            postalCode: ev.target.value,
                          }));
                          setPreAddressPinError("");
                        }}
                      />
                      <p className="text-red-500 text-sm">
                        {preAddressPinError}
                      </p>
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col space-y-3">
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="E-mail ID *"
                        name="email"
                        value={addAdminData.email}
                        onChange={(ev) => {
                          addAdminChangeHandler(ev);
                          setEmailError("");
                        }}
                      />
                      <p className="text-red-500 text-sm">{emailError}</p>
                    </div>

                    <h5 className="font-semibold text-center">
                      Permenant Address
                    </h5>
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="Address line 1 *"
                        value={permenantAddress.addressLine1}
                        onChange={(ev) => {
                          setPermanantAddress((prev) => ({
                            ...prev,
                            addressLine1: ev.target.value,
                          }));
                          setPerAddressLine1Error("");
                        }}
                      />
                      <p className="text-red-500 text-sm">
                        {perAddressLine1Error}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="Address line 2 *"
                        value={permenantAddress.addressLine2}
                        onChange={(ev) => {
                          setPermanantAddress((prev) => ({
                            ...prev,
                            addressLine2: ev.target.value,
                          }));
                          setPerAddressLine2Error("");
                        }}
                      />
                      <p className="text-red-500 text-sm">
                        {perAddressLine2Error}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="City *"
                        value={permenantAddress.city}
                        onChange={(ev) => {
                          setPermanantAddress((prev) => ({
                            ...prev,
                            city: ev.target.value,
                          }));
                          setPerAddressCityError("");
                        }}
                      />
                      <p className="text-red-500 text-sm">
                        {perAddressCityError}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="State *"
                        value={permenantAddress.state}
                        onChange={(ev) => {
                          setPermanantAddress((prev) => ({
                            ...prev,
                            state: ev.target.value,
                          }));
                          setPerAddressStateError("");
                        }}
                      />
                      <p className="text-red-500 text-sm">
                        {perAddressStateError}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="Country *"
                        value={permenantAddress.country}
                        onChange={(ev) => {
                          setPermanantAddress((prev) => ({
                            ...prev,
                            country: ev.target.value,
                          }));
                          setPerAddressCountryError("");
                        }}
                      />
                      <p className="text-red-500 text-sm">
                        {perAddressCountryError}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="Pincode *"
                        value={permenantAddress.postalCode}
                        onChange={(ev) => {
                          setPermanantAddress((prev) => ({
                            ...prev,
                            postalCode: ev.target.value,
                          }));
                          setPerAddressPinError("");
                        }}
                      />
                      <p className="text-red-500 text-sm">
                        {perAddressPinError}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Identity info Details */}
                <div className="bg-[#F7F7F9] w-full">
                  <h5 className="text-[#242424] font-normal p-5">
                    Identity Information
                  </h5>
                </div>
                <div className="flex flex-row p-5 w-full space-x-5">
                  <div className="w-1/2 flex flex-col space-y-3">
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="Pan number *"
                        name="panNumber"
                        value={addAdminData.panNumber}
                        onChange={(ev) => {
                          addAdminChangeHandler(ev);
                          setPanNumberError("");
                        }}
                      />
                      <p className="text-red-500 text-sm">{panNumberError}</p>
                    </div>
                    <textarea
                      className="input-outline"
                      rows="4"
                      cols="50"
                      placeholder="Comments"
                    />
                  </div>
                  <div className="w-1/2 flex flex-col space-y-3">
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="Aadhaar number *"
                        name="aadhaarNumber"
                        value={addAdminData.aadhaarNumber}
                        onChange={(ev) => {
                          setAadharNumberError("");
                          addAdminChangeHandler(ev);
                        }}
                      />
                      <p className="text-red-500 text-sm">
                        {aadhaarNumberError}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Select Roles */}
                <div className="bg-[#F7F7F9] w-full">
                  <h5 className="text-[#242424] font-normal p-5">
                    Work Information
                  </h5>
                </div>
                <div className="flex flex-row p-5 w-full space-x-5">
                  <div className="w-1/2 flex flex-col space-y-3">
                    <div className="flex flex-col space-y-1">
                      <select
                        onChange={(ev) => {
                          setAddAdminData((prev) => ({
                            ...prev,
                            employeeType: ev.target.value,
                          }));
                          setEmployeeTypeError("");
                        }}
                        className="input-outline"
                      >
                        <option value="select" className="text-black">
                          Employee Type*
                        </option>
                        <option
                          value="TEMPORARY"
                          selected={
                            addAdminData?.employeeType === "TEMPORARY"
                              ? true
                              : false
                          }
                          className="text-black"
                        >
                          Temporary
                        </option>
                        <option
                          value="PERMANENT"
                          selected={
                            addAdminData?.employeeType === "PERMANENT"
                              ? true
                              : false
                          }
                          className="text-black"
                        >
                          Permanent
                        </option>
                      </select>
                      <p className="text-red-500 text-sm">
                        {employeeTypeError}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <select
                        onChange={(ev) => {
                          setProfession(ev.target.value);
                          setAddAdminData((prev) => ({
                            ...prev,
                            adminType: ev.target.value,
                          }));
                          setAdminTypeError("");
                        }}
                        className="input-outline"
                      >
                        <option value="select" className="text-black">
                          Admin Type*
                        </option>
                        <option
                          value="SUBADMINS"
                          selected={
                            addAdminData?.adminType === "SUBADMINS"
                              ? true
                              : false
                          }
                          className="text-black"
                        >
                          Sub Admin
                        </option>
                        <option
                          value="HRADMINS"
                          selected={
                            addAdminData?.adminType === "HRADMINS"
                              ? true
                              : false
                          }
                          className="text-black"
                        >
                          HR Admin
                        </option>
                        <option
                          value="EMPLOYEES"
                          selected={
                            addAdminData?.adminType === "EMPLOYEES"
                              ? true
                              : false
                          }
                          className="text-black"
                        >
                          Employee
                        </option>
                      </select>
                      <p className="text-red-500 text-sm">{adminTypeError}</p>
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col space-y-3">
                    <div className="flex flex-col space-y-1">
                      <DatePicker
                        className="input-outline"
                        selected={addAdminData.dateOfJoining}
                        onChange={(date) => {
                          setAddAdminData((prev) => ({
                            ...prev,
                            dateOfJoining: date,
                          }));
                          setDojError("");
                        }}
                        placeholderText={"Date of joining *"}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown={true}
                        showMonthDropdown={true}
                      />
                      <p className="text-red-500 text-sm">{dojError}</p>
                    </div>
                  </div>
                </div>

                {/*Employes shows */}
                {profession === "Employee" && (
                  <div className="flex flex-col space-y-4 p-5">
                    {management?.map((e, idx) => (
                      <div
                        key={idx}
                        className="flex flex-row items-center justify-between"
                      >
                        <h5 className="">{e.name}</h5>
                        <input
                          type={"checkbox"}
                          checked={e.status === true ? true : false}
                          className="h-4 w-4"
                          onChange={() => {
                            let copy = [...management];
                            copy.map((el) => (el.status = false));
                            copy[idx].status = true;
                            setManagement(copy);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* WORK Experience */}
                <div className="bg-[#F7F7F9] w-full flex items-center justify-between p-5">
                  <h5 className="text-[#242424] font-normal">
                    Work Experience
                  </h5>
                  <IoMdAddCircleOutline
                    size={25}
                    className="cursor-pointer text-black"
                    onClick={() => {
                      let copy = [...workExperirence];
                      copy.push({
                        companyName: "",
                        companyNameError: "",
                        jobTitle: "",
                        jobTitleError: "",
                        from: "",
                        fromError: "",
                        to: "",
                        toError: "",
                      });
                      setWorkExperience(copy);
                    }}
                  />
                </div>
                {workExperirence?.map((el, idx) => (
                  <div key={idx} className="relative flex">
                    {workExperirence.length > 1 && (
                      <MdRemoveCircleOutline
                        className="absolute right-4 top-[-1px] cursor-pointer"
                        size={20}
                        onClick={() => {
                          let copy = [...workExperirence];
                          copy.splice(idx, 1);
                          setWorkExperience(copy);
                        }}
                      />
                    )}
                    <div className="flex flex-row p-5 w-full space-x-5">
                      <div className="w-1/2 flex flex-col space-y-3">
                        <div className="flex flex-col space-y-1">
                          <input
                            className="input-outline"
                            placeholder="Company Name *"
                            value={el.companyName}
                            onChange={(ev) => {
                              let copy = [...workExperirence];
                              copy[idx].companyName = ev.target.value;
                              copy[idx].companyNameError = "";
                              setWorkExperience(copy);
                            }}
                          />
                          <p className="text-red-500 text-sm">
                            {el.companyNameError}
                          </p>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <DatePicker
                            className="input-outline"
                            selected={el.from}
                            onChange={(date) => {
                              let copy = [...workExperirence];
                              copy[idx].from = date;
                              copy[idx].fromError = "";
                              setWorkExperience(copy);
                            }}
                            placeholderText={"From *"}
                            dateFormat="dd/MM/yyyy"
                            showYearDropdown={true}
                            showMonthDropdown={true}
                          />
                          <p className="text-red-500 text-sm">{el.fromError}</p>
                        </div>
                      </div>
                      <div className="w-1/2 flex flex-col space-y-3">
                        <div className="flex flex-col space-y-1">
                          <input
                            className="input-outline"
                            placeholder="Job Title *"
                            value={el.jobTitle}
                            onChange={(ev) => {
                              let copy = [...workExperirence];
                              copy[idx].jobTitle = ev.target.value;
                              copy[idx].jobTitleError = "";
                              setWorkExperience(copy);
                            }}
                          />
                          <p className="text-red-500 text-sm">
                            {el.jobTitleError}
                          </p>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <DatePicker
                            className="input-outline"
                            selected={el.to}
                            onChange={(date) => {
                              let copy = [...workExperirence];
                              copy[idx].to = date;
                              copy[idx].toError = "";
                              setWorkExperience(copy);
                            }}
                            placeholderText={"To *"}
                            dateFormat="dd/MM/yyyy"
                            showYearDropdown={true}
                            showMonthDropdown={true}
                          />
                          <p className="text-red-500 text-sm">{el.toError}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Educational Qualification */}
                <div className="bg-[#F7F7F9] w-full flex items-center justify-between p-5">
                  <h5 className="text-[#242424] font-normal">
                    Educational Qualification
                  </h5>
                  <IoMdAddCircleOutline
                    size={25}
                    className="cursor-pointer text-black"
                    onClick={() => {
                      let copy = [...educationalQual];
                      copy.push({
                        institutionName: "",
                        institutionNameError: "",
                        degree: "",
                        degreeError: "",
                        dateOfCompletion: "",
                        dateOfCompletionError: "",
                      });
                      setEducationalQual(copy);
                    }}
                  />
                </div>
                {educationalQual?.map((el, idx) => (
                  <div key={idx} className="relative flex">
                    {educationalQual?.length > 1 && (
                      <MdRemoveCircleOutline
                        className="absolute right-4 top-[-1px] cursor-pointer"
                        size={20}
                        onClick={() => {
                          let copy = [...educationalQual];
                          copy.splice(idx, 1);
                          setEducationalQual(copy);
                        }}
                      />
                    )}
                    <div className="flex flex-row p-5 w-full space-x-5">
                      <div className="w-1/2 flex flex-col space-y-3">
                        <div className="flex flex-col space-y-1">
                          <input
                            className="input-outline"
                            placeholder="Institute Name *"
                            value={el.institutionName}
                            onChange={(ev) => {
                              let copy = [...educationalQual];
                              copy[idx].institutionName = ev.target.value;
                              copy[idx].institutionNameError = "";
                              setEducationalQual(copy);
                            }}
                          />
                          <p className="text-red-500 text-sm">
                            {el.institutionNameError}
                          </p>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <DatePicker
                            className="input-outline"
                            selected={el.dateOfCompletion}
                            onChange={(date) => {
                              let copy = [...educationalQual];
                              copy[idx].dateOfCompletion = date;
                              copy[idx].dateOfCompletionError = "";
                              setEducationalQual(copy);
                            }}
                            placeholderText={"Date of complition *"}
                            dateFormat="dd/MM/yyyy"
                            showYearDropdown={true}
                            showMonthDropdown={true}
                          />
                          <p className="text-red-500 text-sm">
                            {el.dateOfCompletionError}
                          </p>
                        </div>
                      </div>
                      <div className="w-1/2 flex flex-col space-y-3">
                        <div className="flex flex-col space-y-1">
                          <input
                            className="input-outline"
                            placeholder="Degree *"
                            value={el.degree}
                            onChange={(ev) => {
                              let copy = [...educationalQual];
                              copy[idx].degree = ev.target.value;
                              copy[idx].degreeError = "";
                              setEducationalQual(copy);
                            }}
                          />
                          <p className="text-red-500 text-sm">
                            {el.degreeError}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Password Header */}
                <div className="bg-[#F7F7F9] w-full">
                  <h5 className="text-[#242424] font-normal p-5">Password</h5>
                </div>
                <div className="flex flex-row p-5 w-full space-x-5">
                  <div className="w-1/2 flex flex-col space-y-3">
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="Create Password"
                        name="password"
                        onChange={(ev) => {
                          addAdminChangeHandler(ev);
                          setCreatePasswordError("");
                        }}
                      />
                      <p className="text-red-500 text-sm">
                        {createPasswordError}
                      </p>
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col space-y-3">
                    <div className="flex flex-col space-y-1">
                      <input
                        className="input-outline"
                        placeholder="Confirm Password"
                        onChange={(ev) => {
                          setConfirmPassword(ev.target.value);
                          setConfirmPasswordError("");
                        }}
                      />
                      <p className="text-red-500 text-sm">
                        {confirmPasswordError}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Header */}
                <div className="bg-[#F7F7F9] w-full">
                  <h5 className="text-[#242424] font-normal p-5">Status</h5>
                </div>
                <div className="flex flex-row p-5 w-full space-x-5">
                  <div className="w-1/2 flex flex-col space-y-3">
                    <div className="flex flex-col space-y-1">
                      <select
                        onChange={(ev) => {
                          setAddAdminData((prev) => ({
                            ...prev,
                            status: ev.target.value,
                          }));
                          setStatusError("");
                        }}
                        className="input-outline"
                      >
                        <option value="select" className="text-black">
                          Status *
                        </option>
                        <option
                          value="ACTIVE"
                          selected={
                            addAdminData?.status === "ACTIVE" ? true : false
                          }
                          className="text-black"
                        >
                          Active
                        </option>
                        <option
                          value="INACTIVE"
                          selected={
                            addAdminData?.status === "INACTIVE" ? true : false
                          }
                          className="text-black"
                        >
                          In-Active
                        </option>
                      </select>
                      <p className="text-red-500 text-sm">{statusError}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col w-[30%] h-full">
                {/* Profile Types Header */}
                <div className="bg-[#F7F7F9] w-full">
                  <h5 className="text-[#242424] font-normal p-5">
                    Profile Picture
                  </h5>
                </div>
                {/* Avaton Profile */}
                <div className="flex flex-col items-center justify-center h-full space-y-5">
                  <div className="flex flex-col space-y-5 items-center justify-center h-full w-full">
                    <img
                      src={previewFile || addAdminData?.avatar}
                      className="card card-shadow h-[190px] w-[170px]"
                    />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      ref={inputRefProfile}
                      onChange={handleFileUpload}
                    />
                    <p className="text-red-500 text-sm">{previewFileError}</p>
                    <div className="flex flex-row space-x-4">
                      <button
                        className="px-10 py-3 bg-red-500 rounded-md text-white font-semibold"
                        onClick={() => inputRefProfile.current.click()}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* button */}
            <div
              className="h-[50px] flex items-center justify-center bg-blue-500 rounded-bl-2xl rounded-br-2xl cursor-pointer"
              onClick={uploadProfileImg}
            >
              <h5 className="text-[#ffffff] font-semibold">Create</h5>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditEmployeesModal;
