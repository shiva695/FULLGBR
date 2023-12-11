import { Collapse } from "react-collapse";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function Accordion({ open, toggle, title, desc }) {
  return (
    <div className="pt-2.5 xl:mt-1.5">
      <div className="gradient-card-border">
        <div
          className="bg-[#242424] py-5 px-10 flex justify-between items-center cursor-pointer rounded-lg"
          onClick={toggle}
        >
          <p className="text-md font-semibold text-start">{title}</p>
          <div className="text-[30px]">
            {open ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </div>
        </div>
      </div>
      <Collapse isOpened={open}>
        <div className="text-[#9D9E9E] px-5 py-5 text-left">{desc}</div>
      </Collapse>
    </div>
  );
}

export default Accordion;
