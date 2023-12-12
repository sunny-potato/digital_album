import { RequestHandler } from "express";
import {
  calculateFolderSize,
  createFolder,
  deleteFolder,
  getFolder,
  getSortedFoldersByAsc,
  getSortedFoldersByDesc,
  updateFoderSize,
  updateFolder,
} from "../services/folder.service";
import {
  createMyAlbum,
  getMyAlbum,
  updateMyAlbumImage,
  updateMyAlbumTitle,
} from "../services/myAlbum.service";
import {
  deleteFile,
  downloadFile,
  uploadFile,
} from "../services/imageStorage.service";
import { FolderList } from "../models/types";
import { getUnikImageName } from "../utils/image";

export const getAllAboutMyAlbum: RequestHandler = async (req, res) => {
  const userId = Number(req.params.userId);
  const album = await getMyAlbum(userId);
  let folders = await getFolder(userId);
  folders.map(async (folder) => {
    const sumImages = await calculateFolderSize(folder.id);
    await updateFoderSize(folder.id, sumImages[0].total);
  });
  const updatedFolders = await getFolder(userId);
  folders = updatedFolders;
  const result = { album, folders };
  res.status(200).send(result);
};

export const getAlbumImage: RequestHandler = async (req, res) => {
  const imageName = req.query.filename as string;
  const imageBuffer = await downloadFile(imageName);
  res.contentType("image/jpg");
  res.status(200).send(imageBuffer);
};

export const uploadAlumImage: RequestHandler = async (req, res) => {
  const userId = Number(req.params.userId);
  if (Array.isArray(req.files)) {
    for (const file of req.files) {
      try {
        const fileType = file.originalname.slice(
          file.originalname.indexOf(".")
        );
        let newImageName = getUnikImageName();
        newImageName += fileType;
        const findUser = await getMyAlbum(userId);
        if (findUser.length === 0) {
          await createNewAlbumImage(userId, newImageName, file.buffer);
        } else {
          const oldImageName = findUser[0].image_uuid;
          await updateAlbumImage(
            userId,
            newImageName,
            file.buffer,
            oldImageName
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  res.status(200).send("Uploaded albumImage!");
};
export const createNewAlbumImage = async (
  userId: number,
  newImageName: string,
  newImageBuffer: string | Buffer
) => {
  const album = {
    imageUuid: newImageName,
    title: "",
    userId: userId,
  };
  await createMyAlbum(album);
  console.log(`new album for userId with ${userId} created`);
  await uploadFile(newImageName, newImageBuffer);
};

export const updateAlbumImage = async (
  userId: number,
  newImageName: string,
  newImageBuffer: string | Buffer,
  oldImageName: string
) => {
  await updateMyAlbumImage({
    userId: userId,
    imageUuid: newImageName,
  });
  console.log(`album Image for userId with ${userId} updated`);
  await uploadFile(newImageName, newImageBuffer);
  await deleteFile(oldImageName);
};

export const updateAlbumTitle: RequestHandler = async (req, res) => {
  const userId = Number(req.params.userId);
  const title = Object.keys(req.body)[0] as string;
  await updateMyAlbumTitle({ title, userId });
  res.status(200).send("updated albumTitle");
};

export const createNewFolder: RequestHandler = async (req, res) => {
  const userId = Number(req.params.userId);
  const folderListFromClient = req.body as FolderList;
  const folderListFromDB = await getFolder(userId);

  for (const [index, folder] of folderListFromClient.entries()) {
    if (folder.id === undefined && folder.createdAt === undefined) {
      const result = await createFolder({
        name: folder.name,
        order_value: index + 1,
        user_id: userId,
        created_at: new Date(),
      });
    }
    if (folder.id !== undefined && folder.createdAt !== undefined) {
      const result = await updateFolder({
        id: folder.id,
        name: folder.name,
        order_value: index + 1,
        created_at: folder.createdAt,
      });
    }
  }

  function findDifferentFolder() {
    let difference = folderListFromDB.filter((oldFolder) => {
      const isItDifferent = folderListFromClient.every((newFolder) => {
        return oldFolder.id !== newFolder.id;
      });
      if (isItDifferent) {
        return oldFolder;
      }
    });
    return difference;
  }

  const deleteFolderList = findDifferentFolder();
  if (deleteFolderList.length !== 0) {
    deleteFolderList.map(async (folder) => {
      return await deleteFolder(folder.id);
    });
  }

  res.status(200).send("updated folder!");
};

export const sortFoldersInMyAlbum: RequestHandler = async (req, res) => {
  const userId = Number(req.params.userId);
  const orderBy = req.query.orderBy;
  let sortBy = req.query.sortBy;
  if (req.query.sortBy === "date") {
    sortBy = "created_at";
  }
  let sortedFoldersList;
  if (orderBy === "asc") {
    sortedFoldersList = await getSortedFoldersByAsc(userId, sortBy as string);
  } else {
    sortedFoldersList = await getSortedFoldersByDesc(userId, sortBy as string);
  }
  res.status(200).send(sortedFoldersList);
};
