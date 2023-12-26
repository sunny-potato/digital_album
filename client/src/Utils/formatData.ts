import { getFileSize } from "./calculations";

export const formatFileSize = (folderSize: number | null) => {
  if (folderSize === null) {
    return "Empty folder";
  }
  const formated = getFileSize(folderSize);
  return `${formated.fileSize} ${formated.fileUnit}`;
};

export function formatDateTime(inputDateTime: Date) {
  const inputDate = new Date(inputDateTime);
  const day = String(inputDate.getDate()).padStart(2, "0");
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const year = inputDate.getFullYear();
  const hours = String(inputDate.getHours()).padStart(2, "0");
  const minutes = String(inputDate.getMinutes()).padStart(2, "0");
  const ampm = inputDate.getHours() >= 12 ? "PM" : "AM";

  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
}
