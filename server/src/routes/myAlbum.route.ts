import express from "express";
import multer from "multer";
import {
  getAlbumImage,
  getAllAboutMyAlbum,
  uploadAlumImage,
  updateAlbumTitle,
  createNewFolder,
} from "../controllers/myAlbum.controller";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/:userId", getAllAboutMyAlbum);

router.get("/:userId/albumImage", getAlbumImage);

router.post(
  `/:userId/newAlbumImage`,
  upload.array("albumImage"),
  uploadAlumImage
);

router.post(`/:userId/albumTitle`, updateAlbumTitle);

router.post(`/:userId/newFolder`, createNewFolder);

// router.get("/:userId/folders", sortFoldersInMyAlbum);

export default router;
