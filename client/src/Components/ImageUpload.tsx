import { useState } from "react";
import s from "../Styles/ImageUpload.module.css";
import { imageFilesHandler } from "../Utils/imageFilesHandler";
import { ImageUpload as ImageUploadProps } from "../Types/Folder";
import upload from "../Images/upload.png";
import {
  handleDragOver,
  handleOnDrop,
  handleDragLeave,
} from "../Utils/dragAndDrop";

function ImageUpload({
  setSelectedImageBlob,
  setSelectedImageList,
}: ImageUploadProps) {
  const [isDragDone, setIsDragDone] = useState<boolean>(true);

  const changeBackgroundColor = () => {
    return {
      // filter: isDragDone ? "brightness(100%)" : "brightness(90%)",
      backgroundColor: isDragDone ? "#e1eedd" : "rgba(225, 238, 221, 0.5)",
    };
  };

  return (
    <div
      className={s.uploadImageBox}
      style={changeBackgroundColor()}
      onDragOver={handleDragOver(setIsDragDone)}
      onDrop={handleOnDrop(setIsDragDone, {
        setSelectedImageBlob,
        setSelectedImageList,
      })}
      onDragLeave={handleDragLeave(setIsDragDone)}
    >
      <img
        className={s.uploadIcon}
        style={changeBackgroundColor()}
        src={upload}
        alt="upload icon"
      ></img>
      <div className={s.uploadInput} style={changeBackgroundColor()}>
        <span className={s.uploadDragDrop} style={changeBackgroundColor()}>
          Drag and drop,{" "}
        </span>
        <label className={s.uploadImages} style={changeBackgroundColor()}>
          or
          <input
            name="uploadImages"
            type="file"
            accept="image/*"
            multiple
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const fileList = event.target.files;
              imageFilesHandler({
                fileList,
                setSelectedImageBlob,
                setSelectedImageList,
              });
            }}
            style={changeBackgroundColor()}
          />
        </label>
      </div>
    </div>
  );
}
export default ImageUpload;
