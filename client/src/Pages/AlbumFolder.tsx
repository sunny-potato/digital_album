import { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import {
  getAllImagesInFolder,
  getSortedImagesInfolder,
} from "../Services/folder";
import { Image } from "../Types/Folder";
import s from "../Styles/AlbumFolder.module.css";
import ImageUpload from "../Components/ImageUpload";
import ImagePreviewPopup from "../Components/ImagePreviewPopup";
import ImageDisplay from "../Components/ImageDisplay";
import DropDown from "../Components/DropDown";
import { DropDownList } from "../Types/Commonness";
import { dropDownContent, getDropDownDefaultValue } from "../Utils/dropDown";
import { setLocalStorageData } from "../Utils/localstorage";

function AlbumFolder() {
  const folderId = Number(useParams().folderId);
  const [selectedImageList, setSelectedImageList] = useState<File[]>([]);
  const [selectedImageBlob, setSelectedImageBlob] = useState<string[]>([]);
  const [uploadedImageList, setUploadedImageList] = useState<Image[]>([]);
  const [folderDropDownList, setFolderDropDownList] = useState<DropDownList>(
    getDropDownDefaultValue("folderDropDownList")
  );
  async function getImages() {
    const getImageList = await getAllImagesInFolder(folderId);
    setUploadedImageList(getImageList);
  }

  useEffect(() => {
    getImages();
  }, []);

  useEffect(() => {
    const getSortedImages = async () => {
      const sortedImages = await getSortedImagesInfolder(
        folderId,
        folderDropDownList
      );
      setUploadedImageList(sortedImages.data);
      setLocalStorageData("folderDropDownList", folderDropDownList);
    };
    getSortedImages();
  }, [folderDropDownList]);

  return (
    <div className={s.uploadPageContainer}>
      <div className={s.contentContainer}>
        <ImageUpload
          setSelectedImageList={setSelectedImageList}
          setSelectedImageBlob={setSelectedImageBlob}
        />
        <DropDown
          dropDownList={folderDropDownList}
          setDropDownList={setFolderDropDownList}
          dropDownContent={dropDownContent}
        />
        <ImageDisplay
          uploadedImageList={uploadedImageList}
          setUploadedImageList={setUploadedImageList}
        />
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
