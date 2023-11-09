import { useState, useEffect } from "react";
import { Link, useNavigate, useParams, Outlet } from "react-router-dom";
import {
  postImageInfolder,
  getAllImagesInFolder,
  deleteImageInfolder,
} from "../Axios";
import { Image } from "../Types/Folder";
import s from "../Styles/AlbumFolder.module.css";
import upload from "../Images/upload.png";
import addImage from "../Images/addImage.png";

function AlbumFolder() {
  const folderId = Number(useParams().folderId);
  const [selectedImageList, setSelectedImageList] = useState<File[]>([]);
  const [selectedImageBlob, setSelectedImageBlob] = useState<string[]>([]);
  const [uploadedImageList, setUploadedImageList] = useState<Image[]>([]);
  const [clickedImageIndex, setClickedImageIndex] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleFiles(fileList: FileList | null) {
    if (fileList === null) return;
    Object.values(fileList).map((file: File) => {
      const fileBlob = URL.createObjectURL(file);
      setSelectedImageBlob((selectedImageBlob) => [
        ...selectedImageBlob,
        fileBlob,
      ]);
      setSelectedImageList((selectedImageList) => [...selectedImageList, file]);
    });
  }

  useEffect(() => {
    async function getImages() {
      const getImageList = await getAllImagesInFolder(folderId);
      setUploadedImageList(getImageList);
    }
    void getImages();
  }, []);

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
        console.log("no image that can be sendt to DB"); // it should be popup
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

  async function deleteSavedImage(imageIndex: number) {
    const deletedImage = uploadedImageList[imageIndex];
    const result = await deleteImageInfolder(deletedImage);
    if (result.status == 200) {
      const getImageList = await getAllImagesInFolder(folderId);
      setUploadedImageList(getImageList);
    }
  }

  return (
    <div className={s.uploadPageContainer}>
      <div className={s.contentContainer}>
        <div className={s.uploadImageBox}>
          <img className={s.uploadIcon} src={upload} alt="upload image"></img>
          <div className={s.uploadInput}>
            <span className={s.uploadDragDrop}>Drag and drop, </span>
            <label className={s.uploadImages} htmlFor="uploadImages">
              or
              <input
                name="uploadImages"
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => handleFiles(event.target.files)}
              />
            </label>
          </div>
        </div>
        <div className={s.displayImageBox}>
          <div className={s.displayTitle}>Uploaded photos</div>
          <div className={s.displayContent}>
            {uploadedImageList &&
              uploadedImageList.map((image, index) => (
                <div className={s.imageBox} key={index}>
                  <button
                    className={s.deleteImageButton}
                    onClick={() => deleteSavedImage(index)}
                  >
                    x
                  </button>
                  <Link className={s.uploadedImage} to={`image/${image.id}`}>
                    <img
                      className={s.uploadedImage}
                      src={`http://localhost:8000/albumFolder/image/${image.uuid}`}
                      alt={image.origianl_name}
                    />
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <div
          className={s.popupBackgroundDiv}
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
                    onChange={(event) => handleFiles(event.target.files)}
                  />
                </label>
              </div>
            </div>
            <div className={s.displayPopupTitle}>Selected photos</div>
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
        <Outlet />
      </div>
    </div>
  );
}

export default AlbumFolder;
