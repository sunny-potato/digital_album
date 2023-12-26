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
  getSortedImagesByAsc,
  getSortedImagesByDesc,
  getImageName,
} from "../services/image.service";
import { getUnikImageName } from "../utils/image";

//display images in albumFolder.tsx
export const displayImage: RequestHandler = async (req, res) => {
  const imageName = req.params.uuid;
  const imageBuffer = await downloadFile(imageName);
  res.contentType("image/jpg");
  res.header("Content-Disposition", "attachment"); // save image in local
  res.send(imageBuffer);
};

export const downloadImage: RequestHandler = async (req, res) => {
  const imageName = req.params.uuid;
  const imageBuffer = await downloadFile(imageName);
  res.contentType("image/jpg");
  res.header("Content-Disposition", "attachment"); // save image in local
  res.send(imageBuffer);
};

export const getOriginalImageName: RequestHandler = async (req, res) => {
  const imageName = req.params.uuid;
  const originalImageName = await getImageName(imageName);
  res.send(originalImageName[0].original_name);
};

export const getAllImagesInFolder: RequestHandler = async (req, res) => {
  const folderId = Number(req.params.folderId);
  const imageList = await getImagesInFolder(folderId);
  res.status(200).send(imageList);
};

export const createNewImageInFolder: RequestHandler = async (req, res) => {
  const folderId = Number(req.params.folderId);
  if (Array.isArray(req.files)) {
    for (const [index, file] of req.files.entries()) {
      try {
        const fileType = file.originalname.slice(
          file.originalname.indexOf(".")
        );
        let newImageName = getUnikImageName();
        newImageName += fileType;
        const result = await createImage({
          file: file,
          uuid: newImageName,
          folderId: folderId,
          orderValue: index + 1,
          createdAt: new Date(),
        });
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

export const getSortedImagesInfolder: RequestHandler = async (req, res) => {
  const folderId = Number(req.params.folderId);
  const orderBy = req.query.orderBy;
  let sortBy = req.query.sortBy;
  if (req.query.sortBy === "date") {
    sortBy = "created_at";
  }
  if (req.query.sortBy === "name") {
    sortBy = "original_name";
  }
  let sortedImagesList;
  if (orderBy === "asc") {
    sortedImagesList = await getSortedImagesByAsc(folderId, sortBy as string);
  } else {
    sortedImagesList = await getSortedImagesByDesc(folderId, sortBy as string);
  }
  res.status(200).send(sortedImagesList);
};
