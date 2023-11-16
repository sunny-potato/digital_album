import { Folder, MyAlbumEdit as MyAlbumEditProps } from "../Types/Folder";
import s from "../Styles/MyAlbumEdit.module.css";
import { useSubmit } from "react-router-dom";
import { useState } from "react";

function MyAlbumEdit({
  displayAlbumPhoto,
  setDisplayAlbumPhoto,
  currentAlbumTitle,
  setCurrentAlbumTitle,
  folderList,
  setFolderList,
  setUpdatedAlbumPhoto,
  userId,
  isAllFoldersNamed,
  setIsAllFoldersNamed,
}: MyAlbumEditProps) {
  function handleFile(file: FileList | null) {
    if (file !== null) {
      setUpdatedAlbumPhoto(file[0]);
      setDisplayAlbumPhoto(URL.createObjectURL(file[0]));
    }
  }

  return (
    <div className={s.editAlbumBox}>
      <div
        className={s.warningPopupBackground}
        style={{
          visibility: isAllFoldersNamed ? "hidden" : "visible",
        }}
      >
        <div className={s.displayWarningPopup}>
          <div>All folders should be named</div>
          <button onClick={() => setIsAllFoldersNamed(true)}>OK</button>
        </div>
      </div>
      <div className={s.albumPhotoBox}>
        <div className={s.albumPhoto}>
          <div className={s.imageInput}>
            {displayAlbumPhoto ? (
              <img src={displayAlbumPhoto}></img>
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
            value={currentAlbumTitle}
            onChange={(event) => {
              setCurrentAlbumTitle(event.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className={s.albumListBox}>
        <div className={s.albumList}>
          <div className={s.albumListTitle}>Folder List</div>
          {folderList &&
            folderList.map((folder, index) => {
              return (
                <li key={index} className={s.folderList}>
                  <button
                    className={s.deleteFolderListButton}
                    onClick={() => {
                      const delteFolder = [
                        ...folderList.slice(0, index),
                        ...folderList.slice(index + 1),
                      ];
                      setFolderList(delteFolder);
                    }}
                  >
                    x
                  </button>
                  <input
                    type="text"
                    placeholder="Folder name"
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
                </li>
              );
            })}
          <li>
            <button
              className={s.addFolderListButton}
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
          </li>
        </div>
      </div>
    </div>
  );
}
export default MyAlbumEdit;