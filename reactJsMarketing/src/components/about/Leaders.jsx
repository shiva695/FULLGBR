import { useState } from "react";
import GradientHeader from "../general/uiElements/GradientHeader";
function Leaders() {
  const [darshanInfoModal, setDarshanInfoModal] = useState(false);
  const [aravinthInfoModal, setAravinthInfoModal] = useState(false);
  const [rishikeshInfoModal, setRishikeshInfoModal] = useState(false);

  const darshanModal = () => {
    setDarshanInfoModal(!darshanInfoModal);
  };
  const aravinthModal = () => {
    setAravinthInfoModal(!aravinthInfoModal);
  };
  const rishikeshModal = () => {
    setRishikeshInfoModal(!rishikeshInfoModal);
  };
  return (
    <>
      <section id="leaders" className="mb-20">
        <GradientHeader text={"Meet Our Gaming-Fluent Leaders."} />
        <div className="md:w-5/12 mb-16">
          <p className="m-5 text-white">
            They leave a trail of epic quests behind them, making a real impact!
          </p>
        </div>
        <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row mt-20 mb-32 2xl:ms-20 3xl:ms-40 4xl:ms-60">
          <div className="flex flex-col">
            <div className="flex md:flex-row">
              <div>
                <img src="assets/svg/Darshan.svg" />
              </div>
              <div className="w-1/6">
                <button
                  onClick={rishikeshModal}
                  className="btn-modal justify-start"
                >
                  <img src="assets/png/moreDetailsButton.png" />
                </button>

                {/* Leader1 Avatar Modal */}
                {rishikeshInfoModal && (
                  <div className="modal">
                    <div onClick={rishikeshModal} className="overlay"></div>
                    <div onClick={rishikeshModal} className="popup">
                      <div className="flex sm:flex-col md:flex-row space-x-4">
                        <div className="w-2/5">
                          <img className="h-60" src="assets/svg/Darshan.svg" />
                        </div>
                        <div className="flex flex-col w-2/5">
                          <div className="text-left">
                            <GradientHeader text="Rishikesh" size="header3" />
                            <p className="font-extrabold text-white">
                              COO and Co-founder
                            </p>
                          </div>
                          <div>
                            <p className="text-left text-sm text-white mt-2">
                              As a team at Gamersback, we're diverse: we have
                              hidden talents such as being foodies,
                              psychologists, musicians, and more. What brings us
                              together is our desire to empower people and allow
                              them to pursue their passion in gaming.
                            </p>
                          </div>
                          <div className="flex flex-row space-x-4 my-5">
                            <span>
                              <img
                                className="w-5"
                                src="/assets/svg/linkedIn.svg"
                              />
                            </span>
                            <span>
                              <img
                                className="w-5"
                                src="/assets/svg/linkedIn.svg"
                              />
                            </span>
                            <span>
                              <img
                                className="w-5"
                                src="/assets/svg/linkedIn.svg"
                              />
                            </span>
                          </div>
                        </div>

                        <div className="w-1/5">
                          <button
                            className="mt-[15%]"
                            onClick={() => {
                              rishikeshModal();
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
            <div className="w-full pr-14">
              <GradientHeader text="Rishikesh" size="header3" />
              <p className="text-white text-base">CEO and Co-founder</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div>
                <img src="assets/svg/Akg.svg" />
              </div>
              <div className="w-1/6">
                <button
                  onClick={aravinthModal}
                  className="btn-modal justify-start"
                >
                  <img src="assets/png/moreDetailsButton.png" />
                </button>

                {/* Leader2 Avatar Modal */}
                {aravinthInfoModal && (
                  <div className="modal">
                    <div onClick={aravinthModal} className="overlay"></div>
                    <div onClick={aravinthModal} className="popup">
                      <div className="flex sm:flex-col md:flex-row space-x-4">
                        <div className="w-2/5">
                          <img className="h-60" src="assets/svg/Darshan.svg" />
                        </div>
                        <div className="flex flex-col w-2/5">
                          <div className="text-left">
                            <GradientHeader
                              text="Aravinth Kumar G"
                              size="header3"
                            />
                            <p className="font-extrabold text-white">
                              CEO and Co-founder
                            </p>
                          </div>
                          <div>
                            <p className="text-left text-sm text-white mt-2">
                              As a team at Gamersback, we're diverse: we have
                              hidden talents such as being foodies,
                              psychologists, musicians, and more. What brings us
                              together is our desire to empower people and allow
                              them to pursue their passion in gaming.
                            </p>
                          </div>
                          <div className="flex flex-row space-x-4 my-5">
                            <span>
                              <img
                                className="w-5"
                                src="/assets/svg/linkedIn.svg"
                              />
                            </span>
                            <span>
                              <img
                                className="w-5"
                                src="/assets/svg/linkedIn.svg"
                              />
                            </span>
                            <span>
                              <img
                                className="w-5"
                                src="/assets/svg/linkedIn.svg"
                              />
                            </span>
                          </div>
                        </div>

                        <div className="w-1/5">
                          <button
                            className="mt-[15%]"
                            onClick={() => {
                              aravinthModal();
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
            <div className="w-full pr-14">
              <GradientHeader text="Arvinth Kumar G" size="header3" />
              <p className="text-white text-base">CEO and Co-founder</p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row">
              <div>
                <img src="assets/svg/Rishi.svg" />
              </div>
              <div className="w-1/6">
                <button
                  onClick={darshanModal}
                  className="btn-modal justify-start"
                >
                  <img src="assets/png/moreDetailsButton.png" />
                </button>

                {/* Leader1 Avatar Modal */}
                {darshanInfoModal && (
                  <div className="modal">
                    <div onClick={darshanModal} className="overlay"></div>
                    <div onClick={darshanModal} className="popup">
                      <div className="flex sm:flex-col md:flex-row space-x-4">
                        <div className="w-2/5">
                          <img className="h-60" src="assets/svg/Darshan.svg" />
                        </div>
                        <div className="flex flex-col w-2/5">
                          <div className="text-left">
                            <GradientHeader
                              text="Darshan Sanjaay"
                              size="header3"
                            />
                            <p className="font-extrabold text-white">
                              CMO and Co-founder
                            </p>
                          </div>
                          <div>
                            <p className="text-left text-sm text-white mt-2">
                              As a team at Gamersback, we're diverse: we have
                              hidden talents such as being foodies,
                              psychologists, musicians, and more. What brings us
                              together is our desire to empower people and allow
                              them to pursue their passion in gaming.
                            </p>
                          </div>
                          <div className="flex flex-row space-x-4 my-5">
                            <span>
                              <img
                                className="w-5"
                                src="/assets/svg/linkedIn.svg"
                              />
                            </span>
                            <span>
                              <img
                                className="w-5"
                                src="/assets/svg/linkedIn.svg"
                              />
                            </span>
                            <span>
                              <img
                                className="w-5"
                                src="/assets/svg/linkedIn.svg"
                              />
                            </span>
                          </div>
                        </div>

                        <div className="w-1/5">
                          <button
                            className="mt-[15%]"
                            onClick={() => {
                              darshanModal();
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
            <div className="w-full pr-14">
              <GradientHeader text="Darshan Sanjaay" size="header3" />
              <p className="text-white text-base">CMO and Co-founder</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Leaders;
