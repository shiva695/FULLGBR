// @import dependencies
import { useState } from "react";
import { MdClose } from "react-icons/md";

const AddUserModal = ({ open, close }) => {
  const [createAvatar, setCreateAvatar] = useState("YES");
  return (
    <>
      {open && (
        <div className="fixed z-10 inset-0 bg-opacity-60 bg-black flex justify-center items-center">
          <div className="flex flex-col w-full h-[80%] max-w-6xl dark:border-white  text-white">
            {/* card header */}
            <div className="flex flex-row w-full items-center justify-between px-6 py-4 bg-white dark:bg-[#121212]  rounded-tr-2xl  rounded-tl-2xl">
              <div className="flex flex-row items-center space-x-6">
                <img src="/assets/png/add.png" />
                <h5 className="text-black font-semibold">Add Users</h5>
              </div>

              <MdClose
                color="#242424"
                className="cursor-pointer"
                size={25}
                onClick={close}
              />
            </div>

            <div className="flex flex-row w-full h-[500px] bg-white dark:bg-[#121212]">
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
                    <input
                      className="outline-none bg-transparent py-3 dark:text-[#FFFFFF] border-b-[#707070] border-b-[2px]  w-full me-5"
                      placeholder="First Name"
                    />
                    <input
                      className="outline-none bg-transparent py-3 dark:text-[#FFFFFF] border-b-[#707070] border-b-[2px]  w-full me-5"
                      placeholder="Username"
                    />
                    <input
                      className="outline-none bg-transparent py-3 dark:text-[#FFFFFF] border-b-[#707070] border-b-[2px]  w-full me-5"
                      placeholder="Phone Number"
                    />
                    <input
                      className="outline-none bg-transparent py-3 dark:text-[#FFFFFF] border-b-[#707070] border-b-[2px]  w-full me-5"
                      placeholder="Gender"
                    />
                  </div>
                  <div className="w-1/2 flex flex-col space-y-3">
                    <input
                      className="outline-none bg-transparent py-3 dark:text-[#FFFFFF] border-b-[#707070] border-b-[2px]  w-full me-5"
                      placeholder="Last Name"
                    />
                    <input
                      className="outline-none bg-transparent py-3 dark:text-[#FFFFFF] border-b-[#707070] border-b-[2px]  w-full me-5"
                      placeholder="E-mail ID"
                    />
                    <input
                      className="outline-none bg-transparent py-3 dark:text-[#FFFFFF] border-b-[#707070] border-b-[2px]  w-full me-5"
                      placeholder="Date of Birth"
                    />
                  </div>
                </div>

                {/* Password Header */}
                <div className="bg-[#F7F7F9] w-full">
                  <h5 className="text-[#242424] font-normal p-5">Password</h5>
                </div>
                <div className="flex flex-row p-5 w-full space-x-5">
                  <div className="w-1/2 flex flex-col space-y-3">
                    <input
                      className="outline-none bg-transparent py-3 dark:text-[#FFFFFF] border-b-[#707070] border-b-[2px]  w-full me-5"
                      placeholder="Create Password"
                    />
                  </div>
                  <div className="w-1/2 flex flex-col space-y-3">
                    <input
                      className="outline-none bg-transparent py-3 dark:text-[#FFFFFF] border-b-[#707070] border-b-[2px]  w-full me-5"
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>
                {/* Profile Details Header */}
                <div className="bg-[#F7F7F9] w-full">
                  <h5 className="text-[#242424] font-normal p-5">
                    Profile Details
                  </h5>
                </div>
                <div className="w-full flex flex-col space-y-3 p-5">
                  <select
                    placeholder="Account Type"
                    className="outline-none bg-transparent dark:text-[#FFFFFF] text-black border-b-[#707070] border-b-[2px]  w-full me-5"
                  >
                    <option value="volvo">Account Type</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                  </select>

                  <input
                    className="outline-none bg-transparent py-3 dark:text-[#FFFFFF] border-b-[#707070] border-b-[2px]  w-full me-5"
                    placeholder="Interested Topic"
                  />
                </div>

                {/* Profile Types Header */}
                <div className="bg-[#F7F7F9] w-full">
                  <h5 className="text-[#242424] font-normal p-5">
                    Profile Types
                  </h5>
                </div>
                <div className="flex flex-col space-y-3 text-black w-full px-5 py-2">
                  <div className="flex flex-row items-center justify-between ">
                    <h5>Gamer Profile</h5>
                    <input className="h-5 w-5" type="checkbox" />
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <h5>Journal Profile</h5>
                    <input className="h-5 w-5" type="checkbox" />
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col w-[30%] h-full">
                {/* Profile Types Header */}
                <div className="bg-[#F7F7F9] w-full">
                  <h5 className="text-[#242424] font-normal p-5">
                    Avatar and DP
                  </h5>
                </div>
                {/* Avaton Profile */}

                <div className="flex flex-col items-center justify-center h-full space-y-5">
                  {createAvatar === "YES" ? (
                    <>
                      <img
                        src="/assets/png/avaton-profile.png"
                        className="h-[320px] w-fit"
                      />
                      <button className="px-10 py-3 bg-red-500 rounded-md text-white font-semibold">
                        Create
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col space-y-5 items-center justify-center h-full w-full">
                      <div className="h-[150px] w-[170px] border-[1px] border-gray-400"></div>
                      <div className="flex flex-row space-x-4">
                        <button className="px-10 py-3 bg-blue-500 rounded-md text-white font-semibold">
                          Upload
                        </button>
                        <button className="px-10 py-3 bg-red-500 rounded-md text-white font-semibold">
                          Change
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Radio button */}
                  <div className="flex flex-row space-x-4 pb-4">
                    <input
                      type="radio"
                      onChange={() => setCreateAvatar("YES")}
                      checked={createAvatar === "YES" ? true : false}
                    />
                    <input
                      type="radio"
                      onChange={() => setCreateAvatar("NO")}
                      checked={createAvatar === "NO" ? true : false}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* button */}
            <div className="h-[50px] flex items-center justify-center bg-blue-500 rounded-bl-2xl rounded-br-2xl">
              <h5 className="text-[#ffffff] font-semibold">ADD</h5>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUserModal;
