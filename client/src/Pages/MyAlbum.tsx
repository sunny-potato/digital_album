import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  createFolder,
  getMyAlbumInfo,
  postMyAlbumImage,
  postMyAlbumTitle,
  getMyAlbumImage,
  getSortedFoldersInMyAlbum,
} from "../Services/myAlbum";
import s from "../Styles/MyAlbum.module.css";
import { Folder } from "../Types/Folder";
import { AlbumData, CurrentMyalbumData } from "../Types/MyAlbum";
import MyAlbumDisplay from "../Components/MyAlbumDisplay";
import MyAlbumEdit from "../Components/MyAlbumEdit";
import { getLocalStorageData } from "../Utils/localstorage";
import { AxiosResponse } from "axios";
// import { getFolderSizeListInMyAlbum } from "../Services/myAlbum";

function MyAlbum() {
  const userId = Number(useParams().userId);
  const defaultAlbumData = {
    id: undefined,
    image_uuid: undefined,
    title: undefined,
    user_id: userId,
  };
  const [albumData, setAlbumData] = useState<AlbumData>(defaultAlbumData);
  const [albumImageBuffer, setAlbumImageBuffer] = useState<string>();
  const [folderList, setFolderList] = useState<Folder[]>([]);
  const [albumImageFile, setAlbumImageFile] = useState<File>();
  const [currentMyAlbumData, setCurrentMyAlbumData] = useState<
    CurrentMyalbumData | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isAllFoldersNamed, setIsAllFoldersNamed] = useState<boolean>(true);

  async function getAlbumInfo() {
    const albumInfo = await getMyAlbumInfo(userId);
    const result = albumInfo.data;
    if (result.album.length !== 0) {
      setAlbumData(result.album[0]);
      const initialAlbumImage = result.album[0].image_uuid;
      if (initialAlbumImage) {
        const imageBuffer = await getMyAlbumImage(userId, initialAlbumImage);
        setAlbumImageBuffer(imageBuffer);
      }
    }
    if (result.folders.length === 0) {
      setFolderList(result.folders);
    } else {
      const sortedFolderList = await getSortedFolders();
      console.log(sortedFolderList.data);
      // await getFolderSizeListInMyAlbum(userId, sortedFolderList.data);
      //get foldersize
    }
  }

  async function getSortedFolders() {
    let currentSortKeywords = getLocalStorageData("myAlbumDropDownList");
    const defaultSortKeywords = { sortBy: "date", orderBy: "asc" };
    if (!currentSortKeywords) {
      currentSortKeywords = defaultSortKeywords;
    }
    const result = await getSortedFoldersInMyAlbum(userId, currentSortKeywords);
    setFolderList(result.data);
    return result;
  }

  useEffect(() => {
    getAlbumInfo();
  }, [userId]);

  async function saveAlbumInfo() {
    const HaveAllName = folderList.every((folder) => folder.name !== "");
    if (HaveAllName && !isLoading) {
      setIsLoading(true);
      await createFolder(folderList, userId);
      if (albumImageFile) {
        await postMyAlbumImage(userId, albumImageFile);
      }
      if (albumData.title) {
        await postMyAlbumTitle(userId, albumData.title);
      }
      await getAlbumInfo();
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
      } else if (key === "albumData") {
        setAlbumData(value as AlbumData);
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
                albumData,
                albumImageBuffer,
              });
            }
          }}
        >
          {isEditMode ? "Save" : "Edit"}
        </button>
        {isEditMode && (
          <MyAlbumEdit
            albumData={albumData}
            setAlbumData={setAlbumData}
            albumImageBuffer={albumImageBuffer}
            setAlbumImageBuffer={setAlbumImageBuffer}
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
            albumData={albumData}
            albumImageBuffer={albumImageBuffer}
            folderList={folderList}
            setFolderList={setFolderList}
          />
        )}
      </div>
    </div>
  );
}

export default MyAlbum;
