import express from "express";
import multer from "multer";
import { deleteFile, downloadFile, uploadFile } from "../services/imageStorage";
import { deleteImage, getImagesInFolder, createImage } from "../services/image";
import { getUnikImageName } from "../utils/image";
import {
  createNewImageInFolder,
  deleteImageInfolder,
  getAllImagesInFolder,
} from "../controllers/albumFolder.controller";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// router.get("/image/:uuid", async (req, res) => {
//   const imageName = req.params.uuid;
//   const imageBuffer = await downloadFile(imageName);
//   res.contentType("image/jpg");
//   res.send(imageBuffer);
// });

router.get("/:folderId/allImages", getAllImagesInFolder);

router.post("/:folderId/newImage", createNewImageInFolder);

router.delete("/:folderId/deleteImage", deleteImageInfolder);

export default router;
