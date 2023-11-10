import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  createFolder,
  getMyAlbumInfo,
  postMyAlbumImage,
  postMyAlbumTitle,
  getMyAlbumImage,
} from "../Axios";
import s from "../Styles/MyAlbum.module.css";
import { Folder } from "../Types/Folder";

function MyAlbum() {
  const userId = Number(useParams().userId);
  const [updatedAlbumPhoto, setUpdatedAlbumPhoto] = useState<File>();
  const [currentAlbumTitle, setCurrentAlbumTitle] = useState<string>();
  const [folderList, setFolderList] = useState<Folder[]>([]);
  const [displayAlbumPhoto, setDisplayAlbumPhoto] = useState<string>();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getAlbumInfo() {
      const result = await getMyAlbumInfo(userId);

      if (result.folder.length !== 0) {
        setFolderList(result.folder);
      }
      if (result.album.length !== 0) {
        const albumImage = result.album[0].image_uuid;
        const albumTitle = result.album[0].title;
        if (albumImage) {
          const imageBuffer = await getMyAlbumImage(albumImage);
          setDisplayAlbumPhoto(imageBuffer);
        }
        if (albumTitle) setCurrentAlbumTitle(albumTitle);
      }
    }
    void getAlbumInfo();
  }, [userId]);

  function handleFile(file: FileList | null) {
    if (file !== null) {
      setUpdatedAlbumPhoto(file[0]);
      setDisplayAlbumPhoto(URL.createObjectURL(file[0]));
    }
  }

  async function saveAlbumInfo() {
    if (isEditMode) {
      setIsEditMode(false);
      const HaveAllName = folderList.every((folder) => folder.name !== "");
      if (HaveAllName && !isLoading) {
        setIsLoading(true);
        const eachFolder = folderList.map((name) => name);
        const newFolder = await createFolder(eachFolder, userId);
        const result = await getMyAlbumInfo(userId);
        if (result.folder.length !== 0) {
          setFolderList(result.folder);
        }
        if (updatedAlbumPhoto) {
          await postMyAlbumImage(userId, updatedAlbumPhoto);
        }
        if (currentAlbumTitle) {
          await postMyAlbumTitle(userId, currentAlbumTitle);
        }
      } else {
        setIsLoading(false);
        setIsEditMode(true);
        console.log("all folder should have its own name"); //popup!!!!!!!!
      }
      setIsLoading(false);
    } else {
      setIsEditMode(true);
    }
  }
  return (
    <div className={s.pageContainer}>
      <div className={s.albumBox}>
        <button
          className={s.editAlbumButton}
          disabled={isLoading ? true : false}
          onClick={saveAlbumInfo}
        >
          {isEditMode ? "Save" : "Edit"}
        </button>
        {isEditMode && (
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
        )}
        {!isEditMode && (
          <div className={s.displayAlbumBox}>
            <div className={s.albumPhotoBox}>
              <div className={s.albumPhoto}>
                {displayAlbumPhoto && <img src={displayAlbumPhoto}></img>}
                {!displayAlbumPhoto && (
                  <div className={s.noImageDiv}>No image</div>
                )}
              </div>
              {!currentAlbumTitle && (
                <div className={s.albumTitle}>No title</div>
              )}
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
                      <Link to={`/albumFolder/${folder.id}`}>
                        {folder.name}
                      </Link>
                    </li>
                  ))}
                {folderList.length === 0 && <li>No albums</li>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAlbum;
