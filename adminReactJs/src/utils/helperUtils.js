//import dependencies
import CryptoJS from "crypto-js";

//import config
import { config } from "./configUtils";

//import files
import constants from "../json/constants.json";

const utils = {};

utils.dataDcryption = (data) => {
  // Decrypt
  const bytes = CryptoJS.AES.decrypt(data, config.secretEncryptKey);
  const originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return originalText;
};

// utils.extractHeadings = (data) => {
  
//   console.log("data: ", data[0].subheading[0].privilages.view);
//   const headings = [];
//   if (!!data) {
      
//     data.forEach((x) => {
   
//      headings.push(x.heading);
//     });
//     return [headings];
//   }
// };



// utils.extractSubHeadings = (data) => {
//   const subheadings = [];
//   if(!!data){
//   for (let i = 0; i < data.length; i++) {
//     subheadings.push(...data[i].subheading.map((el) => el.name));
//   }
//   return [subheadings];
// }

// };


utils.extractHeadingsandSubheadings=(data)=>{
  const headings=[]
  const subheadings=[]
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].subheading.length; j++) {
      // console.log(data[i].subheading[j].name)
        if(data[i].subheading[j].privilages.view === true || data[i].subheading[j].privilages.add === true || data[i].subheading[j].privilages.edit === true || data[i].subheading[j].privilages.delete === true){
            headings.push(data[i].heading)
            subheadings.push(data[i].subheading[j].name) 
        }
        
    }
   
}
return[headings,subheadings]
}
utils.fetchTableLimits = (cookies) => {
  const settingsData = cookies[constants.SETTINGSDATA];
  return settingsData.tableLimitSize.reduce((acc, curr) => {
    if (curr.status === true) {
      acc.push(curr.num);
    }
    return acc;
  }, []);
};
utils.getDateFormat = (date, format) => {
  const d = new Date(date);
  let day =
    d.getDate().toString().length === 1
      ? "0" + d.getDate().toString()
      : d.getDate().toString();
  let year = d.getFullYear();
  let month =
    d.getMonth().toString().length === 1
      ? "0" + (d.getMonth() + 1)
      : d.getMonth() + 1;
  switch (format) {
    case "dd/mm/yyyy":
      return `${day}/${month}/${year}`;
    case "mm/dd/yyyy":
      return `${month}/${day}/${year}`;
    case "yyyy/mm/dd":
      return `${year}/${day}/${month}`;
    case "dd-mm-yyyy":
      return `${day}-${month}-${year}`;
    case "yyyy-mm-dd":
      return `${year}-${month}-${day}`;
    default:
      return `${day}/${month}/${year}`;
  }
};

utils.getTimeFormat = (date, format) => {
  const d = new Date(date);
  let hours =
    d.getHours().toString().length === 1
      ? "0" + d.getHours().toString()
      : d.getHours().toString();

  let min =
    d.getMinutes().toString().length === 1
      ? "0" + d.getMinutes().toString()
      : d.getHours().toString();
  let sec =
    d.getSeconds().toString().length === 1
      ? "0" + d.getSeconds().toString()
      : d.getSeconds().toString();
  let millisec =
    d.getMilliseconds().toString().length === 1
      ? "0" + d.getMilliseconds().toString()
      : d.getMilliseconds().toString();
  switch (format) {
    case "hh:mm/:ss":
      return `${hours}:${min}:${sec}`;
    case "hh:mm:ss:ms":
      return `${hours}:${min}:${sec}:${millisec}`;
    case "hh:mm":
      return `${hours}:${min}`;

    default:
      return `${hours}:${min}:${sec}`;
  }
};
utils.toSentenceCase = (inputString) => {
  if (!inputString || typeof inputString !== "string") {
    return "";
  }

  return inputString.replace(/\w\S*/g, function (word) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
};

export default utils;
