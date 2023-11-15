import s from "../Styles/MyalbumDisplay.module.css";
import { MyalbumDisplay as MyalbumDisplayProps } from "../Types/Folder";
import { Link } from "react-router-dom";

function MyAlbumDisplay({
  displayAlbumPhoto,
  currentAlbumTitle,
  folderList,
}: MyalbumDisplayProps) {
  return (
    <div className={s.displayAlbumBox}>
      <div className={s.albumPhotoBox}>
        <div className={s.albumPhoto}>
          {displayAlbumPhoto && <img src={displayAlbumPhoto}></img>}
          {!displayAlbumPhoto && <div className={s.noImageDiv}>No image</div>}
        </div>
        {!currentAlbumTitle && <div className={s.albumTitle}>No title</div>}
        {currentAlbumTitle && (
          <div className={s.albumTitle}>{currentAlbumTitle}</div>
        )}
      </div>
      <div className={s.albumListBox}>
        <div className={s.albumList}>
          <div className={s.albumListTitle}>Album List</div>
          {folderList.length !== 0 &&
            folderList.map((folder) => (
              <li key={folder.id}>
                <Link to={`/albumFolder/${folder.id}`}>{folder.name}</Link>
              </li>
            ))}
          {folderList.length === 0 && <li>No albums</li>}
        </div>
      </div>
    </div>
  );
}

export default MyAlbumDisplay;
