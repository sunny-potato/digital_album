import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createFolder, getMyAlbumInfo, createMyAlbum } from "../Axios";
import "../Styles/MyAlbum.css";

function MyAlbum() {
  const userId = Number(useParams().id);
  const [album, setAlbum] = useState<[]>();
  const [albumPhoto, setAlbumPhoto] = useState<File>();
  const [albumTitle, setAlbumTitle] = useState<string>();
  const [folderList, setFolderList] = useState<[]>([]);
  const [displayAlbumPhoto, setDisplayAlbumPhoto] = useState<string>();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  console.log(albumPhoto, albumTitle);

  useEffect(() => {
    async function getAlbumInfo() {
      const result = await getMyAlbumInfo(userId);
      setFolderList(result.folder);
      // if (result.album.length == 0) {
      //   const newAlbum
      // }
      setAlbum(result.album);
    }
    void getAlbumInfo();
  }, [userId]);

  function handleFile(file: FileList | null) {
    if (file !== null) {
      setAlbumPhoto(file[0]);
      setDisplayAlbumPhoto(URL.createObjectURL(file[0]));
    }
  }
  async function saveAlbumInfo() {
    // console.log(folderList.every((folder) => folder.name !== ""));
    if (isEditMode) {
      const HaveAllName = folderList.every((folder) => folder !== "");
      if (HaveAllName) {
        setIsEditMode(false);
        const eachFolder = folderList.map((name) => name);
        const newFolder = await createFolder(eachFolder, userId);
        console.log(newFolder);
      } else {
        console.log("all albums should have its own name"); //popup
      }
    } else {
      setIsEditMode(true);
    }
  }
  return (
    <div className="pageContainer">
      <div className="albumBox">
        <button className="editAlbumButton" onClick={saveAlbumInfo}>
          {isEditMode ? "Save" : "Edit"}
        </button>
        {isEditMode && (
          <div className="editAlbumBox">
            <div className="albumPhotoBox">
              <div className="albumPhoto">
                {displayAlbumPhoto && (
                  <div className="imageInput">
                    <img src={displayAlbumPhoto}></img>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleFile(event.target.files)}
                    ></input>
                  </div>
                )}
                {!displayAlbumPhoto && (
                  <div className="imageInput">
                    <div className="noImageDiv">No image</div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleFile(event.target.files)}
                    ></input>
                  </div>
                )}
              </div>
              <div className="albumTitle">
                <input
                  type="text"
                  placeholder="album title"
                  value={albumTitle}
                  onChange={(event) => {
                    setAlbumTitle(event.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div className="albumListBox">
              <div className="albumList">
                <div className="albumListTitle">Album List</div>
                {folderList &&
                  folderList.map((folder: Record<string, string>, index) => {
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
                          className="deleteAlbumList"
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
                    className="addAlbumList"
                    onClick={() => {
                      const newFolder = {
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
          <div className="displayAlbumBox">
            <div className="albumPhotoBox">
              <div className="albumPhoto">
                {displayAlbumPhoto && <img src={displayAlbumPhoto}></img>}
                {!displayAlbumPhoto && (
                  <div className="noImageDiv">No image</div>
                )}
              </div>
              {!albumTitle && <div className="albumTitle">No title</div>}
              {albumTitle && <div className="albumTitle">{albumTitle}</div>}
            </div>
            <div className="albumListBox">
              <div className="albumList">
                <div className="albumListTitle">Album List</div>
                {folderList.length !== 0 &&
                  folderList.map((folder: Record<string, string>, index) => (
                    <li key={folder.id}>
                      <Link to={folder.name}>{folder.name}</Link>
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
