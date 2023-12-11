// eslint-disable-next-line react/prop-types
const Badge = ({ text }) => {
  return (
    <div className="p-0.5 w-full rounded-full bg-gradient-to-b  from-[#223EAC] to-[#DD3131]">
      <p className="bg-neutral-900 text-white  h-[35px] py-1 px-4 text-center rounded-full cursor-default">
        {text}
      </p>
    </div>
  );
};

export default Badge;
