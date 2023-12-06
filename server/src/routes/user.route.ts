import express from "express";
import { getUsernameController } from "../controllers/user.controller";

const router = express.Router();
router.get("/", getUsernameController);

export default router;
