import { DragEvent } from "react";
import { imageFilesHandler } from "./imageFilesHandler";
import { ImageUpload as ImageUploadProps } from "../Types/Folder";

export const handleDragOver = (setIsDragDone: (value: boolean) => void) => {
  return (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragDone(false);
  };
};

export const handleOnDrop = (
  setIsDragDone: (value: boolean) => void,
  { setSelectedImageBlob, setSelectedImageList }: ImageUploadProps
) => {
  return (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragDone(true);
    const fileList = event.dataTransfer.files;
    imageFilesHandler({
      fileList,
      setSelectedImageBlob,
      setSelectedImageList,
    });
  };
};

export const handleDragLeave = (setIsDragDone: (value: boolean) => void) => {
  return (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragDone(true);
  };
};
