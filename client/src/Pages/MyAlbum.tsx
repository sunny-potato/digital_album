import { useState } from "react";
import "../Styles/MyAlbum.css";

function MyAlbum() {
  const [albumPhoto, setAlbumPhoto] = useState<File>();
  const [displayAlbumPhoto, setDisplayAlbumPhoto] = useState<string>();

  function handleFile(file: FileList | null) {
    if (file !== null) {
      setAlbumPhoto(file[0]);
      console.log(file[0]);
      setDisplayAlbumPhoto(URL.createObjectURL(file[0]));
    }
  }
  return (
    <div className="pageContainer">
      <div className="albumBox">
        <div className="albumPhotoBox">
          <div className="albumPhoto">
            {displayAlbumPhoto && <img src={displayAlbumPhoto}></img>}
            {!displayAlbumPhoto && (
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleFile(event.target.files)}
              ></input>
            )}
          </div>
        </div>
        <div className="albumListBox">
          <div className="albumList"></div>
        </div>
      </div>
    </div>
  );
}

export default MyAlbum;
