import s from "../Styles/MyAlbumDisplay.module.css";
import { MyalbumDisplay as MyalbumDisplayProps } from "../Types/MyAlbum";
import { Link } from "react-router-dom";
import folderIcon from "../Images/folderIcon.svg";

function MyAlbumDisplay({
  albumImageBuffer,
  albumTitle,
  folderList,
}: MyalbumDisplayProps) {
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
          <div className={s.albumListTitle}>Folder List</div>
          <div className={s.folderList}>
            <div className={s.folderListInner}>
              {folderList.length !== 0 &&
                folderList.map((folder) => (
                  <li key={folder.id}>
                    <img src={folderIcon} className={s.folderIcon}></img>
                    <Link to={`/albumFolder/${folder.id}`}>{folder.name}</Link>
                  </li>
                ))}
            </div>
            {folderList.length === 0 && <li>No albums</li>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAlbumDisplay;
