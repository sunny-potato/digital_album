import { RequestHandler } from "express";
import {
  createFolder,
  deleteFolder,
  getFolder,
  sortFoldersByAsc,
  sortFoldersByDesc,
  updateFolder,
} from "../services/folder";
import {
  createMyAlbum,
  getMyAlbum,
  updateMyAlbumImage,
  updateMyAlbumTitle,
} from "../services/myAlbum";
import { deleteFile, downloadFile, uploadFile } from "../services/imageStorage";
import { FolderList } from "../models/types";
import { getUnikImageName } from "../utils/image";
// import { convertSortAndOrderForClient } from "../utils/sortAndOrder";

export const getAllAboutMyAlbum: RequestHandler = async (req, res) => {
  const userId = Number(req.params.userId);
  const album = await getMyAlbum(userId);
  let result;
  if (album.length === 0) {
    // new user have no my album yet, so send empty data to client
    result = { album: [], folder: [] };
  } else {
    const folder = await getFolder(userId);
    result = { album, folder };
  }

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
          createNewAlbumImage(userId, newImageName, file.buffer);
        } else {
          await updateMyAlbumImage({
            image_uuid: newImageName,
            user_id: userId,
          });
          await uploadFile(newImageName, file.buffer);
          const oldImageName = findUser[0].image_uuid;
          await deleteFile(oldImageName);
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
    image_uuid: newImageName,
    title: "",
    user_id: userId,
  };
  await createMyAlbum(album);
  await uploadFile(newImageName, newImageBuffer);
};

export const updateAlbumTitle: RequestHandler = async (req, res) => {
  const user_id = Number(req.params.userId);
  const title = Object.keys(req.body)[0] as string;
  await updateMyAlbumTitle({ title, user_id });

  res.status(200).send("updated albumTitle");
};

export const createNewFolder: RequestHandler = async (req, res) => {
  const userId = Number(req.params.userId);
  const folderListFromClient = req.body as FolderList;
  const folderListFromDB = await getFolder(userId);

  for (const [index, folder] of folderListFromClient.entries()) {
    if (folder.id === undefined && folder.created_at === undefined) {
      const result = await createFolder({
        name: folder.name,
        order_value: index + 1,
        user_id: userId,
        created_at: new Date(),
      });
    }
    if (folder.id !== undefined && folder.created_at !== undefined) {
      const result = await updateFolder({
        id: folder.id,
        name: folder.name,
        order_value: index + 1,
        created_at: folder.created_at,
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

// export const sortFoldersInMyAlbum: RequestHandler = async (req, res) => {
//   const userId = Number(req.params.userId);
//   let sortBy = "";
//   let getSortedFolders;

//   if (req.query.sortBy === "Name") {
//     sortBy = "name";
//   }
//   if (req.query.sortBy === "Date") {
//     sortBy = "created_at";
//   }
//   if (req.query.orderBy == "A-Z") {
//     getSortedFolders = await sortFoldersByAsc(userId, sortBy);
//   }
//   if (req.query.orderBy == "Z-A") {
//     getSortedFolders = await sortFoldersByDesc(userId, sortBy);
//   }
//   res.status(200).send(getSortedFolders);
// };
