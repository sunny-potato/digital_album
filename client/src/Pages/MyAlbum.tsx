import { useState } from "react";
import { Link } from "react-router-dom";
import { createFolder } from "../Axios";
import "../Styles/MyAlbum.css";

function MyAlbum() {
  const [albumPhoto, setAlbumPhoto] = useState<File>();
  const [displayAlbumPhoto, setDisplayAlbumPhoto] = useState<string>();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editAlbumTitle, setEditAlbumTitle] = useState<string>();
  const [editAlbumList, setEditAlbumList] = useState<string[]>([]);
  console.log(editAlbumList);

  function handleFile(file: FileList | null) {
    if (file !== null) {
      setAlbumPhoto(file[0]);
      console.log(file[0]);
      setDisplayAlbumPhoto(URL.createObjectURL(file[0]));
    }
  }
  async function saveAlbumList() {
    if (isEditMode) {
      const HaveAllName = editAlbumList.every((list) => list !== "");
      if (HaveAllName) {
        console.log(editAlbumList);
        setIsEditMode(false);
        const newFolder = await createFolder(editAlbumList);
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
                {editAlbumList &&
                  editAlbumList.map((list, index) => {
                    return (
                      <li key={index}>
                        <input
                          type="text"
                          placeholder="Album name"
                          value={editAlbumList[index]}
                          onChange={(event) => {
                            const updateAlbumList = [
                              ...editAlbumList.slice(0, index),
                              event.target.value,
                              ...editAlbumList.slice(index + 1),
                            ];
                            setEditAlbumList(updateAlbumList);
                          }}
                        ></input>
                        <button
                          className="deleteAlbumList"
                          onClick={() => {
                            const updateAlbumList = [
                              ...editAlbumList.slice(0, index),
                              ...editAlbumList.slice(index + 1),
                            ];
                            setEditAlbumList(updateAlbumList);
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
                      const newTest = [""];
                      setEditAlbumList([...editAlbumList, ...newTest]);
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
                {editAlbumList.length !== 0 &&
                  editAlbumList.map((list, index) => (
                    <li key={index}>
                      <Link to={list}>{list}</Link>
                    </li>
                  ))}
                {editAlbumList.length === 0 && <li>No albums</li>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAlbum;
