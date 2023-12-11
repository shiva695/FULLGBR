/* eslint-disable react/no-unescaped-entities */

// @import Dependencies
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import Webcam from "react-webcam";

// @import Model Components
import { ModalBody, ModalHeader } from "../../generalComponents/CommonModal";
import CommonBtn1 from "../../generalComponents/CommonBtn1";
import CommonModal1 from "../../generalComponents/CommonModel1";

// @import Input Components
import DropdownSelect from "../../inputComponents/DropdownSelect";
import FileInputContainer from "../../inputComponents/FileInputContainer";

// @import Files
import countriesJSON from "../../../json/countries.json";

const EstablishCredibility = ({ onClickGetVerfied }) => {
  return (
    <ModalBody>
      <div className="flex flex-col flex-1">
        <div className="flex flex-col items-center mt-2 mb-6">
          <img
            className="w-[64px] h-[64px] object-cover mb-2"
            src="/assets/svg/verified-check.svg"
          />
          <div>
            <h4 className="text-[28px] font-semibold text-typo-secondary text-center leading-[33px] ">
              Establish credibility <br /> through verified
            </h4>
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex flex-row mb-4">
            <div className="w-[70px] flex flex-col items-start">
              <img
                className="w-[25px] h-[25px]  pt-1"
                src="/assets/svg/verified-badge.svg"
              />
            </div>
            <div className="flex flex-col items-start">
              <h5 className="text-[18px] font-semibold text-typo-secondary mb-2">
                Verified Badge on profile
              </h5>
              <p className="text-[14px]  text-[#FAFBFC] pr-10">
                Two-Step verification enhances your account security by
                mandating Two-Step verification enhances your account security
                by mandating
              </p>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-[70px] flex items-start">
              <img
                className="w-[25px] h-[25px] "
                src="/assets/svg/account-protection.svg"
              />
            </div>
            <div>
              <h5 className="text-[18px] font-semibold text-typo-secondary mb-2">
                Account Protection
              </h5>
              <p className="text-[14px]  text-[#FAFBFC] pr-10">
                Two-Step verification enhances your account security by
                mandating Two-Step verification enhances your account security
                by mandating
              </p>
            </div>
          </div>
        </div>
        <CommonBtn1
          width={"100%"}
          height={40}
          text={"Get Verified"}
          onClick={onClickGetVerfied}
        />
      </div>
    </ModalBody>
  );
};

EstablishCredibility.propTypes = {
  onClickGetVerfied: PropTypes.func,
};

const AccountVerification = ({ onBack, onClose, onClickStart }) => {
  return (
    <>
      <ModalHeader
        title="Identify Document"
        onClose={onClose}
        onBack={onBack}
      />
      <ModalBody>
        <div className="flex flex-col flex-1">
          <div className="flex flex-col flex-grow">
            <h4 className="text-[18px] text-typo-secondary leading-[26px] mb-6">
              Before you dive in, Kindly :
            </h4>
            <div className="flex flex-row items-center mb-4">
              <img
                className="w-[40px] h-[40px] mr-4"
                src="/assets/svg/id-proof.svg"
              />
              <h5 className="text-[16px] text-[#FAFBFC] leading-[26px]">
                Ensure you have a valid ID issued by the government
              </h5>
            </div>
            <div className="flex flex-row items-center mb-4">
              <img
                className="w-[40px] h-[40px] mr-4"
                src="/assets/svg/camera-access.svg"
              />
              <h5 className="text-[16px] text-[#FAFBFC] leading-[26px]">
                Confirm if your device's camera is accessible and functioning
                correctly
              </h5>
            </div>
            <div className="flex flex-row items-center mb-4">
              <img
                className="w-[40px] h-[40px] mr-4"
                src="/assets/svg/selfie-image.svg"
              />
              <h5 className="text-[16px] text-typo-secondary leading-[26px]">
                Be ready to capture a selfie
              </h5>
            </div>
          </div>
          <CommonBtn1
            width={"100%"}
            height={40}
            text={"Start"}
            onClick={onClickStart}
          />
        </div>
      </ModalBody>
    </>
  );
};

AccountVerification.propTypes = {
  onBack: PropTypes.func,
  onClose: PropTypes.func,
  onClickStart: PropTypes.func,
};

const IdentifyDocument = ({
  verifyAccountForm,
  handleFormChange,
  onClose,
  onSubmit,
}) => {
  const documentTypes = [
    {
      label: "ID Card",
      value: "ID_CARD",
    },
    {
      label: "PAN Card",
      value: "PAN_CARD",
    },
  ];
  const getOptionLabelForCountries = (e) => (
    <div className="flex flex-row items-center">
      <div className="w-[30px]">
        <img className="w-[20px] h-[20px]" src={e.flag} />
      </div>
      <span>{e.country}</span>
    </div>
  );
  return (
    <>
      <ModalHeader title="Identify Document" onClose={onClose} />
      <ModalBody>
        <div className="flex flex-col flex-1">
          <div className="flex flex-col flex-grow">
            <div className="flex flex-col mb-2">
              <div className="mb-4">
                <DropdownSelect
                  isSearchable={true}
                  defaultValue={"in"}
                  label="Select Country"
                  options={countriesJSON}
                  getOptionLabel={getOptionLabelForCountries}
                  onChange={(selectedItem) =>
                    handleFormChange("country", selectedItem.value)
                  }
                />
              </div>
              <div className="mb-4">
                <DropdownSelect
                  label="Select Document Type"
                  options={documentTypes}
                  placeholder="Select document"
                  onChange={(selectedItem) =>
                    handleFormChange("documentType", selectedItem.value)
                  }
                />
              </div>
            </div>
            {verifyAccountForm.documentType ? (
              <div className="flex flex-row mb-4">
                <FileInputContainer
                  className="flex-1 flex flex-col items-center justify-center bg-[#15171A] my-2 mr-2 h-[152px] border-dashed border-2 border-[#2A85FF80] rounded-xl p-2"
                  overrideClassName="border-none"
                  imageClassName="rounded-[12px]"
                  onFileSelect={(file) => handleFormChange("imageFront", file)}
                >
                  <img
                    className="w-[48px] h-[48px] mb-2"
                    src="/assets/svg/id-proof-front.svg"
                  />
                  <div className="text-[13px] font-normal text-typo-secondary text-center">
                    Click to Upload the{" "}
                    <span className="text-[#2E9BFA] font-semibold">
                      Front side
                    </span>{" "}
                    of your document
                  </div>
                </FileInputContainer>
                <FileInputContainer
                  className="flex-1 flex flex-col items-center justify-center bg-[#15171A] my-2 ml-2 h-[152px] border-dashed border-2 border-[#2A85FF80] rounded-xl p-2"
                  overrideClassName="border-none"
                  imageClassName="rounded-[12px]"
                  onFileSelect={(file) => handleFormChange("imageBack", file)}
                >
                  <img
                    className="w-[48px] h-[48px] mb-2"
                    src="/assets/svg/id-proof-back.svg"
                  />
                  <div className="text-[13px] font-normal text-typo-secondary text-center">
                    Click to Upload the{" "}
                    <span className="text-[#2E9BFA] font-semibold">
                      Back side
                    </span>{" "}
                    of your document
                  </div>
                </FileInputContainer>
              </div>
            ) : null}

            {verifyAccountForm.imageFront || verifyAccountForm.imageBack ? (
              <div className="h-[40px] bg-[#FFC13B1A] w-full flex items-center p-4 rounded-lg">
                <h5 className="text-[13px] font-normal text-[#FFC13B] text-center">
                  Double-check that the document's information is easily
                  readable
                </h5>
              </div>
            ) : null}
          </div>
          <CommonBtn1
            width={"100%"}
            height={40}
            text={"Submit"}
            onClick={onSubmit}
          />
        </div>
      </ModalBody>
    </>
  );
};

IdentifyDocument.propTypes = {
  verifyAccountForm: PropTypes.object,
  handleFormChange: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

const SelfieInfo = ({
  onClose,
  verifyAccountForm,
  handleFormChange,
  onSubmit,
}) => {
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user", // Use the front-facing camera
  };

  const captureSelfieImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    handleFormChange("selfieImage", imageSrc);
    setShowCamera(false);
  };

  const openWebCamera = () => {
    setShowCamera(true);
  };
  return (
    <>
      <ModalHeader title="Selfie" onClose={onClose} />
      <ModalBody>
        <div className="flex flex-col flex-1">
          <div className="flex flex-col flex-grow items-center">
            {showCamera ? (
              <div className="relative w-full h-[310px] mb-4">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <>
                <h4 className="text-[24px] font-semibold text-typo-secondary text-center mb-4">
                  Its a time for Selfie
                </h4>
                <div className="relative">
                  <img
                    className="w-[140px] h-[140px] object-cover rounded-[50%] mb-4"
                    src={
                      verifyAccountForm.selfieImage ||
                      "/assets/png/selfie-image.png"
                    }
                  />
                  {!verifyAccountForm.selfieImage ? (
                    <img
                      className="absolute inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[82px] h-[102px]"
                      src="/assets/svg/selfie-frame.svg"
                    />
                  ) : null}
                </div>
                <p className="text-[16px] text-[#B5B9BD] text-center  mb-4">
                  Position yourself in front of the camera. Make sure your{" "}
                  <br />
                  face is centered in the frame.
                </p>
              </>
            )}
          </div>
          {verifyAccountForm.selfieImage ? (
            <CommonBtn1
              width={"100%"}
              height={40}
              text={"Submit"}
              onClick={onSubmit}
            />
          ) : (
            <CommonBtn1
              width={"100%"}
              height={40}
              text={showCamera ? "Capture Selfie" : "Take Selfie"}
              onClick={showCamera ? captureSelfieImage : openWebCamera}
            />
          )}
        </div>
      </ModalBody>
    </>
  );
};

SelfieInfo.propTypes = {
  onClose: PropTypes.func,
  verifyAccountForm: PropTypes.object,
  handleFormChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

const SuccessSection = ({ onClose }) => {
  return (
    <>
      <ModalHeader title="Success" onClose={onClose} />
      <ModalBody>
        <div className="flex flex-col flex-1">
          <div className="flex flex-col flex-grow items-center">
            <img
              className="w-[107px] h-[72px] object-cover mb-4"
              src="/assets/svg/celebrate.svg"
            />
            <h4 className="text-[28px] font-semibold text-typo-secondary text-center mb-4">
              Documents & Selfie <br />
              Successfully submitted
            </h4>
            <p className="text-[16px] text-[#B5B9BD] text-center  mb-4">
              Your ID documents, Selfie have been submitted and are being
              reviewed. You will receive an email once your verification is
              complete.
            </p>
          </div>
          <CommonBtn1
            width={"100%"}
            height={40}
            text={"Done"}
            onClick={onClose}
          />
        </div>
      </ModalBody>
    </>
  );
};

SuccessSection.propTypes = {
  onClose: PropTypes.func,
};

const VerifyAccountModal = ({ open, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [verifyAccountForm, setVerifyAccountForm] = useState({
    country: "",
    documentType: "",
    imageFront: "",
    imageBack: "",
    selfieImage: "",
  });

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFormChange = (formKey, formValue) => {
    setVerifyAccountForm((prevVerifyAccntForm) => ({
      ...prevVerifyAccntForm,
      [formKey]: formValue,
    }));
  };

  const renderComponent = () => {
    switch (currentStep) {
      case 0:
        return <EstablishCredibility onClickGetVerfied={nextStep} />;
      case 1:
        return (
          <AccountVerification
            onClickStart={nextStep}
            onClose={onClose}
            onBack={previousStep}
          />
        );
      case 2:
        return (
          <IdentifyDocument
            onClose={onClose}
            verifyAccountForm={verifyAccountForm}
            handleFormChange={handleFormChange}
            onSubmit={nextStep}
            onBack={previousStep}
          />
        );
      case 3:
        return (
          <SelfieInfo
            verifyAccountForm={verifyAccountForm}
            handleFormChange={handleFormChange}
            onSubmit={nextStep}
            onClose={onClose}
          />
        );
      case 4:
        return <SuccessSection onClose={onClose} />;
      default:
        return <EstablishCredibility onClickGetVerfied={nextStep} />;
    }
  };
  if (!open) return null;

  return (
    <CommonModal1>
      <div className="w-[560px] h-[580px] flex flex-col">
        {renderComponent()}
      </div>
    </CommonModal1>
  );
};

VerifyAccountModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default VerifyAccountModal;
