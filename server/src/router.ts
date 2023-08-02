import express from "express";
import {
  postImage,
  getImage,
  getMyAlbum,
  createMyAlbum,
  getFolder,
  updateFolder,
  createFolder,
  deleteFolder,
} from "./query";
import multer from "multer";
import { uploadFile, downloadFile } from "./imageStorage";
import crypto from "crypto";
import { Row } from "postgres";
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

router.get("/digitalAlbum/getImages", async (req, res) => {
  // const id = Number(req.query.id);
  // console.log(req.query.filename);
  const fileBuffer = await downloadFile("pexels-nati-17362172.jpg");
  res.contentType("image/jpg"); //filetype
  res.send(fileBuffer);

  // if (req.query.fileName && typeof req.query.filename == "string") {
  //   //   // const result = await getImage(id);
  //   //   // const file = result[0];
  //   //   // console.log(result);
  //   console.log("hei");
  // }

  // res.contentType(file.type);
  // res.send(file.name);
});

router.post(
  "/digitalAlbum/postImages",
  upload.array("image"),
  async (req, res) => {
    if (Array.isArray(req.files)) {
      for (const file of req.files) {
        try {
          const fileType = file.originalname.slice(
            file.originalname.indexOf(".")
          );
          let newImageName = getUnikImageName();
          newImageName += fileType;
          await postImage(file, newImageName);
          await uploadFile(newImageName, file.buffer);
        } catch (error) {
          console.error(error);
        }
      }
    }
    res.status(200).send("success!");
  }
);

router.get("/myAlbum", async (req, res) => {
  const userId = Number(req.query.userId);
  const album = await getMyAlbum(userId);
  const folder = await getFolder(userId);
  const result = { album, folder };
  // console.log(result);
  res.status(200).send(result);
});

router.post(`/myAlbum/newAlbum`, async (req, res) => {
  const userId = Number(req.query.userId);
  const newAlbum = req.body;
  // console.log(newAlbum);
  if (newAlbum.id === undefined) {
    console.log(newAlbum);
    await createMyAlbum(newAlbum);
  }
  // createMyAlbum()
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
      // console.log("create folder id : ", result);
    } else {
      const result = await updateFolder({
        id: folder.id,
        name: folder.name,
        order_value: index + 1,
      });
      // console.log("update folder : ", result);
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
