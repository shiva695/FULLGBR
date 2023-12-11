// Import Dependencies
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router";

// Import files
import constants from "../../../json/constants.json";
import responseUtils from "../../../utils/responseUtils";
import { apiList, invokeApi } from "../../../utils/apiServiceUtils";
import { config } from "../../../utils/configUtils";

//Import Components
import Button from "../../general/Button";
import BreadCrumbs from "../../general/BreadCrumbs";
import SingleSelect from "../../general/SingleSelect";
import PhoneCode from "../../general/PhoneCode";
import ConformationPopup from "../../modals/ConformationPopup";

const AddManagers = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);

  //state variables

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState();
  const [gender, setGender] = useState();
  const [avatar, setAvatar] = useState("");
  const [companyPhone, setCompanyPhone] = useState(null);
  const [password, setPassword] = useState();
  const [phonelistModal, setPhonelistModal] = useState(false);
  const [status, setStatus] = useState(constants.ENABLE);
  const [selectlistModal, setSelectlistModal] = useState(false);
  const [selectUserTypelistModal, setSelectUserTypelistModal] = useState(false);
  const [selectGenderlistModal, setSelectGenderlistModal] = useState(false);
  const [confirmRolesPopup, setConfirmRolesPopup] = useState(false);
  const [confirmEditRolesPopup, setConfirmEditRolesPopup] = useState(false);
  const [invokeRolesDetail, setInvokeRolesDetail] = useState(true);
  const [rolesList, setRolesList] = useState([]);
  const [rolesArray, setRolesArray] = useState([]);
  const [privileges, setPrivileges] = useState([]);

  const onClosePopup = () => {
    setConfirmRolesPopup(false);
  };

  const onCloseEditPopup = () => {
    setConfirmEditRolesPopup(false);
  };
  const confirmPopupHandler = (confirmStatus) => {
    if (confirmStatus) {
      rolesHandler();
    } else {
      return null;
    }
  };

  const confirmEditRolesHandler = (confirmStatus) => {
    if (confirmStatus) {
      rolesEditHandler();
    } else {
      return null;
    }
  };

  const getPrivileges = (data) => {
    const value = rolesList.filter((e) => e.role === data);
    return value[0].privileges;
  };
  function fetchPhoneDetails(phoneDetails) {
    let copy = { ...companyPhone };
    copy.code = phoneDetails[0];
    copy.number = phoneDetails[1];
    setCompanyPhone(copy);
  }

  const rolesHandler = async () => {
    let params = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      userType: userType,
      gender: gender.toUpperCase(),
      avatar: avatar,
      privileges: getPrivileges(userType),
      phoneCode: companyPhone?.code,
      phoneNumber: companyPhone?.number,
      password: password,
      status: status,
    };
    const responseData = await invokeApi(
      config.baseUrl + apiList.managersAdd,
      params,
      cookies
    );
    // responseUtils.showToster(responseData);
    if (responseData.customcode === 200) {
      navigate("/managers");
    } else if (responseData.customcode === 211) {
      responseUtils.showToster(responseData);
    }
  };

  //Roles Edit api Handler
  const rolesEditHandler = async () => {
    console.log(location);
    let params = {
      _id: location?.state._id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      userType: userType,
      gender: gender.toUpperCase(),
      avatar: avatar,
      privileges: getPrivileges(userType),
      phoneCode: companyPhone?.code,
      phoneNumber: companyPhone?.number,
      password: password,
      status: status,
    };
    const responseData = await invokeApi(
      config.baseUrl + apiList.managersEdit,
      params,
      cookies
    );
    if (responseData.customcode === 200) {
      navigate("/managers");
    }
  };

  useEffect(() => {
    const roleDetails = async () => {
      let params = {
        _id: location.state._id,
      };
      const responseData = await invokeApi(
        config.baseUrl + apiList.getManagersDetail,
        params,
        cookies
      );
      if (responseData.customcode === 200) {
        setFirstName(responseData.data.firstName);
        setStatus(responseData.data.status);
        setLastName(responseData.data.lastName);
        setEmail(responseData.data.email);
        setUserType(responseData.data.userType);
        setAvatar(responseData.data.avatar);
        setGender(responseData.data.gender);
        setPassword(responseData.data.password);
        setCompanyPhone(responseData.data?.phone);
        setPrivileges(responseData.data.privileges);
      }
    };
    const getActiveRolesList = async () => {
      let response = await invokeApi(
        config.baseUrl + apiList.getActiveRoles,
        {},
        cookies
      );

      if (response.customcode === 200) {
        setRolesList(response.data);
        const rolesArray = [];
        await response.data.forEach((data) => {
          rolesArray.push(data.role);
        });
        setRolesArray(rolesArray);
      }
    };
    if (invokeRolesDetail) {
      setInvokeRolesDetail(false);
      getActiveRolesList();
      if (location.pathname === "/managers/add")
        setCompanyPhone({ code: "+91", number: "" });
      if (location.pathname === "/managers/edit") roleDetails();
    }
  }, [cookies, invokeRolesDetail, location]);

  return (
    <div
      className="card-with-subheading overflow-y-auto"
      onClick={() => {
        setPhonelistModal(false);
        setSelectlistModal(false);
        setSelectGenderlistModal(false);
        setSelectUserTypelistModal(false);
      }}
    >
      <div className="sub-heading">
        <div className="flex w-full card gap-4 h-fit mb-1 mt-0">
          <div className="flex gap-x-5">
            <div
              className={
                location.pathname.includes(constants.ROLESNAVIGATE)
                  ? "font-bold flex gap-1 cursor-pointer"
                  : "flex gap-1 cursor-pointer"
              }
              onClick={() => {
                navigate(constants.ROLESNAVIGATE);
              }}
            >
              {constants.ROLES}
            </div>
          </div>
          <div className="flex gap-x-5">
            <div
              className={
                location.pathname.includes(constants.MANAGERSNAVIGATE)
                  ? "font-bold flex gap-1 cursor-pointer"
                  : "flex gap-1 cursor-pointer"
              }
              onClick={() => {
                navigate(constants.MANAGERSNAVIGATE);
              }}
            >
              {constants.MANAGERS}
            </div>
          </div>
        </div>
      </div>

      <div className="card-content">
        <div className="flex flex-row pb-5 justify-between items-center mb-5 dark:text-white border-b border-grey-400">
          <BreadCrumbs
            nav1={"Managers"}
            nav2={location.pathname === "/managers/add" ? "Add" : "Edit"}
            link={constants.MANAGERSNAVIGATE}
          />
          <div
            className="w-[150px]"
            onClick={() =>
              location.pathname === "/managers/add"
                ? setConfirmRolesPopup(true)
                : setConfirmEditRolesPopup(true)
            }
          >
            <Button text={constants.SUBMIT} />
          </div>
        </div>

        <div className="flex flex-wrap gap-y-4 m-10">
          <div className=" input-main-div">
            <div className="dark:text-white">{constants.FIRSTNAME}</div>
            <div className="input-wrapping-div">
              <input
                className="form-input-text "
                value={firstName}
                type="text"
                placeholder="First Name"
                onChange={(ev) => setFirstName(ev.target.value)}
              />
            </div>
          </div>
          <div className="input-main-div">
            <div className="dark:text-white">{constants.LASTNAME}</div>
            <div className="input-wrapping-div">
              <input
                className="form-input-text "
                value={lastName}
                type="text"
                placeholder="Last Name"
                onChange={(ev) => setLastName(ev.target.value)}
              />
            </div>
          </div>
          <div className="input-main-div">
            <div className="dark:text-white">{constants.EMAIL}</div>
            <div className="input-wrapping-div">
              <input
                className="form-input-text "
                value={email}
                type="text"
                placeholder="Email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>
          </div>
          <div className="input-main-div">
            <SingleSelect
              title={constants.USERTYPE}
              dataArray={rolesArray}
              fetchInputValue={(val) => {
                setUserType(val);
              }}
              defaultValue={userType}
              showSearch={false}
              selectlistModal={selectUserTypelistModal}
              setSelectlistModal={setSelectUserTypelistModal}
              height="135"
              width="315"
            />
          </div>

          <div className="input-main-div">
            <SingleSelect
              title={constants.GENDER}
              dataArray={[constants.MALE, constants.FEMALE, constants.OTHERS]}
              fetchInputValue={(val) => {
                setGender(val);
              }}
              defaultValue={gender}
              showSearch={false}
              selectlistModal={selectGenderlistModal}
              setSelectlistModal={setSelectGenderlistModal}
              height="135"
              width="315"
            />
          </div>

          <div className="input-main-div">
            <div>{constants.PHONE}:</div>
            {!!companyPhone && (
              <div>
                <PhoneCode
                  defaultValue={[companyPhone?.code, companyPhone?.number]}
                  fetchPhoneDetails={fetchPhoneDetails}
                  phonelistModal={phonelistModal}
                  setPhonelistModal={setPhonelistModal}
                />
              </div>
            )}
          </div>

          <div className="input-main-div">
            <SingleSelect
              title={constants.STATUS}
              dataArray={[constants.ENABLE, constants.DISABLE]}
              fetchInputValue={(val) => {
                setStatus(val);
              }}
              defaultValue={status}
              showSearch={false}
              selectlistModal={selectlistModal}
              setSelectlistModal={setSelectlistModal}
              height="15"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-between m-5"></div>
      </div>

      <ConformationPopup
        open={confirmRolesPopup}
        close={onClosePopup}
        text={constants.ADDMANAGERPOPUPTEXT}
        heading={constants.ADDMANAGERPOPUPHEADING}
        submitHandler={confirmPopupHandler}
      />

      <ConformationPopup
        open={confirmEditRolesPopup}
        close={onCloseEditPopup}
        text={constants.EDITMANAGERPOPUPTEXT}
        heading={constants.EDITMANAGERPOPUPHEADING}
        submitHandler={confirmEditRolesHandler}
      />
    </div>
  );
};

export default AddManagers;
