import express from "express";
import {
  checkVerificationCode,
  findUserAccount,
  getUsernameController,
  getUsernameWithEmail,
  sendEmailVerificationCode,
  updateUserPassword,
} from "../controllers/user.controller";

const router = express.Router();
router.get("/", getUsernameController);
router.get("/getUsername", getUsernameWithEmail);
router.get("/findUserAccount", findUserAccount);
router.get("/getEmailVerificationCode", sendEmailVerificationCode);
router.get("/checkVerificationCode", checkVerificationCode);
router.post("/:username/updatePassword", updateUserPassword);

export default router;
