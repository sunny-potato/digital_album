import { ImageUpload as ImageUploadProps } from "../types/Folder";

export function imageFilesHandler({
  setSelectedImageBlob,
  setSelectedImageList,
}: ImageUploadProps) {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("in image hander");
    const fileList = event.target.files;
    if (fileList === null) return;
    Object.values(fileList).map((file) => {
      const fileBlob = URL.createObjectURL(file);
      setSelectedImageBlob((imageBlob) => [...imageBlob, fileBlob]);
      setSelectedImageList((imageList) => [...imageList, file]);
    });
  };
}
