import { MyAlbumEdit as MyAlbumEditProps } from "../Types/MyAlbum";
import s from "../Styles/MyAlbumEdit.module.css";
import PopupMessage from "./PopupMessage";
import MyAlbumEditPhoto from "./MyAlbumEditPhoto";
import MyAlbumEditFolder from "./MyAlbumEditFolder";

function MyAlbumEdit({
  albumImageBuffer,
  setAlbumImageBuffer,
  albumTitle,
  setAlbumTitle,
  folderList,
  setFolderList,
  setAlbumImageFile,
  userId,
  isAllFoldersNamed,
  setIsAllFoldersNamed,
}: MyAlbumEditProps) {
  return (
    <div className={s.editAlbumBox}>
      <PopupMessage
        isRequirementFulfilled={isAllFoldersNamed}
        setIsRequirementFulfilled={setIsAllFoldersNamed}
        popupMessage={"All folders should be named"}
        buttonMessage={"OK"}
      />
      <MyAlbumEditPhoto
        albumImageBuffer={albumImageBuffer}
        setAlbumImageBuffer={setAlbumImageBuffer}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        setAlbumImageFile={setAlbumImageFile}
      />
      <MyAlbumEditFolder
        folderList={folderList}
        setFolderList={setFolderList}
        userId={userId}
      />
    </div>
  );
}
export default MyAlbumEdit;
