import { Folder, MyAlbumEdit as MyAlbumEditProps } from "../Types/Folder";
import s from "../Styles/MyAlbumEdit.module.css";

function MyAlbumEdit({
  displayAlbumPhoto,
  setDisplayAlbumPhoto,
  currentAlbumTitle,
  setCurrentAlbumTitle,
  folderList,
  setFolderList,
  setUpdatedAlbumPhoto,
  userId,
}: MyAlbumEditProps) {
  function handleFile(file: FileList | null) {
    if (file !== null) {
      setUpdatedAlbumPhoto(file[0]);
      setDisplayAlbumPhoto(URL.createObjectURL(file[0]));
    }
  }

  return (
    <div className={s.editAlbumBox}>
      <div className={s.albumPhotoBox}>
        <div className={s.albumPhoto}>
          {displayAlbumPhoto && (
            <div className={s.imageInput}>
              <img src={displayAlbumPhoto}></img>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleFile(event.target.files)}
              ></input>
            </div>
          )}
          {!displayAlbumPhoto && (
            <div className={s.imageInput}>
              <div className={s.noImageDiv}>No image</div>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleFile(event.target.files)}
              ></input>
            </div>
          )}
        </div>
        <div className={s.albumTitle}>
          <input
            type="text"
            placeholder="album title"
            value={currentAlbumTitle}
            onChange={(event) => {
              setCurrentAlbumTitle(event.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className={s.albumListBox}>
        <div className={s.albumList}>
          <div className={s.albumListTitle}>Album List</div>
          {folderList &&
            folderList.map((folder, index) => {
              return (
                <li key={index}>
                  <input
                    type="text"
                    placeholder="Album name"
                    value={folder.name}
                    onChange={(event) => {
                      const updateFolder = [
                        ...folderList.slice(0, index),
                        {
                          ...folder,
                          ["name"]: event.target.value,
                        },
                        ...folderList.slice(index + 1),
                      ];
                      setFolderList(updateFolder);
                    }}
                  ></input>
                  <button
                    className={s.deleteAlbumList}
                    onClick={() => {
                      const delteFolder = [
                        ...folderList.slice(0, index),
                        ...folderList.slice(index + 1),
                      ];
                      setFolderList(delteFolder);
                    }}
                  >
                    X
                  </button>
                </li>
              );
            })}
          <div>
            <button
              className={s.addAlbumList}
              onClick={() => {
                const newFolder: Folder = {
                  id: undefined,
                  name: "",
                  user_id: userId,
                  order_value: 0,
                };
                setFolderList([...folderList, newFolder]);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyAlbumEdit;
