export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomInt(min: number, max: number) {
  return Math.random() * (max - min + 1) + min;
}
export function getFileSize(bytes: number) {
  const kilobyte = 1024;
  const megabyte = kilobyte * 1024;
  const gigabyte = megabyte * 1024;
  let fileSize;
  let fileUnit;
  if (bytes < kilobyte) {
    fileSize = bytes;
    fileUnit = "Bytes";
  } else if (bytes < megabyte) {
    fileSize = (bytes / kilobyte).toFixed(2);
    fileUnit = "KB";
  } else if (bytes < gigabyte) {
    fileSize = (bytes / megabyte).toFixed(2);
    fileUnit = "MB";
  } else {
    fileSize = (bytes / gigabyte).toFixed(2);
    fileUnit = "GB";
  }
  return { fileSize, fileUnit };
}
