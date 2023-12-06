import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import s from "../Styles/MyAlbumDisplay.module.css";
import { MyalbumDisplay as MyalbumDisplayProps } from "../Types/MyAlbum";
import { DropDownList } from "../Types/Commonness";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DropDown from "./DropDown";
import { sortFoldersInMyAlbum } from "../Axios";

function MyAlbumDisplay({
  albumImageBuffer,
  albumTitle,
  folderList,
  setFolderList,
  userId,
}: MyalbumDisplayProps) {
  const [myAlbumDropDownList, setMyAlbumDropDownList] = useState<DropDownList>({
    sortBy: "Name",
    orderBy: "A-Z",
  });
  const myAlbumDropDownContent = [
    { type: "sortBy", name: "Date" },
    { type: "sortBy", name: "Name" },
    { type: "sortBy", name: "Size" },
    { type: "orderBy", name: "A-Z" },
    { type: "orderBy", name: "Z-A" },
  ];

  useEffect(() => {
    const getSortedFolderList = async () => {
      const result = await sortFoldersInMyAlbum(
        userId,
        myAlbumDropDownList.sortBy,
        myAlbumDropDownList.orderBy
      );
      setFolderList(result);
    };
    getSortedFolderList();
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
