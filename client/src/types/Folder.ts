import ImageUpload from "../Components/ImageUpload";

export type Folder = {
  id: number | undefined;
  name: string;
  user_id: number;
  order_value: number;
};

export type Image = {
  id: number;
  origianl_name: string;
  encoding: string;
  size: number;
  type: string;
  uuid: string;
  folder_id?: number;
};

export type ImageSlider = {
  currentImageIndex: number | undefined;
  setCurrentImageIndex: (value: number | undefined) => void;
  imageList: Image[];
  defaultURL: string;
};

export type MyalbumDisplay = {
  displayAlbumPhoto: string | undefined;
  currentAlbumTitle: string | undefined;
  folderList: Folder[];
};

export type MyAlbumEdit = {
  displayAlbumPhoto: string | undefined;
  setDisplayAlbumPhoto: (value: string) => void;
  currentAlbumTitle: string | undefined;
  setCurrentAlbumTitle: (value: string) => void;
  folderList: Folder[];
  setFolderList: (value: Folder[]) => void;
  setUpdatedAlbumPhoto: (value: File) => void;
  userId: number;
  isAllFoldersNamed: boolean;
  setIsAllFoldersNamed: (value: boolean) => void;
};

export type ImageUpload = {
  setSelectedImageBlob: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedImageList: React.Dispatch<React.SetStateAction<File[]>>;
};

export type ImagePreviewPopup = {
  selectedImageBlob: string[];
  setSelectedImageBlob: React.Dispatch<React.SetStateAction<string[]>>;
  selectedImageList: File[];
  setSelectedImageList: React.Dispatch<React.SetStateAction<File[]>>;
  folderId: number;
};
