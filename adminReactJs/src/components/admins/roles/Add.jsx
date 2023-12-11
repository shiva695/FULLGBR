// Import Dependencies
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router";

// Import files
import constants from "../../../json/constants.json";
import Privileges from "../../../json/privilege.json";
import responseUtils from "../../../utils/responseUtils";
import { apiList, invokeApi } from "../../../utils/apiServiceUtils";
import { config } from "../../../utils/configUtils";

//Import Components
import Button from "../../general/Button";
import BreadCrumbs from "../../general/BreadCrumbs";
import SingleSelect from "../../general/SingleSelect";
import ConformationPopup from "../../modals/ConformationPopup";

const Add = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);

  //state variables

  // const privilageData=cookies[constants.PRIVILEGE]?.privileges;
  //  console.log("cookies ", privilageData);

  const [role, setRole] = useState("");
  const [status, setStatus] = useState(constants.ENABLE);
  const [selectlistModal, setSelectlistModal] = useState(false);
  const [confirmRolesPopup, setConfirmRolesPopup] = useState(false);
  const [confirmEditRolesPopup, setConfirmEditRolesPopup] = useState(false);
  const [invokeRolesDetail, setInvokeRolesDetail] = useState(true);
  const [privilages, setPrivilages] = useState(Privileges);

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

  const rolesHandler = async () => {
    let params = {
      role: role,
      privileges: privilages,
      isSelectedAll: false,
      status: status,
    };
    const responseData = await invokeApi(
      config.baseUrl + apiList.rolesAdd,
      params,
      cookies
    );
    // responseUtils.showToster(responseData);
    if (responseData.customcode === 200) {
      navigate("/roles");
    } else if (responseData.customcode === 211) {
      responseUtils.showToster(responseData);
    }
  };

  //Roles Edit api Handler
  const rolesEditHandler = async () => {
    console.log(location);
    let params = {
      _id: location?.state._id,
      role: role,
      privileges: privilages,
      isSelectedAll: false,
      status: status,
    };
    const responseData = await invokeApi(
      config.baseUrl + apiList.rolesEdit,
      params,
      cookies
    );
    if (responseData.customcode === 200) {
      navigate("/roles");
    }
  };

  useEffect(() => {
    const concatPrivilegeJson = async (data) => {
      for (let i = 0; i < privilages.length; i++) {
        if (privilages[i].heading === data[i].heading) {
          for (let j = 0; j < privilages[i].subheading.length; j++) {
            if (
              privilages[i].subheading[j].name === data[i].subheading[j].name
            ) {
              privilages[i].subheading[j].privilages =
                data[i].subheading[j].privilages;
            }
          }
        }
      }
    };

    const roleDetails = async () => {
      let params = {
        _id: location.state._id,
      };
      const responseData = await invokeApi(
        config.baseUrl + apiList.getRolesDetail,
        params,
        cookies
      );
      if (responseData.customcode === 200) {
        setRole(responseData.data.role);
        setStatus(responseData.data.status);
        await concatPrivilegeJson(responseData.data.privileges);
      }
    };

    if (invokeRolesDetail) {
      setInvokeRolesDetail(false);
      if (location.pathname === "/roles/edit") roleDetails();
    }
  }, [cookies, invokeRolesDetail, location, privilages]);

  return (
    <div className="card-with-subheading">
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
        <div className="flex flex-row justify-between items-center mb-5 dark:text-white">
          <BreadCrumbs
            nav1={"Roles"}
            nav2={location.pathname === "/roles/add" ? "Add" : "Edit"}
            link={constants.ROLESNAVIGATE}
          />
          <div
            className="w-[150px]"
            onClick={() =>
              location.pathname === "/roles/add"
                ? setConfirmRolesPopup(true)
                : setConfirmEditRolesPopup(true)
            }
          >
            <Button text={constants.SUBMIT} />
          </div>
        </div>

        <div className="flex flex-col ml-10  gap-5">
          <div className="flex flex-wrap gap-y-5">
            <div className="w-1/3">
              <div className="flex flex-col gap-2">
                <div className="dark:text-white">{constants.ROLES}:</div>
                <div className="input-wrapping-div">
                  <input
                    className="form-input-text "
                    value={role}
                    type="text"
                    placeholder="Roles"
                    onChange={(ev) => setRole(ev.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="input-main-div">
              <SingleSelect
                // value={
                //  status
                // }
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
        </div>

        <div className="flex flex-wrap justify-between m-5">
          {privilages?.map((el, idx) => {
            return (
              <table
                key={idx}
                className="w-[46%] border-[1px] rounded-lg border-separate  border-[#121212] dark:border-zinc-200 text-center text-sm m-5"
              >
                <thead className=" bg-zinc-300 dark:bg-zinc-900 mt-10 m-10">
                  <tr>
                    <th scope="col" className=" px-6 py-4">
                      {el.heading}
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      View
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Add
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Edit
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {el.subheading.map((ele, indx) => (
                    <tr key={indx}>
                      <td className="whitespace-nowrap  px-6 py-4 font-medium">
                        {ele.name}
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4">
                        {Object.keys(ele.privilages).includes("view") && (
                          <input
                            className="text-center"
                            type="checkbox"
                            checked={
                              ele.privilages.view === true ? true : false
                            }
                            onChange={() => {
                              let copy = [...privilages];
                              copy[idx].subheading[indx].privilages.view =
                                !copy[idx].subheading[indx].privilages.view;
                              setPrivilages(copy);
                            }}
                          />
                        )}
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4">
                        {Object.keys(ele.privilages).includes("add") && (
                          <input
                            className="text-center"
                            type="checkbox"
                            checked={ele.privilages.add === true ? true : false}
                            onChange={() => {
                              let copy = [...privilages];
                              copy[idx].subheading[indx].privilages.add =
                                !copy[idx].subheading[indx].privilages.add;
                              setPrivilages(copy);
                            }}
                          />
                        )}
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4">
                        {Object.keys(ele.privilages).includes("edit") && (
                          <input
                            className="text-center"
                            type="checkbox"
                            checked={
                              ele.privilages.edit === true ? true : false
                            }
                            onChange={() => {
                              let copy = [...privilages];
                              copy[idx].subheading[indx].privilages.edit =
                                !copy[idx].subheading[indx].privilages.edit;
                              setPrivilages(copy);
                            }}
                          />
                        )}
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4">
                        {Object.keys(ele.privilages).includes("delete") && (
                          <input
                            className="text-center"
                            type="checkbox"
                            checked={
                              ele.privilages.delete === true ? true : false
                            }
                            onChange={() => {
                              let copy = [...privilages];
                              copy[idx].subheading[indx].privilages.delete =
                                !copy[idx].subheading[indx].privilages.delete;
                              setPrivilages(copy);
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          })}
        </div>
      </div>

      <ConformationPopup
        open={confirmRolesPopup}
        close={onClosePopup}
        text={constants.ADDROLEPOPUPTEXT}
        heading={constants.ADDROLEPOPUPHEADING}
        submitHandler={confirmPopupHandler}
      />

      <ConformationPopup
        open={confirmEditRolesPopup}
        close={onCloseEditPopup}
        text={constants.EDITROLEPOPUPTEXT}
        heading={constants.EDITROLEPOPUPHEADING}
        submitHandler={confirmEditRolesHandler}
      />
    </div>
  );
};

export default Add;
