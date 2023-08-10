import express from "express";
import {
  postImage,
  getAllImagesInFolder,
  getMyAlbum,
  createMyAlbum,
  updateMyAlbumImage,
  updateMyAlbumTitle,
  getFolder,
  updateFolder,
  createFolder,
  deleteFolder,
} from "./query";
import multer from "multer";
import { uploadFile, downloadFile, deleteFile } from "./imageStorage";
import crypto from "crypto";
import { Row } from "postgres";
import { throws } from "assert";
import { Console } from "console";

type folderList = {
  id: number | undefined;
  name: string;
  userId: number;
  order_value: number;
}[];
const router = express.Router();

// memorystorage : stores files in memory as buffer objects.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function getUnikImageName() {
  return crypto.randomUUID();
}

router.get("/albumFolder/image/:uuid", async (req, res) => {
  const imageName = req.params.uuid;
  const imageBuffer = await downloadFile(imageName);
  res.contentType("image/jpg");
  res.send(imageBuffer);
});

router.get("/albumFolder/getAllImages", async (req, res) => {
  const folderId = Number(req.query.folderId);
  const imageList = await getAllImagesInFolder(folderId);
  res.send(imageList);
});

router.post(
  "/albumFolder/postImage",
  upload.array("image"),
  async (req, res) => {
    const folderId = Number(req.query.folderId);
    if (Array.isArray(req.files)) {
      for (const file of req.files) {
        try {
          const fileType = file.originalname.slice(
            file.originalname.indexOf(".")
          );
          let newImageName = getUnikImageName();
          newImageName += fileType;
          const result = await postImage(file, newImageName, folderId); // error, how to stop??????????
          console.log(`Image updated : ${result}`);
          await uploadFile(newImageName, file.buffer);
        } catch (error) {
          console.error(error);
        }
      }
    }
    res.status(200).send(`success!`);
  }
);

router.get("/myAlbum", async (req, res) => {
  const userId = Number(req.query.userId);
  const album = await getMyAlbum(userId);
  const folder = await getFolder(userId);
  const result = { album, folder };
  res.status(200).send(result);
});

router.get("/myAlbum/getAlbumImage", async (req, res) => {
  const imageName = req.query.filename as string;
  const imageBuffer = await downloadFile(imageName);
  res.contentType("image/jpg");
  res.status(200).send(imageBuffer);
});

router.post(
  `/myAlbum/newAlbumImage`,
  upload.array("albumImage"),
  async (req, res) => {
    const userId = Number(req.query.userId);
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
            const album = {
              image_uuid: newImageName,
              title: "",
              user_id: userId,
            };
            await createMyAlbum(album);
            await uploadFile(newImageName, file.buffer);
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
    res.status(200).send("posted albumimage!");
  }
);

router.post(`/myAlbum/albumTitle`, async (req, res) => {
  const user_id = Number(req.query.userId);
  const title = Object.keys(req.body)[0] as string;
  await updateMyAlbumTitle({ title, user_id });

  res.status(200).send("updated albumTitle");
});

router.post(`/myAlbum/newFolder`, async (req, res) => {
  const userId = Number(req.query.userId);
  const folderListFromClient = req.body as folderList;
  const folderListFromDB = await getFolder(userId);

  for (const [index, folder] of folderListFromClient.entries()) {
    if (folder.id === undefined) {
      const result = await createFolder({
        name: folder.name,
        order_value: index + 1,
        user_id: userId,
      });
    } else {
      const result = await updateFolder({
        id: folder.id,
        name: folder.name,
        order_value: index + 1,
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
});

export default router;
