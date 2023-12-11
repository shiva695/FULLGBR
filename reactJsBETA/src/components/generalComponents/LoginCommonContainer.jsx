//@Import Dependencies
import PropTypes from "prop-types";

const LoginCommonContainer = ({ children }) => {
  return (
    <div className="flex flex-col h-[100vh] bg-[#0B0C0D] items-center justify-center">
      {children}
    </div>
  );
};

const ContainerHeader = ({ title, paraText, mainClassName }) => {
  return (
    <div className={mainClassName}>
      <img
        src="/assets/svg/loginLogo.svg"
        className="w-[72px] h-[72px] left-[133.5px]"
      />
      <h4 className="font-semibold text-[28px] leading-[33.6px] text-center text-[#FFFFFF]">
        {title}
      </h4>
      {paraText && (
        <div className="w-[319px] h-[40px]">
          <p className="text-[#999999] font-regular text-[14px] leading-5 text-center">
            {paraText}
          </p>
        </div>
      )}
    </div>
  );
};

const ContainerHeadBody = ({ children }) => {
  return <div className="flex flex-row items-center mt-[16px]">{children}</div>;
};

const ContainerBody = ({ className, children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className={className}>{children}</div>
    </form>
  );
};

const ContainerFooter = ({ titleBody, onClick, linkName }) => {
  return (
    <div className="flex flex-row w-[340px] justify-center">
      <p className="text-typo-primary font-regular text-[14px] text-center">
        {titleBody}{" "}
        <span
          onClick={onClick}
          className="text-typo-blue font-normal text-[14px] text-center cursor-pointer"
        >
          {linkName}
        </span>
      </p>
    </div>
  );
};

LoginCommonContainer.propTypes = {
  children: PropTypes.array,
};

ContainerHeader.propTypes = {
  title: PropTypes.string,
  paraText: PropTypes.string,
  mainClassName: PropTypes.string,
};

ContainerHeadBody.propTypes = {
  children: PropTypes.array,
};

ContainerFooter.propTypes = {
  titleBody: PropTypes.string,
  linkName: PropTypes.string,
  onClick: PropTypes.func,
};

ContainerBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array,
  onSubmit: PropTypes.func,
};

export { ContainerHeader, ContainerBody, ContainerFooter, ContainerHeadBody };
export default LoginCommonContainer;
