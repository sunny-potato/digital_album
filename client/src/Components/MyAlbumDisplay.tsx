import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import s from "../Styles/MyAlbumDisplay.module.css";
import { MyalbumDisplay as MyalbumDisplayProps } from "../Types/MyAlbum";
import { DropDownList } from "../Types/Commonness";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DropDown from "./DropDown";

function MyAlbumDisplay({
  albumData,
  setAlbumData,
  albumImageBuffer,
  folderList,
}: MyalbumDisplayProps) {
  const [myAlbumDropDownList, setMyAlbumDropDownList] = useState({
    sortBy: albumData.sort_by,
    orderBy: albumData.order_by,
  });

  // export list
  const myAlbumDropDownContent = [
    { type: "sortBy", name: "Date" },
    { type: "sortBy", name: "Name" },
    { type: "sortBy", name: "Size" },
    { type: "orderBy", name: "A-Z" },
    { type: "orderBy", name: "Z-A" },
  ];

  useEffect(() => {
    const getDropDownValue = () => {
      setAlbumData({
        ...albumData,
        ["sort_by"]: `${myAlbumDropDownList.sortBy}`,
        ["order_by"]: `${myAlbumDropDownList.orderBy}`,
      });
    };
    getDropDownValue();
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
