import { useState, useEffect } from "react";
import Button from "./uiElements/Button";
import LoginModal from "../login/LoginModal";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import LoginMenuModal from "./uiElements/Modals/LoginMenuModal";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [placeholder, setPlaceholder] = useState("");
  const [isErasing, setIsErasing] = useState(false);

  const currentPathName = window.location.pathname;

  // Modal Closer function
  const modalCloseHandler = (status) => {
    setIsLoginModalOpen(status);
  };

  const onClose = () => setIsMenuModalOpen(false);

  // Add a listener for changes to the screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1116px)");
    setSearch(mediaQuery.matches);
    const handleMediaQueryChange = (event) => {
      setSearch(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // Text adding and erasing in header input effect

  useEffect(() => {
    const initialText = "Welcome to gamerback...";
    const erasingInterval = 5000; // Time in milliseconds before erasing starts
    const typingSpeed = 100; // Time in milliseconds between each character typing
    const erasingSpeed = 50; // Time in milliseconds between each character erasing

    let currentText = "";
    let currentIndex = 0;

    const typingTimer = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex === initialText.length) {
          // Typing complete, start erasing
          setIsErasing(true);
          clearInterval(typingInterval);
          return;
        }

        currentText += initialText.charAt(currentIndex);
        setPlaceholder(currentText);
        currentIndex++;
      }, typingSpeed);
    }, erasingInterval);

    const erasingTimer = setTimeout(() => {
      if (isErasing) {
        const erasingInterval = setInterval(() => {
          if (currentIndex === 0) {
            // Erasing complete, start typing again
            setIsErasing(false);
            clearInterval(erasingInterval);
            return;
          }

          currentText = currentText.slice(0, -1);
          setPlaceholder(currentText);
          currentIndex--;
        }, erasingSpeed);
      }
    }, erasingInterval + initialText.length * typingSpeed);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(erasingTimer);
    };
  }, [isErasing]);

  return (
    <>
      <nav className="fixed z-10 bg-gradient-to-r from-[#0D0C23] via-[#0F2627] to-[#121212] top-0 w-full border-gray-200 rounded-br-[30px] rounded-bl-[30px]">
        <div className="relative max-w-screen-xl mx-auto flex  flex-wrap gap-2 items-center justify-between p-4">
          {/* Logo */}
          \
          <img
            onClick={() => {
              navigate("/");
            }}
            className={
              currentPathName != "/" ? "cursor-pointer" : "cursor-default"
            }
            src="/assets/png/GamersBack_Logo.png"
            height={200}
            width={200}
          />
          {/* Gamers back search input */}
          <div className="hidden md:block w-[40%] p-0.5 rounded-full bg-gradient-to-b from-[#223EAC] to-[#DD3131]">
            <input
              className="ps-3 bg-[#212529] p-1 w-full rounded-full focus:outline-none text-white"
              type="text"
              id="name"
              placeholder={placeholder}
            />
          </div>
          {/* Tabs List */}
          {!search ? (
            <>
              <ul className="flex flex-col p-4 md:p-0 rounded-lg text-[#E3E3E3] font-medium md:flex-row align-center gap-4">
                <li>
                  <a
                    href="#"
                    className={`block hover:text-fuchsia-500 p-2 ${
                      location.pathname === "/" && "text-fuchsia-500"
                    }`}
                    aria-current="page"
                  >
                    <Link to="/">Home</Link>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`block hover:text-fuchsia-500 p-2 ${
                      location.pathname === "/aboutus" && "text-fuchsia-500"
                    }`}
                  >
                    <Link to="/aboutus">About Us</Link>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`block hover:text-fuchsia-500 p-2 ${
                      location.pathname === "/blog" && "text-fuchsia-500"
                    }`}
                  >
                    <Link to="/blog">Blogs</Link>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`block hover:text-fuchsia-500 p-2 ${
                      location.pathname === "/guidelines" && "text-fuchsia-500"
                    }`}
                  >
                    <Link to="/guidelines">Guidelines</Link>
                  </a>
                </li>
              </ul>

              {/* divider */}
              <div className="h-10 border-e-white border-[1px]"></div>
              {/* Login Button */}
              <div
                className="w-24 p-0.5"
                onClick={() => {
                  let body = document.getElementsByTagName("body")[0];
                  body.classList.add("lock-scroll");
                  setIsLoginModalOpen(true);
                }}
              >
                <Button text="Login" />
              </div>
            </>
          ) : (
            <img
              className="cursor-pointer"
              src="/assets/svg/bars.svg"
              height="26px"
              width="26px"
              onClick={() => {
                let body = document.getElementsByTagName("body")[0];
                body.classList.add("lock-scroll");
                setIsMenuModalOpen(true);
              }}
            />
          )}
        </div>
      </nav>

      <LoginMenuModal open={isMenuModalOpen} close={onClose} />

      {isLoginModalOpen && <LoginModal onClose={modalCloseHandler} />}
    </>
  );
}

export default Header;
