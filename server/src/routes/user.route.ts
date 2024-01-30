import express from "express";
import {
  checkVerificationCode,
  findUserAccount,
  getUsernameController,
  getUsernameWithEmail,
  sendEmailVerificationCode,
} from "../controllers/user.controller";

const router = express.Router();
router.get("/", getUsernameController);
router.get("/getUsername", getUsernameWithEmail);
router.get("/findUserAccount", findUserAccount);
router.get("/getEmailVerificationCode", sendEmailVerificationCode);
router.get("/checkVerificationCode", checkVerificationCode);

export default router;
