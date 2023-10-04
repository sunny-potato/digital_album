import express from "express";
import {
  getAllImagesInFolder,
  postImage,
  deleteImage,
  getMyAlbum,
  createMyAlbum,
  updateMyAlbumImage,
  updateMyAlbumTitle,
  getFolder,
  updateFolder,
  createFolder,
  deleteFolder,
  getAllLoginInfo,
  findPassword,
  findUsername,
  createNewUserInfo,
  createNewUserAccount,
} from "./query";
import multer from "multer";
import { uploadFile, downloadFile, deleteFile } from "./imageStorage";
import crypto, { sign } from "crypto";
import { Row } from "postgres";
import { throws } from "assert";
import { Console } from "console";
import { FolderList, UserAccount, AccountFromUser } from "../src/types";

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
router.delete("/albumFolder/deleteImage", async (req, res) => {
  const imageId = Number(req.query.imageId);
  const imageUuid = req.query.imageUuid as string;
  await deleteFile(imageUuid);
  await deleteImage(imageId);
  res.status(200).send(`imageId=${imageId} deleted!`);
});

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
  const folderListFromClient = req.body as FolderList;
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

// login
router.get(`/login`, async (req, res) => {
  const accountFromUser = req.query as AccountFromUser;
  // console.log(accountFromUser);
  const accountListFromDB = await getAllLoginInfo();
  console.log(accountListFromDB);
  const accountValidationResult = isUserAccountValidated(
    accountFromUser,
    accountListFromDB
  );
  res.status(200).send(accountValidationResult);
});

function isUserAccountValidated(
  accountFromUser: { username: string; password: string },
  accountListFromDB: any
) {
  const matchedUserName = accountListFromDB.find((account: UserAccount) => {
    return account.user_name === accountFromUser.username;
  });
  if (matchedUserName === undefined) {
    return { result: false };
  } else {
    if (matchedUserName.user_password === accountFromUser.password) {
      return {
        result: true,
        username: matchedUserName.user_name,
        userId: matchedUserName.user_id,
      };
    } else {
      return { result: false };
    }
  }
}

//signup
router.get(`/signup`, async (req, res) => {
  const usernameFromUser = req.query.username;
  const foundUsername = await findUsername(usernameFromUser as string);
  let isUsernameValid;
  if (foundUsername.length === 1) {
    isUsernameValid = false;
  } else {
    isUsernameValid = true;
  }
  res.status(200).send(isUsernameValid);
});

router.post(`/signup/newuser`, async (req, res) => {
  const signupInfo = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthdate: req.body.birthdate,
    email: req.body.email,
    telephon: req.body.telephon,
    address: req.body.address,
  };
  const newUser = await createNewUserInfo(signupInfo);
  const newUserId = Number(newUser[0].id);

  if (newUserId) {
    const accountInfo = {
      username: req.body.username,
      password: req.body.password,
      userId: newUserId,
    };
    const newAccount = await createNewUserAccount(accountInfo);
    res.status(200).send("success");
  }
});
