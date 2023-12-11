import { useState } from "react";
import GradientHeader from "../general/uiElements/GradientHeader";
import { Link } from "react-router-dom";

function OurFamilyInfo({ pName, designation, pImage, pUrl, pInfo }) {
  const [leaderInfoModal, setLeaderInfoModal] = useState(false);
  const toggleModal = () => {
    setLeaderInfoModal(!leaderInfoModal);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div>
            <img src={pImage} />
          </div>
          <div className="pt-24">
            <button onClick={toggleModal} className="btn-modal justify-start">
              <img src="assets/png/moreDetailsButton.png" />
            </button>

            {/* Leader1 Avatar Modal */}

            {leaderInfoModal && (
              <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div onClick={toggleModal} className="popup">
                  <div className="flex sm:flex-col md:flex-row space-x-4">
                    <div className="w-2/5">
                      <img className="h-60" src={pImage} />
                    </div>

                    <div className="flex flex-col w-2/5">
                      <div className="text-left">
                        <GradientHeader text={pName} size="header2" />

                        <p className="font-extrabold text-white">
                          {designation}
                        </p>
                      </div>
                      <div>
                        <p className="text-left text-sm text-white mt-2">
                          {pInfo}
                        </p>
                      </div>
                      <Link to={pUrl}>
                        <div className="flex flex-row space-x-4 my-5">
                          <span>
                            <img
                              className="w-5"
                              src="/assets/svg/linkedIn.svg"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>

                    <div className="w-1/5">
                      <button
                        className="mt-[15%]"
                        onClick={() => {
                          toggleModal();
                        }}
                      >
                        <img src="/assets/svg/close.svg" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col pr-5">
          <GradientHeader size="header3" text={pName} />
          <span className="text-white xs:text-sm lg:text-base">
            {designation}
          </span>
        </div>
      </div>
    </>
  );
}

export default OurFamilyInfo;
