export const getDateFormat = (date, format) => {
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
export const getTimeFormat = (date, format) => {
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
// export const getTimeFormat = (time, format) => {
//   const d = new Date(time);
//   switch (format) {
//     case "hh:mm/:ss":
//       return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
//     case "hh:mm:ss:ms":
//       return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`;
//     case "hh:mm":
//       return `${d.getHours()}:${d.getMinutes()}`;

//     default:
//       return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
//   }
// };

export function toSentenceCase(inputString) {
  if (!inputString || typeof inputString !== "string") {
    return "";
  }

  return inputString.replace(/\w\S*/g, function (word) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
}
