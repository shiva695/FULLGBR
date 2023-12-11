// import React from "react";

import Badge from "./uiElements/Badge";
import { useNavigate, Link } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="gradient-blue-to-red pt-[3px] rounded-t-[50px] md:rounded-t-[120px]">
      <footer className="bg-gradient-to-r from-[#0D0C23] via-[#0F2627] to-[#121212] w-full pt-24 px-20 pb-10 h-auto rounded-t-[50px] md:rounded-t-[120px]">
        <div className="flex justify-around flex-wrap gap-5 gradient-border pb-14">
          {/* grid 1 */}
          <div className="flex-col text-white w-[400px]">
            <img src="/assets/png/GamersBack_Logo.png" alt="logo" width={300} />
            <p className="my-3 text-lg text-[#9D9E9E]">
              Heart Of Perfect Gaming
            </p>
            <p className="text-[#9D9E9E] text-md">
              The Ultimate hub for perfect gaming to Connect, Create and
              Conquer. Drive in to a Thriving Network, Discover New Allies, and
              Unlock Exciting Carrer Opportunities. Level Up Your Gaming journey
              with Gamersback Today!
            </p>
          </div>
          {/* grid 2 */}
          <div className="flex-col items-start justify-center text-white w-[300px]">
            <div className="w-36 h-[60px] pt-2">
              <Badge text="Contact Us" />
            </div>

            <p className="my-3 text-lg text-[#9D9E9E]">LOCATION</p>
            <p className="text-[#9D9E9E] text-md">
              3rd Floor, social Co-working space, 1st main Behind Bhagath
              Motors, Horamavu Main Road, near Horamavu signal, Bengaluru,
              Karnataka 560043.
              {/* nostrum rem aperiam! Dolore, doloremque incidunt quidem quam vero
            quae. */}
            </p>

            <p className="mt-6 text-lg text-[#9D9E9E]">CONTACT</p>
            <p className="text-[#9D9E9E] select-text">Phone: +91 8129177190</p>
            <p className="text-[#9D9E9E] select-text">
              Email: hello@gamersback.com
            </p>
          </div>
          {/* grid 3 */}
          <div className="flex-col text-white w-full md:w-40">
            <div className="w-24 h-[60px] pt-2">
              <Badge text="Links" />
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <a className="text-[#9D9E9E] text-md cursor-pointer">
                <Link to="aboutus">About Us</Link>
              </a>
              <a className="text-[#9D9E9E] text-md cursor-pointer">
                <Link to={"/aboutus#leaders"}>Our Team</Link>
              </a>
              <a className="text-[#9D9E9E] text-md cursor-pointer">
                <Link to="/#career">Career</Link>
              </a>
              <a className="text-[#9D9E9E] text-md cursor-pointer">
                <Link to="/blog">Blogs</Link>
              </a>
              <a className="text-[#9D9E9E] text-md cursor-pointer">
                <Link to="/helpcenter">Help Center</Link>
              </a>
            </div>
          </div>
          {/* grid 4 */}
          <div className="flex-col text-white w-full md:w-40">
            <div className="w-32 h-[60px] pt-2">
              <Badge text="Social Links" />
            </div>
            <div className="flex flex-col gap-2">
              {/* <div
                onClick={() => {
                  navigate("/");
                }}
                className="flex flex-row align-top mt-3 gap-2 cursor-pointer"
              >
                <img
                  src="/assets/svg/facebook.svg"
                  alt="facebook"
                  className="hover:bounceNew w-6 h-6"
                />
                <a href="" className=" text-[#9D9E9E] text-md">
                  Facebook
                </a>
              </div> */}

              <div
                onClick={() => {
                  navigate("/");
                }}
                className="flex flex-row align-top mt-3 gap-2 cursor-pointer"
              >
                <img
                  src="/assets/svg/instagram.svg"
                  alt="Instagram"
                  className="hover:bounceNew w-6 h-6"
                />
                <a
                  href="https://www.instagram.com/gamersback.official/"
                  className=" text-[#9D9E9E] text-md hover:underline"
                  target="_blank"
                >
                  Instagram
                </a>
              </div>
              <div
                onClick={() => {
                  navigate("/");
                }}
                className="flex flex-row align-top mt-3 gap-2 cursor-pointer"
              >
                <img
                  src="/assets/svg/youtube.svg"
                  alt="Youtube"
                  className="hover:bounceNew w-6 h-6"
                />
                <a
                  href="https://www.youtube.com/@gamersback4304/about"
                  className=" text-[#9D9E9E] text-md"
                >
                  Youtube
                </a>
              </div>
              <div
                onClick={() => {
                  navigate("/");
                }}
                className="flex flex-row align-top mt-3 gap-2 cursor-pointer"
              >
                <img
                  src="/assets/svg/discord.svg"
                  alt="Discord"
                  className="hover:bounceNew w-6 h-6"
                />
                <a className=" text-[#9D9E9E] text-md">Discord</a>
              </div>
              <div
                onClick={() => {
                  navigate("/");
                }}
                className="flex flex-row align-top mt-3 gap-2 cursor-pointer"
              >
                <img
                  src="/assets/svg/twitter.svg"
                  alt="facebook"
                  className="hover:bounceNew w-6 h-6"
                />
                <a
                  href="https://twitter.com/i/flow/login?redirect_after_login=%2FGamersbackIndia"
                  className=" text-[#9D9E9E] text-md hover:underline"
                  target="_blank"
                >
                  Twitter
                </a>
              </div>
              <div
                onClick={() => {
                  navigate("/");
                }}
                className="flex flex-row align-top mt-3 gap-2 cursor-pointer"
              >
                <img
                  src="/assets/svg/linkedIn.svg"
                  alt="facebook"
                  className="hover:bounceNew w-6 h-6"
                />
                <a
                  href="https://www.linkedin.com/company/gamersback-pvt-ltd/"
                  target="_blank"
                  className=" text-[#9D9E9E] text-md"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-white mt-8">
          <p className="text-sm">
            Copyrights &#169; Gamersback 2023 &nbsp; &#x2022; &nbsp; All rights
            reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
