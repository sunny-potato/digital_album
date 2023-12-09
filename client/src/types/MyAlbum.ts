import { Folder } from "./Folder";

export type AlbumData = {
  id: number | undefined;
  image_uuid: string | undefined;
  title: string | undefined;
  user_id: number;
};

export type MyalbumDisplay = {
  albumData: AlbumData;
  albumImageBuffer: string | undefined;
  folderList: Folder[];
  setFolderList: (value: Folder[]) => void;
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
