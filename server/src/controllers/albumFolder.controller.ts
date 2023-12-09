import { RequestHandler } from "express";
import {
  deleteFile,
  downloadFile,
  uploadFile,
} from "../services/imageStorage.service";
import {
  deleteImage,
  getImagesInFolder,
  createImage,
} from "../services/image.service";
import { getUnikImageName } from "../utils/image";

//display images in albumFolder.tsx
export const displayImage: RequestHandler = async (req, res) => {
  const imageName = req.params.uuid;
  const imageBuffer = await downloadFile(imageName);
  res.contentType("image/jpg");
  res.send(imageBuffer);
};

export const getAllImagesInFolder: RequestHandler = async (req, res) => {
  const folderId = Number(req.params.folderId);
  const imageList = await getImagesInFolder(folderId);
  res.status(200).send(imageList);
};

export const createNewImageInFolder: RequestHandler = async (req, res) => {
  const folderId = Number(req.params.folderId);
  if (Array.isArray(req.files)) {
    for (const file of req.files) {
      try {
        const fileType = file.originalname.slice(
          file.originalname.indexOf(".")
        );
        let newImageName = getUnikImageName();
        newImageName += fileType;
        const result = await createImage(file, newImageName, folderId); // error, how to stop??????????
        await uploadFile(newImageName, file.buffer);
      } catch (error) {
        console.error(error);
      }
    }
  }
  res.status(200).send(`success!`);
};
export const deleteImageInfolder: RequestHandler = async (req, res) => {
  const imageId = Number(req.query.imageId);
  const imageUuid = req.query.imageUuid as string;
  await deleteFile(imageUuid);
  await deleteImage(imageId);
  res.status(200).send(`imageId=${imageId} deleted!`);
};
