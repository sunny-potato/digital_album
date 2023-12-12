import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import s from "../Styles/MyAlbumDisplay.module.css";
import { MyalbumDisplay as MyalbumDisplayProps } from "../Types/MyAlbum";
import { DropDownList } from "../Types/Commonness";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DropDown from "./DropDown";
import { getSortedFoldersInMyAlbum } from "../Services/myAlbum";
import { setLocalStorageData } from "../Utils/localstorage";
import { dropDownContent, getDropDownDefaultValue } from "../Utils/dropDown";
import { Tooltip } from "@mui/material";
import { formatFileSize, formatDateTime } from "../Utils/formatData";

function MyAlbumDisplay({
  albumData,
  albumImageBuffer,
  folderList,
  setFolderList,
}: MyalbumDisplayProps) {
  const userId = Number(useParams().userId);
  const [myAlbumDropDownList, setMyAlbumDropDownList] = useState<DropDownList>(
    getDropDownDefaultValue("myAlbumDropDownList")
  );

  useEffect(() => {
    const updateDropDownList = async () => {
      const result = await getSortedFoldersInMyAlbum(
        userId,
        myAlbumDropDownList
      );
      const sortedFolders = result.data;
      setLocalStorageData("myAlbumDropDownList", myAlbumDropDownList);
      // setLocalStorageData("sortedFolders", sortedFolders); // need it??
      setFolderList(sortedFolders);
    };
    updateDropDownList();
  }, [myAlbumDropDownList]);

  return (
    <div className={s.displayAlbumBox}>
      <div className={s.albumPhotoBox}>
        <div className={s.albumPhoto}>
          {albumImageBuffer ? (
            <img src={albumImageBuffer} alt="my album main image"></img>
          ) : (
            <div className={s.noImageDiv}>No image</div>
          )}
        </div>
        {albumData.title ? (
          <div className={s.albumTitle}>{albumData.title}</div>
        ) : (
          <div className={s.albumTitle}>No title</div>
        )}
      </div>
      <div className={s.albumListBox}>
        <div className={s.albumList}>
          <DropDown
            dropDownList={myAlbumDropDownList}
            setDropDownList={setMyAlbumDropDownList}
            dropDownContent={dropDownContent}
          />
          <div className={s.folderList}>
            <div className={s.folderListInner}>
              {folderList.length !== 0 &&
                folderList.map((folder) => (
                  <div key={folder.id} className={s.folderCard}>
                    <Link
                      to={`/albumFolder/${folder.id}`}
                      className={s.contentInCard}
                    >
                      <FolderOpenIcon
                        fontSize="large"
                        className={s.folderIcon}
                      />
                      <div className={s.contentInner}>
                        <div className={s.folderTitle}>{folder.name}</div>
                        <div className={s.folderData}>
                          <div className={s.folderSize}>
                            {formatFileSize(folder.size)}
                          </div>
                          <div className={s.folderCreatedDate}>
                            {formatDateTime(folder.created_at)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
            {folderList.length === 0 && <li key={0}>No folders</li>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAlbumDisplay;
