import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import s from "../Styles/MyAlbumDisplay.module.css";
import { MyalbumDisplay as MyalbumDisplayProps } from "../Types/MyAlbum";
import { DropDownList } from "../Types/Commonness";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DropDown from "./DropDown";
import { getSortedFoldersInMyAlubm } from "../Services/myAlbum";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../Utils/localstorage";

function MyAlbumDisplay({
  albumData,
  albumImageBuffer,
  folderList,
  setFolderList,
}: MyalbumDisplayProps) {
  const userId = Number(useParams().userId);
  const [myAlbumDropDownList, setMyAlbumDropDownList] = useState<DropDownList>(
    () => {
      let sortValue = getLocalStorageData("myAlbumDropDownList");
      if (!sortValue) {
        const defaultValue = { sortBy: "date", orderBy: "asc" };
        sortValue = defaultValue;
      }
      return sortValue;
    }
  );

  // export list
  const myAlbumDropDownContent = [
    { type: "sortBy", name: "Date" },
    { type: "sortBy", name: "Name" },
    { type: "sortBy", name: "Size" },
    { type: "orderBy", name: "A-Z" },
    { type: "orderBy", name: "Z-A" },
  ];

  useEffect(() => {
    const updateDropDownList = async () => {
      const result = await getSortedFoldersInMyAlubm(
        userId,
        myAlbumDropDownList
      );
      const sortedFolders = result.data;
      setLocalStorageData("myAlbumDropDownList", myAlbumDropDownList);
      setLocalStorageData("sortedFolders", sortedFolders); // need it??
      setFolderList(sortedFolders);
    };
    updateDropDownList();
  }, [myAlbumDropDownList]);

  return (
    <div className={s.displayAlbumBox}>
      <div className={s.albumPhotoBox}>
        <div className={s.albumPhoto}>
          {albumImageBuffer ? (
            <img src={albumImageBuffer} alt="myalbum main image"></img>
          ) : (
            <div className={s.noImageDiv}>No image</div>
          )}
        </div>
        {albumData.title ? (
          <div className={s.albumTitle}>{albumData.title}</div>
        ) : (
          <div className={s.albumTitle}>No title</div>
        )}
      </div>
      <div className={s.albumListBox}>
        <div className={s.albumList}>
          <DropDown
            dropDownList={myAlbumDropDownList}
            setDropDownList={setMyAlbumDropDownList}
            dropDownContent={myAlbumDropDownContent}
          />
          <div className={s.folderList}>
            <div className={s.folderListInner}>
              {folderList.length !== 0 &&
                folderList.map((folder) => (
                  <li key={folder.id}>
                    <FolderOpenIcon fontSize="small" className={s.folderIcon} />
                    <Link to={`/albumFolder/${folder.id}`}>{folder.name}</Link>
                  </li>
                ))}
            </div>
            {folderList.length === 0 && <li key={0}>No folders</li>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAlbumDisplay;
