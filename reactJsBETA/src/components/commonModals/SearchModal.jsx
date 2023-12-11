export default function SearchModal() {
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        <div className="absolute rounded-2xl bg-opacity-90 drop-shadow-lg bg-[#2B2E30] w-[616px] h-[324px] top-[83px] left-[460px]">
          <img src="/assets/png/Noise.png" className="relative rounded-2xl w-[616px] h-[324px]" />
          
          {/* Header */}
          <div className="absolute top-5 flex flex-row justify-between ml-6 w-[568px] h-[20px]">
            <p className="text-[#FAFBFC]">Recent</p>
            <p className="text-[#2E9BFA] cursor-pointer">Clear all</p>
          </div>
          
          {/* User Entries */}
          <div className="absolute top-16 ml-6 w-[568px]">
            <div className="flex flex-row justify-between items-center mb-2">
              <div className="flex items-center">
                <img src="/assets/svg/Ellipse 1297.svg" className="w-10 h-10 p-1" />
                <p className="ml-2 text-[#FAFBFC]">Saravana Kumar</p>
              </div>
              <img src="/assets/svg/Close (1).svg" className="w-5 h-5 cursor-pointer" />
            </div>
            
          
            <div className="flex flex-row justify-between items-center mb-2">
              <div className="flex items-center">
                <img src="/assets/svg/Group 129.svg" className="w-10 h-10" />
                <p className="ml-2 text-[#FAFBFC]">Darrell Steward</p>
              </div>
              <img src="/assets/svg/Close (1).svg" className="w-5 h-5 cursor-pointer" />
            </div>
            <div className="flex flex-row justify-between items-center mb-2">
              <div className="flex items-center">
                <img src="/assets/svg/Group 129.svg" className="w-10 h-10" />
                <p className="ml-2 text-[#FAFBFC]">Darrell Steward</p>
              </div>
              <img src="/assets/svg/Close (1).svg" className="w-5 h-5 cursor-pointer" />
            </div>
            <div className="flex flex-row justify-between items-center mb-2">
              <div className="flex items-center">
                <img src="/assets/svg/Group 129.svg" className="w-10 h-10" />
                <p className="ml-2 text-[#FAFBFC]">Darrell Steward</p>
              </div>
              <img src="/assets/svg/Close (1).svg" className="w-5 h-5 cursor-pointer" />
            </div>
            <div className="flex flex-row justify-between items-center mb-2">
              <div className="flex items-center">
                <img src="/assets/svg/Group 129.svg" className="w-10 h-10" />
                <p className="ml-2 text-[#FAFBFC]">Darrell Steward</p>
              </div>
              <img src="/assets/svg/Close (1).svg" className="w-5 h-5 cursor-pointer" />
            </div>
            
          
            
          </div>
        </div>
      </div>
    );
  }
  