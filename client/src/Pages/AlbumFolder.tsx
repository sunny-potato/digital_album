import { useState, useEffect } from "react";
import { Link, useParams, Outlet } from "react-router-dom";
import {
  postImageInfolder,
  getAllImagesInFolder,
  deleteImageInfolder,
} from "../Axios";
import { Image } from "../Types/Folder";
import s from "../Styles/AlbumFolder.module.css";
import ImageUpload from "../Components/ImageUpload";
import ImagePreviewPopup from "../Components/ImagePreviewPopup";

function AlbumFolder() {
  const folderId = Number(useParams().folderId);
  const [selectedImageList, setSelectedImageList] = useState<File[]>([]);
  const [selectedImageBlob, setSelectedImageBlob] = useState<string[]>([]);
  const [uploadedImageList, setUploadedImageList] = useState<Image[]>([]);

  useEffect(() => {
    async function getImages() {
      const getImageList = await getAllImagesInFolder(folderId);
      setUploadedImageList(getImageList);
    }
    void getImages();
  }, []);

  // async function saveSelectedImage() {
  //   try {
  //     if (selectedImageList.length == 0) {
  //       console.log("no image that can be sendt to DB"); // it should be popup
  //     } else {
  //       if (!isLoading) {
  //         setIsLoading(true);
  //         const response = await postImageInfolder(selectedImageList, folderId);
  //         if (response.status === 200) {
  //           cancelSelectedImage();
  //           window.location.reload();
  //         }
  //       }
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // function cancelSelectedImage() {
  //   setSelectedImageList([]);
  //   setSelectedImageBlob([]);
  // }

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
        <ImageUpload
          setSelectedImageList={setSelectedImageList}
          setSelectedImageBlob={setSelectedImageBlob}
        />
        <div className={s.displayImageBox}>
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
        <ImagePreviewPopup
          selectedImageBlob={selectedImageBlob}
          setSelectedImageBlob={setSelectedImageBlob}
          selectedImageList={selectedImageList}
          setSelectedImageList={setSelectedImageList}
          folderId={folderId}
        />
        <Outlet />
      </div>
    </div>
  );
}

export default AlbumFolder;
