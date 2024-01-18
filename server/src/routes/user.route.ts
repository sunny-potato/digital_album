import express from "express";
import {
  findUserAccount,
  getUsernameController,
} from "../controllers/user.controller";

const router = express.Router();
router.get("/", getUsernameController);
router.get("/findAccount", findUserAccount);

export default router;
