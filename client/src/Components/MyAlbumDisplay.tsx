import s from "../Styles/MyalbumDisplay.module.css";
import { MyalbumDisplay as MyalbumDisplayProps } from "../Types/Folder";
import { Link } from "react-router-dom";
import folderIcon from "../Images/folderIcon.svg";
import { useEffect, useRef } from "react";

function MyAlbumDisplay({
  displayAlbumPhoto,
  currentAlbumTitle,
  folderList,
}: MyalbumDisplayProps) {
  // const folderListBox = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   if (!folderListBox.current) return;
  //   folderListBox.current.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //   });
  // });

  return (
    <div className={s.displayAlbumBox}>
      <div className={s.albumPhotoBox}>
        <div className={s.albumPhoto}>
          {displayAlbumPhoto ? (
            <img src={displayAlbumPhoto}></img>
          ) : (
            <div className={s.noImageDiv}>No image</div>
          )}
        </div>
        {currentAlbumTitle ? (
          <div className={s.albumTitle}>{currentAlbumTitle}</div>
        ) : (
          <div className={s.albumTitle}>No title</div>
        )}
      </div>
      <div className={s.albumListBox}>
        <div className={s.albumList}>
          <div className={s.albumListTitle}>Folder List</div>
          <div className={s.folderList}>
            {folderList.length !== 0 &&
              folderList.map((folder) => (
                <li key={folder.id}>
                  <img src={folderIcon} className={s.folderIcon}></img>
                  <Link to={`/albumFolder/${folder.id}`}>{folder.name}</Link>
                </li>
              ))}
            {folderList.length === 0 && <li>No albums</li>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAlbumDisplay;
