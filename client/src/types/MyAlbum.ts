import { Folder } from "./Folder";

export type MyalbumDisplay = {
  albumImageBuffer: string | undefined;
  albumTitle: string | undefined;
  folderList: Folder[];
  setFolderList: (value: Folder[]) => void;
  userId: number;
};
export type MyAlbumEdit = {
  albumImageBuffer: string | undefined;
  setAlbumImageBuffer: (value: string) => void;
  albumTitle: string | undefined;
  setAlbumTitle: (value: string) => void;
  folderList: Folder[];
  setFolderList: (value: Folder[]) => void;
  setAlbumImageFile: (value: File) => void;
  userId: number;
  isAllFoldersNamed: boolean;
  setIsAllFoldersNamed: (value: boolean) => void;
};

export type MyAlbumEditPhoto = {
  albumImageBuffer: string | undefined;
  setAlbumImageBuffer: (value: string) => void;
  albumTitle: string | undefined;
  setAlbumTitle: (value: string) => void;
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
  albumTitle: string | undefined;
};
export type SortOrderType = {
  sortBy: string;
  orderBy: string;
};
