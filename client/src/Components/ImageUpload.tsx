import upload from "../Images/upload.png";
import { ImageUpload as ImageUploadProps } from "../Types/Folder";
import s from "../Styles/ImageUpload.module.css";
import { imageFilesHandler } from "../Utils/imageFilesHandler";

function ImageUpload({
  setSelectedImageBlob,
  setSelectedImageList,
}: ImageUploadProps) {
  return (
    <div className={s.uploadImageBox}>
      <img className={s.uploadIcon} src={upload} alt="upload image"></img>
      <div className={s.uploadInput}>
        <span className={s.uploadDragDrop}>Drag and drop, </span>
        <label className={s.uploadImages}>
          or
          <input
            name="uploadImages"
            type="file"
            accept="image/*"
            multiple
            onChange={imageFilesHandler({
              setSelectedImageBlob,
              setSelectedImageList,
            })}
          />
        </label>
      </div>
    </div>
  );
}
export default ImageUpload;
