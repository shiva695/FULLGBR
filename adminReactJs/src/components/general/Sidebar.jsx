import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function Sidebar() {
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const toggleDropdown1 = () => {
    setShowDropdown1((prev) => !prev);
  };

  const toggleDropdown2 = () => {
    setShowDropdown2((prev) => !prev);
  };

  const toggleDropdown3 = () => {
    setShowDropdown3((prev) => !prev);
  };

  return (
    <>
      {showSidebar && (
        <aside className="fixed h-[726px] -mb-16  right-0 bottom-0   w-1/6 flex flex-col bg-white border-l shadow-lg">
          <div className="flex items-center justify-start p-2 border-b">
            <AiOutlineArrowRight onClick={closeSidebar} />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center p-4">
            <div
              className="cursor-pointer  border border-black p-1 rounded-md text-[#121212] hover:text-gray-300"
              onClick={toggleDropdown1}
            >
              Option 1
            </div>
            {showDropdown1 && (
              <div className="mt-2 p-2 bg-white text-gray-800"> Content</div>
            )}
            <div
              className="cursor-pointer border border-black p-1 rounded-md text-[#121212] mt-4 hover:text-gray-300"
              onClick={toggleDropdown2}
            >
              Option 2
            </div>
            {showDropdown2 && (
              <div className="mt-2 p-2 bg-white text-gray-800"> Content</div>
            )}
            <div
              className="cursor-pointer  border border-black p-1 rounded-md text-[#121212] mt-4 hover:text-gray-300"
              onClick={toggleDropdown3}
            >
              Option 3
            </div>
            {showDropdown3 && (
              <div className="mt-2 p-2 bg-white text-gray-800"> Content</div>
            )}
          </div>
        </aside>
      )}
    </>
  );
}
