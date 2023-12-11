/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
//import dependencies
import { useEffect, useState } from "react";

//import json
import { codesArray } from "../../json/countrywithphonecode.json";

function PhoneCode({
  fetchPhoneDetails,
  defaultValue,
  phonelistModal,
  setPhonelistModal,
}) {
  const [openDropDown, setOpenDropDown] = useState(0);
  const [countryInitials, setCountryInitials] = useState(codesArray[0][1]);
  const [phone, setPhone] = useState(defaultValue);
  const [query, setQuery] = useState("");
  const [code, setCode] = useState(["India (भारत)", "in", "+91"]);
  const [load, setLoad] = useState(true);

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();

  const getCode = function (phone) {
    return codesArray.filter((data) => data[2] === phone);
  };

  useEffect(() => {
    if (load) {
      setPhone(defaultValue);
      setLoad(false);
      setCode(getCode(phone[0]));
    }
  }, [defaultValue, load, phone]);
  return (
    <div className="relative">
      <div className="flex items-center justify-center w-4/5 border-[1px] rounded-xl border-black dark:border-white">
        <div
          className="border-r-2 pr-2 cursor-pointer"
          onClick={(ev) => {
            ev.stopPropagation();
            setPhonelistModal(true);
          }}
        >
          <div className="flex flex-row items-center space-x-1  justify-center focus:rounded-xl">
            <img
              className="h-5 w-5"
              src={`https://flagcdn.com/${code[0][1]}.svg`}
            />
            <div id="countryCodeDiv">{phone[0]}</div>
          </div>
        </div>

        <input
          onKeyDown={blockInvalidChar}
          className="w-fit rounded-r-xl p-3  dark:text-white dark:border-white bg-transparent dark:bg-[#121212] outline-none"
          type="text"
          placeholder="Phone number"
          value={phone[1].replace(/[^\d]/g, "")}
          onChange={(e) => {
            let copy = [...phone];
            copy[1] = e.target.value;
            setPhone(copy);
            fetchPhoneDetails(copy);
          }}
          maxLength="13"
        />
      </div>

      {phonelistModal ? (
        <div className="z-30 absolute bg-white text-[#121212] dark:bg-zinc-700 dark:text-white h-60 w-96 px-5 py-5 popup-shadow rounded-xl overflow-y-scroll">
          <div>
            <input
              className="rounded-full text-center w-full mb-3 bg-zinc-200 p-1 text-[#121212] outline-none"
              type="text"
              autoFocus
              placeholder="      Search here"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <ul>
            {codesArray
              .filter((data) => {
                if (query === "") {
                  return data;
                } else if (
                  data[0].toLowerCase().includes(query.toLowerCase())
                ) {
                  return data;
                }
              })
              .map((data, index) => {
                return (
                  <li
                    key={index}
                    className="cursor-pointer mb-2"
                    onClick={() => {
                      let copy = [...phone];
                      copy[0] = data[2];
                      setPhone(copy);
                      setCode([data]);
                      setCountryInitials(data[1]);
                      setPhonelistModal(false);
                    }}
                  >
                    <div className="flex gap-3 space-x-5 mb-5 gap-y-5 justify-start items-center">
                      <div className=" bg-zinc-100">
                        <img
                          src={`https://flagcdn.com/${data[1]}.svg`}
                          className="h-15 w-10"
                        />
                      </div>
                      <div>{data[2]}</div>
                      <div>{data[0]}</div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default PhoneCode;
