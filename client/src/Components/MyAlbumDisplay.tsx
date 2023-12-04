import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import s from "../Styles/MyAlbumDisplay.module.css";
import {
  DropDownList,
  MyalbumDisplay as MyalbumDisplayProps,
} from "../Types/MyAlbum";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DropDown from "./DropDown";
import { sortFoldersInMyAlbum } from "../Axios";

function MyAlbumDisplay({
  albumImageBuffer,
  albumTitle,
  folderList,
}: MyalbumDisplayProps) {
  const [myAlbumDropDownList, setMyAlbumDropDownList] = useState<DropDownList>({
    sortBy: "Name",
    orderBy: "A-Z",
  });
  const myAlbumDropDownContent = [
    { type: "sortBy", name: "Name" },
    { type: "sortBy", name: "Date" },
    { type: "sortBy", name: "Size" },
    { type: "orderBy", name: "A-Z" },
    { type: "orderBy", name: "Z-A" },
  ];
  useEffect(() => {
    sortFoldersInMyAlbum(
      35,
      myAlbumDropDownList.sortBy,
      myAlbumDropDownList.orderBy
    );
    console.log("useEffect runs");
  }, [myAlbumDropDownList]);

  return (
    <div className={s.displayAlbumBox}>
      <div className={s.albumPhotoBox}>
        <div className={s.albumPhoto}>
          {albumImageBuffer ? (
            <img src={albumImageBuffer}></img>
          ) : (
            <div className={s.noImageDiv}>No image</div>
          )}
        </div>
        {albumTitle ? (
          <div className={s.albumTitle}>{albumTitle}</div>
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
            {folderList.length === 0 && <li>No folders</li>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAlbumDisplay;
