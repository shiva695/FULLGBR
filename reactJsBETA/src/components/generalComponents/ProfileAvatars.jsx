import PropTypes from "prop-types";

const ProfileAvatars = ({
  onClick,
  img,
  isSelected,
  title,
  mainClassName,
  imgClassName,
}) => {
  return (
    <div onClick={onClick} className={mainClassName}>
      <img src={img} className={imgClassName} />
      {title && (
        <p className="text-[#FAFBFC] font-semibold text-[14px] leading-5 text-center mt-2">
          {title}
        </p>
      )}

      {isSelected && (
        <img
          className="absolute top-0 right-1 h-6 w-6"
          src="/assets/svg/blueTick.svg"
        />
      )}
    </div>
  );
};

ProfileAvatars.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  isSelected: PropTypes.bool,
  mainClassName: PropTypes.string,
  imgClassName: PropTypes.string,
  onClick: PropTypes.func,
};

export default ProfileAvatars;
