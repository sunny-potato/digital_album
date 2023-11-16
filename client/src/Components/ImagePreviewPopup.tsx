import { useState } from "react";
import { ImagePreviewPopup as ImagePreviewPopupProps } from "../types/Folder";
import { imageFilesHandler } from "../Utils/imageFilesHandler";
import addImage from "../Images/addImage.png";
import { postImageInfolder } from "../Axios";
import s from "../Styles/ImagePreviewPopup.module.css";

function ImagePreviewPopup({
  selectedImageBlob,
  setSelectedImageBlob,
  selectedImageList,
  setSelectedImageList,
  folderId,
}: ImagePreviewPopupProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function deleteSelectedImage(imageIndex: number) {
    const updateSelectedImageBlob = [
      ...selectedImageBlob.slice(0, imageIndex),
      ...selectedImageBlob.slice(imageIndex + 1),
    ];
    setSelectedImageBlob(updateSelectedImageBlob);
    const updateSelectedImage = [
      ...selectedImageList.slice(0, imageIndex),
      ...selectedImageList.slice(imageIndex + 1),
    ];
    setSelectedImageList(updateSelectedImage);
  }

  async function saveSelectedImage() {
    try {
      if (selectedImageList.length == 0) {
        console.log("no image that can be sendt to DB");
      } else {
        if (!isLoading) {
          setIsLoading(true);
          const response = await postImageInfolder(selectedImageList, folderId);
          if (response.status === 200) {
            cancelSelectedImage();
            window.location.reload();
          }
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function cancelSelectedImage() {
    setSelectedImageList([]);
    setSelectedImageBlob([]);
  }

  return (
    <div
      className={s.popupBackground}
      style={{
        display: selectedImageBlob.length > 0 ? "block" : "none",
      }}
    >
      <div className={s.displayInputPopupBox}>
        <div className={s.uploadInputPopupBox}>
          <div className={s.uploadInputPopup}>
            <img
              className={s.addImageIcon}
              src={addImage}
              alt="add image"
            ></img>
            <label className={s.uploadImages} htmlFor="uploadImages">
              more images? :)
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
        <div className={s.displayPopupContent}>
          {selectedImageBlob &&
            selectedImageBlob.map((img, index) => (
              <div key={index} className={s.selectedImage}>
                <button
                  className={s.deleteImageButton}
                  onClick={() => deleteSelectedImage(index)}
                >
                  x
                </button>
                <img src={img}></img>
              </div>
            ))}
        </div>
        <div>
          <button
            className={s.saveSelectedImageButton}
            disabled={isLoading ? true : false}
            onClick={saveSelectedImage}
          >
            Save
          </button>
          <button
            className={s.cancelSelectedImageButton}
            disabled={isLoading ? true : false}
            onClick={cancelSelectedImage}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
export default ImagePreviewPopup;