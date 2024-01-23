import express from "express";
import {
  findUserAccount,
  getUsernameController,
  getUsernameWithEmail,
  sendEmailVerificationCode,
} from "../controllers/user.controller";

const router = express.Router();
router.get("/", getUsernameController);
router.get("/findUserAccount", findUserAccount);
router.get("/getUsername", getUsernameWithEmail);
router.get("/getEmailVerificationCode", sendEmailVerificationCode);

export default router;
