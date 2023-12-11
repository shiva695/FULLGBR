// // import dependencies
// import { useState } from "react";

// // import components
// import PersonalInfo from "./PersonalInfo";
// import ChangePassword from "./ChangePassword";

// // Import Utils
// import constants from "../../json/constants.json";

// function Profile() {
//   const [showTabInfo, setShowTabInfo] = useState(0);

//   return (
//     <div className="pl-[225px] bg-zinc-300 dark:bg-zinc-700 px-1">
//       <div className="flex flex-col">
//         <div className="flex w-full card gap-4 h-fit mb-1 mt-0">
//           <div className="flex gap-x-5">
//             <div
//               className={
//                 showTabInfo === 0
//                   ? "font-bold flex gap-1 cursor-pointer"
//                   : "flex gap-1 cursor-pointer"
//               }
//               onClick={() => {
//                 setShowTabInfo(0);
//               }}
//             >
//               {constants.PERSONALINFO}
//             </div>
//             <div
//               className={
//                 showTabInfo === 1
//                   ? "font-bold flex gap-1 cursor-pointer"
//                   : "flex gap-1 cursor-pointer"
//               }
//               onClick={() => {
//                 setShowTabInfo(1);
//               }}
//             >
//               {constants.CHANGEPASSWORD}
//             </div>
//           </div>
//         </div>

//         {showTabInfo === 0 ? (
//           <PersonalInfo />
//         ) : showTabInfo === 1 ? (
//           <ChangePassword />
//         ) : (
//           "not found"
//         )}
//       </div>
//     </div>
//   );
// }

// export default Profile;
