import { useNavigate } from "react-router-dom";
import CommonBtn3 from "../../generalComponents/CommonBtn3";
import CommonModal from "../../generalComponents/CommonModal";


export default function Confirmation() {
    const navigate=useNavigate()
    
  return (
    <CommonModal>
      <div className="w-[404px] h-[316px] flex flex-col justify-between rounded-[16px] p-[24px]">
        <div className="flex flex-col gap-[8px]  justify-center items-center">
          <img src="/assets/svg/Group (7).svg" className="w-[58px] h-[58px]" />
          <h5 className="text-[18px] text-typo-secondary w-[233px] h-[26px] text-center ">
            Thank you for informing us
          </h5>
          <h5 className="typo-normal w-[312px] h-[40px] text-center font-normal text-[12px] leading-[18px] mt-[8px] text-[#7D8185]">
            Your input plays a crucial role in maintaining the safety of the
            Gamersback community.
          </h5>
          <p className="w-[357px] h-[20px] font-normal text-[14px] leading-5 text-center mt-[24px] text-[#FAFBFC]">
            Learn more about Gamersback{" "}
            <span className="text-[#2A85FF]">Community Guidelines</span>
          </p>
          <div className="flex flex-row justify-between mt-4">
            <div
              // onClick={() => setIsRemovePostModalOpen(false)}
              className="hover:opacity-80 "
            >
              <CommonBtn3
                height="44px"
                width="170px"
                bgColor="#2B2E30"
                text="Block user"
              />
            </div>
            <div onClick={()=>navigate('/profile')} className="hover:opacity-80 ml-[16px]">
              <CommonBtn3
                height="44px"
                width="170px"
                bgColor="#2E9BFA"
                text="Close"
              />
            </div>
          </div>
        </div>
      </div>
    </CommonModal>
  )
}
