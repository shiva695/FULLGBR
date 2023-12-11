let utils = {};

// get device type
utils.detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? "Mobile"
    : "Desktop";

// get os
utils.getOS = () => {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (!os && /Linux/.test(platform)) {
    os = "Linux";
  }
  return os;
};

// Get Time format
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

// get Progress Percent
utils.getProgressPercent = (totalRatingCount, starCount) => {
  return (starCount / totalRatingCount) * 100;
};

// Set Size for images for album
utils.setSizeForImages = (images) => {
  let respoImages = [];
  images.map((e, idx) => {
    let width = 1;
    let height = 1;
    if (idx == 1 || idx == 3 || idx == 5 || idx == 7) {
      width = 4;
      height = 5;
    } else if (idx == 2 || idx == 4 || idx == 6 || idx == 8) {
      width = 16;
      height = 9;
    }

    respoImages.push({
      src: e,
      width: width,
      height: height,
    });
    return;
  });
  return respoImages;
};

// Get Date Format
utils.getDateFormat = (date, format) => {
  const d = new Date(date);
  let day =
    d.getDate().toString().length === 1
      ? "0" + d.getDate().toString()
      : d.getDate().toString();
  let year = d.getFullYear();
  let month =
    (d.getMonth() + 1).toString().length === 1
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

export default utils;

// Crop Image common function
export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

export const getRadianAngle = (degreeValue) => {
  return (degreeValue * Math.PI) / 180;
};

// Returns the new bounding area of a rotated rectangle.
export const rotateSize = (width, height, rotation) => {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
};

export async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement("canvas");

  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    return null;
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string
  return croppedCanvas.toDataURL("image/jpeg");

  // As a blob
  // return new Promise((resolve, reject) => {
  //   croppedCanvas.toBlob((file) => {
  //     resolve(URL.createObjectURL(file));
  //     reject();
  //   }, "image/jpeg");
  // });
}
