import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createFolder, getFolder } from "../Axios";
import "../Styles/MyAlbum.css";

function MyAlbum() {
  const userId = Number(useParams().id);
  const [albumPhoto, setAlbumPhoto] = useState<File>();
  const [displayAlbumPhoto, setDisplayAlbumPhoto] = useState<string>();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editAlbumTitle, setEditAlbumTitle] = useState<string>();
  const [editAlbumList, setEditAlbumList] = useState<[]>([]);
  const [test, setTest] = useState<[]>([]);

  useEffect(() => {
    async function getAlbumInfo() {
      // download album main image & title from db
      const result = await getFolder(userId);
      setTest(result);
    }
    void getAlbumInfo();
  }, [userId]);

  function handleFile(file: FileList | null) {
    if (file !== null) {
      setAlbumPhoto(file[0]);
      console.log(file[0]);
      setDisplayAlbumPhoto(URL.createObjectURL(file[0]));
    }
  }
  async function saveAlbumList() {
    if (isEditMode) {
      const HaveAllName = test.every((folder) => folder !== "");
      if (HaveAllName) {
        setIsEditMode(false);
        const eachFolder = test.map((name) => name);
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
        <button className="editAlbumButton" onClick={saveAlbumList}>
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
                  value={editAlbumTitle}
                  onChange={(event) => setEditAlbumTitle(event.target.value)}
                ></input>
              </div>
            </div>
            <div className="albumListBox">
              <div className="albumList">
                <div className="albumListTitle">Album List</div>
                {test &&
                  test.map((folder: Record<string, string>, index) => {
                    return (
                      <li key={index}>
                        <input
                          type="text"
                          placeholder="Album name"
                          value={folder.name}
                          onChange={(event) => {
                            const updateFolder = [
                              ...test.slice(0, index),
                              {
                                ...folder,
                                ["name"]: event.target.value,
                              },
                              ...test.slice(index + 1),
                            ];
                            setTest(updateFolder);
                          }}
                        ></input>
                        <button
                          className="deleteAlbumList"
                          onClick={() => {
                            const delteFolder = [
                              ...test.slice(0, index),
                              ...test.slice(index + 1),
                            ];
                            setTest(delteFolder);
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
                      setTest([...test, newFolder]);
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
              {!editAlbumTitle && <div className="albumTitle">No title</div>}
              {editAlbumTitle && (
                <div className="albumTitle">{editAlbumTitle}</div>
              )}
            </div>
            <div className="albumListBox">
              <div className="albumList">
                <div className="albumListTitle">Album List</div>
                {test.length !== 0 &&
                  test.map((folder: Record<string, string>, index) => (
                    <li key={folder.id}>
                      <Link to={folder.name}>{folder.name}</Link>
                    </li>
                  ))}
                {test.length === 0 && <li>No albums</li>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAlbum;
