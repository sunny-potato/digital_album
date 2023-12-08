import { Folder } from "./Folder";

export type AlbumData = {
  image_uuid: string | undefined;
  order_by: string;
  sort_by: string;
  title: string | undefined;
  user_id: number;
};

export type MyalbumDisplay = {
  albumData: AlbumData;
  setAlbumData: (value: AlbumData) => void;
  albumImageBuffer: string | undefined;
  // albumTitle: string | undefined;
  folderList: Folder[];
  // setFolderList: (value: Folder[]) => void;
  // userId: number;
};
export type MyAlbumEdit = {
  albumData: AlbumData;
  setAlbumData: (value: AlbumData) => void;
  albumImageBuffer: string | undefined;
  setAlbumImageBuffer: (value: string) => void;
  folderList: Folder[];
  setFolderList: (value: Folder[]) => void;
  setAlbumImageFile: (value: File) => void;
  userId: number;
  isAllFoldersNamed: boolean;
  setIsAllFoldersNamed: (value: boolean) => void;
};

export type MyAlbumEditPhoto = {
  albumData: AlbumData;
  setAlbumData: (value: AlbumData) => void;
  albumImageBuffer: string | undefined;
  setAlbumImageBuffer: (value: string) => void;
  setAlbumImageFile: (value: File) => void;
};

export type MyAlbumEditFolder = {
  folderList: Folder[];
  setFolderList: (value: Folder[]) => void;
  userId: number;
};
export type CurrentMyalbumData = {
  folderList: Folder[];
  albumImageBuffer: string | undefined;
  albumData: AlbumData | undefined;
};
// export type SortOrderType = {
//   sortBy: string;
//   orderBy: string;
// };
