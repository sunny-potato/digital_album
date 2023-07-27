import express from "express";
import { postImage, getImage } from "./query";
import multer from "multer";
import { uploadFile, downloadFile } from "./imageStorage";
import crypto from "crypto";
// import path from "path";
// import fs from "fs";

const router = express.Router();

function getRandomName() {
  return crypto.randomUUID();
}

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// memorystorage : stores files in memory as buffer objects.

// router.get("/digitalAlbum", async (req, res) => {
//   const id = Number(req.query.id);
//   console.log(id);
//   const test = await getElement(id);
//   res.send(test);
// });

// router.post("/digitalAlbum", async (req, res) => {
//   const data = req.body;
//   const element = await createElement(data.id, data.src, data.name);
//   res.send("updated!");
// });

router.post("/digitalAlbum/post", upload.array("image"), async (req, res) => {
  if (Array.isArray(req.files)) {
    for (const file of req.files) {
      console.log(file);
      await postImage(file);
      uploadFile(file.originalname, file.buffer).catch(console.error);
    }
  }
  // res.send("success!");
});

router.get("/getImage", async (req, res) => {
  // const id = Number(req.query.id);
  // console.log(req.query.filename);
  await downloadFile("pexels-nati-17362172.jpg").catch(console.error);
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
