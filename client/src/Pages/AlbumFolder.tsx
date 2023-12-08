import { useState, useEffect } from "react";
import { Link, useParams, Outlet } from "react-router-dom";
import { getAllImagesInFolder, deleteImageInfolder } from "../Services/folder";
import { Image } from "../Types/Folder";
import s from "../Styles/AlbumFolder.module.css";
import ImageUpload from "../Components/ImageUpload";
import ImagePreviewPopup from "../Components/ImagePreviewPopup";

function AlbumFolder() {
  const folderId = Number(useParams().folderId);
  const [selectedImageList, setSelectedImageList] = useState<File[]>([]);
  const [selectedImageBlob, setSelectedImageBlob] = useState<string[]>([]);
  const [uploadedImageList, setUploadedImageList] = useState<Image[]>([]);

  async function getImages() {
    const getImageList = await getAllImagesInFolder(folderId);
    setUploadedImageList(getImageList);
  }

  useEffect(() => {
    getImages();
  }, []);

  async function deleteSavedImage(imageIndex: number) {
    const deletedImage = uploadedImageList[imageIndex];
    const result = await deleteImageInfolder(folderId, deletedImage);
    if (result.status == 200) {
      const getImageList = await getAllImagesInFolder(folderId);
      setUploadedImageList(getImageList);
    }
  }

  return (
    <div className={s.uploadPageContainer}>
      <div className={s.contentContainer}>
        <ImageUpload
          setSelectedImageList={setSelectedImageList}
          setSelectedImageBlob={setSelectedImageBlob}
        />
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
        <ImagePreviewPopup
          selectedImageBlob={selectedImageBlob}
          setSelectedImageBlob={setSelectedImageBlob}
          selectedImageList={selectedImageList}
          setSelectedImageList={setSelectedImageList}
          folderId={folderId}
          onClose={getImages}
        />
        <Outlet />
      </div>
    </div>
  );
}

export default AlbumFolder;
