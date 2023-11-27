import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  createFolder,
  getMyAlbumInfo,
  postMyAlbumImage,
  postMyAlbumTitle,
  getMyAlbumImage,
} from "../Axios";
import s from "../Styles/MyAlbum.module.css";
import { Folder } from "../Types/Folder";
import MyAlbumDisplay from "../Components/MyAlbumDisplay";
import MyAlbumEdit from "../Components/MyAlbumEdit";

function MyAlbum() {
  const albumInfo = useRef<any>(null); //?????????
  const userId = Number(useParams().userId);
  const [updatedAlbumPhoto, setUpdatedAlbumPhoto] = useState<File>();
  const [currentAlbumTitle, setCurrentAlbumTitle] = useState<string>();
  const [folderList, setFolderList] = useState<Folder[]>([]);
  const [displayAlbumPhoto, setDisplayAlbumPhoto] = useState<string>();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAllFoldersNamed, setIsAllFoldersNamed] = useState<boolean>(true);

  useEffect(() => {
    async function getAlbumInfo() {
      const result = await getMyAlbumInfo(userId);

      if (result.folder.length !== 0) {
        setFolderList(result.folder);
      }
      if (result.album.length !== 0) {
        const albumImage = result.album[0].image_uuid;
        const albumTitle = result.album[0].title;
        if (albumImage) {
          const imageBuffer = await getMyAlbumImage(albumImage);
          setDisplayAlbumPhoto(imageBuffer);
        }
        if (albumTitle) setCurrentAlbumTitle(albumTitle);
      }
    }
    getAlbumInfo();
  }, [userId]);

  async function saveAlbumInfo() {
    const HaveAllName = folderList.every((folder) => folder.name !== "");
    if (HaveAllName && !isLoading) {
      setIsLoading(true);
      const eachFolder = folderList.map((name) => name);
      const newFolder = await createFolder(eachFolder, userId);
      const result = await getMyAlbumInfo(userId);
      if (result.folder.length !== 0) {
        setFolderList(result.folder);
      }
      if (updatedAlbumPhoto) {
        await postMyAlbumImage(userId, updatedAlbumPhoto);
      }
      if (currentAlbumTitle) {
        await postMyAlbumTitle(userId, currentAlbumTitle);
      }
    } else {
      setIsLoading(false);
      setIsEditMode(true);
      setIsAllFoldersNamed(false);
    }
    setIsLoading(false);
  }

  function cancelAlbumInfo() {
    setIsEditMode(false);
    for (const [key, value] of Object.entries(albumInfo.current)) {
      if (key === "folderList") {
        setFolderList(value as Folder[]);
      } else if (key === "displayAlbumPhoto") {
        setDisplayAlbumPhoto(value as string);
      } else if (key === "currentAlbumTitle") {
        setCurrentAlbumTitle(value as string);
      }
    }
  }

  return (
    <div className={s.pageContainer}>
      <div className={s.albumBox}>
        {isEditMode ? (
          <button
            className={s.cancelAlbumButton}
            onClick={() => cancelAlbumInfo()}
          >
            Cancel
          </button>
        ) : (
          ""
        )}
        <button
          className={s.editAlbumButton}
          disabled={isLoading ? true : false}
          onClick={() => {
            if (isEditMode) {
              setIsEditMode(false), saveAlbumInfo();
            } else {
              setIsEditMode(true);
              albumInfo.current = {
                folderList,
                displayAlbumPhoto,
                currentAlbumTitle,
              };
            }
          }}
        >
          {isEditMode ? "Save" : "Edit"}
        </button>
        {isEditMode && (
          <MyAlbumEdit
            displayAlbumPhoto={displayAlbumPhoto}
            setDisplayAlbumPhoto={setDisplayAlbumPhoto}
            currentAlbumTitle={currentAlbumTitle}
            setCurrentAlbumTitle={setCurrentAlbumTitle}
            folderList={folderList}
            setFolderList={setFolderList}
            setUpdatedAlbumPhoto={setUpdatedAlbumPhoto}
            userId={userId}
            isAllFoldersNamed={isAllFoldersNamed}
            setIsAllFoldersNamed={setIsAllFoldersNamed}
          />
        )}
        {!isEditMode && (
          <MyAlbumDisplay
            displayAlbumPhoto={displayAlbumPhoto}
            currentAlbumTitle={currentAlbumTitle}
            folderList={folderList}
          />
        )}
      </div>
    </div>
  );
}

export default MyAlbum;
