import { avatar_data } from "../../json/data.json";
import OurFamilyInfo from "./OurFamilyInfo";
function EmployeeAvatar() {
  return (
    <div>
      <center>
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {avatar_data.map((data, index) => {
            return (
              <OurFamilyInfo
                key={index}
                pName={data.Pname}
                designation={data.position}
                pImage={data.image}
                pUrl={data.linkedinUrl}
                pInfo={data.info}
              />
            );
          })}
        </div>
      </center>
    </div>
  );
}

export default EmployeeAvatar;
