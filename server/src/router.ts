import express from "express";
import { postImage, getImage, getFolder } from "./query";
import multer from "multer";
import { uploadFile, downloadFile } from "./imageStorage";
import crypto from "crypto";
import { Row } from "postgres";

const router = express.Router();

// memorystorage : stores files in memory as buffer objects.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function getUnikImageName() {
  return crypto.randomUUID();
}

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

router.post(`/myAlbum`, async (req, res) => {
  console.log(req.query, req.body);
  const userId = Number(req.query.userId);
  const folderListFromClient = req.body;
  // if (typeof userId == "number") {
  const folderListFromDB = await getFolder(userId);
  for (let folder of folderListFromDB) {
    console.log("folder", folder);
    const filteredFolder = folderListFromClient.filter(
      (each: Row) => each !== folder.name
    );
    console.log(filteredFolder);
  }
  // console.log("-----------------", folderList);
  // }
});

// for(let folder of folderList) {
// }
// console.log(folder);
export default router;
