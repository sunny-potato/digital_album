import express from "express";
import {
  // calculateFolderSize,
  createNewImageInFolder,
  deleteImageInfolder,
  displayImage,
  getAllImagesInFolder,
  getSortedImagesInfolder,
} from "../controllers/albumFolder.controller";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/image/:uuid", displayImage); //display images in albumFolder.tsx

router.get("/:folderId/allImages", getAllImagesInFolder);

router.post(
  "/:folderId/newImage",
  upload.array("image"),
  createNewImageInFolder
);

router.delete("/:folderId/deleteImage", deleteImageInfolder);

router.get("/:folderId/sortedImages", getSortedImagesInfolder);

// router.get("/:folderId/folderSizeList", calculateFolderSize);

export default router;
