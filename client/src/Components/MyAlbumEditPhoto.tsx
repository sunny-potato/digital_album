import s from "../Styles/MyAlbumEditPhoto.module.css";
import { MyAlbumEditPhoto as MyAlbumEditPhotoProps } from "../Types/MyAlbum";

function MyAlbumEditPhoto({
  albumImageBuffer,
  setAlbumImageBuffer,
  albumTitle,
  setAlbumTitle,
  setAlbumImageFile,
}: MyAlbumEditPhotoProps) {
  function handleFile(file: FileList | null) {
    if (file !== null) {
      setAlbumImageFile(file[0]);
      setAlbumImageBuffer(URL.createObjectURL(file[0]));
    }
  }

  return (
    <div className={s.albumPhotoBox}>
      <div className={s.albumPhoto}>
        <div className={s.imageInput}>
          {albumImageBuffer ? (
            <img src={albumImageBuffer}></img>
          ) : (
            <div className={s.noImageDiv}>No image</div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(event) => handleFile(event.target.files)}
          ></input>
        </div>
      </div>
      <div className={s.albumTitle}>
        <input
          type="text"
          placeholder="Album title"
          value={albumTitle}
          onChange={(event) => {
            setAlbumTitle(event.target.value);
          }}
        ></input>
      </div>
    </div>
  );
}

export default MyAlbumEditPhoto;
