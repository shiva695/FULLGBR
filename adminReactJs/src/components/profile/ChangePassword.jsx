//import dependencies
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// import files
import { apiList, invokeApi } from "../../utils/apiServiceUtils";
import { config } from "../../utils/configUtils";
import responseUtils from "../../utils/responseUtils";
import constants from "../../json/constants.json";

// import components
import Button from "../general/Button";
import BreadCrumbs from "../general/BreadCrumbs";
import ConformationPopup from "../modals/ConformationPopup";

function ChangePassword() {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [password, setPassword] = useState(null);
  const [cnfmPassword, setCnfmPassword] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  const [showPasswordCnf, setShowPasswordCnf] = useState(false);
  const [showPasswordCrt, setShowPasswordCrt] = useState(false);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [confirm, setConfirm] = useState(false);

  // Submit handler
  const submitHandler = (status) => {
    setConfirm(status);
  };

  // onClose
  const onClose = () => {
    setConfirmPopup(false);
  };

  function handlePasswordChange(event) {
    const { value } = event.target;
    setPassword(value);
    // setPasswordError("");
  }
  function handleCnfmPasswordChange(event) {
    const { value } = event.target;
    setCnfmPassword(value);
  }

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  //axios (api integration)
  useEffect(() => {
    const changePasswordHandler = async () => {
      if (passwordPattern.test(password)) {
        let params = {
          password: password,
          confirmPassword: cnfmPassword,
        };
        let response = await invokeApi(
          config.baseUrl + apiList.changeProfilePassword,
          params,
          cookies
        );
        responseUtils.showToster(response.data);

        if (response.status === 200) {
          responseUtils.showToster(response);
        }
      } else {
        toast.error("Please enter a valid password.");
        onClose();
      }
    };
    if (confirm) {
      changePasswordHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm]);

  return (
    <div className="card-with-subheading">
      <div className="subheading">
        <div className="flex gap-x-5">
          <div
            className={
              location.pathname === constants.PROFILENAVIGATE
                ? "font-semibold flex gap-1"
                : "flex gap-1 cursor-pointer"
            }
            onClick={() => {
              navigate(constants.PROFILENAVIGATE);
            }}
          >
            {constants.PERSONALINFO}
          </div>
          <div
            className={
              location.pathname === constants.CHANGEPASSWORDNAVIGATE
                ? "font-semibold flex gap-1"
                : "flex gap-1"
            }
          >
            {constants.CHANGEPASSWORD}
          </div>
        </div>
      </div>
      <div className="w-full h-[605px] card">
        <div className="flex flex-col items-center gap-5">
          {/* Password & Confirm Password */}
          <div className="flex flex-col gap-10 w-full justify-center">
            <div className="flex justify-between items-center border-b border-gray-300 pb-5">
              {/* Bread crumps */}
              <BreadCrumbs nav1={constants.CHANGEPASSWORD} status={true} />
              <div
                className="w-[150px]"
                onClick={() => {
                  setConfirmPopup(true);
                }}
              >
                <Button text={constants.SUBMIT} />
              </div>
            </div>

            <div className="flex justify-center gap-3 ">
              <div className="input-main-div">
                <div>{constants.PASSWORD}:</div>
                <div className="flex border-black justify-between border-[1px] w-[300px] rounded-xl p-3 dark:border-white bg-transparent">
                  <input
                    className="w-[200px] outline-none bg-transparent"
                    type={showPasswordCnf ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <div className="flex items-center">
                    {showPasswordCnf ? (
                      <div>
                        <AiFillEyeInvisible
                          className="text-2xl cursor-pointer"
                          onClick={() => setShowPasswordCnf(false)}
                        />
                      </div>
                    ) : (
                      <div>
                        <AiFillEye
                          className="text-2xl cursor-pointer"
                          onClick={() => setShowPasswordCnf(true)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="input-main-div">
                <div>{constants.CONFIRMPASSWORD}:</div>
                <div className="flex border-black justify-between border-[1px] w-[300px] rounded-xl p-3 dark:border-white bg-transparent">
                  <input
                    className="w-[200px] outline-none bg-transparent"
                    type={showPasswordCrt ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={cnfmPassword}
                    onChange={handleCnfmPasswordChange}
                  />
                  <div className="flex items-center">
                    {showPasswordCrt ? (
                      <div>
                        <AiFillEyeInvisible
                          className="text-2xl cursor-pointer"
                          onClick={() => setShowPasswordCrt(false)}
                        />
                      </div>
                    ) : (
                      <div>
                        <AiFillEye
                          className="text-2xl cursor-pointer"
                          onClick={() => setShowPasswordCrt(true)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConformationPopup
        open={confirmPopup}
        close={onClose}
        text={"Are you sure want to submit?"}
        heading={"Form Submit"}
        submitHandler={submitHandler}
      />
    </div>
  );
}

export default ChangePassword;
