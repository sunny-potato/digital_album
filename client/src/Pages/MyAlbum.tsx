import { useState, useEffect } from "react";
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
import { CurrentMyalbumData } from "../Types/MyAlbum";
import MyAlbumDisplay from "../Components/MyAlbumDisplay";
import MyAlbumEdit from "../Components/MyAlbumEdit";

function MyAlbum() {
  const userId = Number(useParams().userId);
  const [albumTitle, setAlbumTitle] = useState<string>();
  const [albumImageFile, setAlbumImageFile] = useState<File>();
  const [albumImageBuffer, setAlbumImageBuffer] = useState<string>();
  const [folderList, setFolderList] = useState<Folder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isAllFoldersNamed, setIsAllFoldersNamed] = useState<boolean>(true);
  const [currentMyAlbumData, setCurrentMyAlbumData] = useState<
    CurrentMyalbumData | undefined
  >(undefined);
  useEffect(() => {
    async function getAlbumInfo() {
      const result = await getMyAlbumInfo(userId);

      if (result.folder.length !== 0) {
        setFolderList(result.folder);
      }
      if (result.album.length !== 0) {
        const initialAlbumImage = result.album[0].image_uuid;
        const initialAlbumTitle = result.album[0].title;
        if (initialAlbumImage) {
          const imageBuffer = await getMyAlbumImage(initialAlbumImage);
          setAlbumImageBuffer(imageBuffer);
        }
        if (initialAlbumTitle) setAlbumTitle(initialAlbumTitle);
      }
    }
    getAlbumInfo();
  }, [userId]);

  async function saveAlbumInfo() {
    const HaveAllName = folderList.every((folder) => folder.name !== "");
    if (HaveAllName && !isLoading) {
      setIsLoading(true);
      const newFolder = await createFolder(folderList, userId);
      const result = await getMyAlbumInfo(userId);
      if (result.folder.length !== 0) {
        setFolderList(result.folder);
      }
      if (albumImageFile) {
        await postMyAlbumImage(userId, albumImageFile);
      }
      if (albumTitle) {
        await postMyAlbumTitle(userId, albumTitle);
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
    if (currentMyAlbumData === undefined) return;
    for (const [key, value] of Object.entries(currentMyAlbumData)) {
      if (key === "folderList") {
        setFolderList(value as Folder[]);
      } else if (key === "albumImageBuffer") {
        setAlbumImageBuffer(value as string);
      } else if (key === "albumTitle") {
        setAlbumTitle(value as string);
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
              setCurrentMyAlbumData({
                folderList,
                albumImageBuffer,
                albumTitle,
              });
            }
          }}
        >
          {isEditMode ? "Save" : "Edit"}
        </button>
        {isEditMode && (
          <MyAlbumEdit
            albumImageBuffer={albumImageBuffer}
            setAlbumImageBuffer={setAlbumImageBuffer}
            albumTitle={albumTitle}
            setAlbumTitle={setAlbumTitle}
            folderList={folderList}
            setFolderList={setFolderList}
            setAlbumImageFile={setAlbumImageFile}
            userId={userId}
            isAllFoldersNamed={isAllFoldersNamed}
            setIsAllFoldersNamed={setIsAllFoldersNamed}
          />
        )}
        {!isEditMode && (
          <MyAlbumDisplay
            albumImageBuffer={albumImageBuffer}
            albumTitle={albumTitle}
            folderList={folderList}
            setFolderList={setFolderList}
            userId={userId}
          />
        )}
      </div>
    </div>
  );
}

export default MyAlbum;
