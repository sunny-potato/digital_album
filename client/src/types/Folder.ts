import ImageUpload from "../Components/ImageUpload";

export type Folder = {
  id: number | undefined;
  name: string;
  user_id: number;
  order_value: number;
  created_at: Date | undefined;
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

export type ImageUpload = {
  setSelectedImageBlob: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedImageList: React.Dispatch<React.SetStateAction<File[]>>;
};

export type ImageFilesHandler = {
  fileList: FileList | null;
  setSelectedImageBlob: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedImageList: React.Dispatch<React.SetStateAction<File[]>>;
};

export type ImagePreviewPopup = {
  selectedImageBlob: string[];
  setSelectedImageBlob: React.Dispatch<React.SetStateAction<string[]>>;
  selectedImageList: File[];
  setSelectedImageList: React.Dispatch<React.SetStateAction<File[]>>;
  folderId: number;
  onClose: () => void;
};

export type ImageDisplay = {
  uploadedImageList: Image[];
  setUploadedImageList: (value: Image[]) => void;
};
