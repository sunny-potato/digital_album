import express from "express";
import { checkUserProfileMatch } from "../controllers/login.controller";

const router = express.Router();

router.get(`/`, checkUserProfileMatch);

export default router;
