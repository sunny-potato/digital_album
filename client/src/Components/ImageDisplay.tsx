import { Link, useParams } from "react-router-dom";
import s from "../Styles/ImageDisplay.module.css";
import { deleteImageInfolder, getAllImagesInFolder } from "../Services/folder";
import { ImageDisplay as ImageDisplayProps } from "../Types/Folder";

function ImageDisplay({
  uploadedImageList,
  setUploadedImageList,
}: ImageDisplayProps) {
  const folderId = Number(useParams().folderId);
  async function deleteSavedImage(imageIndex: number) {
    const deletedImage = uploadedImageList[imageIndex];
    const result = await deleteImageInfolder(folderId, deletedImage);
    if (result.status == 200) {
      const getImageList = await getAllImagesInFolder(folderId);
      setUploadedImageList(getImageList);
    }
  }
  return (
    <div className={s.displayImageBox}>
      <div className={s.displayContent}>
        {uploadedImageList.length !== 0 &&
          uploadedImageList.map((image, index) => (
            <div className={s.imageBox} key={index}>
              <button
                className={s.deleteImageButton}
                onClick={() => deleteSavedImage(index)}
              >
                X
              </button>
              <Link className={s.uploadedImage} to={`image/${image.id}`}>
                <img
                  className={s.uploadedImage}
                  src={`http://localhost:8000/albumFolder/image/${image.uuid}`}
                  alt={image.origianl_name} /* need to change????? */
                />
              </Link>
            </div>
          ))}
        {uploadedImageList.length === 0 && (
          <div className={s.notifyNoImage}> No uploaded images </div>
        )}
      </div>
    </div>
  );
}

export default ImageDisplay;
