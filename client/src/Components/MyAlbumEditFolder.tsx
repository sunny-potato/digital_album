import s from "../Styles/MyAlbumEditFolder.module.css";
import { MyAlbumEditFolder as MyAlbumEditFolderProps } from "../Types/MyAlbum";
import { Folder } from "../Types/Folder";

function MyAlbumEditFolder({
  folderList,
  setFolderList,
  userId,
}: MyAlbumEditFolderProps) {
  return (
    <div className={s.albumListBox}>
      <div className={s.albumList}>
        <div className={s.albumListTitle}>Folder List</div>
        <div className={s.folderList}>
          <div className={s.folderListInner}>
            {folderList &&
              folderList.map((folder: Folder, index: number) => (
                <li key={index} className={s.folderList}>
                  <button
                    className={s.deleteFolderListButton}
                    onClick={() => {
                      const deleteFolder = [
                        ...folderList.slice(0, index),
                        ...folderList.slice(index + 1),
                      ];
                      setFolderList(deleteFolder);
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
              ))}
            <li>
              <button
                className={s.addFolderListButton}
                onClick={() => {
                  const newFolder: Folder = {
                    id: undefined,
                    name: "",
                    user_id: userId,
                    order_value: 0,
                    created_at: undefined,
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
    </div>
  );
}
export default MyAlbumEditFolder;
