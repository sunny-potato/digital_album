import { ImageFilesHandler as ImageFilesHandlerProps } from "../types/Folder";

export function imageFilesHandler({
  fileList,
  setSelectedImageBlob,
  setSelectedImageList,
}: ImageFilesHandlerProps) {
  if (fileList === null || fileList === undefined) return;
  Object.values(fileList).map((file) => {
    const fileBlob = URL.createObjectURL(file);
    setSelectedImageBlob((imageBlob) => [...imageBlob, fileBlob]);
    setSelectedImageList((imageList) => [...imageList, file]);
  });
}
