import express from "express";
import { postImage, getImage } from "./query";
import multer from "multer";
import { uploadFile, downloadFile } from "./imageStorage";
import crypto from "crypto";

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

export default router;
